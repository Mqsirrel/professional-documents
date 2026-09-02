# Professional Documents for Antigravity

This repository is being repurposed as a document-engineering skill pack for Google Antigravity/Gemini.

## Goal

Give Gemini a stronger professional-document workflow for DOCX/PDF work: information architecture, visual art direction, native document engineering, rendering, visual QA, and iterative redesign.

The central rule is:

> A document is not finished when the file is generated. It is finished when the rendered artifact passes structural and visual QA.

## Skill

`.agents/skills/professional-documents/SKILL.md`

Supporting references:

- `references/design-system.md` — hierarchy, typography, spacing, tables, covers, figures, RTL.
- `references/qa-checklist.md` — page-by-page visual QA criteria.
- `references/tooling.md` — DOCX/OpenXML/rendering strategy.

## Installation

Because this repository follows Antigravity's workspace skill layout, clone/open it as a workspace and the skill is available under:

`.agents/skills/professional-documents/`

Antigravity supports workspace skills in `<workspace>/.agents/skills/<skill-folder>/`. Skills are loaded when the agent determines the task matches the skill description.

## Design philosophy

This is inspired by the strongest patterns in modern document agents, but it does not attempt to reproduce any proprietary model or hidden implementation. The focus is on transferring the observable workflow: design deliberately, build with native document structures, render, inspect, critique, and iterate.
