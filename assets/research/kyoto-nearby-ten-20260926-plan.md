# 京都及周边古建筑十处增补

- 批次：`kyoto-nearby-ten-20260926`，沿用 `codex/japan-architecture-batch` 工作分支；本批开始时间未单独记录。
- 范围：用户确认上一轮建议的十处建筑，京都市六处、宇治和八幡各一处、滋贺大津两处。基线目录 342 处、设色队列 339 条。
- 候选依据：本批均为日本古建筑，不适用中国国保批次；所绘主体、年代和参考照片见逐图 JSON。新增个人记录默认为未到访。
- 生图：每处线稿和设色各一次内置 imagegen 调用，共 20 次；无返工、无服务失败。调用的起止时间、峰值在途量及单次服务耗时未可靠记录。白底原件与源图哈希保存在逐图记录中。
- 交付目标：本地网页与 iOS 资源，图版于 2026-09-26 01:07 CST 获用户明确验收，线稿原件及设色原件、透明 PNG、AVIF 均已按哈希记录。没有本批发布授权。

| ID | 所绘主体与年代依据 | 官方资料 | 图版范围与检查点 | 阶段 |
| --- | --- | --- | --- | --- |
| `jp_tofukuji_sanmon` | 东福寺现存三门，1425 年 | [东福寺](https://tofukuji.jp/guide/sanmon_gate/en/) | 双层五间三门，完整正立面 | 用户已验收 |
| `jp_fushimi_inari_honden` | 伏见稻荷大社本殿，1499 年再建 | [伏见稻荷大社](https://inari.jp/sp/map/spot_03/) | 稻荷造本殿，避免画成千本鸟居 | 用户已验收 |
| `jp_kitano_honden` | 北野天满宫本殿、石之间与拜殿，1607 年 | [北野天满宫](https://kitanotenmangu.or.jp/guidance/gohonden/) | 权现造社殿，保留一体化屋顶 | 用户已验收 |
| `jp_ninnaji_kondo` | 仁和寺金堂，1613 年原构、江户初期移建 | [文化遗产数据库](https://online.bunka.go.jp/db/heritages/detail/175092) | 旧紫宸殿移建的金堂，年代采用原构 | 用户已验收 |
| `jp_hongwanji_hiunkaku` | 西本愿寺飞云阁，桃山时期，确切建造年未详 | [文化遗产数据库](https://online.bunka.go.jp/db/heritages/detail/122624) | 错层三层楼阁；年表 1600 仅约略定位 | 用户已验收 |
| `jp_manpukuji_daiou` | 万福寺大雄宝殿，1668 年 | [万福寺](https://www.obakusan.or.jp/see/) | 黄檗宗佛殿与宽阔正面 | 用户已验收 |
| `jp_iwashimizu_honden` | 石清水八幡宫本社，现存社殿群 1634 年 | [石清水八幡宫](https://iwashimizu.or.jp/about/) | 仅绘照片可见的楼门与回廊正面局部，已在条目中标明 | 用户已验收 |
| `jp_ishiyamadera_tahoto` | 石山寺多宝塔，1194 年 | [石山寺](https://www.ishiyamadera.or.jp/guide/precincts) | 下层方形、上层圆形塔身及屋面 | 用户已验收 |
| `jp_ishiyamadera_hondo` | 石山寺本堂，1096 年正堂、1602 年礼堂 | [石山寺](https://www.ishiyamadera.or.jp/guide/precincts) | 图版包含两个时期构件；年表采用正堂年代 | 用户已验收 |
| `jp_chionin_sanmon` | 知恩院现存三门，1621 年 | [知恩院](https://www.chion-in.or.jp/highlight/building/sanmon.php) | 双层三门及完整大屋顶 | 用户已验收 |

## 结果与验证

- 完成记录：2026-09-26 01:02 CST；因起始时间未记录，墙钟耗时未知。
- 逐图实拍取自 Wikimedia Commons，作者、许可及本地参考文件路径记录在各线稿/设色 JSON；已查看参考、原稿及透明交付的拼图。图版属于基于实拍的示意，非实测图。石清水八幡宫明确只画正面局部。
- 目录增至 352 处，设色队列增至 349 条，另有 3 张既有特殊图版。设色转码复用旧图 342 张，新增 10 张；两平台目录和本地 iOS 图版已同步。原件及参考照片为被 Git 忽略的本地素材，资产锁记录哈希；本地资源包为 `asset-dist/5595b02a58f5f262875e/`（五卷 TAR），尚未异地备份或发布。
- 技术检查：`node --test tests/*.test.cjs`（139 项）、`python3 -B tests/test_transparency.py`（14 项）、`python3 scripts/asset-bundle.py verify --profile full`（2935 文件）、`git diff --check` 均通过；资源包 runtime 卷在临时目录恢复并核对了 704 文件，通用 iOS 模拟器构建通过。8876 服务上的详情、审图、图版来源和日本近畿滋贺县筛选已检查，新图加载成功。十处图版均已由用户确认“验收没问题”，验收状态与当前文件哈希绑定。
- 本批与此前日本批次的改动共同保留在工作分支的未提交工作区；未合并或推送。
