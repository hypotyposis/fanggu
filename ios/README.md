# 访古 iOS

SwiftUI 原生 App，最低 iOS 18。古迹目录由仓库中的 `sites.js`、`plates.js`、`colored-plates.js` 和 `catalog.js` 导出；古迹 ID 与网页一致。App 的个人记录保存在本机 Application Support，使用与网页相同的版本 3 JSON 结构，可导入版本 1、2、3 备份。

## 构建

需要 Xcode、XcodeGen、Node.js，以及完整的本地图版素材。仓库不包含图片，先从素材副本同步：

```bash
node ios/scripts/build-catalog.cjs
sh ios/scripts/sync-artwork.sh /path/to/fanggu/assets
cd ios
xcodegen generate
xcodebuild -project Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=iPhone 16 Pro' build
```

`sync-artwork.sh` 检查全部目录条目所需的线稿 PNG 和设色 AVIF。图片位于被忽略的 `ios/Fanggu/Resources/Artwork/`，不会误提交原件。数据或图版清单变更时重新运行导出和同步命令。

## 迁移记录

在网页图鉴底部选择“导出备份”，将 JSON 放入 iPhone 的“文件”，再到 App“我的 → 导入网页或 App 备份”。同一古迹 ID 的记录、评价以导入值覆盖，其余保留；旧版备份不覆盖评价。App 中的资料仍在本机，换机前请导出备份。

首版包含原生图鉴、搜索与筛选、古迹详情、地图、按年代浏览、拖动打卡、心愿、日期与笔记、私人评分与短评、备份迁移。地图底图由 Apple MapKit 提供，需要网络加载；图鉴与图片可离线浏览。图版来源在详情页以参考链接提供。App Store 分发还需要开发者账号、签名和应用商店素材。
