# 开发指南

本指南说明当前项目的模块关系、数据约束、资产流程和验证方法。简要约定见 [AGENTS.md](../AGENTS.md)，产品操作见 [README](../README.md)，图版目录见 [assets/README.md](../assets/README.md)。

## 环境与首次运行

访古只维护 iOS 原生 App。构建、个人记录、六维评价和旧版备份导入见 [iOS 开发说明](../ios/README.md)。根目录的 JavaScript 文件用于维护古迹目录、分类、文保和图版清单，并由 `node ios/scripts/build-catalog.cjs` 导出到 App；不是网页产品。修改目录、研究 JSON、文保来源或 `palette.css` 后重新导出，图版变化时再同步本地素材。

本地制图和审图工具使用原生 HTML/CSS/JavaScript，无 npm 依赖或网页构建。需要 Node.js、Python 3；重建线稿需 ImageMagick，透明处理和 AVIF 编码依赖见下文。App 构建需要 Xcode 和 XcodeGen。

本地审图在仓库根目录运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

直接打开 [线稿总览](http://localhost:8765/proof.html?view=grid)、[设色校对](http://localhost:8765/color-proof.html)或 [图版来源](http://localhost:8765/sources.html)。这些是本地生产工具，没有网页首页、个人记录或公网发布流程。校对页使用系统回退字体，可离线读取本地素材。

图片、原稿、参考照片与 PDF 被 `.gitignore` 排除，新克隆或 worktree 需先补齐素材。App 和审图所需运行素材为 `assets/colored-transparent-avif/`、`assets/plates/` 与 `assets/longmen-vairocana.png`；原设色对照、完整测试与重新制图另需原 PNG、研究 JSON 所列参考文件及 `assets/generated/` 原稿。

### 本地资源包

`assets/asset-lock.json` 由 Git 跟踪，逐文件记录被忽略素材的相对路径、字节数、SHA-256 和用途层级。`runtime` 对应 iOS 目录所需线稿、设色 AVIF 和卢舍那原图；`source` 包含其余原稿、透明 PNG、参考照片、PDF 和本地审图记录。`runtime` 足以显示 iOS 图版和本地交付图预览；校对页的原设色对照、完整测试和重新制图需要 `full`。资源包写入被 Git 忽略的 `asset-dist/<assetSet>/`，包含 `index.json` 和分卷 TAR；不改变制图素材和 App 的图片路径。

在拥有完整本地素材的工作区，素材改变后运行：

```bash
python3 scripts/asset-bundle.py lock
python3 scripts/asset-bundle.py verify --profile full
python3 scripts/asset-bundle.py pack
```

将整个 `asset-dist/<assetSet>/` 目录复制到独立存储位置，保留 `index.json` 和所有 TAR。新克隆或 worktree 取得匹配版本的资源包后，在仓库根目录运行：

```bash
python3 scripts/asset-bundle.py restore --bundle /path/to/<assetSet> --profile runtime
python3 scripts/asset-bundle.py verify --profile runtime
# 需要原稿与参考资料时：
python3 scripts/asset-bundle.py restore --bundle /path/to/<assetSet> --profile full
```

恢复先检查 Git 中的清单与资源包索引是否匹配、所需分卷的 SHA-256，再逐文件校验内容；本地已有且哈希相同的文件会跳过，内容不同则停止，只有明确指定 `--force` 才覆盖。`runtime` 恢复无需复制 `source` 分卷，但分包时仍需完整素材。运行 `python3 -B -m unittest discover -s tests -p test_asset_bundle.py` 验证打包器。清单和 TAR 不会自动提供异地备份；只有把资源包复制到独立存储并再次恢复校验后，才考虑清理 Git 历史中的旧大文件。

## 模块与依赖

| 文件 | 责任与修改入口 |
| --- | --- |
| `sites.js` | `SITES` 古迹正文、`DYN` 朝代、`CHAPTERS` 章节、`PLACES` 地点 |
| `catalog.js` | 国家、地区、行政区、类型和搜索分类；供 iOS 导出和目录验证使用 |
| `protection.js` / `protection-data.js` | 国保资料查询 / 生成的官方登记数据 |
| `plates.js` / `colored-plates.js` | 生成的线稿 / 设色清单，路径相对仓库根目录 |
| `palette.css` | 制图、App 导出与本地审图共用的朝代色板 |
| `plate-preview.css` | 本地审图的基础样式与参数 SVG 样式 |
| `draft.js` / `buildings.js` | 本地线稿校对页的历史参数 SVG 回退 |
| `proof.html` / `color-proof.*` / `color-studies.*` / `sources.html` | 本地线稿、设色、三处正式版和来源查阅工具 |
| `i18n/en.json` / `i18n/ja.json` | 英文、日文目录译文：国家、地区、类型、时代、行政区、地点、国保来源名等术语，以及逐个古迹的正文译文 |
| `ios/scripts/build-catalog.cjs` | 从上述数据、研究 JSON、色板和译文导出 App 的中文、英文、日文目录 |
| `ios/scripts/sync-artwork.sh` | 将完整运行图版同步到 App 资源目录 |
| `ios/Fanggu/LibraryStore.swift` | 个人记录校验、保存、备份迁移与失败恢复 |
| `ios/Fanggu/ContentView.swift` / `MonumentDetailView.swift` / `MapTimelineView.swift` / `TimelineView.swift` / `MyLibraryView.swift` | 原生图鉴、详情、地图年表和个人资料 |
| `ios/Fanggu/Localizable.xcstrings` / `InfoPlist.xcstrings` / `Localization.swift` | 界面文字与 App 名称的英日译文；按系统为 App 解析的语言选择目录与字体 |

目录导出按 `sites.js → plates.js → colored-plates.js → protection-data.js → protection.js → catalog.js` 加载。普通浏览器脚本仍依赖全局对象和顺序；修改共享接口时检查导出和相关审图页，Node 测试所用模块保留 CommonJS 入口。

国保的唯一源数据为 `assets/research/national-protection.json`，身份标签不写入个人备份。修改审图链接或缓存参数时检查 `proof.html`、`color-proof.html`、`color-studies.html`；`sources.html` 从生成器更新。仅改来源页的导航或样式时运行 `node scripts/prepare-plates.mjs --sources-only`，只重建来源 HTML，保持图版和线稿清单不变。

## 数据和个人记录

### 古迹与地点

西安大小雁塔已拆为独立条目：大雁塔保留 `xian`，小雁塔使用 `xian_small`。旧备份中的记录与评价继续关联 `xian`，不自动复制到新 ID；小雁塔默认未到访。两项分别维护年代、国保来源与图版，原组合图的生成记录保留在研究历史目录。

以下是维护新条目需要核对的字段，完整实例见 `sites.js` 中的 `hn_chuzu` 与 [对应考据记录](../assets/research/hn_chuzu.json)。这是一组维护约定，当前没有独立 JSON Schema。

| 字段 | 约定 |
| --- | --- |
| `id` | 稳定、唯一；连接个人记录、旧锚点、图片和研究 JSON |
| `name`、`short`、`sub` | 全称、短名、所绘主体；说明局部或多主体组合 |
| `dyn`、`tag`、`era`、`year` | `dyn` 指向 `DYN`；文字说明断代，`year` 用于排序和年表定位 |
| `yearLabel`、`yearApprox`、`yearNote` | 范围、约值及解释；不以精确排序点伪装精确史实 |
| `place`、`placeKey` | 展示地点，以及指向 `PLACES.key` 的关联 |
| `types` | 使用 `catalog.js` 已注册的类型键；复合条目可有多个类型。装饰性照壁使用 `screen`，不归为 `wall` 城墙城防；新增类型须同步搜索别名及筛选检查 |
| `lede`、`facts`、`caption` | 简介、正文和两项图注；限定清楚所绘主体 |
| `initialStatus` | 默认省略或 `unvisited`；用户指定才用 `visited` / `wishlist` |
| `legacyNames`、`legacyPlaces` | 搜索及旧登记迁移的别名；地点不能宽泛到误关联同名古迹 |
| `tall`、`timelineLane` | 按需要指定竖版及年表轨道，沿用现有实现支持的值 |
| `image` | 主要由线稿清单生成覆盖；已有卢舍那原图是保留的特例 |

`FangguCatalog.classify()` 根据 `placeKey` 对应地点的 `country`、`prov` 和地区配置派生国家、省份、地区；只给 `SITES` 写一个 `province` 不足以完成分类。地点须有有效经纬度。地图目前按城市或城镇归并，单体研究坐标不自动成为地图点。“足迹”使用离线陆地轮廓、地区名聚合标记和地点列表，仅展示到访记录。聚合按实际视口保证 66×44pt 地名标记不重叠；保留东亚海岸线范围，单个内陆地点也不缩成无参照的空白底。选中范围以淡色框突出，关闭地点页后保留；不维护路线或地点连线。底图源文件、版本和许可见 [地图来源](../ios/Fanggu/Resources/MAP-SOURCES.md)，更新时须保留来源与哈希并验证打包资源可解码。

台湾条目沿用 `catalog.js` 的华东地区与「台湾」省份筛选；台南、鹿港、台北的地图点分别登记在 `PLACES`。当地文化资产资料中的「国定古迹」身份记录在逐图研究来源中，不映射为本项目的「第几批国保」标签。

新建时代时同时检查 `DYN`、CSS 色板、`CHAPTERS`、年表及筛选配置。日本使用独立时代；朝代线色由 `DYN.acc` 指向 CSS 变量，具体色值以代码为准。桃山为艺术史分类（1573—1615），与政治史江户初期有交叠；飞云阁建造年未详，仁和寺金堂区分旧紫宸殿原构与移建。京都近郊的大津按滋贺县归入近畿筛选。

东南亚条目按柬埔寨、印度尼西亚、泰国、缅甸、老挝、越南与菲律宾归国别，使用当地时期及独立色板，不能套入中国朝代。年表为东南亚提供独立地域视图，当地时期通过选择器查看；`DYN.start/end` 中吴哥、古典爪哇、蒲甘、澜沧、占婆与素可泰的整数范围用于建筑阅读分组，不作为政权成立、灭亡纪年。行政区按已核实的现行名称登记，旧称放入搜索别名；例如波克朗加莱塔用庆和省，保留宁顺省。约略坐标只作地区显示点，南纬以 S 标示。

设色校对页支持 `ids=id1,id2` 限定一组古迹、`mode=pair` 并列线稿与设色、`ref=line` 在单图中默认对照线稿。单图前后翻阅、背景切换与返回列表保持该组范围；浏览不会写个人记录。

日本目录另含室町、桃山、昭和分类；金阁与浅草寺按现存复建主体归昭和，寺院初创和原构年代在条目内另述。`catalog.js` 为关东、近畿及中国地方配置独立地域；近畿包括京都府、滋贺县、奈良县、大阪府、兵库县，并有城郭、神社社殿类型；对应时代及城市示意点见 [`japan-periods.json`](../assets/research/japan-periods.json)。

东京条目以现存主体断代，并将浅草神社拜殿与浅草寺战后复建本堂分开登记。宽永寺清水观音堂分别注明1631年建立、1694年移建；东村山正福寺地藏堂归室町，单层裳阶不作双层楼。上野、根津、芝公园、大塚、池上及东村山的地点均由 `PLACES` 派生东京都与关东筛选。来源和待审图版范围见 [东京增补计划](../assets/research/tokyo-20261003-plan.md)。

高句丽、渤海遗存使用独立 `goguryeo`、`balhae` 时期，不套用北魏或唐；依据见逐图研究记录。其目录章节说明本库所收遗迹年代，年表使用北轨古迹点和独立时期选择器，不将章节范围伪装成完整政权起止。`country` 仍由遗迹今日所在地派生。

交河故城使用独立 `xiyu`（西域古城）分组，以呈现多期城址，不强行归到单一中原朝代。其 `year` 只是年表约略位置，所绘大佛寺残墙不能据此精确断代。新增的 `ruins`、`garden`、`school` 类型分别对应古城遗址、古典园林和古代学府；所绘主体仍在逐图记录中限定。

教堂使用 `catalog.js` 的 `church` 类型，清净寺使用 `mosque` 类型，不强制归入传统殿堂；独立石灯幢按石刻主体使用 `sculpture`，不因“幢”字归成经幢。新增类型还须验证实际筛选、搜索及详情分类。

韩国、朝鲜条目的现所在地分别使用 `KR`、`KP`；地域由 `PLACES` 与 `catalog.js` 派生。朝鲜半岛使用 `ko_silla`（统一新罗）、`ko_goryeo`（高丽）、`ko_joseon`（朝鲜王朝）独立时期，两国共享历史分类，年表单列朝鲜半岛轨道。朝鲜王朝是时代名，不能据此推导今日国别。现存战后复建主体归近现代，并在 `yearNote` 说明旧门址、毁坏和复建年代；确年不详时保留 `yearApprox`。首批依据与范围见 [本批计划](../assets/research/korea-20261002-plan.md)。

### 多语言目录

App 支持简体中文、英文和日文，跟随 iOS 为访古解析的语言。源数据仍以中文维护；`i18n/<语言>.json` 的 `terms` 按键翻译国家、地区、类型、时代、省份（以中文省名为键）、地点（以 `placeKey` 为键）和国保来源名，`sites` 按古迹 ID 翻译 `name`、`short`、`sub`、`era`、`yearLabel`、`yearNote`、`place`、`lede`、`facts`、`quote`、`captions` 与 `protection` 的 `unitName`、`scope`、`note`。只为源数据中非空的字段写译文；`facts`、`captions`、`protection` 逐项对应，不能增删或调换顺序。

`node ios/scripts/build-catalog.cjs` 写出 `catalog.json`（中文）、`catalog-en.json`、`catalog-ja.json`。三份目录的 ID、顺序、年代、筛选键、图版与个人记录相关字段完全一致，只有展示文字不同；缺少译文的字段回退为中文并在导出时列出。每份目录的 `searchAliases` 收录其他语言的名称与地点，任一语言的名称都能搜到同一古迹。`tests/i18n.test.cjs` 要求每个古迹都有完整且对齐的英日译文、英文展示文字不含汉字、日文不含简体专用字形，并检查界面字符串的占位符。

译文保留原文的约年、传说、后配与重建等限定，不增删史实；英文用汉语拼音与通行英文名，日本古迹用日本正式名称，日文用新字体与日本建筑术语。改动中文正文、图注、地点或国保范围时同步修改两份译文，再导出目录。印章「访古之印」、到访印「亲见」与打卡拖块「访」是品牌印记，各语言都保留中文。

### 存储与兼容

App 的个人记录通过 `ios/Fanggu/LibraryStore.swift` 校验并写入本机 Application Support。当前备份版本为 4，兼容版本 1–4 导入；保留版本 3 的旧五星，不推算六维分数。版本 1、2 不覆盖评价，版本 3 不清除六维分数；版本 4 可明确清空。完整格式、逐字段合并和失败恢复见 [iOS 备份与评价说明](../ios/README.md#六维评价)。

古迹 ID 必须稳定，新条目默认未到访；已有个人记录优先于目录默认值。个人笔记、短评、备份和搜索输入按文本处理。保存失败保留原文件与输入，并展示可重试的错误。图版读取和动效不得改写个人记录；打卡仅在终点松手并保存成功后呈现完成，取消手势不写入。今日到访明确写入当天日期，补记可以保留日期不详；状态更正保留原日期和笔记。记录更正、评价重置与清空提供按字段撤销，机制与回归命令见 [状态更正与撤销](../ios/README.md#状态更正与撤销)。

网页产品已移除，旧版 JSON 备份仍可直接导入 App，不依赖网页代码或浏览器存储。该任务不清理任何浏览器的历史个人数据。地图、图鉴与图片读取随 App 打包的资源，可离线浏览；没有在线同步。

## 生成文件与命令副作用

### 当前原型阶段的例外

当前 `scripts/plate-policy.json` 默认 `prototype`。图版技术质量阈值与 AI 视觉验收暂时关闭，以用户人眼明确通过为准；生成、原件保留、尽力去底/转码、缓存及实际验收对象记录继续执行。下面严格去底/像素校验描述只在严格模式阻塞交付，原型命令无需逐图白底预检或自动质量返工。具体流程、用户验收记录命令及 `--strict` 恢复方法见 [当前原型模式](monument-batch-workflow.md#当前原型模式)。文件缺失或不能解码/编码仍是执行失败，不将失败伪称成功。新图可进入本地待审预览，未审仍为 `pending_user`。

### 新图默认白底生成、脚本去底

用户没有 API Key，已明确改用内置 imagegen 生成纯白底 PNG，再本地处理透明度。线稿和设色原件都要求平整的 `#FFFFFF` 画布，无纸纹、渐变、阴影或棋盘格；完整保留在 `assets/generated/` 和 `assets/colored/`。

逐图 research JSON 登记 `background_preparation`，包含 `method: "white-matte-v1"`、原件 `sourceSha256` 和经过实际查看的透空点 `seeds`（没有时为空数组）。修改原件后须更新记录，不能靠旧记录放行另一张图。

- 线稿：`prepare-plates.mjs` 经 `line-plate.mjs` 调用 `white-matte.py`，检查近白边缘和中性线条，按灰度生成笔画 alpha，去除内外留白，再着朝代色输出透明 PNG。
- 东晋、龟兹、吐蕃、南诏、大理条目各用独立时代标签和配色；不要把同期的碑刻或石窟归入北魏、唐宋等中原朝代。无精确断代的局部图版以 `yearApprox` 和 `yearNote` 明示年表位置仅供排序。
- 设色：`prepare-colored-avif.py` 经 `white-matte.py` 只移除与画布外缘连通的近白底色；封闭透空处按记录的种子移除，内部浅色石材和门窗暗部保留。仅最外层轮廓去除混入的白色，内部 RGB 不变。生成透明 PNG 后转 AVIF，解码检查尺寸与 alpha。
- 白底边缘校验失败、没有可见主体或种子落在非白处时立即报错；假棋盘格不能当成白底放行。现有原生 alpha 可直接保留，已通过的旧图按原哈希复用。
- 白底处理器的版本哈希与逐图参数进入缓存键。改变处理方式只重建相应图版，并重新等待用户审阅，不重置其他图的验收。

京都及周边 2026-09-26 批次的部分线稿原件虽含 alpha，主体内部却有灰色柔和底。其逐图记录使用 `adaptive-ink-v1` 并锁定原件哈希；原型模式的线稿处理以局部明度差提取细线，再着时代色。它保留原件且不把灰底或浅色填充当成笔画；这批图仍需逐张目检和用户审阅。严格模式仍沿用上述白底或真实透明图的质量门槛。

回归检查：`python3 -B tests/test_transparency.py`。它覆盖实体白色、封闭空隙、暗部、白边、中性线条及不合格背景，不替代用户图版审阅。

前一阶段的 `scripts/generate-transparent-plate.py` 和 API 请求预检作为可选路径保留，当前流程不使用它，也不需要配置 API 凭证。若未来用户主动改用 API，才启用显式透明参数及相应依赖。

### 重建命令

| 操作 | 输入 | 写入 / 注意事项 |
| --- | --- | --- |
| `node scripts/prepare-protection.mjs` | `assets/research/national-protection.json`、`sites.js` ID | 仅生成 `protection-data.js`；加 `--check` 只读核对是否过期。不生成图片，不改个人记录或图版验收 |
| `node scripts/prepare-plates.mjs` | `sites.js`、`palette.css`、线稿原稿、线稿考据 JSON 与白底处理记录 | `assets/plates/`、`plates.js`、`sources.html`；需要 `magick`，按单张原稿、考据记录、处理器时间和图版配色增量重建 |
| `python3 -B scripts/prepare-colored-avif.py` | `queue.json`、批量设色 PNG、三张已确认 PNG | 白底去底或保留原生 alpha（旧暗底原件按哈希兼容），生成 `assets/colored-transparent/` 透明 PNG，再写 `assets/colored-transparent-avif/` 与 `assets/color-research/avif-manifest.json`；AVIF Q85、4:4:4、speed=6，原 PNG 不变，按来源、抠图参数和编码器哈希复用 |
| `node scripts/collect-colored-plates.mjs --require-complete` | `queue.json`、逐图设色 JSON、保留的 PNG、AVIF 与转码清单 | `colored-plates.js`、`progress.json`、`prompts.json`；验证来源/交付哈希，缺少或过期 AVIF 会报错；不改图片 |

透明处理需要 NumPy，AVIF 转码需要带 AVIF/AOM 编码支持的 Pillow，本次使用 Pillow 12.2.0 / libavif 1.4.1。先转码，再运行设色汇总器；App 本地读取 AVIF，审图工具由浏览器直接解码 AVIF。`COLORED_PLATES.src` 是 AVIF 交付路径，`originalSrc` 是素材 PNG 路径，原图仅在用户打开原图链接时加载。

`scripts/plan-colored-plates.mjs` 是 2026-09-15 批次规划器：固定排除三张小样、要求 197 张并重写队列及 worker 分组。它不是后续新增条目的通用命令；不要为刷新进度重新运行。长期增量规划器尚未实现。

新增或重绘默认采用上述白底脚本流程，交付图片必须有真实透明像素与可见主体。原生透明线稿由 `scripts/line-plate.mjs` 只改笔画 RGB、保留 alpha；白底线稿走已登记的新处理流程；`legacy-line-originals.json` 仅允许原哈希匹配的旧白底原件走旧路径，不为新图扩充旧哈希例外。设色转码对原生透明图直接保留 alpha，新白底图走 `white-matte.py`；只有已发布清单原哈希匹配的旧暗底原件才使用 `scripts/extract-transparent-background.py`。旧提取流程按边界最常见色块估计底色，容差 12，不自动清除所有封闭暗区。报恩寺塔沿用 [样本参数与四个背景点](../assets/transparency-studies/baoen-v1/README.md)。`prepare-colored-avif.py` 使用 4 个本地进程，逐张保存可恢复进度，全部完成后发布清单；原生及旧图 RGB、新白底图内部 RGB、PNG 无损往返、AVIF 尺寸和 alpha 自动校验。本轮 200 张透明交付版已由用户于 2026-09-16 全部确认通过，`visualReview: approved_user` 和验收时的 PNG／AVIF 哈希分别保存，不改写原画既有记录；新增图默认为 `pending_user`。缓存复用保留已通过状态，改变图版内容必须重新验收。交付图版清单由汇总器生成，读取透明 AVIF；`transparentSrc` 指向透明 PNG，`originalSrc` 仍指向原件。旧 `assets/colored-avif/` 文件保留但不再用于 App 和审图工具。

批处理及人工审图入口见 [本轮记录](../assets/transparency-studies/batch-v1/README.md)。提取算法的合成回归检查可运行 `python3 -B tests/test_transparency.py`；它不替代用户目检。

修补已有暗底图的封闭透空时，在逐图设色 JSON 的 `background_preparation` 登记 `method: "edge-connected-matte-v1"`、原件 `sourceSha256` 与实际查看过的 `seeds`。仅允许与已发布旧暗底清单哈希一致的原件使用此方法；原型模式也按这些种子提取，保留未指定的门窗暗部。运行 `python3 -B scripts/prepare-colored-avif.py --ids tiantai` 可只重建指定条目（多个 ID 用逗号分隔），其余交付文件和验收记录保持原样；随后运行设色汇总器。修补后的图仍需用户重新审阅，不能继承旧图片的通过状态。

线稿生成器检查文件存在、色板和部分字段，但没有覆盖全部来源质量要求。设色汇总器仅遍历队列，`--require-complete` 不会发现遗漏在队列外的新古迹，不能代替视觉验收。三张原小样已由用户确认保持原样并定为正式版，记录见 [正式版确认](../assets/color-studies/v1/README.md)。其他新增图仍需另行检查整库覆盖和逐图验收。

2026-09-16 的 [辟支塔规则实测](../assets/transparency-studies/sd_pizhi-rule-test/README.md) 第一阶段未取得合格原生透明原件：四次内置 imagegen 输出中，三次为无 alpha 的假棋盘格，一次虽有 alpha 仍有白色填充和光晕。生成要求不等于工具输出保证；必须保留实际通道检查与目检。原生透明失败候选留在测试记录中；用户随后授权白底脚本流程，辟支塔已通过该流程接入，仍待用户审图。

## 新增或修改古迹

新增条目的执行顺序、并发、搜索与返工预算以 [增量制图操作手册](monument-batch-workflow.md) 为准。下面是完整性检查清单，不表示必须逐处串行执行；批量制作先准备就绪项，线稿核验后即可启动该项设色，最后集中接入与重建。

1. 查同名、别名与所绘主体，确认是新条目还是既有条目的修订；保留已有 ID 和个人记录。未指定个人初始状态时默认未到访；用户要求存在歧义时再确认，不把考据新增自动加入心愿。
   中国古迹候选先参考[官方国保名单](national-protection.md)，核实后更新国保源 JSON 并运行 `node scripts/prepare-protection.mjs`；未核实可以先留待核对，不为贴标签拖延原型制图。
2. 按 [线稿规范](../assets/research/STYLE.md) 准备照片、真实来源、由内置 imagegen 生成的白底 PNG 原稿、绑定哈希的去底记录及通过 alpha 校验的透明交付版、两项图注与研究 JSON。新 JSON 使用现有字段，参考 `hn_chuzu.json`；历史提示词和输入按当时真实记录保留。
3. 更新 `SITES`，补齐 `PLACES` 和必要分类。检查所绘主体年代和国别。
4. 运行线稿生成器并检查原稿、交付图、`plates.js` 与 `sources.html` 的差异。缺少文件时补齐输入，不能用任意占位图片凑数。
5. 按 [设色流程](../assets/color-research/WORKFLOW.md) 制作、登记并验收设色图。向 `queue.json.entries` 加入对应条目并同步 `count`；沿用现有字段和真实路径，不伪造 worker 分工。三张已确认图版的 `excluded` 是特殊入口，变更它们需要同步汇总逻辑。
6. 运行 AVIF 转码脚本，再汇总设色清单，并比较 `SITES` 与 `COLORED_PLATES` 的 ID，确认整库覆盖。检查 `progress.pending`；目录完整不等于图版视觉合格。
7. 在 `i18n/en.json`、`i18n/ja.json` 为新条目补齐译文；新地点、省份、地区、类型或时代同时补 `terms`。
8. 更新测试涉及的新增记录覆盖和数量基线。当前 `catalog.test.cjs` 及部分批次测试包含数量基线，考据覆盖列表还包含手写 ID；新条目也应进入有效性检查，不能只调大数量。
9. 确认上述写文件命令均已退出成功，再运行自动测试和相关浏览器检查。图版交付变化时同步本地素材副本；需要构建 App 时运行 `sh ios/scripts/sync-artwork.sh assets`。运行 `node ios/scripts/build-catalog.cjs` 并检查 iOS 导出；同步 README 中对用户有意义的数量或功能说明。Git 中的清单更新不会自动交付被忽略的图片。

只改正文或研究来源时，可复用已核验图版；如果修改了所绘主体、形制、图注或年代配色，重新判断需要重画、重建或复核的范围。

## 验证矩阵

代码或目录改动在仓库根目录运行：

```bash
node --test tests/*.test.cjs
node scripts/prepare-protection.mjs --check
git diff --check
```

| 改动 | 重点检查 |
| --- | --- |
| 目录、年代、地域、分类、来源和图版路径 | Node 全套；`ios-catalog.test.cjs` 核对导出与源数据；`i18n.test.cjs` 核对英日译文；`ios-map-layout.test.cjs` 运行真实 Swift 地图几何 |
| 界面文字与多语言 | `Localizable.xcstrings` 英日译文齐全；`FangguUITests/LocalizationUITests` 在英文、日文下检查主要页面，并在独立模拟器目视检查长文本 |
| 原生个人记录、备份和评价 | `FangguTests`；根据行为运行 `FangguUITests`，命令见 [iOS 开发说明](../ios/README.md#六维评价) |
| 原生界面、手势和导航 | 独立模拟器检查相应页面；触觉和实际触摸体验由真机验收 |
| 审图工具、图片或链接 | 真实浏览器检查受影响工具；模拟 DOM 不能证明布局和图片解码正常 |
| 文档 | 本地链接、路径、命令描述与 `git diff --check` |

审图浏览器检查直接打开单处线稿、设色并列及来源页；核对图片请求、图注、深浅/棋盘背景、搜索与前后翻阅。新地区的筛选、别名搜索、原生详情与年表在 App 中验证，不再检查网页首页或 Back。

原生验证使用独立模拟器和测试存储，避免导入或清空真实个人数据。记录与评价、取消手势、终点保存和失败重试的验证由原生测试承担。没有改到的交互不重复整套测试。汇报本次执行的检查和未验证项，历史截图与报告不代表本次结果。

## 素材保管与 App 交付

运行图版按本地相对路径维护，由 `sync-artwork.sh` 随 App 打包；无需部署图片服务器。原稿、参考照片和恢复资料仍独立保管，按 [本地资源包](#本地资源包)打包并复制到独立存储。

App 目录更新后同步全部运行图版，再构建；Git 中的路径和清单不代表被忽略的图片已交付。审图工具仅本地使用，参考来源中指向独立生产资料的路径继续保留，不能声称素材已随 Git 交付。

## 文档维护

- [AGENTS.md](../AGENTS.md) 保存跨任务的简要规则；本指南保存机制、命令和操作步骤；图版规范保存领域约束。避免多处复制相同长规则。
- [增量制图操作手册](monument-batch-workflow.md) 保存新增古迹的调度、止损、恢复和耗时记录规则；线稿与设色规范共同引用它，不另建互相矛盾的批量流程。
- [线稿历史任务](../assets/research/history/line-production-2026-09-15.md)、[设色历史任务](../assets/color-research/history/color-production-2026-09-15.md) 保存原始分工和当时授权，供追溯；不用于启动新任务。
- [恢复摘要](../assets/color-research/history/recovery-2026-09-15.md)、批次清单和考据提示词保留历史事实。详细 `recovery/` 材料仅在本地保存。可以追加状态说明与当前入口，不篡改当时实际输入、数量或验证结果。
- 文档链接使用相对路径；机器绝对路径仅作为真实历史溯源记录保留，不用于当前操作示例。来源图与原始生成文件可能独立存储，记录路径不等于新机器上一定可用。

西夏作为独立时代分类，使用沙褐线色；起讫年代依据 [UNESCO西夏陵说明](https://whc.unesco.org/en/list/1736)。年表点置于中国北方；西夏、辽金等同期分类通过不重叠的时期标签单独选择，图形只突出当前范围。局部图版须在 `sub` 和 `caption` 明列所绘范围；西夏陵3号陵不补画消失外装，一百零八塔仅选最上三行七塔，须弥山仅选第5窟唐代大佛胸膝局部。

### 足迹与年表交互回归

年表的时期菜单覆盖全目录；切换到当前地域没有的时期时，定位到该时期所属地域。横轴保持每年相同比例，时期名称与图形节点分行，聚合点 44pt 点击区域至少间隔 48pt。所有地域、时期子集必须恰好覆盖对应古迹，不能为消除重叠丢弃条目。选点只缩小浏览范围，不修改到访状态；摘要明确年份范围、地域与已到访数量，返回详情前的浏览状态保持。

原生 `AtlasTimelineTests` 验证等距尺度、每个地域时期的节点覆盖与间距、离线底图资源；`AtlasTimelineUITests` 验证明清自动定位、时期标签可见、节点选中与返回保留，以及跨地域选择；足迹弹出详情中纠正状态时，还须验证仅有一个有效撤销入口。`testMapMarkersAndSearchOpenVisitedSites` 验证足迹地点和搜索入口，`ios-map-layout.test.cjs` 验证不同手机宽度、空数据及单点时的真实 Swift 投影。新增地点或时期后同时运行这些验证。
