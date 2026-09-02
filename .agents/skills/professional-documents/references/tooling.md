# Tooling Strategy

Use the environment's installed tools rather than assuming a specific stack.

## DOCX creation

Preferred order:
1. Existing project/template when one is provided.
2. A high-level DOCX library for normal structure and content.
3. OpenXML/XML editing for features or formatting the high-level library cannot reliably express.

## Rendering

Look for available tools such as LibreOffice headless conversion or another installed office/PDF renderer. Determine the actual command and output format from the environment before running it.

## Image inspection

When page images are available, inspect them visually. For long documents, inspect every page or a representative sequence plus all pages containing tables, figures, covers, and section transitions.

## Editing an existing DOCX

Preserve existing content and structure unless redesign is requested. Before changing global styles, inspect the document's current style definitions and relationships.

## Verification

A useful verification chain is:

DOCX → PDF → page images → visual inspection → DOCX revision → PDF → page images

Also perform a structural check after visual changes so that styling fixes do not accidentally remove content or break document semantics.

## Failure handling

If rendering is unavailable, do not claim visual QA was completed. Perform the strongest structural checks available and clearly distinguish them from visual inspection.
