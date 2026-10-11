---
layout: base.tsx
title: 명세서 생성기
description: BN 모드 저장소용 YAML 명세서 파일 생성 도구
id: docs-generator
lang: ko
url: /docs/generator/
---

<link rel="stylesheet" href="/manifest-generator.css" hash />

<h1>명세서 생성기</h1>

<p>
  이 도구로 저장소에 제출할 모드 명세서 YAML 파일을 생성할 수 있습니다.
  필드를 직접 입력하거나, <code>modinfo.json</code> 파일을 업로드하거나,
  GitHub 저장소에서 정보를 가져올 수 있습니다.
</p>

<p>
  <strong>제출</strong>을 누르면 <code>registry-index</code>에 명세서가 채워진 GitHub 이슈 작성 화면이 열립니다.
  <strong>Create</strong>를 누르면 봇이 명세서를 검증하고, 관리자가 검토할 Pull Request를 엽니다.
  이슈는 공개됩니다. 검증에 실패하면 봇이 오류를 댓글로 남기며, 이슈를 수정하면 다시 검증합니다.
  자세한 내용은 <a href="/ko/docs/submit/">제출 안내</a>를 참고하세요.
</p>

<div id="manifest-generator">
  <noscript>
    <p>명세서 생성기를 사용하려면 JavaScript가 필요합니다.</p>
  </noscript>
</div>

<script type="module" src="/app/main.js"></script>
