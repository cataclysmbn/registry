---
layout: base.tsx
title: マニフェストジェネレーター
description: BN Modレジストリ向けYAMLマニフェスト生成ツール
id: docs-generator
lang: ja
url: /docs/generator/
---

<link rel="stylesheet" href="/manifest-generator.css" hash />

<h1>マニフェストジェネレーター</h1>

<p>
  このツールで、レジストリ投稿用のマニフェストYAMLを生成できます。
  フィールドを手入力するか、<code>modinfo.json</code> をアップロードするか、
  GitHub リポジトリから情報を取得できます。
</p>

<p>
  <strong>投稿</strong> をクリックすると、<code>registry-index</code> にマニフェスト入力済みのGitHub Issue作成画面が開きます。
  <strong>Create</strong> をクリックすると、ボットがマニフェストを検証し、メンテナーがレビューするPull Requestを作成します。
  Issueは公開されます。検証に失敗するとボットがエラーをコメントするので、Issueを編集して再検証させてください。
  詳しくは <a href="/ja/docs/submit/">投稿ガイド</a> を参照してください。
</p>

<div id="manifest-generator">
  <noscript>
    <p>マニフェストジェネレーターにはJavaScriptが必要です。</p>
  </noscript>
</div>

<script type="module" src="/app/main.js"></script>
