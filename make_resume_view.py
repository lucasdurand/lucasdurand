import os
import yaml
from bs4 import BeautifulSoup

# -----------------------------------------------------
# CONFIGURATION
# -----------------------------------------------------
TOC_FILE = "_resume_toc.yml"  # <--- SET YOUR TOC FILE HERE
ROOT = "."
BUILD = os.path.join(ROOT, "_build", "html")
# -----------------------------------------------------


def toc_to_files(toc: dict):
    """Return a list of HTML file paths (relative to _build/html) in TOC order."""
    files = []

    # 1) Root page
    root = toc.get("root")
    if root:
        files.append(root if root.endswith(".html") else root + ".html")

    # 2) Parts / chapters / nested sections (jb-book 1.x)
    def visit_chapter(ch):
        f = ch.get("file")
        if f:
            files.append(f if f.endswith(".html") else f + ".html")
        for sec in ch.get("sections", []):
            visit_chapter(sec)

    for part in toc.get("parts", []):
        for ch in part.get("chapters", []):
            visit_chapter(ch)

    # Deduplicate while preserving order
    seen = set()
    out = []
    for f in files:
        if f not in seen:
            seen.add(f)
            out.append(f)
    return out


# ---- Load TOC ----
toc_path = os.path.join(ROOT, TOC_FILE)
if not os.path.exists(toc_path):
    raise SystemExit(f"TOC file '{TOC_FILE}' not found.")

with open(toc_path, encoding="utf-8") as f:
    toc = yaml.safe_load(f)

files = toc_to_files(toc)
if not files:
    raise SystemExit("No HTML files derived from TOC.")

print("Files in TOC:")
for f in files:
    print("  -", f)

# ---- Choose the base page ----
base_file_path = None
for fname in files:
    candidate = os.path.join(BUILD, fname)
    if os.path.exists(candidate):
        base_file_path = candidate
        break

if base_file_path is None:
    raise SystemExit(
        "None of the files in TOC exist under _build/html. Did you run `jupyter-book build .`?"
    )

print("Using base page:", os.path.relpath(base_file_path, BUILD))

with open(base_file_path, encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Add a body class so CSS can specifically target resume view
body = soup.find("body")
if body is not None:
    classes = body.get("class", [])
    if "resume-view" not in classes:
        classes.append("resume-view")
    body["class"] = classes

# Find the main content root
main = soup.find("main", class_="bd-main")
if not main:
    raise SystemExit("Base page missing <main class='bd-main'>.")

content_root = main.find("div", class_="bd-content")
if not content_root:
    raise SystemExit("Base page missing <div class='bd-content'>.")

content_root.clear()

# -----------------------------------------------------
# Stitch all pages in TOC order into this one document
# -----------------------------------------------------
for fname in files:
    html_path = os.path.join(BUILD, fname)
    if not os.path.exists(html_path):
        print("Skipping missing:", fname)
        continue

    with open(html_path, encoding="utf-8") as f:
        psoup = BeautifulSoup(f, "html.parser")

    pmain = psoup.find("main", class_="bd-main")
    pcontent = pmain.find("div", "bd-content") if pmain else None

    if pcontent is None:
        print("No bd-content in:", fname)
        continue

    section = soup.new_tag("section", **{"class": "resume-section"})

    # Optional: add a section heading from the first h1/h2
    heading = pcontent.find(["h1", "h2"])
    if heading:
        heading.extract()
        section.append(heading)

    # Append all children from the page
    for child in list(pcontent.children):
        section.append(child)

    content_root.append(section)

# -----------------------------------------------------
# Write resume.html next to the base page
# -----------------------------------------------------
base_dir = os.path.dirname(base_file_path)
out_path = os.path.join(base_dir, "resume.html")

with open(out_path, "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Wrote", os.path.relpath(out_path, ROOT))
