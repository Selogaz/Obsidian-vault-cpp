---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - 9-slice tecnique
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-06-14T15:22:42+03:00
updated: 2026-06-22T01:23:41+03:00
---

**9-slice tecnique**
—
the 4 corners stay fixed-size, only
the flat edges and center stretch. We'll keep the existing art style but drive it
through `border-image`.

A blocker for slicing the current SVG directly: it bakes in a soft Gaussian-blur
**glow halo** (`filter0_f`, full 216×104 region). `border-image-slice` measures from
the raw image edge, so the glow contaminates the corner slices. We therefore need a
**glow-free plaque SVG** to slice, and re-add the glow with a CSS `drop-shadow`.
