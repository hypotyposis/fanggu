#!/usr/bin/env python3
"""Fanggu community JSON service. Persistent SQLite; no third-party runtime dependencies."""
import argparse
from contextlib import contextmanager
import hashlib
import hmac
import json
import os
from pathlib import Path
import re
import secrets
import sqlite3
import threading
import time
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote, urlsplit

DIMENSIONS = ('eraRarity', 'authenticity', 'construction', 'art', 'scale', 'setting')
MIN_RATINGS = 5
ROOT = Path(__file__).resolve().parents[1]


def now():
    return datetime.now(timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')


def utf16_length(value):
    return len(value.encode('utf-16-le')) // 2


class APIError(Exception):
    def __init__(self, status, message, **details):
        self.status, self.payload = status, {'error': message, **details}


class Community:
    """Database work runs one request at a time, so each request's checks and writes stay atomic.
    Password hashing happens outside that lock and releases the GIL, so logins no longer stall
    everyone else. Reads stay serialized on purpose: threads reading in parallel hand the GIL back
    and forth on every SQLite row and cut throughput several times over in measurement."""

    def __init__(self, database, catalog=None):
        Path(database).parent.mkdir(parents=True, exist_ok=True)
        self.database = database
        # Scripts and tests use `main` directly on their own thread; requests use `requests` under the lock.
        self.main = self.connect()
        self.main.execute('PRAGMA journal_mode=WAL')
        self.requests = self.connect(autocommit=True)
        self.local = threading.local()
        self.lock = threading.Lock()
        self.limits_lock = threading.Lock()
        self.limits = {}
        self.sites = {s['id']: s for s in (catalog if catalog is not None else json.loads((ROOT / 'ios/Fanggu/Resources/catalog.json').read_text()))}
        self.blocked_terms = [t.strip().casefold() for t in os.environ.get('FANGGU_BLOCKED_TERMS', '').split(',') if t.strip()]
        self.db.executescript('''
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY, handle TEXT UNIQUE NOT NULL, nickname TEXT NOT NULL,
          bio TEXT NOT NULL DEFAULT '', avatar INTEGER NOT NULL DEFAULT 0,
          password TEXT NOT NULL, salt TEXT NOT NULL, created_at TEXT NOT NULL,
          demo INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE IF NOT EXISTS sessions (
          token_hash TEXT PRIMARY KEY, user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
          expires REAL NOT NULL);
        CREATE TABLE IF NOT EXISTS reviews (
          sequence INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          site_id TEXT NOT NULL, dimensions TEXT NOT NULL, text TEXT NOT NULL,
          revision INTEGER NOT NULL, updated_at TEXT NOT NULL, created_at TEXT NOT NULL,
          deleted INTEGER NOT NULL DEFAULT 0, hidden INTEGER NOT NULL DEFAULT 0,
          UNIQUE(user_id, site_id));
        CREATE TABLE IF NOT EXISTS mutations (
          user_id TEXT REFERENCES users(id) ON DELETE CASCADE, mutation_id TEXT NOT NULL,
          payload_hash TEXT NOT NULL, response TEXT NOT NULL, PRIMARY KEY(user_id, mutation_id));
        CREATE TABLE IF NOT EXISTS follows (
          source TEXT REFERENCES users(id) ON DELETE CASCADE, target TEXT REFERENCES users(id) ON DELETE CASCADE,
          created_at TEXT NOT NULL, PRIMARY KEY(source, target), CHECK(source != target));
        CREATE TABLE IF NOT EXISTS blocks (
          source TEXT REFERENCES users(id) ON DELETE CASCADE, target TEXT REFERENCES users(id) ON DELETE CASCADE,
          PRIMARY KEY(source, target), CHECK(source != target));
        CREATE TABLE IF NOT EXISTS reports (
          id TEXT PRIMARY KEY, reporter TEXT REFERENCES users(id) ON DELETE SET NULL,
          review_id INTEGER REFERENCES reviews(sequence) ON DELETE CASCADE,
          reason TEXT NOT NULL, created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'open');
        CREATE INDEX IF NOT EXISTS reviews_site ON reviews(site_id, deleted, hidden);
        CREATE INDEX IF NOT EXISTS follows_target ON follows(target);
        ''')

    def connect(self, autocommit=False):
        db = sqlite3.connect(self.database, check_same_thread=False, timeout=10,
                             isolation_level=None if autocommit else '')
        db.row_factory = sqlite3.Row
        db.execute('PRAGMA foreign_keys=ON')
        return db

    @property
    def db(self):
        return getattr(self.local, 'db', None) or self.main

    @contextmanager
    def transaction(self, write):
        with self.lock:
            db = self.local.db = self.requests
            try:
                # IMMEDIATE takes SQLite's write lock up front, so a concurrent moderate.py waits instead of failing.
                db.execute('BEGIN IMMEDIATE' if write else 'BEGIN')
                try:
                    yield db
                except BaseException:
                    db.execute('ROLLBACK')
                    raise
                db.execute('COMMIT')
            finally:
                self.local.db = None

    def close(self):
        self.requests.close()
        self.main.close()

    def one(self, sql, args=()):
        return self.db.execute(sql, args).fetchone()

    def limit(self, key, count, seconds):
        with self.limits_lock:
            stamp = time.monotonic()
            recent = [t for t in self.limits.get(key, []) if t > stamp - seconds]
            if len(recent) >= count:
                raise APIError(429, '操作太频繁，请稍后再试。')
            self.limits[key] = recent + [stamp]
            if len(self.limits) > 10000:
                self.limits = {k: v for k, v in self.limits.items() if v[-1] > stamp - 3600}

    def text(self, value, maximum, label, minimum=0):
        if not isinstance(value, str) or not minimum <= utf16_length(value) <= maximum or '\x00' in value:
            raise APIError(422, f'{label}需为 {minimum}–{maximum} 字。')
        if any(t in value.casefold() for t in self.blocked_terms):
            raise APIError(422, f'{label}包含不适合公开的内容，请修改。')
        return value

    def password_hash(self, password, salt):
        return hashlib.pbkdf2_hmac('sha256', password.encode(), bytes.fromhex(salt), 210000).hex()

    def auth(self, token, required=True):
        row = self.one('SELECT u.* FROM sessions s JOIN users u ON s.user_id=u.id WHERE s.token_hash=? AND s.expires>?',
                       (hashlib.sha256(token.encode()).hexdigest(), time.time())) if token else None
        if required and row is None:
            raise APIError(401, '登录已失效，请重新登录。')
        return row

    def blocked(self, a, b):
        return bool(a and self.one('SELECT 1 FROM blocks WHERE (source=? AND target=?) OR (source=? AND target=?)', (a, b, b, a)))

    def user(self, row, viewer=None):
        uid = row['id']
        return {'id': uid, 'handle': row['handle'], 'nickname': row['nickname'], 'bio': row['bio'],
                'avatar': row['avatar'], 'isDemo': bool(row['demo']), 'createdAt': row['created_at'],
                'reviewCount': self.one('SELECT COUNT(*) n FROM reviews WHERE user_id=? AND deleted=0 AND hidden=0', (uid,))['n'],
                'followingCount': self.one('SELECT COUNT(*) n FROM follows WHERE source=?', (uid,))['n'],
                'followerCount': self.one('SELECT COUNT(*) n FROM follows WHERE target=?', (uid,))['n'],
                'isFollowing': bool(viewer and self.one('SELECT 1 FROM follows WHERE source=? AND target=?', (viewer, uid))),
                'followsYou': bool(viewer and self.one('SELECT 1 FROM follows WHERE source=? AND target=?', (uid, viewer))),
                'isBlocked': bool(viewer and self.one('SELECT 1 FROM blocks WHERE source=? AND target=?', (viewer, uid)))}

    def session(self, row):
        token = secrets.token_urlsafe(32)
        self.db.execute('INSERT INTO sessions VALUES (?,?,?)', (hashlib.sha256(token.encode()).hexdigest(), row['id'], time.time() + 86400 * 30))
        return {'token': token, 'user': self.user(row, row['id'])}

    def review(self, row, viewer=None):
        dims = json.loads(row['dimensions'])
        return {'id': str(row['sequence']), 'siteID': row['site_id'], 'dimensions': dims,
                'text': row['text'], 'revision': row['revision'], 'updatedAt': row['updated_at'],
                'createdAt': row['created_at'], 'deleted': bool(row['deleted']), 'hidden': bool(row['hidden']),
                'score': sum(dims.values()) / 6 if len(dims) == 6 and not row['deleted'] else None,
                'author': self.user(self.one('SELECT * FROM users WHERE id=?', (row['user_id'],)), viewer)}

    def summary(self, site_id):
        rows = self.db.execute('SELECT dimensions,text FROM reviews WHERE site_id=? AND deleted=0 AND hidden=0', (site_id,)).fetchall()
        full = [json.loads(r['dimensions']) for r in rows if len(json.loads(r['dimensions'])) == 6]
        averages = {d: sum(r[d] for r in full) / len(full) for d in DIMENSIONS} if full else {}
        return {'siteID': site_id, 'reviewCount': len(rows), 'ratingCount': len(full),
                'textCount': sum(bool(r['text'].strip()) for r in rows), 'minimumRatings': MIN_RATINGS,
                'score': sum(averages.values()) / 6 if len(full) >= MIN_RATINGS else None,
                'dimensions': averages if len(full) >= MIN_RATINGS else {}}

    def handle(self, method, path, query, body, token='', address='local'):
        parts = [unquote(p) for p in path.strip('/').split('/')]
        if method == 'POST' and parts in (['v1', 'auth', 'register'], ['v1', 'auth', 'login']):
            return self.sign_in(parts[-1], body, address)
        if method == 'DELETE' and parts == ['v1', 'me']:
            return self.delete_account(body, token)
        with self.transaction(write=method != 'GET'):
            return self.dispatch(method, path, query, body, token, address)

    def sign_in(self, action, body, address):
        self.limit(('auth', address), 30, 300)
        handle = body.get('handle', '').strip().lower() if isinstance(body.get('handle'), str) else ''
        if not re.fullmatch(r'[a-z0-9_]{3,24}', handle):
            raise APIError(422, '账号请使用 3–24 位字母、数字或下划线。')
        password = self.text(body.get('password'), 128, '密码', 8)
        if action == 'register':
            if body.get('acceptPublicReviews') is not True:
                raise APIError(422, '请先确认评分与短评的公开同步规则。')
            nickname = self.text(body.get('nickname', ''), 24, '昵称', 1).strip()
            if not nickname:
                raise APIError(422, '昵称不能为空。')
            salt = secrets.token_hex(16)
            digest = self.password_hash(password, salt)
            with self.transaction(write=True):
                try:
                    self.db.execute('INSERT INTO users(id,handle,nickname,password,salt,created_at) VALUES(?,?,?,?,?,?)',
                                    (secrets.token_hex(16), handle, nickname, digest, salt, now()))
                except sqlite3.IntegrityError:
                    raise APIError(409, '这个账号已被使用，请换一个。')
                return self.session(self.one('SELECT * FROM users WHERE handle=?', (handle,)))
        with self.transaction(write=False):
            row = self.one('SELECT * FROM users WHERE handle=?', (handle,))
        valid = self.password_hash(password, row['salt'] if row else '00' * 16)
        if row is None or not hmac.compare_digest(valid, row['password']):
            raise APIError(401, '账号或密码不正确。')
        with self.transaction(write=True):
            # The account may have been deleted while the password was being checked.
            row = self.one('SELECT * FROM users WHERE id=? AND password=?', (row['id'], row['password']))
            if row is None:
                raise APIError(401, '账号或密码不正确。')
            return self.session(row)

    def delete_account(self, body, token):
        with self.transaction(write=False):
            current = self.auth(token)
        self.limit(('write', current['id']), 120, 60)
        password = self.text(body.get('password'), 128, '密码', 8)
        if not hmac.compare_digest(self.password_hash(password, current['salt']), current['password']):
            raise APIError(403, '密码不正确，账号尚未删除。')
        with self.transaction(write=True):
            if self.auth(token)['id'] != current['id']:
                raise APIError(401, '登录已失效，请重新登录。')
            self.db.execute('DELETE FROM users WHERE id=?', (current['id'],))
            return {'ok': True}

    def dispatch(self, method, path, query, body, token, address):
        parts = [unquote(p) for p in path.strip('/').split('/')]
        if path == '/health':
            return {'status': 'ok', 'service': 'fanggu-community', 'version': 1}
        if parts[:1] != ['v1']:
            raise APIError(404, '接口不存在。')
        parts = parts[1:]
        current = self.auth(token, required=bool(token) or method != 'GET' or parts[:1] == ['me'])
        uid = current['id'] if current else None
        if method != 'GET':
            self.limit(('write', uid), 120, 60)
        if parts == ['auth', 'logout'] and method == 'POST':
            self.db.execute('DELETE FROM sessions WHERE token_hash=?', (hashlib.sha256(token.encode()).hexdigest(),))
            return {'ok': True}
        if parts == ['me']:
            if method == 'GET':
                return self.user(current, uid)
            if method == 'PATCH':
                nickname = self.text(body.get('nickname'), 24, '昵称', 1).strip()
                bio = self.text(body.get('bio', ''), 160, '简介')
                avatar = body.get('avatar', 0)
                if type(avatar) is not int or not 0 <= avatar < 8 or not nickname:
                    raise APIError(422, '个人资料无效。')
                self.db.execute('UPDATE users SET nickname=?,bio=?,avatar=? WHERE id=?', (nickname, bio, avatar, uid))
                return self.user(self.one('SELECT * FROM users WHERE id=?', (uid,)), uid)
        if parts == ['me', 'reviews'] and method == 'GET':
            return {'items': [self.review(r, uid) for r in self.db.execute('SELECT * FROM reviews WHERE user_id=? ORDER BY sequence', (uid,))]}
        if len(parts) == 3 and parts[:2] == ['me', 'reviews'] and method == 'PUT':
            site_id = parts[2]
            if site_id not in self.sites:
                raise APIError(422, '古迹不在当前目录中，请先更新图鉴。')
            dims = body.get('dimensions')
            if not isinstance(dims, dict) or any(k not in DIMENSIONS or type(v) is not int or not 1 <= v <= 5 for k, v in dims.items()):
                raise APIError(422, '六维分数必须为 1–5 的整数，未评分项请留空。')
            text = self.text(body.get('text', ''), 500, '短评')
            base = body.get('baseRevision')
            mutation = body.get('mutationID')
            if type(base) is not int or base < 0 or not isinstance(mutation, str) or not re.fullmatch(r'[a-zA-Z0-9-]{8,80}', mutation):
                raise APIError(422, '同步版本无效。')
            digest = hashlib.sha256(json.dumps({'body': body, 'siteID': site_id}, sort_keys=True).encode()).hexdigest()
            previous = self.one('SELECT * FROM mutations WHERE user_id=? AND mutation_id=?', (uid, mutation))
            if previous:
                if previous['payload_hash'] != digest:
                    raise APIError(409, '此同步请求已被使用，请重新同步。')
                return json.loads(previous['response'])
            existing = self.one('SELECT * FROM reviews WHERE user_id=? AND site_id=?', (uid, site_id))
            if base != (existing['revision'] if existing else 0):
                raise APIError(409, '另一台设备修改了这份评价，请选择要保留的版本。', current=self.review(existing, uid) if existing else None)
            deleted = not dims and not text.strip()
            stamp = now()
            if existing:
                self.db.execute('UPDATE reviews SET dimensions=?,text=?,revision=revision+1,updated_at=?,deleted=? WHERE user_id=? AND site_id=?',
                                (json.dumps(dims), text, stamp, deleted, uid, site_id))
            else:
                self.db.execute('INSERT INTO reviews(user_id,site_id,dimensions,text,revision,updated_at,created_at,deleted) VALUES(?,?,?,?,1,?,?,?)',
                                (uid, site_id, json.dumps(dims), text, stamp, stamp, deleted))
            result = self.review(self.one('SELECT * FROM reviews WHERE user_id=? AND site_id=?', (uid, site_id)), uid)
            self.db.execute('INSERT INTO mutations VALUES(?,?,?,?)', (uid, mutation, digest, json.dumps(result)))
            return result
        if parts == ['reviews'] and method == 'GET':
            scope, site_id, author = query.get('scope', ['latest'])[0], query.get('site', [''])[0], query.get('user', [''])[0]
            try:
                before = int(query.get('before', [str(2**63 - 1)])[0])
                if not 0 < before <= 2**63 - 1:
                    raise ValueError('invalid cursor')
            except ValueError:
                raise APIError(422, '分页参数无效。')
            sql = 'SELECT r.* FROM reviews r WHERE r.deleted=0 AND r.hidden=0 AND r.sequence<?'
            args = [before]
            if site_id:
                sql += ' AND r.site_id=?'; args.append(site_id)
            if author:
                sql += ' AND r.user_id=?'; args.append(author)
            if scope == 'following':
                if not uid:
                    raise APIError(401, '登录后可查看关注动态。')
                sql += ' AND r.user_id IN (SELECT target FROM follows WHERE source=?)'; args.append(uid)
            elif scope != 'latest':
                raise APIError(422, '动态类型无效。')
            if uid:
                sql += ' AND NOT EXISTS(SELECT 1 FROM blocks b WHERE (b.source=? AND b.target=r.user_id) OR (b.target=? AND b.source=r.user_id))'
                args += [uid, uid]
            rows = self.db.execute(sql + ' ORDER BY r.sequence DESC LIMIT 31', args).fetchall()
            return {'items': [self.review(r, uid) for r in rows[:30]], 'nextCursor': str(rows[29]['sequence']) if len(rows) > 30 else None}
        if len(parts) == 3 and parts[0] == 'sites' and parts[2] == 'community' and method == 'GET':
            if parts[1] not in self.sites:
                raise APIError(404, '未找到这处古迹。')
            return self.summary(parts[1])
        if parts == ['discover'] and method == 'GET':
            ids = self.db.execute('SELECT site_id, MAX(sequence) latest FROM reviews WHERE deleted=0 AND hidden=0 GROUP BY site_id ORDER BY latest DESC LIMIT 12').fetchall()
            return {'sites': [self.summary(r['site_id']) for r in ids],
                    'memberCount': self.one('SELECT COUNT(*) n FROM users')['n'],
                    'reviewCount': self.one('SELECT COUNT(*) n FROM reviews WHERE deleted=0 AND hidden=0')['n'],
                    'hasDemoContent': bool(self.one('SELECT 1 FROM users WHERE demo=1'))}
        if parts == ['users'] and method == 'GET':
            search = query.get('q', [''])[0].strip().lower()[:80]
            rows = self.db.execute('SELECT * FROM users ORDER BY created_at DESC').fetchall()
            return {'items': [self.user(r, uid) for r in rows if not self.blocked(uid, r['id']) and
                              (not search or search in r['nickname'].lower() or search in r['handle'])][:50]}
        if len(parts) >= 2 and parts[0] == 'users':
            target = self.one('SELECT * FROM users WHERE id=?', (parts[1],))
            if not target:
                raise APIError(404, '这个账号已不存在。')
            other = target['id']
            if len(parts) == 2 and method == 'GET':
                if self.blocked(uid, other):
                    raise APIError(403, '已屏蔽，无法查看此用户的内容。')
                return self.user(target, uid)
            if len(parts) == 3 and parts[2] in ('followers', 'following') and method == 'GET':
                if self.blocked(uid, other):
                    raise APIError(403, '无法查看此用户。')
                field, joined = ('target', 'source') if parts[2] == 'followers' else ('source', 'target')
                rows = self.db.execute(f'SELECT u.* FROM follows f JOIN users u ON u.id=f.{joined} WHERE f.{field}=? ORDER BY f.created_at DESC', (other,)).fetchall()
                return {'items': [self.user(r, uid) for r in rows if not self.blocked(uid, r['id'])]}
            if len(parts) == 3 and parts[2] in ('follow', 'block') and method in ('PUT', 'DELETE'):
                if uid == other:
                    raise APIError(422, '不能对自己执行此操作。')
                if parts[2] == 'follow':
                    if self.blocked(uid, other):
                        raise APIError(403, '屏蔽状态下无法关注。')
                    if method == 'PUT':
                        self.db.execute('INSERT OR IGNORE INTO follows VALUES(?,?,?)', (uid, other, now()))
                    else:
                        self.db.execute('DELETE FROM follows WHERE source=? AND target=?', (uid, other))
                elif method == 'PUT':
                    self.db.execute('INSERT OR IGNORE INTO blocks VALUES(?,?)', (uid, other))
                    self.db.execute('DELETE FROM follows WHERE (source=? AND target=?) OR (source=? AND target=?)', (uid, other, other, uid))
                else:
                    self.db.execute('DELETE FROM blocks WHERE source=? AND target=?', (uid, other))
                return self.user(target, uid)
        if parts == ['me', 'blocks'] and method == 'GET':
            return {'items': [self.user(r, uid) for r in self.db.execute('SELECT u.* FROM users u JOIN blocks b ON b.target=u.id WHERE b.source=?', (uid,))]}
        if parts == ['reports'] and method == 'POST':
            self.limit(('report', uid), 10, 3600)
            review_id = body.get('reviewID')
            if not isinstance(review_id, str) or not review_id.isdigit():
                raise APIError(422, '评价编号无效。')
            row = self.one('SELECT * FROM reviews WHERE sequence=? AND deleted=0', (review_id,))
            if not row:
                raise APIError(404, '这份评价已不存在。')
            reason = self.text(body.get('reason', ''), 500, '举报说明', 2).strip()
            if len(reason) < 2:
                raise APIError(422, '请填写具体的举报原因。')
            report_id = secrets.token_hex(12)
            self.db.execute('INSERT INTO reports(id,reporter,review_id,reason,created_at) VALUES(?,?,?,?,?)', (report_id, uid, review_id, reason, now()))
            return {'ok': True, 'id': report_id}
        raise APIError(404, '接口不存在。')


class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def respond(self, status, payload):
        data = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        try:
            self.wfile.write(data)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def run(self):
        try:
            self.connection.settimeout(15)
            size = int(self.headers.get('Content-Length', '0'))
            if size < 0 or size > 65536:
                self.close_connection = True
                raise APIError(413, '请求内容过大。')
            raw = self.rfile.read(size) if size else b'{}'
            body = json.loads(raw)
            if not isinstance(body, dict):
                raise APIError(400, '请求必须为 JSON 对象。')
            target = urlsplit(self.path)
            token = self.headers.get('Authorization', '').removeprefix('Bearer ')
            result = self.server.community.handle(self.command, target.path, parse_qs(target.query), body, token, self.client_address[0])
            self.respond(200, result)
        except APIError as exc:
            self.respond(exc.status, exc.payload)
        except (ValueError, UnicodeError):
            self.respond(400, {'error': '请求格式不正确。'})
        except (TimeoutError, ConnectionError):
            self.close_connection = True
        except Exception:
            import traceback
            traceback.print_exc()
            self.respond(500, {'error': '服务暂时不可用，请稍后重试。'})

    do_GET = do_POST = do_PUT = do_PATCH = do_DELETE = run

    def log_message(self, fmt, *args):
        # Paths only; never log request bodies, tokens, passwords or private text.
        print(f'{self.log_date_time_string()} {self.command} {urlsplit(self.path).path}', flush=True)


def serve(database, host='127.0.0.1', port=8787):
    server = ThreadingHTTPServer((host, port), Handler)
    server.community = Community(database)
    return server


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', default=8787, type=int)
    parser.add_argument('--database', default=str(Path(__file__).parent / 'data/community.sqlite'))
    args = parser.parse_args()
    server = serve(args.database, args.host, args.port)
    print(f'Fanggu community listening on http://{args.host}:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        server.community.close()
