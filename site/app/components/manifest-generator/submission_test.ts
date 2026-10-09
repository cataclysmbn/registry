import { assert, assertEquals } from "@std/assert"
import { issueSubmission } from "./submission.ts"

Deno.test("issue submission preserves Unicode YAML and query punctuation", () => {
  const manifest = "id: demo\ndescription: 한국어 日本語 & # + ?\n"
  const result = issueSubmission("demo&labels=wrong", manifest)
  const url = new URL(result.url)
  assertEquals(url.origin, "https://github.com")
  assertEquals(url.pathname, "/cataclysmbn/registry-index/issues/new")
  assertEquals(url.searchParams.get("template"), "manifest.yml")
  assertEquals(url.searchParams.get("title"), "manifest: demo&labels=wrong")
  assertEquals(url.searchParams.get("manifest"), manifest)
  assertEquals(url.searchParams.has("labels"), false)
  assertEquals(result.prefilled, true)
})

Deno.test("issue submission falls back to an empty form for oversized encoded YAML", () => {
  for (
    const manifest of [
      "x".repeat(10000),
      "한".repeat(10000),
      "日".repeat(10000),
    ]
  ) {
    const result = issueSubmission("demo", manifest)
    assert(result.url.length <= 8000)
    assertEquals(result.prefilled, false)
    assertEquals(new URL(result.url).searchParams.get("manifest"), null)
    assertEquals(
      new URL(result.url).searchParams.get("template"),
      "manifest.yml",
    )
  }
})

Deno.test("issue submission includes the full YAML up to its encoded URL boundary", () => {
  const overhead = issueSubmission("demo", "").url.length
  const manifest = "x".repeat(8000 - overhead)
  const result = issueSubmission("demo", manifest)
  assertEquals(result.url.length, 8000)
  assertEquals(result.prefilled, true)
  assertEquals(new URL(result.url).searchParams.get("manifest"), manifest)
  assertEquals(issueSubmission("demo", `${manifest}x`).prefilled, false)
})

Deno.test("issue submission fallback remains bounded for oversized IDs", () => {
  const result = issueSubmission("한".repeat(10000), "id: demo")
  assertEquals(result.prefilled, false)
  assert(result.url.length <= 8000)
})
