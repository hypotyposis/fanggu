# 关西三地古建筑十二处增补

- 批次：kansai-twelve-20260925；沿用 `codex/japan-architecture-batch` 工作分支及其尚未提交的上一批修改。
- 开始：2026-09-25 22:40 CST；基线 330 处、设色队列 327 条。
- 范围：用户确认上一轮列出的 12 处，京都市 4、奈良市 4、大阪市 2、大阪府其他市 2；每处保持原名单约定的建筑主体。
- 状态：12 处本地图版已接入网页与 iOS，全部等待用户视觉验收；新增个人记录默认未到访，图版须保留 `pending_user`。

| ID | 主体与现存断代 | 官方依据 | 图版范围与检查点 | 阶段 |
| --- | --- | --- | --- | --- |
| `jp_daigoji_tower` | 醍醐寺五重塔，951 年 | [醍醐寺](https://www.daigoji.or.jp/about/history.html) | 独立五重木塔；分清各层檐、相轮，避开遮挡树木 | 本地待审 |
| `jp_sanjusangendo` | 莲华王院三十三间堂本堂，1266 年重建 | [京都市](https://ja.kyoto.travel/komafuda/show.php?id=2254&lang=en) | 长向柱列与通长屋面，不把堂内佛像混入外观 | 本地待审 |
| `jp_nijo_ninomaru` | 二条城二之丸御殿，1602—03 年建、1626 年前后大改修 | [京都市二条城](https://nijo-jocastle.city.kyoto.lg.jp/introduction/highlights/ninomaru/) | 以车寄及远侍外观为图版主体，不绘已失本丸旧御殿 | 本地待审 |
| `jp_yasaka_honden` | 八坂神社本殿，1654 年 | [八坂神社](https://www.yasaka-jinja.or.jp/about/architecture/) | 祇园造大屋顶、本殿与礼堂在同一屋顶下 | 本地待审 |
| `jp_yakushiji_east` | 药师寺东塔，据寺方记录 730 年 | [药师寺](https://yakushiji.or.jp/guide/garan_toto.html) | 三重塔与各层裳阶；不误画为六层 | 本地待审 |
| `jp_gangoji_gokuraku` | 元兴寺极乐坊本堂，约 1244 年重建 | [文化遗产数据库](https://online.bunka.go.jp/db/heritages/detail/186636) | 现存本堂，区别相邻禅室；留意旧僧房构件 | 本地待审 |
| `jp_kofukuji_hokuen` | 兴福寺北圆堂，约 1210 年重建 | [兴福寺](https://www.kohfukuji.com/property/a-0004/) | 八角一重圆堂、瓦屋顶；不混入五重塔 | 本地待审 |
| `jp_kasuga_honden` | 春日大社四座本殿，现存 1863 年 | [文化遗产数据库](https://online.bunka.go.jp/db/heritages/detail/147731) | 四座春日造本殿；不得把中门、御廊当作本殿 | 本地待审 |
| `jp_sumiyoshi_honden` | 住吉大社四座本殿，1810 年 | [住吉大社](https://www.sumiyoshitaisha.net/grounds/honden.html) | 四座住吉造本殿及其独特排列 | 本地待审 |
| `jp_osaka_sengan` | 大阪城千贯橹，1620 年 | [大阪城公园](https://www.osakacastlepark.jp/pdf/specially_opened_yagura.pdf) | 德川时代现存橹和石垣，不用 1931 年天守代替 | 本地待审 |
| `jp_jigenin_tahoto` | 慈眼院多宝塔，1271 年 | [文化遗产数据库](https://kunishitei.bunka.go.jp/heritage/detail/102/2173) | 下层方形、上层圆形塔身、桧皮屋顶 | 本地待审 |
| `jp_kanshinji_kondo` | 观心寺金堂，14 世纪中叶 | [文化遗产数据库](https://kunishitei.bunka.go.jp/heritage/detail/102/2185) | 七间方殿、三间向拜；不同于寺院初创传说 | 本地待审 |

## 结果与验证

- 完成：2026-09-25 23:28 CST。12 处均完成线稿与设色原稿，共 24 次 imagegen 调用，无返工、无服务失败；峰值并发 4，单次服务耗时没有可靠汇总。春日大社与住吉大社四座本殿为依据局部实拍和官方排列资料的组合示意，已在条目与来源页明确标注，非测绘图。
- 已逐图查看线稿、设色原稿及深色底上的透明交付；原型模式由用户集中视觉验收，12 处均保持 `pending_user`。页面详情的线稿 PNG 和设色 AVIF 均在 8876 端口逐项加载成功；检查了大阪府筛选、春日大社详情与窄屏观心寺详情。
- 数据与资产：目录 342 处，设色队列 339 条加 3 张特殊图版。同步 iOS 目录与 Artwork，通用 iOS 模拟器构建成功。本地素材包 `asset-dist/8092f302d6c15fc85ef1/`，2871 个文件通过 full 校验；资源包尚未复制到异地。
- 测试：`node --test tests/*.test.cjs`、`python3 -B tests/test_transparency.py`、`git diff --check`。代码与研究记录仍在 `codex/japan-architecture-batch` 未提交工作区，未合并或推送。
