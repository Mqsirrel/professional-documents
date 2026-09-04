# K3 Document Design System

This is an art-direction system, not a template. The agent should make deliberate design decisions from the document's purpose, audience, and content.

## 1. Design before formatting

Create a visual brief before building:

- **Audience:** professor, researcher, executive, client, student, public reader, etc.
- **Tone:** formal, editorial, technical, modern, institutional, understated, etc.
- **Information density:** sparse / medium / dense.
- **Primary action:** read deeply, scan, compare, decide, study, reference, or present.
- **Visual character:** choose one coherent direction rather than mixing unrelated styles.

The document should have a recognizable visual identity before individual pages are produced.

## 2. The hierarchy system

Use a small number of semantic levels with visibly predictable differences:

1. Document title — strongest element.
2. Section / H1 — establishes major navigation.
3. Subsection / H2 — organizes content.
4. Minor heading / H3 — local structure.
5. Body — quiet baseline optimized for reading.
6. Supporting text — captions, metadata, notes, references.

Do not make hierarchy depend on color alone. Size, weight, spacing, alignment, and placement should reinforce it.

## 3. Grid and rhythm

Choose a consistent page grid before placing content.

- Keep left/right margins stable.
- Align headings, body text, tables, figures, and captions to intentional grid lines.
- Use a repeatable spacing scale rather than arbitrary paragraph gaps.
- Use whitespace to separate concepts, not to compensate for weak hierarchy.
- Avoid manual page breaks unless they express a meaningful structural transition.

A good page should feel composed even when most of it is text.

## 4. Typography & Typographic Scale

Choose fonts for the actual language and environment. Never assume a font exists.

Standard Font Presets:
- **Modern / Clean**: Segoe UI / Aptos (headings & body), Consolas (code)
- **Executive**: Aptos Display / Aptos, or Calibri / Calibri Light
- **Academic**: Georgia / Garamond / Times New Roman, Courier New (code)
- **Arabic / Mixed**: **Sakkal Majalla** (Default Arabic body & headings; `w:cs="Sakkal Majalla"`), or Amiri / Traditional Arabic for classical texts. Size Arabic at +1.5pt to +2pt relative to Latin for optical balance.

### Concrete Typographic Scale & Spacing Scale

| Role | Font Size | Weight | Line Spacing | Space Before | Space After | Keep With Next |
|---|---|---|---|---|---|---|
| **Document Title** | 28–32 pt | Bold | 1.1x | 36 pt | 12 pt | Yes |
| **Subtitle** | 13–14 pt | Regular / Italic | 1.15x | 0 pt | 36–48 pt | Yes |
| **Heading 1 (H1)** | 18–20 pt | Bold | 1.15x | 18–22 pt | 6 pt | **Yes (Mandatory)** |
| **Heading 2 (H2)** | 14–15 pt | Bold | 1.15x | 14–16 pt | 4 pt | **Yes (Mandatory)** |
| **Heading 3 (H3)** | 12–13 pt | SemiBold | 1.15x | 10–12 pt | 3 pt | **Yes (Mandatory)** |
| **Body Text** | 10.5–11 pt | Regular | **1.2x** | 0 pt | **6 pt** | No |
| **Table Cells** | 9–9.5 pt | Regular | 1.15x | 0 pt | 0 pt | No |
| **Table Headers** | 9.5 pt | Bold | 1.1x | 0 pt | 0 pt | Yes |
| **Callout Body** | 9.5 pt | Regular | 1.15x | 0 pt | 2 pt | No |
| **Header / Footer** | 8.5 pt | Regular | 1.0x | 0 pt | 0 pt | No |
| **Caption** | 9 pt | Italic | 1.15x | 4 pt | 8 pt | No |

> [!IMPORTANT]
> **The Anti-Orphan Rule**: Every heading paragraph MUST have `keep_with_next = True`. Never let a heading detach at the bottom of a page without its subsequent content.

For Arabic:
- verify Arabic glyph quality and weight availability;
- use true RTL paragraph direction (`w:bidi`);
- test Arabic numerals, Latin identifiers, URLs, punctuation, and mixed-script cells;
- do not force an Arabic typeface into English code or identifiers when an appropriate LTR font is needed.

## 5. Color Palettes & Concrete Hex Tokens

Use a restrained, intentional palette. Avoid default Word blue (#2E74B5), rainbow gradients, or arbitrary colors.

### Production Palettes

#### Slate Executive (Corporate / Strategy / Leadership)
- **Primary (Headings/Brand)**: `#0F172A` (Slate 900)
- **Secondary (Subheadings)**: `#1E293B` (Slate 800)
- **Accent (Rules, Accents)**: `#2563EB` (Royal Blue)
- **Accent Light (Callout Fills)**: `#EFF6FF` (Blue 50)
- **Body Text**: `#0F172A` (Slate 900)
- **Muted Text / Metadata**: `#64748B` (Slate 500)
- **Surface / Zebra Fill**: `#F8FAFC` (Slate 50)
- **Subtle Border**: `#E2E8F0` (Slate 200)
- **Highlight**: `#F59E0B` (Amber)

#### Nordic Frost (Modern / Clean / Tech)
- **Primary**: `#1E293B` · **Secondary**: `#334155` · **Accent**: `#0284C7` · **Accent Light**: `#F0F9FF` · **Text**: `#1E293B` · **Muted**: `#64748B` · **Border**: `#E2E8F0`

#### Academic Crimson (Formal / University / Institutional)
- **Primary**: `#7F1D1D` · **Secondary**: `#991B1B` · **Accent**: `#B91C1C` · **Accent Light**: `#FEF2F2` · **Text**: `#1C1917` · **Muted**: `#78716C` · **Surface**: `#FAF8F5` · **Border**: `#E7E5E4`

#### Forest Emerald (Sustainability / Health / Environment)
- **Primary**: `#14532D` · **Secondary**: `#166534` · **Accent**: `#059669` · **Accent Light**: `#ECFDF5` · **Text**: `#0F172A` · **Muted**: `#64748B` · **Surface**: `#F7F9F6` · **Border**: `#E2E8F0`

### Page Margins & Geometry Presets

| Preset | Top | Bottom | Left | Right | Header | Footer |
|---|---|---|---|---|---|---|
| **Executive** | 0.75" | 0.75" | 0.8" | 0.8" | 0.4" | 0.4" |
| **Academic** | 1.0" | 1.0" | 1.25" | 1.0" | 0.5" | 0.5" |
| **Compact** | 0.6" | 0.6" | 0.65" | 0.65" | 0.35" | 0.35" |

## 6. Component language

Repeated elements must look related:

- tables share a table grammar;
- callouts share padding/border/radius rules;
- captions share typography;
- headers/footers share alignment and spacing;
- figures use consistent numbering and caption placement.

Do not turn every paragraph into a card. Use borders, fills, icons, or containers only when they improve grouping or scanning.

## 7. Page archetypes

Choose page compositions according to content rather than forcing one layout everywhere:

- **Cover:** identity + title + essential metadata, with intentional negative space.
- **Executive summary:** key message + compact evidence/metrics.
- **Standard reading page:** heading + body + restrained supporting elements.
- **Comparison page:** aligned columns/table + concise interpretation.
- **Data page:** chart/figure + takeaway + supporting detail.
- **Procedure page:** numbered steps + diagrams/tables where useful.
- **Reference page:** dense but highly structured citations.
- **Appendix:** functional, less decorative, easy to navigate.

Variation should come from content structure, not random visual styling.

## 8. Anti-slop rules

Reject these unless explicitly justified by the brief:

- generic SaaS/dashboard aesthetics in formal documents;
- excessive rounded cards;
- huge headings consuming page area;
- decorative gradients with no semantic purpose;
- random icons beside every heading;
- multiple unrelated accent colors;
- fake statistics or decorative charts;
- giant empty areas created by manual breaks;
- tiny text used to rescue an overloaded table;
- inconsistent corner radii, shadows, or border weights;
- repeated hero-style layouts on every page.

When uncertain, prefer clarity, hierarchy, typography, alignment, and whitespace.

## 9. Tables and data

Tables are information architecture, not decoration.

- Keep columns purposeful.
- Use concise headers.
- Align numbers consistently.
- Give cells enough padding.
- Repeat header rows across pages.
- Avoid vertical borders when a lighter treatment is clearer.
- Split or restructure oversized tables instead of shrinking text excessively.
- Prefer editable/native charts when appropriate.
- Every chart must answer a question; do not add charts merely to make pages look designed.

## 10. Pagination

Before final delivery, inspect page transitions deliberately.

Prevent:

- orphan headings;
- isolated single lines;
- captions separated from figures;
- awkward table splits;
- headings stranded at page bottoms;
- excessive blank regions;
- headers/footers colliding with body content.

Use semantic pagination controls where supported: keep-with-next, keep-lines-together, repeated table headers, and meaningful section breaks.

## 11. Visual QA score

After rendering, score each dimension from 0–2:

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Hierarchy | unclear | mostly clear | immediately clear |
| Typography | inconsistent | acceptable | polished |
| Alignment | visibly broken | mostly aligned | intentional grid |
| Spacing | cramped/empty | acceptable | deliberate rhythm |
| Tables | hard to scan | usable | highly scannable |
| Pagination | distracting | minor issues | clean |
| Consistency | inconsistent | mostly consistent | coherent system |
| Audience fit | wrong tone | acceptable | strongly appropriate |
| RTL/mixed script | broken | minor issues | verified |
| Finish | unfinished | good | publication-ready |

Do not call the artifact finished if a critical category scores 0. Iterate when the visual result is merely "acceptable" but the task calls for a polished professional deliverable.

## 12. The visual loop

**Build → render → inspect → identify the 3 highest-impact defects → fix → render again → inspect again.**

Prioritize structural defects over decoration:

1. overflow/clipping
2. broken hierarchy
3. bad pagination
4. alignment/grid problems
5. typography/readability
6. table/figure problems
7. color/detail polish

The rendered artifact is the source of truth for visual quality.
