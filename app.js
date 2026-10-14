const log = (m) => {
  document.getElementById('log').textContent += m + '\n';
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// アンケート対象ブース別表示
function renderBooths() {
  const el = document.getElementById('booths');
  if (typeof qaData === 'undefined') {
    el.textContent = 'jsecQA2025.js の読込に失敗 (公式サーバへのアクセスを確認)';
    return;
  }
  el.innerHTML = BOOTHS.map((b) => {
    const c = qaData[b.qa];
    if (!c) return `<div class="card">${esc(b.survey)}: QAなし</div>`;
    const qaHtml = c.questions.map((q, i) =>
      `<details><summary>Q${i + 1}: ${esc(q)}</summary><div class="small">${c.answers[i] || ''}</div></details>`
    ).join('');
    const links = (typeof SCENE_LINKS !== 'undefined' ? SCENE_LINKS : [])
      .filter((r) => r.tags === b.tag)
      .map((r) => `<div><span class="small">${esc(r.entity)}/${esc(r.kind)}</span><br><a href="${r.url}" target="_blank" rel="noopener">${r.url}</a></div>`)
      .join('') || '<span class="small">リンクなし</span>';
    return `<div class="card"><h3>${esc(b.survey)}</h3><p class="small">${esc(c.companyName)}</p>${qaHtml}<h4>ポスター・動画リンク(3Dなしで直接開く)</h4>${links}</div>`;
  }).join('');
}

// 研究一覧
function renderStudents(filter = '') {
  const el = document.getElementById('students');
  if (typeof students === 'undefined') {
    el.textContent = 'students2025.js の読込に失敗';
    return;
  }
  const list = students.filter((s) => {
    if (!filter) return true;
    const hay = [s.category, s.school, s.name, s.names, s.schools, s.researchTitle].flat().join(' ');
    return hay.includes(filter);
  });
  el.innerHTML = `<p class="small">${list.length} / ${students.length} 件</p>` + list.map((s) => {
    const school = s.school || (s.schools || []).join(' / ');
    const name = s.name || (s.names || []).join(' / ');
    return `<div class="card"><b>${esc(s.category)}</b><br>${school}<br><b>${esc(name)}</b><br>${esc(s.researchTitle)}<br><a href="${s.profilePic}" target="_blank" rel="noopener">顔写真/プロフィール画像を開く(軽量)</a></div>`;
  }).join('');
}

// 全リンク
function renderLinks() {
  const el = document.getElementById('links');
  const groups = {};
  for (const r of SCENE_LINKS) {
    const key = r.tags || '(無タグ・ポスター等)';
    (groups[key] = groups[key] || []).push(r);
  }
  el.innerHTML = Object.keys(groups).sort().map((tag) =>
    `<h3>${esc(tag)} (${groups[tag].length})</h3>` +
    groups[tag].map((r) => `<div class="card"><span class="small">${esc(r.entity)} / ${esc(r.kind)}</span><br><a href="${r.url}" target="_blank" rel="noopener">${r.url}</a></div>`).join('')
  ).join('');
  log(`SCENE_LINKS: ${SCENE_LINKS.length}件を3Dなしで一覧化`);
}

document.getElementById('q').addEventListener('input', (e) => renderStudents(e.target.value.trim()));
renderBooths();
renderStudents();
renderLinks();
log('3Dエンジン(playcanvas/__game-scripts/モデル/テクスチャ)は読み込んでいません');
