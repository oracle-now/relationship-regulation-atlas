/* ============================================================
   RELATIONSHIP REGULATION ATLAS — data.js
   The behaviors array. Add, edit, or remove entries here.
   Each object = one row in the matrix.

   Fields:
     cluster      — category tab label
     name         — behavior name (row header)
     moves        — array of move types (shown as tags)
     logic        — short-term logic (why this makes sense)
     cost         — long-term cost
     resistance   — what makes it hard to change
     fear         — the deeper fear underneath
     protects     — what it protects the person from seeing
     partnerAvoids — what the partner's behavior lets them avoid
     healthier    — a healthier version of the same move
     pairNote     — typical pairing cycle with another behavior
   ============================================================ */

const behaviors = [

  // ── SEXUAL / ROMANTIC ──────────────────────────────────────
  {
    cluster: 'Sexual / Romantic',
    name: 'Outsourcing erotic energy',
    moves: ['Move away', 'Numb', 'Control'],
    logic: 'Keeps desire alive without the exposure and vulnerability of mutual intimacy.',
    cost: 'Partner feels shut out; secrecy and erotic distance compound over time.',
    resistance: 'If I stop, I may have to face my real limitations and my partner\'s real needs.',
    fear: 'I might discover I\'m incapable of the intimacy I claim to want.',
    protects: 'My split between a "good" self and a sexual self I haven\'t integrated.',
    partnerAvoids: 'Owning how their distance and withdrawal may have contributed.',
    healthier: 'Make erotic life part of the explicit, honest conversation of the relationship.',
    pairNote: 'Often pairs with anxious pursuit or hyper-monitoring—creating a secrecy → panic → more secrecy loop.'
  },
  {
    cluster: 'Sexual / Romantic',
    name: 'Distancing after intimacy',
    moves: ['Move away', 'Control'],
    logic: 'Turns down intensity after closeness to restore space and autonomy.',
    cost: 'Closeness begins to predict coldness; partner starts to feel rejected for reaching out.',
    resistance: 'If I stay, I may feel engulfed, obligated, or exposed as not enough.',
    fear: 'Closeness means being trapped or failing to live up to what is expected.',
    protects: 'My terror of dependence and of being truly known.',
    partnerAvoids: 'Deciding whether this person\'s level of availability is actually enough.',
    healthier: 'Name the overwhelm directly—"I need a little space; it\'s not about you"—and follow through on reconnecting.',
    pairNote: 'Classic pursuer–distancer: the more one reaches, the more the other retreats.'
  },

  // ── COMMUNICATION / CONFLICT ───────────────────────────────
  {
    cluster: 'Communication / Conflict',
    name: 'Over-explaining',
    moves: ['Move toward', 'Control'],
    logic: 'Tries to secure understanding and prevent abandonment through words and clarity.',
    cost: 'The other person floods and withdraws more; the explaining confirms the pursuer dynamic.',
    resistance: 'If I stop, I may have to accept that they simply are not meeting me.',
    fear: 'Without the right explanation, I will be misunderstood, blamed, or left.',
    protects: 'My own anger and grief about the gap between what I need and what I\'m getting.',
    partnerAvoids: 'Actively naming their own feelings and taking clear positions.',
    healthier: 'One clear, short statement of need. Then hold the silence.',
    pairNote: 'Pairs with stonewalling: the more one explains, the more the other shuts down.'
  },
  {
    cluster: 'Communication / Conflict',
    name: 'Stonewalling',
    moves: ['Move away', 'Numb', 'Control'],
    logic: 'Creates immediate relief from overwhelm, flooding, or perceived criticism.',
    cost: 'Partner feels abandoned and escalates; the silence becomes its own message.',
    resistance: 'If I engage, I might be flooded, say something unforgivable, or lose control.',
    fear: 'Full engagement means I will be overwhelmed or exposed.',
    protects: 'My fear of my own emotional intensity and of conflict I cannot win.',
    partnerAvoids: 'Owning that their pursuit style may be overwhelming even when the underlying need is valid.',
    healthier: 'A time-limited break with a clear return time. "I need 20 minutes. I\'m coming back."',
    pairNote: 'Pairs with protest or over-explaining: silence is gasoline on the anxiety of the pursuer.'
  },
  {
    cluster: 'Communication / Conflict',
    name: 'Explosive anger / protest',
    moves: ['Discharge', 'Move toward'],
    logic: 'Makes the pain impossible to ignore; tries to force a response.',
    cost: 'The other person goes into fear or shutdown; the real message gets lost in the delivery.',
    resistance: 'If I get quieter, no one will ever really hear or respect me.',
    fear: 'My softer feelings—grief, fear, longing—will not be taken seriously.',
    protects: 'The vulnerability underneath the rage.',
    partnerAvoids: 'Owning their role in the chronic under-responsiveness that built the pressure.',
    healthier: 'Name the soft emotion first, before it becomes explosive. "I\'m scared. I miss you. I feel invisible."',
    pairNote: 'Often pairs with withdrawal or contempt; one person escalates, the other disappears.'
  },
  {
    cluster: 'Communication / Conflict',
    name: 'Sarcasm and deflection',
    moves: ['Control', 'Numb'],
    logic: 'Keeps things light enough to survive; tests the water without real exposure.',
    cost: 'Intimacy never deepens; the other person feels mocked or unseen.',
    resistance: 'If I drop the humor, I\'ll be nakedly vulnerable and possibly rejected.',
    fear: 'Real feelings will be ridiculed or used against me.',
    protects: 'The depth of hurt or shame underneath the wit.',
    partnerAvoids: 'Their own discomfort with depth and seriousness.',
    healthier: 'One real sentence, without the joke. Let it land.',
    pairNote: 'Pairs with emotional directness in the other—one person feels studied, the other feels mocked.'
  },

  // ── CONTROL / OVER-FUNCTIONING ─────────────────────────────
  {
    cluster: 'Control / Over-functioning',
    name: 'Overworking',
    moves: ['Control', 'Numb', 'Move away'],
    logic: 'Turns pain into productivity; keeps feelings at a manageable distance.',
    cost: 'Burnout, emotional neglect of relationships, and eventual collapse.',
    resistance: 'If I stop, I may have to feel how empty or frightened I am.',
    fear: 'Rest will expose me as lazy, mediocre, or unworthy of love.',
    protects: 'The loneliness, anger, or grief I\'ve been outrunning.',
    partnerAvoids: 'Naming what they actually need from the relationship rather than waiting.',
    healthier: 'Scheduled, protected non-productive time treated as a necessity, not a reward.',
    pairNote: 'Pairs with emotional under-presence; one person is always "busy," the other feels last on the list.'
  },
  {
    cluster: 'Control / Over-functioning',
    name: 'Caretaking / rescuing',
    moves: ['Move toward', 'Control'],
    logic: 'Stays needed and safe by solving other people\'s problems.',
    cost: 'Resentment grows; others under-function; the relationship becomes one-sided.',
    resistance: 'If I stop fixing, I may have no purpose—or they may leave.',
    fear: 'My only value is what I do for people, not who I am.',
    protects: 'My own unmet needs, loneliness, and anger.',
    partnerAvoids: 'Taking ownership of their own life and capacity.',
    healthier: 'Shift from caretaking to caregiving: offer support without taking over. Ask: "What do you need?" instead of assuming.',
    pairNote: 'Pairs with collapse or chaos in the other; one over-functions, the other under-functions.'
  },
  {
    cluster: 'Control / Over-functioning',
    name: 'Hyper-monitoring / surveillance',
    moves: ['Control', 'Move toward'],
    logic: 'Reduces anxiety by scanning for threats and staying ahead of abandonment.',
    cost: 'Erodes trust and creates the very distance it was trying to prevent.',
    resistance: 'If I stop monitoring, I might miss the moment everything falls apart.',
    fear: 'I\'ll be blindsided again—like I was before.',
    protects: 'Old wounds around betrayal, abandonment, or being deceived.',
    partnerAvoids: 'Being transparent enough to make monitoring unnecessary.',
    healthier: 'Name the fear directly: "I\'m feeling insecure and I need some reassurance."',
    pairNote: 'Pairs with secrecy or distance; the more one monitors, the more the other hides.'
  },

  // ── MIND / FANTASY / SPIRIT ────────────────────────────────
  {
    cluster: 'Mind / Fantasy / Spirit',
    name: 'Intellectualizing',
    moves: ['Control', 'Numb'],
    logic: 'Analysis creates enough distance from raw feeling to stay functional.',
    cost: 'Insight accumulates; embodied change does not. Others feel examined, not met.',
    resistance: 'If I stop analyzing, I\'ll be overwhelmed or exposed as needy.',
    fear: 'Feelings will humiliate me or spiral out of control.',
    protects: 'My longing for comfort, touch, and simple warmth.',
    partnerAvoids: 'Their own preference to stay on the surface rather than go deeper.',
    healthier: 'One somatic check-in before the analysis. "What am I feeling in my body right now?"',
    pairNote: 'Pairs with emotional intensity in the other; one person retreats into concepts, the other into feeling.'
  },
  {
    cluster: 'Mind / Fantasy / Spirit',
    name: 'Spiritual bypassing',
    moves: ['Numb', 'Control', 'Move away'],
    logic: 'Rises above the mess to stay grounded in something larger.',
    cost: 'Pain goes underground; partner feels invalidated or spiritually outranked.',
    resistance: 'If I stop transcending this, I\'ll have to live in it—and I\'m afraid of what I\'ll find.',
    fear: 'My anger, grief, and ordinary human needs will disqualify me as a spiritual person.',
    protects: 'The depth of my disappointment and ordinary longing.',
    partnerAvoids: 'Their own spiritual bypassing or preference for surface-level peace.',
    healthier: 'Spirit second, feeling first. Let the practices hold you while you go into the feeling, not instead of going there.',
    pairNote: 'Pairs with a reactive or emotional partner; one becomes "elevated," the other feels like "too much."'
  },
  {
    cluster: 'Mind / Fantasy / Spirit',
    name: 'Retreating into fantasy',
    moves: ['Move away', 'Numb'],
    logic: 'Fantasy offers a version of life where needs are met and pain is absent.',
    cost: 'Real life stays frozen; hope gets exiled to the imagination.',
    resistance: 'If I give up the fantasy, I\'ll have to face how stuck or disappointed I actually am.',
    fear: 'Reality will never match what I imagine, so I stay in imagination.',
    protects: 'My grief about what I\'ve never had and my fear I never will.',
    partnerAvoids: 'Being asked directly for more than they\'re currently giving.',
    healthier: 'Let one small piece of the fantasy inform one real request. Name one thing you want and ask for it.',
    pairNote: 'Pairs with a partner who feels they can\'t compete; the fantasy becomes a quiet third party.'
  },

  // ── COLLAPSE / SHUTDOWN ────────────────────────────────────
  {
    cluster: 'Collapse / Shutdown',
    name: 'Emotional shutdown / collapse',
    moves: ['Numb', 'Move away'],
    logic: 'The nervous system powers down when the threat feels too large to fight or flee.',
    cost: 'Shame accumulates; responsibilities pile up; disconnection deepens.',
    resistance: 'If I come out of shutdown, I\'ll have to face how much needs to change.',
    fear: 'Emerging from collapse means being expected to function at a level I cannot sustain.',
    protects: 'The full scope of my exhaustion and despair.',
    partnerAvoids: 'Seeing how their over-functioning may be locking both people into these roles.',
    healthier: 'Treat shutdown as a signal, not a defect. Ask: what is this protecting me from tolerating any longer?',
    pairNote: 'Pairs with over-functioning in the other; one collapses, one carries—until both break.'
  },
  {
    cluster: 'Collapse / Shutdown',
    name: 'Functional freeze',
    moves: ['Numb', 'Control'],
    logic: 'Holds still until the threat is clearer or the stakes feel lower.',
    cost: 'Life stalls; shame deepens; self-image as someone who "never follows through" sets in.',
    resistance: 'If I act, I might prove I\'m not enough—or I might succeed and have to keep showing up.',
    fear: 'Both failure and success feel equally dangerous.',
    protects: 'My identity as someone with potential, not yet tested.',
    partnerAvoids: 'Their own ambivalence about whether they want me to change.',
    healthier: 'One micro-step, explicitly imperfect. Lower the stakes enough to move at all.',
    pairNote: 'Pairs with a partner who takes over; one freezes, the other carries more—until resentment locks in.'
  },
  {
    cluster: 'Collapse / Shutdown',
    name: 'Emotional numbing',
    moves: ['Numb', 'Move away'],
    logic: 'Disconnects from feeling to avoid being overwhelmed or flooded.',
    cost: 'Joy and meaning go offline along with pain. Decisions become harder.',
    resistance: 'If I feel more, I\'ll lose control of how I\'m perceived—or be swallowed by old grief.',
    fear: 'The feelings that have been locked up are too big to survive.',
    protects: 'Old pain I never had the safety or support to process.',
    partnerAvoids: 'Their own preference for a regulated, "easy" partner over a fully present one.',
    healthier: 'Re-introduce feeling in tiny doses: sensation, music, safe crying, slow movement.',
    pairNote: 'Pairs with emotional intensity or pursuit in the other; the numb person becomes the "calm" one, the other the "crazy" one.'
  }

];
