# UIUX 优先问题修复记录

对应 [2026-10-03 评审](uiux-review-2026-10-03.md) 的第一轮 U1、U2、A1、U11，以及随后授权的 U6、U7、H4。实现通过独立的 `codex/uiux-priority-fixes` worktree 完成。

| 问题 | 完成的行为 | 验证重点 |
| --- | --- | --- |
| U1 到访含义混淆 | 明确区分“记录今日到访”和“补记到访”；拖动终点明确记录今天；补记使用系统日期选择器，支持日期不详 | 终点松手才保存、取消不写入；未知日期不自动填今天；日期和笔记重开后保留 |
| U2 缺少纠错与撤销 | 已到访可直接改为未标记或心愿单；到访状态、六维重置、清空评价均可撤销；记录和评价相互独立 | 撤销恢复原记录及旧版评分；保留后续短评；保存失败保留状态和可重试操作；大图、详情、足迹弹出详情各只有一个有效撤销入口 |
| A1 大字号评分不可用 | 最大辅助字号下六维图改为纵向评分控件，各维可读、可选、即时保存 | 六维从 E 到 A 与未评分可选择；短评可达；重新打开仍保留 |
| U11 搜索词组合失效 | 空白分隔多关键词，逐词匹配名称、别名、地域、时期、类型和文保；清空只清文字 | “山西 唐”与“唐 山西”结果一致；换行和重复空白兼容；保留状态筛选 |
| U6 地图缺少地理参照 | 底栏改为“足迹”；加入离线陆地与海岸线；聚合显示地区名和地点数，选中后突出实际地点范围 | 地点不丢失、地名标记不重叠；空数据和单点可用；点选、搜索与详情返回可用 |
| U7 年表选择不联动 | 选择时期自动定位到对应年代与标签；节点有选中外圈，摘要显示地域、年份范围和已到访数量；全部／部分／尚未到访分别显示 | 明清自动出现在视口；详情返回保留选点；跨地域时期自动切换地域；所有地域可达 |
| H4 年代条叠压 | 先选择地域，时期标签独立一行；图形只突出当前范围，采用 150pt 等距时间轴，每 100 年 70pt | 全部时期入口保留；节点点击区域不叠压；每个地域、时期子集完整覆盖对应古迹 |

## 实现入口

- [共享到访操作和撤销提示](../../ios/Fanggu/RecordControls.swift)、[记录与撤销存储](../../ios/Fanggu/LibraryStore.swift)、[详情及编辑器](../../ios/Fanggu/MonumentDetailView.swift)。撤销提示的弹出层状态只存在于界面，不进入个人备份。
- [多关键词搜索](../../ios/Fanggu/CatalogSearch.swift)、[辅助字号评分](../../ios/Fanggu/ReviewRadar.swift)。
- [足迹与年表目录索引](../../ios/Fanggu/MapTimelineView.swift)、[年表界面](../../ios/Fanggu/TimelineView.swift)、[地图投影与聚合](../../ios/Fanggu/SketchMapLayout.swift)。
- [离线底图来源、版本与哈希](../../ios/Fanggu/Resources/MAP-SOURCES.md)。底图随 App 打包，运行时不请求地图服务。

## 实际验证

环境：Xcode 27 工具链、iOS 18.6、独立的 iPhone 16 Pro 模拟器 `Fanggu UX Fixes 20261004`。个人记录操作仅在这个测试环境与单元测试临时目录中执行。

- Node 全套 **122 项通过**，包括实际 Swift 地图几何在 272–720pt 宽度下的边界、触摸间距与完整覆盖检查。[日志](../../tmp/uiux-priority-fixes-20261004/fanggu-atlas-node.log)
- 原生单元测试 **22 项通过**，覆盖旧版评价兼容、撤销与失败重试、多词搜索、所有地域／时期聚合覆盖、等距年代与底图打包解码。[日志](../../tmp/uiux-priority-fixes-20261004/fanggu-uiux-final-7.log)
- UI 流程分轮验证（[第一轮](../../tmp/uiux-priority-fixes-20261004/fanggu-uiux-fixes-test-3.log)、[第一轮补充](../../tmp/uiux-priority-fixes-20261004/fanggu-uiux-fixes-test-5.log)、[足迹搜索](../../tmp/uiux-priority-fixes-20261004/fanggu-atlas-validation-2.log)，其中早期失败以随后针对性通过结果为准）：今日到访／补记／撤销、拖动取消与终点释放、大图入口、最大辅助字号六维评分、搜索清空、详情及大图评价撤销、足迹点选与搜索、足迹弹出详情撤销、年表五个地域与跨地域时期、明清定位和详情返回。
- 后续复测中，发现并修复足迹弹出详情背后的重复撤销入口；年表菜单与页面标签使用独立标识，测试明确等待菜单关闭。[足迹与年表、评价入口日志](../../tmp/uiux-priority-fixes-20261004/fanggu-atlas-final-6.log)
- 评价清空撤销的最终测试使用换行结束测试输入，先提交键盘自动更正再比较恢复文本；最终结果见单元测试同轮日志。前一轮该用例的失败是预期文本在自动更正提交前取值，该轮其余四项已通过。
- Release 构建成功；`git diff --check` 与新增文档的本地链接核对通过。[Release 日志](../../tmp/uiux-priority-fixes-20261004/fanggu-uiux-final-release.log)

截图：[大字号评分](../../assets/reviews/uiux-fixes-20261004/accessible-rating.png)、[大字号短评](../../assets/reviews/uiux-fixes-20261004/accessible-short-review.png)、[足迹选中范围](../../assets/reviews/uiux-fixes-20261004/map-selected-range.png)、[明清选点](../../assets/reviews/uiux-fixes-20261004/timeline-ming-selected.png)、[日本时期](../../assets/reviews/uiux-fixes-20261004/timeline-japan.png)。截图和日志按仓库约定保留在本地忽略目录。

未验证：真机触感、完整 VoiceOver 逐项朗读、iPad 和 iOS 26 运行时。本次截图与测试不代替用户对真实使用体验的验收。
