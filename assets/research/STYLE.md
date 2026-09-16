# 访古线稿重绘规范

本文件用于新增或修订线稿的长期制作规则。项目开发约定见 [AGENTS.md](../../AGENTS.md)，入库与验证步骤见 [开发指南](../../docs/development.md)。旧批次的代理分工与工具参数保存在 [历史任务快照](history/line-production-2026-09-15.md)，不适用于新任务。

默认使用内置 imagegen 逐张生成黑线白底 PNG，再由本地脚本去白底并着朝代色，无需 API Key。所有图版使用同一母版：`assets/references/longmen-style-black.png`（从现有卢舍那图透明度直接提取的黑线白底参考），另有实际暗底预览 `assets/references/longmen-style-preview.png`。制作前确认原稿与参考文件在当前工作区可用；仅补齐网页图版不足以重新制图。

## 统一提示词

Use case: style-transfer. Asset type: a single fine-line architectural illustration for the Chinese heritage collection 访古.
Image 1 is the STYLE MASTER, an existing Vairocana Buddha contour drawing. Match its elegant, delicate, slightly organic thin lines, restrained detail, generous blank areas, and consistent visual density. Image 2 (and subsequent photos if applicable) is SUBJECT GEOMETRY ONLY: draw the actual named monument in that reference, preserving its identifying silhouette, roof type, visible storey count, bay count, openings, and proportions.
Create a refined, sparse BLACK INK line drawing on a perfectly flat opaque PURE WHITE (#FFFFFF) background. Use confident fine contours and a few finer internal structural lines. All unmarked surfaces inside and outside the drawing remain pure white; use outlines for doors and windows rather than dark fills. No solid shadows, broad grey shading, crosshatching, pencil grain, paper texture, gradient, color, gold, halo, cast shadow or checkerboard. The white canvas will be removed later by a script; draw only the ink strokes and keep all other regions uniformly white.
Show the complete monument, centered, approximately straight-on at facade level, with verticals vertical and minimal perspective. Use only a few short ground lines. Remove tourists, foliage, vehicles, wires, modern signage, fences obstructing the structure, neighboring distractions and sky. Preserve architectural ornament selectively, without filling every roof tile or brick. No invented features. No labels, letters, calligraphy, dimension lines, captions, watermark, frame or border.
Wide compositions: landscape 1536×1024, entire building occupies about 82% of canvas width, roof/apex and base uncut, balanced breathing room. Tall pagodas: portrait 1024×1536, entire pagoda occupies about 82% of height, centred with equal side margins, apex and base uncut.

## 工作与交付

- 每处先在网上找并检查可识别的正面/接近正面照片，优先 Wikimedia Commons 或文博来源；保存到 `assets/references/<id>-photo.<ext>`。不得把仅提示词当作照片。
- 输入图片先用 view_image 检查；每次 imagegen 都传母版与该处照片，并明确角色；母版不可作为建筑的形状参考。
- 两座建筑并列的原图（kaiyuan、xian、yuanqi）需要各主体的照片，保持组合；不漏任何主体。
- 输出保存到 `assets/generated/<id>.png`（黑线白底的原始生成文件）。逐图 JSON 增加 `background_preparation`，保存 `method: "white-matte-v1"`、原件 `sourceSha256` 和空 `seeds` 数组。`scripts/prepare-plates.mjs` 调用 `scripts/white-matte.py`，验证边缘近纯白、线条基本中性，再把灰度转换为 alpha，去除外部及封闭区域的白纸，按朝代色输出透明线稿。原件不覆盖。已有原生透明图只改 RGB、保留 alpha，旧原件继续按哈希兼容。
- 每张保存 `assets/research/<id>.json`：`id`、`subject`、`source_page`、`image_url`、`author`、`license`、`reference_files`、`source_note`、`prompt`、`generated_file`、`generation_tool`、`dimensions` 和两项字符串组成的 `caption`。来源署名与许可未知时如实注明，多图来源逐张记录。参考 [初祖庵记录](hn_chuzu.json) 的实际字段。
- 历史、断代与现代重建说明附对应资料来源；保存实际生成原件路径及必要生成历史。完整提示词保留实际原文，不事后补写成未曾使用的输入。
- 新增单张查看主体、数量、裁切和线条；白底校验与透明交付通道由脚本检查。棋盘格、非白背景、渐变、明显纸纹或裁切不能直接去底，应针对问题重试。生成原件与脚本副本分别登记，不把副本称为原生透明生成。
- 生成与入库可以在同一任务完成；按当前任务范围更新代码、清单和文档。多人协作时按本次约定划分文件，旧批次中的共享文件禁改规则不作为全项目约束。
- 当前默认使用内置 imagegen，提示词、工具返回原件路径及脚本处理方法如实保存。用户已经授权白底脚本流程，不因旧 API 规则重复索要 Key 或确认。
- 先检查已有输出及生成记录，再决定是否重画。图版入库后核对 `proof.html?fig=<id>`、详情图注、来源页和目录有效性测试，完整操作见开发指南。

## 朝代配色

线描风格统一，颜色保留项目原有朝代区分。交付色由 `sites.js` 的 DYN 映射与 `style.css` 色板共同决定，首页斗拱沿用唐金色。历史 JSON 中的 prompt 保留实际生成时原文，最终着色在交付脚本中完成。下列说明记录各时代色的用途，新增或调整色板时以代码为准并同步此处。

## 追加朝代

东汉使用赭石 `--ochre: #b79d77`，北魏使用藕紫 `--plum: #ac8fa6`。原有唐、五代、宋、辽金、元、明清配色不变。图版年代按所绘现存主体判断；创建、壁画、重修纪年分别注明，不把传说建寺年直接作为木构年代。

近现代使用灰银 `--silver: #a6b0b4`。当代重建建筑按现存主体年代登记，并另行交代古建沿革与仿古形制；不因仿唐外观而纳入唐代遗构。

北齐使用玫瑰紫 `--rose: #bf8390`，与北魏藕紫分别显示。响堂山按所绘北齐造像主体断代，不把寺院后世建筑归入北齐。

## 日本古建筑

同样以卢舍那母版与当地建筑真实照片为输入，不套用中国建筑形制。日本现存主体使用各自时代而非中国朝代：飞鸟`--jp-asuka: #c2ad78`、奈良`--jp-nara: #9caa76`、平安`--jp-heian: #b79aca`、镰仓`--jp-kamakura: #68a6ad`、江户`--jp-edo: #bd8e7b`。国别为JP，省级地区用京都府、奈良县等都道府县。创建、现存建筑、修缮年代分别记载。时代分界参见`japan-periods.json`。

南朝使用暖褐 `--clay: #b58d67`，对应新昌齐梁石弥勒。五代与十国共用原灰紫，现存主体若属吴越或南唐，条目明确政权；年表保留与北宋交叠。

隋代使用青瓷 `--celadon: #90aab6`，用于隋代主体及相应年表标识。初创年代与现存主体不同的条目分别说明。
