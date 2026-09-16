# 历史任务快照：STYLE.md（2026-09-15）

本文保存原 `assets/research/STYLE.md` 的批次执行指令，供追溯使用。下文的授权、代理分工、工作目录、进度与工具参数仅描述当时任务，不作为新任务的授权或长期开发规则。原文中的路径沿用当时语境。当前规则见上一级目录中的 `STYLE.md`，项目规则见根目录 `AGENTS.md`。

---

# 访古线稿重绘规范

使用内置 image_gen，每个图版独立生成。所有图版使用同一母版：`assets/references/longmen-style-black.png`（从现有卢舍那图透明度直接提取的黑线白底参考），另有实际暗底预览 `assets/references/longmen-style-preview.png`。

## 统一提示词

Use case: style-transfer. Asset type: a single fine-line architectural illustration for the Chinese heritage collection 访古.
Image 1 is the STYLE MASTER, an existing Vairocana Buddha contour drawing. Match its elegant, delicate, slightly organic thin lines, restrained detail, generous blank areas, and consistent visual density. Image 2 (and subsequent photos if applicable) is SUBJECT GEOMETRY ONLY: draw the actual named monument in that reference, preserving its identifying silhouette, roof type, visible storey count, bay count, openings, and proportions.
Create a refined, sparse BLACK INK ON PURE WHITE line drawing. Use confident fine contours with a few finer internal structural lines. All surfaces remain WHITE; use outlines for doors and windows rather than dark fills. No solid shadows, no broad grey shading, no crosshatching, no pencil grain, no texture, no gradient. No color, no gold, no black background. The white will become transparent and the ink the relevant dynasty color in the website.
Show the complete monument, centered, approximately straight-on at facade level, with verticals vertical and minimal perspective. Use only a few short ground lines. Remove tourists, foliage, vehicles, wires, modern signage, fences obstructing the structure, neighboring distractions and sky. Preserve architectural ornament selectively, without filling every roof tile or brick. No invented features. No labels, letters, calligraphy, dimension lines, captions, watermark, frame or border.
Wide compositions: landscape 1536×1024, entire building occupies about 82% of canvas width, roof/apex and base uncut, balanced breathing room. Tall pagodas: portrait 1024×1536, entire pagoda occupies about 82% of height, centred with equal side margins, apex and base uncut.

## 工作与交付

- 每处先在网上找并检查可识别的正面/接近正面照片，优先 Wikimedia Commons 或文博来源；保存到 `assets/references/<id>-photo.<ext>`。不得把仅提示词当作照片。
- 输入图片先用 view_image 检查；每次 imagegen 都传母版与该处照片，并明确角色；母版不可作为建筑的形状参考。
- 两座建筑并列的原图（kaiyuan、xian、yuanqi）需要各主体的照片，保持组合；不漏任何主体。
- 输出先保存到 `assets/generated/<id>.png`（黑线白底原始生成文件），无需处理色彩；主 agent 统一转朝代配色透明底。
- 每张保存 `assets/research/<id>.json`：id、subject、source_page、image_url、reference_files、source_note（视角/历史依据）、prompt（完整最终提示词）、generated_file、generation_tool、dimensions。
- 每张生成后查看实际图像，检查形状、数量、裁切和统一风格。错误要针对性重绘。
- 不修改 sites.js、main.js、style.css、README.md 等共享代码。不得提交 git。
- 使用内置工具，不使用 CLI/API fallback。每个 image_gen call 设置 120 秒 yield，未完成时可继续工具独立工作。生成结果用 generatedImage 展示，需保存实际生成文件路径。

## 朝代配色

线描风格统一，颜色保留项目原有朝代区分。交付色由 `sites.js` 的 DYN 映射与 `style.css` 色板共同决定，首页斗拱沿用唐金色；不要再把全套图版统一成金色。历史 JSON 中的 prompt 保留实际生成时原文，最终着色在交付脚本中完成。

## 追加朝代

东汉使用赭石 `--ochre: #b79d77`，北魏使用藕紫 `--plum: #ac8fa6`。原有唐、五代、宋、辽金、元、明清配色不变。图版年代按所绘现存主体判断；创建、壁画、重修纪年分别注明，不把传说建寺年直接作为木构年代。

近现代使用灰银 `--silver: #a6b0b4`。当代重建建筑按现存主体年代登记，并另行交代古建沿革与仿古形制；不因仿唐外观而纳入唐代遗构。

北齐使用玫瑰紫 `--rose: #bf8390`，与北魏藕紫分别显示。响堂山按所绘北齐造像主体断代，不把寺院后世建筑归入北齐。

## 日本古建筑

同样以卢舍那母版与当地建筑真实照片为输入，不套用中国建筑形制。日本现存主体使用各自时代而非中国朝代：飞鸟`--jp-asuka: #c2ad78`、奈良`--jp-nara: #9caa76`、平安`--jp-heian: #b79aca`、镰仓`--jp-kamakura: #68a6ad`、江户`--jp-edo: #bd8e7b`。国别为JP，省级地区用京都府、奈良县等都道府县。创建、现存建筑、修缮年代分别记载。时代分界参见`japan-periods.json`。

南朝使用暖褐 `--clay: #b58d67`，对应新昌齐梁石弥勒。五代与十国共用原灰紫，现存主体若属吴越或南唐，条目明确政权；年表保留与北宋交叠。
