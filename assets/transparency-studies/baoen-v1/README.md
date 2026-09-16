# 报恩寺塔透明底样本

按用户本次明确选择，用本地脚本试做一张透明副本。原件 `assets/colored/baoen.png` 完整保留，正式图版清单及网页选图未替换。

- [透明 PNG](baoen-transparent.png)：1024 × 1536，RGBA，透明区域占 67.16%。尺寸、构图及所有 RGB 数值与原图一致，只新增 alpha 通道。
- [深浅背景对照](comparison.png)：同一透明 PNG 分别叠在米白色和炭灰色背景上。
- [处理与核验记录](baoen-transparent.json)：参数、人工确认的背景种子点、输入输出 SHA-256、目检结果。

## 复现

需要 Python 3、NumPy、Pillow。在仓库根目录运行；输出文件名需尚不存在：

```bash
python3 -B scripts/extract-transparent-background.py \
  assets/colored/baoen.png \
  assets/transparency-studies/baoen-v2/baoen-transparent.png \
  --tolerance 12 \
  --seed 479,182 --seed 544,185 --seed 409,183 --seed 613,186
```

脚本从画布边缘识别近黑底色，只清除连通背景。四个手工确认的种子点补充清除塔顶细链围住的空气区域，门窗和塔刹内部暗部保留。未重绘、调色或模糊图片。

已检查完整图与塔顶放大图在深浅背景下的效果，并验证透明通道、原件哈希及 RGB 一致性。边缘使用二值透明度，保留原有细深色轮廓；大幅放大时仍可见像素边缘，未重建原黑底中丢失的亚像素抗锯齿信息。此方法的参数和种子点仅验证了本图，不能直接视为其他图版的验收结果。

PNG 仍受仓库图片忽略规则约束，需随本地素材另行保管。
