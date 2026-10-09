/// <reference lib="dom" />

import { computed } from "@preact/signals"
import { manifestYaml } from "../ManifestGenerator.tsx"
import { t } from "@lingui/core/macro"
import { store } from "./store.ts"

interface ManifestOutputProps {
  copied: boolean
  onCopy: () => void
}

const codeBlock = computed(() => manifestYaml.value)

const issueUrl = computed(() =>
  `https://github.com/cataclysmbn/registry-index/issues/new?${new URLSearchParams({
    template: "manifest.yml",
    title: `manifest: ${store.id}`,
    manifest: manifestYaml.value,
  })}`
)

/**
 * Output section showing the generated YAML manifest.
 */
export const ManifestOutput = (
  { copied, onCopy }: ManifestOutputProps,
) => {
  return (
    <aside class="manifest-output">
      <div class="output-header">
        <h3>{t`Generated Manifest`}</h3>
        <button type="button" class="button is-secondary" onClick={onCopy}>
          {copied ? t`✓ Copied!` : t`Copy`}
        </button>
        <a class="button is-primary" href={issueUrl.value} target="_blank" rel="noopener">
          {t`Submit`}
        </a>
      </div>
      <pre>
        <code>{codeBlock.value}</code>
      </pre>
    </aside>
  )
}
