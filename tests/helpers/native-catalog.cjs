const assert = require('node:assert/strict');
const sites = require('../../ios/Fanggu/Resources/catalog.json');

function assertUnvisited(ids) {
  for (const id of ids) {
    const site = sites.find(site => site.id === id);
    assert(site, `${id} missing from the native catalogue`);
    assert.equal(site.initialStatus, 'unvisited', id);
    for (const key of ['record', 'visitedOn', 'note', 'reviews']) assert(!Object.hasOwn(site, key), `${id}: personal data in catalogue`);
  }
}
module.exports = { assertUnvisited };
