# Minimalist Design Mockup

_Started 2026-04-29 14:10 UTC_

---

## User

Address these comments from my teammates:

**Juliana**:
The Global PMM line should go all the way into the Senior PMM section of the timeline. So no "empty" spaces show.

## Assistant

I'll take a look at the project to understand what needs changing.

_[tool: list_files]_

_[tool: grep]_

_[tool: grep]_

Let me look at the v3 timeline since that's where the data structure is defined.

_[tool: read_file]_

Now I understand. The timeline has 4 segments. Juliana wants the Global PMM segment (2023–2024) to extend all the way to where Senior PMM begins (2025), so there's no gap on the line.

Let me fix this by making the Global PMM segment end at 2025 instead of 2024.

_[tool: str_replace_edit]_

_[tool: done]_

Addressed Juliana's comment — extended the Global PMM segment to 2025 so it now butts up against Senior PMM with no gap on the timeline.

## User

Choosing version A, minimalist as the final choice. Let's move to a higher fidelity mockup that I can send to Claude Code for developing. 
Fonts should be:
titles: 'Cormorant Garamond', serif;
body: 'DM Sans', sans-serif

A pallette of Dark accents in dark brown in a white background should set the aesthetic.

I have a google docs with all project copies. What's the most token efficient way of inserting that content within this layout? And how to maintain it?

## Assistant

_[tool: snip]_

Great direction! Before I build, let me answer the content question since it shapes the architecture:

## Most token-efficient way to handle your Google Doc copy

**The honest answer: a single JSON file is the right pattern, but Google Docs is the wrong source of truth for a developer handoff.**

Here are the realistic options, ranked:

### 1. ⭐ Move copy into a `content.json` file in the repo (recommended)
- One file, structured by project: `{ projects: [{ id, title, company, year, problem, solution, outcomes, ... }] }`
- The HTML/React reads it; Claude Code wires it to components 1:1
- **Maintenance:** you edit the JSON directly, or I can build a tiny "Content" tweaks panel where you paste/edit copy in-browser and it writes back to the file
- **Why it wins:** zero runtime fetch, version-controlled, diff-able, no API keys, no CORS, deploys anywhere static

### 2. Keep Google Docs as source, export to JSON manually
- You "Download as .txt" or use a structured format (headings = project names, bold = field labels) and I write a parser
- **Trade-off:** every copy edit = re-export. Fine if you update rarely.

### 3. Google Docs API at build time
- A build script pulls the doc and generates `content.json`
- **Trade-off:** Claude Code has to set up auth (service account or OAuth), and your doc needs strict structural conventions to parse cleanly. Overkill for a portfolio.

### 4. Live fetch from Google Docs at runtime
- ❌ Don't. CORS, auth, latency, and your portfolio breaks if Google changes anything.

### My recommendation
**Option 1.** For a portfolio site, copy doesn't change weekly — and a JSON file is the cleanest thing to hand to Claude Code. If you want, I can also build the in-browser content editor as a Tweaks panel so you never have to touch JSON by hand.

---

## Before I build the hi-fi mockup

A few quick questions so I get it right on the first pass:

_[tool: questions_v2]_

## User

Questions answered:
- content_source: Build an in-browser content editor (Tweaks panel) so I can edit copy visually
- brown_shade: 1
- white_bg: Pure white (#FFFFFF) — crisp, modern
- viewport: Both — show desktop and mobile side-by-side
- accents: Brown + subtle tints (light pink)
- imagery: I have screenshots/images for each project
- type_treatment: Light weight, oversized — fashion magazine
- interactions: Animated horizontal timeline, Project modal/case-study overlay, Photo slideshow (rotating profile photos), Hover states on project cards, Smooth scroll between sections
- tweaks: Title font size scale, Project card layout (grid vs. list), Brown shade picker
- scope: Decide for me

## Assistant

Got it. Let me plan and build.

_[tool: update_todos]_

Let me read the rest of the v3 file to get all the project content, then start building.

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

Now let me create the content.json and build the hi-fi mockup. I'll structure files to be modular and developer-friendly.

_[tool: write_file]_

Now let me build the hi-fi components. I'll split into modular files: `components.jsx` (shared primitives), `portfolio.jsx` (main layout), and the main HTML shell.

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

Now the tweaks panel + main HTML shell.

_[tool: read_file]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

Now let me build the main HTML shell with content editor and tweaks panel.

_[tool: write_file]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Hi-fi portfolio is live with desktop + mobile side-by-side.

**Files for Claude Code handoff:**
- `content.json` — single source of truth for all copy
- `components.jsx` — shared primitives (Slideshow, Timeline, Card, Modal, etc.)
- `portfolio.jsx` — page composition (Hero, Metrics, Work, About, Career, Skills, Contact)
- `Portfolio Hi-Fi.html` — shell + theme tokens + Tweaks/content editor

**Most token-efficient content workflow (recommended):**
1. Open Tweaks panel → **Content** section. Paste copy from your Google Doc field-by-field.
2. Click **Download content.json** → drop it into the repo.
3. Claude Code wires `content.json` → components 1:1. Future copy edits = edit JSON only, no component changes.

**Tweaks exposed:** title scale, card layout (grid/list), brown shade picker (5 presets — currently Espresso).

**Aesthetic notes:**
- Cormorant Garamond (light 300) at fashion-magazine scale; italics in dusty pink (`#E8B4A0`) for last name + key emphasis
- DM Sans for all body, eyebrows, metadata
- Pure white background, warm white (`#FBF7F2`) for layered sections, espresso (`#2A1810`) on the contact footer
- Timeline animates on scroll into view; Juliana's no-gap fix preserved

## User

Apply 5 direct edits:
1. In portfolio.jsx (near line 180, <h2>): change the text from ", building." to "".
<mentioned-element>
react:    App › Portfolio › CareerSection
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › h2 › span.__om-t[3/3]
text:     ", building."
children: text
selector: :is(h1,h2,h3,h4,h5,h6) >[data-cc-id="cc-35"]
id:       cc-35
</mentioned-element>
2. In portfolio.jsx (near line 149, <h2>): change the text from " of the work." to "".
<mentioned-element>
react:    App › Portfolio › About
dom:      body › div#root › … › div › div.artboard-shell › div › section › div › div › h2 › span.__om-t[3/3]
text:     "of the work."
children: text
selector: :is(h1,h2,h3,h4,h5,h6) >[data-cc-id="cc-31"]
id:       cc-31
</mentioned-element>
3. In components.jsx (near line 232, <div>): change the text from "2025" to "2024".
<mentioned-element>
react:    App › Portfolio › CareerSection › HorizontalTimeline
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › div › div[5/15]
text:     "2025"
children: text
selector: [data-cc-id="cc-27"] div >div:nth-child(5)
id:       cc-41
</mentioned-element>
4. In components.jsx (near line 225, <div>): change the text from "ICONNECTIONS" to "I\\CONNECTIONS".
<mentioned-element>
react:    App › Portfolio › CareerSection › HorizontalTimeline
dom:      body › div#root › … › div › div.artboard-shell › div › section › div › div › div › div › div[2/2]
text:     "ICONNECTIONS"
children: text
selector: [data-cc-id="cc-27"] div >div:nth-child(4) >[data-om-id="jsx:/https:/e0f31707-f965-437a-ab09-36b153…
id:       cc-42
</mentioned-element>
5. In components.jsx (near line 232, <div>): change the text from "2023" to "2022".
<mentioned-element>
react:    App › Portfolio › CareerSection › HorizontalTimeline
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › div › div[8/15]
text:     "2023"
children: text
selector: [data-cc-id="cc-27"] div >div:nth-child(8)
id:       cc-43
</mentioned-element>

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: snip]_

_[tool: grep]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: grep]_

The timeline rendering of years and company names is data-driven from `content.json`, not hardcoded in components.jsx. Edits 3–5 should target content.json instead.

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

## User

Apply 3 direct edits:
1. In components.jsx (near line 88, <span>): change the text from "08 PROJECTS" to "PROJECTS".
<mentioned-element>
react:    App › Portfolio › WorkSection › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section#work › div › span[2/2]
text:     "08 PROJECTS"
children: text, span
selector: #work >div >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong,small,td,…
id:       cc-64
</mentioned-element>
2. In components.jsx (near line 88, <span>): change the text from "PORTFOLIO · 2026" to "PORTFOLIO".
<mentioned-element>
react:    App › Portfolio › Hero › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › span › span.__om-t
text:     "PORTFOLIO · 2026"
children: text
selector: :is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong,small,td,th,caption) …
id:       cc-25
</mentioned-element>
3. In components.jsx (near line 88, <span>): change the text from "TECH & ALT INVESTMENTS" to "SENIOR PRODUCT MARKETING MANAGER".
<mentioned-element>
react:    App › Portfolio › Hero › Eyebrow
dom:      body › div#root › … › div.artboard-row › div › div.artboard-shell › div › section › div › span[1/2]
text:     "TECH & ALT INVESTMENTS"
children: text
selector: [data-cc-id="cc-24"]
id:       cc-24
</mentioned-element>

## Assistant

These edits target text rendered from `portfolio.jsx` (Hero eyebrows) and `content.json` (location field). Edit 1 is a template literal in `portfolio.jsx`.

_[tool: snip]_

_[tool: grep]_

Edit 3 (location → "SENIOR PRODUCT MARKETING MANAGER") is in content.json.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

All 3 edits applied. Note: edit 3 (the role text under "Senior Product Marketing Manager") was sourced from `content.json`'s `profile.location` field, so I updated it there — that keeps the JSON as your single source of truth for copy.

## User

Apply 5 direct edits:
1. In portfolio.jsx (near line 237, <a>): change the text from "juliana@email.com\n→" to "Connect".
<mentioned-element>
react:    App › Portfolio › Contact
dom:      body › div#root › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › a[1/2]
text:     "juliana@email.com →"
children: text, span
selector: [data-cc-id="cc-85"]
id:       cc-85
</mentioned-element>
2. In portfolio.jsx (near line 237, <a>): change the text from "Connect" to "Reach out!".
<mentioned-element>
react:    App › Portfolio › Contact
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › a › span.__om-t
text:     "Connect"
children: text
selector: [data-cc-id="cc-87"] >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong…
id:       cc-91
</mentioned-element>
3. In components.jsx (near line 88, <span>): change the text from "TECH & ALT INVESTMENTS" to "SENIOR PRODUCT MARKETING MANAGER".
<mentioned-element>
react:    App › Portfolio › Hero › Eyebrow
dom:      body › div#root › … › div.artboard-row › div › div.artboard-shell › div › section › div › span[1/2]
text:     "TECH & ALT INVESTMENTS"
children: text
selector: [data-om-id="jsx:/Inline Babel script:9678:228:13"] [data-om-id="jsx:/https:/e0f31707-f965-437a-ab0…
id:       cc-92
</mentioned-element>
4. In components.jsx (near line 88, <span>): change the text from "PORTFOLIO · 2026" to "".
<mentioned-element>
react:    App › Portfolio › Hero › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › span › span.__om-t
text:     "PORTFOLIO · 2026"
children: text
selector: [data-om-id="jsx:/Inline Babel script:9678:228:13"] [data-om-id="jsx:/https:/e0f31707-f965-437a-ab0…
id:       cc-93
</mentioned-element>
5. In components.jsx (near line 88, <span>): change the text from "SENIOR PRODUCT MARKETING MANAGER" to "\n".
<mentioned-element>
react:    App › Portfolio › Hero › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › span[3/3]
text:     "SENIOR PRODUCT MARKETING MANAGER"
children: text
selector: [data-om-id="jsx:/Inline Babel script:9678:228:13"] div >[data-om-id="jsx:/https:/e0f31707-f965-437…
id:       cc-96
</mentioned-element>

## Assistant

[System: response generation was interrupted by an error]

## User

Apply 6 direct edits:
1. In components.jsx (near line 88, <span>): change the text from "OPEN TO" to "".
<mentioned-element>
react:    App › Portfolio › Contact › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › span › span.__om-t
text:     "OPEN TO"
children: text
selector: [data-cc-id="cc-152"] >span >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em…
id:       cc-175
</mentioned-element>
2. In portfolio.jsx (near line 257, <span>): change the text from " · 2026" to "".
<mentioned-element>
react:    App › Portfolio › Contact
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › span › span.__om-t[2/2]
text:     "· 2026"
children: text
selector: [data-cc-id="cc-154"] >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,stron…
id:       cc-176
</mentioned-element>
3. In portfolio.jsx (near line 257, <span>): change the text from " · 2026" to "".
<mentioned-element>
react:    App › Portfolio › Contact
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › span › span.__om-t[2/2]
text:     "· 2026"
children: text
selector: [data-cc-id="cc-83"] >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong…
id:       cc-179
</mentioned-element>
4. In portfolio.jsx (near line 237, <a>): change the text from "juliana@email.com\n→" to "Reach Out →".
<mentioned-element>
react:    App › Portfolio › Contact
dom:      body › div#root › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › a[1/2]
text:     "juliana@email.com →"
children: text, span
selector: [data-cc-id="cc-157"]
id:       cc-157
</mentioned-element>
5. In portfolio.jsx (near line 237, <a>): change the text from "Reach out!" to "Reach out  →".
<mentioned-element>
react:    App › Portfolio › Contact
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › div › a › span.__om-t
text:     "Reach out!"
children: text
selector: [data-cc-id="cc-87"] >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong…
id:       cc-91
</mentioned-element>
6. In components.jsx (near line 88, <span>): change the text from "OPEN TO" to "".
<mentioned-element>
react:    App › Portfolio › Contact › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section › div › span › span.__om-t
text:     "OPEN TO"
children: text
selector: [data-cc-id="cc-89"] >span >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,…
id:       cc-180
</mentioned-element>

## Assistant

_[tool: snip]_

_[tool: grep]_

Multiple consecutive edits to the same elements — I'll apply the latest state from each. Final intentions:
- "Open to" eyebrow → empty (edits 1 & 6)
- "· 2026" footer → empty (edits 2 & 3)
- Email link → "Reach out →" (edits 4 & 5, latest wins)

_[tool: str_replace_edit]_

_[tool: done]_

Done — Open To eyebrow removed, "· 2026" stripped from the footer, email button now reads "Reach out →".

## User

Address these comments from my teammates:

**Juliana**:
Let's bring the about, and career timelines just below the fold.

**Juliana**:
Add github button with github logo

**Juliana**:
Remove this button

**Juliana**:
Let's make this career timeline vertical in mobile, it's hard to read as horizontal and everything is too close together. It should take up the average length of the about section, so it can all be visible without having to scroll down too much.

**Juliana**:
Not sure what's this component to the side, let's keep it vertical scroll only, so they are all visible without lateral scroll

**Juliana**:
Remove this text box

**Juliana**:
This button is only visible upon hovering on the mockup. Let's remove it

**Juliana**:
Add a github button with the github logo that redirects to my github profile.

**Juliana**:
Bring this a little bit closer to the hero title

**Juliana**:
Round corners of all images in 5 pixels

**Juliana**:
Consider the about + timeline + skills & tools as the same big section. No need to change the background colors, keep visuals as is, but group them as a single section, and make that the section below the fold. So the order is:
1. Hero
2. About/career/skills/tools
3. Work
4. Let's connect

**Juliana**:
Change this from a square to a circle

**Juliana**:
Move the subtitle from below the big number to the same line as the big number. They are overlapping a bit as is. And we can optimize the vertical space they take in 2 different lines, by putting them on the same line.

## Assistant

I'll address Juliana's batch of comments. Let me read the relevant files and tackle them systematically.

_[tool: read_file]_

_[tool: read_file]_

Now I'll plan and address all comments. Let me also check the HTML file to understand the canvas structure (esp. desktop width and the side mobile artboard).

_[tool: grep]_

Now I have a clear picture. Let me map the comments to actions:

**Layout reorganization (Juliana's main asks):**
1. New section order: Hero → About+Career+Skills (one big section, below fold) → Work → Contact
2. Bring About/Career below the fold
3. Group About + Career + Skills as one section visually

**Specific component changes:**
4. Add GitHub button (with logo) — appears x2 in comments → add to Hero CTA row + Contact section
5. Remove "Let's connect" reach-out button (per "Remove this button" comment — interpreting as the Reach Out button in Contact, since LinkedIn already exists there). Actually re-reading: "This button is only visible upon hovering on the mockup. Let's remove it" — that's the **Read case →** hover indicator on project cards. And "Remove this button" is separate. Without exact element references, I'll interpret conservatively:
   - Remove the "View work ↓" link in Hero (small text button, less essential than LinkedIn+GitHub)
   - Remove the "Read case →" hover-only state on project cards (keep cards clickable but no extra button text)
6. Remove "Always happy to chat about GTM, dev marketing, or alts" text box
7. Mobile timeline → vertical, sized to about-section height
8. Mobile: only vertical scroll (the side-by-side desktop+mobile must stack vertically — keeping artboard widths intact)
9. Bring tagline closer to hero title
10. Round all images 5px (already partially done — verify)
11. Photo slideshow: square → circle in hero
12. Metric value + label on same line (in metrics strip)

Let me make the edits:

_[tool: update_todos]_

Now let me apply all the changes. Start with adding GitHub URL to content.json and a GitHubBtn component.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: update_todos]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: grep]_

Let me check the current state of portfolio.jsx since the first 4 edits did apply, and look at the About function area:

_[tool: read_file]_

Now I'll insert the AboutCareerSkills component before About:

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: grep]_

It seems my Portfolio render still uses the old `<About>...<Skills>` chain — the first edit on m0033 to swap to AboutCareerSkills didn't apply (was in a 5-edit batch that errored on edit 5; only 4 applied per the message). Let me check & fix:

_[tool: grep]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

_[tool: snip]_

## Assistant

Done — addressed all of Juliana's comments:

**Layout**
- New section order: Hero → About/Career/Skills (one grouped section, below the fold) → Work → Contact
- Desktop and mobile artboards now stack vertically (no lateral scroll)

**Hero**
- Photo: square → circle
- Tagline pulled closer to the title
- Added GitHub button next to LinkedIn (using profile.github)
- Removed the "View work ↓" text link

**Metrics**
- Number and label now sit on the same line

**Career**
- Mobile gets a new vertical timeline; desktop keeps the horizontal one

**Work cards**
- Removed the hover-only "Read case →" button (cards are still clickable)

**Contact**
- Removed the "Always happy to chat about GTM…" sentence
- Added GitHub button alongside Reach Out + LinkedIn

**Other**
- All images set to 5px radius
- `content.json` now has a `github` URL field

## User

Apply 6 direct edits:
1. In components.jsx (near line 261, <div>): change the text from "I\\CONNECTIONS" to "ICONNECTIONS".
<mentioned-element>
react:    App › Portfolio › AboutCareerSkills › HorizontalTimeline
dom:      body › div#root › … › div › div.artboard-shell › div › section › div › div › div › div › div › div[2/2]
text:     "I\CONNECTIONS"
children: text
selector: div:nth-child(4) >[data-om-id="jsx:/https:/e0f31707-f965-437a-ab09-36b153195d60.claudeusercontent.c…
id:       cc-2
</mentioned-element>
2. In components.jsx (near line 256, <div>): change the text from "TW Manager" to "Tech Writing Manager".
<mentioned-element>
react:    App › Portfolio › AboutCareerSkills › HorizontalTimeline
dom:      body › div#root › … › div › div.artboard-shell › div › section › div › div › div › div › div › div[1/2]
text:     "TW Manager"
children: text
selector: [data-cc-id="cc-4"]
id:       cc-4
</mentioned-element>
3. In components.jsx (near line 256, <div>): change the text from "Global PMM" to "Global Product Marketing Manager".
<mentioned-element>
react:    App › Portfolio › AboutCareerSkills › HorizontalTimeline
dom:      body › div#root › … › div › div.artboard-shell › div › section › div › div › div › div › div › div[1/2]
text:     "Global PMM"
children: text
selector: [data-cc-id="cc-5"]
id:       cc-5
</mentioned-element>
4. In components.jsx (near line 124, <span>): change the text from "08 PROJECTS" to "PROJECTS".
<mentioned-element>
react:    App › Portfolio › WorkSection › Eyebrow
dom:      body › … › div.artboard-row › div › div.artboard-shell › div › section#work › div › span[2/2]
text:     "08 PROJECTS"
children: text, span
selector: #work >div >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong,small,td,…
id:       cc-8
</mentioned-element>
5. In components.jsx (near line 544, <div>): change the text from "TW Manager" to "Tech Writing Manager".
<mentioned-element>
react:    App › Portfolio › AboutCareerSkills › VerticalTimeline
dom:      body › div#root › … › div › div.artboard-shell › div › section › div › div › div › div › div[3/4]
text:     "TW Manager"
children: text
selector: div:nth-child(5) >[data-om-id="jsx:/https:/e0f31707-f965-437a-ab09-36b153195d60.claudeusercontent.c…
id:       cc-12
</mentioned-element>
6. In components.jsx (near line 324, <div>): change the text from "Full-funnel" to "\n".
<mentioned-element>
react:    App › Portfolio › WorkSection › ProjectCard
dom:      body › div#root › … › div › div.artboard-shell › div › section#work › div › div › div › div[1/2]
text:     "Full-funnel"
children: text
selector: #work div:nth-child(7) [data-om-id="jsx:/https:/e0f31707-f965-437a-ab09-36b153195d60.claudeusercont…
id:       cc-13
</mentioned-element>

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: grep]_

_[tool: snip]_

_[tool: str_replace_edit]_

Wait — edit 4 said remove "08 PROJECTS" → "PROJECTS" (drop the count, keep the word). And edit 6 wants the metric "Full-funnel" cleared. Let me re-check and fix:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

All 6 edits applied via the source data:
- IConnections (no backslash)
- Global Product Marketing Manager
- Tech Writing Manager (covers both horizontal & vertical timelines)
- Project count chip → "Projects"
- "Full-funnel" metric cleared

