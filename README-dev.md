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

`uv run jb build ./ --builder=pdfhtml --toc=_resume_toc.yml`

This may overwrite the `index.html` from the "real site", so be careful to re-generate that before deploying

## Deploy to Github Pages

When changes are ready to deploy, deploy!

`uv run ghp-import _build/html -pon` deployment to the gh-pages branch, served from github.io and available behind https://lucasdurand.xyz. This should trigger a realtime update to the site. **Be sure to include the -n flag, or else the site won't render properly**
