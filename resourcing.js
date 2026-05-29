/* ============================================================
   RELATIONSHIP REGULATION ATLAS — resourcing.js
   Frozen schema: resourcing.v1
   Fields: schema, key, grounding, entryFraming,
           whatIfItComesTrue, holdsInternal, holdsExternal, move

   SERVER NEVER RECEIVES THE BEHAVIOR KEY.
   The gated fetch returns this entire object; the client
   picks resourcing[b.name] locally. No per-behavior trail
   can exist because the server never learns which entry
   was opened. This is what makes {entitled:bool} true.

   Privacy: no third-party analytics fire behind the gate.
   Gate states: authed (full entry) | anon (locked door)
   Safety floor: mounts in EVERY state, exactly once.
   ============================================================ */

// — SCHEMA FREEZE ——————————————————————————————————————————
const RESOURCING_SCHEMA_VERSION = 'resourcing.v1';
const RESOURCING_REQUIRED_FIELDS = [
  'schema','key','grounding','entryFraming',
  'whatIfItComesTrue','holdsInternal','holdsExternal','move'
];
// BANNED: any field that names a trait, identity, or
// fixed quality of the person (e.g. 'youAre', 'diagnosis').
const RESOURCING_BANNED_FIELDS = ['youAre','identity','diagnosis','trait'];

// — CALIBRATION ENTRIES ————————————————————————————————————
const resourcing = {

  "Hyper-monitoring / surveillance": {
    schema: "resourcing.v1",
    key: "Hyper-monitoring / surveillance",
    grounding: "Feel your feet, or the chair, before you read on.",
    entryFraming: "This is a defense you built for a reason. Not a flaw in you.",
    whatIfItComesTrue: "You stop watching and the thing you feared actually happens: they pull away, or lie, or leave, and you didn't see it coming. The monitoring wasn't paranoia; it was reading a real signal. You were right, and now you're holding it without the buffer of having anticipated it.",
    holdsInternal: "You've survived unwanted surprises before this one: not because you caught them early, but because you found a way through after. Knowing sooner didn't protect you from the weight of it; you've carried that weight before and kept going.",
    holdsExternal: "When you're ready: one person who can sit with the unwanted truth alongside you, not to fix it, just to stay, shows you that the weight is something two people can hold.",
    move: "Set one window: check once, then close it and let the next hour be ungathered."
  },

  "Over-explaining": {
    schema: "resourcing.v1",
    key: "Over-explaining",
    grounding: "Feel your feet, or the chair, before you read on.",
    entryFraming: "This is a defense you built for a reason. Not a flaw in you.",
    whatIfItComesTrue: "You say it once, you stop explaining, and they still don't get it. The gap is real and it stays. They don't change their mind, and you didn't earn the understanding you were working for.",
    holdsInternal: "You've already lived through being misunderstood and kept going. You're not actually managed by it. Knowing the truth, even an unwanted one, is something you've carried before and can carry again.",
    holdsExternal: "When you're ready: one person who lets the gap be real without rushing to fix it shows you that being incompletely understood isn't the same as being left.",
    move: "Say the thing once. Then stop, and let the silence sit for one breath without adding to it."
  },

  "Emotional numbing": {
    schema: "resourcing.v1",
    key: "Emotional numbing",
    grounding: "Feel your feet, or the chair, before you read on.",
    entryFraming: "This is a defense you built for a reason. Not a flaw in you.",
    whatIfItComesTrue: "You let the feeling back in and it's as big as you feared: the old grief, the thing you turned down the volume on, actually surfaces. It can. Numbing was never erasing it; it was holding it just out of reach at a cost.",
    holdsInternal: "You're not the child who first turned it down. You've let smaller things in before and stayed standing. Feelings crest and pass when you let them; you've felt that happen already.",
    holdsExternal: "When you're ready: one steady person in the room, someone who doesn't flinch at your grief, is how the feeling first becomes survivable to feel at all.",
    move: "Let one small feeling in for sixty seconds. Name it, let it crest, and notice it passes."
  }

};

// — RENDER FUNCTIONS ———————————————————————————————————————

/**
 * renderResourcing(b)
 * Renders the full gated resourcing entry for behavior b.
 * Appends inside .detail-content-inner, after .detail-grid.
 * The safety floor mounts via renderSafetyFloor(), called once per detail open.
 *
 * Accessibility: r-label uses <h4> for semantic heading structure.
 * Screen reader heading navigation can reach each section by heading.
 * Hard rule: no em dashes in any copy per ROOM.md.
 */
function renderResourcing(b) {
  const entry = resourcing[b.name];
  if (!entry) return '';
  return `
    <div class="resourcing" role="region" aria-label="Resourcing layer for ${b.name}">
      <p class="r-grounding">${entry.grounding}</p>
      <p class="r-framing">${entry.entryFraming}</p>
      <div class="r-rail">
        <div class="r-block">
          <h4 class="r-label">What if it comes true</h4>
          <p>${entry.whatIfItComesTrue}</p>
        </div>
        <div class="r-block r-internal">
          <h4 class="r-label">What holds: inside you</h4>
          <p>${entry.holdsInternal}</p>
        </div>
        <div class="r-block r-external">
          <h4 class="r-label">What holds: with another person</h4>
          <p>${entry.holdsExternal}</p>
        </div>
        <div class="r-block r-move">
          <h4 class="r-label">One move</h4>
          <p>${entry.move}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * renderLockedDoor()
 * Renders the gate for unauthenticated users.
 * The locked door never describes the content behind it;
 * it only names what this layer is and who it is for.
 */
function renderLockedDoor() {
  return `
    <div class="r-door" role="region" aria-label="Resourcing layer, access required">
      <p class="r-door-label">This layer helps you stay present with what's underneath.</p>
      <p class="r-door-sub">What you open here isn't tracked to you.</p>
      <button class="btn primary r-unlock" onclick="handleResourcingUnlock()">
        Unlock resourcing layer
      </button>
    </div>
  `;
}

/**
 * renderSafetyFloor()
 * UNGATED. Mounts in EVERY state: authed and anon, exactly once.
 * This is the non-negotiable ethical floor.
 *
 * Crisis resource: findahelpline.com (Throughline).
 * Throughline owns freshness and region-awareness.
 * We maintain nothing; they maintain everything.
 * "no one is monitoring this page" is honest because it is true.
 * "your local emergency number" never goes stale.
 */
function renderSafetyFloor() {
  return `
    <aside class="r-floor" role="complementary">
      <a class="r-exit" href="#browse">&#8592; Back to the map</a>
      <p class="r-not-therapy">This is reflection, not therapy, and no one is monitoring this page.</p>
      <p class="r-crisis">
        If you're in immediate danger, call your local emergency number.
        To reach a crisis line in your country, visit
        <a href="https://findahelpline.com" rel="noopener" target="_blank">findahelpline.com</a>.
      </p>
    </aside>
  `;
}

/**
 * handleResourcingUnlock()
 * Phase 1: open/static, no auth wall yet.
 * Phase 2 (pre-monetization): POST body-only to /api/resourcing.
 * Server returns entire resourcing set; client picks entry.
 * Server NEVER receives the behavior key -- no per-behavior log possible.
 */
function handleResourcingUnlock() {
  // Phase 1 stub -- entitlement layer wires here at monetization.
  // The fetch shape when live:
  //
  //   POST /api/resourcing          <- no key in URL, no key in body
  //   authed   -> 200 { ...all entries... }
  //   anon     -> 401 (client renders locked door)
  //
  // Client then does: resourcing[b.name]  -- server never learns which.
  console.log('Resourcing unlock -- phase 1 stub. Auth layer wires here.');
}
