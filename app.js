/* ============================================================
   RELATIONSHIP REGULATION ATLAS — app.js
   All UI logic: tabs, matrix table, row expand,
   cycle map selects, and theme toggle.
   Edit this file to change how the atlas behaves.
   ============================================================ */

// --- STATE ---
const clusters = ['All', ...new Set(behaviors.map(b => b.cluster))];
let activeCluster = 'All';
let openRow = null;

// --- TABS ---
function renderTabs() {
  const tabs = document.getElementById('clusterTabs');
  tabs.innerHTML = '';
  clusters.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (c === activeCluster ? ' active' : '');
    btn.textContent = c;
    btn.onclick = () => { activeCluster = c; renderTabs(); renderTable(); };
    tabs.appendChild(btn);
  });
}

// --- MATRIX TABLE ---
function renderTable() {
  const body = document.getElementById('matrixBody');
  const q = document.getElementById('searchInput').value.toLowerCase();
  body.innerHTML = '';
  behaviors
    .filter(b =>
      (activeCluster === 'All' || b.cluster === activeCluster) &&
      (!q || b.name.toLowerCase().includes(q) ||
             b.logic.toLowerCase().includes(q) ||
             b.cluster.toLowerCase().includes(q))
    )
    .forEach(b => {
      const tr = document.createElement('tr');
      tr.className = 'clickable';
      tr.innerHTML = `
        <td><strong>${b.name}</strong><div class="small">${b.cluster}</div></td>
        <td><div class="moves">${b.moves.map(m => `<span class="tag">${m}</span>`).join('')}</div></td>
        <td class="small">${b.logic}</td>
        <td class="small">${b.cost}</td>
        <td class="small">${b.resistance}</td>
      `;
      tr.onclick = () => toggleDetail(b, tr);
      body.appendChild(tr);
    });
}

// --- ROW EXPAND ---
function toggleDetail(b, tr) {
  const existing = document.getElementById('detailRow');
  if (existing) existing.remove();
  if (openRow === tr) { openRow = null; return; }
  openRow = tr;
  const dr = document.createElement('tr');
  dr.id = 'detailRow';
  dr.innerHTML = `
    <td colspan="5" style="padding:0">
      <div class="detail-panel open">
        <strong style="font-family:var(--font-display)">${b.name} — full picture</strong>
        <div class="detail-grid">
          <div class="detail-block"><strong>What it protects me from seeing</strong>${b.protects}</div>
          <div class="detail-block"><strong>What I fear if I stop</strong>${b.fear}</div>
          <div class="detail-block"><strong>What my partner's behavior lets me avoid</strong>${b.partnerAvoids}</div>
          <div class="detail-block"><strong>Healthier version of this move</strong>${b.healthier}</div>
          <div class="detail-block"><strong>Typical pairing cycle</strong>${b.pairNote}</div>
          <div class="detail-block"><strong>Long-term cost</strong>${b.cost}</div>
        </div>
      </div>
    </td>
  `;
  tr.after(dr);
}

// --- CYCLE MAP SELECTS ---
function fillSelects() {
  const aSel = document.getElementById('aSelect');
  const bSel = document.getElementById('bSelect');
  behaviors.forEach((b, i) => {
    [aSel, bSel].forEach(sel => {
      const o = document.createElement('option');
      o.value = i;
      o.textContent = `${b.cluster} — ${b.name}`;
      sel.appendChild(o);
    });
  });
  aSel.value = 1;
  bSel.value = 2;
  updateCycle();
  aSel.addEventListener('change', updateCycle);
  bSel.addEventListener('change', updateCycle);
}

function updateCycle() {
  const a = behaviors[+document.getElementById('aSelect').value];
  const b = behaviors[+document.getElementById('bSelect').value];
  document.getElementById('aTitle').textContent = a.name;
  document.getElementById('aLogic').textContent = a.logic;
  document.getElementById('aFear').textContent  = '🔒 Resistance: ' + a.resistance;
  document.getElementById('bTitle').textContent = b.name;
  document.getElementById('bLogic').textContent = b.logic;
  document.getElementById('bFear').textContent  = '🔒 Resistance: ' + b.resistance;
  document.getElementById('cycleOut').innerHTML = `
    <strong>What this cycle looks like:</strong><br>
    When Partner A uses <em>${a.name}</em>—${a.logic.toLowerCase()}—Partner B often responds with <em>${b.name}</em>.
    <br><br>
    <strong>The loop:</strong> ${a.pairNote}<br>
    <strong>B's side adds:</strong> ${b.pairNote}
    <br><br>
    <strong>Where both people are stuck:</strong>
    Partner A fears that ${a.fear.toLowerCase()}
    Partner B fears that ${b.fear.toLowerCase()}
    <br><br>
    <strong>A way through:</strong> ${a.healthier}
    On the other side, ${b.healthier.toLowerCase()}
  `;
}

// --- THEME TOGGLE ---
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  const d = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  t && t.addEventListener('click', () => {
    const next = r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', next);
  });
})();

// --- INIT ---
renderTabs();
renderTable();
fillSelects();
