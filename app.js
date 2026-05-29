/* ============================================================
   RELATIONSHIP REGULATION ATLAS — app.js
   Atlas UI: tabs, matrix, row expand, cycle map,
   theme toggle, view toggle, territory map.
   Anchor passed in via ?anchor= URL param from orb flow.
   ============================================================ */

// ── ANCHOR FROM URL ────────────────────────────────────────────────
const _urlAnchor = new URLSearchParams(window.location.search).get('anchor') || null;
const orbState = { anchor: _urlAnchor };

// ── ATLAS STATE ───────────────────────────────────────────────────
const clusters = () => ['All', ...new Set(behaviors.map(b => b.cluster))];
let activeCluster = 'All';
let openRow = null;

// ── TABS ──────────────────────────────────────────────────────────
function renderTabs() {
  const tabs = document.getElementById('clusterTabs');
  tabs.innerHTML = '';
  clusters().forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (c === activeCluster ? ' active' : '');
    btn.textContent = c;
    btn.onclick = () => { activeCluster = c; renderTabs(); renderTable(); };
    tabs.appendChild(btn);
  });
}

// ── MATRIX TABLE ──────────────────────────────────────────────────
function renderTable() {
  const body = document.getElementById('matrixBody');
  const q = document.getElementById('searchInput').value.toLowerCase();
  body.innerHTML = '';
  const filtered = behaviors.filter(b =>
    (activeCluster === 'All' || b.cluster === activeCluster) &&
    (!q || b.name.toLowerCase().includes(q) ||
           b.logic.toLowerCase().includes(q) ||
           b.cluster.toLowerCase().includes(q))
  );

  if (filtered.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="5"><div class="matrix-empty">Nothing matches &mdash; try a different word, or clear the search.</div></td>`;
    body.appendChild(tr);
    return;
  }

  filtered.forEach(b => {
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

  if (orbState.anchor) highlightAnchor(orbState.anchor);
}

// ── ROW EXPAND ────────────────────────────────────────────────────
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

// ── ANCHOR HIGHLIGHT ──────────────────────────────────────────────
function highlightAnchor(name) {
  requestAnimationFrame(() => {
    const rows = document.querySelectorAll('#matrixBody tr');
    rows.forEach(row => {
      const strong = row.querySelector('strong');
      if (strong && strong.textContent.trim() === name) {
        row.classList.add('anchor-highlight');
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const b = behaviors.find(bh => bh.name === name);
        if (b) updateHeroPanel(b);
      }
    });
  });
}

function updateHeroPanel(b) {
  document.getElementById('heroPanelTitle').textContent = b.name;
  document.getElementById('heroPanelBody').innerHTML = `
    <div class="stage"><strong>Where you are:</strong> ${b.cluster}</div>
    <div class="stage"><strong>Short-term logic:</strong> ${b.logic}</div>
    <div class="stage"><strong>The cost:</strong> ${b.cost}</div>
    <div class="stage" style="margin-top:var(--space-3)"><strong>A way through:</strong> ${b.healthier || '—'}</div>
  `;
}

// ── CYCLE MAP ──────────────────────────────────────────────────────
function fillSelects() {
  const aSel = document.getElementById('aSelect');
  const bSel = document.getElementById('bSelect');
  behaviors.forEach((b, i) => {
    [aSel, bSel].forEach(sel => {
      const o = document.createElement('option');
      o.value = i;
      // Shorter label: just the behavior name
      o.textContent = b.name;
      sel.appendChild(o);
    });
  });
  if (orbState.anchor) {
    const anchorIdx = behaviors.findIndex(b => b.name === orbState.anchor);
    if (anchorIdx > -1) aSel.value = anchorIdx;
  } else {
    aSel.value = 1;
  }
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
    <strong>B’s side adds:</strong> ${b.pairNote}
    <br><br>
    <strong>Where both people are stuck:</strong>
    Partner A fears that ${a.fear.toLowerCase()}
    Partner B fears that ${b.fear.toLowerCase()}
    <br><br>
    <strong>A way through:</strong> ${a.healthier}
    On the other side, ${b.healthier.toLowerCase()}
  `;
}

// ── THEME TOGGLE ──────────────────────────────────────────────────
(function () {
  const d = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', d);
  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) {
      const r = document.documentElement;
      r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    }
  });
})();

// ── VIEW TOGGLE ──────────────────────────────────────────────────
(function () {
  const btn = document.getElementById('viewToggle');
  if (!btn) return;
  const root = document.documentElement;
  // Restore view from URL hash if present
  if (window.location.hash === '#territory') {
    root.setAttribute('data-view', 'spatial');
    btn.innerHTML = '&#9635; Matrix';
    renderTerritory();
  }
  let view = root.getAttribute('data-view') === 'spatial' ? 'spatial' : 'matrix';
  btn.addEventListener('click', () => {
    view = view === 'matrix' ? 'spatial' : 'matrix';
    root.setAttribute('data-view', view);
    history.replaceState(null, '', view === 'spatial' ? '#territory' : window.location.pathname + window.location.search);
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

// ── TERRITORY MAP ─────────────────────────────────────────────────
function getBehaviorPosition(b) {
  const moves = b.moves || [];
  const hasToward   = moves.some(m => /toward|pursue|reach|connect|pull|plea|protest|demand|cling|fawn|fix|perform|over-explain|bid/i.test(m));
  const hasAway     = moves.some(m => /away|withdraw|avoid|shut|stone|silent|escape|detach|disappear|deflect|minimize|dismiss|armor/i.test(m));
  const hasActivate = moves.some(m => /discharge|control|pursue|rage|escalate|anxiety|alarm|protest|flood/i.test(m));
  const hasCollapse = moves.some(m => /numb|transform|freeze|dissociate|collapse|gone|fade|still|quiet|soothe/i.test(m));
  const clusterMap = {
    'Communication / Conflict':   { qx: 0, qy: 0 },
    'Control / Over-functioning': { qx: 0, qy: 0 },
    'Sexual / Romantic':          { qx: 1, qy: 0 },
    'Mind / Fantasy / Spirit':    { qx: 1, qy: 1 },
    'Collapse / Shutdown':        { qx: 1, qy: 1 },
  };
  const fallback = clusterMap[b.cluster] || { qx: 0, qy: 0 };
  const qx = hasToward ? 0 : hasAway ? 1 : fallback.qx;
  const qy = hasActivate ? 0 : hasCollapse ? 1 : fallback.qy;
  const centers = [
    { cx: 175, cy: 170 }, { cx: 515, cy: 170 },
    { cx: 175, cy: 390 }, { cx: 515, cy: 390 },
  ];
  const idx = qy * 2 + qx;
  const center = centers[idx];
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
  if (g.childElementCount > 0) return;
  behaviors.forEach((b, i) => {
    const pos = getBehaviorPosition(b);
    const color = districtColors[pos.district];
    const isAnchor = b.name === orbState.anchor;
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('cx', pos.x); hit.setAttribute('cy', pos.y);
    hit.setAttribute('r', '16'); hit.setAttribute('fill', 'transparent');
    hit.style.cursor = 'pointer';
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', pos.x); dot.setAttribute('cy', pos.y);
    dot.setAttribute('r', isAnchor ? '8' : '5');
    dot.setAttribute('fill', color);
    dot.setAttribute('opacity', isAnchor ? '1' : '0.75');
    dot.style.transition = 'r 0.15s ease, opacity 0.15s ease';
    dot.classList.add('behavior-dot'); dot.dataset.idx = i;
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', pos.x + 8); label.setAttribute('y', pos.y + 4);
    label.setAttribute('font-size', '8'); label.setAttribute('font-family', 'Satoshi, sans-serif');
    label.setAttribute('fill', color);
    label.setAttribute('opacity', isAnchor ? '0.9' : '0');
    label.classList.add('behavior-label'); label.dataset.idx = i;
    label.textContent = b.name;
    const grp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    grp.classList.add('behavior-node'); grp.dataset.idx = i;
    grp.appendChild(hit); grp.appendChild(dot); grp.appendChild(label);
    grp.addEventListener('mouseenter', () => {
      dot.setAttribute('r', '7'); dot.setAttribute('opacity', '1'); label.setAttribute('opacity', '0.7');
    });
    grp.addEventListener('mouseleave', () => {
      if (selectedNode !== i) {
        dot.setAttribute('r', isAnchor ? '8' : '5');
        dot.setAttribute('opacity', isAnchor ? '1' : '0.75');
        label.setAttribute('opacity', isAnchor ? '0.9' : '0');
      }
    });
    grp.addEventListener('click', () => {
      if (selectedNode !== null) {
        const prev = g.querySelector(`[data-idx="${selectedNode}"] .behavior-dot`);
        const prevLabel = g.querySelector(`[data-idx="${selectedNode}"] .behavior-label`);
        if (prev) { prev.setAttribute('r', '5'); prev.setAttribute('opacity', '0.75'); }
        if (prevLabel) prevLabel.setAttribute('opacity', '0');
      }
      selectedNode = i;
      dot.setAttribute('r', '8'); dot.setAttribute('opacity', '1'); label.setAttribute('opacity', '0.9');
      showTerritoryDetail(b, color);
    });
    g.appendChild(grp);
    if (isAnchor) { selectedNode = i; showTerritoryDetail(b, color); }
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
  document.getElementById('tdMoves').innerHTML = (b.moves || []).map(m => `<span class="tag">${m}</span>`).join('');
}

// ── INIT ──────────────────────────────────────────────────────────
renderTabs();
renderTable();
fillSelects();
if (orbState.anchor) highlightAnchor(orbState.anchor);
