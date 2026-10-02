const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');

// Preserve the historical approval while checking the requested matte repair.
module.exports = function assertArchivedTiantai(previous) {
  const directory = 'assets/research/history/tiantai-matte-2026-10-02';
  const archived = read(`${directory}/delivery.json`);
  const image = read('assets/color-research/avif-manifest.json').images.tiantai;
  for (const [key, file, shortKey] of [
    ['sourceSha256', archived.source, 'source'],
    ['inputSha256', `${directory}/color-delivery.png`, 'input'],
    ['sha256', `${directory}/color-delivery.avif`, 'avif']
  ]) {
    const expected = previous[key] || previous[shortKey] || archived[key];
    assert.equal(archived[key], expected, `archived tiantai: ${key}`);
    assert.equal(hash(file), expected, `archived tiantai bytes: ${file}`);
  }
  assert.equal(archived.visualReview, previous.visualReview);
  assert.equal(archived.review.inputSha256, archived.inputSha256);
  assert.equal(archived.review.avifSha256, archived.sha256);
  assert.equal(image.sourceSha256, archived.sourceSha256);
  assert.notEqual(image.inputSha256, archived.inputSha256);
  assert.notEqual(image.sha256, archived.sha256);
  assert.equal(hash(image.input), image.inputSha256);
  assert.equal(hash(image.src), image.sha256);
  assert.equal(image.extraction.rgbUnchanged, true);
  assert.deepEqual(image.extraction.backgroundSeeds, [[700, 185], [835, 185], [250, 650], [1280, 650]]);
  assert.equal(image.extraction.transparentPixels - archived.extraction.transparentPixels, 60934);
  assert(['pending_user', 'approved_user'].includes(image.visualReview));
  if (image.visualReview === 'approved_user') {
    const review = read('assets/color-research/tiantai.json').user_review;
    assert.equal(review.reviewer, 'user');
    assert.equal(review.sourceSha256, image.sourceSha256);
    assert.equal(review.inputSha256, image.inputSha256);
    assert.equal(review.avifSha256, image.sha256);
  }
};
