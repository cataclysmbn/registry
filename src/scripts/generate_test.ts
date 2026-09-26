import { assertEquals, assertRejects, assertStrictEquals } from "@std/assert"
import { join } from "@std/path"
import type { ModManifest } from "../schema/manifest.ts"
import { applyLastUpdatedFallback, loadManifests } from "./generate.ts"

const createManifest = (overrides: Partial<ModManifest> = {}): ModManifest => ({
  schema_version: "1.0",
  id: "example_mod",
  display_name: "Example Mod",
  short_description: "Example description",
  author: ["Example Author"],
  license: "MIT",
  version: "1.0.0",
  source: {
    type: "github_archive",
    url: "https://github.com/example/repo/archive/refs/heads/main.zip",
  },
  ...overrides,
})

Deno.test("applyLastUpdatedFallback keeps existing manifest last_updated", () => {
  const manifest = createManifest({ last_updated: "2026-02-25T00:00:00.000Z" })
  const result = applyLastUpdatedFallback(manifest, "2026-02-25T04:00:00+09:00")

  assertStrictEquals(result, manifest)
  assertEquals(result.last_updated, "2026-02-25T00:00:00.000Z")
})

Deno.test("applyLastUpdatedFallback uses git timestamp when missing", () => {
  const manifest = createManifest()
  const result = applyLastUpdatedFallback(manifest, "2026-02-25T04:00:00+09:00")

  assertEquals(result.last_updated, "2026-02-25T04:00:00+09:00")
})

Deno.test("applyLastUpdatedFallback uses clock fallback when git timestamp missing", () => {
  const manifest = createManifest()
  const result = applyLastUpdatedFallback(manifest, undefined, () => "2026-02-25T12:34:56.000Z")

  assertEquals(result.last_updated, "2026-02-25T12:34:56.000Z")
})

Deno.test("loadManifests requires full history for manifest timestamps", async () => {
  const root = await Deno.makeTempDir()
  const source = join(root, "source")
  const shallow = join(root, "shallow")
  const git = async (args: string[], env: Record<string, string> = {}) => {
    const output = await new Deno.Command("git", {
      args,
      env,
      stdout: "piped",
      stderr: "piped",
    }).output()
    assertEquals(output.success, true, new TextDecoder().decode(output.stderr))
  }

  try {
    await git(["init", "-q", source])
    await Deno.mkdir(join(source, "manifests"))
    await Deno.writeTextFile(
      join(source, "manifests", "example_mod.json"),
      JSON.stringify(createManifest()),
    )
    await git(["-C", source, "add", "manifests"])
    const commit = async (date: string, message: string) => {
      await git(
        [
          "-C",
          source,
          "-c",
          "user.name=Test",
          "-c",
          "user.email=test@example.org",
          "commit",
          "-qm",
          message,
        ],
        { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
      )
    }
    await commit("2025-01-01T00:00:00Z", "Add manifest")
    await Deno.writeTextFile(join(source, "README.md"), "Unrelated change\n")
    await git(["-C", source, "add", "README.md"])
    await commit("2025-01-02T00:00:00Z", "Update README")

    await git(["clone", "-q", "--depth=1", `file://${source}`, shallow])
    await assertRejects(
      () => loadManifests(join(shallow, "manifests")),
      Error,
      "history for",
    )
    const [manifest] = await loadManifests(join(source, "manifests"))
    assertEquals(manifest.last_updated, "2025-01-01T00:00:00Z")
  } finally {
    await Deno.remove(root, { recursive: true })
  }
})
