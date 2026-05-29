/* ============================================================
   RELATIONSHIP REGULATION ATLAS — app.js
   All UI logic: tabs, matrix table, row expand,
   cycle map selects, theme toggle, and view toggle.
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

// --- VIEW TOGGLE ---
(function () {
  const btn = document.getElementById('viewToggle');
  const root = document.documentElement;
  let view = 'matrix'; // default

  btn.addEventListener('click', () => {
    view = view === 'matrix' ? 'spatial' : 'matrix';
    root.setAttribute('data-view', view);
    if (view === 'spatial') {
      btn.innerHTML = '&#9635; Matrix';
      btn.setAttribute('aria-label', 'Switch to matrix view');
      renderTerritory();
    } else {
      btn.innerHTML = '&#9671; Territory';
      btn.setAttribute('aria-label', 'Switch to territory view');
    }
  });
})();

// --- TERRITORY MAP ---

// District assignment based on behavior moves.
// Quadrant: x = toward(left) vs away(right), y = activated(top) vs collapsed(bottom)
function getBehaviorPosition(b) {
  const moves = b.moves || [];
  const hasToward   = moves.some(m => /toward|pursue|reach|connect|pull|plea|protest|demand|cling|fawn|fix|perform|over-explain|bid/i.test(m));
  const hasAway     = moves.some(m => /away|withdraw|avoid|shut|stone|silent|escape|detach|disappear|deflect|minimize|dismiss|armor/i.test(m));
  const hasActivate = moves.some(m => /discharge|control|pursue|rage|escalate|anxiety|alarm|protest|flood/i.test(m));
  const hasCollapse = moves.some(m => /numb|transform|freeze|dissociate|collapse|gone|fade|still|quiet|soothe/i.test(m));

  // Default quadrant based on cluster name if moves are ambiguous
  const clusterMap = {
    'Pursuit & Protest':    { qx: 0, qy: 0 },
    'Flooding & Discharge': { qx: 0, qy: 0 },
    'Control & Fixing':     { qx: 0, qy: 0 },
    'Withdrawal & Armor':   { qx: 1, qy: 0 },
    'Stonewalling':         { qx: 1, qy: 0 },
    'Numbing & Collapse':   { qx: 1, qy: 1 },
    'Self-abandonment':     { qx: 1, qy: 1 },
    'Transformation':       { qx: 0, qy: 1 },
    'Secure Base':          { qx: 0, qy: 1 },
  };
  const fallback = clusterMap[b.cluster] || { qx: 0, qy: 0 };

  const qx = hasToward ? 0 : hasAway ? 1 : fallback.qx;
  const qy = hasActivate ? 0 : hasCollapse ? 1 : fallback.qy;

  // Map quadrant to SVG zone center with scatter
  const centers = [
    { cx: 175, cy: 170 }, // toward + activated  (top-left)
    { cx: 515, cy: 170 }, // away  + activated  (top-right)
    { cx: 175, cy: 390 }, // toward + collapsed  (bottom-left)
    { cx: 515, cy: 390 }, // away  + collapsed  (bottom-right)
  ];
  const idx = qy * 2 + qx;
  const center = centers[idx];

  // Deterministic scatter based on behavior name length
  const seed = b.name.length * 37 + b.cluster.length * 13;
  const angle = (seed % 360) * Math.PI / 180;
  const radius = 20 + (seed % 80);
  return {
    x: Math.round(center.cx + Math.cos(angle) * radius),
    y: Math.round(center.cy + Math.sin(angle) * radius),
    district: idx
  };
}

const districtColors = ['#c45c2a', '#3a6b8a', '#3a7a48', '#6a5c8a'];

let selectedNode = null;

function renderTerritory() {
  const g = document.getElementById('behaviorNodes');
  if (g.childElementCount > 0) return; // already rendered

  behaviors.forEach((b, i) => {
    const pos = getBehaviorPosition(b);
    const color = districtColors[pos.district];

    // Hit area (invisible, larger for touch)
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('cx', pos.x);
    hit.setAttribute('cy', pos.y);
    hit.setAttribute('r', '16');
    hit.setAttribute('fill', 'transparent');
    hit.style.cursor = 'pointer';

    // Visible dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', pos.x);
    dot.setAttribute('cy', pos.y);
    dot.setAttribute('r', '5');
    dot.setAttribute('fill', color);
    dot.setAttribute('opacity', '0.75');
    dot.style.transition = 'r 0.15s ease, opacity 0.15s ease';
    dot.classList.add('behavior-dot');
    dot.dataset.idx = i;

    // Label (faint, shows on hover via CSS)
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', pos.x + 8);
    label.setAttribute('y', pos.y + 4);
    label.setAttribute('font-size', '8');
    label.setAttribute('font-family', 'Satoshi, sans-serif');
    label.setAttribute('fill', color);
    label.setAttribute('opacity', '0');
    label.classList.add('behavior-label');
    label.dataset.idx = i;
    label.textContent = b.name;

    // Group
    const grp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    grp.classList.add('behavior-node');
    grp.dataset.idx = i;
    grp.appendChild(hit);
    grp.appendChild(dot);
    grp.appendChild(label);

    grp.addEventListener('mouseenter', () => {
      dot.setAttribute('r', '7');
      dot.setAttribute('opacity', '1');
      label.setAttribute('opacity', '0.7');
    });
    grp.addEventListener('mouseleave', () => {
      if (selectedNode !== i) {
        dot.setAttribute('r', '5');
        dot.setAttribute('opacity', '0.75');
        label.setAttribute('opacity', '0');
      }
    });
    grp.addEventListener('click', () => {
      // Deselect previous
      if (selectedNode !== null) {
        const prev = g.querySelector(`[data-idx="${selectedNode}"] .behavior-dot`);
        const prevLabel = g.querySelector(`[data-idx="${selectedNode}"] .behavior-label`);
        if (prev) { prev.setAttribute('r', '5'); prev.setAttribute('opacity', '0.75'); }
        if (prevLabel) prevLabel.setAttribute('opacity', '0');
      }
      selectedNode = i;
      dot.setAttribute('r', '8');
      dot.setAttribute('opacity', '1');
      label.setAttribute('opacity', '0.9');
      showTerritoryDetail(b, color);
    });

    g.appendChild(grp);
  });
}

function showTerritoryDetail(b, color) {
  document.getElementById('tdEmpty').style.display = 'none';
  document.getElementById('tdContent').style.display = 'block';

  document.getElementById('tdCluster').textContent = b.cluster;
  document.getElementById('tdName').textContent = b.name;
  document.getElementById('tdName').style.color = color;
  document.getElementById('tdLogic').textContent = b.logic;
  document.getElementById('tdCost').textContent = b.cost;
  document.getElementById('tdProtects').textContent = b.protects || '—';
  document.getElementById('tdFear').textContent = b.fear || '—';
  document.getElementById('tdHealthier').textContent = b.healthier || '—';
  document.getElementById('tdPairNote').textContent = b.pairNote || '—';

  const movesEl = document.getElementById('tdMoves');
  movesEl.innerHTML = (b.moves || []).map(m => `<span class="tag">${m}</span>`).join('');
}

// --- INIT ---
renderTabs();
renderTable();
fillSelects();
