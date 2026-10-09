export const issueSubmission = (id: string, manifest: string) => {
  const formUrl = "https://github.com/cataclysmbn/registry-index/issues/new?template=manifest.yml"
  const url = `${formUrl}&${new URLSearchParams({
    title: `manifest: ${id}`,
    manifest,
  })}`
  const prefilled = url.length <= 8000
  return { url: prefilled ? url : formUrl, prefilled }
}
