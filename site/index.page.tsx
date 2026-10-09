import { i18n } from "@lingui/core"
import { t } from "@lingui/core/macro"
import { ModCard } from "./_includes/ModCard.tsx"
import { getListedModSummary } from "./_includes/listedMods.ts"
import type { ModPageData } from "./_includes/types.ts"
import { messages as enMessages } from "./app/locales/en/messages.ts"
import { messages as jaMessages } from "./app/locales/ja/messages.ts"
import { messages as koMessages } from "./app/locales/ko/messages.ts"

export const layout = "base.tsx"
export const title = "Home"
export const id = "home"
export const lang = ["en", "ko", "ja"]

type Locale = "en" | "ko" | "ja"

const messagesByLocale = {
  en: enMessages,
  ko: koMessages,
  ja: jaMessages,
}

const withLangPrefix = (lang: Locale, path: string): string =>
  lang === "en" ? path : `/${lang}${path === "/" ? "" : path}`

export default ({ search, lang: currentLang = "en" }: Lume.Data) => {
  const lang = currentLang === "ko" || currentLang === "ja" ? currentLang : "en"
  i18n.load(messagesByLocale)
  i18n.activate(lang)
  const modsUrl = withLangPrefix(lang, "/mods/")
  const submitUrl = withLangPrefix(lang, "/docs/submit/")
  const generatorUrl = withLangPrefix(lang, "/docs/generator/")

  const { mods, recentMods } = getListedModSummary(
    search.pages(`mod lang=${lang}`) as ModPageData[],
  )

  return (
    <>
      <header class="hero">
        <h1>{i18n._(t`Cataclysm: Bright Nights Mod Registry`)}</h1>
      </header>

      <main class="content">
        {recentMods.length > 0 && (
          <section id="featured-section">
            <h2>{i18n._(t`Recently Updated Mods`)}</h2>
            <div class="mod-grid">
              {recentMods.map((mod) => (
                <ModCard
                  key={mod.manifest.id}
                  url={mod.url}
                  title={mod.title}
                  manifest={mod.manifest}
                  lang={lang}
                  showCategories
                  updatedAt={mod.sourceUpdatedAt}
                />
              ))}
            </div>
            <p>
              <a href={modsUrl}>{i18n._(t`View all ${mods.length} mods`)}</a>
            </p>
          </section>
        )}

        <noscript>
          <p>
            <a href={modsUrl}>{i18n._(t`View All Mods`)}</a>{" "}
            {i18n._(t`(JavaScript required for category filtering)`)}
          </p>
        </noscript>

        <section>
          <h2>{i18n._(t`For Mod Authors`)}</h2>
          <p>
            {i18n._(t`Want to add your mod to the registry? Check out our`)}{" "}
            <a href={submitUrl}>{i18n._(t`submission guide`)}</a>.
          </p>

          <h3>{i18n._(t`Quick Start`)}</h3>
          <ol>
            <li>
              <strong>
                {i18n._(t`Use the`)} <a href={generatorUrl}>{i18n._(t`Manifest Generator`)}</a>
              </strong>{" "}
              {i18n._(t`to create your manifest file`)}
            </li>
            <li>{i18n._(t`Click Submit to open a prefilled GitHub issue`)}</li>
            <li>{i18n._(t`A bot validates the manifest and opens the pull request`)}</li>
          </ol>

          <p style={{ marginTop: "1rem" }}>
            <a href={generatorUrl} class="btn-primary">
              {i18n._(t`Open Manifest Generator`)}
            </a>
          </p>
        </section>

        <section>
          <h2>{i18n._(t`Links`)}</h2>
          <ul>
            <li>
              <a href="https://cataclysmbn.org/">{i18n._(t`Cataclysm: Bright Nights`)}</a>
            </li>
            <li>
              <a href="https://github.com/cataclysmbn/registry">{i18n._(t`Registry on GitHub`)}</a>
            </li>
            <li>
              <a href="https://github.com/cataclysmbn/registry/issues">
                {i18n._(t`Report an Issue`)}
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}
