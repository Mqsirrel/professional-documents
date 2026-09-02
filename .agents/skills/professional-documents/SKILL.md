---
name: professional-documents
version: 2.0-k3-inspired
description: Kimi K3-informed professional document agent workflow for creating, redesigning, editing, rendering, inspecting, and iterating DOCX, PDF, and other Office artifacts. Use whenever document quality, layout, visual design, or file generation matters.
---

# Professional Documents — K3-Informed Workflow

This skill is intentionally based on **Kimi K3-era Agent/Office behavior**, not older Kimi K2/K2.5-era assumptions.

Moonshot's current documentation identifies Kimi Agent as K3-powered and describes end-to-end Word/PDF/Excel/PPT generation, autonomous planning, tool invocation, error recovery, and deliverable handoff. K3 also provides native vision and office-document understanding. This skill transfers the observable workflow and quality gates that can be reproduced in another agent; it does not claim to reproduce K3's model weights or proprietary internals.

## What this skill is trying to reproduce

The target behavior is not simply "generate a DOCX." It is:

**Plan → research/inspect → design → build → render → visually understand → critique → revise → render again → validate → deliver**

The agent should behave like a document specialist who can both design and engineer the artifact.

## K3-era operating principles

### 1. Treat the artifact as the objective
The final rendered document matters more than the code used to produce it.

A technically valid DOCX can still be a poor deliverable.

### 2. Work autonomously through the whole task
Do not stop after the first successful file creation. Continue through rendering, inspection, correction, and validation when the environment supports those operations.

### 3. Use visual understanding as part of the loop
When page images, PDFs, screenshots, or document previews are available, inspect them as visual artifacts. Do not infer visual quality solely from extracted text or source code.

### 4. Self-correct
When rendering, parsing, conversion, or formatting produces an error:
- diagnose it
- adjust the implementation
- retry
- verify the corrected result

Do not hand the user an intermediate artifact merely because generation technically completed.

### 5. Long-horizon execution
Break complex document jobs into explicit stages and maintain a checklist of completed and pending work. Preserve the source of truth so later revisions do not silently lose content.

## Mandatory workflow

### Phase A — Task decomposition
Before touching the document, identify:
- purpose
- audience
- document type
- desired tone
- language and RTL/LTR requirements
- source files
- factual constraints
- expected length
- required output formats
- whether this is creation, redesign, conversion, editing, or review

For complex tasks, create a short internal execution plan and update it as work progresses.

### Phase B — Inspect existing material
If an existing DOCX/PDF/template is provided:
- inspect its structure
- inspect styles and layout
- identify reusable components
- identify content that must remain unchanged
- identify weaknesses before redesigning

Do not destroy a useful existing structure simply because a new implementation is easier.

### Phase C — Information architecture
Design the document before styling it.

Determine:
- title hierarchy
- section hierarchy
- front matter
- navigation/TOC
- tables
- figures
- callouts
- references
- appendices
- page-break strategy

The hierarchy should make the document understandable before decoration is considered.

### Phase D — Art direction
Create a coherent visual language before generating the pages.

Choose intentionally:
- typography roles
- heading scale
- body scale
- line height
- paragraph rhythm
- margins
- grid/alignment
- table treatment
- accent palette
- header/footer system
- numbering
- cover composition

Do not default to generic AI aesthetics. Avoid unnecessary gradients, excessive rounded cards, random icons, arbitrary color changes, oversized headings, or decoration without communicative purpose.

For redesign requests, preserve the user's information architecture unless improving it is clearly part of the request.

### Phase E — Build the document
Prefer semantic/native Office structures:
- Word heading styles
- real numbered/bulleted lists
- real tables
- real headers/footers
- real page numbers
- TOC fields where appropriate
- editable charts where appropriate
- proper captions and cross-references
- correct document metadata

Use high-level DOCX libraries for ordinary construction and OpenXML/XML editing when precise Word behavior requires it.

### Phase F — Render
After creating or substantially changing a document, render it to PDF and/or page images using the available environment.

Determine available rendering tools from the environment rather than assuming a specific command exists.

### Phase G — Visual inspection
Inspect the rendered artifact.

Check every page when practical, with special attention to:
- cover
- section transitions
- dense tables
- figures
- references
- pages with unusual whitespace
- pages affected by recent edits

Look for:
- clipped text
- overflow
- broken alignment
- orphan headings
- bad page breaks
- excessive whitespace
- cramped content
- inconsistent margins
- inconsistent typography
- poor table proportions
- split rows that harm readability
- captions detached from figures
- headers/footers colliding with content
- weak hierarchy
- repetitive or visually monotonous pages
- pages that look unfinished
- Arabic/English direction problems

### Phase H — Design critique
Do not merely ask "does it work?"

Ask:
- What is the eye supposed to see first?
- Is the hierarchy obvious within seconds?
- Does the visual rhythm remain coherent across pages?
- Is whitespace intentional?
- Does every decorative element serve a purpose?
- Does the document look appropriate for its audience?
- Would a professor, client, researcher, or manager consider it professionally designed?

### Phase I — Iterate
Fix the source artifact, not merely the rendered image.

Then:

**render → inspect → revise → render → inspect**

Repeat until the significant visual defects are resolved.

### Phase J — Final validation
Validate both semantics and appearance:
- requested content present
- no accidental duplication/omission
- document opens successfully
- expected output files exist
- headings are semantic and consistent
- numbering is correct
- tables fit
- references are consistent
- no clipping or overflow
- visual system is coherent
- final rendered artifact has passed visual inspection

## Document-type intelligence

### Academic / university
Prioritize credibility, readability, citation structure, consistent headings, restrained visual styling, and easy navigation.

### Technical report
Prioritize scanability, diagrams, tables, terminology, code/identifier treatment, and precise section hierarchy.

### Business report
Prioritize executive scanning, concise visual summaries, strong page rhythm, and clear decision-relevant information.

### Resume/CV
Prioritize information density, hierarchy, ATS-safe semantics where relevant, alignment, and restrained visual differentiation.

### Study plan / roadmap
Prioritize progression, dependencies, milestones, tables, timelines, and quick scanning.

## Arabic and mixed-script requirements

For Arabic or mixed Arabic/English documents:
- use true RTL paragraph and table direction
- keep English identifiers, URLs, code, and technical tokens LTR where appropriate
- test punctuation and numeric ordering visually
- check mixed-script table cells independently
- never assume correct RTL rendering from source text alone

## Quality gate

A document must not be declared finished merely because:
- the DOCX opens
- the script exits successfully
- the PDF converts successfully
- the text is complete

It is finished only when **content, structure, and rendered visual presentation** all pass inspection.

## Important boundary

This is a K3-informed workflow, not a claim of access to Kimi K3's private system prompts, hidden tools, weights, or proprietary Office implementation. Use public K3-era capabilities and observable Agent/Office patterns as the design target.
