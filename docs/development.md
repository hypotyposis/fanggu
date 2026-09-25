# 开发指南

本指南说明当前项目的模块关系、数据约束、资产流程和验证方法。简要约定见 [AGENTS.md](../AGENTS.md)，产品操作见 [README](../README.md)，图版目录见 [assets/README.md](../assets/README.md)。

## 环境与首次运行

iOS 原生 App 的构建与网页备份迁移见 [iOS 开发说明](../ios/README.md)。原生目录由现有数据导出，图版仍由本地素材副本提供。

前端是原生 HTML/CSS/JavaScript，没有 `package.json`、第三方 npm 依赖安装或应用构建步骤。下表记录用途与本次整理时可用的环境，不代表已验证所有较旧版本。

| 工具 | 用途 | 本次核对环境 |
| --- | --- | --- |
| Python 3 或其他静态服务器 | 浏览器预览 | Python 3.14.4 |
| Node.js | `node:test`、图版转换和清单脚本 | Node 22.19.0 |
| ImageMagick，命令为 `magick` | 重建朝代色透明线稿、读图尺寸 | ImageMagick 7.1.1-44 |
| 支持 Pointer Events、History API、localStorage 的浏览器 | 页面和交互 | 涉及 UI 时实际检查目标浏览器 |

在仓库根目录运行：

```bash
python3 -m http.server 8765
```

访问 [本地首页](http://localhost:8765/)。通过 HTTP 预览，保持同一主机名和端口以复用浏览器记录。字体由 Google Fonts 请求；无法联网时检查回退字体是否仍可读。

开工先确认图片是否在当前工作区。图片、生成原稿、参考照片与 PDF 被 `.gitignore` 排除，新克隆、worktree 或代码压缩包不包含这些素材。页面显示需补齐 `assets/colored-transparent-avif/` 的 AVIF、`assets/plates/` 的 PNG 和 `assets/longmen-vairocana.png`。`assets/colored/` 与 `assets/color-studies/v1/` 中的原 PNG 完整保留为素材库，原图链接、完整测试及重新转码需要这些文件；完整测试还会读取研究 JSON 所列参考文件，重新制图另需 `assets/generated/` 原稿。保留目录层级，不用同名但内容不符的图片代替缺失素材。

## 模块与依赖

| 文件 | 责任与修改入口 |
| --- | --- |
| `sites.js` | `SITES` 古迹正文、`DYN` 朝代、`CHAPTERS` 章节、`PLACES` 地点 |
| `draft.js` / `buildings.js` | 历史参数绘图、SVG 渲染及首页斗拱图失败时的回退；仍有运行时用途 |
| `plates.js` | 生成的线稿清单和 `site.image` 覆盖逻辑 |
| `colored-plates.js` | 生成的设色清单 `COLORED_PLATES` |
| `artwork.js` | 按到访状态选图和设色加载失败回退 |
| `library.js` | 个人记录与评价、校验、迁移、持久化和备份合并；可注入存储用于测试 |
| `journal.js` | 首页与详情页共用表单、心愿、到访与评价动作、跨标签页同步 |
| `visit-slider.js` | 拖动设色、取消、重试、保存时机与盖章动效 |
| `catalog.js` | 国家、地区、行政区、类型和组合筛选；从地点表派生地理字段 |
| `navigation.js` | 稳定详情链接、旧锚点、历史状态校验和返回判断 |
| `timeline.js` | 年代聚合、时代选择、分页和历史状态恢复 |
| `main.js` / `atlas.js` | 首页组装、地图与年表初始化 / 图鉴、备份和浏览状态 |
| `detail.html` / `detail.js` | 单条古迹详情、共享记录表单和返回前页 |
| `style.css` | 视觉系统、朝代色板、布局与主页面动效 |
| `proof.html` / `color-proof.*` / `color-studies.*` | 线稿校对、设色校对及三张正式图版的效果演示 |

脚本使用普通 `<script>`，不是 ES modules。`sites.js` 须先于 `plates.js`；`colored-plates.js` 须先于使用它的 `artwork.js`；共享模块先于页面初始化。现有纯逻辑模块通常同时提供浏览器全局对象和 CommonJS 导出。不要只在 Node 测试入口验证依赖。

修改加载顺序、共享接口或缓存版本参数时，检查 `index.html`、`detail.html`、`proof.html`、`color-proof.html`、`color-studies.html`。来源页 `sources.html` 的脚本和标记从生成器修改。只更新受影响资源的版本，保持同一资源在相关页面一致。

## 数据和个人记录

### 古迹与地点

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

`FangguCatalog.classify()` 根据 `placeKey` 对应地点的 `country`、`prov` 和地区配置派生国家、省份、地区；只给 `SITES` 写一个 `province` 不足以完成分类。地点须有有效经纬度。地图目前按城市或城镇归并，单体研究坐标不自动成为地图点。到访地图整栏展示，按容器宽度重排标签；仅标记到访地点，不维护路线或地点连线。

新建时代时同时检查 `DYN`、CSS 色板、`CHAPTERS`、年表及筛选配置。日本使用独立时代；朝代线色由 `DYN.acc` 指向 CSS 变量，具体色值以代码为准。

西夏作为独立时代分类，使用沙褐线色；起讫年代依据 [UNESCO西夏陵说明](https://whc.unesco.org/en/list/1736)。年表点置于北侧，与辽金同时的时期条在其上方单列窄带，以免点击区域互相遮挡。局部图版须在 `sub` 和 `caption` 明列所绘范围；西夏陵3号陵不补画消失外装，一百零八塔仅选最上三行七塔，须弥山仅选第5窟唐代大佛胸膝局部。

### 存储与兼容

`library.js` 使用 `localStorage` 键 `fanggu.library.v1`，当前值为版本 3；后缀 `v1` 不是当前备份版本。版本 3 结构示例：

```json
{
  "version": 3,
  "customSites": [],
  "records": {
    "foguang": { "status": "visited", "visitedOn": "", "note": "日期未记" }
  },
  "links": {},
  "reviews": {
    "foguang": { "rating": 5, "text": "檐下的梁架令人难忘。", "updatedAt": "2026-09-17T08:00:00.000Z" }
  }
}
```

- `records` 以古迹 ID 为键，状态为 `unvisited`、`wishlist` 或 `visited`。没有显式记录时才使用目录默认状态。
- 日期允许空白，否则须为有效且不晚于本地今天的 `YYYY-MM-DD`；笔记按文本存储，最长 12000 字符。
- `reviews` 独立以正式古迹 ID 为键，每处一条我的评价。`rating` 为 1–5 的整数或 `null`，`text` 为最多 500 字符的短评，两项均可留空。字符长度按 JavaScript 字符串长度计算，与表单 `maxlength` 一致。
- `library.review(id)` 返回评价副本；未评价返回 `{ rating: null, text: '', updatedAt: '' }`。`library.setReview(id, { rating, text })` 读取最新存储后只更新该处评价，写入 UTC ISO 格式的 `updatedAt`。清除时保留两项为空的评价及修改时间，确保导入备份能够清除旧评价，也为未来同步保留删除信息。
- 评价与到访状态、日期、私人笔记互不改写；只有保存或清除时写入，编辑、取消评分、取消弹窗和 Escape 都不会写入。保存失败保留弹窗草稿并显示错误。
- `customSites` 保留旧自由登记；`links` 记录它们与正式古迹的关联，不能为了简化数据而删除旧资料。
- 导出额外带 `exportedAt`；导入支持版本 1、2、3。同 ID 的到访记录及评价分别以备份值覆盖，其余保留；版本 1、2 没有评价，不覆盖当前评价。读取旧格式不立即写回，下次成功保存时才升级。格式、日期和评价校验失败不能改写原存储。
- 保存前读取最新数据，避免另一标签页的笔记被旧状态覆盖；`journal.js` 监听存储变化以刷新显示。
- 无法解析的原始内容仍可导出，存储失败须显示错误。迁移不能通过清空存储、换键或重置默认值实现。

`sites.js` 的维护者正文允许现有受控 HTML；用户笔记、短评、导入内容和搜索词必须经文本节点或 `textContent` 展示。不要混用这两种内容来源。

当前只有本地个人评价，不包含公共均分、他人评论、账号或联网传输。后续联机可复用古迹 ID、独立评价写入入口和修改时间；仍需设计用户身份、同步冲突与删除规则、公共统计以及短评是否公开的选择。`updatedAt` 目前仅是本机修改时间，导入仍采用明确的备份覆盖规则，不做时间比较或自动同步。

## 生成文件与命令副作用

### 新图默认白底生成、脚本去底

用户没有 API Key，已明确改用内置 imagegen 生成纯白底 PNG，再本地处理透明度。线稿和设色原件都要求平整的 `#FFFFFF` 画布，无纸纹、渐变、阴影或棋盘格；完整保留在 `assets/generated/` 和 `assets/colored/`。

逐图 research JSON 登记 `background_preparation`，包含 `method: "white-matte-v1"`、原件 `sourceSha256` 和经过实际查看的透空点 `seeds`（没有时为空数组）。修改原件后须更新记录，不能靠旧记录放行另一张图。

- 线稿：`prepare-plates.mjs` 经 `line-plate.mjs` 调用 `white-matte.py`，检查近白边缘和中性线条，按灰度生成笔画 alpha，去除内外留白，再着朝代色输出透明 PNG。
- 设色：`prepare-colored-avif.py` 经 `white-matte.py` 只移除与画布外缘连通的近白底色；封闭透空处按记录的种子移除，内部浅色石材和门窗暗部保留。仅最外层轮廓去除混入的白色，内部 RGB 不变。生成透明 PNG 后转 AVIF，解码检查尺寸与 alpha。
- 白底边缘校验失败、没有可见主体或种子落在非白处时立即报错；假棋盘格不能当成白底放行。现有原生 alpha 可直接保留，已通过的旧图按原哈希复用。
- 白底处理器的版本哈希与逐图参数进入缓存键。改变处理方式只重建相应图版，并重新等待用户审阅，不重置其他图的验收。

回归检查：`python3 -B tests/test_transparency.py`。它覆盖实体白色、封闭空隙、暗部、白边、中性线条及不合格背景，不替代用户图版审阅。

前一阶段的 `scripts/generate-transparent-plate.py` 和 API 请求预检作为可选路径保留，当前流程不使用它，也不需要配置 API 凭证。若未来用户主动改用 API，才启用显式透明参数及相应依赖。

### 重建命令

| 操作 | 输入 | 写入 / 注意事项 |
| --- | --- | --- |
| `node scripts/prepare-plates.mjs` | `sites.js`、`style.css`、线稿原稿、线稿考据 JSON 与白底处理记录 | `assets/plates/`、`plates.js`、`sources.html`；需要 `magick`，源文件时间变化可能导致全量重处理 |
| `python3 -B scripts/prepare-colored-avif.py` | `queue.json`、批量设色 PNG、三张已确认 PNG | 白底去底或保留原生 alpha（旧暗底原件按哈希兼容），生成 `assets/colored-transparent/` 透明 PNG，再写 `assets/colored-transparent-avif/` 与 `assets/color-research/avif-manifest.json`；AVIF Q85、4:4:4、speed=6，原 PNG 不变，按来源、抠图参数和编码器哈希复用 |
| `node scripts/collect-colored-plates.mjs --require-complete` | `queue.json`、逐图设色 JSON、保留的 PNG、AVIF 与转码清单 | `colored-plates.js`、`progress.json`、`prompts.json`；验证来源/交付哈希，缺少或过期 AVIF 会报错；不改图片 |

透明处理需要 NumPy，AVIF 转码需要带 AVIF/AOM 编码支持的 Pillow，本次使用 Pillow 12.2.0 / libavif 1.4.1。先转码，再运行设色汇总器；页面直接由浏览器解码 AVIF，无需额外网页解码器。`COLORED_PLATES.src` 是 AVIF 交付路径，`originalSrc` 是素材 PNG 路径，原图仅在用户打开原图链接时加载。

`scripts/plan-colored-plates.mjs` 是 2026-09-15 批次规划器：固定排除三张小样、要求 197 张并重写队列及 worker 分组。它不是后续新增条目的通用命令；不要为刷新进度重新运行。长期增量规划器尚未实现。

新增或重绘默认采用上述白底脚本流程，交付图片必须有真实透明像素与可见主体。原生透明线稿由 `scripts/line-plate.mjs` 只改笔画 RGB、保留 alpha；白底线稿走已登记的新处理流程；`legacy-line-originals.json` 仅允许原哈希匹配的旧白底原件走旧路径，不为新图扩充旧哈希例外。设色转码对原生透明图直接保留 alpha，新白底图走 `white-matte.py`；只有已发布清单原哈希匹配的旧暗底原件才使用 `scripts/extract-transparent-background.py`。旧提取流程按边界最常见色块估计底色，容差 12，不自动清除所有封闭暗区。报恩寺塔沿用 [样本参数与四个背景点](../assets/transparency-studies/baoen-v1/README.md)。`prepare-colored-avif.py` 使用 4 个本地进程，逐张保存可恢复进度，全部完成后发布清单；原生及旧图 RGB、新白底图内部 RGB、PNG 无损往返、AVIF 尺寸和 alpha 自动校验。本轮 200 张透明交付版已由用户于 2026-09-16 全部确认通过，`visualReview: approved_user` 和验收时的 PNG／AVIF 哈希分别保存，不改写原画既有记录；新增图默认为 `pending_user`。缓存复用保留已通过状态，改变图版内容必须重新验收。正式网页清单由汇总器生成，读取透明 AVIF；`transparentSrc` 指向透明 PNG，`originalSrc` 仍指向原件。旧 `assets/colored-avif/` 文件保留但不再用于页面。

批处理及人工审图入口见 [本轮记录](../assets/transparency-studies/batch-v1/README.md)。提取算法的合成回归检查可运行 `python3 -B tests/test_transparency.py`；它不替代用户目检。

线稿生成器检查文件存在、色板和部分字段，但没有覆盖全部来源质量要求。设色汇总器仅遍历队列，`--require-complete` 不会发现遗漏在队列外的新古迹，不能代替视觉验收。三张原小样已由用户确认保持原样并定为正式版，记录见 [正式版确认](../assets/color-studies/v1/README.md)。其他新增图仍需另行检查整库覆盖和逐图验收。

2026-09-16 的 [辟支塔规则实测](../assets/transparency-studies/sd_pizhi-rule-test/README.md) 第一阶段未取得合格原生透明原件：四次内置 imagegen 输出中，三次为无 alpha 的假棋盘格，一次虽有 alpha 仍有白色填充和光晕。生成要求不等于工具输出保证；必须保留实际通道检查与目检。原生透明失败候选留在测试记录中；用户随后授权白底脚本流程，辟支塔已通过该流程接入，仍待用户审图。

## 新增或修改古迹

1. 查同名、别名与所绘主体，确认是新条目还是既有条目的修订；保留已有 ID 和个人记录。未指定个人初始状态时默认未到访；用户要求存在歧义时再确认，不把考据新增自动加入心愿。
2. 按 [线稿规范](../assets/research/STYLE.md) 准备照片、真实来源、由内置 imagegen 生成的白底 PNG 原稿、绑定哈希的去底记录及通过 alpha 校验的透明交付版、两项图注与研究 JSON。新 JSON 使用现有字段，参考 `hn_chuzu.json`；历史提示词和输入按当时真实记录保留。
3. 更新 `SITES`，补齐 `PLACES` 和必要分类。检查所绘主体年代和国别。
4. 运行线稿生成器并检查原稿、交付图、`plates.js` 与 `sources.html` 的差异。缺少文件时补齐输入，不能用任意占位图片凑数。
5. 按 [设色流程](../assets/color-research/WORKFLOW.md) 制作、登记并验收设色图。向 `queue.json.entries` 加入对应条目并同步 `count`；沿用现有字段和真实路径，不伪造 worker 分工。三张已确认图版的 `excluded` 是特殊入口，变更它们需要同步汇总逻辑。
6. 运行 AVIF 转码脚本，再汇总设色清单，并比较 `SITES` 与 `COLORED_PLATES` 的 ID，确认整库覆盖。检查 `progress.pending`；目录完整不等于图版视觉合格。
7. 更新测试涉及的新增记录覆盖和数量基线。当前 `catalog.test.cjs`、`timeline.test.cjs`、`library.test.cjs` 包含固定批次数量，考据覆盖列表还包含手写 ID；新条目也应进入有效性检查，不能只调大数量。
8. 运行自动测试和相关浏览器检查。图版交付变化时同步本地素材副本和实际部署目录；同步 README 中对用户有意义的数量或功能说明。Git 中的清单更新不会自动交付被忽略的图片。

只改正文或研究来源时，可复用已核验图版；如果修改了所绘主体、形制、图注或年代配色，重新判断需要重画、重建或复核的范围。

## 验证矩阵

完整测试在仓库根目录执行：

```bash
node --test tests/*.test.cjs
```

现有套件较小，代码和目录改动完成后跑全套；定位问题可单独指定下面的测试文件。

| 改动 | 重点测试 | 额外检查 |
| --- | --- | --- |
| 个人记录、评价、迁移、备份 | `tests/library.test.cjs`、`tests/journal.test.cjs`、`tests/facets.test.cjs` | 导出导入、刷新、多标签页、键盘选星和存储失败 |
| 新增条目、地点、时代、筛选 | `tests/catalog.test.cjs`、`tests/facets.test.cjs`、`tests/timeline.test.cjs` | 新条目可搜索、定位和翻页，图版及来源可打开 |
| URL、历史状态、详情页 | `tests/navigation.test.cjs`、`tests/timeline.test.cjs` | 直接打开、刷新、旧锚点、Back 和前进 |
| 图片、资源地址、打卡 | `tests/artwork.test.cjs`、`tests/visit-slider.test.cjs` | 相对路径、加载失败、鼠标/触摸/键盘、取消和重试 |
| CSS、HTML、动效 | 与行为相关的现有测试 | 桌面与窄屏，布局、焦点、滚动和减少动态效果 |
| 文档 | 本地链接、代码路径、命令与副作用核对 | `git diff --check`；无需重建图版 |

仓库尚未配置 CI。Node 测试使用真实逻辑与模拟存储，部分交互使用模拟 DOM；它们不能证明浏览器布局、触摸事件和动画正确。测试数量随项目变化，以本次运行输出为准。

### 浏览器检查步骤

使用单独的浏览器配置或测试站点 origin，避免拿真实个人记录做导入、清空存储等测试。复用真实记录前先导出备份。

1. 首页按国家、地区、类型和搜索组合筛选，展开更多卡片，再从卡片、地图或年表打开详情。
2. 在详情页刷新；返回首页确认筛选、展开数量、滚动位置及年表时期/页码恢复。访问 `index.html#foguang` 确认旧链接仍跳到详情。
3. 对未到访条目测试部分拖动后松开、终点松开和取消手势。检查仅完成时保存一次、取消时不保存、成功印记保留。
4. 用键盘完成同一操作，检查焦点、状态提示及减少动态效果。窄屏实际检查滚动与拖动是否冲突。
5. 编辑日期、笔记并刷新；在卡片和详情页测试只评分、只短评、修改、清除、取消和键盘选星。确认评价不会改变到访状态；短评中的 HTML 按文本显示。导出后修改一个测试记录及评价再导入，确认同 ID 备份覆盖而其他记录保留，旧版备份不覆盖评价。打开两个标签页检查新笔记及评价不会被旧状态覆盖。
6. 在浏览器中模拟图片失败，检查线稿回退、设色重试及个人记录未被修改；存储失败不能出现成功印记。
7. 打开线稿、设色及来源页，核对图注、尺寸、搜索和链接。检查实际部署目录下的图片请求，不能只看开发机上文件存在。

汇报时写清检查过的浏览器、页面和流程；未执行的部分明确列出，不引用旧任务截图当作当前验证。

## 静态发布与素材保管

当前页面直接使用站点相对的 `assets/...` 路径，未实现独立图片前缀配置或自动资源打包。图片不在 Git 中，需要与页面一起放入实际网站目录；原稿、参考照片和恢复材料另行保管，以支持未来重建与考据复核。

1. 从本地素材副本补齐线稿、设色和首页图，确认与当前 `plates.js`、`colored-plates.js` 的路径、尺寸一致。Git 忽略规则不会替你备份这些文件。
2. 发布网站 HTML、CSS、JavaScript 与站点侧文档、考据 JSON。保留 `sources.html` 以及设色记录引用的文档；仅上传 HTML 和图片会造成来源链接缺失。
3. 将 `assets/colored-transparent-avif/`、透明线稿与首页图合并到发布目录的 `assets/`，保留 JSON 和目录层级。`assets/colored/`、`assets/color-studies/v1/` 的 PNG 是素材库，单独备份；若保留“打开设色原图”链接，还需按 `originalSrc` 提供这些按需访问的原件。素材来源说明见 [图版目录](../assets/README.md)。运行页面不需要把全部生成原稿和参考照片都公开发布。
4. 检查缓存更新及相关浏览器流程。当前仓库未指定固定托管平台或自动发布流程。

参考来源页、JSON 和历史记录中的图片路径可能指向独立保存的生产资料。文档应标明需要本地素材，不能将 Git 中保留的路径记录写成图片已随仓库交付。

## 文档维护

- [AGENTS.md](../AGENTS.md) 保存跨任务的简要规则；本指南保存机制、命令和操作步骤；图版规范保存领域约束。避免多处复制相同长规则。
- [线稿历史任务](../assets/research/history/line-production-2026-09-15.md)、[设色历史任务](../assets/color-research/history/color-production-2026-09-15.md) 保存原始分工和当时授权，供追溯；不用于启动新任务。
- [恢复摘要](../assets/color-research/history/recovery-2026-09-15.md)、批次清单和考据提示词保留历史事实。详细 `recovery/` 材料仅在本地保存。可以追加状态说明与当前入口，不篡改当时实际输入、数量或验证结果。
- 文档链接使用相对路径；机器绝对路径仅作为真实历史溯源记录保留，不用于当前操作示例。来源图与原始生成文件可能独立存储，记录路径不等于新机器上一定可用。
