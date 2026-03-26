import { assertEquals } from "@std/assert"
import * as v from "valibot"
import { ModManifest } from "./manifest.ts"

Deno.test("ModManifest parses documented autoupdate substitution fields", () => {
  const manifest = v.parse(ModManifest, {
    schema_version: "1.0",
    id: "example_mod",
    display_name: "Example Mod",
    short_description: "Example description",
    author: ["Example Author"],
    license: "MIT",
    version: "1.0.0",
    homepage: "https://github.com/example/example-mod",
    source: {
      type: "github_archive",
      url: "https://github.com/example/example-mod/archive/refs/tags/v1.0.0.zip",
    },
    autoupdate: {
      type: "tag",
      update_url: "https://github.com/example/example-mod",
      url: "https://github.com/example/example-mod/archive/refs/tags/$version.zip",
      icon_url: "https://raw.githubusercontent.com/example/example-mod/$commit_sha/icon.png",
      commit_sha: "$commit_sha",
      regex: "^v",
    },
  })

  assertEquals(
    manifest.autoupdate?.url,
    "https://github.com/example/example-mod/archive/refs/tags/$version.zip",
  )
  assertEquals(
    manifest.autoupdate?.icon_url,
    "https://raw.githubusercontent.com/example/example-mod/$commit_sha/icon.png",
  )
  assertEquals(manifest.autoupdate?.commit_sha, "$commit_sha")
})
