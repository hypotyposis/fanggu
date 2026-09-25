# 东三省批次交付记录

用户请求十处（辽宁4、吉林3、黑龙江3）；实际本地交付八处（辽宁3、吉林3、黑龙江2），两处明确保留待办。不含提交或发布。新条目默认未到访，图版用户验收仍为 `pending_user`。

开工约21:37，交付检查完成23:15，连同交付记录整理至23:22，本轮约106分钟（2026-09-16，Asia/Shanghai）。未达到此前45—60分钟预估，而且不是完整十处交付；不作为SOP十处性能实测。完整清单、基线哈希及检查结果见 [批次JSON](northeast-batch.json)。

| id | 所绘主体 | 资料与实际提示词 | 阶段 | 线稿 / 设色调用 |
| --- | --- | --- | --- | --- |
| ln_dazheng | 沈阳故宫大政殿 | [逐图记录](ln_dazheng.json) | delivery_ready · 待用户审图 | 1 / 1 |
| ln_chongxing | 北镇崇兴寺双塔 | [逐图记录](ln_chongxing.json) | delivery_ready · 待用户审图 | 3 / 2 |
| ln_chaoyangbei | 朝阳北塔 | [逐图记录](ln_chaoyangbei.json) | blocked · 十三檐未通过 | 3 / 0 |
| jl_jiangjunfen | 集安将军坟 | [逐图记录](jl_jiangjunfen.json) | delivery_ready · 待用户审图 | 2 / 1 |
| ln_liaoyang | 辽阳白塔 | [逐图记录](ln_liaoyang.json) | delivery_ready · 待用户审图 | 1 / 1 |
| jl_nongan | 农安辽塔 | [逐图记录](jl_nongan.json) | delivery_ready · 待用户审图 | 3 / 1 |
| hlj_shideng | 兴隆寺渤海石灯幢 | [逐图记录](hlj_shideng.json) | delivery_ready · 待用户审图 | 1 / 1 |
| hlj_bukui | 卜奎东寺礼拜大殿完整主体 | [逐图记录](hlj_bukui.json) | blocked · 待范围决定 | 0 / 0 |
| hlj_sofia | 哈尔滨圣索菲亚教堂 | [逐图记录](hlj_sofia.json) | delivery_ready · 待用户审图 | 1 / 1 |
| jl_wenmiao | 吉林文庙大成殿 | [逐图记录](jl_wenmiao.json) | delivery_ready · 待用户审图 | 1 / 1 |

## 生成与失败收口

共16次线稿、9次设色调用；保留8个未交付线稿及1个未交付设色原稿。不重画既有古迹。起始并发目标8（线色合计）；未遇明确限流/过载，不降档。实际峰值未经日志审计，不将目标8误报为峰值或硬上限。

朝阳北塔三稿依次为十四、十二、十二檐，十三檐结构检查未通过；达到两次纠错上限，不接入，不生成设色。恢复需新的用户方向或更有效策略。

卜奎东寺可靠实拍只覆盖前廊局部，不能猜补整殿或替换为西寺。已向用户询问是否接受前廊局部；未回答不视为批准。

农安首稿及第二稿中性笔画预检失败，第三稿通过。双塔首轮误数，实际各十二檐，第二稿亦十二檐；第三稿使用同一实拍灰度檐部裁图并记录十三檐位置，各十三檐确认后重做设色。真实输入、失败原因、工具原件及档案路径保留在逐图JSON。

## 本轮流程修正

首轮资料搜索与结果落盘节奏仍超预算；且未在设色前做线稿去底预检，导致后期才发现偏色。已在 [长期SOP](../../docs/monument-batch-workflow.md) 固定“结构目检后、设色前先做白底/中性笔画预检”，不放宽阈值。双塔的首轮误判已撤销，不能把模型输出存在等同于结构通过。

## 交付与验证

- 目录219处；设色队列216项及3个既有特殊入口，集合与目录一致，待生成队列为空。待办两处不在交付队列，不把它们计为完成。
- 8套线稿PNG、透明设色PNG/AVIF，白底原件按实际SHA-256绑定去底记录；浅色实体及暗部不因去底而改成透明。
- 原211处设色PNG/AVIF哈希与审图状态逐项保持；既有200张用户通过，新增8张待用户审图。
- `node scripts/prepare-plates.mjs`、`python3 -B scripts/prepare-colored-avif.py`、`node scripts/collect-colored-plates.mjs --require-complete` 均退出0。
- `node --test tests/*.test.cjs`：52项通过；`python3 -B tests/test_transparency.py`：9项通过；`git diff --check` 通过。
- 隔离浏览器origin `http://127.0.0.1:8768`：逐图深/浅底PNG与AVIF加载及轮廓目检；辽宁、吉林、黑龙江筛选；高句丽/渤海年表选择；圣索菲亚搜索、详情刷新与Back恢复通过。390px检查将军坟详情和吉林文庙长立面对照，无横向溢出。
- 未重复完整触摸打卡测试（共享手势、记录逻辑未改），未将东北新条目设为已到访来测试地图；未修改用户真实origin记录。
- 图片、参考与原稿仅保存在本地，Git忽略素材；本轮未提交、未发布。
