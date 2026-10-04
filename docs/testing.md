# 原生测试运行方式

适用于 `ios/` 下的 `FangguTests` 与 `FangguUITests`。目标是在独立模拟器上快速、可重复地验证，不触碰真实个人记录。目录与审图脚本的 Node 测试见 [开发指南的验证矩阵](development.md#验证矩阵)。

## 准备

- 按 [iOS 开发说明](../ios/README.md#构建) 导出目录、同步图版并生成工程。没有图版时，到访打卡用例会因“设色图暂未加载”失败。
- 为本次验证创建独立模拟器，名称自定，用完可以 `xcrun simctl delete`：

```bash
xcrun simctl create "Fanggu 任务名" "iPhone 16 Pro" "com.apple.CoreSimulator.SimRuntime.iOS-18-6"
```

UI 用例会修改该模拟器里的到访记录、评价和外观设置，不要指向日常使用的设备。

## 编译和运行分开

`xcodebuild test` 每次都重新编译再运行。改测试或反复排查时，先编译一次，再按需挑选用例运行。改了 App 或测试代码后都要重新编译，测试 bundle 同样是编译产物。

```bash
xcodebuild -project ios/Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=Fanggu 任务名' -derivedDataPath ios/build/DerivedData build-for-testing
```

```bash
xcodebuild test-without-building -xctestrun "$(ls ios/build/DerivedData/Build/Products/Fanggu_iphonesimulator*.xctestrun | head -1)" -destination 'platform=iOS Simulator,name=Fanggu 任务名' -only-testing:FangguTests -only-testing:FangguUITests/UIUXFixTests
```

`ios/build/` 已被 Git 忽略。`-only-testing` 可以精确到 `FangguUITests/FangguUITests/testArrivalOnlySavesAfterReleasingAtTheEnd` 这样的单个方法；`-resultBundlePath` 指定路径可以保留截图附件。

## 用例按类并行

Scheme 已把 `FangguUITests` 标为可并行（`ios/project.yml` 中的 `parallelizable: true`）。xcodebuild 以测试类为单位分配给克隆出来的模拟器，类与类之间不共享记录；同一类内部仍按方法名顺序在同一台克隆上串行。

```bash
xcodebuild test-without-building -xctestrun "$(ls ios/build/DerivedData/Build/Products/Fanggu_iphonesimulator*.xctestrun | head -1)" -destination 'platform=iOS Simulator,name=Fanggu 任务名' -parallel-testing-enabled YES -parallel-testing-worker-count 2 -only-testing:FangguUITests
```

- 克隆以目标模拟器当时的内容为起点，结束后自动删除，目标模拟器本身不被修改。每个克隆都要启动，机器繁忙时用 `-parallel-testing-worker-count` 限制数量；只跑一个类时并行没有收益。
- `-parallel-testing-enabled NO` 在目标模拟器上串行执行，排查顺序相关问题时使用。
- 并行的前提是类与类之间不依赖对方留下的记录。当前划分：`FangguUITests` 只改 `liyeque`（李业阙）的记录与评价以及外观设置；`UIUXFixTests` 只改 `jp_nezu_romon`（根津神社楼门）和大图视图第一张卡片的评价；`AtlasTimelineUITests` 只纠正并撤销一处到访。新增用例沿用这种划分，不读取另一个类写入的数据。

## 测试专用启动参数

App 在 DEBUG 构建里识别以下参数，实现在 `ios/Fanggu/UITestLaunch.swift`；Release 构建把它们整段编译掉，行为不变。

| 参数 | 作用 |
| --- | --- |
| `-uiTestDisableAnimations` | 关闭 UIKit 过渡动画（导航推入、弹出页、键盘、底部栏切换），缩短每步之后等待 App 空闲的时间。SwiftUI 状态动画不受影响：六维图松手后的吸附弹簧、到访拖动块提前松手的复位、印章落定仍照常运行并继续被测试 |
| `-uiTestOpenSite <id>` | 启动时在图鉴的导航栈上直接推入该古迹详情；图鉴仍在下层，“返回”照常工作 |
| `-uiTestOpenReview` | 与 `-uiTestOpenSite` 同用，详情出现后立即弹出评价页；只对启动后的第一次详情生效，之后关闭再打开都走正常按钮 |

测试侧统一使用 `ios/FangguUITests/UITestSupport.swift`：

- `launchForTest(site:review:arguments:)` 关闭过渡动画，并按需直达详情或评价页；`relaunch()` 用同样的参数真实地杀进程再启动。验证“重启后数据还在”的段落仍然这样做，没有换成 mock。
- 只有页面导航不是验证对象时才用深链接。搜索进入详情、筛选别名、大图卡片、足迹地点和年表节点进入详情仍各有用例走真实路径。
- 外观等 `UserDefaults` 设置可以通过参数域预设，例如 `-fanggu.appearance dark`，不必先去“我的”切换。

## 滚动

`dragPage(up:)` 与 `reveal(_:up:attempts:)` 沿屏幕左缘做一次默认速度的匀速拖动（约 60% 屏高），不会碰到六维圆点、拖动块或文字编辑框。松手时没有惯性，测试框架等待 App 空闲的时间只有约 0.1 秒；`swipeUp()` 和快速拖动会甩出惯性滚动，每次要多等约 2 秒。页面和弹出页内找按钮都用它；系统菜单内部的滚动仍用 `swipeUp()`。

## 耗时记录

ANCHOR_TIMING
