rm _build -rf && uv run jb build ./ --builder=html --toc=_resume_toc.yml --config=_resume_config.yml && uv run python make_resume_view.py
