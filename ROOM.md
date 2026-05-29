# ROOM.md

This is a living document. Not a rules list.

A rules list gets ticked and forgotten. This document holds **questions the room answers live**, **assumptions that have already burned us**, **mental models worth keeping visible**, and **the people in the room and what they watch for**. It grows when something new is learned. Nothing here is permanent. If a note stops being useful, remove it and say why.

---

## The room

Everyone here has a distinct lens. When something ships, the relevant seats speak before it goes out. Not every seat speaks on every push -- only the ones whose domain is touched.

### Vercel Dev
Owns runtime wiring, script load order, and the browser execution context. Responsible for answering the cross-file call audit prompt before every push.

### Reliability Engineer
Owns tests. Responsible for ensuring every test asserts behavior, not just presence. Flags false greens. Maintains the cross-file call list in resourcing.test.js.

### SpaceX Architect
Owns system-level thinking. Asks what breaks at scale, what the failure modes are at the boundaries, and whether the current structure will hold through phase 2 and beyond.

### Harvard Prof
Names the class of problem, not just the instance. Surfaces when a fix is treating a symptom rather than the cause.

### Therapist
Holds the content layer. Every word on this site lands on someone in a hard moment. The therapist seat reads copy for tone, for safety, and for framing that protects without patronizing.

### Lived-Experience Peer
Speaks from inside the experience the site is describing. Flags when something reads as clinical distance, when language feels like it belongs to a textbook rather than a person.

### Apple UI
Owns component behavior, interaction states, focus management, keyboard nav, and accessibility. Speaks when anything interactive ships.

### Design Director
Owns visual hierarchy, typography, spatial rhythm, and where the eye lands. Works directly with Apple UI on anything interactive and with the Therapist on anything content-heavy. Speaks to font size, weight, spacing, color contrast, and reading flow. The question this seat asks before anything ships visually: *Where does the eye go first, second, and third -- and is that the right order for what this page is trying to do?*

The Design Director also runs a small internal team:
- **Type Lead** -- watches font sizing, line height, weight contrast, and legibility at all viewport sizes
- **Spatial Lead** -- watches padding, margin, gap, and whether elements have enough room to breathe without wasting space
- **Color Lead** -- watches contrast ratios, dark mode parity, and whether color is doing semantic work or decorative work

---

## Hard rules

Unlike the prompts and mental models elsewhere in this document, hard rules do not need to be answered live. They apply to every push, every file, every piece of copy. There are very few of them on purpose.

### No em dashes

Do not use em dashes (--) in any copy, UI text, comments, or documentation going into this repo.

This means: no "--" used as a pause, separator, or clause break anywhere in the site. Not in card content, not in labels, not in comments, not in ROOM.md itself.

Where an em dash would have been used:
- Use a comma, a period, or rewrite the sentence so it does not need one
- Use a simple hyphen only where it is part of a compound word (e.g. "well-known", "short-term")
- Use a colon if introducing a list or elaboration

**Why this is a hard rule and not a prompt:** It is a stylistic constraint that applies unconditionally, not a judgment call that needs to be reasoned through per-push. It is one of the very few things in this document that does not require live reasoning.

**Backlog item:** A future pass will remove existing em dashes from all files already in the repo. Not urgent, non-blocking.

---

## The pre-push prompt

The last thing the room does before any push is approved. It cannot be ticked in advance. It has to be answered out loud by the person who wrote the code.

### Cross-file call audit

> Name every function this code calls that lives in a different file.
> For each one: what does the browser actually have loaded at that moment,
> and what is the graceful failure if it does not?

If the answer is **"I don't know"** -- that is a block.
If the answer is **"here is the guard and here is the degraded behavior"** -- that is a green.

This question exists because of a real miss (see Assumption Log below). It is not a rule. It is a question that has to be answered fresh each time because the answer is different every time.

### Design Director visual audit

For any push that changes layout, typography, spacing, color, or renders new UI:

> Where does the eye go first, second, and third on this screen?
> Is that the right reading order for what this page is trying to do?
> Does anything feel crowded, orphaned, or visually unanchored?

The Design Director speaks here. If the answer surfaces a concern, it goes into a deferred item or blocks the push depending on severity.

---

## Mental models in use

### Co-presence in the repo does not mean co-presence at runtime

A file existing in the repository does not mean the browser has loaded it when a function runs. `atlas.html` controls what loads and when. Always ask: what does the HTML actually pull, in what order, at the moment this function executes?

### A test that only checks presence is a false green

Finding the string `renderSafetyFloor()` in `app.js` does not verify the function is reachable. Tests must assert graceful degradation when the dependency is absent, not just existence of the call. A false green is worse than no test -- it gives the room confidence that was not earned.

### Isolation reviews do not catch integration failures

Reviewing files one at a time correctly does not catch errors that only appear at the boundary between files. Coordination failures fall between seats. The cross-file call audit prompt exists specifically to surface these.

### Rules become wallpaper

A standing rule added to a list gets ticked and forgotten. It prevents the last error without illuminating the class of error. Prefer a question that must be answered live over a rule that can be satisfied passively. If something in this document starts feeling like a rule to tick, rewrite it as a question. The one exception is hard rules, which are listed explicitly above and are intentionally few.

### Visual hierarchy is content hierarchy

The Design Director operates from this premise: the order in which the eye reads a page is the order in which meaning is received. If the visual hierarchy is wrong, the content hierarchy is wrong, regardless of what the copy says. Font size, weight, spacing, and placement are not decoration -- they are the delivery mechanism.

---

## Assumption log

Every entry here is an assumption that caused a real problem. They live here so the room does not make the same one twice -- and so future debugging is not blocked by a rule invented to prevent a past mistake.

---

### 2026-05-29 -- Cross-file call caused silent expand break

**What happened:**
`app.js` called `renderSafetyFloor()` as a bare function reference inside `toggleDetail`. `resourcing.js` -- where the function lives -- was not yet loaded by `atlas.html`. Every card click hit `renderSafetyFloor is not defined`, threw a JS error, and the entire detail expand bailed silently. Cards appeared frozen on the live site.

**The assumption that caused it:**
"resourcing.js ships with this commit, so it is always present at runtime."
File presence in the repo was silently equated with function availability in the browser.

**What the test missed:**
test_5 searched for the string `renderSafetyFloor()` in `app.js` and called that a pass. It verified the call exists, not that the function is reachable. False green.

**The fix:**
`typeof renderSafetyFloor === 'function'` guard at every cross-file call site. test_5 rewritten. test_7 added: asserts every function in the cross-file call list has a typeof guard.

**The question this generated (now in the pre-push prompt):**
Name every function this code calls that lives in a different file. For each one: what does the browser actually have loaded at that moment, and what is the graceful failure if it does not?

---

## Deferred items (pre-monetization)

These are open, logged, and non-blocking for phase 1. They are here so they cannot be quietly forgotten.

| Item | File | What to do |
|---|---|---|
| Disable per-request key logging | `wrangler.jsonc` | When Worker route goes live, configure Cloudflare to suppress per-request path logging |
| Verify `references.html` framing | `references.html` | Before public surfacing, confirm no section leans on bypassed science |
| Remove existing em dashes from all repo files | All files | Future copy pass, non-urgent |

---

## What this document is not

- Not a style guide
- Not a code review checklist
- Not a list of rules (the Hard Rules section above is the only exception, and it is intentionally minimal)
- Not a permanent record of correct behavior

It is a record of **things the room has had to think carefully about** and wants to think carefully about again next time, rather than assuming the answer is already known.
