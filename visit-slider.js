/* A reversible color reveal; only releasing at the end records the visit. */
const FangguVisit = (() => {
  'use strict';
  const el = (tag, className, text) => {
    const node = document.createElement(tag); node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  function clear(image) {
    const wrapper = image.parentElement;
    if (wrapper?.classList.contains('visit-artwork')) {
      wrapper.dispose(); wrapper.replaceWith(image);
    }
  }
  function createSeal() {
    const seal = el('span', 'arrival-seal', '亲\n见');
    seal.setAttribute('aria-hidden', 'true');
    return seal;
  }
  function mark(image) {
    clear(image);
    const wrapper = el('span', 'visit-artwork is-marked');
    wrapper.dispose = () => {};
    image.replaceWith(wrapper); wrapper.append(image, createSeal());
  }
  function create(site, image, save, onComplete) {
    clear(image);
    const artwork = FangguArtwork.resolve(site, 'visited');
    const wrapper = el('span', 'visit-artwork');
    image.replaceWith(wrapper); wrapper.append(image);
    const color = el('img', 'visit-color');
    color.alt = ''; color.setAttribute('aria-hidden', 'true');
    color.width = site.image.width; color.height = site.image.height;
    // This image starts invisible. Native lazy loading may never request it,
    // leaving the slider disabled forever while it waits for the load event.
    color.loading = 'eager'; color.decoding = 'async';
    const seal = createSeal();
    wrapper.append(color, seal);
    const ritual = el('div', 'visit-ritual');
    const track = el('div', 'visit-track');
    const label = el('span', 'visit-track-label', '正在展开图版…');
    const thumb = el('span', 'visit-thumb', '访');
    label.setAttribute('aria-hidden', 'true'); thumb.setAttribute('aria-hidden', 'true');
    const range = el('input', 'visit-range');
    range.type = 'range'; range.min = '0'; range.max = '100'; range.step = '1'; range.value = '0'; range.disabled = true;
    range.setAttribute('aria-label', `拖动为${site.name}设色并记录到访`);
    const hint = el('p', 'visit-hint', '拖至尽头，记下今日到访');
    hint.id = `visit-hint-${site.id}`; range.setAttribute('aria-describedby', hint.id);
    const retry = el('button', 'card-button visit-retry', '重新展开图版'); retry.type = 'button'; retry.hidden = true;
    track.append(label, thumb, range); ritual.append(track, hint, retry);
    let progress = 0, pointer = null, origin = 0, start = 0, travel = 1, done = false, disposed = false, ready = false;
    function paint(value) {
      progress = Math.max(0, Math.min(100, value));
      range.value = String(Math.round(progress));
      for (const node of [wrapper, ritual]) node.style.setProperty('--visit-progress', `${progress}%`);
      // Scrub the three-study preview's full-image fade, preserving its line underlay.
      wrapper.style.setProperty('--visit-opacity', String(progress / 100));
      label.textContent = progress >= 100 ? '松手 · 留印' : progress > 0 ? '慢慢为古迹添色' : '向右拖动 · 设色';
      range.setAttribute('aria-valuetext', progress >= 100 ? '设色完成，松开即记录到访' : `设色 ${Math.round(progress)}%，拖至尽头记录到访`);
    }
    function reset() {
      if (done || disposed) return;
      pointer = null;
      wrapper.classList.remove('is-dragging'); ritual.classList.remove('is-dragging');
      paint(0);
    }
    function finish() {
      if (done || disposed || range.disabled || progress < 100) return;
      try { save(); }
      catch (error) {
        reset(); hint.textContent = error.message || '未能保存，请再试一次'; hint.setAttribute('role', 'alert');
        return;
      }
      done = true; pointer = null;
      wrapper.classList.add('is-complete'); ritual.classList.add('is-complete');
      label.textContent = '已到访 · 留印';
      hint.textContent = '今日到访已记下，日期与笔记可继续编辑'; hint.setAttribute('role', 'status');
      range.setAttribute('aria-valuetext', '已完成设色，到访已保存'); range.setAttribute('aria-disabled', 'true');
      image.alt = artwork.alt || site.name;
      // Save first, then let the stamp land and settle before the catalogue redraw.
      const reduceMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => onComplete(document.activeElement === range), reduceMotion ? 0 : 1350);
    }
    function loaded() {
      if (disposed || ready || !color.naturalWidth) return;
      ready = true;
      range.disabled = false; retry.hidden = true; hint.removeAttribute('role');
      hint.textContent = '拖至尽头，记下今日到访'; paint(0);
    }
    color.onload = loaded;
    color.onerror = () => {
      if (disposed) return;
      reset(); ready = false; range.disabled = true; label.textContent = '设色图暂未展开';
      hint.textContent = '图版加载失败，请重试'; hint.setAttribute('role', 'status'); retry.hidden = false;
    };
    function load() {
      retry.hidden = true; label.textContent = '正在展开图版…';
      color.src = artwork.src;
      if (color.complete && color.naturalWidth) loaded();
    }
    retry.addEventListener('click', load);
    range.addEventListener('pointerdown', event => {
      if (range.disabled || done || disposed || event.button !== 0 || event.isPrimary === false) return;
      event.preventDefault(); range.focus({ preventScroll: true });
      const rect = range.getBoundingClientRect(), size = thumb.getBoundingClientRect().width;
      travel = Math.max(1, rect.width - size);
      const center = rect.left + size / 2 + travel * progress / 100;
      // A click on the track cannot skip the gesture and check in accidentally.
      if (Math.abs(event.clientX - center) > size / 2 + 4) return;
      pointer = event.pointerId; origin = event.clientX; start = progress;
      range.setPointerCapture(pointer);
      wrapper.classList.add('is-dragging'); ritual.classList.add('is-dragging');
      hint.removeAttribute('role'); hint.textContent = '拖至尽头，记下今日到访';
    });
    range.addEventListener('pointermove', event => {
      if (pointer !== event.pointerId) return;
      paint(start + (event.clientX - origin) / travel * 100);
    });
    range.addEventListener('pointerup', event => {
      if (pointer !== event.pointerId) return;
      paint(start + (event.clientX - origin) / travel * 100);
      pointer = null;
      range.releasePointerCapture(event.pointerId);
      if (progress >= 100) finish(); else reset();
    });
    range.addEventListener('pointercancel', reset);
    range.addEventListener('lostpointercapture', () => { if (pointer !== null) reset(); });
    range.addEventListener('blur', reset);
    range.addEventListener('keydown', event => {
      if (done && event.key !== 'Tab') { event.preventDefault(); return; }
      if (event.key === 'Escape') { event.preventDefault(); reset(); }
    });
    // Native range keys and assistive technology use the same reveal and save boundary.
    range.addEventListener('input', () => {
      if (!done && pointer === null && !range.disabled) {
        wrapper.classList.add('is-dragging'); ritual.classList.add('is-dragging');
        paint(Number(range.value));
      }
    });
    range.addEventListener('change', () => { if (pointer === null) finish(); });
    wrapper.dispose = () => {
      disposed = true; pointer = null; color.onload = null; color.onerror = null;
    };
    paint(0); load();
    return ritual;
  }
  return { create, clear, mark };
})();
