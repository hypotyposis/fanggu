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
| 持续集成 | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | 前四项、`build-catalog.cjs` 导出与 Git 一致、原生单元测试与 Swift 地图几何；UI 测试仅手动触发 | GitHub Actions；没有本地素材，读图用例跳过 |

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

原生测试通过 `ios/scripts/run-ios-tests.sh` 运行。脚本为当前检出创建并启动名为 `Fanggu <检出目录名>` 的独立模拟器，以 `id=` 指定目标，使用被 Git 忽略的 `ios/build/DerivedData`，关闭并行测试；其余参数原样传给 `xcodebuild`。UI 测试以 `FANGGU_LIBRARY_SCOPE` 启动 App，记录与外观写入独立作用域，不触碰模拟器中的真实个人记录。多个会话并行时不得共用模拟器，细节见 [开发指南 · 并行会话与测试隔离](development.md#并行会话与测试隔离)与 [iOS 开发说明 · 测试隔离与并行会话](../ios/README.md#测试隔离与并行会话)。

单元测试，在仓库根目录运行：

```bash
sh ios/scripts/run-ios-tests.sh -only-testing:FangguTests
```

UI 测试按改动挑选用例，用例名见 [测试一览 · 原生测试](../tests/README.md#原生测试)。例如打卡与评价：

```bash
sh ios/scripts/run-ios-tests.sh -only-testing:FangguTests -only-testing:FangguUITests/UIUXFixTests -only-testing:FangguUITests/FangguUITests/testArrivalOnlySavesAfterReleasingAtTheEnd -only-testing:FangguUITests/FangguUITests/testSixDimensionReleaseAutosavesAndResets
```

任务结束后运行 `sh ios/scripts/test-device.sh delete` 回收模拟器；`FANGGU_SIM_NAME` 可指定名称，`FANGGU_DERIVED_DATA` 可指定构建目录。

构建前确保 `catalog.json` 已导出、`Artwork/` 已同步、`xcodegen generate` 已运行；素材缺失时 `sync-artwork.sh` 会列出缺少的文件并以非零状态退出。更多行为说明与命令见 [iOS 开发说明](../ios/README.md)。

## 新增测试的约定

- 修复行为缺陷时补一条能复现缺陷的测试；格式或静态说明改动不加测试。
- 每个新增批次一个文件，命名为 `<地区或主题>-<yyyymmdd>.test.cjs`，或沿用已有的 `<地区>.test.cjs`。断言内容：ID 唯一、所绘主体与年代、国别与地域、默认未到访、线稿与设色记录和原件哈希绑定、队列与清单覆盖、iOS 导出一致。批次 ID 优先从 `assets/research/<batch>-batch.json` 读取。
- `tests/catalog.test.cjs` 维护全库覆盖列表，新增 ID 加入其中；`tests/helpers/native-catalog.cjs` 提供 `assertUnvisited`，`archived-*.cjs` 保护历史验收记录。
- 原生测试放在 `ios/FangguTests`（逻辑、存储）或 `ios/FangguUITests`（交互）。单元测试用临时目录；UI 用例通过 `XCUIApplication.isolated()` 启动 App，不直接用 `XCUIApplication()`。

## 汇报约定

- 列出实际执行的命令与结果；未执行或被跳过的检查单独列出，并说明原因，如缺素材、无模拟器、超时。
- 失败如实给出输出，不以历史报告或截图代替本次验证。
- 涉及界面、手势、导航、图片地址的改动，说明是否在模拟器或真机实际操作过；模拟 DOM 与单元测试不能代替。
- 新增古迹时同时报告图版验收状态（`pending_user` 或 `approved_user`）、素材是否打包、代码是否提交。
