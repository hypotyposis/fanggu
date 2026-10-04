# 数据模型

本文列出仓库中各类数据文件的字段与约束，供改数据前查阅。字段以代码为准：出现分歧时读对应脚本或 Swift 类型，并回来修正本文。何时允许改、改完重建什么见 [常见任务](tasks.md)；数据流向见 [架构](architecture.md)。

## 目录源数据 `sites.js`

四个顶层常量按出现顺序：`DYN`、`SITES`（后续批次用 `SITES.push(...)` 追加）、`CHAPTERS`、`PLACES`。文件既被浏览器按全局加载，也被 Node 脚本用 `vm.runInNewContext` 执行，因此只能写无依赖的纯 JavaScript。

### `DYN` 时代

键是时代 ID，如 `tang`、`jp_edo`、`ko_goryeo`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `glyph` | string | 卡片上的短字，如“唐”“江户” |
| `name` | string | 显示名，如“辽 · 金”“日本 · 江户” |
| `acc` | string | `var(--token)`，指向 `palette.css` 的 CSS 变量；导出时换成实际色值 |
| `start`、`end` | int，可省略 | 年表范围。省略时 `build-catalog.cjs` 用内置回退表 `timelineSpans` 补齐（han、goguryeo、bei、nan、beiqi、sui、tang、balhae、zhou、song、liao、yuan、ming、modern） |
| `country` | string，可省略 | 国别时代标 `JP`、`KH` 等 |
| `timelineLane` | string，可省略 | 年表轨道，朝鲜半岛时代为 `korea` |

新增时代同时改 `palette.css`、必要时 `CHAPTERS` 与 `build-catalog.cjs` 的回退表，并在 [线稿规范](../assets/research/STYLE.md) 记录颜色用途。

### `SITES` 古迹条目

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string，`^[a-z0-9_]+$` | 稳定且唯一；关联个人记录、图版文件名、研究 JSON、队列。改 ID 必须设计迁移 |
| `name`、`short`、`sub` | string | 全称、短名、所绘主体或局部说明 |
| `dyn` | `DYN` 键 | 时代；决定线稿颜色与年表分组 |
| `tag` | string | 卡片短标签 |
| `era` | string | 断代文字 |
| `year` | int | 排序与年表定位 |
| `yearLabel`、`yearApprox`、`yearNote` | string、bool、string | 范围或年号、是否约略、解释；不用精确排序点伪装精确史实 |
| `place` | string | 展示地点文字 |
| `placeKey` | `PLACES[].key` | 地点关联；国家、省份、地区、坐标全部由它派生 |
| `types` | string[]，非空 | `catalog.js` 的 `types` 键；复合条目可多类型 |
| `lede`、`facts`、`quote` | string、string[]、string | 可含 `<b>` 等标签，导出 iOS 时去除 |
| `caption` | [string, string] | 两项图注；若研究 JSON 有 `caption`，`plates.js` 会用那一组覆盖 |
| `initialStatus` | `unvisited`、`visited`、`wishlist` | 默认 `unvisited`；只有用户明确指定才预设其他值；已有个人记录优先 |
| `legacyNames`、`legacyPlaces` | string[] | 搜索别名与旧记录迁移名；地点别名不能宽到误配同名古迹 |
| `tall` | bool | 竖版图版 |
| `timelineLane` | string | 年表轨道，沿用现有实现支持的值 |
| `image` | object | 由 `plates.js` 在加载时写回；卢舍那原图 `assets/longmen-vairocana.png` 是源数据中保留的特例 |
| `draw` | function | 旧参数化 SVG 绘制器（`Buildings.*`），只供 `proof.html` 回退，新条目不写 |
| `country`、`province`、`placeName`、`lat`、`lon` | 个别条目残留 | 分类不读它们，以 `placeKey` 对应地点为准 |

分类由 `FangguCatalog.classify(SITES, PLACES)` 完成：地点缺失、地区无法匹配、类型未注册都会抛错，导出随之失败。

### `PLACES` 地点

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | string | 被 `SITES.placeKey` 引用 |
| `name` | string | 城市或城镇名，足迹地图按它聚合 |
| `prov` | string | 省级名称，必须出现在 `catalog.js` 某个地区的 `provinces` 中 |
| `lat`、`lon` | number | 地图显示点；南纬为负 |
| `country` | string，可省略 | 省略为 `CN` |
| `coordinate_note` | string，可省略 | 坐标性质说明，如“附近显示点，非测绘坐标” |

### `CHAPTERS` 章节

`{ key, years, blurb }`：章节键、年代文字、导语。描述本库所收遗迹的年代范围，不伪装成政权起止。

## 分类 `catalog.js`

| 导出 | 说明 |
| --- | --- |
| `countries` | 国别代码到名称：`CN`、`JP`、`KR`、`KP`、`KH`、`ID`、`TH`、`MM`、`LA`、`VN`、`PH` |
| `regions` | 地区键到 `{ name, country?, provinces[] }`；`country` 省略为 `CN` |
| `types` | 类型键到名称，如 `hall`、`pagoda`、`grotto`、`screen`、`garden` |
| `classify(sites, places)` | 派生 `country`、`province`、`region`、`protection` |
| `matches(site, filters)` | 筛选 `status`、`dynasty`、`country`、`region`、`province`、`type`、`query`；搜索文本含名称、别名、地点、时代、类型及类型别名、国保文本 |
| `provinces(sites, region, country)` | 当前范围内实际有条目的省份 |

iOS 端的 `ios/Fanggu/CatalogSearch.swift` 另有一份地区名、国家名与类型别名表。新增地区、国家或类型别名时两处同步，否则 App 搜索不到。

## 国保源数据 `assets/research/national-protection.json`

由 `scripts/prepare-protection.mjs` 校验并生成 `protection-data.js`。

| 字段 | 说明 |
| --- | --- |
| `version` | 固定 `1` |
| `checkedAt` | `YYYY-MM-DD` 核对日期 |
| `level` | 固定“全国重点文物保护单位” |
| `batchMeaning` | 批次含义说明 |
| `sources.<key>` | `{ batch, title, publisher, url, announcedOn, retrievedOn, retrievedSha256 }`；`url` 必须是 `https` 且位于 `.gov.cn`（或登记的浙江政报域名） |
| `entries.<id>[]` | `{ batch, unitName, relation, scope, source, locator, note?, parent?, scopeSources? }`；`relation` 为 `unit`、`part`、`merged`；`merged` 必须有 `parent.unitName`、更早的 `parent.batch` 与 `note` |
| `untagged.<id>` | `{ status, reason }`；`status` 为 `unconfirmed`、`related_site`、`not_applicable` |

同一 ID 不能同时出现在 `entries` 与 `untagged`；两处的 ID 都必须存在于 `SITES`。目录里尚无登记的新 ID 允许存在，不阻塞原型制图。

## 线稿记录 `assets/research/<id>.json`

每张线稿一份，`prepare-plates.mjs` 读取它生成清单与来源页。核心字段：

| 字段 | 说明 |
| --- | --- |
| `id`、`subject` | 与 `SITES.id` 对齐；所绘主体 |
| `sources[]`，或平铺的 `source_page`、`image_url`、`author`、`license`、`license_url` | 参考照片来源与署名；新记录用 `sources[]`，旧记录可能是平铺字段，生成器两种都接受 |
| `reference_files[]`、`input_images[]` | 实际传给 imagegen 的本地文件 |
| `source_note` | 参考说明 |
| `prompt` | 实际使用的完整提示词，不事后改写 |
| `generated_file` | `assets/generated/<id>.png` |
| `generation_tool`、`generation_original_file`、`generation_history[]` | 生成工具、工具返回的原件绝对路径（仅溯源）、历次生成 |
| `dimensions` | `[width, height]` |
| `caption` | 两项字符串；进入 `plates.js` 并覆盖 `SITES.caption` |
| `historical_sources[]`、`factual_sources[]`、`additional_sources[]` | 形制与年代依据、补充来源 |
| `background_preparation` | `{ method, sourceSha256, seeds[] }`；`method` 为 `white-matte-v1` 或 `adaptive-ink-v1`，哈希绑定 `generated_file` 的实际字节 |
| `review` | 制作时的查看记录 |
| `user_review` | 由 `record-plate-review.mjs line` 写入：`{ status: "approved_user", reviewer: "user", reviewed_at, sourceSha256 }` |
| `site_recommendation`、`coordinates` | 入库建议与坐标来源，供维护者参考 |

## 设色记录 `assets/color-research/<id>.json` 与队列

### 逐图记录

| 字段 | 说明 |
| --- | --- |
| `id`、`name`、`subject` | 与队列条目一致 |
| `status` | `prepared` → `needs_review` → `complete`；严格模式汇总器只接受 `complete`，原型模式接受已有输出文件的记录 |
| `generator` | 生成工具 |
| `input_images[]` | 实际输入：线稿、实拍、风格样本 |
| `prompt` | 完整提示词 |
| `material_observations[]` | 实际观察到的材质颜色 |
| `references[]` | `{ file, source_page, image_url, author, license, license_url, date, note, role? }`；`role: research_context_not_generation_input` 表示只是研究背景 |
| `original_research` | 对应线稿记录路径 |
| `output` | `assets/colored/<id>.png` 原件 |
| `generated_original` | 工具返回的原件绝对路径（仅溯源） |
| `width`、`height` | 原件尺寸 |
| `visual_review` | `{ inputs_viewed, output_viewed, checks[], limitations }` |
| `completed_at` | ISO 8601 |
| `background_preparation` | `{ method, sourceSha256, seeds[] }`；`method` 为 `white-matte-v1`、`native-alpha`、`edge-connected-matte-v1`；旧暗底原件可无此字段 |
| `user_review` | 由 `record-plate-review.mjs color` 写入：`{ status, reviewer, reviewed_at, sourceSha256, inputSha256, avifSha256 }` |

### `assets/color-research/queue.json`

`{ created, count, excluded[], entries[] }`。`count` 必须等于 `entries.length`；`entries` 加 `excluded` 的 ID 集合必须等于 `SITES` 的 ID 集合。`excluded` 只放三张正式版 `longmenshiku`、`foguang`、`yingxian`，它们的原件在 `assets/color-studies/v1/<id>-colored.png`。

条目字段：`id`、`name`、`subject`、`sub`、`place`、`dyn`、`types`、`owner`、`line`、`displayLine`、`width`、`height`、`originalResearch`、`candidateReferences`、`output`、`record`。汇总器只读 `id`、`name`、`subject`、`record`、`output`、`width`、`height`；`owner` 等是历史分工字段，新条目照抄已有格式即可，不伪造 worker。

## 交付清单

### `assets/color-research/avif-manifest.json`

由 `prepare-colored-avif.py` 写出。顶层：`format`（`AVIF`）、`settings`（质量 85、`4:4:4`、speed 6 等）、`encoder`（Pillow 与 libavif 版本）、`transparency`（旧抠图参数与处理器哈希）、`visualReview`（全部通过时为 `approved_user`，否则 `pending_user`）、`images`。

`images.<id>` 字段：原件 `source`、`sourceSha256`、`sourceBytes`；透明 PNG `input`、`inputSha256`、`inputBytes`；AVIF `src`、`sha256`、`bytes`、`width`、`height`；`alpha`（最小值、最大值、透明与不透明像素数、往返误差）；`extraction` 或 `backgroundPreparation`（去底方法、参数、处理器哈希）；`visualReview`；`processingSeconds`；用户验收时的 `review`。

运行中的检查点写在同目录 `transparent-avif-progress.json`，成功结束后删除；该文件存在说明上次转码没有完成。

### `colored-plates.js`

`globalThis.COLORED_PLATES = { <id>: { src, originalSrc, transparentSrc, transparent, visualReview, alt, width, height, tint: false, record, references[] } }`。`src` 是 AVIF 交付路径，`originalSrc` 是原件 PNG，`transparentSrc` 是透明 PNG 中间稿；`visualReview` 为 `approved_user` 或 `pending_user`。

### `plates.js`

`const PLATES = { <id>: { src, alt, width, height, color, tint: false, caption? } }`，随后遍历 `SITES` 把 `image` 写回每个条目。含一张非古迹的 `hero`（佛光寺斗拱），供审图页使用。

### `progress.json`、`prompts.json`

`progress.json` 为 `{ total, complete[], pending[] }`；`prompts.json` 为 `[{ id, name, prompt, input_images, record }]`。两者都由汇总器重写，不手改。

## iOS 目录 `ios/Fanggu/Resources/catalog.json`

数组，每项对应 `Models.swift` 的 `Monument`。字段来源：

| 字段 | 来源 |
| --- | --- |
| `id`、`name`、`short`、`sub`、`tag`、`era`、`year`、`yearLabel`、`yearApprox`、`yearNote`、`place`、`placeKey`、`types`、`initialStatus`、`legacyNames`、`legacyPlaces` | `SITES` 原值；空值补 `""`、`false` 或 `[]` |
| `dynasty`、`dynastyName`、`dynastyGlyph`、`dynastyStart`、`dynastyEnd`、`timelineLane` | `DYN`；起止年用回退表补齐 |
| `dynastyColor` | `palette.css` 中 `DYN.acc` 指向的色值 |
| `placeName`、`country`、`province`、`region`、`latitude`、`longitude` | `PLACES` 与 `classify()` |
| `typeNames` | `catalog.js` 的类型名 |
| `lede`、`facts`、`quote` | 去除 HTML 标签后的文字 |
| `captions` | `image.caption`，否则 `SITES.caption` |
| `lineImage`、`colorImage` | 线稿 PNG 与设色 AVIF 的文件名，不含目录 |
| `sourceURL`、`sourceLinks[]` | 设色记录中首个带页面的参考；研究与设色记录中去重后的 `{ title, url }` |
| `protection[]` | `{ batch, unitName, relation, scope, locator, note, sourceTitle, sourceURL }` |

导出在重复 ID、缺地点、缺图版、缺时代色时失败。

## 个人记录 library.json

App 在本机 Application Support 下 `Fanggu/library.json` 保存 `LibraryData`（当前版本 4），所有读写经 `LibraryStore` 校验后原子写入。备份文件就是这份 JSON 加 `exportedAt`，键按字母序、带缩进。

```json
{
  "version": 4,
  "customSites": [
    { "id": "personal-xxxxxx", "name": "…", "place": "…", "dyn": "…", "description": "", "custom": true }
  ],
  "records": {
    "<古迹 id 或 personal- id>": { "status": "unvisited | wishlist | visited", "visitedOn": "YYYY-MM-DD 或空", "note": "" }
  },
  "links": { "<personal- id>": "<古迹 id>" },
  "reviews": {
    "<古迹 id>": {
      "rating": 1,
      "dimensions": { "eraRarity": 1, "authenticity": 5, "construction": 3, "art": 2, "scale": 4, "setting": 3 },
      "text": "",
      "updatedAt": "2026-10-05T12:34:56.789Z"
    }
  }
}
```

| 约束 | 值 |
| --- | --- |
| `version` | 读取接受 1–4；保存与导入后统一写 4 |
| `customSites` | 旧版网页的自建古迹；不超过 2000 条；`id` 匹配 `^personal-[a-z0-9-]{6,80}$` 且不与目录 ID 重合；`name`、`place` 非空 |
| `records` | 不超过 5000 条；键必须是目录 ID 或自建 ID；`note` 不超过 12000 个 UTF-16 单元；`visitedOn` 为空或严格 `yyyy-MM-dd` 且不晚于今天 |
| `links` | 自建 ID 到目录 ID；目标必须已有记录 |
| `reviews` | 不超过 5000 条；键必须是目录 ID；`rating` 为 1–5 或缺省（旧五星，不换算）；`dimensions` 键只允许六个维度，值 1–5，未评分的键省略；`text` 不超过 500 个 UTF-16 单元；`updatedAt` 为带毫秒的 ISO 8601，须能原样往返 |

导入规则：文件不超过 2 MB；版本 1、2 不带 `reviews`；版本 3 的评价合并时保留本机已有的六维分数；版本 4 可明确清空。`customSites` 按 ID 覆盖或追加，`records` 与 `links` 以导入值为准。导入成功后 `version` 变为 4，并清除当前撤销。读取失败时保留原文件、拒绝所有写入，直到导入有效备份。

旧记录关联 `linkLegacy` 把自建条目并入目录条目：状态取两者中更高者（已到访、心愿、未标记依次降低），笔记去重拼接，日期优先保留目录记录已有的值。

六维键与显示名：`eraRarity` 年代稀缺、`authenticity` 原真完整、`construction` 结构营造、`art` 艺术遗存、`scale` 规制体量、`setting` 环境格局；档位 1–5 对应 E–A。

## 其他配置与记录

| 文件 | 内容 |
| --- | --- |
| `scripts/plate-policy.json` | `{ "mode": "prototype" }` 或 `strict`；命令行 `--strict`、`--prototype` 可临时覆盖 |
| `assets/research/legacy-line-originals.json` | `sha256BySource`：允许走旧白底抠图路径的线稿原件哈希白名单，不为新图扩充 |
| `assets/research/japan-periods.json` | 日本时代起止与来源 |
| `assets/research/<batch>-plan.md`、`<batch>-batch.json`、`<batch>-report.md` | 批次计划、本批 ID 列表（`ids` 或 `added_ids`）、交付报告；测试从中读取批次 ID |
| `assets/asset-lock.json` | `{ format: 1, assetSet, files: [{ path, bytes, sha256, tier }] }`；`tier` 为 `runtime` 或 `source`；`assetSet` 是 `files` 规范化 JSON 哈希的前 20 位；`runtime` 集合必须等于 `catalog.json` 所需图版加卢舍那原图 |
| `ios/Fanggu/Resources/MAP-SOURCES.md` | 离线底图来源、版本、许可与哈希 |
