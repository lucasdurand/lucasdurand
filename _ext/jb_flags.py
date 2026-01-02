# _ext/jb_flags.py
import os

TAGS = ["resume", "site", "ai"]


def _to_bool(v, default=False):
    if v is None:
        return default
    if isinstance(v, bool):
        return v
    return str(v).strip().lower() in {"1", "true", "t", "yes", "y", "on"}


def setup(app):
    # Register config values so they can be set in _config.yml
    for tag in TAGS:
        app.add_config_value(tag, False, "env")

    def apply_flags(app, config):
        # Process each tag: environment variables take precedence over config file
        for tag in TAGS:
            env_var_name = f"JB_{tag.upper()}"
            env_value = os.getenv(env_var_name)

            # Use env var if set, otherwise fall back to config
            tag_value = (
                _to_bool(env_value)
                if env_value is not None
                else getattr(config, tag, False)
            )

            setattr(config, tag, tag_value)

            # Convert booleans into Sphinx tags for {only}
            if tag_value:
                app.tags.add(tag)

        # Debug output AFTER tags are added
        tag_status = ", ".join([f"{tag}={getattr(config, tag)}" for tag in TAGS])
        print(f"[jb_flags] {tag_status}")
        print(f"[jb_flags] Active tags: {app.tags.tags}")

    app.connect("config-inited", apply_flags)
    return {"version": "0.1", "parallel_read_safe": True}


env_status = ", ".join(
    [f"JB_{tag.upper()}={os.getenv(f'JB_{tag.upper()}')}" for tag in TAGS]
)
print(f"[jb_flags] Loading extension with env: {env_status}")
