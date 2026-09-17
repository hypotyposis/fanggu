/* Shared personal-record actions for the atlas and individual detail pages. */
const FangguJournal = (() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const statusNames = { unvisited: '未到访', wishlist: '想去', visited: '已到访' };
  const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text != null) node.textContent = text; return node; };
  function create(catalog, onChange) {
    let storage, visiting, reviewing, toastTimer;
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
    const reviewForm = $('#review-form');
    const ratingNames = ['很差', '较差', '还行', '推荐', '力荐'];
    ratingNames.forEach((name, index) => {
      const label = el('label', 'rating-option'), input = el('input'), star = el('span', '', '★');
      input.type = 'radio'; input.name = 'rating'; input.value = String(index + 1);
      input.setAttribute('aria-label', `${index + 1} 星 · ${name}`); star.setAttribute('aria-hidden', 'true');
      label.title = `${index + 1} 星 · ${name}`; label.append(input, star); $('#review-stars').append(label);
    });
    function updateReviewForm() {
      const rating = Number(reviewForm.elements.rating.value);
      $('#review-stars').querySelectorAll('label').forEach((label, index) => label.classList.toggle('is-filled', index < rating));
      const ratingLabel = rating ? `${rating} 星 · ${ratingNames[rating - 1]}` : '未评分';
      if ($('#review-rating-label').textContent !== ratingLabel) $('#review-rating-label').textContent = ratingLabel;
      $('#review-unrate').disabled = !rating;
      $('#review-count').textContent = `${reviewForm.elements.shortReview.value.length} / ${FangguLibrary.REVIEW_LIMIT}`;
    }
    function editReview(site) {
      reviewing = site.id; reviewForm.reset();
      const current = library.review(site.id);
      $('#review-title').textContent = site.name; $('#review-place').textContent = site.place;
      reviewForm.elements.rating.value = current.rating == null ? '' : String(current.rating);
      reviewForm.elements.shortReview.value = current.text;
      $('#review-clear').hidden = current.rating == null && !current.text;
      updateReviewForm(); open($('#review-dialog'));
    }
    function saveReview(value) {
      try {
        library.setReview(reviewing, value);
        $('#review-dialog').close(); onChange();
        toast(value.rating == null && !value.text.trim() ? '评价已清除' : '我的评价已保存');
        document.querySelector(`button[data-action="review"][data-id="${reviewing}"]`)?.focus({ preventScroll: true });
      } catch (error) { formError($('#review-dialog'), error); }
    }
    reviewForm.addEventListener('input', updateReviewForm);
    reviewForm.addEventListener('change', updateReviewForm);
    reviewForm.addEventListener('submit', event => {
      event.preventDefault();
      saveReview({ rating: reviewForm.elements.rating.value ? Number(reviewForm.elements.rating.value) : null, text: reviewForm.elements.shortReview.value });
    });
    $('#review-unrate').addEventListener('click', () => {
      reviewForm.querySelectorAll('input[name="rating"]').forEach(input => { input.checked = false; });
      updateReviewForm();
    });
    $('#review-clear').addEventListener('click', () => saveReview({ rating: null, text: '' }));
    function reviewSummary(id, compact = false) {
      const current = library.review(id), hasReview = current.rating != null || !!current.text;
      if (compact && !hasReview) return null;
      const section = el('section', compact ? 'review-summary compact' : 'review-summary');
      section.setAttribute('aria-label', '我的评价');
      const heading = el('div', 'review-heading');
      heading.append(el(compact ? 'span' : 'h2', 'review-title', '我的评价'));
      if (!compact) heading.append(button(hasReview ? '编辑评价' : '写短评 / 打分', 'review', id));
      section.append(heading);
      if (hasReview) {
        const rating = el('p', 'review-rating');
        if (current.rating != null) {
          const stars = el('span', 'review-stars', '★'.repeat(current.rating) + '☆'.repeat(5 - current.rating));
          stars.setAttribute('role', 'img'); stars.setAttribute('aria-label', `${current.rating} / 5 星`);
          rating.append(stars, el('span', 'mono', `${current.rating} / 5`));
        } else rating.append(el('span', 'review-unrated', '未评分'));
        section.append(rating);
        if (current.text) section.append(el('p', compact ? 'card-note review-text' : 'review-text', current.text));
        if (!compact) {
          const time = el('time', 'review-time mono', `更新于 ${new Date(current.updatedAt).toLocaleDateString('zh-CN')}`);
          time.dateTime = current.updatedAt; section.append(time);
        }
      } else section.append(el('p', 'review-empty', '留几句感想，为这处古迹打个分。仅保存在当前浏览器。'));
      return section;
    }
    document.addEventListener('click', event => {
      const target = event.target.closest('button[data-action]'); if (!target) return;
      const site = library.all().find(s => s.id === target.dataset.id); if (!site) return;
      try {
        if (target.dataset.action === 'visit') visit(site);
        if (target.dataset.action === 'review') editReview(site);
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
        $('#visit-dialog').close(); onChange(); toast('到访已记下，可在“已到访”与地图中查看');
      } catch (error) { formError($('#visit-dialog'), error); }
    });
    $('#visit-to-wish').addEventListener('click', () => {
      try { library.setStatus(visiting, 'wishlist'); $('#visit-dialog').close(); onChange(); toast('已改为想去，原有笔记仍保留'); }
      catch (error) { formError($('#visit-dialog'), error); }
    });
    window.addEventListener('storage', event => { if (event.key === FangguLibrary.KEY || event.key === null) { library.refresh(); onChange(); } });
    window.addEventListener('pageshow', event => { if (event.persisted) { library.refresh(); onChange(); } });
    return { library, statusNames, button, arrival, reviewSummary, toast, open, formError };
  }
  return { create };
})();
