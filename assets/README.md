# assets

Hand-drawn or AI-drawn plates that replace a generated elevation.

Reference one from `sites.js`:

```js
image: { src: 'assets/longmen.png', alt: '奉先寺卢舍那大佛线稿', width: 2400, height: 1500 }
```

- Black or dark lines on white or transparent background; the page tints them gold.
- Add `tint: false` if the file is already gold-on-transparent.
- Landscape plates around 16:10; tall plates (towers) around 7:10.
