---
layout: base.tsx
title: Manifest Generator
description: Generate mod manifest YAML files for the BN Mod Registry
id: docs-generator
lang: en
url: /docs/generator/
---

<link rel="stylesheet" href="/manifest-generator.css" hash />

<h1>Manifest Generator</h1>

<p>
  Use this tool to generate manifest YAML files for submitting mods to the registry.
  You can manually fill in the fields, upload a <code>modinfo.json</code> file,
  or fetch mod info directly from a GitHub repository.
</p>

<p>
  <strong>Submit</strong> opens a prefilled GitHub issue in <code>registry-index</code>.
  After you click <strong>Create</strong>, a bot validates the manifest and opens the pull request for maintainers to review.
  The issue is public. If validation fails, the bot comments the errors; edit the issue to retry.
  See the <a href="/docs/submit/">submission guide</a>.
</p>

<div id="manifest-generator">
  <noscript>
    <p>JavaScript is required for the manifest generator.</p>
  </noscript>
</div>

<script type="module" src="/app/main.js"></script>
