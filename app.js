'use strict';
const gallery = document.getElementById('gallery');
const efforts = ['xhigh', 'high', 'medium', 'low'];
const models = ['gpt-6-sol', 'gpt-6-astra'];
const names = {'gpt-6-sol':'GPT-6 Sol','gpt-6-astra':'GPT-6 Astra'};
const rank = {low:1,medium:2,high:3,xhigh:4};
for (const effort of efforts) {
  const row = document.createElement('section');
  row.className = 'comparison-row';
  row.dataset.effort = effort;
  row.setAttribute('aria-label', `${effort} 推理强度对比`);
  for (const model of models) {
    const item = window.PELICANS.find(x => x.model === model && x.effort === effort);
    const card = document.createElement('article');
    card.className = 'work';
    if (!item) {
      card.classList.add('missing');
      card.innerHTML = `<strong>${names[model]} · ${effort}</strong><p>本次没有这一组合的作品</p>`;
    } else {
      const time = new Date(item.generatedAt).toLocaleTimeString('zh-CN', {timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false});
      card.innerHTML = `<div class="work-head"><h2><span>${names[model]}</span><b>${effort}</b></h2><div class="effort"><span>推理强度</span><span class="level" aria-hidden="true">${[1,2,3,4].map(i=>`<i class="${i<=rank[effort]?'on':''}"></i>`).join('')}</span></div></div><div class="viewport"><iframe title="${names[model]} · ${effort} 鹈鹕骑自行车原作" sandbox="allow-scripts" loading="${effort==='xhigh'?'eager':'lazy'}" src="${item.file}"></iframe></div><div class="work-foot"><time datetime="${item.generatedAt}">对话开始 ${time} · UTC+8</time><a href="${item.file}" target="_blank" rel="noopener">打开原作 ↗</a></div>`;
    }
    row.appendChild(card);
  }
  gallery.appendChild(row);
}
const resize = new ResizeObserver(entries => {
  for (const entry of entries) entry.target.firstElementChild.style.transform = `scale(${entry.contentRect.width / 1200})`;
});
document.querySelectorAll('.viewport').forEach(el => resize.observe(el));
for (const button of document.querySelectorAll('.tabs button')) {
  button.addEventListener('click', () => {
    const selected = button.dataset.effort;
    document.querySelectorAll('.tabs button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('.comparison-row').forEach(row => {row.hidden = selected !== 'all' && row.dataset.effort !== selected;});
    const count = window.PELICANS.filter(x => selected === 'all' || x.effort === selected).length;
    document.getElementById('count').textContent = `${count} 份作品`;
  });
}
