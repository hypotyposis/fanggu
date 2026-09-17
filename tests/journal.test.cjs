const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const FangguLibrary = require('../library.js');

// Exercise shared form handlers with real persistence and native RadioNodeList semantics.
function setup() {
  class Node {
    constructor(tag) {
      this.tagName = tag; this.children = []; this.events = {}; this.dataset = {}; this.attrs = {};
      this.classList = { toggle: (name, enabled) => { this[name] = enabled; } };
    }
    append(...nodes) { this.children.push(...nodes); }
    setAttribute(name, value) { this.attrs[name] = value; }
    addEventListener(type, handler) { (this.events[type] ||= []).push(handler); }
    emit(type, extra = {}) { for (const handler of this.events[type] || []) handler({ target: this, currentTarget: this, preventDefault() {}, ...extra }); }
    showModal() { this.open = true; }
    close() { this.open = false; }
  }
  const ids = Object.fromEntries(['review-form', 'review-dialog', 'review-stars', 'review-rating-label', 'review-unrate', 'review-count', 'review-clear', 'review-title', 'review-place', 'visit-form', 'visit-to-wish', 'journal-toast'].map(id => [id, new Node(id)]));
  const form = ids['review-form'], dialog = ids['review-dialog'], error = new Node('p'), cancel = new Node('button');
  error.hidden = true; dialog.querySelector = () => error; cancel.closest = () => dialog;
  const radios = () => ids['review-stars'].children.map(label => label.children[0]);
  ids['review-stars'].querySelectorAll = () => ids['review-stars'].children;
  form.querySelectorAll = () => radios();
  const rating = {};
  Object.defineProperty(rating, 'value', {
    get: () => radios().find(input => input.checked)?.value || '',
    set(value) {
      // Setting an unmatched value does NOT uncheck the current native radio.
      if (radios().some(input => input.value === value)) radios().forEach(input => { input.checked = input.value === value; });
    }
  });
  form.elements = { rating, shortReview: { value: '' } };
  form.reset = () => { radios().forEach(input => { input.checked = false; }); form.elements.shortReview.value = ''; };
  const document = new Node('document');
  document.createElement = tag => new Node(tag);
  document.querySelector = selector => selector.startsWith('#') ? ids[selector.slice(1)] : null;
  document.querySelectorAll = () => [cancel];
  const data = new Map(); let failing = false, saves = 0, changes = 0;
  const storage = { getItem: key => data.get(key) ?? null, setItem(key, value) { if (failing) throw Error('full'); data.set(key, value); saves++; } };
  const window = new Node('window'); window.localStorage = storage;
  const context = vm.createContext({ document, window, FangguLibrary, setTimeout() {}, clearTimeout() {} });
  const journal = vm.runInContext(fs.readFileSync(require.resolve('../journal.js'), 'utf8') + '\nFangguJournal;', context);
  const api = journal.create([{ id: 'test-site', name: '试读古迹', place: '试读地点' }], () => { changes++; });
  const open = () => document.emit('click', { target: { closest: () => ({ dataset: { action: 'review', id: 'test-site' } }) } });
  const choose = value => { rating.value = String(value); form.emit('change'); };
  return { api, ids, form, dialog, error, cancel, storage, window, open, choose, fail: value => { failing = value; }, saves: () => saves, changes: () => changes };
}

test('cancel scoring unchecks native radios and saves a text-only review without marking a visit', () => {
  const s = setup(); s.open(); s.choose(4);
  s.form.elements.shortReview.value = '只留感想'; s.form.emit('input');
  s.ids['review-unrate'].emit('click');
  assert.equal(s.form.elements.rating.value, '');
  assert.equal(s.ids['review-rating-label'].textContent, '未评分');
  assert.equal(s.ids['review-unrate'].disabled, true);
  assert.equal(s.ids['review-count'].textContent, '4 / 500');
  assert.equal(s.saves(), 0);
  s.form.emit('submit');
  assert.equal(s.api.library.review('test-site').rating, null);
  assert.equal(s.api.library.review('test-site').text, '只留感想');
  assert.equal(s.api.library.record('test-site').status, 'unvisited');
  assert.equal(s.dialog.open, false); assert.equal(s.changes(), 1);
});

test('cancelling discards drafts; failures retain drafts and allow a successful retry and clear', () => {
  const s = setup(); s.open(); s.choose(5); s.form.elements.shortReview.value = '草稿';
  s.cancel.emit('click'); assert.equal(s.saves(), 0);
  s.open(); assert.equal(s.form.elements.rating.value, ''); assert.equal(s.form.elements.shortReview.value, '');
  s.choose(3); s.form.elements.shortReview.value = '重试的短评'; s.fail(true); s.form.emit('submit');
  assert.equal(s.dialog.open, true); assert.equal(s.error.hidden, false); assert.match(s.error.textContent, /未能保存/);
  assert.equal(s.form.elements.shortReview.value, '重试的短评'); assert.equal(s.api.library.review('test-site').text, '');
  assert.equal(s.saves(), 0); assert.equal(s.changes(), 0);
  s.fail(false); s.form.emit('submit'); s.open();
  assert.equal(s.form.elements.rating.value, '3'); assert.equal(s.form.elements.shortReview.value, '重试的短评');
  assert.equal(s.error.hidden, true); assert.equal(s.ids['review-clear'].hidden, false);
  s.ids['review-clear'].emit('click');
  assert.equal(s.api.library.review('test-site').rating, null); assert.equal(s.api.library.review('test-site').text, '');
  assert.equal(s.dialog.open, false); assert.equal(s.saves(), 2);
});

test('storage events refresh displayed reviews while preserving an open draft', () => {
  const s = setup(); s.open(); s.choose(2); s.form.elements.shortReview.value = '未保存的草稿';
  const other = FangguLibrary.create([{ id: 'test-site' }], s.storage);
  other.setReview('test-site', { rating: 5, text: '另一标签页' });
  s.window.emit('storage', { key: FangguLibrary.KEY });
  assert.equal(s.api.library.review('test-site').text, '另一标签页');
  assert.equal(s.form.elements.shortReview.value, '未保存的草稿');
  assert.equal(s.form.elements.rating.value, '2'); assert.equal(s.dialog.open, true);
  s.form.emit('submit'); assert.equal(other.review('test-site').text, '另一标签页');
  other.refresh(); assert.equal(other.review('test-site').text, '未保存的草稿');
});
