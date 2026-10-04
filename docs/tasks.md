# 常见任务

动手前先在下表找到你的改动，确认要重建什么、至少验证什么，再看对应的操作步骤。规则以 [AGENTS.md](../AGENTS.md) 为准，机制细节见 [开发指南](development.md)，字段见 [数据模型](data-model.md)，检查怎么跑见 [测试与验证](testing.md)。

所有命令在仓库根目录执行。写文件的命令只在需要时运行；先 `git status --short --branch` 看清已有改动。

## 改动、重建、验证矩阵

| 改了什么 | 必须重建 | 至少验证 | 注意 |
| --- | --- | --- | --- |
| 只有 `*.md` | 无 | 链接与路径存在、命令描述正确；`git diff --check` | 不跑任何图版脚本 |
| `sites.js` 的文字：`lede`、`facts`、`yearNote`、`legacyNames` 等 | `node ios/scripts/build-catalog.cjs` | `node --test tests/*.test.cjs`；App 详情页 | 图注若来自研究 JSON 的 `caption`，要改研究 JSON 并重建线稿清单 |
| `sites.js` 的年代、时代、地点、类型、`initialStatus` | `build-catalog.cjs` | 全套 Node；批次测试中涉及的断言；App 筛选与年表 | 新时代、新地区、新类型见下文对应步骤 |
| 研究 JSON 的 `coordinates` 本体坐标 | `build-catalog.cjs` | `ios-catalog` 测试；`FangguTests/NearbyReminderTests` | 坐标须距城镇点 60 公里内，否则导出报错；只影响附近提醒，不改地图点 |
| `catalog.js` 地区、国家、类型 | `build-catalog.cjs` | `facets`、`protection`、`ios-catalog` 测试与全套；App 筛选、搜索 | 同步 `ios/Fanggu/CatalogSearch.swift` 的名称与别名表 |
| `palette.css` 时代色 | `node scripts/prepare-plates.mjs` → `build-catalog.cjs` → `sh ios/scripts/sync-artwork.sh assets` | `ios-catalog` 测试；审图页；App | 线稿 PNG 会按新色重建，需要完整素材与 `magick`；随后更新 `asset-lock` |
| `assets/research/national-protection.json` | `node scripts/prepare-protection.mjs` → `build-catalog.cjs` | `node scripts/prepare-protection.mjs --check`；`protection` 测试与全套；App 标签与搜索 | 不跑图版脚本，不改验收记录 |
| 新增或重绘古迹 | [手册第 5 节](monument-batch-workflow.md) 全链路 | 手册第 5 节全部命令、浏览器审图、App | 不只调数量断言；新图保持 `pending_user` |
| 图版处理脚本：`white-matte.py`、`prototype-matte.py`、`line-plate.mjs`、`prepare-colored-avif.py` | 受影响图版重建，再重新人审 | `python3 -B tests/test_transparency.py`；`line-plate`、`prototype-pipeline` 测试 | 处理器哈希进入缓存键；改严格处理器会使旧图缓存失效 |
| `ios/Fanggu/*.swift` 界面与交互 | 无数据重建 | 相关 `FangguTests`、`FangguUITests`；独立模拟器实际操作 | 图版加载、切换、动效不得改写个人记录 |
| `Models.swift`、`LibraryStore.swift` 个人记录格式 | 无 | `ReviewTests`、`UXRegressionTests`；新增迁移与失败恢复测试 | 兼容版本 1–4 导入；保存失败保留原文件 |
| 审图工具：`proof.html`、`color-proof.*`、`color-studies.*` | 只改来源页导航或样式时 `node scripts/prepare-plates.mjs --sources-only` | `plate-tools` 测试；真实浏览器 | 页面互相链接，不指向已移除的网页首页 |
| `assets/` 下被忽略的图片有增删改 | `python3 scripts/asset-bundle.py lock` → `verify --profile full` → `pack` | `python3 -B -m unittest discover -s tests -p test_asset_bundle.py` | 资源包复制到独立存储；清单入库不等于图片已交付 |
| `ios/project.yml` | `cd ios && xcodegen generate` | 构建 | `Fanggu.xcodeproj` 随 Git 提交 |
| App 图标 | `python3 ios/scripts/build-icon.py` | 构建 | 只复制用户提供的图标，不重绘 |
| 字体、离线底图 | 无 | `AtlasTimelineTests` 的底图测试；构建 | 更新 `MAP-SOURCES.md` 或字体许可文本 |

## 操作步骤

### 只改文档

1. 改 Markdown；链接用仓库相对路径。
2. 核对链接目标存在、命令与实际脚本标志一致。
3. `git diff --check`。
4. 接口、命令、存储格式或流程改变时，同步对应的开发文档；长期规则引用数据来源，不复制固定数量。

### 修改古迹文字、别名或年代说明

1. 在 `sites.js` 找到条目；后续批次在 `SITES.push(...)` 中。只改显示字段，不改 `id`。
2. 更名优先改 `name`、`short`，把旧名放入 `legacyNames` 以便搜索。
3. 改 `year`、`yearLabel`、`yearNote` 时核对所绘主体与依据，必要时更新研究 JSON 的 `historical_sources`。
4. `node ios/scripts/build-catalog.cjs`。
5. `node --test tests/*.test.cjs`。没有本地素材时至少运行 `facets`、`ios-catalog`、`protection` 三个文件，并在汇报中说明其余未运行。
6. 涉及搜索或筛选时在 App 中实际检查。

### 新增地点、省份、地区或国家

1. 在 `PLACES` 增加 `{ key, name, prov, lat, lon, country? }`；坐标性质写入 `coordinate_note`。
2. 省份必须出现在 `catalog.js` 某个 `regions[].provinces` 中；新地区或国家在 `regions`、`countries` 登记。
3. 同步 `ios/Fanggu/CatalogSearch.swift` 的 `regionNames`、`countryNames`。
4. 若涉及新国别的时代，另按“新增时代”处理；在 App 年表中确认新地域可达。
5. `build-catalog.cjs`，Node 全套，App 筛选、足迹地图、年表。`ios-map-layout.test.cjs` 会用真实 Swift 几何检查新地点不与其他标记重叠。

### 新增类型

1. `catalog.js` 的 `types` 增加键与名称；`matches()` 的 `typeAliases` 增加搜索别名。
2. `ios/Fanggu/CatalogSearch.swift` 的 `typeAliases` 同步。
3. 条目 `types` 使用新键；`build-catalog.cjs`；`facets` 测试补一条筛选断言；App 筛选页检查。

### 新增时代

1. `sites.js` 的 `DYN` 增加 `{ glyph, name, acc: 'var(--token)', start, end, country?, timelineLane? }`。
2. `palette.css` 增加同名 CSS 变量；颜色用途写入 [线稿规范 · 朝代配色](../assets/research/STYLE.md#朝代配色)。
3. 需要时增加 `CHAPTERS` 章节；没有 `start`、`end` 的时代要在 `build-catalog.cjs` 的 `timelineSpans` 补回退范围。
4. 该时代的线稿由 `prepare-plates.mjs` 按新色着色（需要完整素材），再 `build-catalog.cjs`、`sync-artwork.sh`。
5. Node 全套；`catalog.test.cjs` 的时代色断言；App 年表时期选择与自动定位。

### 为古迹补本体坐标

附近提醒只对有本体坐标的古迹生效；目录里的 `latitude`、`longitude` 是城镇级显示点，不能拿来判断 3 公里。

1. 在 `assets/research/<id>.json` 增加 `coordinates: { lat, lng, source }`：`source` 必填，写明出处（Wikimedia Commons 分类页、申遗文本页码、官方公告等）与“非测绘成果”之类的性质说明；不凭地图目测或猜测。`site_recommendation` 里的经纬度不会被导出，其中不少只是城镇点的复制；确认过的可以复制到 `coordinates` 并补来源。
2. 坐标指所绘主体本身（某殿、某塔），不是寺院大门或景区入口；多主体组合图取主要主体。
3. `node ios/scripts/build-catalog.cjs`。坐标距该条目城镇点超过 60 公里会报错，先核对是哪一方写错。
4. `node --test tests/ios-catalog.test.cjs`，有模拟器时运行 `FangguTests/NearbyReminderTests`。
5. 不改 `PLACES`，不把本体坐标写成新地点；地图聚合继续按城镇点。

### 更新国保资料

见 [国保标签与选目规则 · 数据维护与命令](national-protection.md#数据维护与命令)。要点：只改 `assets/research/national-protection.json`；`node scripts/prepare-protection.mjs` 生成，`--check` 核对；再 `build-catalog.cjs`；不运行图版脚本。

### 新增或重绘古迹

完整流程以 [增量制图操作手册](monument-batch-workflow.md) 为准，完整性清单见 [开发指南 · 新增或修改古迹](development.md#新增或修改古迹)。顺序概要：

1. 先落盘批次计划 `assets/research/<batch>-plan.md` 与本批 ID 列表 `<batch>-batch.json`。
2. 每处准备照片、来源、白底原件与研究 JSON；线稿核验后立即准备设色记录并加入 `queue.json`。
3. 更新 `SITES`、`PLACES`、必要分类；默认未到访；核实国保后更新国保 JSON。
4. 集中重建：`prepare-plates.mjs` → `prepare-colored-avif.py` → `collect-colored-plates.mjs --require-complete` → `prepare-protection.mjs`（若改了国保）→ `build-catalog.cjs` → `sync-artwork.sh`。每条确认成功退出再执行下一条。
5. 新增批次测试文件（命名约定见 [测试与验证](testing.md#新增测试的约定)），并把新 ID 加入 `tests/catalog.test.cjs` 的覆盖列表；不能只调大数量断言。
6. Node 全套、`python3 -B tests/test_transparency.py`、`git diff --check`、浏览器审图、App 检查。
7. 新图保持 `pending_user`；只有用户明确说通过某些 ID，才运行 `node scripts/record-plate-review.mjs color <id> ...`，再转码与汇总。
8. 素材变化后 `asset-bundle.py lock`，并在汇报中说明图片未随 Git 交付。

### 修改 iOS 界面或交互

1. 先读 [iOS 开发说明](../ios/README.md) 中该页面的既定行为，再读对应 Swift 文件；职责表见 [架构 · iOS App 模块](architecture.md#ios-app-模块)。
2. 遵守“能一步做完，就不要分两步”：一次明确动作直接生效；手势取消不写入；保存失败保留数据与输入并显示错误。
3. 所有个人记录写入经 `LibraryStore`；视图不直接改文件。
4. 用独立模拟器与测试存储运行相关原生测试，命令见 [测试与验证 · 原生测试](testing.md#原生测试)；触觉只能真机验收。
5. 行为变化时同步更新 `ios/README.md` 对应段落。

### 修改个人记录格式

1. 改 `Models.swift` 的 `LibraryData` 与 `LibraryStore.validate`；版本号递增，旧版本 1–4 的解码与合并规则保留。
2. 设计迁移：读取旧版、校验、首次成功保存时升级；失败时保留原文件。
3. 在 `FangguTests/ReviewTests.swift`、`UXRegressionTests.swift` 补旧版导入、失败恢复与撤销测试。
4. 更新 [iOS 开发说明 · 迁移记录](../ios/README.md#迁移记录) 与 [数据模型 · 个人记录](data-model.md#个人记录-libraryjson)。

### 修改图版处理脚本

1. 严格处理器 `white-matte.py` 的哈希进入 `avif-manifest.json` 的缓存键，改动会让旧图缓存失效并要求重新人审；原型模式使用独立的 `prototype-matte.py`，正是为了不触发这一点。
2. 改完运行 `python3 -B tests/test_transparency.py` 与相关 Node 测试。
3. 需要重建图版时按手册集中重建；受影响的图重新等待用户审阅，不继承旧验收。

### 素材文件变化后

1. 在拥有完整素材的工作区：`python3 scripts/asset-bundle.py lock`，`verify --profile full`，`pack`。
2. 把 `asset-dist/<assetSet>/` 整个目录复制到独立存储。
3. 新工作区：`restore --bundle /path/to/<assetSet> --profile runtime`（或 `full`），再 `verify`。详细见 [开发指南 · 本地资源包](development.md#本地资源包)。

### 修改本地审图工具

1. `proof.html`、`color-proof.*`、`color-studies.*` 直接改；`sources.html` 由生成器写，只改导航或样式时运行 `node scripts/prepare-plates.mjs --sources-only`。
2. 页面之间互相链接；不链接已移除的网页首页或详情。
3. 用 `python3 -m http.server 8765 --bind 127.0.0.1` 在真实浏览器检查图片请求、图注、背景切换与翻页；模拟 DOM 不能证明布局。

## 常见陷阱

- **生成文件不手改。** `plates.js`、`colored-plates.js`、`protection-data.js`、`sources.html`、`catalog.json`、`progress.json`、`prompts.json`、`avif-manifest.json` 都由脚本写出。
- **加载顺序。** 根目录 JS 依赖全局对象，顺序是 `sites → plates → colored-plates → protection-data → protection → catalog`；Node 测试同样按这个顺序用 `vm` 执行。
- **worktree 没有图片。** 这不是缺陷。缺素材时 `prepare-plates.mjs` 无法重建 `plates.js`，只有 `--sources-only` 可用；多数 Node 测试会 `ENOENT`。见 [没有本地素材时](testing.md#没有本地素材时)。
- **汇总器不查队列外的遗漏。** `collect-colored-plates.mjs --require-complete` 只遍历 `queue.json`；新增条目必须先入队列，并核对 `SITES` 与 `COLORED_PLATES` 的 ID 集合相等。
- **数量断言。** `tests/catalog.test.cjs` 与批次测试含基线数量和手写 ID 列表；新增条目要进入覆盖列表，不能只调大数字。
- **不要运行 `plan-colored-plates.mjs`。** 它是 2026-09-15 的历史规划器，要求恰好 197 张并重写队列，在当前目录规模下会直接报错。
- **原型与严格两套模式。** 默认 `prototype`：质量阈值不阻塞交付，用户人眼验收为准。`--strict` 只在用户要求时使用；不要为了让检查通过而改配置。
- **用户验收只能由用户给出。** `record-plate-review.mjs` 只在用户明确说出通过的具体 ID 后运行；AI 不判通过或淘汰。
- **不改真实个人数据。** 原生测试用独立模拟器与临时目录；不清空、不导入用户真机或默认模拟器的记录。
- **iOS 侧有重复的名称表。** `CatalogSearch.swift` 的地区名、国家名、类型别名与 `catalog.js` 需要手工同步，没有自动生成。
- **两套坐标。** `latitude`、`longitude` 是城镇级显示点，供足迹地图聚合；`siteLatitude`、`siteLongitude` 才是古迹本体坐标，供附近提醒。不要互相替代，也不要把本体坐标加进 `PLACES`。
- **图版清单的 caption 优先。** 研究 JSON 有 `caption` 时覆盖 `SITES.caption`；改图注要改对位置。
- **Python 命令带 `-B`。** 仓库里的转码与测试命令示例使用 `python3 -B`，避免写入 `__pycache__`；沿用即可。
- **历史资料不是授权。** `history/`、`recovery/`、带日期的计划与报告、`docs/reviews/` 记录当时情况；代理人数、分工、绝对路径不延续到新任务。
