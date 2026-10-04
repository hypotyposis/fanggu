# 访古 iOS

SwiftUI 原生 App，最低 iOS 18。古迹目录由维护源数据中的 `sites.js`、`plates.js`、`colored-plates.js`、`protection-data.js`、`catalog.js`、图版研究 JSON 和 `palette.css` 导出；古迹 ID、朝代色、年代说明、文保信息与来源链接同源。界面使用访古的墨色、金线、印章、线稿和设色视觉。App 的个人记录保存在本机 Application Support，使用版本 4 JSON 结构，可导入版本 1、2、3、4 备份。网页产品已移除，旧版 JSON 备份仍可导入 App。

底部四栏导航在 iOS 26 使用系统 `TabView` 的 Liquid Glass；iOS 18–25 使用悬浮磨砂材质与选中态胶囊。四个主页面直接显示各自标题，不占用顶部品牌导航栏；古迹详情保留返回导航。旧系统的底部导航在输入时收起、退出详情后恢复；开启“降低透明度”时改用不透明底色。

“我的 → 外观”提供跟随系统、亮色和深色，默认跟随系统，选择会在本机保存。亮色使用暖白纸面、深褐文字与沉金强调色；图鉴、地图、年表、详情和弹出表单共用自适应色板。亮色下朝代标签与透明线稿加深以保持可读性，设色图保留原色；红底印章始终使用浅色字。外观设置独立于个人记录，不包含在访古备份中。配色入口在 `Fanggu/Models.swift`，外观选项在 `Fanggu/DesignSystem.swift`，根视图与弹出页统一应用外观，子页面不单独锁定深色。

年表的年代排序、时期分组与全时期聚合点由 `LibraryStore` 加载目录时通过 `TimelineCatalog` 一次计算，切换 tab、外观或到访状态时复用；所选地域／时期的聚合只处理对应子集，到访样式仍读取最新个人记录。“我的”列表按可见范围加载，未显示的设色图不提前解码。图鉴每次更新只计算一次筛选结果，列表和大图各自使用固定行结构，避免切换时构建整份目录的视图。旧系统的 tab 弹簧动画仅作用于导航选中态，主页面直接切换。切换耗时与年表完整性回归见 `testTabAndAppearanceSwitchingLatency` 和 `testTimelineIndexKeepsOrderingPeriodsAndAllTracks`。

图鉴首页直接显示搜索、互斥的全部／心愿单／已到访／未标记状态与紧凑列表，默认心愿优先。可切换年代或名称排序、打开展示大图的卡片视图。搜索以空白分隔多个关键词，逐词匹配名称、别名、地点、时代、类型或文保信息，词序不影响结果；搜索框内的清空只清文字，保留状态和其他筛选。未到访的大图卡片与详情页共用到访操作：“记录今日到访”立即保存今天，“补记到访”可用系统日期选择器填写过去的日期，或保持日期不详，并填写笔记。拖动条明确显示“滑动记录今日到访”，终点松手与按钮共用保存逻辑；图版加载或部分拖动不写入记录。国家、地区、时代和类型筛选收在筛选页。品牌长卷放在右上角印章打开的“关于访古”页。详情顶部提供到访和心愿操作，已到访可从“更改状态”直接改为未标记或心愿单，日期、笔记和评价保留。拖动条紧挨图版下方，拖动时可同时看到设色渐显。未有到访记录时，“足迹”显示引导入口；有记录时使用 280pt 高的离线地理概览，保留海岸线参照，邻近地点合并为地区名与地点数，点选后突出地点范围并按地点列出古迹。关闭弹出页后仍保留选中范围；弹出页内的撤销提示由当前页面展示，背后的页面不重复暴露入口。下方到访地点列表支持按地名、省份或古迹名搜索，地图与列表操作只读取个人记录。底图源文件与许可见 [MAP-SOURCES.md](Fanggu/Resources/MAP-SOURCES.md)。年表先选择地域，再选择时期；所有时期都可从菜单直接切换，跨地域时期会自动切换地域。时期标签独占一行、地域与当前年代摘要固定在图形外；150pt 图形使用等距时间轴（每 100 年 70pt），选择时期或节点会自动定位。所选区间有底色、节点有外圈，摘要显示年份范围与已到访数量。实心／半圆／空心分别表示全部／部分／尚未到访。从详情返回保留筛选与选点，“取消选点”回到当前时期列表，“显示更多”逐段加载。辅助字号下状态筛选改为两列，“我的”计数改为逐行展示。地图与“我的”的突出数字共用宋体数字样式；等宽字体用于次级统计、年代和坐标，手写体用于印章等装饰。图鉴、详情和个人列表共用状态名称与文字颜色，年代标签留空时不显示排序用的年份。

## 构建

韩国与朝鲜目录使用 `KR`、`KP` 国别，可按国家、当地地区与统一新罗／高丽／朝鲜王朝筛选；年表单列朝鲜半岛。新增图版后运行下面的目录导出与素材同步命令，默认保持未到访。

需要 Xcode、XcodeGen、Node.js，以及本地图版素材。仓库不包含图片。取得与 [Git 清单](../assets/asset-lock.json)匹配的本地资源包后，先恢复运行资源并同步：

```bash
node ios/scripts/build-catalog.cjs
python3 scripts/asset-bundle.py restore --bundle /path/to/<assetSet> --profile runtime
sh ios/scripts/sync-artwork.sh assets
cd ios
xcodegen generate
xcodebuild -project Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=iPhone 16 Pro' build
```

`sync-artwork.sh` 检查全部目录条目所需的线稿 PNG 和设色 AVIF。图片位于被忽略的 `ios/Fanggu/Resources/Artwork/`，不会误提交原件。数据、朝代色或图版清单变更时重新运行导出和同步命令。中文标题使用随 App 打包的 Ma Shan Zheng 与 Noto Serif SC 字体，均按 SIL Open Font License 授权，许可文本在 `Fanggu/Resources/Fonts/`。

App 图标使用用户提供的[鸱吻图标素材包](icon-concepts/chiwen/README.md)：默认版为朱红底金色剪影，另有深色与系统着色版本。三个 1024 × 1024 PNG 和 `Contents.json` 原样接入 `Fanggu/Assets.xcassets/AppIcon.appiconset/`，圆角由 iOS 添加。完整矢量源稿、旧版各尺寸 PNG 和原始说明保存在 `icon-concepts/chiwen/`。需要恢复交付图时，在仓库根目录运行 `python3 ios/scripts/build-icon.py`；该脚本只复制提供的图标，不重绘。此前斗栱方案保留为历史设计记录。

## 迁移记录

将 JSON 备份放入 iPhone 的“文件”，再到 App“我的 → 导入备份”。同一古迹 ID 的记录、评价以导入值覆盖，其余保留；版本 1、2 不覆盖评价，版本 3 可更新旧五星和短评，但保留已有六维分数；版本 4 可明确清空六维评价。App 中的资料仍在本机，换机前请导出备份。App 新备份用于 App 间迁移；旧版 JSON 的导入兼容继续保留。

## 六维评价

古迹详情的评分入口改为六维图：年代稀缺、原真完整、结构营造、艺术遗存、规制体量、环境格局。各项独立使用 E–A 五档（内部整数 1–5），不计算总分，不预填专家分数。不确定的项可留空：空心圆点停在中间档的可抓取位置，标为“—”，不算作 C；图形只使用实际评分，未评分的顶点位于中心。

编辑时圆点有 44 pt 触控区域，起手保留手指偏移，位移投影到当前轴，横向偏移不会改变其他项。拖动过程连续跟手，档位显示与触觉在边界使用 0.08 档的防抖；松手后立即保存当前六维图，并用 0.26 秒弹簧吸附到显示的档位，开启“减少动态效果”时直接归档。手势取消或 App 转入后台复原未松手的拖动，不写入分数。只从圆点接管拖动，图内空白仍可滚动页面。VoiceOver 支持逐项调整和清空；辅助调整、单项清空和六项重置都立即保存。评价页没有“保存”和“取消”，“完成”只关闭页面，已经保存的修改不会撤销。清除评价先保存当前有效输入，再立即清空六维分数、短评与旧版五星，并保留修改时间；重置六项只清六维分数。两种操作均提供撤销。辅助字号下编辑页和详情中的六维图改为纵向六项：名称、说明和当前档位分别换行，编辑时通过菜单直接选择 E–A 或未评分，选定即保存，不依赖固定图形位置或精细拖动。

短评在停止输入 450 ms 后自动保存，失去输入焦点、App 转入后台和点“完成”时立即写入尚未保存的文字。评分和短评通过 `LibraryStore.setReviewDimensions`、`setReviewText` 分别更新，每次读取最新评价并保留另一字段；超长短评不会阻止有效评分保存。同档松手、未改文字和打开编辑页不重复写入，也不更新修改时间。保存失败时保留本地修改、原文件和错误提示，可重试或放弃未保存的修改；有未保存内容时暂不允许下滑关闭，避免丢失输入，正常自动保存后可直接下滑关闭。

`Fanggu/Review.swift` 定义维度、档位、投影及防抖逻辑，`Fanggu/ReviewRadar.swift` 共用编辑与只读图形。`reviews[id].dimensions` 为维度键到整数的对象，未评分项省略，键为 `eraRarity`、`authenticity`、`construction`、`art`、`scale`、`setting`。旧 `rating` 字段继续保留，不自动换算；`text`、`updatedAt` 和到访记录规则不变。首次保存时将原文件升级为版本 4；读取损坏文件或保存失败时保留原数据。

构建与数据回归使用 `FangguTests/ReviewTests.swift`；交互回归使用 `FangguUITests` 中的 `testSixDimensionReleaseAutosavesAndResets`、`testSixDimensionLowGradesStayIndividuallyDraggable` 与 `testReviewShortTextAutosavesAndClearIsImmediate`，覆盖松手后直接重启、即时重置、短评自动保存、关闭时补写、空白滚动和密集圆点。在仓库根目录运行以下命令，先创建独立模拟器并将名称换成自己的测试设备，避免修改真实个人记录：

```bash
xcodebuild -project ios/Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=Fanggu Radar Review' -parallel-testing-enabled NO -only-testing:FangguTests -only-testing:FangguUITests/FangguUITests/testSixDimensionReleaseAutosavesAndResets -only-testing:FangguUITests/FangguUITests/testSixDimensionLowGradesStayIndividuallyDraggable -only-testing:FangguUITests/FangguUITests/testReviewShortTextAutosavesAndClearIsImmediate test
```

首版包含原生图鉴、搜索与筛选、古迹详情、仅显示已到访地点的离线足迹地图、按年代浏览、拖动打卡、心愿、日期与笔记、私人评分与短评、备份迁移。地图、图鉴与图片可离线浏览。图版与文保来源在详情页以参考链接提供。私人记录通过备份文件迁移，没有在线同步。App Store 分发还需要开发者账号、签名和应用商店素材。

拖动打卡采用整幅图版渐显：设色图透明度随拖动进度增加，线稿在最后 20% 淡出。只能从“访”字拖动块开始，到达最右端并松手后才保存到访；提前松手或手势取消会复原线稿。保存成功立即显示“亲见”并收起拖动条，印章单独用 0.32 秒的小幅弹簧落定；到访状态不等待动画，也不维护延时切换的中间状态。开启“减少动态效果”时印章直接呈现。辅助操作的“记录今日到访”也遵循相同的保存与呈现流程。设色图无法解码时保留线稿且不允许拖动打卡。

## 状态更正与撤销

到访、心愿、日期笔记修改及评价清空／重置由 `LibraryStore` 保存成功后提供撤销。底部提示保留到主动关闭、被新的可撤销操作替换或相应字段再次被编辑，不用短倒计时限制辅助阅读。仅保存最近一次撤销，不跨 App 重启保留，也不进入版本 4 备份。

撤销按字段恢复：到访恢复原始记录（首次登记可恢复为没有个人覆盖记录），不改变评价；六项重置的撤销只恢复六维，保留重置后写入的短评；清除评价可恢复六维、短评和旧五星，再次编辑该评价则使这次清空的撤销失效。恢复评价时更新时间仍记录本次修改。导入和旧记录关联会结束先前的撤销，避免恢复旧快照覆盖新数据。撤销写入失败时保留当前记录、撤销入口与错误，可继续重试。

`FangguTests/UXRegressionTests.swift` 覆盖关键词词序、空白、别名、状态纠错、首次记录撤销、未知日期、评价恢复与失败重试；`FangguUITests/UIUXFixTests.swift` 覆盖搜索独立清空、今日／补记到访、直接改为未标记、评价撤销及最大辅助字号逐项评分。使用独立模拟器运行：

```bash
xcodebuild -project ios/Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=你的独立测试设备' -parallel-testing-enabled NO -only-testing:FangguTests -only-testing:FangguUITests/UIUXFixTests -only-testing:FangguUITests/FangguUITests/testArrivalOnlySavesAfterReleasingAtTheEnd -only-testing:FangguUITests/FangguUITests/testSixDimensionReleaseAutosavesAndResets test
```

## 触觉反馈

触觉响应明确的选择、打卡拖动和保存结果；滚动、文字输入、打开详情和取消操作保持安静。打卡拖动模拟拆开信封：起手有中等重量，每向前越过 20% 进度产生一次逐渐加强的短促阻力，到头最实。后退或在同一刻度反复移动不重复震动，快速跨过多段时只发一次反馈；重新拖动会重置刻度。实现集中在 `Fanggu/Haptics.swift`，使用系统 `UIFeedbackGenerator`，不会修改个人记录。

| 场景 | 反馈 | 触发时机 |
| --- | --- | --- |
| 图鉴状态与菜单筛选、地图地点、年表时期与节点 | selection | 点选地点或选择确实改变时一次 |
| 六维评分起手 | light soft impact | 抓住圆点时一次，预热档位反馈 |
| 六维评分跨档 | selection | 防抖后的档位改变时一次，快速跨多档只发一次 |
| 六维评分辅助调整、清空或重置 | selection | 实际改变且保存成功后一次 |
| 心愿增删、已到访记录更新、六维拖动评分更新、旧记录关联 | soft impact | 保存成功后一次，同档松手保持安静 |
| 打卡拖动起手 | medium impact | 首次有效移动时一次 |
| 打卡拖动拆封阻力 | rigid impact | 首次向前越过每个 20% 刻度时一次，强度递增 |
| 拖动或辅助操作完成到访、首次通过表单登记到访、备份导入 | success notification | 持久化成功后一次 |
| 表单校验、保存或备份操作失败 | error notification | 错误呈现时一次 |

同一操作只发一种结果反馈；拖动过程的阻力不代表保存成功。重复选择、拖动未到终点、取消和保存失败不会产生成功反馈。触感须在支持 Taptic Engine 的真机上验收，模拟器构建只能验证代码与界面流程。
