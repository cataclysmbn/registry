# Cataclysm: Bright Nights Mod Registry

![index page](index.webp)

> [!CAUTION]
> Work In Progress: Expect frequent breaking changes

The central, community-driven mod registry for
[Cataclysm: Bright Nights](https://github.com/cataclysmbn/Cataclysm-BN).

## For Players

Browse available mods at
[cataclysmbn.github.io/registry](https://cataclysmbn.github.io/registry).

## For Mod Authors

See the [submission guide](./site/docs/submit.md) for detailed instructions.

## Data Repository

Manifests and generated index files live in
[cataclysmbn/registry-index](https://github.com/cataclysmbn/registry-index) and are
tracked here as a submodule. When cloning this repository locally, use:

```bash
git clone --recurse-submodules https://github.com/cataclysmbn/registry.git
```

To modify registry-index, fork
[cataclysmbn/registry-index](https://github.com/cataclysmbn/registry-index), commit manifest changes there, and open a pull request to `cataclysmbn/registry-index`.

Do not submit manifest/index changes to this `registry` repository; it only hosts the site and tooling.

To keep the submodule on the latest commit:

```bash
git -C registry-index fetch origin main
git -C registry-index checkout -B main origin/main
```

## Credits

Structure inspired by
[Endless Sky Plugins](https://github.com/endless-sky/endless-sky-plugins).

## License

[AGPL-3.0-only](./LICENSE)
