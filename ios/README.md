# 访古 iOS

SwiftUI 原生 App，最低 iOS 18。古迹目录由网页使用的 `sites.js`、`plates.js`、`colored-plates.js`、`protection-data.js`、`catalog.js`、图版研究 JSON 和 `style.css` 导出；古迹 ID、朝代色、年代说明、文保信息与来源链接同源。界面沿用网页的墨色、金线、印章、线稿和设色视觉。App 的个人记录保存在本机 Application Support，使用与网页相同的版本 3 JSON 结构，可导入版本 1、2、3 备份。

底部四栏导航在 iOS 26 使用系统 `TabView` 的 Liquid Glass；iOS 18–25 使用悬浮磨砂材质与选中态胶囊。旧系统的导航栏在输入时收起、退出详情后恢复；开启“降低透明度”时改用不透明底色。

## 构建

需要 Xcode、XcodeGen、Node.js，以及本地图版素材。仓库不包含图片。取得与 [Git 清单](../assets/asset-lock.json)匹配的本地资源包后，先恢复运行资源并同步：

```bash
node ios/scripts/build-catalog.cjs
python3 scripts/asset-bundle.py restore --bundle /path/to/<assetSet> --profile runtime
sh ios/scripts/sync-artwork.sh assets
cd ios
xcodegen generate
xcodebuild -project Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=iPhone 16 Pro' build
```

`sync-artwork.sh` 检查全部目录条目所需的线稿 PNG 和设色 AVIF。图片位于被忽略的 `ios/Fanggu/Resources/Artwork/`，不会误提交原件。数据、网页朝代色或图版清单变更时重新运行导出和同步命令。中文标题使用随 App 打包的 Ma Shan Zheng 与 Noto Serif SC 字体，均按 SIL Open Font License 授权，许可文本在 `Fanggu/Resources/Fonts/`。

## 迁移记录

在网页图鉴底部选择“导出备份”，将 JSON 放入 iPhone 的“文件”，再到 App“我的 → 导入网页或 App 备份”。同一古迹 ID 的记录、评价以导入值覆盖，其余保留；旧版备份不覆盖评价。App 中的资料仍在本机，换机前请导出备份。

首版包含原生图鉴、搜索与筛选、古迹详情、仅显示已到访地点的经纬网示意地图、按年代浏览、拖动打卡、心愿、日期与笔记、私人评分与短评、备份迁移。地图、图鉴与图片可离线浏览。图版与文保来源在详情页以参考链接提供。网页与 App 的私人记录目前通过备份文件迁移，没有在线同步。App Store 分发还需要开发者账号、签名和应用商店素材。

拖动打卡与网页采用相同的整幅图版渐显：设色图透明度随拖动进度增加，线稿在最后 20% 淡出。只能从“访”字拖动块开始，到达最右端并松手后才保存到访；提前松手会复原线稿。保存成功后完整设色图与印记停留约 1.35 秒，再切换为到访记录。辅助操作的“完成到访”也遵循相同的保存与呈现流程。设色图无法解码时保留线稿且不允许拖动打卡。

## 触觉反馈

触觉只响应明确的选择或结果；滚动、拖动过程、文字输入、打开详情和取消操作保持安静。实现集中在 `Fanggu/Haptics.swift`，使用系统 `UIFeedbackGenerator`，不会修改个人记录。

| 场景 | 反馈 | 触发时机 |
| --- | --- | --- |
| 图鉴状态与菜单筛选、地图地点、年表时期与节点、评分星级 | selection | 点选地点或选择确实改变时一次 |
| 心愿增删、已到访记录或评价更新、旧记录关联 | soft impact | 保存成功后一次 |
| 拖动或辅助操作完成到访、首次通过表单登记到访、备份导入 | success notification | 持久化成功后一次；拖动条在移动时仅预热发生器 |
| 表单校验、保存或备份操作失败 | error notification | 错误呈现时一次 |

同一操作只发一种结果反馈；重复选择、拖动未到终点、取消和保存失败不会产生成功反馈。触感须在支持 Taptic Engine 的真机上验收，模拟器构建只能验证代码与界面流程。
