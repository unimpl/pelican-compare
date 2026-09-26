'use strict';
const gallery = document.getElementById('gallery');
const efforts = ['xhigh', 'high', 'medium', 'low'];
const rank = {low:1,medium:2,high:3,xhigh:4};
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
for (const effort of efforts) {
  const row = document.createElement('section');
  row.className = 'comparison-row';
  row.dataset.effort = effort;
  row.setAttribute('aria-label', `${effort} 推理强度对比`);
  const heading = document.createElement('h2');
  heading.className = 'group-title';
  heading.textContent = `${effort} · 推理强度`;
  row.appendChild(heading);
  for (const item of window.PELICANS.filter(x => x.effort === effort)) {
    const card = document.createElement('article');
    card.className = 'work';
    card.dataset.agent = item.agent;
    const label = `${item.agent} · ${item.modelLabel}`;
    const strength = effort + (item.effortDefault ? '（默认）' : '');
    const time = new Date(item.generatedAt).toLocaleTimeString('zh-CN', {timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false});
    card.innerHTML = `<div class="work-head"><h3><span>${escapeHTML(item.agent)}</span><b>${escapeHTML(item.modelLabel)}</b></h3><div class="effort"><strong>${strength}</strong><span class="level" aria-hidden="true">${[1,2,3,4].map(i=>`<i class="${i<=rank[effort]?'on':''}"></i>`).join('')}</span></div></div><div class="viewport"><iframe title="${escapeHTML(label)} · ${strength} 鹈鹕骑自行车原作" sandbox="allow-scripts" loading="${effort==='xhigh'?'eager':'lazy'}" src="${item.previewFile || item.file}"></iframe></div><div class="work-foot"><time datetime="${item.generatedAt}">对话开始 ${time} · UTC+8</time><a href="${item.file}" target="_blank" rel="noopener">${item.previewFile ? '打开 SVG 原作' : '打开原作'} ↗</a></div><details class="provenance"><summary>提示词与来源</summary><p>${escapeHTML(item.prompt.trim())}</p><p>${escapeHTML(item.note || '模型与推理强度取自生成时的 session 记录。原始文件未经修改。')}</p></details>`;
    row.appendChild(card);
  }
  gallery.appendChild(row);
}
const resize = new ResizeObserver(entries => {
  for (const entry of entries) entry.target.firstElementChild.style.transform = `scale(${entry.contentRect.width / 1200})`;
});
document.querySelectorAll('.viewport').forEach(el => resize.observe(el));
let selectedEffort = 'all';
let selectedAgent = 'all';
function applyFilters() {
  let count = 0;
  document.querySelectorAll('.comparison-row').forEach(row => {
    let rowCount = 0;
    row.querySelectorAll('.work').forEach(card => {
      const matches = (selectedEffort === 'all' || row.dataset.effort === selectedEffort)
        && (selectedAgent === 'all' || card.dataset.agent === selectedAgent);
      card.hidden = !matches;
      if (matches) rowCount++;
    });
    row.hidden = rowCount === 0;
    count += rowCount;
  });
  document.querySelectorAll('button[data-effort]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.effort === selectedEffort)));
  document.querySelectorAll('button[data-agent]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.agent === selectedAgent)));
  document.getElementById('count').textContent = `${count} / ${window.PELICANS.length} 份作品`;
  document.getElementById('empty-results').hidden = count !== 0;
}
for (const button of document.querySelectorAll('button[data-effort]')) {
  button.addEventListener('click', () => { selectedEffort = button.dataset.effort; applyFilters(); });
}
for (const button of document.querySelectorAll('button[data-agent]')) {
  button.addEventListener('click', () => { selectedAgent = button.dataset.agent; applyFilters(); });
}
document.getElementById('reset-filters').addEventListener('click', () => {
  selectedAgent = 'all'; selectedEffort = 'all'; applyFilters();
  document.querySelector('button[data-agent="all"]').focus();
});
applyFilters();
