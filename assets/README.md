# 图版

图片、生成原稿、参考照片与 PDF 暂留本地，不随 Git 推送；目录结构保持不变。仓库保留来源、署名、许可、提示词和图版清单。新克隆需从本地素材副本补齐图片后预览，完整图版测试和重新生成还需要参考照片及原稿。

## 维护入口

- [开发约定](../AGENTS.md) / [开发指南](../docs/development.md)：数据、模块、生成命令与检查范围。
- [线稿规范](research/STYLE.md)：参考、断代、原稿、朝代色转换和目检。
- [设色流程](color-research/WORKFLOW.md)：实物取色、逐图状态、增量队列和交付检查。
- [三张图版正式版确认](color-studies/v1/README.md)：用户接受现用文件，关闭历史修改建议。
- 历史资料：[线稿批次](research/history/line-production-2026-09-15.md)、[设色批次](color-research/history/color-production-2026-09-15.md)、[恢复摘要](color-research/history/recovery-2026-09-15.md)。这些记录不作为新任务的授权或分工。

## 设色图

`colored/` 保存 [设色队列](color-research/queue.json) 中的 PNG 原件，数量以队列及 [技术进度](color-research/progress.json) 为准，另外三张已确认的正式图版保留在 `color-studies/v1/`。批量设色图按现存实物照片区分灰瓦、旧木、砖石、现存彩绘与鎏金，保留原线稿的构图及残损；这些既有原件使用暗底、细轮廓和哑光矿物设色风格；新增或重绘默认生成纯白底 PNG，由脚本去底后交付真实透明图片，无需 API Key。三张原小样已由用户确认保持原样并转正，历史校色建议关闭。报恩寺塔等历史对象沿用原图明确标示的现存模型参考，不将其理解为现存古塔。

上述 PNG 均为保留的素材原件。网页交付副本统一在 `colored-transparent-avif/<id>.avif`，使用 AVIF Q85、4:4:4 完整颜色采样，保持原始尺寸与构图；透明线稿仍为无损 PNG。原来的 `colored-avif/` 暗底副本保留，但当前页面已改用透明 AVIF。`python3 scripts/prepare-colored-avif.py` 对白底原件按登记方法去底，对原生透明图保留 alpha，保存 `colored-transparent/<id>.png` 无损副本后输出透明 AVIF；只有清单中原哈希匹配的既有暗底原件兼容旧抠图路径；解码检查尺寸、透明通道和原件哈希，将参数与输入/输出 SHA-256 写入 `color-research/avif-manifest.json`。相同来源和参数的已有副本会复用；不会覆盖或删除原 PNG。

`color-research/` 中逐图保存实际输入、完整提示词、参考照片署名与许可、颜色判断和输出目检。`color-references/` 保存补充参考。转码后使用 `node scripts/collect-colored-plates.mjs --require-complete` 检查队列和 AVIF 清单，生成 `colored-plates.js`、进度和完整提示词清单；此脚本写汇总文件，不改色或转码。新增图必须先入队列，整库覆盖与视觉验收另行检查，步骤见设色流程。

网页根据到访状态选择图像：未到访保留朝代色线稿，到访显示实物设色。本轮 200 张透明副本已于 2026-09-16 由用户确认全部通过，清单标记为 `approved_user`，并按 PNG 与 AVIF 哈希保存验收记录；新增或内容变更的图版仍需单独验收。`color-proof.html` 提供深色、浅色、棋盘格背景，以及原设色／线稿对照和逐张浏览。原线稿生产流程如下。

- `longmen-vairocana.png`：原有卢舍那大佛，保持不变。
- `references/longmen-style-black.png`：从原图透明度提取的黑线白底母版，每次生成都作为风格输入。
- `references/*-photo.*`：建筑照片或历史图像，仅作为形状与比例参考。
- `generated/<id>.png`：图像生成器原始输出；新增与重绘默认由内置 imagegen 生成黑线白底 PNG，按逐图去底记录生成透明副本。旧黑线白底文件按 `research/legacy-line-originals.json` 中的原哈希兼容，新图不加入旧哈希例外。
- `plates/<id>.png`：网页交付版，颜色读取 `sites.js` 的朝代映射与 `style.css` 的原有色板；新白底图按灰度生成 alpha 并着朝代色，原生透明图只改 RGB。旧白底原件仅在原哈希匹配时按历史线深转换透明度，去掉 1% 的白底噪声。
- `research/<id>.json`：参考页面、原图、作者、许可、角度说明、最终提示词与生成工具。
- `research/STYLE.md`：共用风格规范。

在项目目录运行 `node scripts/prepare-plates.mjs`，生成朝代配色图版、`plates.js` 和 `sources.html`。原稿、朝代映射、样式色板或转换脚本更新时，自动重新处理。横图通常为 1536×1024，竖塔为 1024×1536，实际尺寸写入清单以避免布局跳动。

线稿使用 `tint: false`，保留 PNG 透明度；网页设色图也使用实际透明通道，无需 CSS 混色去底。旧版参数 SVG 仍用于首页斗拱图片失败时的回退，不能作为纯历史文件删除。新条目需备齐图版和考据记录后才能入库。

朝代配色：东汉 `#b79d77`、北魏 `#ac8fa6`、南朝 `#b58d67`、北齐 `#bf8390`、隋 `#90aab6`、唐 `#d6ab5c`、五代 `#8f8caa`、宋 `#7aa899`、辽金 `#c8442b`、元 `#c98a3f`、明清 `#7290bd`、近现代 `#a6b0b4`。首页斗拱属唐，保留金色。

日本时代配色：飞鸟 `#c2ad78`、奈良 `#9caa76`、平安 `#b79aca`、镰仓 `#68a6ad`、江户 `#bd8e7b`。首批六处的绘制对象、最终文件与参考记录见 [日本古寺图版](research/japan-plates.md)。

江浙新增23张及各自完整提示词、实拍来源与年代说明见 [江浙图版](research/jiangzhe-plates.md)。

河南、河北、山西新增82张及来源、所绘部位与年代说明见 [三省补遗图版](research/north200-plates.md)。新图继续以同一卢舍那母版为风格输入，主体层数、开间与残损按实拍核对。

安徽三处的实拍来源、所绘主体、实际提示词与透明交付说明见 [安徽补遗图版](research/anhui-plates.md)。新图保留待用户审图状态。

本轮山西两处增补的素材、提示词、来源与验收状态见 [山西增补图版记录](research/shanxi-additions.md)。窦大夫祠与大同九龙壁保留白底原件，新增透明设色默认 `pending_user`，不继承既有图版验收。

上海新增四张的所绘主体、年代、来源与本次检查见 [上海补遗记录](research/shanghai-additions.md)。新图使用白底原件及哈希绑定的去底记录，用户视觉验收状态单独保存。

宁夏新增 [须弥山第5窟胸膝局部](research/nx_xumishan.json)、[西夏陵3号陵现存夯土陵塔](research/nx_xixialing.json)、[一百零八塔最上三行七塔局部](research/nx_108towers.json)。线稿、设色白底原件、参考照片及透明 PNG／AVIF 保持上述目录层级；每张绑定实际白底原件 SHA-256，未采用旧图兼容例外。设色输入、材质判断及目检见 `color-research/nx_*.json`，用户于2026-09-18明确确认“验收通过”，透明清单已标记 `approved_user` 并绑定实际 PNG／AVIF 哈希；线稿的独立验收及交付哈希亦保存在逐图记录中。
