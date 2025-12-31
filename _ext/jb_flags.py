# _ext/jb_flags.py
import os

def _to_bool(v, default=False):
    if v is None:
        return default
    if isinstance(v, bool):
        return v
    return str(v).strip().lower() in {"1", "true", "t", "yes", "y", "on"}

def setup(app):
    # Register config values so they can be set in _config.yml
    app.add_config_value("resume", False, "env")
    app.add_config_value("site", False, "env")

    def apply_flags(app, config):
        # Environment variables take precedence over config file
        resume_env = os.getenv("JB_RESUME")
        site_env = os.getenv("JB_SITE")
        
        # Use env var if set, otherwise fall back to config
        resume = _to_bool(resume_env) if resume_env is not None else getattr(config, "resume", False)
        site = _to_bool(site_env) if site_env is not None else getattr(config, "site", False)

        config.resume = resume
        config.site = site

        # Convert booleans into Sphinx tags for {only}
        if resume:
            app.tags.add("resume")
        if site:
            app.tags.add("site")

        # Debug output AFTER tags are added
        print(f"[jb_flags] resume={resume}, site={site}")
        print(f"[jb_flags] Active tags: {app.tags.tags}")

    app.connect("config-inited", apply_flags)
    return {"version": "0.1", "parallel_read_safe": True}

print(f"[jb_flags] Loading extension with env: JB_RESUME={os.getenv('JB_RESUME')}, JB_SITE={os.getenv('JB_SITE')}")
