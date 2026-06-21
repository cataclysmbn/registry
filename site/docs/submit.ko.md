---
layout: base.tsx
title: 모드 제출
id: docs-submit
lang: ko
url: /docs/submit/
---

# 저장소에 모드 제출하기

다음 단계에 따라 모드를 등록할 수 있습니다.

## 사전 준비

- 모드는 GitHub(또는 다른 git 호스트)에 있어야 합니다.
- Pull Request를 만들 GitHub 계정이 필요합니다.

## 1단계: registry-index 포크

1. [github.com/cataclysmbn/registry-index](https://github.com/cataclysmbn/registry-index) 이동
2. **Fork** 버튼 클릭

## 2단계: 명세서 파일 생성

### 방법 A: 웹 생성기 (권장)

[Manifest Generator](./generator/)를 사용하면 입력을 도와주고 GitHub 저장소 정보도 자동으로 가져올 수 있습니다.

### 방법 B: CLI fetch 명령

```bash
git clone https://github.com/cataclysmbn/registry.git
git clone https://github.com/YOUR_USERNAME/registry-index.git
cd registry

deno task fetch https://github.com/yourname/your-mod -o ../registry-index/manifests
# 또는
deno task fetch yourname/your-mod -o ../registry-index/manifests
```

### 방법 C: 수동 작성

`registry-index/manifests/your_mod_id.yaml` 파일을 만들어 필수 필드를 채우세요.

## 3단계: 명세서 검증

```bash
deno task validate registry-index/manifests/your_mod_id.yaml
deno task check-urls registry-index/manifests/your_mod_id.yaml
```

## 4단계: Pull Request 제출

1. `registry-index` 포크에서 명세서 파일 커밋
2. 포크 저장소로 푸시
3. `cataclysmbn/registry-index`로 Pull Request 생성

## 참고

- 필수 필드: `schema_version`, `id`, `display_name`, `short_description`, `author`, `license`, `version`, `source.type`, `source.url`
- 모드팩 내부 모드라면 `source.extract_path`를 지정하세요.
- 자동 업데이트가 필요하면 `autoupdate` 블록을 사용하세요.
