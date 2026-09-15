/* Shared personal-record actions for the atlas and individual detail pages. */
const FangguJournal = (() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const statusNames = { unvisited: '未到访', wishlist: '想去', visited: '已到访' };
  const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text != null) node.textContent = text; return node; };
  function create(catalog, onChange) {
    let storage, visiting, toastTimer;
    try { storage = window.localStorage; }
    catch { storage = { getItem() { throw new Error('当前浏览器禁止读取本地记录'); }, setItem() { throw new Error('当前浏览器禁止保存本地记录'); } }; }
    const library = FangguLibrary.create(catalog, storage);
    function toast(message) { const node = $('#journal-toast'); node.textContent = message; node.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { node.hidden = true; }, 4500); }
    function formError(dialog, error) { const node = dialog.querySelector('.form-error'); node.textContent = error.message || String(error); node.hidden = false; }
    function open(dialog) { dialog.querySelector('.form-error').hidden = true; dialog.showModal(); }
    function button(label, action, id, className = 'card-button') {
      const b = el('button', className, label); b.type = 'button'; b.dataset.action = action; b.dataset.id = id; return b;
    }
    function arrival(site, image) {
      return FangguVisit.create(site, image, () => library.checkIn(site.id), restoreFocus => {
        onChange(); toast('到访已记下，日期与笔记可在到访记录里编辑');
        if (restoreFocus) {
          const target = document.querySelector(`button[data-action="visit"][data-id="${site.id}"]`) || document.querySelector('button[data-filter="visited"]');
          target?.focus({ preventScroll: true });
        }
      });
    }
    function visit(site) {
      visiting = site.id; const form = $('#visit-form'); form.reset();
      $('#visit-title').textContent = site.name; $('#visit-place').textContent = site.place;
      form.elements.visitedOn.max = FangguLibrary.today();
      form.elements.visitedOn.value = site.record.status === 'visited' ? site.record.visitedOn : FangguLibrary.today();
      form.elements.note.value = site.record.note;
      $('#visit-to-wish').hidden = site.record.status !== 'visited';
      open($('#visit-dialog'));
    }
    document.addEventListener('click', event => {
      const target = event.target.closest('button[data-action]'); if (!target) return;
      const site = library.all().find(s => s.id === target.dataset.id); if (!site) return;
      try {
        if (target.dataset.action === 'visit') visit(site);
        if (target.dataset.action === 'wish' || target.dataset.action === 'unwish') {
          const add = target.dataset.action === 'wish'; library.setStatus(site.id, add ? 'wishlist' : 'unvisited'); onChange(); toast(add ? '已收入心愿单' : '已移出心愿单，古迹仍保留在图鉴中');
        }
      } catch (error) { toast(error.message); }
    });
    document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
    $('#visit-form').addEventListener('submit', event => {
      event.preventDefault(); const form = event.currentTarget;
      try {
        library.setRecord(visiting, { status: 'visited', visitedOn: form.elements.visitedOn.value, note: form.elements.note.value });
        $('#visit-dialog').close(); onChange(); toast('到访已记下，可在“已到访”与行迹中查看');
      } catch (error) { formError($('#visit-dialog'), error); }
    });
    $('#visit-to-wish').addEventListener('click', () => {
      try { library.setStatus(visiting, 'wishlist'); $('#visit-dialog').close(); onChange(); toast('已改为想去，原有笔记仍保留'); }
      catch (error) { formError($('#visit-dialog'), error); }
    });
    window.addEventListener('storage', event => { if (event.key === FangguLibrary.KEY || event.key === null) { library.refresh(); onChange(); } });
    window.addEventListener('pageshow', event => { if (event.persisted) { library.refresh(); onChange(); } });
    return { library, statusNames, button, arrival, toast, open, formError };
  }
  return { create };
})();
