# 日本保护身份

日本古迹的建筑类指定独立于中国[全国重点文物保护单位](national-protection.md)。源数据为 [japanese-protection.json](../assets/research/japanese-protection.json)，只收录文化财保护法下现行的国宝、重要文化财（建造物）。国宝属于重要文化财中的特别指定，界面只显示较高一级，不同时贴两个标签。

## 核对范围

- 以文化厅[国指定文化财等数据库](https://kunishitei.bunka.go.jp/bsys/index/)的各栋记录为依据，核对名称、栋名、所在地、指定区分与日期。保留正式日文名称、来源 URL、抓取日期及实际响应的 SHA-256；不根据旅游宣传、世界遗产身份或照片所藏博物馆的保护等级推断建筑身份。
- 所绘主体决定标签范围。同名寺院必须核对都道府县；只绘一殿、一门时不借用同寺其他建筑的指定。多个指定对象组成同一图版时分别保留登记与来源，卡片和详情顶部按等级去重，详情“文物保护”逐项列出。
- 指定日期取所显示等级的生效日期。升为国宝后替换原重要文化财标签，不将答申日期当作正式指定日期。
- 庭园的史迹／名胜、已毁原建筑的旧国宝身份、皇室建筑身份不映射为这两种建筑标签。没有核实的对象留在 `untagged`，不据此断言“非文化财”。

## 数据与维护

`entries.<id>[]` 保存 `system: "JP"`、`designation`（`national_treasure` 或 `important_cultural_property`）、`batch: null`、`unitName`、`relation`（`unit`／`part`）、`scope`、`source`、`locator`、`designatedOn` 与 `note`。`sources` 的键以 `jp_` 开头，使用文化厅 HTTPS 记录。`untagged.<id>` 保存 `status`（`outside_scope`／`unconfirmed`）、具体 `reason` 和 `evidence` 链接；两处不可同时登记同一 ID。

英文、日文的单位名、范围、说明在 `i18n/en.json`、`i18n/ja.json` 的 `sites[id].protection` 逐项翻译；来源标题在 `terms.protectionSources`。等级标签与日期标题在原生 `Localizable.xcstrings` 翻译。指定区分、日期和来源 URL 三语不变。

```bash
node scripts/prepare-protection.mjs
node ios/scripts/build-catalog.cjs
node scripts/prepare-protection.mjs --check
node --test tests/japanese-protection.test.cjs tests/protection.test.cjs tests/i18n.test.cjs tests/ios-catalog.test.cjs
```

生成器将日本资料嵌入 `protection-data.js` 的 `japan`，保留原有全局和 CommonJS 加载入口；`protection.js` 合并查询，目录导出到三语 `protection[]`。原生 `ProtectionEntry` 用可选 `system`／`designation` 区分制度，缺省仍按中国批次解码，兼容旧目录。身份资料不进入个人记录或备份。

图鉴大图卡片与详情顶部显示“日本国宝／日本重要文化财”；详情列出指定对象、所绘范围、日期及可打开的官方来源。搜索支持中文、日文与英文等级名称；日本条目不因等级命中“国保”或中国批次。

修改后运行全套 Node 测试与相关原生测试，在独立模拟器检查两种等级的卡片、详情来源和英日文辅助字号。无需重建、转码或同步图片。原生回归位于 `LocalizationTests` 与 `ExpansionUITests`。
