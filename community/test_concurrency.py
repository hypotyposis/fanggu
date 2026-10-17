from pathlib import Path
import tempfile
import threading
import unittest
from server import Community, APIError, DIMENSIONS
import seed


class ConcurrencyTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.path = str(Path(self.temp.name) / 'test.sqlite')
        self.app = Community(self.path, [{'id': 'temple'}])

    def tearDown(self):
        self.app.close()
        self.temp.cleanup()

    def call(self, method, path, body=None, token=''):
        return self.app.handle(method, '/v1/' + path, {}, body or {}, token)

    def account(self, handle):
        return self.call('POST', 'auth/register', dict(handle=handle, password='test-password', nickname=handle, acceptPublicReviews=True))

    def hold_password_hash(self):
        """Makes the next password check wait until released, as a slow hash would."""
        started, release = threading.Event(), threading.Event()
        original = self.app.password_hash

        def slow(password, salt):
            started.set()
            self.assertTrue(release.wait(5))
            return original(password, salt)
        self.app.password_hash = slow
        return started, release

    def test_login_in_progress_does_not_block_reads_or_writes(self):
        token = self.account('reader')['token']
        self.account('slow')
        started, release = self.hold_password_hash()
        login = {}
        thread = threading.Thread(target=lambda: login.update(self.call('POST', 'auth/login', dict(handle='slow', password='test-password'))))
        thread.start()
        self.assertTrue(started.wait(5))
        # Both requests would wait for the hash if it still held the lock.
        self.assertEqual(self.call('GET', 'reviews', token=token)['items'], [])
        self.call('PUT', 'me/reviews/temple', dict(dimensions={}, text='并行写入', baseRevision=0, mutationID='parallel-1'), token)
        release.set()
        thread.join(5)
        self.assertIn('token', login)

    def test_simultaneous_edits_from_one_revision_admit_exactly_one(self):
        token = self.account('editor')['token']
        barrier = threading.Barrier(8)
        outcomes = []

        def edit(i):
            barrier.wait()
            try:
                self.call('PUT', 'me/reviews/temple', dict(dimensions={DIMENSIONS[0]: 3}, text=f'版本 {i}', baseRevision=0, mutationID=f'race-{i}-xxxx'), token)
                outcomes.append('saved')
            except APIError as error:
                outcomes.append(error.status)
        threads = [threading.Thread(target=edit, args=(i,)) for i in range(8)]
        [t.start() for t in threads]
        [t.join(5) for t in threads]
        self.assertEqual(sorted(outcomes, key=str), [409] * 7 + ['saved'])
        self.assertEqual(self.app.one('SELECT revision FROM reviews')['revision'], 1)

    def test_account_deleted_during_password_check_gets_no_session(self):
        user = self.account('leaving')
        started, release = self.hold_password_hash()
        result = {}

        def login():
            try:
                self.call('POST', 'auth/login', dict(handle='leaving', password='test-password'))
            except APIError as error:
                result['status'] = error.status
        thread = threading.Thread(target=login)
        thread.start()
        self.assertTrue(started.wait(5))
        with self.app.db:
            self.app.db.execute('DELETE FROM users WHERE id=?', (user['user']['id'],))
        release.set()
        thread.join(5)
        self.assertEqual(result, {'status': 401})
        self.assertIsNone(self.app.one('SELECT 1 FROM sessions'))

    def test_rejected_write_leaves_nothing_behind(self):
        token = self.account('steady')['token']
        self.call('PUT', 'me/reviews/temple', dict(dimensions={DIMENSIONS[0]: 4}, text='第一版', baseRevision=0, mutationID='first-edit'), token)
        with self.assertRaises(APIError):
            self.call('PUT', 'me/reviews/temple', dict(dimensions={}, text='过期版本', baseRevision=0, mutationID='stale-edit'), token)
        self.assertEqual(self.app.one('SELECT text FROM reviews')['text'], '第一版')
        self.assertIsNone(self.app.one("SELECT 1 FROM mutations WHERE mutation_id='stale-edit'"))
        self.assertEqual(self.call('GET', 'reviews', token=token)['items'][0]['text'], '第一版')


class SeedTests(unittest.TestCase):
    def test_seed_is_repeatable(self):
        with tempfile.TemporaryDirectory() as temp:
            path = str(Path(temp) / 'prototype.sqlite')
            seed.seed(path)
            seed.seed(path)
            app = Community(path)
            try:
                self.assertEqual(app.one('SELECT COUNT(*) n FROM users WHERE demo=1')['n'], len(seed.SAMPLES))
                reviews = app.one('SELECT COUNT(*) n FROM reviews')['n']
                self.assertGreater(reviews, len(seed.SAMPLES))
                self.assertEqual(app.one('SELECT COUNT(*) n FROM reviews WHERE revision != 1')['n'], 0)
            finally:
                app.close()


if __name__ == '__main__':
    unittest.main()
