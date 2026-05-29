/* ============================================================
   RELATIONSHIP REGULATION ATLAS — resourcing.test.js
   Build-failing guards for the resourcing layer.
   Run with: node resourcing.test.js
   All seven tests must pass before any push.
   ============================================================ */

const RESOURCING_SCHEMA_VERSION = 'resourcing.v1';
const RESOURCING_REQUIRED_FIELDS = [
  'schema','key','grounding','entryFraming',
  'whatIfItComesTrue','holdsInternal','holdsExternal','move'
];
const RESOURCING_BANNED_FIELDS = ['youAre','identity','diagnosis','trait'];

const fs  = require('fs');
const src = fs.readFileSync('./resourcing.js', 'utf8');

function extractResourcingEntries() {
  const scope = {};
  const dataBlock = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/function\s+\w+[\s\S]*?^}/mg, '')
    .replace(/const\s+RESOURCING_[A-Z_]+ = [^;]+;/g, '')
    .replace(/const\s+resourcing\s*=/, 'scope.resourcing =');
  try { eval(dataBlock); } catch(e) {}
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

const appSrc = fs.readFileSync('./app.js', 'utf8');

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
      'missing or empty'
    );
  });
});

// TEST 3: entryFraming ≤ 120 chars
console.log('\n3. entryFraming ≤ 120 characters');
keys.forEach(k => {
  const len = (entries[k].entryFraming || '').length;
  assert(`${k} → entryFraming length ${len}`, len <= 120, `${len} chars (max 120)`);
});

// TEST 4: No banned identity fields
console.log('\n4. No banned identity fields');
keys.forEach(k => {
  RESOURCING_BANNED_FIELDS.forEach(f => {
    assert(`${k} → no field '${f}'`, !Object.prototype.hasOwnProperty.call(entries[k], f));
  });
});

// TEST 5 (rewritten): Safety floor — call exists AND is gracefully guarded
// Previous version only checked that the string 'renderSafetyFloor()' appeared
// in app.js. That was a false green: it passed even when the function would
// throw at runtime because resourcing.js wasn't loaded.
// This version checks both: call exists, AND is wrapped in a typeof guard.
console.log('\n5. Safety floor call exists and is typeof-guarded in app.js');
const floorCallExists  = appSrc.includes('renderSafetyFloor()');
const floorCallGuarded = appSrc.includes("typeof renderSafetyFloor === 'function'");
assert(
  'renderSafetyFloor() called in app.js',
  floorCallExists,
  'call not found'
);
assert(
  'renderSafetyFloor() is typeof-guarded (graceful when resourcing.js absent)',
  floorCallGuarded,
  'missing typeof guard — bare call will throw if resourcing.js is not loaded'
);

// TEST 6: No behavior key in request URL
console.log('\n6. No behavior key in request URL');
const urlKeyPattern = /fetch\([`'"].*resourcing.*[?&]key=/;
assert('No resourcing key in any fetch URL in app.js',        !urlKeyPattern.test(appSrc));
assert('No resourcing key in any fetch URL in resourcing.js', !urlKeyPattern.test(src));

// TEST 7: Cross-file call audit — every cross-file function called in
// toggleDetail must have a typeof guard. This is the prompt from ROOM.md
// codified as a build-failing assertion. Add to this list whenever a new
// cross-file function is introduced.
console.log('\n7. Cross-file call audit (toggleDetail)');
const crossFileFunctions = [
  'renderResourcing',
  'renderLockedDoor',
  'renderSafetyFloor',
];
crossFileFunctions.forEach(fn => {
  assert(
    `${fn} has typeof guard in app.js`,
    appSrc.includes(`typeof ${fn} === 'function'`),
    `missing typeof guard — if resourcing.js is not loaded this will throw`
  );
});

// ── RESULT ────────────────────────────────────────────────────
console.log(`\n── ${passed} passed, ${failed} failed ─────────────────\n`);
if (failed > 0) process.exit(1);
