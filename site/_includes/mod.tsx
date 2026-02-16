import { ModManifest } from "../../mod.ts"
import { colorCodesToHtml, stripColorCodes } from "../../src/utils/color.ts"
import { ModCard, PLACEHOLDER_ICON } from "./ModCard.tsx"

export const layout = "base.tsx"

const HOME_ICON = "/assets/home-icon.svg"
const GITHUB_ICON = "/assets/github-icon.svg"

interface PageData {
  title: string
  manifest: ModManifest
  parentMod?: ModManifest
  submods?: ModManifest[]
  allManifests?: ModManifest[]
  children?: Lume.Data["children"]
}

type UiRelease = {
  label: string
  version: string
  url: string
}

/** Check if a mod ID exists in the registry */
const findModInRegistry = (modId: string, allManifests?: ModManifest[]): ModManifest | undefined =>
  allManifests?.find((m) =>
    m.id.toLowerCase() === modId.toLowerCase() ||
    m.display_name.toLowerCase() === modId.toLowerCase()
  )

const ModTitle = ({ title }: { title: string }) => (
  <h1 dangerouslySetInnerHTML={{ __html: colorCodesToHtml(title) }} />
)

const stripVersionPrefix = (version: string): string =>
  version.startsWith("v") || version.startsWith("V") ? version.slice(1) : version

export default (
  { manifest, parentMod, submods = [], allManifests = [] }: PageData,
  _helpers: Lume.Helpers,
) => {
  const releases: UiRelease[] = [
    { label: `${manifest.version} (current)`, version: manifest.version, url: manifest.source.url },
  ]

  for (const prev of manifest.previous_releases ?? []) {
    releases.push({ label: prev.version, version: prev.version, url: prev.source.url })
  }

  const hasRevisions = releases.length > 1

  const revisionScript = `
     (() => {
       const select = document.getElementById('revision-select')
       const downloadLink = document.getElementById('download-link')
       const installLink = document.getElementById('install-link')
       const versionText = document.getElementById('mod-version')
       const installVersionText = document.getElementById('install-version')

       if (!select || !downloadLink || !versionText) return

       const stripVer = (ver) => (ver.startsWith('v') || ver.startsWith('V')) ? ver.slice(1) : ver
       const apply = () => {
         const option = select.selectedOptions && select.selectedOptions[0]
         if (!option) return
         const url = option.getAttribute('data-url')
         const version = option.getAttribute('data-version')
         if (url) {
           downloadLink.setAttribute('href', url)
           if (installLink) installLink.setAttribute('href', url)
         }
         if (version) {
           const stripped = stripVer(version)
           versionText.textContent = stripped
           if (installVersionText) installVersionText.textContent = stripped
         }
       }

       select.addEventListener('change', apply)
       apply()
     })()
   `

  return (
    <article class="mod-page">
      <header>
        <img
          src={manifest?.icon_url ?? PLACEHOLDER_ICON}
          alt={`${stripColorCodes(manifest.display_name)} icon`}
          class="mod-icon"
          width="160"
          height="160"
        />
        {manifest.homepage
          ? (
            <a
              href={manifest.homepage}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Homepage"
              class="mod-homepage-link"
            >
              <ModTitle title={manifest.display_name} />
              <img
                src={/http(s)?:\/\/(www\.)?github\.com\/.*/.test(manifest.homepage)
                  ? GITHUB_ICON
                  : HOME_ICON}
                alt="(homepage)"
                width="32"
                height="32"
                aria-hidden="true"
              />
            </a>
          )
          : <ModTitle title={manifest.display_name} />}
      </header>

      <aside>
        <dl>
          <dt>Version</dt>
          <dd id="mod-version">{stripVersionPrefix(manifest.version)}</dd>

          {hasRevisions && (
            <>
              <dt>Revision</dt>
              <dd>
                <select id="revision-select" name="revision" aria-label="Select revision">
                  {releases.map((release) => (
                    <option
                      key={release.version}
                      value={release.version}
                      data-version={release.version}
                      data-url={release.url}
                    >
                      {release.label}
                    </option>
                  ))}
                </select>
              </dd>
            </>
          )}

          <dt>Author</dt>
          <dd>{manifest.author.join(", ")}</dd>

          <dt>License</dt>
          <dd>{manifest.license}</dd>

          {manifest.categories && manifest.categories.length > 0 && (
            <>
              <dt>Categories</dt>
              <dd class="mod-categories">
                {manifest.categories.map((category) => (
                  <span class="badge" key={category}>{category}</span>
                ))}
              </dd>
            </>
          )}
        </dl>

        <a
          href={manifest.source.url}
          id="download-link"
          class="button"
        >
          Download
        </a>
      </aside>

      <section class="mod-content">
        <h2>Description</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: colorCodesToHtml(manifest.description || manifest.short_description),
          }}
        />

        <h2>Installation</h2>
        <p>
          Download:{" "}
          <a href={manifest.source.url} id="install-link">
            <span
              dangerouslySetInnerHTML={{ __html: colorCodesToHtml(manifest.display_name) }}
            />{" "}
            <span id="install-version">{stripVersionPrefix(manifest.version)}</span>
          </a>
        </p>
        {manifest.source.extract_path && (
          <p>
            <strong>Note:</strong> Extract the <code>{manifest.source.extract_path}</code>{" "}
            folder from the archive.
          </p>
        )}

        <h2>Compatibility</h2>
        <ul>
          <li>
            <strong>Dependencies:</strong>{" "}
            <DepList deps={manifest.dependencies} allManifests={allManifests} />
          </li>
          <li>
            <strong>Conflicts:</strong>{" "}
            <DepList deps={manifest.conflicts} allManifests={allManifests} />
          </li>
        </ul>

        {manifest.tags && manifest.tags.length > 0 && (
          <>
            <h2>Tags</h2>
            <div class="mod-categories">
              {manifest.tags.map((tag) => <span class="badge" key={tag}>{tag}</span>)}
            </div>
          </>
        )}

        {parentMod && (
          <>
            <h2>Parent Mod</h2>
            <div class="mod-grid related-mods">
              <ModCard
                key={parentMod.id}
                url={`/mods/${parentMod.id}/`}
                title={parentMod.display_name}
                manifest={parentMod}
              />
            </div>
          </>
        )}

        {submods.length > 0 && (
          <>
            <h2>Submods</h2>
            <div class="mod-grid related-mods">
              {submods.map((submod) => (
                <ModCard
                  key={submod.id}
                  url={`/mods/${submod.id}/`}
                  title={submod.display_name}
                  manifest={submod}
                />
              ))}
            </div>
          </>
        )}
      </section>
      {hasRevisions && <script dangerouslySetInnerHTML={{ __html: revisionScript }} />}
    </article>
  )
}

/** Render dependencies/conflicts as clickable links when they exist in registry */
const DepList = (
  { deps, allManifests }: { deps?: Record<string, string>; allManifests: ModManifest[] },
) => {
  const entries = Object.entries(deps ?? {})
  if (entries.length === 0) return <span>None</span>

  return (
    <>
      {entries.map(([modId, version], i) => {
        const foundMod = findModInRegistry(modId, allManifests)
        return (
          <span key={modId}>
            {foundMod
              ? (
                <a href={`/mods/${foundMod.id}/`} class="dep-link">
                  {modId}
                </a>
              )
              : <span>{modId}</span>} <span class="version-constraint">{version}</span>
            {i < entries.length - 1 && ", "}
          </span>
        )
      })}
    </>
  )
}
