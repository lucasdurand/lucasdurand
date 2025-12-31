# _ext/only_heading_html.py
import re

ONLY_FENCE_RE = re.compile(
    r"(^:::\{only\}[^\n]*\n)(.*?)(^:::\s*$)",
    re.MULTILINE | re.DOTALL,
)

MD_H2_RE = re.compile(r"(?m)^\s*##\s+(.+?)\s*$")
MD_H3_RE = re.compile(r"(?m)^\s*###\s+(.+?)\s*$")

def _convert_headings(block_body: str) -> str:
    # Convert ### first, then ##.
    block_body = MD_H3_RE.sub(
        r"```{raw} html\n<h3>\1</h3>\n```\n",
        block_body,
    )
    block_body = MD_H2_RE.sub(
        r"```{raw} html\n<h2>\1</h2>\n```\n",
        block_body,
    )
    return block_body

def on_source_read(app, docname, source):
    text = source[0]

    def repl(m):
        start, body, end = m.group(1), m.group(2), m.group(3)
        return start + _convert_headings(body) + end

    source[0] = ONLY_FENCE_RE.sub(repl, text)

def setup(app):
    app.connect("source-read", on_source_read)
    return {"version": "0.1", "parallel_read_safe": True}
