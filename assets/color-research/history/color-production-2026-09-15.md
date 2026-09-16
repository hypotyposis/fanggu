# 历史任务快照：WORKFLOW.md（2026-09-15）

本文保存原 `assets/color-research/WORKFLOW.md` 的批次执行指令，供追溯使用。下文的授权、代理分工、工作目录、进度与工具参数仅描述当时任务，不作为新任务的授权或长期开发规则。原文中的路径沿用当时语境。当前规则见上一级目录中的 `WORKFLOW.md`，项目规则见根目录 `AGENTS.md`。

---

# 197 处设色图版生产规范

当前用户已授权：剩余 197 处以 imagegen 生成设色图，多 subagents 并行。明确颜色依据为现下实物；保留已认可的细线、哑光色面与适量颗粒风格。原先三张小样不在本批生成范围内。

## 文件与分工

- 总清单：queue.json；分工：batches/worker_a.json、worker_b.json、worker_c.json、main.json。
- 仅修改自己分组的 assets/colored/<id>.png、assets/color-research/<id>.json 及必要的新参考文件 assets/color-references/<id>-*.jpg。
- 主代理维护聚合清单、网页、共享脚本。不要修改原始线稿、sites.js、plates.js、到访记录，不要提交 git。
- 不要创建子线程；根代理已安排三个 subagents，不再嵌套派生。

## 逐张必做

1. 读取该项原 research JSON，确认图版所画的具体殿、塔、雕塑或局部。不能只按古迹总名称取色。
2. 用 view_image 实际查看黑白线稿、已有实拍参考和风格样本。文件名不等于内容正确。优先复用已下载实拍，但确认主体、日间或普通室内光及现存状态；明显误标、黑白旧照、夜景灯光、数字复原或强滤镜不能作主色依据。
3. 资料不足时通过 web 搜索补实拍；网络新图片用浏览器实际查看或正常获取作为 imagegen 输入，不得声称看过仅见过文字摘要的照片。不要绕过证书、访问限制、付费墙。已能显示的图片可正常保存作生成参考；显示受限制的媒体不得通过下载绕过限制。记录来源页面、作者及已知拍摄时间；不知道就写未知。
4. 记录自己实际观察到的材料色与位置；不是按朝代预设。砖可灰、褐、红；石可灰白或灰褐；旧木可能灰褐且残留红漆；彩塑、琉璃、现存金箔按照片实物保留，不能一律去色。
5. 使用内置 image_gen，每处一调用；可同批并行 2 张，完成后继续下一批。不得改用 CLI/API。第一次工具 exec 使用 yield_time_ms 120000。生成结果只输出 output_hint，禁止 text(result) 导出巨大 base64；用 generatedImage(result) 正常回传图版。
6. 输入角色固定：图 1 是黑白线稿构图母版；图 2（及必要后续图）是实物颜色参考；最后一图为风格样本 assets/color-studies/v1/foguang-colored.png，只取画法、细线和颜料质感，禁止复制其暖金色调。所有本地输入须先实际查看。
7. 使用 common-prompt.txt，加每处专用的主体、对应照片的材料色分区与轮廓约束。不要给 197 张统一填灰或统一红色。暗背景 #100f0d；当前小样已认可这种背景，不追求假的透明棋盘格。
8. 生成后实际查看，核对主体/层数/开间/颜色/文字/背景。明显错误则定向重试一次或报告需再修，不允许把未核验项记为完成。不使用 Python/ImageMagick 调色修图。
9. 复制结果到本项 output 路径，原生成文件保留。逐张落盘研究 JSON，至少 id/name/status=complete/generator/input_images/prompt/material_observations/references/output/generated_original/width/height/visual_review。visual_review 包含已实际看的事实，不能虚构严格像素对齐或色彩校准。
10. 每完成 5 张向根代理汇报数量与任何异常。持续完成整组，不因一批结束或上下文压缩就停；队列与每张 JSON 可恢复。若工具明确额度/服务阻塞，记录错误并及时报告，不假装后台会继续。

## 共识

朝代色留在线稿与界面，不用来决定设色图的建筑材质。统一的是画法、线条、明暗与留白，不是所有古迹一种色调。对照摄影存在色温和曝光差异，图版是依据照片的艺术转译，不宣称文保级色彩复原。

## 中断恢复与逐张保存（2026-09-15 补充）

- 本项目实际工作目录是 `/Users/fuxiangyu/Workspace/fanggu`。另建的旧提交 worktree 不包含这些未提交资产，恢复时须先核对目录。
- 生成前将完整 `prompt`、`input_images`、`material_observations`、`references` 写入本项 JSON，状态为 `prepared`；不只存于代理内存。
- imagegen 返回后立即记录 `generated_original`，复制原件到本项 `output` 并写 `needs_review`；实际查看、核验通过后才写 `complete` 与 `visual_review`。
- 恢复时按逐项 JSON 和实际 PNG 重建进度：`node scripts/collect-colored-plates.mjs`。旧 `progress.json` 可能落后，不能据此重画已有成品。
- 已生成但未入库的原件须用工具返回的 id/path，或明确记录的时间与视觉比对关联；不确定的留待核验，不猜测标为完成。
- `references` 可包含已标注 `role: research_context_not_generation_input` 的研究背景。真实生成输入始终以 `input_images` 为准，不为补齐分类而伪造历史输入。
- 全部完成后运行 `node scripts/collect-colored-plates.mjs --require-complete` 和 `node --test tests/*.test.cjs`，并检查网页总览计数。
- 本次恢复及续画记录见 `recovery/`；只保存必要文字与文件路径，不把图片 base64 转储为文本。
