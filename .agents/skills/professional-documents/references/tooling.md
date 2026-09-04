# Tooling Strategy & Execution Commands

Use the environment's installed tools rather than assuming a specific stack.

## 1. DOCX Creation & python-docx Execution

Run python scripts using `uv` with ephemeral dependency injection so no system-wide package installation is required:

```bash
uv run --with python-docx python3 generate_doc.py
```

### Pre-packaged Craft Helper
Downstream agents can directly import or run the bundled helper engine:
```bash
# Path: .agents/skills/professional-documents/scripts/docx_craft.py
```
It handles:
- Page geometry presets (Executive 0.75", Academic 1.0", Compact 0.6")
- Typography styles and line spacing (1.2x body, bold display headings)
- Table engineering (cell margins, repeating headers, anti-split rows, subtle borders)
- Highlight callout boxes (accent border, background fill, padding)
- Dynamic Word page numbers (`Page X of Y` via native OpenXML fields)
- Cover page archetypes (Executive Stripe, Academic Clean, Minimalist Modern)

See `references/docx-recipes.md` for complete code patterns and OpenXML snippets.

## 2. Headless PDF Rendering

Convert DOCX to PDF without opening a GUI using LibreOffice:

```bash
soffice --headless --convert-to pdf document.docx --outdir output/
# or
libreoffice --headless --convert-to pdf document.docx --outdir output/
```

## 3. High-Resolution Page Image Extraction

Extract PNG images of each rendered page at 150 DPI for visual inspection:

```bash
pdftoppm -png -r 150 output/document.pdf output/pages/page
```

Output files will be named `page-1.png`, `page-2.png`, etc.

## 4. Visual Inspection Workflow

A standard automated inspection loop:

```python
from scripts.docx_craft import render_and_preview

# Automatically renders DOCX -> PDF -> PNG images
pdf_path, image_paths = render_and_preview("my_report.docx", output_dir="output")
```

Inspect generated PNGs with visual tools (`view_file`). Check for:
- Cover page balance and negative space
- Absence of orphan headings at page bottoms
- Table header row repetition on subsequent pages
- Scannability and generous cell padding
- Callout box placement and contrast
- Correct dynamic page numbering (`Page X of Y`)

## 5. Failure Handling

If LibreOffice is unavailable:
1. Do not claim visual QA was completed.
2. Perform structural checks (validate XML, inspect paragraph properties, confirm `keep_with_next` on all headings).
3. Clearly inform the user that structural verification passed while visual rendering requires LibreOffice.
