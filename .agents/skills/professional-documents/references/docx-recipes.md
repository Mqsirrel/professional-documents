# DOCX Engineering & Design Recipes

This reference provides production-ready code patterns, OpenXML snippets, and concrete design tokens for creating high-taste DOCX documents using `python-docx`.

---

## 1. Concrete Design Tokens

### Typographic Scale & Spacing

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
> **The Anti-Orphan Rule**: Every heading paragraph MUST have `keep_with_next = True`. Never leave a heading stranded alone at the bottom of a page without at least its first following paragraph.

### Page Margins & Geometry

| Preset | Top | Bottom | Left | Right | Header | Footer | Recommended Use Case |
|---|---|---|---|---|---|---|---|
| **Executive** | 0.75" | 0.75" | 0.8" | 0.8" | 0.4" | 0.4" | Business briefs, strategy decks, corporate reports |
| **Academic** | 1.0" | 1.0" | 1.25" | 1.0" | 0.5" | 0.5" | Research papers, university theses, formal reports |
| **Compact** | 0.6" | 0.6" | 0.65" | 0.65" | 0.35" | 0.35" | Roadmaps, curriculum overviews, cheat sheets |
| **Standard** | 1.0" | 1.0" | 1.0" | 1.0" | 0.5" | 0.5" | General documentation, policies |

---

## 2. Tested Hex Color Palettes

### Slate Executive (Default Corporate / Strategy)
- **Primary (Headings/Brand)**: `#0F172A` (Slate 900)
- **Secondary (Subheadings)**: `#1E293B` (Slate 800)
- **Accent (Links, Rules, Callout Bars)**: `#2563EB` (Royal Blue)
- **Accent Light (Callout Fills)**: `#EFF6FF` (Blue 50)
- **Body Text**: `#0F172A` (Near Black)
- **Muted Text / Metadata**: `#64748B` (Slate 500)
- **Surface / Zebra Fill**: `#F8FAFC` (Slate 50)
- **Subtle Border**: `#E2E8F0` (Slate 200)
- **Highlight**: `#F59E0B` (Amber)

### Nordic Frost (Modern / Clean / Tech)
- **Primary**: `#1E293B` (Deep Slate)
- **Secondary**: `#334155` (Slate 700)
- **Accent**: `#0284C7` (Sky 600)
- **Accent Light**: `#F0F9FF` (Sky 50)
- **Body Text**: `#1E293B`
- **Muted Text**: `#64748B`
- **Surface**: `#F8FAFC`
- **Subtle Border**: `#E2E8F0`
- **Highlight**: `#0D9488` (Teal)

### Academic Crimson (Formal / University / Institutional)
- **Primary**: `#7F1D1D` (Deep Burgundy)
- **Secondary**: `#991B1B` (Crimson 800)
- **Accent**: `#B91C1C` (Crimson 700)
- **Accent Light**: `#FEF2F2` (Red 50)
- **Body Text**: `#1C1917` (Stone 900)
- **Muted Text**: `#78716C` (Stone 500)
- **Surface**: `#FAF8F5` (Warm Ivory)
- **Subtle Border**: `#E7E5E4` (Stone 200)

### Forest Emerald (Sustainability / Energy / Health)
- **Primary**: `#14532D` (Forest Green)
- **Secondary**: `#166534` (Green 800)
- **Accent**: `#059669` (Emerald 600)
- **Accent Light**: `#ECFDF5` (Mint 50)
- **Body Text**: `#0F172A`
- **Muted Text**: `#64748B`
- **Surface**: `#F7F9F6` (Sage Tint)
- **Subtle Border**: `#E2E8F0`

---

## 3. Essential OpenXML Recipes for `python-docx`

### 3.1 Repeat Table Header Across Pages
```python
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

header_row = table.rows[0]
trPr = header_row._tr.get_or_add_trPr()
trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
```

### 3.2 Prevent Row From Splitting Across Pages
```python
for row in table.rows:
    trPr = row._tr.get_or_add_trPr()
    trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
```

### 3.3 Set Table Cell Margins (Internal Padding)
```python
# Apply padding across all cells in table (dxa: 20 dxa = 1 pt)
tblPr = table._tbl.tblPr
tblCellMar = parse_xml(
    f'<w:tblCellMar {nsdecls("w")}>\n'
    f'  <w:top w:w="140" w:type="dxa"/>\n'     # 7 pt
    f'  <w:bottom w:w="140" w:type="dxa"/>\n'  # 7 pt
    f'  <w:left w:w="180" w:type="dxa"/>\n'    # 9 pt
    f'  <w:right w:w="180" w:type="dxa"/>\n'   # 9 pt
    f'</w:tblCellMar>'
)
tblPr.append(tblCellMar)
```

### 3.4 Set Cell Background Shading
```python
def set_cell_background(cell, hex_color):
    hex_color = hex_color.lstrip("#")
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:val="clear" w:color="auto" w:fill="{hex_color}"/>')
    tcPr.append(shd)
```

### 3.5 Set Modern Table Horizontal Borders (No Vertical Lines)
```python
tblPr = table._tbl.tblPr
tblBorders = parse_xml(
    f'<w:tblBorders {nsdecls("w")}>\n'
    f'  <w:top w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>\n'
    f'  <w:bottom w:val="single" w:sz="12" w:space="0" w:color="2563EB"/>\n'
    f'  <w:left w:val="none"/>\n'
    f'  <w:right w:val="none"/>\n'
    f'  <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>\n'
    f'  <w:insideV w:val="none"/>\n'
    f'</w:tblBorders>'
)
tblPr.append(tblBorders)
```

### 3.6 Create a Callout Box (Left Accent Border + Tinted Fill)
```python
def add_callout(doc, text, title=None, accent_hex="2563EB", bg_hex="EFF6FF"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.autofit = False
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.8)
    
    # Background
    set_cell_background(cell, bg_hex)
    
    # Left border only (sz=36 is 4.5pt)
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>\n'
        f'  <w:top w:val="none"/>\n'
        f'  <w:left w:val="single" w:sz="36" w:space="0" w:color="{accent_hex}"/>\n'
        f'  <w:bottom w:val="none"/>\n'
        f'  <w:right w:val="none"/>\n'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    # Padding
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>\n'
        f'  <w:top w:w="160" w:type="dxa"/>\n'
        f'  <w:bottom w:w="160" w:type="dxa"/>\n'
        f'  <w:left w:w="200" w:type="dxa"/>\n'
        f'  <w:right w:w="180" w:type="dxa"/>\n'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)
    
    # Text
    p = cell.paragraphs[0]
    p.paragraph_format.line_spacing = 1.15
    if title:
        rt = p.add_run(title.upper() + "\n")
        rt.font.bold = True
        rt.font.size = Pt(8.5)
        rt.font.color.rgb = hex_to_rgb(accent_hex)
    rtxt = p.add_run(text)
    rtxt.font.size = Pt(9.5)
```

### 3.7 Dynamic Native Page Numbering (Page X of Y)
```python
def add_field(run, field_name):
    fld = parse_xml(f'<w:fldSimple {nsdecls("w")} w:instr="{field_name}"/>')
    run._r.append(fld)

# In footer:
p = footer.paragraphs[0]
p.add_run("Page ")
add_field(p.add_run(), "PAGE")
p.add_run(" of ")
add_field(p.add_run(), "NUMPAGES")
```

### 3.8 Arabic Sakkal Majalla Font & RTL Setting
```python
# Configure Sakkal Majalla as complex script font on run:
def set_arabic_font(run, font_name="Sakkal Majalla", sz_pt=12, bold=False, color_hex="0F172A"):
    rPr = run._r.get_or_add_rPr()
    rPr.append(parse_xml(f'<w:rFonts {nsdecls("w")} w:ascii="{font_name}" w:hAnsi="{font_name}" w:cs="{font_name}"/>'))
    run.font.size = Pt(sz_pt)
    run.font.bold = bold
    run.font.color.rgb = hex_to_rgb(color_hex)
    if rPr.find(qn("w:rtl")) is None:
        rPr.append(parse_xml(f'<w:rtl {nsdecls("w")}/>'))

# For RTL paragraph direction:
pPr = paragraph._p.get_or_add_pPr()
pPr.append(parse_xml(f'<w:bidi {nsdecls("w")}/>'))

# For RTL table visual column flow:
tblPr = table._tbl.tblPr
tblPr.append(parse_xml(f'<w:bidiVisual {nsdecls("w")}/>'))
```

### 3.9 Dark CLI Terminal Command Block
```python
# Jet-black background (#0D1117) with neon terminal green prompt ($)
cell = table.cell(0, 0)
set_cell_background(cell, "0D1117")
p = cell.paragraphs[0]
r_prompt = p.add_run("$ ")
r_prompt.font.name = "Consolas"
r_prompt.font.bold = True
r_prompt.font.color.rgb = hex_to_rgb("3FB950")  # Terminal green
r_cmd = p.add_run("ls -la /var/log")
r_cmd.font.name = "Consolas"
r_cmd.font.color.rgb = hex_to_rgb("E6EDF3")
```

### 3.10 Dashed Screenshot Dropzone Container
```python
# Screenshot dropzone with dashed border and camera glyph
trPr = row._tr.get_or_add_trPr()
trPr.append(parse_xml(f'<w:trHeight {nsdecls("w")} w:val="1600" w:hRule="atLeast"/>'))
tcPr = cell._tc.get_or_add_tcPr()
tcPr.append(parse_xml(
    f'<w:tcBorders {nsdecls("w")}>\n'
    f'  <w:top w:val="dashed" w:sz="6" w:space="0" w:color="9AA4B2"/>\n'
    f'  <w:left w:val="dashed" w:sz="6" w:space="0" w:color="9AA4B2"/>\n'
    f'  <w:bottom w:val="dashed" w:sz="6" w:space="0" w:color="9AA4B2"/>\n'
    f'  <w:right w:val="dashed" w:sz="6" w:space="0" w:color="9AA4B2"/>\n'
    f'</w:tcBorders>'
))
```

---

## 4. Using the Bundled Helper: `docx_craft.py`

Rather than rewriting the low-level XML code every time, downstream agents should directly invoke or import the bundled script:

```bash
# Path: .agents/skills/professional-documents/scripts/docx_craft.py
```

Example agent script:
```python
from docx import Document
from scripts.docx_craft import (
    apply_page_geometry,
    setup_document_styles,
    add_cover_page,
    setup_header_footer,
    add_heading,
    create_styled_table,
    add_callout,
    add_stat_card_row,
    render_and_preview,
)

doc = Document()
apply_page_geometry(doc.sections[0], preset="executive")
palette = setup_document_styles(doc, palette_name="slate_executive", font_preset="modern")

# 1. Cover Page
add_cover_page(
    doc,
    title="Cybersecurity Curriculum Plan",
    subtitle="Degree Roadmap, Course Distribution & Graduation Strategy",
    author_org="Taibah University · Department of Computer Science",
    date_version="Academic Year 2026–2027 · v2.1",
    archetype="executive_stripe",
)

# 2. Running Header & Dynamic Page Numbers
setup_header_footer(
    doc,
    title_left="Taibah University | Cybersecurity Plan",
    doc_info_right="Curriculum Overview",
    show_page_numbers=True,
    suppress_cover_page=True,
)

# 3. Heading (Guaranteed no orphan breaks)
add_heading(doc, "Executive Summary", level=1, subtitle="Key milestones and course distribution")

# 4. Stat Summary Cards
add_stat_card_row(doc, [
    ("10", "Total Terms", "5-year plan"),
    ("134", "Credit Hours", "Accredited"),
    ("52", "Total Courses", "Mandatory & Electives"),
    ("0%", "Current Progress", "Year 1 Entry"),
])

# 5. Callout Box
add_callout(
    doc,
    text="Prerequisites must be strictly completed before registering for Level 5+ specialized security labs.",
    title="Registration Policy Notice",
    kind="warning",
)

# 6. Beautiful Styled Table
headers = ["Code", "Course Name", "Term", "Credits", "Type"]
rows = [
    ["GS 111", "Arabic Language Skills I", 1, 2, "General"],
    ["ENG 101", "English Language Skills I", 1, 4, "Prep"],
    ["MATH 101", "Introduction to Mathematics", 1, 3, "Core"],
]
create_styled_table(doc, headers, rows, col_widths=[1.0, 3.2, 0.8, 0.8, 1.0])

doc.save("output.docx")

# 7. Automated Headless PDF & Visual Image Generation
pdf_path, image_paths = render_and_preview("output.docx")
print(f"Generated PDF: {pdf_path}")
print(f"Generated {len(image_paths)} page preview images.")
```
