# 架构与数据流

本文给第一次进入仓库的人和代理一张地图：仓库里有什么、数据怎样流到 App、哪些文件是生成物、本地素材如何分层。规则见 [AGENTS.md](../AGENTS.md)，机制细节见 [开发指南](development.md)，字段定义见 [数据模型](data-model.md)，操作步骤见 [常见任务](tasks.md)。

## 一句话

访古是一款可离线使用的 iOS 原生 App：浏览古迹图鉴（线稿与设色图版）、搜索筛选、足迹地图与年表、拖动打卡、心愿单、笔记和六维评价。仓库同时保存古迹目录的源数据、图版生产脚本与本地审图工具。网页产品已移除，根目录的 HTML 只是本地工具，不对外发布。

## 仓库地图

| 路径 | 内容 | 备注 |
| --- | --- | --- |
| `AGENTS.md`、`CLAUDE.md` | 代理约定入口 | `CLAUDE.md` 只导入 `AGENTS.md` |
| `README.md` | 产品简介、运行与验证入口、文档地图 | |
| `docs/` | 开发指南、操作手册、国保规则、架构、数据模型、任务、测试、术语 | [索引](README.md) |
| `docs/reviews/` | 带日期的设计评审与修复记录 | 历史资料，不是新任务的授权 |
| `sites.js` | 目录源数据：`DYN` 时代、`SITES` 古迹、`CHAPTERS` 章节、`PLACES` 地点 | 手工维护 |
| `catalog.js` | 国家、地区、省份、类型定义与分类、筛选、搜索逻辑 | 手工维护；浏览器全局与 CommonJS 双入口 |
| `protection.js` | 国保查询接口：标签、批次名、搜索文本 | 手工维护 |
| `protection-data.js` | 国保登记数据 | **生成**自 `assets/research/national-protection.json` |
| `plates.js` | 线稿图版清单 `PLATES`，加载时把 `image` 写回 `SITES` | **生成** |
| `colored-plates.js` | 设色图版清单 `COLORED_PLATES` | **生成** |
| `sources.html` | 图版来源与署名页 | **生成** |
| `palette.css` | 时代色板（CSS 变量），制图、iOS 导出、审图共用 | 手工维护 |
| `proof.html`、`color-proof.*`、`color-studies.*`、`plate-preview.css` | 本地审图工具 | 需要本地素材 |
| `draft.js`、`buildings.js` | 旧的参数化 SVG 立面绘制器，只供 `proof.html` 回退 | 不参与 App |
| `scripts/` | 图版、国保、素材包脚本 | [脚本一览](../scripts/README.md) |
| `assets/` | 图版记录、研究 JSON、队列、清单；图片本身被 Git 忽略 | [图版说明](../assets/README.md) |
| `assets/asset-lock.json` | 被忽略素材的逐文件 SHA-256 清单 | Git 跟踪 |
| `ios/` | SwiftUI App、原生测试、XcodeGen 配置、导出脚本、图标源稿 | [iOS 说明](../ios/README.md) |
| `i18n/en.json`、`i18n/ja.json` | 英文、日文译文：术语、逐个古迹正文、专题名录 | 手工维护；`tests/i18n.test.cjs` 核对完整与对齐 |
| `ios/Fanggu/Resources/catalog.json` | App 读取的目录（中文） | **生成**自 `build-catalog.cjs`，Git 跟踪；另有 `catalog-en.json`、`catalog-ja.json` 与 `curations*.json` |
| `ios/Fanggu/Resources/Artwork/` | App 打包的图版 | **同步**自 `assets/`，Git 忽略 |
| `tests/` | Node 与 Python 回归测试 | [测试一览](../tests/README.md) |

## 数据流

### 目录：源数据到 App

```text
sites.js → plates.js → colored-plates.js → protection-data.js → protection.js → catalog.js
          （浏览器全局对象按此顺序加载；build-catalog.cjs 用 vm 以同样顺序执行）
      │
      │  FangguCatalog.classify(SITES, PLACES)：按 placeKey 对应地点派生 country / province / region，附国保登记
      │  + palette.css 的色值（DYN.acc 指向的 CSS 变量）
      │  + assets/research/<id>.json 的本体坐标（siteLatitude / siteLongitude）与来源链接
      ▼
node ios/scripts/build-catalog.cjs   （+ i18n/en.json、i18n/ja.json 的译文）
      ▼
ios/Fanggu/Resources/catalog.json、catalog-en.json、catalog-ja.json
      →  LibraryStore 按 App 当前语言解码其中一份为 [Monument]
```

目录改动（`sites.js`、`catalog.js`、研究 JSON、国保 JSON、`palette.css`）都以重新运行导出结束。`catalog.json` 随 Git 提交，`tests/ios-catalog.test.cjs` 核对它与源数据逐项一致。导出时会去掉 `lede`、`facts`、`quote` 中的 HTML 标签。

### 图版：原件到交付图再到 App

```text
内置 imagegen 生成白底 PNG
  线稿原件 assets/generated/<id>.png   + 记录 assets/research/<id>.json
  设色原件 assets/colored/<id>.png     + 记录 assets/color-research/<id>.json + 队列 queue.json

node scripts/prepare-plates.mjs
  line-plate.mjs → prototype-matte.py（原型模式）或 white-matte.py / magick（严格模式）
  → assets/plates/<id>.png（着时代色的透明线稿）、plates.js、sources.html

python3 -B scripts/prepare-colored-avif.py
  去底 → assets/colored-transparent/<id>.png → assets/colored-transparent-avif/<id>.avif
  → assets/color-research/avif-manifest.json（参数、哈希、验收状态）

node scripts/collect-colored-plates.mjs --require-complete
  → colored-plates.js、assets/color-research/progress.json、prompts.json

sh ios/scripts/sync-artwork.sh assets
  rsync 线稿 PNG、设色 AVIF、卢舍那原图 → ios/Fanggu/Resources/Artwork/
```

App 按到访状态选图：未到访显示时代色线稿 `lineImage`，到访后显示设色图 `colorImage`；设色图缺失或解码失败时保留线稿。三张正式版设色图（卢舍那、佛光寺东大殿、应县木塔）不在队列中，由 `queue.excluded` 单独接入。

### 国保：官方名单到标签

`assets/research/national-protection.json` 是唯一源数据。`node scripts/prepare-protection.mjs` 生成 `protection-data.js`；`protection.js` 提供 `forSite`、`badges`、`searchText`；`catalog.js` 分类时附带登记；导出进入 `catalog.json` 的 `protection[]`。规则与来源见 [国保标签与选目规则](national-protection.md)。

## 源文件与生成文件

| 生成文件 | 生成器 | 源输入 | Git |
| --- | --- | --- | --- |
| `plates.js`、`sources.html`、`assets/plates/*.png` | `scripts/prepare-plates.mjs` | `sites.js`、`palette.css`、`assets/generated/`、`assets/research/*.json` | JS 与 HTML 跟踪；PNG 忽略 |
| `assets/colored-transparent/`、`assets/colored-transparent-avif/`、`assets/color-research/avif-manifest.json` | `scripts/prepare-colored-avif.py` | `queue.json`、`assets/colored/`、`assets/color-studies/v1/`、逐图设色记录 | 清单跟踪；图片忽略 |
| `colored-plates.js`、`assets/color-research/progress.json`、`prompts.json` | `scripts/collect-colored-plates.mjs` | `queue.json`、逐图设色记录、`avif-manifest.json` | 跟踪 |
| `protection-data.js` | `scripts/prepare-protection.mjs` | `assets/research/national-protection.json` | 跟踪 |
| `ios/Fanggu/Resources/catalog.json`、`catalog-en.json`、`catalog-ja.json`、`curations.json`、`curations-en.json`、`curations-ja.json` | `ios/scripts/build-catalog.cjs` | 上述全部 JS、`curations.js`、`palette.css`、研究 JSON、`i18n/*.json` | 跟踪 |
| `ios/Fanggu/Resources/Artwork/` | `ios/scripts/sync-artwork.sh` | `assets/plates/`、`assets/colored-transparent-avif/`、`assets/longmen-vairocana.png` | 忽略 |
| `ios/Fanggu.xcodeproj/` | `xcodegen generate` | `ios/project.yml` | 跟踪 |
| `ios/Fanggu/Assets.xcassets/AppIcon.appiconset/` | `ios/scripts/build-icon.py` | `ios/icon-concepts/chiwen/AppIcon.appiconset/` | 跟踪 |
| `assets/asset-lock.json` | `scripts/asset-bundle.py lock` | 被 Git 忽略的 `assets/**` 文件 | 跟踪 |

生成文件不手工修补：改源输入或生成器后重建。每个生成器会读什么、写什么、需要什么依赖，见 [脚本一览](../scripts/README.md)。

## iOS App 模块

| 文件 | 职责 |
| --- | --- |
| `FangguApp.swift` | 入口；注册打包字体；创建并注入 `LibraryStore` |
| `ContentView.swift` | 四栏导航（图鉴、足迹、年表、我的）与 iOS 18–25 的悬浮底栏；`ExploreView` 图鉴列表、状态与筛选；`ArtworkView` 图版；`MonumentCard` 大图卡片 |
| `MonumentDetailView.swift` | 古迹详情；`ArrivalSlider` 拖动打卡；`VisitEditor` 到访日期与笔记；`ReviewEditor` 六维评价编辑 |
| `RecordControls.swift` | 共用到访操作 `VisitActions`、撤销提示 `UndoFeedback` 与其呈现状态 `UndoPresentation` |
| `MapTimelineView.swift` | 足迹地图 `AtlasMapView`、地点弹出页；`TimelineCatalog` 在加载目录时一次计算年表索引 |
| `SketchMapLayout.swift` | 地图投影与地点聚合的纯几何；`tests/ios-map-layout.test.cjs` 直接编译运行它 |
| `OfflineLand.swift` | 读取随 App 打包的 Natural Earth 陆地 GeoJSON |
| `TimelineView.swift` | 年表页：地域与时期选择、等距时间轴、节点与列表 |
| `MyLibraryView.swift` | 我的：统计、到访与心愿列表、外观、备份导出导入、旧记录关联 |
| `LibraryStore.swift` | 个人记录的唯一读写入口：校验、原子保存、备份、导入合并、撤销、旧记录关联 |
| `Models.swift` | `Monument`（`catalog.json` 的解码类型）、`VisitRecord`、`LibraryData`、`Palette`、`FangguFont` |
| `Review.swift`、`ReviewRadar.swift` | 六维评价的维度、档位、投影与防抖；六维图的编辑与只读视图 |
| `CatalogSearch.swift` | 多关键词搜索；国家、地区、省份名来自目录，类型别名表须与 `catalog.js` 保持同步；同时匹配其他语言的名称（`searchAliases`） |
| `Localization.swift`、`Localizable.xcstrings`、`InfoPlist.xcstrings` | App 语言解析（跟随系统为 App 选定的语言）、各语言目录文件名与分隔符；界面与权限说明的英日译文 |
| `LocationCenter.swift` | 位置中心：`CatalogDistance`（按距离排序、附近 30 公里筛选、就在附近 2 公里的纯函数）、`NearbyPlanner`（提醒规则：3 公里、最近 20 处围栏、每日一次）、`LocationCenter`（定位授权、当前位置、围栏与本地通知）；只读个人记录 |
| `DesignSystem.swift` | 外观设置、印章、标题、分隔线、按钮、输入框等共用控件 |
| `Haptics.swift` | 触觉反馈的集中实现 |

个人记录保存在本机 Application Support 下 `Fanggu/library.json`（版本 4）；外观选项与附近提醒开关保存在 `UserDefaults`（`fanggu.appearance`、`fanggu.nearbyReminder.*`）；撤销只在内存中保留最近一次，不进备份。格式与约束见 [数据模型 · 个人记录](data-model.md#个人记录-libraryjson)。

## 本地素材分层

图片、原稿、参考照片、PDF 与 `assets/research/*.html` 人审页全部被 `.gitignore` 排除，只有记录与哈希清单进入 Git。

| 层级 | 内容 | 作用 |
| --- | --- | --- |
| `runtime` | `assets/plates/*.png`、`assets/colored-transparent-avif/*.avif`、`assets/longmen-vairocana.png` | App 构建与本地交付图预览的最小集合；与 `catalog.json` 的 `lineImage`、`colorImage` 一一对应 |
| `source` | `assets/generated/`、`assets/colored/`、`assets/colored-transparent/`、`assets/colored-avif/`、`assets/references/`、`assets/color-references/`、本地人审页等 | 重新制图、原设色对照、完整 Node 测试所需 |
| `full` | `runtime` 加 `source` | `asset-bundle.py` 的 `--profile full` |

新克隆或 worktree 默认没有这些文件：`sync-artwork.sh` 会报缺目录，大多数 Node 测试会因 `ENOENT` 失败，Xcode 构建也会因 `ios/Fanggu/Resources/Artwork/` 不存在而失败。恢复方法见 [开发指南 · 本地资源包](development.md#本地资源包)，可运行的测试子集见 [测试与验证 · 没有本地素材时](testing.md#没有本地素材时)。

## 本地审图工具

在仓库根目录运行 `python3 -m http.server 8765 --bind 127.0.0.1`，然后打开：

| 页面 | 用途 | URL 参数 |
| --- | --- | --- |
| `proof.html` | 线稿总览与单张查看 | `view=grid` 网格；`fig=<id>` 单张 |
| `color-proof.html` | 线稿与设色对照、背景切换、逐张浏览 | `ids=id1,id2` 限定范围；`mode=pair` 并列；`ref=line` 单图默认对照线稿；`bg=` 背景；`id=<id>` 单图 |
| `color-studies.html` | 三张正式版设色图版 | 无 |
| `sources.html` | 图版来源与署名（生成） | 锚点 `#<id>` |

这些页面只读本地素材，不写个人记录，不是网页产品。

## 环境依赖

| 用途 | 需要 |
| --- | --- |
| 目录导出、Node 测试 | Node.js；仓库没有 `package.json`，不装 npm 依赖 |
| 线稿重建、`line-plate` 与 `prototype-pipeline` 测试 | ImageMagick 7 的 `magick` 命令 |
| 透明处理、AVIF 转码、Python 测试 | Python 3、NumPy、带 AVIF 编码支持的 Pillow |
| 素材包 | Python 3、Git |
| App 构建、原生测试、`ios-map-layout.test.cjs` | Xcode 与 Swift 工具链、XcodeGen、iOS 模拟器 |
| 图版同步 | `rsync` |

## 当前快照

截至 2026-10-05，目录 476 处（中国 392、日本 64，另有朝鲜半岛与东南亚条目），地点 262 个，时代 41 个，设色队列 473 项加 3 张正式版，国保登记 368 处、待核对 72 处。长期规则以数据为准，不复制这些数字；需要时用下面的命令重新统计：

```bash
node -e "const vm=require('node:vm'),fs=require('node:fs');const {SITES,PLACES,DYN}=vm.runInNewContext(fs.readFileSync('sites.js','utf8')+'\n({SITES,PLACES,DYN})');console.log('sites',SITES.length,'places',PLACES.length,'dyn',Object.keys(DYN).length)"
```
