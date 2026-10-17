import gzip
import json
from pathlib import Path
import shutil
import sqlite3
import subprocess
import sys
import tempfile
import threading
import time
import unittest
from urllib.request import Request, urlopen
from server import Community, serve

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE / 'deploy'))
import backup  # noqa: E402


class ProxyAddressTests(unittest.TestCase):
    """Behind Caddy every peer is 127.0.0.1, so rate limits must key on the forwarded address."""

    def start(self, trust_proxy):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        server = serve(str(Path(temp.name) / 'proxy.sqlite'), port=0, catalog=[{'id': 'temple'}], trust_proxy=trust_proxy)
        seen = []
        original = server.community.handle

        def record(method, path, query, body, token='', address='local'):
            seen.append(address)
            return original(method, path, query, body, token, address)
        server.community.handle = record
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()

        def stop():
            server.shutdown(); server.server_close(); server.community.close(); thread.join()
        self.addCleanup(stop)
        return f'http://127.0.0.1:{server.server_address[1]}', seen

    def get(self, base, forwarded=None):
        headers = {'X-Forwarded-For': forwarded} if forwarded else {}
        with urlopen(Request(base + '/health', headers=headers), timeout=5) as response:
            return json.loads(response.read())

    def test_trusted_proxy_supplies_the_client_address(self):
        base, seen = self.start(trust_proxy=True)
        self.get(base, '203.0.113.7')
        # A client-supplied value comes first; the proxy appends the address it actually saw.
        self.get(base, '198.51.100.1, 203.0.113.8')
        self.get(base)
        self.assertEqual(seen, ['203.0.113.7', '203.0.113.8', '127.0.0.1'])

    def test_forwarded_header_is_ignored_unless_enabled(self):
        base, seen = self.start(trust_proxy=False)
        self.get(base, '203.0.113.7')
        self.assertEqual(seen, ['127.0.0.1'])


class CommandLineTests(unittest.TestCase):
    def test_server_starts_from_a_separate_catalog_file(self):
        with tempfile.TemporaryDirectory() as temp:
            catalog = Path(temp) / 'catalog.json'
            catalog.write_text(json.dumps([{'id': 'temple'}]))
            process = subprocess.Popen([sys.executable, str(HERE / 'server.py'), '--port', '8797', '--trust-proxy',
                                        '--catalog', str(catalog), '--database', str(Path(temp) / 'cli.sqlite')],
                                       stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            try:
                self.assertIn('listening', process.stdout.readline())
                for _ in range(50):
                    try:
                        with urlopen('http://127.0.0.1:8797/v1/sites/temple/community', timeout=2) as response:
                            self.assertEqual(json.loads(response.read())['siteID'], 'temple')
                        break
                    except OSError:
                        time.sleep(0.1)
                else:
                    self.fail('server did not answer')
            finally:
                process.terminate(); process.wait(5); process.stdout.close()


class BackupTests(unittest.TestCase):
    def test_snapshot_is_complete_while_the_service_holds_the_database_and_old_ones_are_pruned(self):
        with tempfile.TemporaryDirectory() as temp:
            database = str(Path(temp) / 'community.sqlite')
            app = Community(database, [{'id': 'temple'}])
            try:
                token = app.handle('POST', '/v1/auth/register', {}, dict(handle='keeper', password='test-password', nickname='keeper', acceptPublicReviews=True))['token']
                app.handle('PUT', '/v1/me/reviews/temple', {}, dict(dimensions={}, text='备份中的评价', baseRevision=0, mutationID='backup-edit'), token)
                # The service stays open, so the latest writes may still sit in the WAL file.
                made = [backup.backup(database, Path(temp) / 'backups', keep=2) for _ in range(3)]
            finally:
                app.close()
            kept = sorted((Path(temp) / 'backups').iterdir())
            self.assertEqual(kept, made[1:])
            restored = Path(temp) / 'restored.sqlite'
            with gzip.open(made[-1]) as packed, open(restored, 'wb') as raw:
                shutil.copyfileobj(packed, raw)
            copy = sqlite3.connect(restored)
            try:
                self.assertEqual(copy.execute('SELECT text FROM reviews').fetchone()[0], '备份中的评价')
                self.assertEqual(copy.execute('PRAGMA integrity_check').fetchone()[0], 'ok')
            finally:
                copy.close()


class DeployedLayoutTests(unittest.TestCase):
    def test_operator_tool_runs_from_the_installed_directory(self):
        # install.sh copies server.py, moderate.py and catalog.json into one directory with no checkout around it.
        with tempfile.TemporaryDirectory() as temp:
            app_dir = Path(temp) / 'opt'
            app_dir.mkdir()
            for name in ('server.py', 'moderate.py'):
                shutil.copy(HERE / name, app_dir)
            (app_dir / 'catalog.json').write_text(json.dumps([{'id': 'temple'}]))
            result = subprocess.run([sys.executable, str(app_dir / 'moderate.py'), '--database', str(Path(temp) / 'db.sqlite')],
                                    capture_output=True, text=True, timeout=30)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout), [])

    def test_caddyfile_template_has_one_domain_placeholder(self):
        self.assertEqual((HERE / 'deploy/Caddyfile').read_text().count('__DOMAIN__'), 1)


if __name__ == '__main__':
    unittest.main()
