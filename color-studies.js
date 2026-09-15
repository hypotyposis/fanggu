(() => {
  'use strict';
  const studies = {
    longmenshiku: {
      name: '卢舍那大佛', period: '唐 · 暖金', accent: '#d6ab5c',
      line: 'assets/longmen-vairocana.png', width: 1024, height: 1536,
      description: '砂岩的暖意，落在衣褶与眉眼之间。',
      palette: [['暖砂', '#bba17a'], ['米金', '#d2bf99'], ['石褐', '#75654e']]
    },
    "foguang": {
      name: '佛光寺东大殿', period: '唐 · 暖金', accent: '#d6ab5c',
      line: 'assets/plates/foguang.png', width: 1536, height: 1024,
      description: '灰瓦、赭木与浅砂色，托住大殿舒展的屋檐。',
      palette: [['灰瓦', '#94816a'], ['赭木', '#9b6650'], ['浅砂', '#c3b38f']]
    },
    yingxian: {
      name: '应县木塔', period: '辽 · 朱砂', accent: '#c8442b',
      line: 'assets/plates/yingxian.png', width: 1024, height: 1536,
      description: '以朱砂点亮层层木构，让斗拱与檐下有了深浅。',
      palette: [['朱砂', '#ad5945'], ['瓦灰', '#777367'], ['木赭', '#a88962']]
    }
  };
  const viewer = document.querySelector('.study-viewer');
  const lineImage = document.getElementById('line-image');
  const underlayImage = document.getElementById('underlay-image');
  const colorImage = document.getElementById('color-image');
  const previewButton = document.getElementById('preview-checkin');
  const previewMessage = document.getElementById('preview-message');
  const status = document.getElementById('filled-status');
  const imageCaption = document.getElementById('filled-caption');
  let previewTimers = [];
  let previewVersion = 0;

  function resetPreview() {
    previewVersion++;
    previewTimers.forEach(clearTimeout);
    previewTimers = [];
    viewer.classList.remove('preview-ready', 'preview-playing');
    previewButton.disabled = false;
    status.textContent = '已到访';
    status.classList.add('filled');
    imageCaption.textContent = '设色 · 小样';
    previewMessage.textContent = '试着让这一页有了颜色';
  }

  function showMode(mode) {
    resetPreview();
    viewer.dataset.mode = mode;
    document.querySelectorAll('.study-modes button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    });
  }

  function showStudy(id) {
    const study = studies[id];
    if (!study) return;
    resetPreview();
    viewer.dataset.aspect = study.width > study.height ? 'landscape' : 'portrait';
    document.body.style.setProperty('--study-accent', study.accent);
    document.getElementById('study-name').textContent = study.name;
    document.getElementById('study-period').textContent = study.period;
    document.getElementById('study-description').textContent = study.description;
    document.querySelectorAll('[data-study]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.study === id));
    });
    lineImage.src = study.line;
    lineImage.alt = study.name + ' · 原始线稿';
    underlayImage.src = study.line;
    colorImage.src = 'assets/color-studies/v1/' + id + '-colored.png';
    colorImage.alt = study.name + ' · 矿物淡彩设色小样';
    [lineImage, underlayImage, colorImage].forEach(image => {
      image.width = study.width;
      image.height = study.height;
    });
    const palette = document.getElementById('study-palette');
    palette.replaceChildren(...study.palette.map(([name, color]) => {
      const item = document.createElement('li');
      const swatch = document.createElement('i');
      swatch.style.backgroundColor = color;
      swatch.setAttribute('aria-hidden', 'true');
      item.append(swatch, name);
      return item;
    }));
  }

  document.querySelectorAll('[data-study]').forEach(button => {
    button.addEventListener('click', () => showStudy(button.dataset.study));
  });
  document.querySelectorAll('.study-modes button').forEach(button => {
    button.addEventListener('click', () => showMode(button.dataset.mode));
  });
  previewButton.addEventListener('click', async () => {
    showMode('color');
    const version = previewVersion;
    previewButton.disabled = true;
    viewer.classList.add('preview-ready');
    status.textContent = '未到访';
    status.classList.remove('filled');
    imageCaption.textContent = '线稿 · 等待设色';
    previewMessage.textContent = '正在展开图版…';
    try {
      await Promise.all([underlayImage.decode(), colorImage.decode()]);
    } catch {
      if (version !== previewVersion) return;
      resetPreview();
      previewMessage.textContent = '图版暂未加载完成，请稍后再试';
      return;
    }
    if (version !== previewVersion) return;
    previewTimers.push(setTimeout(() => {
      viewer.classList.add('preview-playing');
      status.textContent = '已到访';
      status.classList.add('filled');
      imageCaption.textContent = '设色 · 小样';
      previewMessage.textContent = '这一处，亲眼见过了';
    }, 450));
    previewTimers.push(setTimeout(() => {
      previewButton.disabled = false;
      previewMessage.textContent = '打卡效果预览完成 · 可再次播放';
    }, 2100));
  });

  showStudy('longmenshiku');
})();
