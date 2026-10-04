# 术语表

按主题分组；括号内为代码或文件中的对应名称。

## 产品与界面

| 术语 | 含义 |
| --- | --- |
| 访古 | 本项目与 App 名；Xcode 目标名 `Fanggu` |
| 图鉴、足迹、年表、我的 | App 底部四栏：目录浏览与筛选、已到访地图、按时代浏览、个人统计与备份 |
| 古迹、条目 | `SITES` 中的一项，以 `id` 标识 |
| 所绘主体（`sub`、`subject`） | 图版实际画的殿、塔、造像或局部；年代、国保、评价都针对它 |
| 到访（`visited`）、心愿（`wishlist`）、未标记（`unvisited`） | 个人记录的三种状态 |
| 记录今日到访、补记到访 | 前者直接写入今天日期；后者用日期选择器填过去日期或保持日期不详 |
| 打卡、拖动打卡（`ArrivalSlider`） | 从“访”字拖到最右端松手才保存到访；过程中设色图渐显 |
| 亲见 | 到访后显示的印章文字 |
| 六维评价 | 年代稀缺、原真完整、结构营造、艺术遗存、规制体量、环境格局六项，各自 E–A 五档（内部 1–5），可留空；私人综合分为已评项等权平均，读取时派生，不另存 |
| 短评（`text`）、旧五星（`rating`） | 评价中的文字与旧版导入的星级；星级不换算成六维 |
| 撤销 | 保存成功后对最近一次记录或评价修改的按字段恢复；只在内存中保留一次 |
| 备份版本 1–4 | 个人记录 JSON 的格式版本；App 写 4，可导入 1–4 |
| 旧记录、自建古迹（`customSites`） | 旧版网页备份中的个人条目，可关联到目录条目（`links`） |
| 外观 | 跟随系统、亮色、深色；保存在 `UserDefaults`，不进备份 |

## 目录数据

| 术语 | 含义 |
| --- | --- |
| 目录 | 全部古迹数据；源在 `sites.js` 等文件，导出为 `catalog.json` |
| 时代、朝代（`DYN`、`dyn`） | 条目所属时期；中国朝代、日本时代、朝鲜半岛与东南亚时期分别分类 |
| 时代色、朝代色 | `palette.css` 中每个时代的颜色；线稿按它着色，界面标签也用它 |
| 地点（`PLACES`、`placeKey`） | 城市或城镇级显示点，带坐标；国家、省份、地区由它派生 |
| 地区（`region`） | `catalog.js` 中的筛选分组，如华北、近畿、吴哥地区 |
| 类型（`types`） | 殿堂、古塔、石窟石刻等建筑类型键 |
| 章节（`CHAPTERS`） | 按年代分段的导语 |
| 年表轨道（`timelineLane`） | 年表中并列显示的轨道，如朝鲜半岛 |
| 别名（`legacyNames`、`legacyPlaces`） | 搜索与旧记录迁移用的其他名称 |
| 国保 | 国务院公布的全国重点文物保护单位；“第几批国保”按所绘主体首次公布或纳入合并项目记录 |
| 并入（`merged`）、组成部分（`part`）、独立单位（`unit`） | 所绘主体与国保单位的关系 |
| `unconfirmed`、`related_site`、`not_applicable` | 未贴国保标签的原因：未核实、相关遗址身份不转授、不适用中国制度 |
| 分类（`classify`） | `catalog.js` 按地点派生国家、省份、地区并附国保登记的过程 |

## 图版与生产

| 术语 | 含义 |
| --- | --- |
| 图版（plate） | 一处古迹的插图；分线稿与设色图两种 |
| 线稿（line plate） | 细线描的透明图，按时代色着色；未到访时显示 |
| 设色图（colored plate） | 按现存实物材质颜色上色的透明图；到访后显示 |
| 母版 | `assets/references/longmen-style-black.png`，从卢舍那大佛线稿提取的风格参考，每次生成都作为风格输入 |
| 原件 | imagegen 直接输出并保存的 PNG：线稿在 `assets/generated/`，设色在 `assets/colored/`；完整保留，不覆盖 |
| 交付图、交付版 | App 与审图实际使用的文件：线稿 `assets/plates/<id>.png`，设色 `assets/colored-transparent-avif/<id>.avif` |
| 透明 PNG 中间稿 | `assets/colored-transparent/<id>.png`，去底后、转 AVIF 前的无损副本 |
| 白底流程 | 默认生产方式：生成纯白底 PNG，再由本地脚本去底 |
| 去底、抠图 | 把白底或旧暗底变为透明；方法名见下 |
| `white-matte-v1` | 严格白底处理：校验近纯白边缘，线稿按灰度转 alpha，设色只去外部连通白底 |
| `adaptive-ink-v1` | 原型模式下对含灰色柔和底的线稿原件按局部明度差提取笔画 |
| `native-alpha`、`existing-alpha-preserved` | 原件本身带透明通道，直接保留 alpha 只改 RGB |
| `edge-connected-matte-v1` | 旧暗底原件的边缘连通抠图，仅限哈希白名单内的旧件 |
| 透空种子（`seeds`） | 人工确认的封闭空隙像素坐标，让去底也移除这些区域 |
| 处理器哈希 | 去底脚本文件的 SHA-256，进入缓存键；脚本变了相关图版就要重建并重新人审 |
| 研究 JSON、考据记录 | `assets/research/<id>.json`（线稿）与 `assets/color-research/<id>.json`（设色）：来源、提示词、输入、尺寸、验收 |
| 队列（`queue.json`） | 设色生产的条目清单；`excluded` 是三张正式版的特殊接入 |
| 三张正式版 | 卢舍那大佛、佛光寺东大殿、应县木塔的设色图，用户确认保持原样，文件在 `assets/color-studies/v1/` |
| 清单（manifest） | 生成的汇总文件：`plates.js`、`colored-plates.js`、`avif-manifest.json` |
| 汇总器 | `collect-colored-plates.mjs` |
| 原型模式、严格模式 | `plate-policy.json` 的两种模式：前者不以技术指标阻塞交付，用户人眼验收为准；后者恢复全部校验 |
| `prepared`、`needs_review`、`complete` | 设色记录的制作状态 |
| `pending_user`、`approved_user` | 图版的用户验收状态；只有用户明确通过的 ID 才记为后者 |
| `user_review` | 记录用户验收的字段，绑定当时的文件哈希；文件改变即失效 |
| 人审、目检 | 由人实际查看图片；文件存在、尺寸正确不等于通过 |
| 审图工具、校对页 | 根目录的 `proof.html`、`color-proof.html`、`color-studies.html`、`sources.html` |
| imagegen | 代理内置的图像生成工具；本项目用它生成白底 PNG，不需要 API Key |
| 批次（batch） | 一次新增若干古迹的工作单元；有计划 `*-plan.md`、ID 列表 `*-batch.json`、报告 `*-report.md` 与对应测试 |
| hero | 佛光寺斗拱的一张非古迹线稿，供审图页标题使用 |

## 素材与环境

| 术语 | 含义 |
| --- | --- |
| 素材 | 被 Git 忽略的图片、原稿、参考照片、PDF |
| `runtime`、`source`、`full` | 素材层级：App 所需最小集合、其余原稿与参考、两者之和 |
| 资源包、`asset-dist/<assetSet>/` | `asset-bundle.py pack` 产出的分卷 TAR 与索引，复制到独立存储保管 |
| `asset-lock.json`、`assetSet` | 被忽略素材的逐文件哈希清单与其集合 ID |
| worktree | Git 工作树副本；默认没有素材，部分测试与同步脚本会失败 |
| 独立模拟器 | 专为测试创建的 iOS 模拟器，避免改动真实个人记录；`ios/scripts/test-device.sh` 按检出目录名创建与回收 |
| 测试作用域、`FANGGU_LIBRARY_SCOPE` | Debug 构建读取的环境变量；设置后个人记录与外观写入 `scopes/<scope>/`，UI 测试每个用例一个 |
| 历史资料 | `history/`、`recovery/`、带日期的计划与报告、`docs/reviews/`；记录当时事实，不构成新任务的授权或分工 |
