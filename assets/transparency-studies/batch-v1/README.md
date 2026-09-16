# 全量透明设色副本 · 已通过用户审阅

本轮用户要求将全部设色图转为透明 AVIF，并明确由用户自行人工检查。处理包含 197 张批量设色和 3 张正式设色原件，原始 PNG 完整保留；线稿已有透明度，继续使用原透明 PNG。

## 产物与入口

- 透明 PNG：`assets/colored-transparent/<id>.png`，只新增 alpha，RGB 与原件一致。
- 网页透明 AVIF：`assets/colored-transparent-avif/<id>.avif`，Q85、4:4:4，保持像素尺寸。
- [处理清单](../../color-research/avif-manifest.json)：原件、透明中间稿和 AVIF 的哈希，提取参数与透明通道校验结果。
- [人工审图页](../../../color-proof.html)：深色／浅色／棋盘格背景；点开单张后对照原设色或线稿，用键盘 ← → 浏览，可按名称、地区或 ID 搜索。

本次 200 张转换成功，批处理约 126.5 秒，透明 AVIF 合计约 46.33 MiB。图片文件被 Git 忽略，需按现有本地素材流程保管。旧暗底 AVIF 位于 `assets/colored-avif/`，页面现已改用透明目录。

## 方法与边界

脚本识别画布边界最常见的色块，以每通道容差 12 提取连通背景。触及画布边界的建筑使用同一规则，不把前景与背景的混合中值用作底色。报恩寺塔沿用已做样本的底色估计和四个明确背景点。其他图的封闭暗区不会被统一删除，需用户审阅后再指定修补。

完成的是自动技术校验：源文件哈希未变、PNG RGB 无损且具有 alpha、AVIF 可解码且尺寸及透明通道有效。转换时全批标记 `visualReview: pending_user`，代理未逐张做视觉检查。2026-09-16 用户明确确认“都没问题 先替换上吧”，现全批标记 `visualReview: approved_user`，验收绑定当时 PNG 与 AVIF 哈希，已用于正式页面；原画历史验收记录保持原样。

## 复现与后续修补

```bash
python3 -B scripts/prepare-colored-avif.py
node scripts/collect-colored-plates.mjs --require-complete
```

依赖 NumPy 和支持 AVIF 的 Pillow。来源、提取规则和编码器未变化的文件按哈希复用；未完成时保存进度以支持恢复。每张的特殊种子点写在转码脚本 `MASK_SETTINGS.overrides`，修改后重跑并更新清单。不能把“文件已生成”写成用户已通过审阅。

新增或重绘古迹改为 imagegen 直接生成透明底 PNG，线稿和设色均适用。这里的抠图仅是已记录旧原件的兼容路径，不作为新图生产方式。
