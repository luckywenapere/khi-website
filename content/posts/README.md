# Story posts

Each `*.md` file here (except this README) becomes a story at `/stories/<file-name>`.
Posts written in the website portal (`/portal`) are stored in Vercel Blob instead
and merged with these at request time.

Frontmatter (between `---` lines):

```yaml
---
title: "Story title"
date: "2026-10-16"          # YYYY-MM-DD
author: "Kind Humanitarian Initiative"
excerpt: "One or two lines for cards and search results."
image: "/images/stories/<slug>/1.jpg"
imageAlt: "What the cover photo shows"
gallery:
  - "/images/stories/<slug>/2.jpg"
  - "/images/stories/<slug>/3.jpg"
---
```
