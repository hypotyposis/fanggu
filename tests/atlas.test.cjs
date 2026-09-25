const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const catalog = require('../catalog.js');
const navigation = require('../navigation.js');
const { create } = require('../library.js');

// Run the real atlas renderer with a small DOM adapter and isolated journal storage.
function setup(years, { reducedMotion = false } = {}) {
  const animations = [];
  class Node {
    constructor() {
      this.children = []; this.dataset = {}; this.events = {}; this.value = ''; this.className = '';
      this.style = { setProperty() {}, removeProperty(key) { delete this[key]; } };
      this.classList = {
        contains: name => this.className.split(' ').includes(name),
        add: name => { this.className += ' ' + name; },
        remove: name => { this.className = this.className.split(' ').filter(item => item !== name).join(' '); },
      };
    }
    append(...nodes) { nodes.forEach(node => this.insertBefore(node, null)); }
    insertBefore(node, reference) {
      node.remove(); node.parentElement = this;
      this.children.splice(reference ? this.children.indexOf(reference) : this.children.length, 0, node);
    }
    remove() {
      if (this.contains(document.activeElement)) document.activeElement = null;
      if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this);
      this.parentElement = null;
    }
    replaceChildren(...nodes) { [...this.children].forEach(node => node.remove()); this.append(...nodes); }
    replaceWith(...nodes) { const parent = this.parentElement; nodes.forEach(node => parent.insertBefore(node, this)); this.remove(); }
    get childNodes() { return this.children; }
    get isConnected() { return !!this.parentElement; }
    contains(node) { for (let current = node; current; current = current.parentElement) if (current === this) return true; return false; }
    focus() { document.activeElement = this; }
    get options() { return this.children; }
    querySelectorAll() { return this.children; }
    querySelector(selector) {
      const matches = node => selector.slice(1).split('.').every(name => node.classList.contains(name));
      for (const node of this.children) { if (matches(node)) return node; const child = node.querySelector(selector); if (child) return child; }
      return null;
    }
    getBoundingClientRect() { return { height: this.querySelector('.visit-ritual') ? 120 : 48 }; }
    animate(frames, timing) { const animation = { frames, timing, target: this, cancel() { this.cancelled = true; } }; animations.push(animation); return animation; }
    setAttribute() {}
    addEventListener(type, listener) { this.events[type] = listener; }
  }
  const nodes = new Map();
  const querySelector = selector => {
    if (!nodes.has(selector)) nodes.set(selector, new Node());
    return nodes.get(selector);
  };
  for (const key of ['country', 'dynasty', 'region', 'province', 'type']) querySelector('#atlas-' + key).value = 'all';
  const sites = years.map((year, index) => ({ id: 'site-' + index, name: '古迹' + index, dyn: 'tang', year, placeKey: 'test', types: ['hall'] }));
  const storage = new Map();
  let library, render;
  const document = { querySelector, createElement: () => new Node(), addEventListener() {}, activeElement: null };
  const context = {
    document,
    window: { addEventListener() {}, dispatchEvent() {} }, addEventListener() {},
    history: { state: null }, location: { hash: '' }, CustomEvent: class {},
    matchMedia: () => ({ matches: reducedMotion }),
    SITES: sites, PLACES: [{ key: 'test', prov: '山西' }], DYN: { tang: { name: '唐' } },
    FangguCatalog: catalog, FangguNavigation: navigation,
    FangguProtection: { badges: () => [] }, FangguArtwork: { apply() {} }, FangguVisit: { mark() {} },
    FangguJournal: { create(sites, onChange) {
      library = create(sites, { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) });
      render = onChange;
      const reviewSummary = id => {
        const review = library.review(id);
        if (review.rating == null && !review.text) return null;
        const summary = new Node(); summary.className = 'review-summary'; summary.textContent = review.text; return summary;
      };
      return { library, reviewSummary, statusNames: { visited: '已到访' }, button: () => new Node(), arrival: (site, image) => {
        const wrapper = new Node(); wrapper.className = 'visit-artwork'; wrapper.dispose = () => {};
        image.replaceWith(wrapper); wrapper.append(image);
        const ritual = new Node(); ritual.className = 'visit-ritual'; return ritual;
      } };
    } },
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../atlas.js'), 'utf8'), context);
  return {
    library, render, animations,
    focused: () => document.activeElement,
    card: id => querySelector('#atlas-grid').children.find(node => node.dataset.id === id),
    ids: () => querySelector('#atlas-grid').children.map(node => node.dataset.id),
    more: () => querySelector('#atlas-more').events.click(),
    select(status) { querySelector('.collection-tabs').events.click({ target: { closest: () => ({ dataset: { filter: status } }) } }); },
  };
}

test('check-ins keep atlas order and expanded cards stable, while status filters update', () => {
  const atlas = setup(Array.from({ length: 14 }, (_, index) => 900 - index));
  assert.deepEqual(atlas.ids(), Array.from({ length: 12 }, (_, index) => 'site-' + (13 - index)));
  atlas.more();
  const before = atlas.ids();
  atlas.library.checkIn('site-5'); atlas.render();
  assert.deepEqual(atlas.ids(), before);
  atlas.select('visited'); assert.deepEqual(atlas.ids(), ['site-5']);
  atlas.select('unvisited'); assert(!atlas.ids().includes('site-5'));
});

test('visit dates, blank dates and wishlist changes preserve catalogue order for equal years', () => {
  const atlas = setup([800, 800, 700]);
  const before = atlas.ids();
  assert.deepEqual(before, ['site-2', 'site-0', 'site-1']);
  atlas.library.setRecord('site-1', { status: 'visited', visitedOn: '2025-01-01', note: '行记' });
  atlas.library.setRecord('site-0', { status: 'visited', visitedOn: '', note: '' });
  atlas.render(); assert.deepEqual(atlas.ids(), before);
  atlas.library.setRecord('site-1', { status: 'visited', visitedOn: '2025-02-01', note: '更新行记' });
  atlas.library.setStatus('site-0', 'wishlist');
  atlas.render(); assert.deepEqual(atlas.ids(), before);
  atlas.select('wishlist'); assert.deepEqual(atlas.ids(), ['site-0']);
});

test('a completed check-in keeps the card, loaded artwork and neighbours while its record area settles', () => {
  const atlas = setup([700, 800]);
  const card = atlas.card('site-1'), neighbour = atlas.card('site-0');
  const artwork = card.querySelector('.visit-artwork'), previous = card.querySelector('.card-record');
  artwork.classList.add('is-complete');
  atlas.library.checkIn('site-1'); atlas.render();
  assert.equal(atlas.card('site-1'), card);
  assert.equal(atlas.card('site-0'), neighbour);
  assert.equal(card.querySelector('.visit-artwork'), artwork);
  assert.equal(card.dataset.status, 'visited');
  const current = card.querySelector('.card-record');
  assert(current.classList.contains('is-settling'));
  assert.equal(previous.inert, true);
  assert.equal(atlas.animations.length, 3);
  assert.deepEqual(Array.from(atlas.animations[0].frames, frame => frame.height), ['120px', '48px']);
  atlas.render(); assert.equal(card.querySelector('.card-record'), current);
  const edit = current.querySelector('.card-actions').children[0]; edit.focus();
  current.finishTransition();
  assert.equal(atlas.focused(), edit);
  assert.equal(current.querySelector('.visit-ritual'), null);
  assert(current.querySelector('.card-date'));
  assert.equal(current.style.height, undefined);
  assert(atlas.animations.every(animation => animation.cancelled));
});

test('reduced motion retains completed artwork and updates records immediately', () => {
  const atlas = setup([700], { reducedMotion: true }), card = atlas.card('site-0');
  const artwork = card.querySelector('.visit-artwork'); artwork.classList.add('is-complete');
  atlas.library.checkIn('site-0'); atlas.render();
  assert.equal(atlas.card('site-0'), card);
  assert.equal(card.querySelector('.visit-artwork'), artwork);
  assert.equal(card.querySelector('.visit-ritual'), null);
  assert.equal(atlas.animations.length, 0);
});

test('changing a record during settlement cancels and removes the outgoing controls', () => {
  const atlas = setup([700]), card = atlas.card('site-0');
  card.querySelector('.visit-artwork').classList.add('is-complete');
  atlas.library.checkIn('site-0'); atlas.render();
  const pending = card.querySelector('.card-record');
  atlas.library.setRecord('site-0', { status: 'visited', visitedOn: '', note: '新的行记' }); atlas.render();
  assert.equal(pending.finishTransition, undefined);
  assert(atlas.animations.every(animation => animation.cancelled));
  assert.equal(atlas.card('site-0').querySelector('.visit-ritual'), null);
  assert.equal(atlas.card('site-0').querySelector('.card-note').textContent, '新的行记');
});


test('editing and clearing only a review refreshes the affected card and preserves neighbouring cards', () => {
  const atlas = setup([700, 800]), neighbour = atlas.card('site-0');
  atlas.library.setReview('site-1', { rating: 4, text: '新的短评' }); atlas.render();
  assert.equal(atlas.card('site-1').querySelector('.review-summary').textContent, '新的短评');
  assert.equal(atlas.card('site-0'), neighbour);
  const reviewed = atlas.card('site-1');
  atlas.render(); assert.equal(atlas.card('site-1'), reviewed);
  atlas.library.setReview('site-1', { rating: 5, text: '改后的短评' }); atlas.render();
  assert.equal(atlas.card('site-1').querySelector('.review-summary').textContent, '改后的短评');
  atlas.library.setReview('site-1', { rating: null, text: '' }); atlas.render();
  assert.equal(atlas.card('site-1').querySelector('.review-summary'), null);
  assert.equal(atlas.library.record('site-1').status, 'unvisited');
  assert.equal(atlas.card('site-0'), neighbour);
});
