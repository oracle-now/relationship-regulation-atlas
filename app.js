/* ============================================================
   RELATIONSHIP REGULATION ATLAS — app.js  v2.4.0
   Browse, Cycles, Where am I? + Resourcing layer (phase 1)
   v2.4.0: Over-explaining v5 — reframe visible by default,
           grounding prompt before depth toggle,
           depth restructured: what if / what holds × 2 / one move,
           Typical pairing removed (button only),
           detail-eyebrow shared style for all behavior cards
   ============================================================ */

// — ANCHOR ————————————————————————————————————————————————
const _urlAnchor = new URLSearchParams(window.location.search).get('anchor') || null;
const orbState   = { anchor: _urlAnchor };

// — CLUSTER META ————————————————————————————————————————————
const clusterColors = {
  'Sexual / Romantic':          'ctag-sexual',
  'Communication / Conflict':   'ctag-comms',
  'Control / Over-functioning': 'ctag-control',
  'Mind / Fantasy / Spirit':    'ctag-mind',
  'Collapse / Shutdown':        'ctag-collapse',
};

const warmNames = {
  'Outsourcing erotic energy':       'keeping desire at a distance',
  'Distancing after intimacy':       'pulling back after closeness',
  'Over-explaining':                 'trying to make them understand',
  'Stonewalling':                    'going completely silent',
  'Explosive anger / protest':       'letting it all out at once',
  'Sarcasm and deflection':          'keeping it light to stay safe',
  'Overworking':                     'staying too busy to feel it',
  'Caretaking / rescuing':           "fixing so you don't have to feel",
  'Hyper-monitoring / surveillance': 'watching for the thing you dread',
  'Intellectualizing':               'analyzing instead of feeling',
  'Spiritual bypassing':             'rising above instead of going in',
  'Retreating into fantasy':         'living in a better version of this',
  'Emotional shutdown / collapse':   'powering all the way down',
  'Functional freeze':               "holding still until it's safer",
  'Emotional numbing':               'turning the volume down on everything',
};

// — TAB SYSTEM ——————————————————————————————————————————————
document.querySelectorAll('.atlas-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.atlas-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.atlas-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('panel-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
    if (tab.dataset.tab === 'cycles' && !document.getElementById('aSelect').children.length) fillSelects();
  });
});

if (window.location.hash === '#guide') {
  document.querySelector('[data-tab="guide"]').click();
}

// — SEARCH —————————————————————————————————————————————————
function handleTopbarSearch() {
  const m = document.getElementById('mobileSearch');
  if (m) m.value = document.getElementById('topbarSearch').value;
  document.querySelector('[data-tab="browse"]').click();
  renderTable();
}

function handleMobileSearch() {
  const t = document.getElementById('topbarSearch');
  if (t) t.value = document.getElementById('mobileSearch').value;
  document.querySelector('[data-tab="browse"]').click();
  renderTable();
}

function getSearchQuery() {
  const d = document.getElementById('topbarSearch');
  const m = document.getElementById('mobileSearch');
  return ((d && d.value) || (m && m.value) || '').toLowerCase();
}

// — CLUSTER TABS ———————————————————————————————————————————
let activeCluster = 'All';

function renderTabs() {
  const el = document.getElementById('clusterTabs');
  el.innerHTML = '';
  ['All', ...new Set(behaviors.map(b => b.cluster))].forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (c === activeCluster ? ' active' : '');
    btn.textContent = c;
    btn.onclick = () => { activeCluster = c; renderTabs(); renderTable(); };
    el.appendChild(btn);
  });
}

// — BROWSE TABLE ———————————————————————————————————————————
let openDetailRow = null;

function renderTable() {
  const body = document.getElementById('matrixBody');
  const q    = getSearchQuery();
  body.innerHTML = '';
  openDetailRow  = null;

  const filtered = behaviors.filter(b =>
    (activeCluster === 'All' || b.cluster === activeCluster) &&
    (!q || b.name.toLowerCase().includes(q) ||
           b.logic.toLowerCase().includes(q) ||
           b.cluster.toLowerCase().includes(q) ||
           (b.moves || []).join(' ').toLowerCase().includes(q))
  );

  if (!filtered.length) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="2"><div class="matrix-empty">Nothing matches — try a different word or clear the search.</div></td>`;
    body.appendChild(tr);
    return;
  }

  let lastCluster = null;
  filtered.forEach(b => {
    if (activeCluster === 'All' && b.cluster !== lastCluster) {
      lastCluster = b.cluster;
      const hdr = document.createElement('tr');
      hdr.className = 'cluster-header';
      hdr.innerHTML = `<td colspan="2">${b.cluster}</td>`;
      body.appendChild(hdr);
    }
    const tagClass = clusterColors[b.cluster] || '';
    const warm     = warmNames[b.name] || '';
    const tr       = document.createElement('tr');
    tr.className   = 'clickable';
    if (b.name === orbState.anchor) tr.classList.add('anchor-highlight');
    tr.innerHTML = `
      <td>
        <span class="behavior-name">${b.name}</span>
        ${warm ? `<span class="behavior-warm">${warm}</span>` : ''}
      </td>
      <td>
        <span style="display:inline-flex;align-items:center">
          <span class="cluster-tag ${tagClass}" aria-hidden="true"></span>
          <span class="small muted">${b.cluster}</span>
        </span>
      </td>
    `;
    tr.onclick = () => toggleDetail(b, tr);
    body.appendChild(tr);
  });

  if (orbState.anchor) highlightAnchor(orbState.anchor);
}

// — OVER-EXPLAINING CARD v5 ————————————————————————————————
// Reframe visible by default · grounding prompt · depth restructured
function buildOverExplainingCard(b) {
  const tagClass = clusterColors[b.cluster] || '';
  const warm     = warmNames[b.name] || '';

  const hasResourcingEntry = typeof resourcing !== 'undefined' && resourcing[b.name];
  const entitled = true; // phase-1: open
  const resourcingBlock = hasResourcingEntry
    ? (entitled
        ? (typeof renderResourcing === 'function' ? renderResourcing(b) : '')
        : (typeof renderLockedDoor === 'function' ? renderLockedDoor() : ''))
    : '';
  const floorBlock = typeof renderSafetyFloor === 'function' ? renderSafetyFloor() : '';

  return `
    <div class="oe-card" role="region" aria-label="Over-explaining detail">

      <div class="oe-surface">
        <div class="oe-surface-name">
          <span class="oe-name">${b.name}</span>
          ${warm ? `<span class="oe-warm">${warm}</span>` : ''}
        </div>
        <span class="oe-cluster-tag">
          <span class="cluster-tag ${tagClass}" aria-hidden="true"></span>
          <span>${b.cluster}</span>
        </span>
      </div>

      <div class="oe-preview">
        <div class="oe-block">
          <span class="oe-eyebrow">Short-term logic</span>
          <p>${b.logic}</p>
        </div>
        <div class="oe-block">
          <span class="oe-eyebrow">Long-term cost</span>
          <p>${b.cost}</p>
        </div>
      </div>

      <div class="oe-reframe">
        <p>This is a defense you built for a reason. Not a flaw in you.</p>
      </div>

      <p class="oe-threshold">Feel your feet, or the chair, before you read on.</p>

      <button class="oe-toggle" aria-expanded="false" onclick="toggleOeDepth(this)">
        <span class="oe-toggle-text">Go deeper</span>
        <span class="oe-toggle-icon" aria-hidden="true">&#8595;</span>
      </button>

      <div class="oe-depth" id="oeDepth">
        <div class="oe-depth-inner">
          <div class="oe-depth-grid">
            <div class="oe-block">
              <span class="oe-eyebrow">What if it comes true</span>
              <p>You say it once, you stop explaining, and they still don't get it. The gap is real and it stays. They don't change their mind, and you didn't earn the understanding you were working for.</p>
            </div>
            <div class="oe-block">
              <span class="oe-eyebrow">What holds: inside you</span>
              <p>You've already lived through being misunderstood and kept going. You're not actually managed by it. Knowing the truth, even an unwanted one, is something you've carried before and can carry again.</p>
            </div>
            <div class="oe-block">
              <span class="oe-eyebrow">What holds: with another person</span>
              <p>When you're ready: one person who lets the gap be real without rushing to fix it shows you that being incompletely understood isn't the same as being left.</p>
            </div>
            <div class="oe-block oe-block-move">
              <span class="oe-eyebrow">One move</span>
              <p>Say the thing once. Then stop, and let the silence sit for one breath without adding to it.</p>
            </div>
          </div>
        </div>
      </div>

      ${resourcingBlock}
      ${floorBlock}

      <div class="detail-footer" style="margin-top:var(--space-6)">
        <button class="btn" onclick="goToCycles('${b.name.replace(/'/g, "\\'")}')">
          See what happens when this meets another pattern &rarr;
        </button>
      </div>

    </div>
  `;
}

function toggleOeDepth(btn) {
  const depth  = document.getElementById('oeDepth');
  const inner  = depth ? depth.querySelector('.oe-depth-inner') : null;
  const textEl = btn.querySelector('.oe-toggle-text');
  const iconEl = btn.querySelector('.oe-toggle-icon');
  if (!depth || !inner) return;

  const isOpen = depth.classList.contains('open');
  if (isOpen) {
    depth.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    if (textEl) textEl.textContent = 'Go deeper';
    if (iconEl) iconEl.innerHTML = '&#8595;';
  } else {
    depth.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    if (textEl) textEl.textContent = 'Show less';
    if (iconEl) iconEl.innerHTML = '&#8593;';
  }
}

// — SMOOTH ROW EXPAND ——————————————————————————————————————
function toggleDetail(b, tr) {
  const existing = document.getElementById('detailRow');
  if (existing) {
    existing.querySelector('.detail-inner').classList.remove('open');
    setTimeout(() => existing.remove(), 260);
    if (openDetailRow === tr) { openDetailRow = null; return; }
  }
  openDetailRow = tr;
  const dr = document.createElement('tr');
  dr.id = 'detailRow';
  dr.className = 'detail-row';

  const entitled = true;
  let innerContent;

  if (b.name === 'Over-explaining') {
    innerContent = buildOverExplainingCard(b);
  } else {
    const hasResourcingEntry = typeof resourcing !== 'undefined' && resourcing[b.name];
    const resourcingBlock = hasResourcingEntry
      ? (entitled
          ? (typeof renderResourcing === 'function' ? renderResourcing(b)  : '')
          : (typeof renderLockedDoor === 'function' ? renderLockedDoor()   : ''))
      : '';
    const floorBlock = typeof renderSafetyFloor === 'function' ? renderSafetyFloor() : '';

    innerContent = `
      <div class="detail-content-inner">
        <div class="detail-grid">
          <div class="detail-block"><span class="detail-eyebrow">Short-term logic</span>${b.logic}</div>
          <div class="detail-block"><span class="detail-eyebrow">Long-term cost</span>${b.cost}</div>
          <div class="detail-block"><span class="detail-eyebrow">Resistance</span>${b.resistance}</div>
          <div class="detail-block"><span class="detail-eyebrow">What it protects me from seeing</span>${b.protects}</div>
          <div class="detail-block"><span class="detail-eyebrow">What I fear if I stop</span>${b.fear}</div>
          <div class="detail-block"><span class="detail-eyebrow">A way through</span>${b.healthier}</div>
        </div>
        ${resourcingBlock}
        ${floorBlock}
        <div class="detail-footer">
          <button class="btn" onclick="goToCycles('${b.name.replace(/'/g, "\\'")}')">
            See what happens when this meets another pattern &rarr;
          </button>
        </div>
      </div>
    `;
  }

  dr.innerHTML = `
    <td colspan="2">
      <div class="detail-inner" id="detailInner">
        <div class="detail-inner-content">
          ${innerContent}
        </div>
      </div>
    </td>
  `;
  tr.after(dr);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById('detailInner').classList.add('open');
  }));
}

// — ANCHOR HIGHLIGHT ——————————————————————————————————————
function highlightAnchor(name) {
  requestAnimationFrame(() => {
    document.querySelectorAll('#matrixBody tr').forEach(row => {
      const el = row.querySelector('.behavior-name');
      if (el && el.textContent.trim() === name) {
        row.classList.add('anchor-highlight');
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const b = behaviors.find(bh => bh.name === name);
        if (b) setTimeout(() => toggleDetail(b, row), 400);
      }
    });
  });
}

// — CYCLES ——————————————————————————————————————————————————
function fillSelects() {
  const aSel = document.getElementById('aSelect');
  const bSel = document.getElementById('bSelect');
  if (!aSel || !bSel) return;
  behaviors.forEach((b, i) => {
    [aSel, bSel].forEach(sel => {
      const o = document.createElement('option');
      o.value = i; o.textContent = b.name;
      sel.appendChild(o);
    });
  });
  const ai = orbState.anchor ? behaviors.findIndex(b => b.name === orbState.anchor) : -1;
  aSel.value = ai > -1 ? ai : 1;
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
  document.getElementById('aFear').textContent  = 'Resistance: ' + a.resistance;
  document.getElementById('bTitle').textContent = b.name;
  document.getElementById('bLogic').textContent = b.logic;
  document.getElementById('bFear').textContent  = 'Resistance: ' + b.resistance;
  document.getElementById('cycleOut').innerHTML = `
    <strong>What this cycle looks like:</strong><br>
    When one person uses <em>${a.name}</em> — ${a.logic.toLowerCase()} —
    the other often responds with <em>${b.name}</em>.<br><br>
    <strong>The loop:</strong> ${a.pairNote}<br>
    <strong>The other side:</strong> ${b.pairNote}<br><br>
    <strong>Where both people are stuck:</strong><br>
    One fears that ${a.fear.toLowerCase()}<br>
    The other fears that ${b.fear.toLowerCase()}<br><br>
    <strong>A way through:</strong> ${a.healthier} On the other side: ${b.healthier.toLowerCase()}
  `;
}

function goToCycles(name) {
  document.querySelector('[data-tab="cycles"]').click();
  if (!document.getElementById('aSelect').children.length) fillSelects();
  const idx = behaviors.findIndex(b => b.name === name);
  if (idx > -1) { document.getElementById('aSelect').value = idx; updateCycle(); }
}

// — WHERE AM I ———————————————————————————————————————————
const gState = { energy: null, direction: null, anchor: null };

const gDistrictMap = {
  activated: {
    toward: ['Communication / Conflict', 'Control / Over-functioning'],
    away:   ['Communication / Conflict', 'Sexual / Romantic'],
    both:   ['Communication / Conflict', 'Control / Over-functioning'],
  },
  collapsed: {
    toward: ['Mind / Fantasy / Spirit', 'Control / Over-functioning'],
    away:   ['Collapse / Shutdown', 'Mind / Fantasy / Spirit'],
    both:   ['Collapse / Shutdown', 'Control / Over-functioning'],
  },
  unsure: {
    toward: ['Control / Over-functioning', 'Communication / Conflict'],
    away:   ['Collapse / Shutdown', 'Sexual / Romantic'],
    both:   ['Communication / Conflict', 'Collapse / Shutdown'],
  },
};

function gAdvance(toStep, value) {
  if (toStep === 2) gState.energy    = value;
  if (toStep === 3) gState.direction = value;
  if (toStep === 4) gState.anchor    = value;
  if (toStep === 3) buildGRecCards();
  if (toStep === 4) buildGResult();
  document.querySelectorAll('.guide-step').forEach(s => s.classList.remove('active'));
  const ids = { 2:'gStep2', 3:'gStep3', 4:'gResult' };
  const next = document.getElementById(ids[toStep]);
  if (next) {
    next.classList.add('active');
    const f = next.querySelector('button, input');
    if (f) setTimeout(() => f.focus(), 50);
  }
}

function gBack(toStep) {
  document.querySelectorAll('.guide-step').forEach(s => s.classList.remove('active'));
  const ids = { 1:'gStep1', 2:'gStep2', 3:'gStep3' };
  const prev = document.getElementById(ids[toStep]);
  if (prev) {
    prev.classList.add('active');
    const f = prev.querySelector('button');
    if (f) setTimeout(() => f.focus(), 50);
  }
}

function buildGRecCards() {
  const e  = gState.energy    || 'unsure';
  const d  = gState.direction || 'both';
  const cl = (gDistrictMap[e] && gDistrictMap[e][d]) || [];
  const list = (behaviors.filter(b => cl.includes(b.cluster)).slice(0, 4).length
    ? behaviors.filter(b => cl.includes(b.cluster)).slice(0, 4)
    : behaviors.slice(0, 4));
  const container = document.getElementById('gRecCards');
  container.innerHTML = '';
  list.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'guide-rec-card';
    btn.innerHTML = `
      <strong class="grec-name">${b.name}</strong>
      ${warmNames[b.name] ? `<span class="grec-warm">${warmNames[b.name]}</span>` : ''}
      <span class="grec-logic">${b.logic}</span>
    `;
    btn.addEventListener('click', () => gAdvance(4, b.name));
    container.appendChild(btn);
  });
}

function buildGResult() {
  const b = behaviors.find(bh => bh.name === gState.anchor);
  if (!b) return;
  document.getElementById('gResultName').textContent = b.name;
  document.getElementById('gResultBody').innerHTML = `
    <div style="margin-bottom:var(--space-3)">${b.logic}</div>
    <div style="margin-bottom:var(--space-3)"><strong>The cost:</strong> ${b.cost}</div>
    <div><strong>A way through:</strong> ${b.healthier}</div>
  `;
}

function gSkip() { document.querySelector('[data-tab="browse"]').click(); }

function gGoToBrowse() {
  orbState.anchor = gState.anchor;
  document.querySelector('[data-tab="browse"]').click();
  setTimeout(() => highlightAnchor(gState.anchor), 100);
}

function gReset() {
  gState.energy = null; gState.direction = null; gState.anchor = null;
  document.querySelectorAll('.guide-step').forEach(s => s.classList.remove('active'));
  document.getElementById('gStep1').classList.add('active');
  const f = document.querySelector('#gStep1 button');
  if (f) f.focus();
}

// — THEME ——————————————————————————————————————————————————
(function () {
  document.documentElement.setAttribute('data-theme', 'light');
  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) {
      const r = document.documentElement;
      r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    }
  });
})();

// — INIT ———————————————————————————————————————————————————
renderTabs();
renderTable();
if (orbState.anchor) setTimeout(() => highlightAnchor(orbState.anchor), 200);
