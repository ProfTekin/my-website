"use strict";
// Small independent features keep this file usable on every handbook page.
const byId = id => document.getElementById(id);
let toastTimer;
function announce(message) {
  const status = byId('status');
  status.textContent = message;
  status.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => status.classList.remove('show'), 4500);
}
// Clipboard API when available; legacy copy and manual selection for local files.
for (const button of document.querySelectorAll('.copy')) {
  button.addEventListener('click', async function () {
    const text = button.closest('.code').querySelector('code').textContent;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.left = '-9999px';
      document.body.append(field);
      field.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* manual fallback below */ }
      field.remove();
      button.focus();
      if (!copied) {
        const range = document.createRange();
        range.selectNodeContents(button.closest('.code').querySelector('code'));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        announce('Text selected. Press Ctrl+C or Command+C to copy.');
        return;
      }
    }
    announce(button.textContent.includes('Tutor') ? 'Full tutor prompt copied.' : 'Copied to clipboard.');
  });
}
const navButton = byId('nav-toggle');
const nav = byId('main-nav');
navButton.addEventListener('click', function () {
  const open = nav.classList.toggle('open');
  navButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    byId('search-results').hidden = true;
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navButton.setAttribute('aria-expanded', 'false');
      navButton.focus();
    }
  }
});
const search = byId('search');
const results = byId('search-results');
results.setAttribute('aria-live', 'polite');
search.addEventListener('input', function () {
  results.replaceChildren();
  const query = search.value.trim().toLowerCase();
  if (!query) { results.hidden = true; return; }
  const words = query.split(/\s+/);
  const matches = window.WEBDEV_TOPICS.filter(topic => words.every(word =>
    (topic.title + ' ' + topic.page + ' ' + topic.terms).toLowerCase().includes(word)));
  matches.sort((a, b) => Number(b.title.toLowerCase().includes(query)) - Number(a.title.toLowerCase().includes(query)));
  for (const topic of matches.slice(0, 10)) {
    const link = document.createElement('a');
    link.href = topic.url;
    link.textContent = topic.title;
    const context = document.createElement('small');
    context.textContent = topic.page;
    link.append(context);
    results.append(link);
  }
  if (!matches.length) results.textContent = 'No matching topics. Try a shorter term.';
  results.hidden = false;
});
document.addEventListener('click', event => {
  if (!event.target.closest('.searchbox')) results.hidden = true;
});
// Browser-local progress: storage may be disabled or unavailable on file://.
const taskBoxes = [...document.querySelectorAll('[data-task]')];
const storageKey = 'webdev-lab-progress-v1';
function updateProgress() {
  let done = 0;
  for (const phase of document.querySelectorAll('.phase')) {
    const boxes = [...phase.querySelectorAll('[data-task]')];
    const complete = boxes.filter(box => box.checked).length;
    done += complete;
    phase.querySelector('.counts').textContent = complete + ' / ' + boxes.length;
    phase.querySelector('progress').value = complete;
  }
  if (byId('overall')) {
    byId('overall').value = Math.round(done / taskBoxes.length * 100);
    byId('overall-text').textContent = done + ' / ' + taskBoxes.length + ' tasks complete · ' + byId('overall').value + '%';
  }
}
if (taskBoxes.length) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    for (const box of taskBoxes) box.checked = saved && saved[box.dataset.task] === true;
  } catch (_) {
    byId('storage-note').textContent = 'Saved progress could not be read. The tracker still works for this visit; browser storage may be disabled.';
  }
  updateProgress();
  for (const box of taskBoxes) box.addEventListener('change', function () {
    const values = {};
    for (const item of taskBoxes) values[item.dataset.task] = item.checked;
    try { localStorage.setItem(storageKey, JSON.stringify(values)); }
    catch (_) { byId('storage-note').textContent = 'Progress cannot be saved in this browser. It will be lost when you leave this page.'; }
    updateProgress();
  });
  byId('reset-progress').addEventListener('click', function () {
    if (!confirm('Reset all project checkmarks saved in this browser?')) return;
    for (const box of taskBoxes) box.checked = false;
    try { localStorage.removeItem(storageKey); } catch (_) { /* in-memory reset still works */ }
    updateProgress();
    announce('Project progress reset.');
  });
}
if (byId('ai-check')) byId('ai-check').addEventListener('click', function () {
  const allowed = Number(byId('ai-request').value) < 4;
  byId('ai-answer').textContent = allowed
    ? 'Permitted: this asks for understanding, planning or debugging guidance. Write and test your own code.'
    : 'Not permitted: this asks AI to complete assessed work. Instead, explain your attempt and ask for one hint or a concept explanation.';
});
function bind(ids, update) {
  if (!byId(ids[0])) return;
  for (const id of ids) byId(id).addEventListener('input', update);
  update();
}
bind(['margin', 'padding', 'border'], function () {
  const m = byId('margin').value, p = byId('padding').value, b = byId('border').value;
  byId('box-demo').style.margin = m + 'px';
  byId('box-demo').style.padding = p + 'px';
  byId('box-demo').style.borderWidth = b + 'px';
  for (const name of ['margin', 'padding', 'border']) byId(name + '-value').textContent = byId(name).value;
  byId('box-code').textContent = '.card {\n  margin: ' + m + 'px;\n  padding: ' + p + 'px;\n  border: ' + b + 'px solid #507bc1;\n}';
});
function luminance(hex) {
  const values = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
bind(['fg', 'bg'], function () {
  const fg = byId('fg').value, bg = byId('bg').value;
  byId('color-demo').style.color = fg;
  byId('color-demo').style.backgroundColor = bg;
  const a = luminance(fg), b = luminance(bg);
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  byId('contrast').textContent = 'Contrast: ' + ratio.toFixed(2) + ':1 · ' + (ratio >= 4.5 ? 'Meets 4.5:1 for ordinary text.' : 'Below 4.5:1 for ordinary text.');
  byId('color-code').textContent = '.preview { color: ' + fg + '; background-color: ' + bg + '; }';
});
bind(['flex-direction', 'flex-justify', 'flex-align', 'flex-gap'], function () {
  const direction = byId('flex-direction').value, justify = byId('flex-justify').value;
  const align = byId('flex-align').value, gap = byId('flex-gap').value;
  Object.assign(byId('flex-demo').style, {flexDirection: direction, justifyContent: justify, alignItems: align, gap: gap + 'px'});
  byId('flex-code').textContent = '.container {\n  display: flex;\n  flex-direction: ' + direction + ';\n  justify-content: ' + justify + ';\n  align-items: ' + align + ';\n  gap: ' + gap + 'px;\n}';
});
bind(['viewport-width'], function () {
  byId('viewport-label').textContent = byId('viewport-width').value;
  byId('responsive-frame').style.width = byId('viewport-width').value + 'px';
  byId('responsive-frame').style.maxWidth = '100%';
});
if (byId('designed-button')) {
  const sheet = document.createElement('style');
  document.head.append(sheet);
  bind(['btn-padding', 'btn-radius', 'btn-bg', 'btn-fg', 'btn-hover'], function () {
    const css = '.my-button {\n  padding: ' + byId('btn-padding').value + 'px;\n  border-radius: ' + byId('btn-radius').value + 'px;\n  background: ' + byId('btn-bg').value + ';\n  color: ' + byId('btn-fg').value + ';\n  transition: background-color 150ms ease;\n}\n.my-button:hover, .my-button:focus-visible { background: ' + byId('btn-hover').value + '; }';
    sheet.textContent = css.replaceAll('.my-button', '#designed-button');
    byId('button-code').textContent = css;
  });
  byId('designed-button').addEventListener('click', function () {
    byId('designer-status').textContent = 'Your button works. Adapt its label and action to your website.';
  });
}
