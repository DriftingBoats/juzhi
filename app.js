const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  quote: $('#quoteInput'), author: $('#authorInput'), book: $('#bookInput'),
  quotePreview: $('#quotePreview'), authorPreview: $('#authorPreview'), bookPreview: $('#bookPreview'),
  attributionPreview: $('#attributionPreview'), sourceDivider: $('.divider'), quoteCount: $('#quoteCount'),
  bookTitleMark: $('#bookTitleMark'),
  wallpaper: $('#wallpaper'), quoteBlock: $('#quoteBlock'), sourceBlock: $('#sourceBlock'), groupSelectionBox: $('#groupSelectionBox'), deviceStage: $('#deviceStage'),
  deviceBrand: $('#deviceBrandSelect'), device: $('#deviceSelect'), deviceModelLabel: $('#deviceModelLabel'),
  deviceModels: $('#deviceModels'), customSize: $('#customSize'),
  customWidth: $('#customWidth'), customHeight: $('#customHeight'), dimension: $('#dimensionLabel'),
  mobileDimension: $('#mobileDimension'), rulerWidth: $('#rulerWidth'), rulerHeight: $('#rulerHeight'), scale: $('#scaleLabel'),
  safeArea: $('#safeAreaToggle'), fontStyle: $('#fontStyleSelect'), fontUpload: $('#fontUpload'),
  fontSize: $('#fontSizeRange'), fontSizeOutput: $('#fontSizeOutput'),
  lineHeight: $('#lineHeightRange'), lineHeightOutput: $('#lineHeightOutput'),
  x: $('#xRange'), xOutput: $('#xOutput'), y: $('#yRange'), yOutput: $('#yOutput'),
  width: $('#widthRange'), widthOutput: $('#widthOutput'), ink: $('#inkRange'), inkOutput: $('#inkOutput'),
  targetHint: $('#targetHint'), studioInspector: $('#studioInspector'), styleSettingsHint: $('#styleSettingsHint'), export: $('#exportButton'), mobileExport: $('#mobileExportButton'),
  previewReset: $('#previewResetButton'), toast: $('#toast'), canvas: $('#exportCanvas')
};

const templateDefaults = {
  poem: {
    quote: { fontSize: 54, lineHeight: 1.65, x: 12, y: 27, width: 76, align: 'left', fontStyle: 'ming', ink: 30 },
    source: { fontSize: 22, lineHeight: 1.5, x: 12, y: 72, width: 76, align: 'left', fontStyle: 'ming', ink: 18 }
  },
  ink: {
    quote: { fontSize: 62, lineHeight: 1.5, x: 9, y: 25, width: 82, align: 'left', fontStyle: 'print', ink: 68 },
    source: { fontSize: 23, lineHeight: 1.45, x: 9, y: 76, width: 82, align: 'left', fontStyle: 'print', ink: 42 }
  },
  book: {
    quote: { fontSize: 52, lineHeight: 1.68, x: 11, y: 23, width: 66, align: 'left', fontStyle: 'fangsong', ink: 38 },
    source: { fontSize: 20, lineHeight: 1.5, x: 11, y: 69, width: 62, align: 'left', fontStyle: 'fangsong', ink: 22 }
  }
};

const deviceCatalog = {
  generic: [
    { value: '1072x1448', label: '1072 × 1448 · 6 英寸 300 PPI', models: '常见 6 英寸 300 PPI 电纸书' },
    { value: '1236x1648', label: '1236 × 1648 · 6.8 英寸 300 PPI', models: '常见 6.8 英寸 300 PPI 电纸书' },
    { value: '1264x1680', label: '1264 × 1680 · 7 英寸 300 PPI', models: '常见 7 英寸 300 PPI 电纸书' },
    { value: '1404x1872', label: '1404 × 1872 · 7.8 英寸 300 PPI', models: '常见 7.8 英寸 300 PPI 电纸书' },
    { value: '1440x1920', label: '1440 × 1920 · 8 英寸 300 PPI', models: '常见 8 英寸 300 PPI 电纸书' },
    { value: '1404x1872', label: '1404 × 1872 · 10.3 英寸 227 PPI', models: '常见 10.3 英寸 227 PPI 电纸书' },
    { value: '1860x2480', label: '1860 × 2480 · 10.2–10.3 英寸 300 PPI', models: '常见 10.2–10.3 英寸 300 PPI 电纸书' },
    { value: '824x1648', label: '824 × 1648 · 长屏', models: '手机型长屏电纸书' },
    { value: 'custom', label: '自定义尺寸…', models: '输入设备的实际像素尺寸' }
  ],
  kindle: [
    { value: '1072x1448', label: 'Kindle 11 · 1072 × 1448', models: 'Kindle 11' },
    { value: '1236x1648', label: 'Paperwhite 11 · 1236 × 1648', models: 'Kindle Paperwhite 11' },
    { value: '1264x1680', label: 'Paperwhite 12 · 1264 × 1680', models: 'Kindle Paperwhite 12' },
    { value: '1860x2480', label: 'Kindle Scribe · 1860 × 2480', models: 'Kindle Scribe' }
  ],
  kobo: [
    { value: '1072x1448', label: 'Clara BW / 2E · 1072 × 1448', models: 'Kobo Clara BW、2E' },
    { value: '1264x1680', label: 'Libra 2 / Colour · 1264 × 1680', models: 'Kobo Libra 2、Libra Colour' },
    { value: '1440x1920', label: 'Kobo Sage · 1440 × 1920', models: 'Kobo Sage' },
    { value: '1404x1872', label: 'Elipsa 2E · 1404 × 1872', models: 'Kobo Elipsa 2E' }
  ],
  boox: [
    { value: '1072x1448', label: 'Go 6 · 1072 × 1448', models: '文石 BOOX Go 6' },
    { value: '1264x1680', label: 'Page / Go 7 · 1264 × 1680', models: '文石 BOOX Page、Go 7' },
    { value: '1404x1872', label: 'Note Air 2 · 1404 × 1872', models: '文石 BOOX Note Air 2' },
    { value: '1860x2480', label: 'Go 10.3 · 1860 × 2480', models: '文石 BOOX Go 10.3' },
    { value: '824x1648', label: 'Palma 系列 · 824 × 1648', models: '文石 BOOX Palma 系列' }
  ],
  ireader: [
    { value: '1072x1448', label: 'Light / Neo · 1072 × 1448', models: '掌阅 iReader Light、Neo 系列' },
    { value: '1264x1680', label: 'Ocean 4 / 5 · 1264 × 1680', models: '掌阅 iReader Ocean 4、5' },
    { value: '1404x1872', label: 'Smart 5 · 1404 × 1872', models: '掌阅 iReader Smart 5 标准版' },
    { value: '1860x2480', label: 'Smart 5 Pro · 1860 × 2480', models: '掌阅 iReader Smart 5 Pro' }
  ],
  hanvon: [
    { value: '1264x1680', label: 'Clear 7 · 1264 × 1680', models: '汉王 Clear 7' },
    { value: '1404x1872', label: 'N10 mini · 1404 × 1872', models: '汉王 N10 mini' }
  ]
};

const fontStacks = {
  ming: '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", "SimSun", serif',
  print: '"FZSongKeBenXiuKaiS-R-GB", "Source Han Serif SC", "Noto Serif CJK SC", "STSong", "Songti SC", "SimSun", serif',
  fangsong: '"FangSong", "STFangsong", "FangSong_GB2312", "仿宋", "Songti SC", "SimSun", serif',
  kai: '"Kaiti SC", "STKaiti", "KaiTi", "KaiTi_GB2312", "楷体", "Songti SC", serif',
  custom: '"YejianCustom", "Source Han Serif SC", "Songti SC", "SimSun", serif'
};

const previewDefaults = {
  quote: '把喜欢的句子，留在纸上。',
  author: '作者',
  book: '书名'
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function getPreviewContent() {
  const quote = elements.quote.value;
  return {
    quote: quote.trim() ? quote : previewDefaults.quote,
    author: elements.author.value.trim() || previewDefaults.author,
    book: elements.book.value.trim() || previewDefaults.book
  };
}

let state = { template: 'poem', orientation: 'portrait', editTarget: 'quote', previewTarget: null, ...clone(templateDefaults.poem) };
let toastTimer;
let drag = null;
let saveTimer;
const storageKey = 'juzhi-session-v1';

function restoreBlockStyle(savedStyle, defaults) {
  const style = { ...defaults, ...(savedStyle && typeof savedStyle === 'object' ? savedStyle : {}) };
  style.fontSize = clamp(Number(style.fontSize) || defaults.fontSize, 12, 76);
  style.lineHeight = clamp(Number(style.lineHeight) || defaults.lineHeight, 1.2, 2.1);
  style.x = clamp(Number(style.x) || defaults.x, 3, 94);
  style.y = clamp(Number(style.y) || defaults.y, 3, 94);
  style.width = clamp(Number(style.width) || defaults.width, 16, 94);
  style.ink = clamp(Number(style.ink) || 0, 0, 100);
  style.align = ['left', 'center', 'right'].includes(style.align) ? style.align : defaults.align;
  style.fontStyle = fontStacks[style.fontStyle] && style.fontStyle !== 'custom' ? style.fontStyle : defaults.fontStyle;
  return style;
}

function saveSession() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      content: { quote: elements.quote.value, author: elements.author.value, book: elements.book.value },
      state: {
        template: state.template,
        orientation: state.orientation,
        quote: state.quote,
        source: state.source
      },
      device: {
        brand: elements.deviceBrand.value,
        value: elements.device.value,
        index: elements.device.selectedIndex,
        customWidth: elements.customWidth.value,
        customHeight: elements.customHeight.value
      },
      safeArea: elements.safeArea.checked
    }));
  } catch { /* Storage can be unavailable in private browsing. */ }
}

function scheduleSaveSession() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveSession, 120);
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== 'object') return null;
    const savedState = saved.state || {};
    const template = templateDefaults[savedState.template] ? savedState.template : 'poem';
    const defaults = templateDefaults[template];
    state = {
      template,
      orientation: ['portrait', 'landscape'].includes(savedState.orientation) ? savedState.orientation : 'portrait',
      editTarget: 'quote',
      previewTarget: null,
      quote: restoreBlockStyle(savedState.quote, defaults.quote),
      source: restoreBlockStyle(savedState.source, defaults.source)
    };
    elements.quote.value = saved.content?.quote ?? '';
    elements.author.value = saved.content?.author ?? '';
    elements.book.value = saved.content?.book ?? '';
    elements.deviceBrand.value = deviceCatalog[saved.device?.brand] ? saved.device.brand : 'generic';
    elements.customWidth.value = saved.device?.customWidth || '1080';
    elements.customHeight.value = saved.device?.customHeight || '1440';
    elements.safeArea.checked = Boolean(saved.safeArea);
    elements.wallpaper.classList.remove('template-poem', 'template-ink', 'template-book');
    elements.wallpaper.classList.add(`template-${template}`);
    elements.wallpaper.classList.toggle('show-safe-area', elements.safeArea.checked);
    $$('.template-option').forEach((button) => {
      const active = button.dataset.template === template;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
    });
    return saved.device || null;
  } catch { return null; }
}

function currentStyle() { return state[state.editTarget === 'all' ? 'quote' : state.editTarget]; }
function selectedTargets() { return state.editTarget === 'all' ? ['quote', 'source'] : [state.editTarget]; }

function splitBookTitle(title) {
  const characters = [...(title || '')].slice(0, 18);
  if (!characters.length) return [];
  const columnCount = Math.max(1, Math.ceil(characters.length / 6));
  const baseLength = Math.floor(characters.length / columnCount);
  const longerColumns = characters.length % columnCount;
  const columns = [];
  let cursor = 0;
  for (let index = 0; index < columnCount; index += 1) {
    const length = baseLength + (index < longerColumns ? 1 : 0);
    columns.push(characters.slice(cursor, cursor + length));
    cursor += length;
  }
  return columns;
}

function syncContent() {
  const { quote, author, book } = getPreviewContent();
  elements.quotePreview.textContent = quote;
  elements.authorPreview.textContent = author;
  elements.bookPreview.textContent = book ? `《${book}》` : '';
  elements.sourceDivider.hidden = !(author && book);
  elements.bookTitleMark.replaceChildren(...splitBookTitle(book).map((column) => {
    const span = document.createElement('span');
    span.className = 'book-title-column';
    span.textContent = column.join('');
    return span;
  }));
  elements.quoteCount.textContent = `${elements.quote.value.length} / 180`;
  scheduleSaveSession();
}

function applyInk(element, ink) {
  const spread = ink / 100;
  element.style.textShadow = `${(0.004 + spread * 0.022).toFixed(3)}em 0 currentColor, -${(spread * 0.012).toFixed(3)}em 0 currentColor, 0 ${(spread * 0.008).toFixed(3)}em currentColor`;
}

function applyBlockStyle(target) {
  const style = state[target];
  const block = target === 'quote' ? elements.quoteBlock : elements.sourceBlock;
  const text = target === 'quote' ? elements.quotePreview : elements.attributionPreview;
  block.style.left = `${style.x}%`;
  block.style.top = `${style.y}%`;
  block.style.width = `${style.width}%`;
  block.style.textAlign = style.align;
  text.style.fontSize = `${style.fontSize / 10.72}cqi`;
  text.style.lineHeight = style.lineHeight;
  text.style.fontFamily = fontStacks[style.fontStyle];
  if (target === 'source') text.style.justifyContent = style.align === 'center' ? 'center' : style.align === 'right' ? 'flex-end' : 'flex-start';
  applyInk(text, style.ink);
}

function updateGroupSelectionBox() {
  if (state.previewTarget !== 'all') return;
  const paper = elements.wallpaper.getBoundingClientRect();
  const quote = elements.quoteBlock.getBoundingClientRect();
  const source = elements.sourceBlock.getBoundingClientRect();
  const inset = 0.8;
  const left = Math.min(quote.left, source.left);
  const top = Math.min(quote.top, source.top);
  const right = Math.max(quote.right, source.right);
  const bottom = Math.max(quote.bottom, source.bottom);
  elements.groupSelectionBox.style.left = `${clamp((left - paper.left) / paper.width * 100 - inset, 0.4, 99)}%`;
  elements.groupSelectionBox.style.top = `${clamp((top - paper.top) / paper.height * 100 - inset, 0.4, 99)}%`;
  elements.groupSelectionBox.style.width = `${clamp((right - left) / paper.width * 100 + inset * 2, 2, 99)}%`;
  elements.groupSelectionBox.style.height = `${clamp((bottom - top) / paper.height * 100 + inset * 2, 2, 99)}%`;
}

function updateStyleSettingsHint() {
  const templateName = document.querySelector('.template-option.is-active strong')?.textContent || '蓝墨诗笺';
  const brandName = elements.deviceBrand.selectedOptions[0]?.textContent || '通用';
  const { width, height } = getDimensions();
  elements.styleSettingsHint.textContent = `${templateName} · ${brandName} · ${width} × ${height}`;
}

function syncControls() {
  const style = currentStyle();
  elements.fontSize.value = style.fontSize;
  elements.lineHeight.value = Math.round(style.lineHeight * 100);
  elements.x.value = Math.round(style.x);
  elements.y.value = Math.round(style.y);
  elements.width.value = Math.round(style.width);
  elements.ink.value = style.ink;
  elements.fontStyle.value = style.fontStyle;
  elements.fontSizeOutput.value = style.fontSize;
  elements.lineHeightOutput.value = style.lineHeight.toFixed(2).replace(/0$/, '');
  elements.xOutput.value = `${Math.round(style.x)}%`;
  elements.yOutput.value = `${Math.round(style.y)}%`;
  elements.widthOutput.value = `${Math.round(style.width)}%`;
  elements.inkOutput.value = `${Math.round(style.ink)}%`;
  elements.targetHint.textContent = state.previewTarget === null
    ? '先选择要调整的内容'
    : state.editTarget === 'quote'
      ? '正在调整书摘正文'
      : state.editTarget === 'source' ? '正在调整作者与书名' : '正在同步调整两组文字';
  elements.studioInspector.classList.toggle('has-selection', state.previewTarget !== null);
  applyBlockStyle('quote');
  applyBlockStyle('source');
  $$('.align-button').forEach((button) => {
    const active = button.dataset.align === style.align;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $$('.preview-target-button').forEach((button) => {
    const active = button.dataset.target === state.previewTarget;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const grouped = state.previewTarget === 'all';
  $$('.draggable-block').forEach((block) => block.classList.toggle('is-selected', !grouped && block.dataset.block === state.previewTarget));
  elements.groupSelectionBox.classList.toggle('is-visible', grouped);
  if (grouped) requestAnimationFrame(updateGroupSelectionBox);
  scheduleSaveSession();
}

function selectPreviewTarget(target, toggle = true) {
  if (target !== 'all' && !state[target]) return;
  state.previewTarget = toggle && state.previewTarget === target ? null : target;
  if (state.previewTarget) state.editTarget = state.previewTarget;
  syncControls();
}

function activatePreviewInteraction(target) {
  if (state.previewTarget !== 'all') selectPreviewTarget(target, false);
}

function previewTargets(fallbackTarget) {
  if (state.previewTarget === 'all') return ['quote', 'source'];
  return [state.previewTarget || fallbackTarget];
}

function alignSourceFrame(mode) {
  const quote = state.quote;
  const source = state.source;
  if (mode === 'left') source.x = quote.x;
  if (mode === 'center') source.x = quote.x + (quote.width - source.width) / 2;
  if (mode === 'right') source.x = quote.x + quote.width - source.width;
  source.x = clamp(source.x, 3, 97 - source.width);
  quote.align = mode;
  source.align = mode;
  syncControls();
}

function setTemplate(template) {
  state = { template, orientation: state.orientation, editTarget: state.editTarget, previewTarget: state.previewTarget, ...clone(templateDefaults[template]) };
  elements.wallpaper.classList.remove('template-poem', 'template-ink', 'template-book');
  elements.wallpaper.classList.add(`template-${template}`);
  $$('.template-option').forEach((button) => {
    const active = button.dataset.template === template;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-checked', String(active));
  });
  updateStyleSettingsHint();
  syncControls();
}

function populateDeviceOptions(preferredDevice = null) {
  const brand = elements.deviceBrand.value;
  const devices = deviceCatalog[brand] || deviceCatalog.generic;
  elements.device.replaceChildren(...devices.map((device) => {
    const option = document.createElement('option');
    option.value = device.value;
    option.textContent = device.label;
    option.dataset.models = device.models;
    return option;
  }));
  if (preferredDevice) {
    const preferredIndex = Number(preferredDevice.index);
    if (Number.isInteger(preferredIndex) && preferredIndex >= 0 && preferredIndex < elements.device.options.length) {
      elements.device.selectedIndex = preferredIndex;
    } else if (devices.some((device) => device.value === preferredDevice.value)) {
      elements.device.value = preferredDevice.value;
    }
  }
  elements.deviceModelLabel.textContent = brand === 'generic' ? '常用尺寸' : '型号';
  syncDevice();
}

function getDimensions() {
  let width;
  let height;
  if (elements.device.value === 'custom') {
    width = clamp(Number(elements.customWidth.value) || 1080, 400, 3000);
    height = clamp(Number(elements.customHeight.value) || 1440, 400, 3000);
  } else {
    [width, height] = elements.device.value.split('x').map(Number);
  }
  if (state.orientation === 'landscape') [width, height] = [height, width];
  return { width, height };
}

function syncDevice() {
  const { width, height } = getDimensions();
  const selected = elements.device.selectedOptions[0];
  elements.customSize.hidden = elements.device.value !== 'custom';
  elements.deviceModels.textContent = selected?.dataset.models || '输入设备的实际像素尺寸';
  elements.wallpaper.style.setProperty('--wallpaper-ratio', `${width} / ${height}`);
  elements.dimension.textContent = `${width} × ${height} px`;
  elements.mobileDimension.textContent = `${width} × ${height}`;
  elements.rulerWidth.textContent = `${width} px`;
  elements.rulerHeight.textContent = `${height} px`;
  $$('.orientation-button').forEach((button) => {
    const active = button.dataset.orientation === state.orientation;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateStyleSettingsHint();
  requestAnimationFrame(updateScaleLabel);
  scheduleSaveSession();
}

function updateScaleLabel() {
  const { width } = getDimensions();
  const rect = elements.wallpaper.getBoundingClientRect();
  elements.deviceStage.style.setProperty('--paper-preview-width', `${rect.width}px`);
  elements.deviceStage.style.setProperty('--paper-preview-height', `${rect.height}px`);
  elements.scale.textContent = `${Math.round((rect.width / width) * 100)}% 缩放`;
}

function showToast(title = '壁纸已导出', detail = 'PNG 已保存到下载目录') {
  elements.toast.querySelector('strong').textContent = title;
  elements.toast.querySelector('small').textContent = detail;
  elements.toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove('is-visible'), 2800);
}

function wrapText(ctx, text, maxWidth) {
  const lines = [];
  text.split('\n').forEach((paragraph) => {
    if (!paragraph) { lines.push(''); return; }
    let line = '';
    [...paragraph].forEach((character) => {
      const test = line + character;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = character; }
      else line = test;
    });
    if (line) lines.push(line);
  });
  return lines;
}

function drawPaperTexture(ctx, width, height, template) {
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  const intensity = template === 'book' ? 8 : template === 'poem' ? 7 : 3;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity;
    data[i] = clamp(data[i] + noise, 0, 255);
    data[i + 1] = clamp(data[i + 1] + noise, 0, 255);
    data[i + 2] = clamp(data[i + 2] + noise, 0, 255);
  }
  ctx.putImageData(image, 0, 0);
  ctx.save();
  ctx.globalAlpha = template === 'book' ? 0.035 : 0.025;
  ctx.strokeStyle = '#544d3f';
  for (let y = 9; y < height; y += 17 + (y % 11)) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(width * 0.25, y - 1, width * 0.68, y + 2, width, y); ctx.stroke();
  }
  ctx.restore();
}

function fillTextWithInk(ctx, text, x, y, ink) {
  ctx.fillText(text, x, y);
  const passes = Math.round(ink / 22);
  if (!passes) return;
  const jitter = Math.max(0.35, ctx.canvas.width / 1600);
  ctx.save();
  ctx.globalAlpha = 0.11 + (ink / 100) * 0.08;
  for (let i = 0; i < passes; i += 1) {
    const angle = (i / Math.max(1, passes)) * Math.PI * 2;
    ctx.fillText(text, x + Math.cos(angle) * jitter, y + Math.sin(angle) * jitter);
  }
  ctx.restore();
}

function alignedX(style, width) {
  const x = width * style.x / 100;
  const textWidth = width * style.width / 100;
  if (style.align === 'center') return x + textWidth / 2;
  if (style.align === 'right') return x + textWidth;
  return x;
}

function exportWallpaper() {
  const { width, height } = getDimensions();
  const content = getPreviewContent();
  const canvas = elements.canvas;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = width; canvas.height = height;
  const palettes = {
    poem: { background: '#f3f0e7', ink: '#2f6479', meta: '#527787' },
    ink: { background: '#f7f6f2', ink: '#23221e', meta: '#35332e' },
    book: { background: '#eee8dc', ink: '#3b3933', meta: '#766b60' }
  };
  const palette = palettes[state.template];
  ctx.fillStyle = palette.background; ctx.fillRect(0, 0, width, height);
  drawPaperTexture(ctx, width, height, state.template);
  if (state.template === 'book') {
    const title = content.book;
    ctx.save();
    ctx.strokeStyle = 'rgba(79,70,59,0.22)'; ctx.lineWidth = Math.max(1, width / 1200);
    ctx.strokeRect(width * 0.06, height * 0.045, width * 0.88, height * 0.91);
    ctx.strokeStyle = '#a56b4f'; ctx.lineWidth = Math.max(2, width / 420);
    ctx.beginPath(); ctx.moveTo(width * 0.105, height * 0.09); ctx.lineTo(width * 0.22, height * 0.09); ctx.stroke();
    ctx.globalAlpha = 0.14; ctx.fillStyle = '#8e725e'; ctx.textAlign = 'center';
    const titleSize = Math.round(width * 0.058);
    const characterStep = titleSize * 1.08;
    const columnStep = titleSize * 1.27;
    ctx.font = `500 ${titleSize}px ${fontStacks.fangsong}`;
    splitBookTitle(title).forEach((column, columnIndex) => {
      column.forEach((character, characterIndex) => {
        const x = width * 0.9 - columnIndex * columnStep;
        const y = height * 0.11 + characterIndex * characterStep;
        if (/^[\u0000-\u024f]$/.test(character) && character.trim()) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 2);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(character, 0, 0);
          ctx.restore();
        } else if (character.trim()) {
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(character, x, y);
        }
      });
    });
    ctx.restore();
  }
  const scale = width / 1072;
  const quote = state.quote;
  const quoteFontSize = quote.fontSize * scale;
  ctx.fillStyle = palette.ink;
  ctx.font = `${state.template === 'ink' || state.template === 'book' ? 600 : 500} ${quoteFontSize}px ${fontStacks[quote.fontStyle]}`;
  ctx.textBaseline = 'top'; ctx.textAlign = quote.align;
  const quoteLines = wrapText(ctx, content.quote, width * quote.width / 100);
  quoteLines.forEach((line, index) => fillTextWithInk(ctx, line, alignedX(quote, width), height * quote.y / 100 + quoteFontSize * quote.lineHeight * index, quote.ink));

  const source = state.source;
  const sourceFontSize = source.fontSize * scale;
  const author = content.author;
  const book = `《${content.book}》`;
  ctx.fillStyle = palette.meta; ctx.font = `400 ${sourceFontSize}px ${fontStacks[source.fontStyle]}`; ctx.textAlign = source.align;
  const sourceText = [author, book].filter(Boolean).join('  —  ');
  const sourceLines = wrapText(ctx, sourceText, width * source.width / 100);
  sourceLines.forEach((line, index) => fillTextWithInk(ctx, line, alignedX(source, width), height * source.y / 100 + sourceFontSize * source.lineHeight * index, source.ink));

  const safeAuthor = (elements.author.value.trim() || '书摘').replace(/[\\/:*?"<>|]/g, '');
  const link = document.createElement('a');
  link.download = `句纸-${safeAuthor}-${width}x${height}.png`;
  link.href = canvas.toDataURL('image/png'); link.click(); showToast();
}

function resetLayout() {
  const defaults = clone(templateDefaults[state.template]);
  state.quote = defaults.quote;
  state.source = defaults.source;
  syncControls();
  showToast('版式已重置', '位置、字号、字体与油墨感已恢复默认');
}

function beginMove(event, block) {
  if (event.target.closest('[data-resize]')) return;
  const target = block.dataset.block;
  activatePreviewInteraction(target);
  const targets = previewTargets(target);
  const paper = elements.wallpaper.getBoundingClientRect();
  const snapshots = targets.map((name) => {
    const targetBlock = name === 'quote' ? elements.quoteBlock : elements.sourceBlock;
    const rect = targetBlock.getBoundingClientRect();
    return { name, startX: state[name].x, startY: state[name].y, blockHeight: rect.height / paper.height * 100 };
  });
  drag = { mode: 'move', pointerId: event.pointerId, target, startClientX: event.clientX, startClientY: event.clientY,
    paperWidth: paper.width, paperHeight: paper.height, snapshots };
  targets.forEach((name) => (name === 'quote' ? elements.quoteBlock : elements.sourceBlock).classList.add('is-dragging'));
  event.preventDefault();
}

function applyFontScale(snapshots, requestedFactor) {
  const minimumFactor = Math.max(...snapshots.map((snapshot) => 12 / snapshot.startFontSize));
  const maximumFactor = Math.min(...snapshots.map((snapshot) => 76 / snapshot.startFontSize));
  const factor = clamp(requestedFactor, minimumFactor, maximumFactor);
  snapshots.forEach((snapshot) => {
    state[snapshot.name].fontSize = Math.round(snapshot.startFontSize * factor * 10) / 10;
  });
}

function beginResize(event, handle) {
  const groupResize = handle.dataset.groupResize === 'true';
  const block = handle.closest('.draggable-block');
  const target = groupResize ? 'quote' : block.dataset.block;
  if (groupResize) selectPreviewTarget('all', false);
  else activatePreviewInteraction(target);
  const targets = groupResize ? ['quote', 'source'] : previewTargets(target);
  const paper = elements.wallpaper.getBoundingClientRect();
  const snapshots = targets.map((name) => ({
    name, startX: state[name].x, startWidth: state[name].width, startFontSize: state[name].fontSize
  }));
  const groupRect = groupResize ? elements.groupSelectionBox.getBoundingClientRect() : null;
  drag = { mode: 'resize', direction: handle.dataset.resize, pointerId: event.pointerId, target,
    groupResize, startClientX: event.clientX, startClientY: event.clientY, paperWidth: paper.width, snapshots,
    scaleAnchorX: groupRect?.left, scaleAnchorY: groupRect?.top,
    startScaleDistance: groupRect ? Math.max(1, Math.hypot(event.clientX - groupRect.left, event.clientY - groupRect.top)) : null };
  handle.setPointerCapture(event.pointerId);
  targets.forEach((name) => (name === 'quote' ? elements.quoteBlock : elements.sourceBlock).classList.add('is-dragging'));
  event.stopPropagation(); event.preventDefault();
}

function updateDrag(event) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const dx = (event.clientX - drag.startClientX) / drag.paperWidth * 100;
  if (drag.mode === 'move') {
    const dy = (event.clientY - drag.startClientY) / drag.paperHeight * 100;
    const sharedDx = clamp(dx,
      Math.max(...drag.snapshots.map((snapshot) => 3 - snapshot.startX)),
      Math.min(...drag.snapshots.map((snapshot) => 97 - state[snapshot.name].width - snapshot.startX)));
    const sharedDy = clamp(dy,
      Math.max(...drag.snapshots.map((snapshot) => 3 - snapshot.startY)),
      Math.min(...drag.snapshots.map((snapshot) => Math.max(3, 97 - snapshot.blockHeight) - snapshot.startY)));
    drag.snapshots.forEach((snapshot) => {
      const style = state[snapshot.name];
      style.x = snapshot.startX + sharedDx;
      style.y = snapshot.startY + sharedDy;
    });
  } else if (drag.direction === 'font') {
    if (drag.groupResize) {
      const distance = Math.hypot(event.clientX - drag.scaleAnchorX, event.clientY - drag.scaleAnchorY);
      applyFontScale(drag.snapshots, distance / drag.startScaleDistance);
    } else {
      const delta = ((event.clientX - drag.startClientX) + (event.clientY - drag.startClientY)) / 2;
      applyFontScale(drag.snapshots, 1 + delta / (drag.paperWidth * 0.38));
    }
  } else {
    drag.snapshots.forEach((snapshot) => {
      const style = state[snapshot.name];
      if (drag.direction === 'right') style.width = clamp(snapshot.startWidth + dx, 16, 97 - snapshot.startX);
      else {
        const newX = clamp(snapshot.startX + dx, 3, snapshot.startX + snapshot.startWidth - 16);
        style.x = newX; style.width = snapshot.startWidth - (newX - snapshot.startX);
      }
    });
  }
  syncControls();
}

function endDrag(event) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  $$('.draggable-block').forEach((block) => block.classList.remove('is-dragging')); drag = null;
}

[elements.quote, elements.author, elements.book].forEach((input) => input.addEventListener('input', syncContent));
$$('.template-option').forEach((button) => button.addEventListener('click', () => setTemplate(button.dataset.template)));
$$('.preview-target-button').forEach((button) => button.addEventListener('click', () => selectPreviewTarget(button.dataset.target)));
$$('.preview-frame-align-button').forEach((button) => button.addEventListener('click', () => alignSourceFrame(button.dataset.frameAlign)));
$$('.align-button').forEach((button) => button.addEventListener('click', () => {
  selectedTargets().forEach((target) => { state[target].align = button.dataset.align; }); syncControls();
}));
elements.deviceBrand.addEventListener('change', () => populateDeviceOptions());
elements.device.addEventListener('change', syncDevice);
[elements.customWidth, elements.customHeight].forEach((input) => input.addEventListener('input', syncDevice));
$$('.orientation-button').forEach((button) => button.addEventListener('click', () => { state.orientation = button.dataset.orientation; syncDevice(); }));
elements.safeArea.addEventListener('change', () => {
  elements.wallpaper.classList.toggle('show-safe-area', elements.safeArea.checked);
  scheduleSaveSession();
});
elements.fontStyle.addEventListener('change', () => {
  selectedTargets().forEach((target) => { state[target].fontStyle = elements.fontStyle.value; }); syncControls();
});
elements.fontUpload.addEventListener('change', async () => {
  const [file] = elements.fontUpload.files; if (!file) return;
  try {
    const face = new FontFace('YejianCustom', await file.arrayBuffer()); await face.load(); document.fonts.add(face);
    const option = elements.fontStyle.querySelector('option[value="custom"]'); option.disabled = false;
    option.textContent = `本地字体 · ${file.name.replace(/\.[^.]+$/, '')}`;
    selectedTargets().forEach((target) => { state[target].fontStyle = 'custom'; }); syncControls();
    showToast('字体已载入', '仅用于本次浏览器会话');
  } catch { showToast('字体无法载入', '请尝试 TTF、OTF、WOFF 或 WOFF2 文件'); }
});
elements.fontSize.addEventListener('input', () => {
  const factor = Number(elements.fontSize.value) / currentStyle().fontSize;
  selectedTargets().forEach((target) => { state[target].fontSize = clamp(state[target].fontSize * factor, 12, 76); }); syncControls();
});
elements.lineHeight.addEventListener('input', () => {
  selectedTargets().forEach((target) => { state[target].lineHeight = Number(elements.lineHeight.value) / 100; }); syncControls();
});
elements.x.addEventListener('input', () => {
  const delta = Number(elements.x.value) - currentStyle().x;
  selectedTargets().forEach((target) => { const style = state[target]; style.x = clamp(style.x + delta, 3, 97 - style.width); }); syncControls();
});
elements.y.addEventListener('input', () => {
  const delta = Number(elements.y.value) - currentStyle().y;
  selectedTargets().forEach((target) => { state[target].y = clamp(state[target].y + delta, 3, 94); }); syncControls();
});
elements.width.addEventListener('input', () => {
  const delta = Number(elements.width.value) - currentStyle().width;
  selectedTargets().forEach((target) => { const style = state[target]; style.width = clamp(style.width + delta, 16, 97 - style.x); }); syncControls();
});
elements.ink.addEventListener('input', () => {
  const delta = Number(elements.ink.value) - currentStyle().ink;
  selectedTargets().forEach((target) => { state[target].ink = clamp(state[target].ink + delta, 0, 100); }); syncControls();
});
elements.export.addEventListener('click', exportWallpaper); elements.mobileExport.addEventListener('click', exportWallpaper);
elements.previewReset.addEventListener('click', resetLayout);

$$('.draggable-block').forEach((block) => {
  block.addEventListener('pointerdown', (event) => beginMove(event, block));
  block.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key) || event.target.closest('[data-resize]')) return;
    activatePreviewInteraction(block.dataset.block);
    const step = event.shiftKey ? 3 : 1;
    const targets = previewTargets(block.dataset.block);
    const requestedX = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
    const requestedY = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
    const sharedX = clamp(requestedX,
      Math.max(...targets.map((target) => 3 - state[target].x)),
      Math.min(...targets.map((target) => 97 - state[target].width - state[target].x)));
    const sharedY = clamp(requestedY,
      Math.max(...targets.map((target) => 3 - state[target].y)),
      Math.min(...targets.map((target) => 94 - state[target].y)));
    targets.forEach((target) => {
      const style = state[target];
      style.x += sharedX;
      style.y += sharedY;
    });
    event.preventDefault(); syncControls();
  });
});
$$('[data-resize]').forEach((handle) => {
  handle.addEventListener('pointerdown', (event) => beginResize(event, handle));
  handle.addEventListener('keydown', (event) => {
    const allowed = handle.dataset.resize === 'font' ? ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] : ['ArrowLeft', 'ArrowRight'];
    if (!allowed.includes(event.key)) return;
    const groupResize = handle.dataset.groupResize === 'true';
    const blockTarget = groupResize ? 'quote' : handle.closest('.draggable-block').dataset.block;
    if (groupResize) selectPreviewTarget('all', false);
    else activatePreviewInteraction(blockTarget);
    const positive = event.key === 'ArrowRight' || event.key === 'ArrowUp';
    const delta = (positive ? 1 : -1) * (event.shiftKey ? 3 : 1);
    const keyboardTargets = groupResize ? ['quote', 'source'] : previewTargets(blockTarget);
    if (groupResize && handle.dataset.resize === 'font') {
      applyFontScale(keyboardTargets.map((target) => ({ name: target, startFontSize: state[target].fontSize })), positive ? (event.shiftKey ? 1.12 : 1.04) : (event.shiftKey ? 0.88 : 0.96));
      event.preventDefault(); syncControls(); return;
    }
    keyboardTargets.forEach((target) => {
      const style = state[target];
      if (handle.dataset.resize === 'font') style.fontSize = clamp(style.fontSize + delta, 12, 76);
      else if (handle.dataset.resize === 'right') style.width = clamp(style.width + delta, 16, 97 - style.x);
      else { const newX = clamp(style.x + delta, 3, style.x + style.width - 16); style.width -= newX - style.x; style.x = newX; }
    });
    event.preventDefault(); syncControls();
  });
});
window.addEventListener('pointermove', updateDrag); window.addEventListener('pointerup', endDrag); window.addEventListener('pointercancel', endDrag);

$$('.mobile-tab').forEach((button) => button.addEventListener('click', () => {
  const preview = button.dataset.mobileView === 'preview'; document.body.classList.toggle('mobile-preview', preview);
  $$('.mobile-tab').forEach((tab) => { const active = tab === button; tab.classList.toggle('is-active', active); tab.setAttribute('aria-pressed', String(active)); });
  window.scrollTo({ top: 0, behavior: 'auto' }); if (preview) requestAnimationFrame(updateScaleLabel);
}));

new ResizeObserver(updateScaleLabel).observe(elements.wallpaper);
const restoredDevice = restoreSession();
syncContent(); syncControls(); populateDeviceOptions(restoredDevice);
