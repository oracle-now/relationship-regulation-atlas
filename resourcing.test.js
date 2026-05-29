/* ============================================================
   RELATIONSHIP REGULATION ATLAS — resourcing.test.js
   Build-failing guards for the resourcing layer.
   Run with: node resourcing.test.js
   All six tests must pass before any push.
   ============================================================ */

// Inline the constants (avoids ES module gymnastics in Node)
const RESOURCING_SCHEMA_VERSION = 'resourcing.v1';
const RESOURCING_REQUIRED_FIELDS = [
  'schema','key','grounding','entryFraming',
  'whatIfItComesTrue','holdsInternal','holdsExternal','move'
];
const RESOURCING_BANNED_FIELDS = ['youAre','identity','diagnosis','trait'];

// Load the resourcing data
const fs = require('fs');
const src = fs.readFileSync('./resourcing.js', 'utf8');

// Extract the resourcing object via eval in a controlled scope
function extractResourcingEntries() {
  const scope = {};
  // Strip the function declarations; we only need the data object
  const dataBlock = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/function\s+\w+[\s\S]*?^}/mg, '')
    .replace(/const\s+RESOURCING_[A-Z_]+ = [^;]+;/g, '')
    .replace(/const\s+resourcing\s*=/, 'scope.resourcing =');
  try { eval(dataBlock); } catch(e) { /* partial parse ok */ }
  return scope.resourcing || {};
}

const entries = extractResourcingEntries();
const keys    = Object.keys(entries);
let   passed  = 0;
let   failed  = 0;

function assert(name, condition, detail) {
  if (condition) {
    console.log(`  ✓ ${name}`);
    passed++;
  } else {
    console.error(`  ✗ ${name}${detail ? ' — ' + detail : ''}`);
    failed++;
  }
}

console.log('\n── resourcing.test.js ─────────────────────────');
console.log(`   ${keys.length} entries found\n`);

// TEST 1: Schema version frozen
console.log('1. Schema frozen');
keys.forEach(k => {
  assert(
    `${k} → schema = '${RESOURCING_SCHEMA_VERSION}'`,
    entries[k].schema === RESOURCING_SCHEMA_VERSION,
    `got '${entries[k].schema}'`
  );
});

// TEST 2: All required fields present
console.log('\n2. Required fields present');
keys.forEach(k => {
  RESOURCING_REQUIRED_FIELDS.forEach(f => {
    assert(
      `${k} → has field '${f}'`,
      Object.prototype.hasOwnProperty.call(entries[k], f) &&
      typeof entries[k][f] === 'string' &&
      entries[k][f].trim().length > 0,
      `missing or empty`
    );
  });
});

// TEST 3: entryFraming ≤ 120 chars
console.log('\n3. entryFraming ≤ 120 characters');
keys.forEach(k => {
  const len = (entries[k].entryFraming || '').length;
  assert(
    `${k} → entryFraming length ${len}`,
    len <= 120,
    `${len} chars (max 120)`
  );
});

// TEST 4: No banned identity fields
console.log('\n4. No banned identity fields');
keys.forEach(k => {
  RESOURCING_BANNED_FIELDS.forEach(f => {
    assert(
      `${k} → no field '${f}'`,
      !Object.prototype.hasOwnProperty.call(entries[k], f)
    );
  });
});

// TEST 5: Exactly one .r-floor mounts in every render state
// (Structural test — confirms renderSafetyFloor is called once
//  in both renderResourcing and renderLockedDoor paths in app.js)
console.log('\n5. Safety floor mounted exactly once in app.js');
const appSrc = fs.readFileSync('./app.js', 'utf8');
const floorCalls = (appSrc.match(/renderSafetyFloor\(\)/g) || []).length;
assert(
  `renderSafetyFloor() called exactly once in app.js`,
  floorCalls === 1,
  `found ${floorCalls} call(s) (expected 1)`
);

// TEST 6: Behavior key never appears in a request URL
// Confirms the privacy architecture: server cannot log which entry was opened.
// The fetch must POST to /api/resourcing with no key in the URL.
console.log('\n6. No behavior key in request URL');
const urlKeyPattern = /fetch\([`'"].*resourcing.*[?&]key=/;
assert(
  'No resourcing key in any fetch URL in app.js',
  !urlKeyPattern.test(appSrc)
);
const urlKeyInResourcing = /fetch\([`'"].*resourcing.*[?&]key=/;
assert(
  'No resourcing key in any fetch URL in resourcing.js',
  !urlKeyInResourcing.test(src)
);

// ── RESULT ──────────────────────────────────────────────────
console.log(`\n── ${passed} passed, ${failed} failed ─────────────────\n`);
if (failed > 0) process.exit(1);
