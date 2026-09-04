---
name: professional-documents
version: 2.1-k3-inspired
description: Kimi K3-informed professional document agent workflow for creating, redesigning, editing, rendering, inspecting, and iterating DOCX, PDF, and other Office artifacts. Use whenever document quality, layout, visual design, or file generation matters.
---

# Professional Documents — K3-Informed Workflow

This skill targets the **Kimi K3-era Agent/Office behavior** publicly described by Moonshot: end-to-end Office work, autonomous planning and tool use, native visual understanding, long-horizon execution, and iterative error recovery. It is not based on older Kimi K2/K2.5 assumptions and does not claim access to private K3 prompts, weights, or proprietary implementation.

## Core objective

Do not optimize for "a DOCX that opens." Optimize for a **credible finished artifact**.

The target loop is:

**Plan → inspect/research → architect → art-direct → build → render → visually inspect → critique → revise → render → validate → deliver**

The agent should act as both:

- a document information architect;
- a visual designer;
- a document engineer;
- a quality-control reviewer.

## Reference files

Before a substantial design task, consult:

- `references/design-system.md` — visual hierarchy, typography, grid, tables, pagination, anti-slop rules, and visual scoring.
- `references/art-direction-playbook.md` — choosing a visual concept, page archetypes, density management, and redesign protocol.
- `references/docx-recipes.md` — concrete design tokens, hex palettes, OpenXML recipes, and python-docx component patterns.
- `references/qa-checklist.md` — final quality checks.
- `references/tooling.md` — execution commands, headless rendering, and visual extraction.
- `scripts/docx_craft.py` — pre-packaged craft engine for typography, tables, callouts, covers, and headless rendering.

Do not load every reference for a trivial text-only edit. Load the references relevant to the task.

## K3-era operating principles

### 1. Artifact-first

The rendered document is the product. Source code, XML, scripts, and successful conversion are implementation details.

### 2. Whole-task autonomy

For a complex request, continue through design, generation, rendering, inspection, correction, and final validation instead of stopping at the first technically valid output.

### 3. Visual understanding is a required reasoning step

If rendered pages, screenshots, or previews are available, inspect them as visual artifacts. Do not infer layout quality from extracted text or source code alone.

### 4. Self-correction

When a render or document operation fails:

1. diagnose the failure;
2. fix the source;
3. rerun the relevant operation;
4. inspect the new result;
5. continue until the defect is resolved or explicitly documented.

### 5. Long-horizon state

For large jobs, maintain a compact checklist of requirements, source-of-truth content, completed stages, known defects, and pending validation. Never let later visual edits silently remove required content.

### 6. Controlled proactivity

Infer design choices when the brief is underspecified, but never invent facts, statistics, citations, logos, institutional rules, or user data.

If a template or brand system is supplied, treat it as authoritative unless redesign is explicitly requested.

## Design mode vs form-filling mode

### Existing template / branded document
Act as a **form-filler/editor** first:

- preserve the established visual system;
- inspect styles and XML when fidelity matters;
- modify content without casually redesigning the document.

### New document or explicit redesign
Act as a **designer**:

- establish information architecture;
- choose an art direction;
- define typography, grid, spacing, color, tables, and page archetypes;
- create a coherent visual system before filling pages.

"Make it look better" means improve the existing visual hierarchy and composition—not add random decoration.

## Mandatory workflow

### Phase A — Task decomposition

Identify:

- purpose and audience;
- document type;
- desired tone;
- language and RTL/LTR requirements;
- source material;
- factual constraints;
- expected length;
- required output formats;
- whether the task is creation, redesign, conversion, editing, or review.

### Phase B — Inspect

For an existing artifact, inspect both **content and presentation** when relevant.

Identify:

- styles;
- heading hierarchy;
- page dimensions/margins;
- tables and figures;
- headers/footers;
- section breaks;
- comments/revisions;
- reusable visual components;
- visual weaknesses.

If formatting fidelity matters, do not rely on plain-text extraction alone.

### Phase C — Information architecture

Decide the structure before styling:

- title and section hierarchy;
- front matter;
- executive summary or abstract when appropriate;
- TOC/navigation;
- tables and figures;
- callouts;
- references;
- appendices;
- meaningful section/page transitions.

### Phase D — Art direction

Consult `references/design-system.md` and `references/art-direction-playbook.md`.

Define a compact design system:

- one visual concept;
- typography roles;
- heading scale;
- body scale and line height;
- spacing rhythm;
- page grid/margins;
- table grammar;
- accent palette;
- header/footer system;
- figure/caption treatment;
- numbering.

Choose page archetypes from the content. Do not force every page into the same layout.

### Phase E — Build

Prefer semantic/native Office structures and avoid default unstyled output:

- **Headings & Anti-Orphan Rule**: Apply `keep_with_next = True` to every heading paragraph so headings never orphan at page bottoms.
- **Typography Geometry**: Set intentional line spacing (1.15–1.2x) and paragraph spacing (`space_after = Pt(6)`).
- **Table Engineering**:
  - Invert raw grid lines into subtle horizontal borders (`#E2E8F0`) with no harsh vertical borders.
  - Set generous cell padding (`w:tblCellMar`: 6–7pt top/bottom, 8–9pt left/right).
  - Repeat the header row across pages (`w:tblHeader`).
  - Prevent row splitting across pages (`w:cantSplit`).
- **Callouts & Highlights**: Use padded single-cell containers with thick left accent borders (`w:tcBorders`) and tinted background fills.
- **Headers & Footers**: Suppress on cover page (`different_first_page_header_footer = True`), add subtle dividing rules, and use dynamic native Word page fields (`Page X of Y`).
- **RTL / Mixed Script**: Apply `w:bidi` to paragraphs and `w:bidiVisual` to tables for Arabic text.

*Pro tip*: Downstream agents can directly use or inspect `scripts/docx_craft.py` and `references/docx-recipes.md` to avoid rewriting low-level XML manipulation from scratch.

### Phase F — Render

Render the document to PDF and high-resolution PNG page images:

1. **Headless PDF Conversion**:
   ```bash
   soffice --headless --convert-to pdf document.docx --outdir output/
   ```
2. **Page Image Extraction (150 DPI)**:
   ```bash
   pdftoppm -png -r 150 output/document.pdf output/pages/page
   ```
   Or invoke `render_and_preview("document.docx")` from `scripts/docx_craft.py`.

### Phase G — Visual inspection

Inspect every page when practical, especially:

- cover;
- dense pages;
- tables;
- figures;
- references;
- section transitions;
- pages changed in the latest iteration.

Check for:

- clipping/overflow;
- broken alignment;
- weak hierarchy;
- awkward whitespace;
- bad page breaks;
- orphan headings/lines;
- inconsistent typography;
- table distortion;
- detached captions;
- header/footer collisions;
- monotonous or unfinished pages;
- Arabic/English direction problems.

### Phase H — Design critique

Critique the rendered artifact, not the implementation.

Ask:

- What does the eye see first?
- Can the structure be understood in seconds?
- Is the reading experience comfortable?
- Is the visual rhythm intentional?
- Is the page density appropriate?
- Are tables and figures actually improving comprehension?
- Is the design appropriate for the audience?
- Is any decoration unnecessary?
- Does the document look coherent when viewed page-to-page?

Use the visual score in `references/design-system.md`. Fix critical 0-scores and prioritize the highest-impact defects.

### Phase I — Iterate

Use the K3-style visual loop:

**Build → render → inspect → identify the 3 highest-impact defects → fix → render → inspect again.**

Fix structural problems before decorative polish:

1. clipping/overflow;
2. hierarchy;
3. pagination;
4. alignment/grid;
5. readability;
6. tables/figures;
7. color/detail polish.

### Phase J — Final validation

Validate:

- all requested content is present;
- no accidental duplication/omission;
- document opens successfully;
- expected files exist;
- headings and numbering are semantic and consistent;
- tables fit and remain readable;
- references are consistent;
- hyperlinks work where required;
- visual system is coherent;
- no significant clipping/overflow remains;
- rendered pages have actually been inspected.

## Document-type intelligence

### Academic / university
Credibility first: readable body text, restrained styling, consistent headings, citations, navigation, and tables designed for reference.

### Technical report
Use precise hierarchy, diagrams, procedures, terminology, code/identifier treatment, tables, and data visualizations.

### Business / executive report
Optimize for scanning and decisions: executive summary, key takeaways, metrics, concise evidence, and strong page rhythm.

### Resume / CV
Optimize information density and alignment. Preserve semantic text and avoid visual tricks that undermine parsing when ATS compatibility matters.

### Study plan / roadmap
Make progression visible through milestones, dependencies, timelines, and repeatable module patterns.

## Arabic and mixed-script requirements

For Arabic or mixed Arabic/English documents:

- use true RTL paragraph/table direction;
- keep URLs, code, and technical identifiers LTR where appropriate;
- verify punctuation and numeric ordering visually;
- inspect mixed-script table cells independently;
- choose fonts that actually support Arabic glyphs and required weights;
- never assume RTL correctness from source text alone.

## Quality gate

A document is **not finished** merely because the DOCX opens, code succeeds, or PDF conversion succeeds.

It is finished only when **content + structure + rendered visual presentation** all pass inspection.
