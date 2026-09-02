# DOCX Design Taste

## Purpose

This reference adds a document-specific judgment layer to `professional-documents`. It is inspired by contemporary design-taste approaches, including Hmbown's domain-grounded taste model, but is adapted specifically for DOCX and long-form Office artifacts.

Taste is a **judgment layer, not a fixed visual style**. The goal is to decide what is appropriate for this document, audience, and content, then evaluate whether the rendered artifact actually achieves that intent.

## 1. Establish the document's visual thesis

Before styling a new document, state one short visual thesis:

> This document should feel like **[quality]** because **[audience/purpose]**.

Examples:

- Academic cybersecurity report → rigorous, calm, highly legible, evidence-first.
- Executive brief → decisive, scannable, restrained, information-dense.
- Portfolio → editorial, expressive, spacious, image-led.
- Study roadmap → structured, progressive, motivating, easy to scan.

The thesis controls later choices. Do not let available Word features determine the design.

## 2. Infer the quality bar from domain

Ask:

- What does a good artifact in this domain normally look and feel like?
- What does the audience already understand?
- Where will the reader spend attention?
- What must be trusted immediately?
- Which information deserves visual priority?

A university report, technical manual, CV, proposal, and magazine-style document should not converge on the same template.

## 3. Hierarchy before decoration

Assign visual priority:

1. Primary — what the reader must notice first.
2. Secondary — what explains or organizes the primary material.
3. Tertiary — supporting detail.
4. Utility — navigation, metadata, references, page furniture.

If everything is bold, boxed, colored, oversized, or separated, nothing has priority.

## 4. Spatial rhythm

Treat whitespace as structure, not leftover space.

Maintain intentional relationships between:

- page margins;
- title and subtitle;
- headings and following text;
- paragraphs;
- lists;
- tables and captions;
- figures and surrounding prose;
- sections;
- header/footer and body content.

Prefer a small, repeatable spacing scale over many arbitrary values.

## 5. Alignment and invisible grid

Look for alignment lines across the page and across pages.

Check that:

- headings align with body text;
- tables align with the content grid;
- figures share sensible edges;
- captions align with their figures;
- headers/footers establish stable margins;
- repeated components occupy consistent positions.

Misalignment should be intentional or corrected.

## 6. Typography taste

Choose typefaces for the document's purpose, language, and available weights—not novelty.

Rules:

- establish a small set of semantic text roles;
- use size, weight, spacing, and position to create hierarchy;
- avoid unnecessary font-family proliferation;
- keep body text comfortable at the final rendered size;
- avoid oversized headings that force awkward page breaks;
- verify Arabic glyph quality and mixed-script behavior visually.

Typography should carry most of the document's visual personality before decoration does.

## 7. Color restraint

Use color to communicate structure or meaning.

Default to:

- neutral document foundation;
- one primary text system;
- one restrained accent family;
- semantic colors only when they communicate status or category.

Do not add colors merely because the page feels empty.

## 8. Tables are information design

A table should make relationships easier to compare.

Before styling a table, ask:

- What comparison is the reader trying to make?
- Which column/row is the visual anchor?
- Can redundant borders be removed?
- Is the table too dense for the page?
- Does it need repetition of header rows across pages?
- Would a list, diagram, or prose structure communicate better?

Do not make every table look like a spreadsheet.

## 9. Page composition

Pages are compositions, not containers that must be filled.

Allow intentional quiet pages when the content warrants them, but treat unexplained large gaps as defects.

Use page archetypes deliberately, for example:

- cover;
- contents;
- section opener;
- standard reading page;
- dense technical page;
- table-heavy page;
- figure/diagram page;
- appendix/reference page.

Do not force every page into one repeated card-like layout.

## 10. Anti-slop audit

Before final delivery, actively look for generic AI-document patterns:

- every section enclosed in a card;
- excessive rounded rectangles;
- decorative icons with no semantic purpose;
- too many accent colors;
- arbitrary gradients or shadows;
- giant headings paired with tiny body text;
- repeated decorative lines;
- identical page composition despite different content;
- excessive bolding;
- dense tables used as decoration;
- unnecessary callout boxes;
- forced page breaks that create awkward whitespace;
- tiny text used to squeeze content;
- inconsistent spacing caused by manual formatting;
- decoration competing with the actual information;
- generic corporate-blue styling without a reason;
- a cover that looks designed separately from the rest of the document.

These are warning signals, not absolute bans. A deliberate art direction may justify an exception.

## 11. The subtraction test

After the document is visually coherent, ask:

> What can I remove without reducing comprehension, navigation, credibility, or intentional character?

Remove or simplify the three lowest-value visual elements before adding new decoration.

## 12. 3-second / 10-second audit

### 3-second audit
Look at a rendered page briefly.

Can you identify:

- document/section context;
- main topic;
- primary information;
- rough reading path?

### 10-second audit
Look longer.

Can you explain:

- hierarchy;
- grouping;
- page purpose;
- where to look next?

If not, improve hierarchy, grouping, or navigation before polishing.

## 13. Critique order

When reviewing a rendered document, critique in this order:

1. **Correctness** — missing, duplicated, or incorrect content.
2. **Structural defects** — overflow, clipping, broken pagination, bad sectioning.
3. **Legibility** — font size, line length, contrast, RTL/mixed-script issues.
4. **Hierarchy** — what the eye sees first and whether that is correct.
5. **Rhythm** — spacing and page-to-page continuity.
6. **Composition** — balance, alignment, density, and page archetypes.
7. **Taste** — point of view, restraint, appropriateness, coherence, and whether the result feels generic.
8. **Polish** — fine typography, micro-spacing, subtle visual details.

Never use decorative polish to hide structural weakness.

## 14. Design dials

When the brief is underspecified, internally estimate these from 1–10:

- `DESIGN_VARIANCE` — how unusual/expressive the visual system should be.
- `VISUAL_DENSITY` — how much information should occupy each page.
- `FORMALITY` — institutional/serious vs casual/expressive.
- `DECORATION` — amount of non-essential visual ornament.
- `TYPOGRAPHIC_EXPRESSION` — how much personality typography carries.

Example starting points:

| Document | Variance | Density | Formality | Decoration | Typography |
|---|---:|---:|---:|---:|---:|
| Academic report | 3 | 6 | 9 | 2 | 4 |
| Technical report | 4 | 7 | 9 | 2 | 4 |
| Executive brief | 5 | 6 | 8 | 3 | 6 |
| Portfolio | 8 | 3 | 4 | 7 | 9 |
| Study roadmap | 5 | 5 | 6 | 4 | 6 |

These are starting points, not rigid presets.

## 15. Final taste gate

Before delivery, answer:

- Does the visual system clearly belong to this document's purpose?
- Is there a recognizable visual thesis?
- Is hierarchy obvious without explanation?
- Is whitespace intentional?
- Are alignment and spacing consistent?
- Are tables and figures improving comprehension?
- Is typography doing useful work?
- Is color semantic or merely decorative?
- Does the document remain coherent across page turns?
- Did any AI-default patterns survive unnecessarily?
- Could three visual elements be removed without harming the artifact?

If several answers are weak, revise the design and render again.
