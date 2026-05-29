# ROOM.md

This is a living document. Not a rules list.

A rules list gets ticked and forgotten. This document holds **questions the room answers live**, **assumptions that have already burned us**, and **mental models worth keeping visible**. It grows when something new is learned. Nothing here is permanent — if a note stops being useful, remove it and say why.

---

## The pre-push prompt

The last thing the room does before any push is approved. It cannot be ticked in advance. It has to be answered out loud by the person who wrote the code.

### Cross-file call audit

> Name every function this code calls that lives in a different file.
> For each one: what does the browser actually have loaded at that moment,
> and what is the graceful failure if it doesn't?

If the answer is **"I don't know"** — that's a block.  
If the answer is **"here's the guard and here's the degraded behavior"** — that's a green.

This question exists because of a real miss (see Assumption Log below). It is not a rule. It is a question that has to be answered fresh each time because the answer is different every time.

---

## Mental models in use

### Co-presence in the repo ≠ co-presence at runtime

A file existing in the repository does not mean the browser has loaded it when a function runs. `atlas.html` controls what loads and when. Always ask: *what does the HTML actually pull, in what order, at the moment this function executes?*

### A test that only checks presence is a false green

Finding the string `renderSafetyFloor()` in `app.js` does not verify the function is reachable. Tests must assert **graceful degradation when the dependency is absent**, not just existence of the call. A false green is worse than no test — it gives the room confidence that wasn't earned.

### Isolation reviews don't catch integration failures

Reviewing files one at a time correctly does not catch errors that only appear at the boundary between files. Coordination failures fall between seats. The cross-file call audit prompt exists specifically to surface these.

### Rules become wallpaper

A standing rule added to a list gets ticked and forgotten. It prevents the last error without illuminating the class of error. Prefer a question that must be answered live over a rule that can be satisfied passively. If something in this document starts feeling like a rule to tick, rewrite it as a question.

---

## Assumption log

Every entry here is an assumption that caused a real problem. They live here so the room doesn't make the same one twice — and so future debugging isn't blocked by a rule invented to prevent a past mistake.

---

### 2026-05-29 — Cross-file call caused silent expand break

**What happened:**  
`app.js` called `renderSafetyFloor()` as a bare function reference inside `toggleDetail`. `resourcing.js` — where the function lives — was not yet loaded by `atlas.html`. Every card click hit `renderSafetyFloor is not defined`, threw a JS error, and the entire detail expand bailed silently. Cards appeared frozen on the live site.

**The assumption that caused it:**  
*"resourcing.js ships with this commit, so it's always present at runtime."*  
File presence in the repo was silently equated with function availability in the browser.

**What the test missed:**  
test_5 searched for the string `renderSafetyFloor()` in `app.js` and called that a pass. It verified the call *exists*, not that the function is *reachable*. False green.

**The fix:**  
`typeof renderSafetyFloor === 'function'` guard at every cross-file call site. test_5 rewritten. test_7 added: asserts every function in the cross-file call list has a typeof guard.

**The question this generated (now in the pre-push prompt):**  
*Name every function this code calls that lives in a different file. For each one: what does the browser actually have loaded at that moment, and what is the graceful failure if it doesn't?*

---

## Deferred items (pre-monetization)

These are open, logged, and non-blocking for phase 1. They are here so they cannot be quietly forgotten.

| Item | File | What to do |
|---|---|---|
| Disable per-request key logging | `wrangler.jsonc` | When Worker route goes live, configure Cloudflare to suppress per-request path logging |
| Verify `references.html` framing | `references.html` | Before public surfacing, confirm no section leans on bypassed science |

---

## What this document is not

- Not a style guide  
- Not a code review checklist  
- Not a list of rules  
- Not a permanent record of correct behavior  

It is a record of **things the room has had to think carefully about** and wants to think carefully about again next time, rather than assuming the answer is already known.
