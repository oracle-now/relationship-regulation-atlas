/* ============================================================
   RELATIONSHIP REGULATION ATLAS — app.js
   All UI logic: orb entry flow, tabs, matrix table, row expand,
   cycle map selects, theme toggle, and view toggle.
   ============================================================ */

// ── ORB ENTRY FLOW STATE ──────────────────────────────────────────
// orbState holds the user's answers as they move through the flow.
const orbState = {
  energy: null,   // 'activated' | 'collapsed' | 'unsure'
  direction: null, // 'toward' | 'away'
  anchor: null    // behavior name chosen on the recognition card screen
};

// District-to-stage mapping used to surface recognition cards.
// Maps [energy][direction] → array of cluster name fragments to match
const orbDistrictMap = {
  activated: {
    toward: ['Pursuit', 'Flooding', 'Control', 'Fixing'],
    away:   ['Withdrawal', 'Armor', 'Stonewalling']
  },
  collapsed: {
    toward: ['Transformation', 'Secure', 'Self-abandon'],
    away:   ['Numbing', 'Collapse', 'Vanish', 'Dissociat']
  },
  unsure: {
    toward: ['Pursuit', 'Transformation', 'Control'],
    away:   ['Withdrawal', 'Numbing', 'Armor']
  }
};

function orbAdvance(toStage, value) {
  // Persist answer
  if (toStage === 'locate')    orbState.energy    = value;
  if (toStage === 'recognize') orbState.direction  = value;
  if (toStage === 'explore')   orbState.anchor     = value; // may be null if skipped

  // Update eyebrow in Locate stage
  if (toStage === 'locate') {
    const labels = { activated: 'activated', collapsed: 'collapsed', unsure: 'not sure yet' };
    document.getElementById('locateEyebrow').textContent =
      `You said you're arriving ${labels[orbState.energy] || ''}` ;
  }

  // Build recognition cards before showing that stage
  if (toStage === 'recognize') {
    buildRecognitionCards();
  }

  // Build explore screen copy
  if (toStage === 'explore') {
    buildExploreScreen();
  }

  // Show/hide stages
  const stages = ['threshold', 'locate', 'recognize', 'explore'];
  stages.forEach(s => {
    const el = document.getElementById('stage' + capitalize(s));
    if (el) el.style.display = (s === toStage) ? 'flex' : 'none';
  });
}

function orbBack(toStage) {
  orbAdvance(toStage, null);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildRecognitionCards() {
  const energy    = orbState.energy    || 'unsure';
  const direction = orbState.direction || 'toward';
  const fragments = (orbDistrictMap[energy] && orbDistrictMap[energy][direction])
    ? orbDistrictMap[energy][direction]
    : ['Pursuit', 'Withdrawal', 'Numbing'];

  // Filter behaviors whose cluster matches any fragment
  const matched = behaviors.filter(b =>
    fragments.some(f => b.cluster.toLowerCase().includes(f.toLowerCase()))
  ).slice(0, 4); // show up to 4 cards

  const container = document.getElementById('recognizeCards');
  container.innerHTML = '';

  if (matched.length === 0) {
    // Fallback: first 4 behaviors
    behaviors.slice(0, 4).forEach(b => appendRecognitionCard(container, b));
    return;
  }
  matched.forEach(b => appendRecognitionCard(container, b));
}

function appendRecognitionCard(container, b) {
  const card = document.createElement('button');
  card.className = 'orb-recognition-card';
  card.innerHTML = `
    <strong class="rec-name">${b.name}</strong>
    <span class="rec-cluster">${b.cluster}</span>
    <span class="rec-logic">${b.logic}</span>
  `;
  card.addEventListener('click', () => {
    orbAdvance('explore', b.name);
  });
  container.appendChild(card);
}

function buildExploreScreen() {
  const anchor = orbState.anchor;
  if (anchor) {
    document.getElementById('exploreEyebrow').textContent = 'You are here';
    document.getElementById('exploreHeadline').textContent = anchor + '.';
    document.getElementById('exploreSub').textContent =
      'The atlas will open with this pattern highlighted. From here you can explore the full system — cycles, pairings, and the way through.';
  } else {
    document.getElementById('exploreEyebrow').textContent = 'Ready to explore';
    document.getElementById('exploreHeadline').textContent = 'The full map is yours.';
    document.getElementById('exploreSub').textContent =
      'No anchor chosen — the atlas opens in full. Browse the matrix, pick a behavior, or use the Cycle Map to see what happens when two moves meet.';
  }
}

function orbEnterAtlas() {
  // Hide orb, reveal atlas
  document.getElementById('orbEntry').style.display = 'none';
  document.getElementById('atlasPage').style.display = 'block';

  // Init atlas UI now that DOM is visible
  initAtlas();

  // If user picked an anchor, highlight it in the matrix
  if (orbState.anchor) {
    highlightAnchor(orbState.anchor);
  }
}

function highlightAnchor(name) {
  // Give renderTable a moment to paint, then scroll to and pulse the row
  requestAnimationFrame(() => {
    const rows = document.querySelectorAll('#matrixBody tr');
    rows.forEach(row => {
      if (row.querySelector('strong') && row.querySelector('strong').textContent.trim() === name) {
        row.classList.add('anchor-highlight');
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Also pre-load the hero panel with this behavior's info
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

// ── ATLAS STATE ───────────────────────────────────────────────────
const clusters = () => ['All', ...new Set(behaviors.map(b => b.cluster))];
let activeCluster = 'All';
let openRow = null;

// ── TABS ─────────────────────────────────────────────────────────
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

// ── MATRIX TABLE ─────────────────────────────────────────────────
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

  // Re-apply anchor highlight after re-render
  if (orbState.anchor) highlightAnchor(orbState.anchor);
}

// ── ROW EXPAND ───────────────────────────────────────────────────
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

// ── CYCLE MAP SELECTS ────────────────────────────────────────────
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

  // Pre-select anchor behavior in Partner A if one was chosen
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

// ── THEME TOGGLE ─────────────────────────────────────────────────
(function () {
  const d = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', d);

  // Theme button may not exist yet; bind after atlas is revealed
  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) {
      const r = document.documentElement;
      const next = r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', next);
    }
  });
})();

// ── VIEW TOGGLE ───────────────────────────────────────────────────
function bindViewToggle() {
  const btn = document.getElementById('viewToggle');
  if (!btn) return;
  const root = document.documentElement;
  let view = 'matrix';
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
}

// ── TERRITORY MAP ─────────────────────────────────────────────────
function getBehaviorPosition(b) {
  const moves = b.moves || [];
  const hasToward   = moves.some(m => /toward|pursue|reach|connect|pull|plea|protest|demand|cling|fawn|fix|perform|over-explain|bid/i.test(m));
  const hasAway     = moves.some(m => /away|withdraw|avoid|shut|stone|silent|escape|detach|disappear|deflect|minimize|dismiss|armor/i.test(m));
  const hasActivate = moves.some(m => /discharge|control|pursue|rage|escalate|anxiety|alarm|protest|flood/i.test(m));
  const hasCollapse = moves.some(m => /numb|transform|freeze|dissociate|collapse|gone|fade|still|quiet|soothe/i.test(m));
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
  const centers = [
    { cx: 175, cy: 170 },
    { cx: 515, cy: 170 },
    { cx: 175, cy: 390 },
    { cx: 515, cy: 390 },
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
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('cx', pos.x); hit.setAttribute('cy', pos.y);
    hit.setAttribute('r', '16'); hit.setAttribute('fill', 'transparent');
    hit.style.cursor = 'pointer';
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', pos.x); dot.setAttribute('cy', pos.y);
    dot.setAttribute('r', b.name === orbState.anchor ? '8' : '5');
    dot.setAttribute('fill', color);
    dot.setAttribute('opacity', b.name === orbState.anchor ? '1' : '0.75');
    dot.style.transition = 'r 0.15s ease, opacity 0.15s ease';
    dot.classList.add('behavior-dot'); dot.dataset.idx = i;
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', pos.x + 8); label.setAttribute('y', pos.y + 4);
    label.setAttribute('font-size', '8'); label.setAttribute('font-family', 'Satoshi, sans-serif');
    label.setAttribute('fill', color);
    label.setAttribute('opacity', b.name === orbState.anchor ? '0.9' : '0');
    label.classList.add('behavior-label'); label.dataset.idx = i;
    label.textContent = b.name;
    const grp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    grp.classList.add('behavior-node'); grp.dataset.idx = i;
    grp.appendChild(hit); grp.appendChild(dot); grp.appendChild(label);
    grp.addEventListener('mouseenter', () => {
      dot.setAttribute('r', '7'); dot.setAttribute('opacity', '1');
      label.setAttribute('opacity', '0.7');
    });
    grp.addEventListener('mouseleave', () => {
      if (selectedNode !== i) {
        dot.setAttribute('r', b.name === orbState.anchor ? '8' : '5');
        dot.setAttribute('opacity', b.name === orbState.anchor ? '1' : '0.75');
        label.setAttribute('opacity', b.name === orbState.anchor ? '0.9' : '0');
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
      dot.setAttribute('r', '8'); dot.setAttribute('opacity', '1');
      label.setAttribute('opacity', '0.9');
      showTerritoryDetail(b, color);
    });
    g.appendChild(grp);
    // Auto-show detail for anchor behavior
    if (b.name === orbState.anchor) {
      selectedNode = i;
      showTerritoryDetail(b, color);
    }
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

// ── INIT ─────────────────────────────────────────────────────────
function initAtlas() {
  renderTabs();
  renderTable();
  fillSelects();
  bindViewToggle();
}

// Orb entry starts visible; atlas inits only after orbEnterAtlas() is called.
