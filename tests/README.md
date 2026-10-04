# 测试一览

运行方式、环境前置与汇报约定见 [测试与验证](../docs/testing.md)。本文只列每个文件覆盖什么、是否需要本地素材。

“需要素材”指读取被 Git 忽略的 `assets/` 图片（`generated/`、`plates/`、`references/`、`colored*/`）。没有素材时这些文件以 `ENOENT` 失败，是环境问题而非缺陷。

## Node：横切检查

| 文件 | 覆盖 | 需要素材 | 其他前置 |
| --- | --- | --- | --- |
| `catalog.test.cjs` | 全库条目有真实 PNG、尺寸一致、地图地点；维护全库 ID 覆盖列表与多批次的来源哈希绑定 | 是 | |
| `facets.test.cjs` | `catalog.js` 的国家、地区、省份、类型、状态组合筛选与别名搜索；原生导出默认未到访 | 否 | |
| `protection.test.cjs` | 国保源数据与生成数据一致、批次公布日期、合并关系、未确认条目不贴标签、搜索组合、CommonJS 与全局一致 | 否 | 调用 `prepare-protection.mjs --check` |
| `ios-catalog.test.cjs` | `catalog.json` 与源数据逐项一致：ID、名称、状态、图版文件名、坐标、时代色、年代范围、国保、来源链接 | 否 | |
| `ios-map-layout.test.cjs` | 用真实 Swift 源编译 `SketchMapLayout.swift`，检查多种手机宽度下的投影、覆盖与触控间距 | 否 | `xcrun swiftc`；没有则跳过 |
| `line-plate.test.cjs` | 线稿着色保留原生 alpha、拒绝未登记的白底原件、旧哈希白名单 | 否 | `magick` |
| `plate-tools.test.cjs` | `prepare-plates.mjs --sources-only` 不改图版、不需原件、导航正确 | 否 | |
| `prototype-pipeline.test.cjs` | 原型模式默认、`--strict` 可用、原型汇总器不伪造用户验收 | 否 | `magick` |

## Node：按批次的交付回归

每个文件对应一次新增批次，断言该批 ID 的主体、年代、地域、默认未到访、线稿与设色记录的哈希绑定、队列与清单覆盖、iOS 导出，并保护更早批次的验收状态。全部需要素材。

| 文件 | 批次 |
| --- | --- |
| `first-batch-grotto-stone.test.cjs`、`first-batch-eight.test.cjs` | 第一批国保石窟石刻与八处补遗 |
| `gansu.test.cjs`、`ningxia.test.cjs`、`shaanxi.test.cjs` | 甘肃、宁夏、陕西 |
| `im-yn-gz.test.cjs` | 内蒙古、云南、贵州 |
| `northeast.test.cjs` | 东北 |
| `hebei-expansion.test.cjs`、`hebei-national-20261002.test.cjs` | 河北两批 |
| `henan-national-20261002.test.cjs` | 河南国保十处 |
| `shandong-expansion.test.cjs`、`fujian-shandong.test.cjs`、`fujian-national-20260930.test.cjs` | 山东、福建 |
| `shanxi-national-20261002.test.cjs` | 山西国保十处 |
| `hunan-hubei.test.cjs`、`guangdong-guangxi.test.cjs` | 湘鄂、两广 |
| `jiangzhe-national-20260930.test.cjs` | 江浙二十处 |
| `sichuan-chongqing-20261002.test.cjs` | 川渝 |
| `japan-six.test.cjs`、`kansai-twelve.test.cjs`、`kyoto-nine.test.cjs`、`kyoto-thirteen.test.cjs`、`kyoto-nearby-ten.test.cjs`、`tokyo-eight.test.cjs` | 日本各批 |
| `korea-20261002.test.cjs` | 朝鲜半岛 |
| `southeast-asia-20261002.test.cjs` | 东南亚 |

台湾、上海、安徽、北京天津、江浙早期批次等的断言并入 `catalog.test.cjs` 与 `facets.test.cjs`。

## Node：辅助模块 `helpers/`

| 文件 | 作用 |
| --- | --- |
| `native-catalog.cjs` | `assertUnvisited(ids)`：原生目录中这些 ID 默认未到访且不含个人数据 |
| `archived-tiantai.cjs`、`archived-xian.cjs` | 天台庵去底修补、大小雁塔拆分后，继续校验归档在 `assets/research/history/` 中的历史原件与验收哈希 |

## Python

| 文件 | 覆盖 | 前置 |
| --- | --- | --- |
| `test_transparency.py` | 白底与旧暗底去底规则、原生 alpha 保留、种子校验、局部重建、原型模式不设质量门槛、用户验收缓存 | NumPy、带 AVIF 的 Pillow |
| `test_imagegen_request.py` | 可选 API 入口 `generate-transparent-plate.py` 的参数强制与收据 | 不调用 API |
| `test_asset_bundle.py` | 素材包 lock、pack、restore、verify 的往返、冲突保护、损坏归档与不安全路径 | Git |

全部使用合成数据，不读取仓库图版。

## 原生测试

`ios/FangguTests` 为单元测试，`ios/FangguUITests` 为 UI 测试。运行命令见 [测试与验证 · 原生测试](../docs/testing.md#原生测试)。

| 文件 | 用例要点 |
| --- | --- |
| `FangguTests/ReviewTests.swift` | 年表索引完整、旧评价不臆造六维、档位往返与非法值、径向投影与防抖、持久化与备份、版本 3 导入保留六维、首次保存才升级、独立自动保存、失败保留原数据、旧记录与新增条目的备份 |
| `FangguTests/UXRegressionTests.swift` | 多关键词搜索、今日到访与状态更正的撤销、首次记录撤销与未知日期、评价重置与清空的撤销、撤销失效规则、撤销失败可重试、不可读存储不报已保存 |
| `FangguTests/AtlasTimelineTests.swift` | 每个地域时期的节点间距与完整覆盖、等距时间轴、离线底图打包与多边形有效 |
| `FangguTests/TestScopeTests.swift` | `FANGGU_LIBRARY_SCOPE` 作用域名清洗与长度、作用域路径与默认库分离、作用域内保存不触碰真实记录 |
| `FangguUITests/FangguUITests.swift` | tab 与外观切换耗时、东京筛选与别名、外观持久化、原生各栏可用、六维松手自动保存与重置、低档位可拖、短评自动保存、详情导航、大图拖动条、终点松手才保存、足迹标记与搜索 |
| `FangguUITests/UIUXFixTests.swift` | 多词搜索与独立清空、今日到访与补记与直接更正、评价重置与清空可撤销、最大辅助字号评分、大图评价只有一个撤销入口 |
| `FangguUITests/AtlasTimelineUITests.swift` | 时期选择定位与返回保留、所有地域与跨地域时期可达、足迹弹出详情只有一个撤销入口 |
| `FangguUITests/IsolatedApp.swift` | 辅助：`XCUIApplication.isolated()` 为每个 UI 用例生成新的记录与外观作用域 |
