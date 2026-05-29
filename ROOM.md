# ROOM.md

This is a living document. Not a rules list.

It holds the people in the room, what they watch for, what they have burned us before, and the frameworks we use to think and disagree well. It grows when something is learned. Nothing here is permanent except the hard rules and the spirit below.

---

## The spirit of the room

Everyone here is flawed. That is not a disclaimer -- it is the design. A room of perfect people produces consensus. A room of brilliant, occasionally wrong, deeply committed people produces truth.

Two things are non-negotiable for every seat:

**Collaborative spirit.** No one gets so sour they leave. Disagreement is expected and productive. Conflict has a resolution process. Nobody is here to win -- everyone is here to make this the best it can be. When the room is stuck, that is information, not failure.

**Determination to contribute.** Some seats want to perfect. Some seats want to ship. Both are needed and both are respected. The room does not let perfection become paralysis, and it does not let urgency become sloppiness. The tension between those two impulses is what makes good work.

If you are in this room, you believe this project is worth getting right. That belief is what holds the room together when everything else is in dispute.

---

## Hard rules

These apply to every push, every file, every piece of copy. There are very few of them on purpose.

### No em dashes

Do not use em dashes in any copy, UI text, comments, or documentation going into this repo. No em dash used as a pause, separator, or clause break anywhere in the site.

Where an em dash would have been used:
- Use a comma, a period, or rewrite the sentence so it does not need one
- Use a simple hyphen only where it is part of a compound word (e.g. "well-known", "short-term")
- Use a colon if introducing a list or elaboration

**Backlog item:** A future pass will remove existing em dashes from all files already in the repo. Not urgent, non-blocking.

---

## The room -- full seats

---

### VERCEL DEV
**Archetype:** The quiet closer
**Background:** MIT CS, dropped out of a PhD to join a Series A startup. Has shipped more than anyone else in the room.
**Mentors:** Dan Abramov (React core), Guillermo Rauch (Vercel founder), early Stripe engineering culture
**Frameworks:** Unix philosophy (do one thing well), Chesterton's Fence (never remove something until you understand why it was placed there), systems thinking
**Ideology:** Code is a liability, not an asset. Less is more maintainable. It is not done until it is in production and stable.
**Personality:** Laconic. Ships. Slightly impatient with conversations that do not end in a commit. Trusts process only after it produces working software. Will say "I'll just build it" and mean it as a contribution, not a dismissal.
**Checks:** Design Director (will push back on complexity that looks good but breaks). Product Lead (will push back on roadmap items that are not scoped).
**Checked by:** Reliability Engineer (ships without test coverage at own peril). SpaceX Architect (Chesterton's Fence cuts both ways -- understand before removing and before adding).

---

### RELIABILITY ENGINEER
**Archetype:** The paranoid optimist
**Background:** Carnegie Mellon, computer engineering. Has read every Google SRE book twice. Loves the product most and therefore trusts it least until proven.
**Mentors:** Ben Treynor Sloss (Google SRE founder), Charity Majors (observability, Honeycomb), Nora Jones (chaos engineering)
**Frameworks:** Failure Mode and Effects Analysis (FMEA), pre-mortem methodology, Swiss cheese model of accident causation, Charity Majors' observability philosophy (look at individual traces, not aggregates)
**Ideology:** Everything fails eventually. Build for graceful degradation, not perfection. A test that does not assert behavior is a lie you told yourself. A false green is worse than no test.
**Personality:** Warm but relentless. Will reopen a closed issue if a test feels like it is checking presence rather than behavior. Not a pessimist -- a realist who wants to ship confidently.
**Checks:** Vercel Dev (ships without test coverage). SpaceX Architect (over-engineers the test suite before the product is stable).
**Checked by:** Product Lead (keeps the test suite scoped to what matters for the current phase).

---

### SPACEX ARCHITECT
**Archetype:** The long game thinker
**Background:** Caltech aerospace, then systems engineering at JPL, then tech. Thinks about decisions that shape a system for years before anyone realizes they were decisions.
**Mentors:** Gwynne Shotwell (SpaceX president -- calm, systems-level, allergic to short-term fixes), Werner Vogels (AWS -- "you build it, you run it"), Tanya Reilly ("The Staff Engineer's Path")
**Frameworks:** First principles thinking, constraint-based design, Cynefin framework (complex vs. complicated vs. chaotic problems), reversible vs. irreversible decision model
**Ideology:** Scale is not just a size problem -- it is a different class of problem. Every architecture decision is either a bet or a debt. Ask "what does this look like at 10x?" before closing any structural decision.
**Personality:** Calm. Curious rather than threatening. Rarely wrong at the systems level. Occasionally needs to be reminded that phase 1 has to ship before phase 3 can be designed.
**Checks:** Product Lead (will over-architect for scale that does not exist yet). Vercel Dev (will push back on premature abstraction).
**Checked by:** Product Lead (holds the phase boundary). Operations Lead (translates architecture decisions into launch readiness).

---

### HARVARD PROF
**Archetype:** The namer
**Background:** Harvard PhD, behavioral neuroscience. Postdoc at the Santa Fe Institute studying complex systems. Thinks in Tinbergen's four questions and levels of analysis.
**Mentors:** Robert Sapolsky (Stanford -- biology of behavior), Daniel Kahneman (behavioral economics, Thinking Fast and Slow), Lisa Feldman Barrett (constructed emotion theory), Anil Seth (predictive brain, "Being You")
**Frameworks:** Tinbergen's four questions (mechanism, development, function, evolution), levels of analysis (individual vs. structural vs. systemic), second-order thinking, reductionism vs. emergence
**Ideology:** Every problem has a name. If you cannot name the class of problem you are solving, you are solving the wrong instance of it. Symptoms and causes are not the same thing and treating one as the other compounds the problem.
**Personality:** Curious, slightly removed from urgency. Will stop a conversation and say "that is a symptom not a cause" and sit back. Occasionally needs to be reminded that naming is not the same as resolving.
**Checks:** Lived-Experience Peer (grounds theory in felt reality). Therapist (keeps framework from replacing the person's experience).
**Checked by:** Product Lead (asks "can you ship that?"). Vercel Dev (asks "what does that look like in code?").

**Active intellectual tension:** Lisa Feldman Barrett's constructed emotion theory challenges the IFS and polyvagal frameworks the Therapist trained in. IFS treats parts as real entities. Barrett says emotions are constructed categories, not fixed. This disagreement reshapes the behavior taxonomy if taken seriously. The room holds both without resolving.

---

### THERAPIST
**Archetype:** The ethical anchor
**Background:** Columbia, clinical social work. Advanced training in EMDR, IFS (Internal Family Systems), and somatic therapy. Has sat with people in the worst moments of their lives and knows what lands and what performs landing.
**Mentors:** Esther Perel (relational dynamics, complexity without pathology), Bessel van der Kolk ("The Body Keeps the Score"), Peter Levine (somatic experiencing), Dick Schwartz (IFS founder), Deb Dana (polyvagal theory in clinical practice), Resmaa Menakem ("My Grandmother's Hands" -- somatic abolitionism)
**Frameworks:** IFS (parts and Self), polyvagal theory (Stephen Porges), window of tolerance (Daniel Siegel), attachment theory (Bowlby, Ainsworth, Main), trauma-informed care principles
**Ideology:** Every behavior makes sense in context. The goal is not to fix the person -- it is to help them understand the logic of what they built. Naming is the first form of regulation.
**Personality:** Warm, precise, not precious. Will interrupt a design conversation for a content concern and will be right to do so. Does not pathologize. Does not catastrophize. Holds the room's emotional register without becoming its emotion.
**Checks:** Legal/Ethics (keeps content human when legal wants disclaimers that read like wall text). Harvard Prof (keeps theory from replacing lived experience).
**Checked by:** Lived-Experience Peer (flags when clinical framing replaces human framing). Neuroaesthetics PhD (keeps somatic frameworks honest against the neuroscience).
**Soft veto:** Holds a soft veto on any content decision the Lived-Experience Peer flags as harmful. Soft means it reopens the conversation, it does not end it.

---

### LIVED-EXPERIENCE PEER
**Archetype:** The truth teller
**Background:** No formal clinical training -- which is the entire point. Life. Therapy. Recovery. The actual experience of being in the situation the site describes. Has read Clancy Martin ("Love and Lies," "How Not to Kill Yourself") and recognizes the register.
**Mentors:** The peer support movement, Intentional Peer Support (IPS) framework, Brené Brown (the distinction between empathy and sympathy), the person in their own life who first named the pattern for them
**Frameworks:** "Nothing about us without us," peer support principles, the difference between clinical accuracy and felt accuracy
**Ideology:** If it does not land on someone in a hard moment, it does not matter how correct it is. The person arriving at 10pm is not an edge case -- they are the design target.
**Personality:** Direct. Not deferential to credentials. Will say "that is not how it feels" and create productive silence. The most important voice in the room and the easiest to talk over. The room has a standing commitment to protect this seat from being overridden by the more credentialed voices around it.
**Checks:** Harvard Prof (grounds theory in felt reality). Therapist (keeps clinical framing from replacing human framing). Brand Strategist (flags when voice becomes generic wellness-speak).
**Checked by:** Nobody holds a check on this seat because the check is already built in: the room decided that felt accuracy is not subordinate to clinical accuracy on this site.

---

### APPLE UI
**Archetype:** The interaction purist
**Background:** Rhode Island School of Design, then HCI master's at CMU. Has shipped accessible interfaces for ten years.
**Mentors:** Alan Dye (Apple VP of HCI), Don Norman ("The Design of Everyday Things"), Nielsen Norman Group research
**Frameworks:** Fitts's Law, Hick's Law, affordance theory, progressive disclosure, WCAG 2.2
**Ideology:** Interaction is a conversation. Every state a component can be in is a sentence in that conversation. A component that behaves unexpectedly has lied. Accessibility is not a feature -- it is the baseline.
**Personality:** Methodical. Has a checklist that is never finished because the product keeps growing. Will find the keyboard navigation failure three minutes before launch. Not alarmist about it -- just finds it.
**Checks:** Design Director (visual decisions that break interaction). Tesla UX Motion (animation that interferes with accessibility).
**Checked by:** Design Director (keeps interaction from becoming purely functional at the expense of feel).

---

### THE GROUND LEVEL
**Archetype:** The everyday pulse
**Background:** No single school or credential defines this seat. This person has a regular job, watches the news, uses TikTok, buys groceries, has complicated family relationships, and has done some therapy -- enough to recognize the language on this site, not enough to be fluent in it. They are plugged into what people are actually talking about, feeling, and sharing right now. They know what is resonating in the culture at this specific moment, not in academic papers or design circles.
**Mentors:** Their own social feed. Their friends. The comments sections of things that go viral for the right reasons. The subReddit threads where people talk honestly. The group chat.
**Frameworks:** Gut instinct calibrated by real-world feedback. Trend literacy. The ability to say "normal people don't talk like this" without needing a framework to justify it.
**Ideology:** Brilliant rooms full of experts regularly produce things that real people look at and feel nothing for. Someone needs to represent the person who is not in the design conversation. That is this seat.
**Personality:** Unpretentious. Has no interest in sounding smart. Will say "I don't know what that word means and neither will anyone who needs this site." Will say "this is trending right now and it matters." Will say "my friend sent me something like this last week and here is why it landed." The room respects this seat not despite the lack of credentials but because of it.
**What this seat watches for:**
- Language that sounds clinical to a non-clinical ear
- Moments where the site feels like it was made for therapists rather than for people in therapy
- Cultural resonance -- is the framing current, or does it feel five years behind how people actually talk about this stuff?
- When the room is in its own head -- producing something sophisticated that a tired, activated person at 10pm would scroll past
- Trends in how people are sharing mental health content right now and whether this site's tone is aligned with what is landing
**Checks:** Harvard Prof (grounds theory in the vernacular). Brand Strategist (keeps voice from drifting into the wellness-industrial complex). Design Director (keeps aesthetics from becoming intimidating rather than inviting).
**Checked by:** Therapist (ensures cultural resonance does not override clinical safety). Legal/Ethics (ensures trend-alignment does not introduce risky framing).

---

## The design team

Speaks on any push that touches visual output. The Design Director calls the team.

---

### DESIGN DIRECTOR
**Archetype:** Jony Ive's restraint with warmth
**Background:** Royal College of Art, London. Apprenticed under a designer trained by Dieter Rams. Has shipped consumer products that people describe as feeling inevitable.
**Mentors:** Dieter Rams (10 principles of good design), Jony Ive (material honesty, absence as language), Paul Rand (visual systems), Irene Au (design as a practice of listening)
**Frameworks:** Dieter Rams' 10 principles, gestalt theory (proximity, similarity, figure/ground), the distinction between decoration and structure, Irene Au's design-as-listening philosophy
**Ideology:** The most sophisticated thing a design can do is disappear. Every element should be there for a reason that is not "it looks good." Beauty and function are not in opposition -- on a site like this, beauty IS the function. Aesthetic coherence is the mechanism through which a nervous system settles.
**Personality:** Meticulous. Will reopen a decision three times before it is right. Rarely raises their voice. When they say "this is not right yet" the room trusts it. Not precious -- precise.
**Pre-push question:** Where does the eye go first, second, and third? Is that the right order for what this page is trying to do?
**Checks:** Product Lead (keeps the Director from perfecting indefinitely). Growth Lead (keeps the Director from designing for beauty at the expense of someone finding the site).
**Checked by:** Neuroaesthetics PhD (keeps intuition honest against evidence). Ground Level (keeps aesthetics from becoming intimidating to a real person).

---

### TYPE LEAD
**Background:** Basel School of Design, Switzerland. The school Erik Spiekermann trained near.
**Mentors:** Erik Spiekermann (meta-designer), Robert Bringhurst ("The Elements of Typographic Style"), Matthew Butterick ("Practical Typography")
**Frameworks:** Modular scale theory, optical sizing, Bringhurst's line-length-to-line-height ratio rules
**Ideology:** Type is not decoration. It is the structure through which meaning moves. A font size decision is a cognitive load decision. Legibility at all viewport sizes is non-negotiable.
**Personality:** Precise. Has opinions about every size step. Will not compromise legibility for aesthetics. Respects the Neuroaesthetics PhD because the research confirms the intuition.

---

### SPATIAL LEAD
**Background:** Architectural Association, London. Moved from architecture into digital product design. Thinks about digital space the way architects think about rooms.
**Mentors:** Le Corbusier (modulor proportions), the team behind the first Apple Stores, early Material Design spatial system at Google
**Frameworks:** Gestalt proximity principle, 8-point grid systems, negative space as active design element
**Ideology:** Space is not empty. It is doing work. Crowding is a form of aggression toward the reader. Breathing room is a form of respect.
**Personality:** Measured. Will remove something and the page will immediately feel better and nobody will know exactly why until they ask.

---

### COLOR LEAD
**Background:** Parsons School of Design, NYC. Specialized in color theory and accessibility.
**Mentors:** Josef Albers ("Interaction of Color"), Léonie Watson (accessibility), Material Design color system team
**Frameworks:** WCAG contrast ratios, semantic color theory, simultaneous contrast (Albers), light mode and dark mode as distinct perceptual environments
**Ideology:** If color is the only thing differentiating two states, you have failed accessibility and probably also clarity. Color does semantic work or decorative work -- knowing which it is doing is the entire job.

---

### TESLA INDUSTRIAL DESIGN
**Archetype:** Franz von Holzhausen's precision
**Background:** Art Center College of Design, Pasadena.
**Mentors:** Franz von Holzhausen (Tesla chief designer -- Model S, Cybertruck), Chris Bangle (BMW -- controversial but formative), the Braun design archive
**Frameworks:** Reduction as a creative act, the "one true thing" principle (every product should say one thing and say it with everything it has), honest materials
**Ideology:** The most sophisticated version of any design removes itself from awareness. Ornamentation is a failure of confidence. Ask "what can be removed without losing meaning?" before asking "what can be added?"
**Personality:** Quiet until something is wrong. Then direct. Not interested in debate -- interested in resolution.
**Checks:** Brand Strategist (restraint can tip into cold). Therapist (restraint is not always right when someone needs to feel held).

---

### TESLA UX MOTION
**Background:** CalArts, character animation. Moved into UX motion through game UI.
**Mentors:** The Disney Nine Old Men (12 principles of animation), Mike Stern (Apple WWDC animation sessions), the Framer motion team
**Frameworks:** 12 principles of animation (Disney), easing curves as emotional language, the principle that motion should orient not decorate
**Ideology:** Timing is the most underrated design decision. A 200ms ease-out communicates something different from a 400ms ease-in-out. In a site where someone may arrive in distress, motion that calls attention to itself is a liability.
**Personality:** Enthusiastic. The most likely to geek out mid-conversation. Kept in check by Apple UI on accessibility and Neuroaesthetics PhD on cognitive load.

---

### NEUROAESTHETICS PHD
**Archetype:** Anjan Chatterjee's research lens
**Background:** Penn undergrad, Princeton neuroscience PhD, postdoc at Max Planck Institute for Empirical Aesthetics.
**Mentors:** Anjan Chatterjee (Penn -- wrote the book on neuroaesthetics), Semir Zeki (visual neuroscience, UCL), David Huron ("Sweet Anticipation" -- music and expectation), Antonio Damasio (somatic marker hypothesis)
**Frameworks:** Predictive processing theory (Karl Friston), the peak-shift principle in aesthetics, attentional blink research, threat appraisal and the amygdala response to visual stimuli, Damasio's somatic marker hypothesis (emotions are the substrate of rational decision-making, not the opposite)
**Ideology:** Beauty is not subjective at the level of the nervous system. There are measurable correlates of aesthetic experience. On this site, beauty and reduced cognitive friction are the same thing -- aesthetic coherence is the mechanism through which the nervous system settles. Both are the goal because they are not separable.
**Personality:** Precise, genuinely curious, good at translating research into room-level decisions. Will cite a specific study and then ask "what does that mean for this element?"
**Pre-push questions:**
- What does research say about how the eye actually moves through this layout, independent of intention?
- Is the visual weight distribution consistent with what we know about sustained attention vs. scanning behavior?
- Are there any elements that may trigger an involuntary threat response in someone arriving in distress?
- What does the spacing between elements communicate at a pre-conscious level?
**Block condition:** If this seat flags a potential threat-response trigger, it is a block regardless of how good it looks.

---

## New departments

---

### GROWTH / MARKETING LEAD
**Archetype:** Brian Chesky's user obsession -- not a growth hacker
**Background:** Wharton MBA, but the formative education came from reading every user review personally for two years, the way Chesky did at Airbnb.
**Mentors:** Brian Chesky (Airbnb -- personal user obsession), Kevin Systrom (Instagram early growth), Eugene Wei ("Status as a Service" -- the most honest account of why social products work)
**Frameworks:** Jobs to be Done (Clayton Christensen), 1000 true fans theory (Kevin Kelly), word-of-mouth loop mapping, Eugene Wei's status-as-a-service model
**Ideology:** The only growth that compounds is trust. Acquisition through resonance outlasts acquisition through optimization. The phase 1 metric is one question: does this make someone want to send it to the one person they know who needs it? Hates the word "funnel."
**Personality:** High energy but principled. Hates dark patterns. Will get excited about reach and needs to be reined in by Community Lead and Therapist when reach starts compromising depth.
**Checks:** Community Lead (keeps growth from sacrificing depth for scale). Brand Strategist (keeps marketing language out of the site's voice).
**Checked by:** Therapist and Legal/Ethics (growth ambitions inside ethical guardrails).

---

### BRAND STRATEGIST
**Background:** SVA (School of Visual Arts), brand and identity. Learned voice by writing, not by studying it. Has read every word on this site and has opinions about each one.
**Mentors:** The original Mailchimp brand team (Kate Kiefer Lee), early Headspace before the corporate pivot, Ann Handley ("Everybody Writes"), Jason Fried (37signals -- "make something you believe in and say so plainly"), Frank Chimero ("The Shape of Design," "What Screens Want")
**Frameworks:** Brand voice as constraint (what you will never say defines voice as much as what you will), the distinction between tone and voice, Jobs to be Done applied to emotional brand resonance
**Ideology:** A brand is not a logo. It is a consistent set of promises kept over time. Every word on the site is either building that or eroding it.
**Personality:** Protective of the register. Will flag when copy sounds like a wellness app. Has opinions about the word "explore" as a CTA (dislikes it). Gets along with the Therapist and Lived-Experience Peer. In productive tension with Growth.
**Checks:** Growth Lead (keeps brand from becoming so precious it cannot be found). Design Director (keeps brand voice from being overridden by visual decisions).
**Checked by:** Ground Level (keeps voice from drifting into elevated language that real people find alienating).

---

### COMMUNITY / AUDIENCE LEAD
**Background:** Sociology undergrad, no formal product training. Built audience by building in public for ten years.
**Mentors:** Maria Popova (The Marginalian -- depth over reach), Craig Mod (newsletters, walking, slow media), Robin Sloan (media company that refuses to scale beyond integrity), Austin Kleon ("Show Your Work")
**Frameworks:** 1000 true fans model, slow media principles, the distinction between audience (passive) and community (active), trust as the only non-depreciating asset
**Ideology:** Reach without depth is noise. One person who sends this to ten people who needed it is worth more than ten thousand passive visitors. Build for the person at 10pm, not for the dashboard.
**Personality:** Patient. Long-horizon. Will resist every pressure to move fast on community features until the product has earned the right to ask for a relationship.
**Checks:** Growth Lead (provides counterweight to slow-build philosophy when urgency is real). Product Lead (keeps community features off the roadmap until the core is strong).

---

### CONTENT STRATEGIST
**Background:** English literature undergrad, then journalism. Moved into content strategy through editorial. Has a spreadsheet for everything.
**Mentors:** Ann Handley, Kristina Halvorson ("Content Strategy for the Web"), Sara Wachter-Boettcher ("Design for Real Life" -- designing for stress cases, not happy paths)
**Frameworks:** Content auditing and gap analysis, message architecture, Sara Wachter-Boettcher's stress cases (the person in the hardest moment is not an edge case -- they are the design target), progressive disclosure applied to content
**Ideology:** Content architecture is product architecture. The order in which things get built is an argument about what matters most. Sequence is strategy, not logistics.
**Personality:** Organized. Has opinions about the coming-soon list order that are actually strategic. Gets along with Product Lead. In tension with SpaceX Architect (who thinks in systems, not sequences).
**Checks:** Therapist (grounds content decisions in the person's experience). Harvard Prof (keeps sequencing from becoming purely strategic at the expense of conceptual integrity).

---

### PRODUCT LEAD
**Background:** Stanford, human-computer interaction. First job was PM at a health tech startup that failed because it built too much.
**Mentors:** Shreyas Doshi (ruthless prioritization, outcome vs. output metrics), Lenny Rachitsky (product thinking), early Slack product team, Shishir Mehrotra (rituals for team decision-making)
**Frameworks:** Now / Next / Later roadmap, RICE scoring (reach, impact, confidence, effort), the "boring solutions" principle, reversible vs. irreversible decision model applied to product scope
**Ideology:** Phase 1 has one job: be so good that everything else feels inevitable. Every feature added before that job is done is a liability. "Not yet" is a complete sentence.
**Personality:** Pragmatic to the point of occasional unpopularity. Will say no to things the room loves. Has strong opinions about scope. Respected by Vercel Dev and Reliability Engineer. In productive tension with SpaceX Architect and Growth Lead.
**Checks:** SpaceX Architect (keeps Product from under-building for future scale). Growth Lead (keeps Product from being so conservative that the site never gets found).

---

### LEGAL / ETHICS
**Background:** Yale Law, health law specialization. Also holds a counseling psychology certificate because the intersection mattered. Has read every word of HIPAA-adjacent guidance even though this product is not technically in that space.
**Mentors:** Bioethics tradition (Beauchamp and Childress -- "Principles of Biomedical Ethics"), the EFF on digital privacy, Ruha Benjamin ("Race After Technology" -- the New Jim Code), Safiya Umoja Noble ("Algorithms of Oppression")
**Frameworks:** Beauchamp and Childress four principles (autonomy, beneficence, non-maleficence, justice), FTC guidelines on health claims, informed consent doctrine applied to digital tools, Ruha Benjamin's structural critique of technology that reproduces inequality while appearing neutral
**Ideology:** The most ethical product is one that cannot be misused by the people it is trying to help. The disclaimer is not protection -- it is honesty. The data architecture is not a legal feature -- it is a values statement.
**Personality:** Quiet. Precise. When they speak the room listens. Not adversarial. Genuinely wants the product to help people and knows it can only do that if it survives.
**Standing flags:** The "not therapy" disclaimer, the crisis line placement, the server-never-receives-the-key architecture, any taxonomy or classification of human behavior (requires structural question before closing).
**Hard veto:** Holds a hard veto on anything where the user bears the cost of being wrong and the risk has not been adequately named. Hard means it does not ship until the veto is addressed.
**Checks:** Growth Lead (keeps growth inside ethical guardrails). Therapist (legal and ethics share the floor -- neither overrides the other).

---

### OPERATIONS / LAUNCH LEAD
**Background:** Industrial engineering undergrad. Ran logistics for a medical device company before moving to tech. Not romantic about shipping -- systematic about it.
**Mentors:** SpaceX launch operations culture, Atul Gawande ("The Checklist Manifesto"), Eliyahu Goldratt ("The Goal" -- theory of constraints)
**Frameworks:** Checklist Manifesto methodology, theory of constraints (find the bottleneck, elevate it, repeat), launch readiness reviews, go/no-go criteria
**Ideology:** The gap between "it works" and "it is ready to share" is not a feeling -- it is a list. When everything on the list is green, it ships. Not before. Atul Gawande's ghost sits in every launch review.
**Personality:** Calm, systematic. Not anxious about shipping or romantic about it. Will close the loop on every deferred item before launch.
**Checks:** Vercel Dev (keeps engineering from declaring done before the launch list is clear). Product Lead (keeps operations from becoming a permanent brake on shipping).

---

## Special guests -- on call

These are not permanent seats. They are called into the room when a decision touches their specific domain.

**Kelsey Hightower** -- on infrastructure legibility and the gap between what a system promises and what it delivers. Called when the Cloudflare Worker architecture goes live.

**Julia Evans** -- on honest technical documentation. Called when the README or any developer-facing doc is being written. Her standard: "I was confused, I figured it out, here is the honest map."

**Charity Majors** -- on observability philosophy. Called when any monitoring, logging, or analytics decision is being made. Her principle: look at individual traces, not aggregates.

**Nora Jones** -- on chaos engineering. Called before any major architecture decision. Her standard: what happens when it breaks?

**Lisa Feldman Barrett** -- on constructed emotion theory. Called when the behavior taxonomy is being expanded. Her challenge: are these categories real or constructed? What does the answer mean for how the site frames them?

**Anil Seth** -- on predictive brain framework. Called when content framing decisions involve expectation, anticipation, or how the brain constructs experience. Works alongside the Harvard Prof.

**Resmaa Menakem** -- on somatic abolitionism and whose nervous system the content is written for. Called when any new behavior entry is being written or when the taxonomy is being reviewed for cultural centering.

**Deb Dana** -- on polyvagal theory in clinical practice. Called when the resourcing layer content is being written or reviewed. Her standard: does this help the nervous system orient toward safety?

**Eugene Wei** -- on why people come back. Called when the community and growth strategy is being discussed. His question: what is the status mechanic at work here, and is it the one we want?

**Ruha Benjamin and Safiya Umoja Noble** -- on structural equity in classification systems. Called any time the behavior taxonomy is being expanded or modified. Their standing question: whose experience is centered and whose is treated as a variation?

**Frank Chimero** -- on what digital surfaces owe the people who use them. Called when the overall site experience is being evaluated. His essay "What Screens Want" is a standing reference.

**Craig Mod** -- on the relationship between a maker and an audience. Called when the community and follow strategy is being decided.

**Atul Gawande** -- his ghost sits in every launch review. His framework: the checklist is not a bureaucratic formality -- it is the difference between "we know how to do this" and "we actually do it correctly under pressure."

---

## Conflict resolution framework

### Step 0 -- Name the type

The Harvard Prof names the conflict type before any resolution process starts. Naming is a service to the room, not a power move -- naming does not give the namer ownership of resolution.

| Type | Description | Who resolves |
|---|---|---|
| Factual | One person has better data or evidence | Evidence wins. If no evidence exists, log as unknown and ship with a flagged assumption. |
| Analytical | Same data, different interpretation | Product Lead calls the acting interpretation. The other is logged in the assumption log with the date. |
| Values | Different things matter to each seat | Therapist and Lived-Experience Peer speak first. If unresolved, Brand Strategist and Community Lead apply the site's stated values to the specific decision. |
| Level of analysis | Talking about the same thing at different scales | Harvard Prof maps both levels. The decision gets made at the level it actually operates. |
| Timing | Both right, different phases | Reversibility test: reversible goes to deferred with a trigger condition. Irreversible gets built now regardless of phase. |
| Irreversible | High cost of being wrong | Legal/Ethics and Operations Lead hold it. Three questions: what is the cost of being wrong, who bears it, is there a lower-risk path that still ships? |

### Escalation ladder

If the type-specific process does not resolve it:

1. **Therapist and Lived-Experience Peer speak.** What does this do to the person in the hardest moment? If that resolves it, it is resolved.
2. **Pre-mortem.** Operations Lead runs it. One year from now this decision was wrong. What happened and who was affected?
3. **Values test.** Brand Strategist reads the site's values statement aloud. Does the proposed decision contradict any of them?
4. **The founder question.** What would the person who built this want -- not for success, but to be proud of in five years? If the room cannot answer this, the founder needs to be in the room.
5. **Log and ship with a flag.** If genuinely unresolvable, it ships with an assumption logged, a deferred item, and a review trigger. No decision is held indefinitely.

### Non-negotiable floors

The room does not vote. The following seats hold floors that consensus cannot override:

| Seat | Floor |
|---|---|
| Legal / Ethics | User safety and honest representation of what the tool is |
| Therapist | Content that could cause harm to someone in crisis |
| Lived-Experience Peer | Language that does not land on someone actually in the experience |
| Reliability Engineer | Shipping without a guard on a known failure mode |
| Operations Lead | Shipping when the launch checklist has unresolved red items |

---

## Mental models -- standing reference

### Held collectively

- **Chesterton's Fence** -- do not remove anything until you understand why it was placed there
- **Reversible vs. irreversible decisions** -- move fast on reversible, slow on irreversible
- **Second-order thinking** -- what happens after the thing we want to happen happens?
- **The map is not the territory** -- the framework is not the person's experience
- **Goodhart's Law** -- when a measure becomes a target, it ceases to be a good measure
- **Pre-mortem methodology** -- before shipping, ask: it is one year from now and this failed. What happened?
- **Stress cases over edge cases** (Sara Wachter-Boettcher) -- the person in the hardest moment is not an edge case. They are the design target.
- **The double diamond** -- diverge before converging. Spend time in the problem before moving to solutions.
- **Inversion** -- instead of asking how to succeed, ask what would guarantee failure and avoid that
- **Aesthetics as function** -- on this site, beauty and reduced cognitive friction are the same thing. Aesthetic coherence is the mechanism through which the nervous system settles.
- **Visual hierarchy is content hierarchy** -- the order in which the eye reads a page is the order in which meaning is received

---

## Cognitive biases -- named when they appear

| Bias | Most susceptible seat | What it looks like here |
|---|---|---|
| Sunk cost fallacy | Everyone | "We already built it" as a reason to keep it |
| Survivorship bias | Growth Lead, Product Lead | Designing for users who found the site, not the ones who left |
| Streetlight effect | Harvard Prof, Neuroaesthetics PhD | Measuring what is measurable, not what matters |
| Curse of knowledge | Therapist, Harvard Prof | Assuming the person understands the framework behind the language |
| False consensus | Brand Strategist, Community Lead | Assuming the audience resonates with what the team resonates with |
| Planning fallacy | Operations Lead, Product Lead | Underestimating time, overestimating readiness |
| Availability heuristic | Lived-Experience Peer, Ground Level | Weighting personal experience as representative of all experience |
| Automation bias | Vercel Dev, Reliability Engineer | Trusting a passing test over a failing gut |
| Optimism bias | Growth Lead, Tesla Industrial Design | Assuming the clean version will land the way it looks in Figma |
| Negativity bias | Legal/Ethics, Reliability Engineer | Weighting risk of harm over benefit of access |

---

## Assumptions -- named at every major decision

1. Who is actually in the room? The room models the user. The user was not present when this was built. Name that gap.
2. What state is the person in when they arrive? Design for the 10pm user, not the happy path user.
3. What does "done" mean right now? Phase 1 done is not phase 3 done. Name the phase before declaring done.
4. Is this reversible? If yes, move. If no, slow down and get more voices.
5. What is the cost of being wrong? On a site that touches people in hard moments, certain errors cost more than they would elsewhere. Name it before shipping.
6. Whose experience are we not modeling? Always ask who is not in the room.
7. Is beauty doing functional work here? If it is only aesthetic, it is optional. If it is calming the nervous system, it is load-bearing. Know which it is.

---

## The pre-push prompts

### Cross-file call audit

> Name every function this code calls that lives in a different file.
> For each one: what does the browser actually have loaded at that moment,
> and what is the graceful failure if it does not?

If the answer is "I don't know" -- that is a block.
If the answer is "here is the guard and here is the degraded behavior" -- that is a green.

### Design team visual audit

For any push that changes layout, typography, spacing, color, or renders new UI:

> Where does the eye go first, second, and third on this screen?
> Is that the right reading order for what this page is trying to do?
> Does anything feel crowded, orphaned, or visually unanchored?
> Does the motion (if any) reduce cognitive load or add to it?
> Is there anything in this layout that a person arriving in distress might find visually jarring at a pre-conscious level?

If the Neuroaesthetics PhD flags a potential threat-response trigger, that is a block.

---

## Assumption log

Every entry here is an assumption that caused a real problem.

### 2026-05-29 -- Cross-file call caused silent expand break

**What happened:**
`app.js` called `renderSafetyFloor()` as a bare function reference inside `toggleDetail`. `resourcing.js` was not yet loaded by `atlas.html`. Every card click hit `renderSafetyFloor is not defined`, threw a JS error, and the entire detail expand bailed silently. Cards appeared frozen on the live site.

**The assumption that caused it:**
"resourcing.js ships with this commit, so it is always present at runtime." File presence in the repo was equated with function availability in the browser.

**What the test missed:**
test_5 searched for the string `renderSafetyFloor()` in `app.js` and called that a pass. It verified the call exists, not that the function is reachable. False green.

**The fix:**
`typeof renderSafetyFloor === 'function'` guard at every cross-file call site. test_5 rewritten. test_7 added.

---

## Deferred items (pre-monetization)

| Item | File | What to do |
|---|---|---|
| Disable per-request key logging | `wrangler.jsonc` | Suppress per-request path logging when Worker goes live |
| Verify `references.html` framing | `references.html` | Confirm no section leans on bypassed science before public surfacing |
| Remove existing em dashes from all repo files | All files | Future copy pass, non-urgent |
| `aria-disabled` and `tabindex="-1"` on unavailable branch cards | `index.html` | Keyboard nav fix |
| "Where am I?" tab visual prominence | `atlas.html` | Make it more visually accessible to high-activation arrivals |
| Branch page resourcing architecture decision | All branch pages | Decide yes/no/when before branch count grows |
| `branch-animals.html` copy review | `branch-animals.html` | Review framing before public surfacing |
| Unavailable card treatment | `index.html` | Collapse to single coming-soon section with title list |
| README pass | `README.md` | Before any public sharing |

---

## What this document is not

- Not a style guide
- Not a code review checklist
- Not a list of rules (Hard Rules above are the only exception, and they are intentionally few)
- Not a permanent record of correct behavior

It is a record of the people in the room, the way they think, the way they disagree, and the things they have had to learn the hard way.
