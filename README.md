# 访古

A line-drawn record of thirty-two ancient Chinese buildings I have visited — halls, pagodas and one grotto, Tang to Qing.

以实测立面的笔意，记下走过的三十二处古迹。每一张线稿都由程序按参数生成：开间、柱高、斗拱、屋顶类型、塔的层数与收分，再对照正面照片校正比例。页面另有按经纬度画的行迹图与南北两线的年表。

## 打开

纯静态页面，任意静态服务器即可：

```bash
python3 -m http.server 8765
```

然后访问 `http://localhost:8765/`。`proof.html?fig=<id>` 可以单独放大看某一张线稿（id 见 `sites.js`）。

## 结构

- `draft.js` — 制图基元：檐口、垂脊、鸱吻、斗拱、柱廊、台基、悬山 / 歇山 / 庑殿屋顶
- `buildings.js` — 建筑合成器（殿、楼阁、木塔、砖塔、密檐塔、华塔、圆殿、戏台、石窟……）与 SVG 渲染、描画动画
- `sites.js` — 三十二处的内容、年代、地点与绘图参数
- `main.js` — 地图、年表、章节、交互
- `style.css` — 墨底、金线、朱砂的视觉系统
- `assets/` — 外来图版（黑线白底交付，转成金线透明底后使用）

## 说明

线稿为按立面比例意写，非实测图；开间、铺作数与屋顶比例对照正面照片核过，尺寸与年代据文物公布资料。参考照片来自 Wikimedia Commons 与作者自摄。
