const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { create, KEY, today } = require('../library.js');

// Small event/DOM adapter: exercise the real slider handlers and persistence boundary.
function setup({ loaded = true, failing = false } = {}) {
  const document = { activeElement: null };
  class Node {
    constructor(tag) {
      this.tagName = tag; this.children = []; this.events = {}; this.attrs = new Map(); this.className = '';
      this.classList = {
        contains: name => this.className.split(' ').includes(name),
        add: name => { if (!this.classList.contains(name)) this.className += ` ${name}`; },
        remove: name => { this.className = this.className.split(' ').filter(item => item !== name).join(' '); }
      };
      this.style = new Map(); this.style.setProperty = this.style.set.bind(this.style);
    }
    append(...nodes) {
      for (const node of nodes) {
        if (node.parentElement) node.parentElement.children = node.parentElement.children.filter(child => child !== node);
        node.parentElement = this; this.children.push(node);
      }
    }
    replaceWith(node) {
      const parent = this.parentElement, index = parent.children.indexOf(this);
      if (node.parentElement) node.parentElement.children = node.parentElement.children.filter(child => child !== node);
      parent.children[index] = node; node.parentElement = parent; this.parentElement = null;
    }
    setAttribute(name, value) { this.attrs.set(name, value); }
    removeAttribute(name) { this.attrs.delete(name); }
    addEventListener(type, listener) { (this.events[type] ||= []).push(listener); }
    emit(type, props = {}) {
      const event = { type, button: 0, isPrimary: true, pointerId: 1, preventDefault() {}, ...props };
      for (const listener of this.events[type] || []) listener(event);
    }
    focus() { document.activeElement = this; }
    setPointerCapture(id) { this.capture = id; }
    releasePointerCapture() { this.capture = null; this.emit('lostpointercapture'); }
    getBoundingClientRect() { return { left: 0, width: this.className === 'visit-thumb' ? 48 : 248 }; }
  }
  document.createElement = tag => new Node(tag);
  const data = new Map(); let fail = failing;
  const storage = { getItem: key => data.get(key) ?? null, setItem(key, value) { if (fail) throw Error('full'); data.set(key, value); } };
  const site = { id: 'test-site', name: '试读古迹', image: { src: 'line.png', width: 100, height: 100 } };
  const library = create([site], storage), timers = [], updates = [];
  const context = vm.createContext({ document, setTimeout: callback => timers.push(callback), FangguArtwork: { resolve: () => ({ src: 'color.png', alt: '古迹设色图', colored: true }) } });
  const api = vm.runInContext(fs.readFileSync(require.resolve('../visit-slider.js'), 'utf8') + '\nFangguVisit;', context);
  const parent = new Node('figure'), image = new Node('img'); parent.append(image);
  let saves = 0;
  const ritual = api.create(site, image, () => { saves++; library.checkIn(site.id); }, focus => updates.push(focus));
  const wrapper = image.parentElement, color = wrapper.children[1];
  const range = ritual.children[0].children[2], hint = ritual.children[1], retry = ritual.children[2];
  const load = () => { color.naturalWidth = 100; color.onload(); };
  if (loaded) load();
  return { api, site, storage, library, parent, image, wrapper, color, ritual, range, hint, retry, timers, updates, load,
    fail: value => { fail = value; }, saves: () => saves,
    progress: () => wrapper.style.get('--visit-progress'),
    colorOpacity: () => wrapper.style.get('--visit-opacity'),
    lineOpacity: () => wrapper.style.get('--visit-line-opacity'),
    drag: (x = 224) => { range.emit('pointerdown', { clientX: 24 }); range.emit('pointermove', { clientX: x }); },
    release: (x = 224) => range.emit('pointerup', { clientX: x }) };
}

test('partial drag reveals color reversibly; reaching the end alone never saves', () => {
  const s = setup(); s.drag(124);
  assert.equal(s.progress(), '50%'); assert.equal(s.lineOpacity(), '1'); assert.equal(s.saves(), 0);
  s.range.emit('pointermove', { clientX: 204 });
  assert.equal(s.progress(), '90%'); assert.equal(s.lineOpacity(), '0.5');
  s.range.emit('pointermove', { clientX: 224 });
  assert.equal(s.colorOpacity(), '1'); assert.equal(s.lineOpacity(), '0');
  s.range.emit('pointermove', { clientX: 124 });
  s.release(124); assert.equal(s.progress(), '0%'); assert.equal(s.storage.getItem(KEY), null);
  s.drag(); assert.equal(s.progress(), '100%'); assert.equal(s.saves(), 0);
  s.range.emit('pointermove', { clientX: 74 }); assert.equal(s.progress(), '25%');
  s.release(74); assert.equal(s.saves(), 0);
  s.range.emit('pointerdown', { clientX: 224 }); s.release();
  assert.equal(s.saves(), 0, 'clicking the track end must not check in');
});

test('release at the end saves once before the seal finishes and preserves fresh notes', () => {
  const s = setup();
  const otherTab = create([s.site], s.storage);
  otherTab.setRecord(s.site.id, { status: 'wishlist', visitedOn: '', note: '刚写下的笔记' });
  s.drag(); s.release(); s.release(); s.range.emit('change');
  assert.equal(s.saves(), 1); assert.equal(s.updates.length, 0);
  assert.deepEqual(create([s.site], s.storage).record(s.site.id), { status: 'visited', visitedOn: today(), note: '刚写下的笔记' });
  assert(s.wrapper.classList.contains('is-complete'));
  s.timers[0](); assert.deepEqual(s.updates, [true]);
  // A second tab's historical visit must not have its date overwritten by a stale slider.
  otherTab.setRecord(s.site.id, { status: 'visited', visitedOn: '2025-04-05', note: '原记录' });
  s.library.checkIn(s.site.id);
  assert.equal(s.library.record(s.site.id).visitedOn, '2025-04-05');
});

test('cancelled touch gestures, lost capture and loss of focus never save a full reveal', () => {
  for (const type of ['pointercancel', 'lostpointercapture', 'blur']) {
    const s = setup(); s.drag(); s.range.emit(type); s.release();
    assert.equal(s.progress(), '0%'); assert.equal(s.saves(), 0);
  }
});

test('keyboard and assistive range changes reveal progressively and commit only at 100', () => {
  const s = setup();
  s.range.value = '50'; s.range.emit('input'); s.range.emit('change');
  assert.equal(s.progress(), '50%'); assert.equal(s.saves(), 0);
  s.range.emit('keydown', { key: 'Escape' }); assert.equal(s.progress(), '0%');
  s.range.value = '100'; s.range.emit('input'); s.range.emit('change');
  assert.equal(s.saves(), 1); assert.equal(s.library.record(s.site.id).status, 'visited');
});

test('failed artwork can retry; failed storage resets the reveal without false success', () => {
  const s = setup({ loaded: false, failing: true });
  s.drag(); s.release(); assert.equal(s.saves(), 0);
  s.color.onerror(); assert.equal(s.retry.hidden, false); assert.equal(s.range.disabled, true);
  s.retry.emit('click'); s.load(); assert.equal(s.range.disabled, false);
  s.drag(); s.release();
  assert.equal(s.progress(), '0%'); assert.equal(s.library.record(s.site.id).status, 'unvisited');
  assert.equal(s.hint.attrs.get('role'), 'alert'); assert.equal(s.timers.length, 0);
  s.fail(false); s.drag(); s.release();
  assert.equal(s.library.record(s.site.id).status, 'visited'); assert.equal(s.timers.length, 1);
});

test('replacing detail artwork removes the old reveal and its pending gesture', () => {
  const s = setup(); s.drag(); s.api.clear(s.image); s.release();
  assert.equal(s.image.parentElement, s.parent); assert.equal(s.parent.children.length, 1);
  assert.equal(s.saves(), 0); assert.equal(s.color.onload, null);
});
