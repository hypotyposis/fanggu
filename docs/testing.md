# 测试与验证

本文说明仓库有哪些检查、各自需要什么环境、没有本地素材时能跑什么、怎样只跑子集，以及汇报约定。文件级清单见 [测试一览](../tests/README.md)，改动与检查的对应见 [常见任务](tasks.md) 与 [开发指南 · 验证矩阵](development.md#验证矩阵)。

## 检查层次

| 层 | 命令 | 覆盖 | 前置条件 |
| --- | --- | --- | --- |
| Node 回归 | `node --test tests/*.test.cjs` | 目录一致性、分类与搜索、国保、各批次交付记录与哈希、生成脚本行为、iOS 导出、地图几何 | Node.js；读取图片的用例需要完整本地素材，缺少时报告为跳过；`line-plate`、`prototype-pipeline` 需要 `magick`；`ios-map-layout` 需要 Swift 工具链，没有则自动跳过 |
| 国保核对 | `node scripts/prepare-protection.mjs --check` | `protection-data.js` 是否过期 | 无 |
| Python 单元 | `python3 -B -m unittest discover -s tests -p 'test_*.py'` | 去底与转码规则、API 入口参数、素材包往返 | NumPy、带 AVIF 的 Pillow、Git；全部用合成数据，不需要图版 |
| 差异检查 | `git diff --check` | 空白问题 | 无 |
| 原生单元 | `sh ios/scripts/run-ios-tests.sh -only-testing:FangguTests` | 个人记录、备份兼容、撤销、搜索、年表索引、底图、测试作用域 | Xcode、XcodeGen；脚本自建本会话模拟器 |
| 原生 UI | `sh ios/scripts/run-ios-tests.sh -only-testing:FangguUITests/…` | 打卡拖动、评价、撤销、搜索、足迹与年表交互、外观 | 同上，耗时较长；每个用例使用独立记录作用域 |
| 浏览器审图 | 真实浏览器打开本地审图页 | 图片请求、图注、背景、翻页 | 本地 HTTP 服务与素材 |
| 真机 | 手动 | 触觉、实际触摸体验 | 支持 Taptic Engine 的 iPhone |
| 持续集成 | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | 前四项、`build-catalog.cjs` 导出与 Git 一致、原生单元测试与 Swift 地图几何；UI 测试仅手动触发 | GitHub Actions；Linux job 安装 NumPy、Pillow 与 ImageMagick 7；没有本地素材，读图用例跳过 |

代码或目录数据改动的基线是前四项；纯文档改动只需链接、路径、命令描述与 `git diff --check`。

## 没有本地素材时

新克隆、worktree 和 CI 没有 `assets/` 下的图片。读取这些文件的 Node 用例通过 [`tests/helpers/local-assets.cjs`](../tests/helpers/local-assets.cjs) 的 `requiresLocalAssets` 声明；缺少 `assets/plates`、`assets/generated` 或 `assets/colored-transparent-avif` 任一目录时，`node --test` 把它们报告为跳过（`# SKIP 需要本地图版素材…`），其余用例照常运行。断言本身不变，素材齐备时全部执行。

| 结果 | 范围 |
| --- | --- |
| 运行 | `facets`、`ios-catalog`、`protection`、`plate-tools`；`line-plate` 与 `prototype-pipeline`（需 `magick`）；`ios-map-layout`（需 Swift 工具链）；`catalog` 与各批次测试中不读图片的用例 |
| 运行 | 全部 Python 测试 |
| 跳过 | `catalog` 与各批次测试中校验 PNG 尺寸、原件与交付哈希、参考照片存在的用例 |

跳过不等于通过。处理方式：

1. 能恢复素材就恢复：`python3 scripts/asset-bundle.py restore --bundle /path/to/<assetSet> --profile full`，再 `verify --profile full`。批次测试读取 `assets/generated/` 与 `assets/references/`，`runtime` 层级不够。恢复后运行 `FANGGU_REQUIRE_LOCAL_ASSETS=1 node --test tests/*.test.cjs`，该变量关闭跳过，任何仍缺的文件直接失败。
2. 不能恢复时，运行全套并在汇报中写出跳过的数量与原因；不要把跳过写成通过。
3. 改动只涉及文档或 iOS 代码时不需要补素材；改动涉及目录数据时，至少确保 `facets`、`ios-catalog`、`protection` 和 `catalog` 中运行的用例通过。
4. 新增读取被忽略文件的用例时同样传入 `requiresLocalAssets`，不要在断言里用 `existsSync` 静默放行。
5. 构建 App 或跑原生测试前必须让 `ios/Fanggu/Resources/Artwork/` 存在：`project.yml` 虽把该文件夹标为 `optional`，Xcode 复制资源时仍会因目录缺失报错（“The file Artwork couldn't be opened”）。同一台机器上有完整素材的工作区时，可直接 `sh ios/scripts/sync-artwork.sh /path/to/那个工作区/assets` 同步到当前 worktree；没有素材时至少 `mkdir -p ios/Fanggu/Resources/Artwork` 让单元测试可以编译运行，图版缺失不影响逻辑测试。

## 常用子集命令

目录数据改动的最小集合：

```bash
node --test tests/facets.test.cjs tests/ios-catalog.test.cjs tests/protection.test.cjs
```

按名称过滤某个文件里的用例：

```bash
node --test --test-name-pattern="Tokyo" tests/tokyo-eight.test.cjs
```

去底与转码规则：

```bash
python3 -B tests/test_transparency.py
```

素材包：

```bash
python3 -B -m unittest discover -s tests -p test_asset_bundle.py
```

## 原生测试

`ios/scripts/run-ios-tests.sh` 为当前 worktree 创建并启动独立模拟器（默认名 `Fanggu <检出目录名>`，可用 `FANGGU_SIM_NAME` 指定），用 `ios/build/DerivedData` 编译，UI 用例以独立记录作用域启动 App，不触碰真实个人记录；其余 `xcodebuild` 参数原样透传。设备管理见 [iOS 开发说明 · 测试隔离与并行会话](../ios/README.md#测试隔离与并行会话)。

单元测试，在仓库根目录运行：

```bash
sh ios/scripts/run-ios-tests.sh -only-testing:FangguTests
```

UI 测试按改动挑选用例，用例名见 [测试一览 · 原生测试](../tests/README.md#原生测试)。例如打卡与评价：

```bash
sh ios/scripts/run-ios-tests.sh -only-testing:FangguTests -only-testing:FangguUITests/UIUXFixTests -only-testing:FangguUITests/FangguUITests/testArrivalOnlySavesAfterReleasingAtTheEnd -only-testing:FangguUITests/FangguUITests/testSixDimensionReleaseAutosavesAndResets
```

构建前确保 `catalog.json` 已导出、`Artwork/` 已同步、`xcodegen generate` 已运行；素材缺失时 `sync-artwork.sh` 会列出缺少的文件并以非零状态退出。更多行为说明与命令见 [iOS 开发说明](../ios/README.md)。

### 编译和运行分开

`xcodebuild test` 每次都先编译再运行。改测试或反复排查时，先编译一次，再按需挑选用例运行；App 或测试代码改动后都要重新编译，测试 bundle 同样是编译产物。

```bash
FANGGU_TEST_ACTION=build-for-testing sh ios/scripts/run-ios-tests.sh
```

```bash
FANGGU_TEST_ACTION=test-without-building sh ios/scripts/run-ios-tests.sh -only-testing:FangguUITests/UIUXFixTests
```

`test-without-building` 直接运行 `ios/build/DerivedData` 里上一次编译出的 App 与测试 bundle；还没编译过时 `xcodebuild` 会报错，先执行上面的 `build-for-testing`。`-only-testing` 可以精确到 `FangguUITests/FangguUITests/testArrivalOnlySavesAfterReleasingAtTheEnd` 这样的单个方法；`-resultBundlePath` 指定路径可以保留截图附件。

### 用例按类并行

Scheme 已把 `FangguUITests` 标为可并行（`ios/project.yml` 中的 `parallelizable: true`）。脚本默认传 `-parallel-testing-enabled NO`，在目标模拟器上串行执行；设 `FANGGU_PARALLEL_TESTS=1` 改为 `-parallel-testing-enabled YES`，xcodebuild 以测试类为单位分配给克隆出来的模拟器，`FANGGU_PARALLEL_WORKERS`（默认 2）作为 `-parallel-testing-worker-count` 限制克隆数量；同一类内部仍按方法名顺序串行。

```bash
FANGGU_PARALLEL_TESTS=1 FANGGU_TEST_ACTION=test-without-building sh ios/scripts/run-ios-tests.sh -only-testing:FangguUITests
```

- 克隆以目标模拟器当时的内容为起点，结束后自动删除，目标模拟器不被修改。每个克隆都要启动，机器繁忙时并行未必更快；只跑一个类时没有收益。
- 每个 UI 用例通过 `XCUIApplication.isolated()` 使用全新的记录与外观作用域，用例之间不共享数据，顺序与并行结果一致。排查顺序相关问题时去掉 `FANGGU_PARALLEL_TESTS`，即在目标模拟器上串行执行。

### 测试专用启动参数

App 在 DEBUG 构建里识别以下参数，实现在 `ios/Fanggu/UITestLaunch.swift`；Release 构建把它们整段编译掉，行为不变。

| 参数 | 作用 |
| --- | --- |
| `-uiTestDisableAnimations` | 关闭 UIKit 过渡动画（导航推入、弹出页、键盘、底部栏切换），缩短每步之后等待 App 空闲的时间。SwiftUI 状态动画不受影响：六维图松手后的吸附弹簧、到访拖动块提前松手的复位、印章落定仍照常运行并继续被测试 |
| `-uiTestOpenSite <id>` | 启动时在图鉴的导航栈上直接推入该古迹详情；图鉴仍在下层，“返回”照常工作 |
| `-uiTestOpenReview` | 与 `-uiTestOpenSite` 同用，详情出现后立即弹出评价页；只对启动后的第一次详情生效，之后关闭再打开都走正常按钮 |

测试侧统一使用 `ios/FangguUITests/UITestSupport.swift`：

- `XCUIApplication.isolated()` 之后调用 `launchForTest(site:review:arguments:)`：关闭过渡动画，并按需直达详情或评价页；`relaunch()` 用同样的参数和作用域真实地杀进程再启动。验证“重启后数据还在”的段落仍然这样做，没有换成 mock。
- 只有页面导航不是验证对象时才用深链接。搜索进入详情、筛选别名、大图卡片、足迹地点、年表节点和列表综合分仍各有用例走真实路径。
- 外观等 `UserDefaults` 设置可以通过参数域预设，例如 `-fanggu.appearance dark`，作用域套件同样读取参数域，不必先去“我的”切换。

### 滚动

`dragPage(up:)` 与 `reveal(_:up:attempts:)` 沿屏幕左缘做一次默认速度的匀速拖动（约 60% 屏高），不会碰到六维圆点、拖动块或文字编辑框；键盘弹出时从键盘上方起手。松手时没有惯性，测试框架等待 App 空闲的时间只有约 0.1 秒；`swipeUp()` 和快速拖动会甩出惯性滚动，每次要多等约 2 秒。`reveal` 要求目标中心离顶部栏和底部区域都有余量，避免只露出一条边就去点；页面和弹出页内找按钮都用它，系统菜单内部的滚动仍用 `swipeUp()`。

### 耗时记录

2026-10-05 在同一台 iPhone 16 Pro（iOS 18.6）模拟器上，`UIUXFixTests` 5 条加 `FangguUITests` 的 `testSixDimensionReleaseAutosavesAndResets`、`testSixDimensionLowGradesStayIndividuallyDraggable`、`testReviewShortTextAutosavesAndClearIsImmediate`、`testArrivalOnlySavesAfterReleasingAtTheEnd`、`testCatalogOpensNativeDetail`、`testLargeCardShowsArrivalSlider` 共 11 条，用 `test-without-building` 运行，不含编译。当时机器同时跑着其他会话的编译与模拟器（负载平均 500–1000），绝对值偏慢，只看同机对照：

| 运行方式 | 用例合计 | 墙钟 | 结果 |
| --- | --- | --- | --- |
| 优化前，串行 | 706 秒 | 830 秒 | 11 通过 |
| 优化后，串行 | 272 秒 | 276 秒 | 11 通过 |
| 优化后，按类并行（2 个克隆） | 两类各约 130 秒 | 269 秒 | 11 通过 |

最慢几条的变化：`testReviewResetAndClearCanBeUndone` 109 → 21 秒，`testReviewShortTextAutosavesAndClearIsImmediate` 178 → 46 秒（含本类首次安装启动 13 秒），`testSixDimensionReleaseAutosavesAndResets` 64 → 41 秒（4 次真实重启保留），`testMaximumAccessibilitySizeSupportsAllSixRatingsAndText` 65 → 57 秒。并行在重负载下几乎没有收益，因为两个克隆的启动抵消了节省；空闲机器上预期墙钟接近单类耗时。issue 记录的空闲机器基线为 7 分 20 秒，优化后未在空闲机器上复测。

## 新增测试的约定

- 修复行为缺陷时补一条能复现缺陷的测试；格式或静态说明改动不加测试。
- 每个新增批次一个文件，命名为 `<地区或主题>-<yyyymmdd>.test.cjs`，或沿用已有的 `<地区>.test.cjs`。断言内容：ID 唯一、所绘主体与年代、国别与地域、默认未到访、线稿与设色记录和原件哈希绑定、验收状态为 `approved_default`（用户明确通过的为 `approved_user`，不再断言新图为 `pending_user`）、队列与清单覆盖、iOS 导出一致。批次 ID 优先从 `assets/research/<batch>-batch.json` 读取。
- `tests/catalog.test.cjs` 维护全库覆盖列表，新增 ID 加入其中；`tests/helpers/native-catalog.cjs` 提供 `assertUnvisited`，`archived-*.cjs` 保护历史验收记录。
- 原生测试放在 `ios/FangguTests`（逻辑、存储）或 `ios/FangguUITests`（交互）。单元测试用临时目录；UI 用例从 `XCUIApplication.isolated()` 加 `launchForTest` 开始，不直接用 `XCUIApplication()` 或裸 `launch()`；深链接只用于页面导航不是验证对象的用例，找按钮用 `reveal`，重启验证用 `relaunch`。
- 多语言：Xcode 方案的测试动作固定为简体中文，单元测试可直接断言中文文案；需要其他语言的单元测试给 `LibraryStore` 传 `language:`。`isolated()` 默认以简体中文启动 App，`isolated(language: "en", locale: "en_US")` 等用于英日界面；`LocalizationUITests` 检查英日主要页面没有遗留中文。新增界面文字后确认 `Localizable.xcstrings` 有英日译文，`tests/i18n.test.cjs` 会检查；命令行 `xcodebuild` 不会把新字串写回 `Localizable.xcstrings`，编译后可对照 `ios/build/DerivedData/Build/Intermediates.noindex/Fanggu.build/Debug-iphonesimulator/Fanggu.build/Objects-normal/arm64/*.stringsdata` 里编译器抽取的键补齐。逐古迹与专题译文缺失不算失败，测试只打印覆盖率。

## 汇报约定

- 列出实际执行的命令与结果；未执行或被跳过的检查单独列出，并说明原因，如缺素材、无模拟器、超时。
- 失败如实给出输出，不以历史报告或截图代替本次验证。
- 涉及界面、手势、导航、图片地址的改动，说明是否在模拟器或真机实际操作过；模拟 DOM 与单元测试不能代替。
- 新增古迹时同时报告图版验收状态（默认通过 `approved_default` 与用户明确通过 `approved_user` 各多少，不应残留 `pending_user`）、素材是否打包、代码是否提交。
