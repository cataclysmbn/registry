---
layout: base.tsx
title: Mod投稿
id: docs-submit
lang: ja
url: /docs/submit/
---

# レジストリへModを投稿する

以下の手順でModを登録できます。

## 事前準備

- ModはGitHub（または他のgitホスト）で公開されている必要があります。
- Pull Request作成用のGitHubアカウントが必要です。

## ステップ1: registry-indexをfork

1. [github.com/cataclysmbn/registry-index](https://github.com/cataclysmbn/registry-index) を開く
2. **Fork** をクリック

## ステップ2: マニフェスト作成

### 方法A: Webジェネレーター（推奨）

[Manifest Generator](./generator/) を使うと、入力支援とGitHub情報の自動取得ができます。

### 方法B: CLI fetch コマンド

```bash
git clone https://github.com/cataclysmbn/registry.git
git clone https://github.com/YOUR_USERNAME/registry-index.git
cd registry

deno task fetch https://github.com/yourname/your-mod -o ../registry-index/manifests
# または
deno task fetch yourname/your-mod -o ../registry-index/manifests
```

### 方法C: 手動作成

`registry-index/manifests/your_mod_id.yaml` を作成し、必要フィールドを記入します。

## ステップ3: マニフェスト検証

```bash
deno task validate registry-index/manifests/your_mod_id.yaml
deno task check-urls registry-index/manifests/your_mod_id.yaml
```

## ステップ4: Pull Request 作成

1. `registry-index` forkでマニフェストをコミット
2. fork先へpush
3. `cataclysmbn/registry-index`へPull Requestを作成

## 補足

- 必須フィールド: `schema_version`, `id`, `display_name`, `short_description`, `author`, `license`, `version`, `source.type`, `source.url`
- Modpack内Modは `source.extract_path` を指定してください。
- 自動更新を使う場合は `autoupdate` ブロックを追加してください。
