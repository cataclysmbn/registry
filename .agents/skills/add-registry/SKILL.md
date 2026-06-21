---
name: add-registry
description: Add or update Cataclysm: Bright Nights mod registry manifests, especially entries that should appear on mods.cataclysmbn.org.
---

# Add Registry Manifest

Use this skill when adding or updating files under `registry-index/manifests`.

## Workflow

1. Fork `cataclysmbn/registry-index` and branch from its `main`; do not push manifest/index changes to `cataclysmbn/registry`.
2. Confirm the source repo, mod folder, `modinfo.json`, license, version, Lua usage, dependencies, and parent/submod relationship from source files.
3. Add or edit the YAML manifest in `manifests/` using the manifest `id` as the filename.
4. Run the registry validation tooling against the `registry-index` checkout.
5. Commit only the intended manifest/source changes. Do not include generated file noise unless the task explicitly asks for generated outputs.
6. Open a pull request to `cataclysmbn/registry-index`.
7. If the user expects the entry on `https://mods.cataclysmbn.org`, wait for the registry-index PR to merge, the registry site deploy to complete, and the canonical live URL to verify before saying it is live.
8. If the deploy is not completed and verified, state that the change is PR-only, pushed-only, or local-only and not visible on the live site yet.
