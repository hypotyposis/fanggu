const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../color-proof.js'), 'utf8');
// Exercise status rendering independently of browser layout; real image loading is checked in-browser.
function render(status, single = false) {
  const nodes = new Map();
  const node = () => ({ value: '', textContent: '', dataset: {}, classList: { add() {}, toggle() {} },
    append() {}, replaceChildren() {}, setAttribute() {}, addEventListener() {} });
  const document = { body: node(), createElement: node, createTextNode: text => ({ textContent: text }),
    addEventListener() {}, querySelectorAll: () => [], querySelector: selector => {
      if (!nodes.has(selector)) nodes.set(selector, node());
      return nodes.get(selector);
    } };
  document.querySelector('#color-period').value = 'all';
  vm.runInNewContext(source, { document, URLSearchParams, location: { search: single ? '?id=one' : '' },
    SITES: [{ id: 'one', name: '测试古迹', dyn: 'tang', place: '测试地点', image: { src: 'line.png' } }],
    DYN: { tang: { name: '唐' } }, COLORED_PLATES: { one: { src: 'color.avif', visualReview: status } } });
  return selector => nodes.get(selector)?.textContent || '';
}

test('default approval is delivered without claiming human review or counting as pending', () => {
  const list = render('approved_default');
  assert.match(list('#color-review-summary'), /1 张按默认策略接入，未人工审阅/);
  assert.match(list('#color-count'), /全部已通过/);
  assert.doesNotMatch(list('#color-review-summary'), /待|已通过人工审阅/);
  assert.equal(render('approved_default', true)('#single-review'), '透明设色 · 按默认策略接入（未人工审阅）');
});

test('explicit human approval and transient pending states retain distinct labels', () => {
  assert.equal(render('approved_user', true)('#single-review'), '透明设色 · 已通过人工审阅');
  assert.match(render('approved_user')('#color-review-summary'), /全部透明图版已通过人工审阅/);
  assert.match(render('pending_user')('#color-review-summary'), /1 张待默认通过/);
  assert.equal(render('pending_user', true)('#single-review'), '透明设色 · 待默认通过');
});
