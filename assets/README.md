# assets

Hand-drawn or AI-drawn plates that replace a generated elevation.

Reference one from `sites.js`:

```js
image: { src: 'assets/longmen.png', alt: '奉先寺卢舍那大佛线稿', width: 2400, height: 1500 }
```

- Deliver black lines on white; convert to gold-on-transparent before committing
  (line darkness → alpha, RGB = 214,171,92) and set `tint: false` — the CSS
  blend fallback for untouched files breaks inside stacking contexts.
- Landscape plates around 16:10; tall plates (towers) around 7:10.
