# lucasdurand

[![Jupyter Book Badge](https://jupyterbook.org/badge.svg)](http://lucasdurand.xyz)

A little personal resume site built with Jupyter Book

## Development

Get started by installing the environment. You can do this with:

`uv sync`

## Build

After updating the markdown and notebooks that make up the book site, you may want to re-build the site:

`uv run jb build ./`

And in the case of building a _resume-style_ version, you can create a single-page html that is saved as pdf with:

`rm _build -rf && uv run jb build ./ --builder=html --toc=_resume_toc.yml --config=_resume_config.yml && uv run python make_resume_view.py`

- This will overwrite the `index.html` from the "real site"

## Deploy to Github Pages

This happens via Github Actions now!
