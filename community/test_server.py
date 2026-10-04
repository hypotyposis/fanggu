import json
from pathlib import Path
import tempfile
import threading
import unittest
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from server import Community, APIError, DIMENSIONS, serve


class CommunityTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.path = str(Path(self.temp.name) / 'test.sqlite')
        self.app = Community(self.path, [{'id': 'temple'}])
        self.seq = 0

    def tearDown(self):
        self.app.close()
        self.temp.cleanup()

    def call(self, method, path, body=None, token='', query=None):
        return self.app.handle(method, '/v1/' + path, query or {}, body or {}, token)

    def account(self, handle):
        return self.call('POST', 'auth/register', dict(handle=handle, password='test-password', nickname=handle, acceptPublicReviews=True))

    def write(self, token, values=None, text='古迹评价', revision=0, mutation=None):
        self.seq += 1
        return self.call('PUT', 'me/reviews/temple', dict(dimensions=values or {}, text=text, baseRevision=revision, mutationID=mutation or f'mutation-{self.seq}'), token)

    def test_auth_persists_and_never_exposes_credentials(self):
        a = self.account('first')
        self.assertNotIn('password', a['user'])
        self.assertNotIn(a['token'], self.app.one('SELECT token_hash FROM sessions')[0])
        self.app.close()
        self.app = Community(self.path, [{'id': 'temple'}])
        self.assertEqual(self.call('GET', 'me', token=a['token'])['id'], a['user']['id'])
        self.call('POST', 'auth/logout', token=a['token'])
        with self.assertRaises(APIError) as err:
            self.call('GET', 'me', token=a['token'])
        self.assertEqual(err.exception.status, 401)
        with self.assertRaises(APIError):
            self.call('POST', 'auth/login', dict(handle='first', password='wrong-password'))

    def test_score_uses_complete_equal_weight_reviews_and_five_point_scale(self):
        tokens = [self.account(f'user{i}')['token'] for i in range(6)]
        dims = dict(zip(DIMENSIONS, [5, 4, 5, 4, 3, 4]))
        for token in tokens[:4]:
            self.write(token, dims)
        self.write(tokens[4], {'art': 5})
        summary = self.call('GET', 'sites/temple/community')
        self.assertIsNone(summary['score'])
        self.assertEqual(summary['ratingCount'], 4)
        self.assertEqual(summary['reviewCount'], 5)
        self.write(tokens[5], dict.fromkeys(DIMENSIONS, 3))
        summary = self.call('GET', 'sites/temple/community')
        self.assertAlmostEqual(summary['score'], ((25 / 6) * 4 + 3) / 5)
        self.assertAlmostEqual(sum(summary['dimensions'].values()) / 6, summary['score'])
        self.assertEqual(summary['ratingCount'], 5)
        self.write(tokens[0], {'art': 4}, revision=1)
        self.assertIsNone(self.call('GET', 'sites/temple/community')['score'])

    def test_retry_conflict_delete_and_no_duplicate_feed(self):
        a = self.account('first')
        created = self.write(a['token'], {'art': 5}, mutation='request-123')
        retry = self.write(a['token'], {'art': 5}, mutation='request-123')
        self.assertEqual(created, retry)
        with self.assertRaises(APIError) as err:
            self.write(a['token'], {'art': 4})
        self.assertEqual(err.exception.status, 409)
        self.assertEqual(err.exception.payload['current']['dimensions'], {'art': 5})
        deleted = self.write(a['token'], text='', revision=1)
        self.assertTrue(deleted['deleted'])
        # Delayed replay cannot revive a deleted review.
        self.write(a['token'], {'art': 5}, mutation='request-123')
        self.assertEqual(self.call('GET', 'reviews')['items'], [])
        self.assertTrue(self.call('GET', 'me/reviews', token=a['token'])['items'][0]['deleted'])
        self.write(a['token'], {'art': 3}, revision=2)
        feed = self.call('GET', 'reviews')['items']
        self.assertEqual(len(feed), 1)
        self.assertEqual(feed[0]['id'], created['id'])

    def test_follow_unfollow_block_report_and_account_deletion(self):
        a, b = self.account('first'), self.account('second')
        review = self.write(b['token'], dict.fromkeys(DIMENSIONS, 4))
        self.assertEqual(self.call('GET', 'reviews', token=a['token'], query={'scope': ['following']})['items'], [])
        self.call('PUT', f"users/{b['user']['id']}/follow", token=a['token'])
        self.assertEqual(len(self.call('GET', 'reviews', token=a['token'], query={'scope': ['following']})['items']), 1)
        self.call('PUT', f"users/{a['user']['id']}/follow", token=b['token'])
        self.assertTrue(self.call('GET', f"users/{b['user']['id']}", token=a['token'])['followsYou'])
        report = self.call('POST', 'reports', dict(reviewID=review['id'], reason='举报测试'), a['token'])
        self.assertTrue(report['ok'])
        self.call('PUT', f"users/{b['user']['id']}/block", token=a['token'])
        self.assertEqual(self.call('GET', 'reviews', token=a['token'])['items'], [])
        self.assertEqual(self.call('GET', 'reviews', token=b['token'])['items'][0]['author']['id'], b['user']['id'])
        self.assertEqual(self.call('GET', 'me', token=a['token'])['followingCount'], 0)
        self.call('DELETE', f"users/{b['user']['id']}/block", token=a['token'])
        self.assertEqual(len(self.call('GET', 'reviews', token=a['token'])['items']), 1)
        with self.assertRaises(APIError):
            self.call('DELETE', 'me', dict(password='bad-password'), b['token'])
        self.call('DELETE', 'me', dict(password='test-password'), b['token'])
        self.assertEqual(self.call('GET', 'sites/temple/community')['reviewCount'], 0)
        with self.assertRaises(APIError):
            self.call('GET', 'me', token=b['token'])

    def test_validation_keeps_valid_review_and_user_isolation(self):
        a, b = self.account('first'), self.account('second')
        self.write(a['token'], {'art': 4})
        for dims in [{'art': True}, {'art': 6}, {'unknown': 4}, {'art': 3.5}]:
            with self.assertRaises(APIError):
                self.write(a['token'], dims, revision=1)
        with self.assertRaises(APIError):
            self.write(a['token'], text='字' * 501, revision=1)
        self.assertEqual(self.call('GET', 'me/reviews', token=a['token'])['items'][0]['revision'], 1)
        self.assertEqual(self.call('GET', 'me/reviews', token=b['token'])['items'], [])
        with self.assertRaises(APIError):
            self.call('PUT', f"users/{a['user']['id']}/follow", token=a['token'])

    def test_moderation_removes_review_from_public_score(self):
        import subprocess
        a, b = self.account('first'), self.account('second')
        review = self.write(a['token'], dict.fromkeys(DIMENSIONS, 5))
        report = self.call('POST', 'reports', dict(reviewID=review['id'], reason='广告测试'), b['token'])
        script = str(Path(__file__).parent / 'moderate.py')
        import sys
        subprocess.run([sys.executable, script, '--database', self.path, '--resolve', report['id'], '--action', 'hide'], check=True, capture_output=True)
        self.assertEqual(self.call('GET', 'sites/temple/community')['ratingCount'], 0)
        self.assertEqual(self.call('GET', 'reviews')['items'], [])
        self.write(a['token'], dict.fromkeys(DIMENSIONS, 4), revision=1)
        self.assertEqual(self.call('GET', 'reviews')['items'], [], 'Editing cannot bypass moderation')
        subprocess.run([sys.executable, script, '--database', self.path, '--resolve', report['id'], '--action', 'restore'], check=True, capture_output=True)
        self.assertEqual(self.call('GET', 'sites/temple/community')['ratingCount'], 1)

    def test_invalid_input_and_filtering(self):
        a = self.account('first')
        self.app.blocked_terms = ['blocked-word']
        with self.assertRaises(APIError) as err:
            self.write(a['token'], text='a blocked-word')
        self.assertEqual(err.exception.status, 422)
        with self.assertRaises(APIError):
            self.call('GET', 'reviews', query={'before': ['9999999999999999999999999999999']})
        with self.assertRaises(APIError):
            self.call('POST', 'reports', dict(reviewID={}, reason='reason'), a['token'])
        with self.assertRaises(APIError):
            self.call('POST', 'auth/register', dict(handle='invalid', password='test-password', nickname=[], acceptPublicReviews=True))

    def test_real_http_and_restart(self):
        server = serve(str(Path(self.temp.name) / 'http.sqlite'), port=0)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        base = f'http://127.0.0.1:{server.server_port}'
        try:
            self.assertEqual(json.load(urlopen(base + '/health'))['status'], 'ok')
            payload = json.dumps(dict(handle='network', nickname='网络访客', password='test-password', acceptPublicReviews=True)).encode()
            response = json.load(urlopen(Request(base + '/v1/auth/register', data=payload, headers={'Content-Type': 'application/json'})))
            me = json.load(urlopen(Request(base + '/v1/me', headers={'Authorization': 'Bearer ' + response['token']})))
            self.assertEqual(me['nickname'], '网络访客')
            with self.assertRaises(HTTPError) as err:
                urlopen(Request(base + '/v1/me', headers={'Authorization': 'Bearer invalid'}))
            self.assertEqual(err.exception.code, 401)
            err.exception.close()
        finally:
            server.shutdown(); server.server_close(); server.community.close(); thread.join()


if __name__ == '__main__':
    unittest.main()
