# _ext/only_heading_html.py
import re

ONLY_FENCE_RE = re.compile(
    r"(^:::\{only\}[^\n]*\n)(.*?)(^:::\s*$)",
    re.MULTILINE | re.DOTALL,
)
MD_H2_RE = re.compile(r"(?m)^\s*##\s+(.+?)\s*$")
MD_H3_RE = re.compile(r"(?m)^\s*###\s+(.+?)\s*$")
MD_H4_RE = re.compile(r"(?m)^\s*####\s+(.+?)\s*$")
MD_H5_RE = re.compile(r"(?m)^\s*#####\s+(.+?)\s*$")


def _convert_headings(block_body: str) -> str:
    block_body = MD_H5_RE.sub(r"```{raw} html\n<h5>\1</h5>\n```\n", block_body)
    block_body = MD_H4_RE.sub(r"```{raw} html\n<h4>\1</h4>\n```\n", block_body)
    block_body = MD_H3_RE.sub(r"```{raw} html\n<h3>\1</h3>\n```\n", block_body)
    block_body = MD_H2_RE.sub(r"```{raw} html\n<h2>\1</h2>\n```\n", block_body)
    return block_body


def _transform_text(text: str) -> str:
    def repl(m):
        start, body, end = m.group(1), m.group(2), m.group(3)
        return start + _convert_headings(body) + end

    return ONLY_FENCE_RE.sub(repl, text)


def on_source_read(app, docname, source):
    source[0] = _transform_text(source[0])


def on_include_read(app, relative_path, parent_docname, source):
    # Runs for content pulled in via include directives (including MyST `{include}`)
    source[0] = _transform_text(source[0])


def setup(app):
    app.connect("source-read", on_source_read)
    app.connect("include-read", on_include_read)
    return {"version": "0.2", "parallel_read_safe": True}
