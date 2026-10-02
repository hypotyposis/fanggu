# 访古

以细线描的笔意，记下走过与向往的古迹。访古是一款可离线浏览的 iOS 原生 App，提供古迹图鉴、搜索筛选、地图年表、拖动打卡、心愿单、笔记与六维评价。图版随 App 打包，个人记录保存在本机，可通过 JSON 备份迁移。

开发入口：[iOS App](ios/README.md) · [AGENTS.md](AGENTS.md) · [开发指南](docs/development.md) · [图版维护](assets/README.md)

## 运行 App

需要 Xcode、XcodeGen、Node.js 和本地图版素材。图片、原稿和参考照片不随 Git 交付；新克隆先按 [本地资源包说明](docs/development.md#本地资源包)恢复运行素材，再构建：

```bash
node ios/scripts/build-catalog.cjs
sh ios/scripts/sync-artwork.sh assets
cd ios
xcodegen generate
xcodebuild -project Fanggu.xcodeproj -scheme Fanggu -destination 'platform=iOS Simulator,name=iPhone 16 Pro' build
```

使用、备份和原生验证见 [iOS 开发说明](ios/README.md)。App 可读取版本 1–4 备份，旧版 JSON 仍可导入。新增古迹默认未到访；已有记录优先，不臆填到访日期。

## 本地制图与审图

网页产品已移除。仓库保留目录数据、图版生产脚本及本地审图工具，支持 App 内容维护：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

直接打开 [线稿总览](http://localhost:8765/proof.html?view=grid)、[设色校对](http://localhost:8765/color-proof.html)或 [图版来源](http://localhost:8765/sources.html)。浏览和对照只读取本地素材，不写个人记录。

古迹目录由 `sites.js`、图版清单、文保资料、分类与 `palette.css` 导出到 iOS。来源、原件、真实提示词和用户验收对象继续保留。新增或重绘使用内置 imagegen 生成白底 PNG，再本地去底并交付透明 PNG／AVIF；线稿为照片参考的艺术意写，非实测或修缮图。原型阶段以用户人眼验收为准。

生产流程见 [增量制图手册](docs/monument-batch-workflow.md)、[线稿规范](assets/research/STYLE.md)、[设色流程](assets/color-research/WORKFLOW.md)和 [国保标签规则](docs/national-protection.md)。

## 验证

```bash
node --test tests/*.test.cjs
node scripts/prepare-protection.mjs --check
git diff --check
```

完整测试读取本地图版和参考文件；原生测试、界面与真机验证见 [iOS 开发说明](ios/README.md#六维评价)。只改文档或普通界面时不全量重建图版。
