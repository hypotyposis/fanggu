# 设色图版生产与维护

本文件规定逐张设色、记录、验收与汇总的长期流程。开发入口见 [AGENTS.md](../../AGENTS.md) 和 [开发指南](../../docs/development.md)。2026-09-15 的 197 张批次分工、当时授权和恢复现场说明已保存在 [历史任务快照](history/color-production-2026-09-15.md)，不构成后续任务的授权或分工。

## 文件与输入

- [queue.json](queue.json)：汇总脚本实际读取的队列；`batches/` 是原批次分工记录，新任务不需要伪造或沿用原 worker。
- `assets/colored/<id>.png`：保留的设色 PNG 素材原件；`assets/color-research/<id>.json`：实际生成与验收记录。
- `assets/colored-transparent-avif/<id>.avif`：网页使用的透明 AVIF Q85、4:4:4 交付副本；透明 PNG 中间稿在 `assets/colored-transparent/`，原暗底 AVIF 留在 `assets/colored-avif/`；`avif-manifest.json` 保存转码参数、尺寸与输入/输出哈希，原 PNG 不删除、不覆盖。
- `assets/references/` 与 `assets/color-references/`：形制和颜色参考；生成前确认资料存在且对应正确主体。
- [common-prompt.txt](common-prompt.txt)：共用画法；逐图提示词还须包含实物材料颜色、所绘主体和构图约束。
- 卢舍那大佛、佛光寺东大殿与应县木塔三张已由用户确认保持原样并转为正式版，历史修改建议关闭，见 [正式版确认](../color-studies/v1/README.md)。它们继续通过 `queue.excluded` 由汇总器另行接入；该字段表示原批次之外的接入方式，不表示待验收。

## 逐张必做

1. 读取该项原 research JSON，确认图版所画的具体殿、塔、雕塑或局部。不能只按古迹总名称取色。
2. 用 view_image 实际查看黑白线稿、已有实拍参考和风格样本。文件名不等于内容正确。优先复用已下载实拍，但确认主体、日间或普通室内光及现存状态；明显误标、黑白旧照、夜景灯光、数字复原或强滤镜不能作主色依据。
3. 资料不足时通过 web 搜索补实拍；网络新图片用浏览器实际查看或正常获取作为 imagegen 输入，不得声称看过仅见过文字摘要的照片。不要绕过证书、访问限制、付费墙。已能显示的图片可正常保存作生成参考；显示受限制的媒体不得通过下载绕过限制。记录来源页面、作者及已知拍摄时间；不知道就写未知。
4. 记录自己实际观察到的材料色与位置；不是按朝代预设。砖可灰、褐、红；石可灰白或灰褐；旧木可能灰褐且残留红漆；彩塑、琉璃、现存金箔按照片实物保留，不能一律去色。
5. 使用内置 imagegen，每处独立生成白底 PNG，无需 API Key。用户已授权后续脚本去底；原件、实际提示词和输入完整保存，不把脚本产物标为原生透明。
6. 输入角色固定：图 1 是黑白线稿构图母版；图 2（及必要后续图）是实物颜色参考；最后一图为风格样本 assets/color-studies/v1/foguang-colored.png，只取画法、细线和颜料质感，禁止复制其暖金色调。所有本地输入须先实际查看。
7. 使用共用提示词和实物材料观察，要求纯白 `#FFFFFF` 不透明背景，无纸纹、阴影、渐变、光晕或棋盘格；建筑实体保持真实材质颜色，外轮廓清晰，塔刹链间等实际透空处也画白底。
8. `scripts/white-matte.py` 先验证近纯白的画布边缘，再只移除与画布外缘连通的白色区域。封闭的实际透空处可用逐图记录的像素种子 `seeds` 指定；不把建筑内白色石材、粉墙或门窗暗部全局删除。最外层轮廓去白边，内部 RGB 保持原样。原图完整保留；若白底不均匀或主体触边，拒绝处理并重新生成。
9. 按下节状态流程立即保存结果与逐图 JSON。`visual_review` 写清实际看过的内容及局限，不能把尺寸通过写成严格像素配准或色彩校准。
10. 以逐项 JSON 和实际 PNG 保存进度。服务失败或任务中断时记录已完成范围和错误，后续先恢复核验，避免重复生成已有成品。

## 共识

朝代色留在线稿与界面，不用来决定设色图的建筑材质。统一的是画法、线条、明暗与留白，不是所有古迹一种色调。对照摄影存在色温和曝光差异，图版是依据照片的艺术转译，不宣称文保级色彩复原。

## 状态与逐张保存

- `prepared`：生成前保存 `id`、`name`、`generator`、完整 `prompt`、`input_images`、`material_observations`、`references` 和预定 `output`。白底生成后增加 `background_preparation: { method: "white-matte-v1", sourceSha256, seeds }`；原件哈希必须匹配。脚本版本、处理参数、透明通道与副本哈希进入 AVIF 清单，用户验收另行记录。
- `needs_review`：工具返回后立即保存 `generated_original`，复制原件到 `output`，记录真实 `width`、`height`。路径存在不等于验收通过。
- `complete`：实际查看并核验后写入 `visual_review` 和状态。至少记录所绘主体、层数/开间、构图、材质颜色、文字、裁切和背景的实际检查，以及仍有的限制。
- 输入、输出与研究记录中的 `id` 对齐；文件路径优先用仓库相对路径。工具原件的真实绝对路径保留用于追溯，独立保存原件及参考资料，不能假定该路径在新机器上可用。
- 恢复时先确认工作目录和资产是否齐备，运行 `python3 scripts/prepare-colored-avif.py` 补齐交付副本，再按逐项 JSON、实际 PNG 与 AVIF 重建进度：`node scripts/collect-colored-plates.mjs`。这些命令会写转码或汇总文件；旧 `progress.json` 可能落后，不能据此重画已有成品。
- 已生成但未入库的原件须用工具返回的 id/path，或明确记录的时间与视觉比对关联；不确定的留待核验，不猜测标为完成。
- `references` 可包含已标注 `role: research_context_not_generation_input` 的研究背景。真实生成输入始终以 `input_images` 为准，不为补齐分类而伪造历史输入。

## 队列与交付检查

新增图版时将条目加入 `queue.json.entries`，同步 `count`。汇总器使用 `id`、`name`、`subject`、`record`、`output`、`width` 和 `height`；原队列还有 `line`、`displayLine`、`originalResearch` 等生产辅助字段。保持 ID 唯一，输入与产物路径真实，尺寸以原线稿为准。`excluded` 只用于明确的特殊接入，不用来隐藏未完成项。

`scripts/plan-colored-plates.mjs` 固定生成原 197 张批次和分工，会覆盖现有队列；后续增量维护按实际条目更新队列，不用该脚本重置进度。

完成后在仓库根目录运行：

```bash
python3 scripts/prepare-colored-avif.py
node scripts/collect-colored-plates.mjs --require-complete
node --test tests/*.test.cjs
```

汇总器检查队列项的状态、PNG 存在、部分研究字段与尺寸（允许 2 像素容差），校验素材 PNG 与 AVIF 是否匹配转码清单的哈希，再写出 `colored-plates.js`、`progress.json`、`prompts.json`。它不校验未进入队列的古迹，也不复核实物颜色或图像生成来源。需要另行比较整库 ID 覆盖、确认输入存在、逐图目检，并检查 `color-proof.html` 中的线稿/设色对照、来源与计数。

新增设色 PNG 默认由内置 imagegen 生成白底，`prepare-colored-avif.py` 按绑定原件哈希的白底处理记录调用 `white-matte.py`，保留内部 RGB、清理轮廓混入的白色，再输出透明 PNG 和 AVIF。已有原生透明图直接保留 alpha。未登记方法或原件哈希改变时拒绝自动去底；图片内容改变不能继承已有用户验收。

2026-09-16 的既有 200 张暗底设色另有一次性兼容流程：用户要求批量脚本抠图并自行人工审阅，随后明确确认“都没问题 先替换上吧”。这批透明交付版已用于页面，标记 `approved_user`，验收绑定实际 PNG／AVIF 哈希；不改写原画历史提示词和生成记录。只有清单记录的原始文件哈希仍匹配时可复用旧抠图逻辑，新增或替换的不透明原件会报错。

用户验收与技术校验分别记录：复用相同文件不能重置已通过状态，图版内容改变不能继承旧验收。`color-proof.html` 按清单显示实际状态，提供背景切换及原图对照。图片交付和浏览器检查见开发指南。原批次恢复过程见 [恢复摘要](history/recovery-2026-09-15.md)，历史材料仅用于溯源。
