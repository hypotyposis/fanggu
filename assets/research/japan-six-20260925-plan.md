# 日本古建筑六处增补

- 批次：japan-six-20260925；分支 `codex/japan-architecture-batch`
- 开始：2026-09-25 21:47 CST；基线 324 处、设色队列 321 条
- 范围：用户点名金阁寺、银阁寺、浅草寺，再补姬路城、严岛神社、日光东照宫。现有清水寺、东寺等六处日本条目不重复添加。
- 图版：内置 imagegen 白底原件，线稿与设色各一张；全部等待用户验收，不预设到访。

| ID | 所绘主体与年代 | 年代依据 | 实拍与形制检查点 |
| --- | --- | --- | --- |
| `jp_kinkaku` | 鹿苑寺舍利殿，1955 年复建，昭和 | [相国寺年表](https://www.shokoku-ji.jp/reference/history/) | Commons 金阁现状；三层与顶上凤凰，二、三层金箔 |
| `jp_ginkaku` | 慈照寺观音殿，1489 年上梁、竣工年份不详，室町 | [银阁寺沿革](https://www.shokoku-ji.jp/ginkakuji/about/) | Commons 银阁现状；两层、下层素墙与上层深木色，不画银箔 |
| `jp_sensoji` | 浅草寺本堂，1958 年重建，昭和 | [浅草寺本堂说明](https://www.senso-ji.jp/guide/guide04.html) | Commons 本堂正面；巨大入母屋屋顶、柱廊，去游客与摊铺 |
| `jp_himeji` | 姬路城大天守，1609 年建成，江户 | [姬路城官方历史](https://www.city.himeji.lg.jp/castle/0000007750.html) | Commons 大天守；五重屋顶、白灰墙及高石垣 |
| `jp_itsukushima` | 严岛神社本社临海社殿群，主要现存建筑在 1241 年重建，镰仓 | [UNESCO 提名评估](https://whc.unesco.org/archive/advisory_body_evaluation/776.pdf) | Commons 海侧现状；朱红回廊、架空柱脚与水面，非仅画大鸟居 |
| `jp_nikko_toshogu` | 日光东照宫阳明门，1636 年大造替，江户 | [日光市官方导览](https://www.nikko-kankou.org/public/spot/125) | Commons 阳明门正面；双层门、白柱与繁密雕饰 |

## 交付与限制

图版依据有署名的公开实拍作艺术意写，不作为测绘图。金阁、浅草寺现存主体为二十世纪复建，时代按所绘主体登记，另记寺院较早沿革。严岛神社本社群包含多期修理，1241 年仅是主要现存建筑的重建节点。图片与参考照片保存在本地资源包，不随 Git 上传；代码只登记元数据及哈希。六组线稿和设色的原件、来源、提示词、哈希和 `pending_user` 验收状态见逐图 JSON。

## 本批核验

- 网页与 iOS 目录均为 330 处，设色队列为 327 条（另有 3 条既有独立图版）。六处均默认未到访，不预填日期。
- 本地资源锁含 2798 个文件，资源集 `f16db047cdf401153823`；`full` 校验通过，分成 1 卷运行资源与 4 卷源素材，目录为 `asset-dist/f16db047cdf401153823/`。
- `node --test tests/*.test.cjs`：134 项通过；`python3 -B tests/test_transparency.py`：14 项通过；`node scripts/prepare-protection.mjs --check`、`git diff --check` 通过。
- `xcodegen generate` 后，iOS Simulator 无签名构建成功。8876 网页实测：金阁与银阁详情可打开，六处设色对照页的原件与透明图全部成功加载。
- 视觉审图仅做了技术目检，图版依然等待用户验收；资源包目前只在本机，尚无异地备份。
