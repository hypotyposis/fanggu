const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');

// A requested subject split supersedes the active plate, while historical batch
// assertions still verify the actual original bytes and their human acceptance.
module.exports = function assertArchivedXian(previous) {
  const directory = 'assets/research/history/xian-pair-2026-10-02';
  const archived = read(`${directory}/delivery.json`);
  for (const [key, file, shortKey] of [
    ['sourceSha256', 'color-original.png', 'source'],
    ['inputSha256', 'color-delivery.png', 'input'],
    ['sha256', 'color-delivery.avif', 'avif']
  ]) {
    const expected = previous[key] || previous[shortKey] || archived[key];
    assert.match(expected, /^[a-f0-9]{64}$/);
    assert.equal(archived[key], expected, `archived xian: ${key}`);
    assert.equal(hash(`${directory}/${file}`), expected, `archived xian bytes: ${file}`);
  }
  assert.equal(archived.visualReview, previous.visualReview);
  assert.equal(archived.review.inputSha256, archived.inputSha256);
  assert.equal(archived.review.avifSha256, archived.sha256);
  const current = read('assets/color-research/avif-manifest.json');
  for (const id of ['xian', 'xian_small']) {
    const image = current.images[id];
    assert(['pending_user', 'approved_user', 'approved_default'].includes(image.visualReview));
    if (image.visualReview.startsWith('approved_')) {
      const review = read(`assets/color-research/${id}.json`).user_review;
      assert.equal(review.reviewer, image.visualReview === 'approved_user' ? 'user' : 'default-policy');
      assert.equal(review.sourceSha256, image.sourceSha256);
      assert.equal(review.inputSha256, image.inputSha256);
      assert.equal(review.avifSha256, image.sha256);
    }
    assert.notEqual(current.images[id].sha256, archived.sha256);
  }
};
