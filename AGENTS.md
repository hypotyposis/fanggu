# 访古开发约定

适用于本仓库的代码、数据、图版和文档维护。用户在当前任务中的明确要求优先；历史任务记录不构成新任务的授权。

访古是一款可离线使用的 iOS 原生 App（`ios/`）。仓库同时保存古迹目录的源数据（根目录 JS 与 `palette.css`）、图版生产脚本（`scripts/`）和本地审图工具（根目录 HTML）。网页产品已移除。

## 先读什么

| 任务 | 先读 |
| --- | --- |
| 第一次进入仓库 | [架构与数据流](docs/architecture.md)，再读本文其余规则 |
| 改古迹文字、地点、分类、时代或国保资料 | [数据模型](docs/data-model.md)，然后 [常见任务](docs/tasks.md) 对应条目 |
| 新增或重绘古迹图版 | [增量制图操作手册](docs/monument-batch-workflow.md)，再按需读 [线稿规范](assets/research/STYLE.md)、[设色流程](assets/color-research/WORKFLOW.md)、[国保标签与选目规则](docs/national-protection.md) |
| 改 iOS 界面、个人记录、评价 | [iOS 开发说明](ios/README.md)，然后 [开发指南 · 数据和个人记录](docs/development.md#数据和个人记录) |
| 改生成脚本或审图工具 | [脚本一览](scripts/README.md)，然后 [开发指南 · 生成文件与命令副作用](docs/development.md#生成文件与命令副作用) |
| 决定执行哪些检查、如何汇报 | [测试与验证](docs/testing.md)、[测试一览](tests/README.md) |
| 看不懂的名词 | [术语表](docs/glossary.md) |

## 改动与重建速查

完整矩阵与逐步操作见 [常见任务](docs/tasks.md)。生成文件不手工修补；写文件的脚本只在对应输入变化时运行。

| 改了什么 | 必须重建 | 至少验证 |
| --- | --- | --- |
| 只有 `*.md` | 无 | 链接、路径、命令描述；`git diff --check` |
| `sites.js`、`catalog.js` 或 `assets/research/<id>.json` 的文字与分类 | `node ios/scripts/build-catalog.cjs` | `node --test tests/*.test.cjs` |
| `assets/research/national-protection.json` | `node scripts/prepare-protection.mjs`，再 `build-catalog.cjs` | `node scripts/prepare-protection.mjs --check` 与 Node 测试 |
| `palette.css` 时代色 | `node scripts/prepare-plates.mjs`，再 `build-catalog.cjs`、`sh ios/scripts/sync-artwork.sh assets` | Node 测试、审图页、App |
| 新增古迹或图版 | [手册第 5 节](docs/monument-batch-workflow.md) 全链路 | 手册第 5 节全部命令、浏览器审图、App |
| `ios/Fanggu/*.swift` | 无数据重建 | 相关 `FangguTests`、`FangguUITests`，独立模拟器 |
| `ios/project.yml` | `xcodegen generate` | 构建 |
| `assets/` 下被忽略的图片 | 有完整素材时 `python3 scripts/asset-bundle.py lock` | `asset-bundle.py verify` |

## 当前原型阶段：生成即通过

- 当前默认模式由 `scripts/plate-policy.json` 决定，为 `prototype`。先跑通原型、扩大收录；下文和图版规范中的技术质量拦截仅在严格模式生效。
- 原型模式不以白底、偏色、alpha、尺寸或像素保持阈值阻塞交付，不因这些指标自动重新生图。AI 不对生成稿作视觉通过/淘汰决定。
- 用户于 2026-10-05 决定：审图时间不是瓶颈，图版默认通过，不等人眼验收。线稿保存后直接推进设色、尽力去底与转码；每批转码后运行 `node scripts/record-plate-review.mjs color --default --all-pending` 与 `line --default --all-pending`，再转码、汇总即交付。不把“待用户审图”写成阻塞或下一步；用户要求先看线稿时只暂停对应项。
- 状态只有三种，都交付，iOS 打包不区分：`pending_user` 是转码后、默认通过命令前的瞬时状态；`approved_default` 表示按默认策略接入、哈希绑定原件与交付文件、没有人眼审阅；`approved_user` 只在用户明确说过通过时用 `record-plate-review.mjs color|line <id> ...` 记录。标签必须诚实，默认通过的图不得写成 `approved_user`。
- 原件、真实提示词、来源与哈希绑定仍保留；文件缺失、解码/编码失败仍报告为执行错误，不伪造产物；资料不足的条目仍阻塞。严格模式可用 `--strict` 临时恢复，命令与字段见 [原型流程](docs/monument-batch-workflow.md#当前原型模式)。此约定不授权提交、发布、修改个人记录或自行增加代理。

## 开工与入口

- 先看 `git status --short --branch`，识别已有改动；在当前任务约定的分支工作，保留其他任务的未提交修改。
- 阅读 [开发指南](docs/development.md) 中与改动相关的部分。制作线稿时读 [线稿规范](assets/research/STYLE.md)，制作设色图时读 [设色流程](assets/color-research/WORKFLOW.md)。
- 新增古迹必须执行 [增量制图操作手册](docs/monument-batch-workflow.md)：先落盘本批 ID、主体、参考与结构检查点，再按就绪项推进；批量新增不能逐处串行完成全部工序后才开始下一处。
- 中国古迹拟名单先参考官方国保单位名单，按 [国保标签与选目规则](docs/national-protection.md) 核对批次、正式单位名及所绘主体范围；国保不是收录硬门槛，身份未确认不贴标签，也不阻塞有可靠资料的原型制图。元数据维护 `assets/research/national-protection.json` 后仅重建国保数据，不重画图片或改到访记录。
- `history/`、`recovery/` 和带日期的候选、批次报告是历史资料。代理人数、任务分工、绝对工作路径和当时授权不延续到后续任务。
- 能从实现和测试确定的细节直接处理；无法确定的个人到访状态、所绘主体范围取舍或产品行为向用户确认，继续推进不依赖答案的工作。
- 产品交互遵循“能一步做完，就不要分两步”。新增或改动交互时，一次明确动作能完成的操作直接生效，不额外要求点保存；手势取消不写入，保存失败保留数据和输入并显示错误。

## 代码与资源

- 正式产品只维护 `ios/` 原生 App。网页产品已移除；根目录 HTML/CSS/JavaScript 是目录数据与本地审图工具。构建和验证见 `ios/README.md`，不新增网页产品或公网素材分发。沿用现有模块与局部风格。
- 数据与审图脚本依赖全局对象和加载顺序。修改公共接口时检查 iOS 目录导出及相关审图页；供 Node 测试使用的模块保留 CommonJS 入口。
- 个人记录在 `ios/Fanggu/LibraryStore.swift`，图版与打卡在原生共用视图中。目录输入为 `sites.js`、图版清单、文保资料、`catalog.js`、`curations.js` 与 `palette.css`，通过 `ios/scripts/build-catalog.cjs` 导出；图版通过 `sync-artwork.sh` 打包。
- `plates.js`、`colored-plates.js`、`sources.html` 及汇总清单由脚本生成：修改源数据或生成器后重建，不手工修补生成结果。命令及副作用见开发指南。
- 图版清单保存站点相对的 `assets/...` 路径。图片、原稿和参考照片不随 Git 交付；在新克隆或 worktree 中先补齐本地素材，保持目录层级和来源记录。缺素材时 `sync-artwork.sh` 与多数 Node 测试会失败，这是环境问题而非代码缺陷；能运行的检查子集见 [测试与验证](docs/testing.md#没有本地素材时)。
- **新增或重绘古迹默认使用内置 imagegen 生成纯白底 PNG 原件，再由本地脚本生成透明交付图。** 用户已明确授权这条无需 API Key 的流程。提示词要求纯白 `#FFFFFF`、无阴影、渐变、纸纹、光晕或棋盘格；白底原件完整保留，不标成原生透明图。生成后在逐图 JSON 写入 `background_preparation: { method: "white-matte-v1", sourceSha256, seeds }`，绑定实际原件哈希。线稿按灰度生成笔画 alpha 并着朝代色；设色仅去除与外部连通的白底和记录过的透空种子，保留实体浅色与门窗暗部，仅在最外层轮廓去白边。`scripts/white-matte.py` 检查近纯白边缘，拒绝不合格底图。最终 PNG/AVIF 须有真实透明与可见主体；白色画布被移除只说明去底完成，验收状态由 `record-plate-review.mjs` 写入，默认为 `approved_default`，不得记为 `approved_user`。既有已通过图版按原哈希缓存，不批量重画；已有原生 alpha 继续直接保留。API 透明参数入口为可选路径，只有用户另行选择并提供凭证时使用。
- 只在需要更新图版时运行生成脚本。它们会写文件；文档编辑和普通界面改动不需要全量重建图片。

## 增量制图的效率约束

- 按操作手册的搜索预算收口；证据不足的条目标记阻塞，继续其他就绪项，不凭空补全或擅自缩小已约定主体。
- 工具支持且没有已知更低硬限制时，生图起始并发目标为 8，线稿与设色合计；有就绪项就填满。遇明确限流、并发拒绝或服务过载，按手册逐档减半（8→4→2→1），同一波失败只降一次，记录实际信号而非预先保守限为 3。线稿核验后才启动它的设色，及时领取结果；此为工具并发，不授权自行增加代理或套用历史 worker 分工。
- 首稿失败先做一次定向修正。同一关键错误再次出现时，必须改变参考、裁图或约束表达并记录策略，不能原样反复重试；具体止损规则见手册。
- 原件与逐图真实记录及时保存；共享目录、队列和清单集中接入。生成器、转码器、汇总器按依赖顺序执行并确认退出成功后再测试，不边写清单边读取旧结果。
- 批次报告必须包含墙钟时间、实际生成次数、返工次数、阻塞原因及已执行检查；工具耗时和交叉阶段不简单相加。超时应报告和调整调度，不以跳过来源、透明校验或目检换取完成。

## 必须保持的行为

- 古迹 `id` 关联原生个人记录、备份和图版。更名优先改显示名称；变更或删除既有 ID 时同时设计迁移，不能使旧记录失联。
- App 个人记录保存在本机 Application Support，当前格式为版本 4，兼容版本 1–4 导入；旧版 JSON 兼容不依赖已移除的网页代码。修改格式时保留迁移和失败恢复能力。
- 新条目默认未到访。只有用户明确指定时才预设已到访或心愿；已有个人记录优先于 `initialStatus`。不臆填到访日期。
- 记录修改通过 `ios/Fanggu/LibraryStore.swift` 校验和保存。失败时保留原始数据并显示错误；图版加载、切换和动效不能自行改写个人记录。
- 拖动打卡在到达终点并松手时保存；取消手势不保存。键盘和辅助输入可完成相同操作，保存成功后才呈现完成状态。
- 评分与短评按古迹 ID 独立保存，不改变到访状态或笔记；旧版备份不覆盖评价，清除评价保留修改时间。规则见开发指南。
- 个人笔记、短评、备份内容和搜索输入作为文本处理，不作为 HTML 插入。
- 原生详情返回保留浏览状态；设色图缺失或失败时保留线稿回退。本地审图页互相链接，不指向已移除的网页首页或详情。
- 年代对应图版所绘主体，区分初创、现存、重建与约略定位。中国朝代和日本时代分别分类；地图地域来自 `PLACES` 与 `catalog.js` 的规则。
- 实际图片、参考来源和生成记录齐备后再把新条目接入交付。保留真实提示词、来源署名和目检结果；验收状态只由 `record-plate-review.mjs` 写入，默认通过（`approved_default`）不冒充人眼验收（`approved_user`）。

## 验证与交付

在仓库根目录按用途分别执行：

| 命令 | 用途 |
| --- | --- |
| `python3 -m http.server 8765 --bind 127.0.0.1` | 持续运行本地审图服务器；其他命令在另一个终端执行 |
| `node --test tests/*.test.cjs` | 自动测试；多数文件需要本地素材 |
| `node scripts/prepare-protection.mjs --check` | 只读核对国保生成数据是否过期 |
| `python3 -B -m unittest discover -s tests -p 'test_*.py'` | 去底、转码、素材包的合成数据测试 |
| `sh ios/scripts/run-ios-tests.sh [-only-testing:…]` | 在本会话独立模拟器和 `ios/build/DerivedData` 上运行原生测试 |
| `git diff --check` | 差异空白检查 |

- 纯文档改动检查链接、路径、命令描述及 `git diff --check` 即可。
- 代码或目录数据改动运行现有测试；修复行为缺陷时补能复现缺陷的测试。不要仅为格式或静态说明改动添加测试。
- 涉及 UI、输入手势、导航或图片地址时，按开发指南在模拟器／真机检查原生流程；审图工具在真实浏览器检查；模拟 DOM 测试不能证明布局和触摸体验正确。
- 新增古迹时同步检查图版队列、覆盖范围和测试中的批次数量；不能只改数量断言使测试通过。
- 多个会话或代理并行时：各在独立 worktree 工作并先补齐被忽略的本地素材；原生测试通过 `ios/scripts/run-ios-tests.sh` 使用各自的模拟器与 DerivedData，不共用模拟器，`-destination` 用 `id=` 而非 `name=`；审图服务器端口被占用时用 `python3 -m http.server 0 --bind 127.0.0.1` 取空闲端口；耗时阈值用例在其他 xcodebuild 并行时可能误报，复跑后再判断。细节见 [并行会话与测试隔离](docs/development.md#并行会话与测试隔离)。
- 汇报改动、实际执行的检查与未验证项。历史报告中的测试数量和截图不代表本次验证。
- 文档链接使用仓库相对路径。接口、命令、存储格式或生产流程改变时，同步更新对应开发文档；长期规则引用数据来源，不复制固定数量和旧分工。

## 文档地图

- 规则：本文。`CLAUDE.md` 只导入本文，不另写规则。
- 索引与地图：[docs/README.md](docs/README.md)、[架构与数据流](docs/architecture.md)、[术语表](docs/glossary.md)。
- 做事：[常见任务](docs/tasks.md)、[测试与验证](docs/testing.md)、[脚本一览](scripts/README.md)、[测试一览](tests/README.md)。
- 机制与领域：[开发指南](docs/development.md)、[增量制图操作手册](docs/monument-batch-workflow.md)、[国保标签与选目规则](docs/national-protection.md)、[线稿规范](assets/research/STYLE.md)、[设色流程](assets/color-research/WORKFLOW.md)、[图版说明](assets/README.md)、[iOS 开发说明](ios/README.md)。
- 历史资料：[docs/reviews/](docs/reviews/)、`assets/research/history/`、`assets/color-research/history/`、带日期的计划与报告。
