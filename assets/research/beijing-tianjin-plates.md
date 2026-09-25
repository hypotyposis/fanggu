# 北京、天津首批图版

本批新增北京六处、天津四处；全库由201处扩展为211处。机器可读名单见 [批次清单](beijing-tianjin-batch.json)。新条目默认未到访，不预设心愿、日期或笔记，已有记录按原ID保留。

## 图版与取景

| 古迹 | 所绘主体 | 线稿记录 | 设色记录 |
| --- | --- | --- | --- |
| 妙应寺白塔 | 现存塔身全貌 | [研究](bj_miaoying.json) | [设色](../color-research/bj_miaoying.json) |
| 真觉寺金刚宝座 | 宝座南面与正面可见塔群 | [研究](bj_zhenjue.json) | [设色](../color-research/bj_zhenjue.json) |
| 智化寺 | 如来殿与万佛阁南面 | [研究](bj_zhihua.json) | [设色](../color-research/bj_zhihua.json) |
| 卢沟桥 | 十一孔石拱桥浅侧面 | [研究](bj_lugou.json) | [设色](../color-research/bj_lugou.json) |
| 居庸关云台 | 现存过街塔基，不补台上已毁塔殿 | [研究](bj_juyong_yuntai.json) | [设色](../color-research/bj_juyong_yuntai.json) |
| 长陵祾恩殿 | 九开间重檐庑殿与石台 | [研究](bj_changling.json) | [设色](../color-research/bj_changling.json) |
| 蓟县白塔 | 楼阁下层与覆钵式塔身全貌 | [研究](tj_jizhou_baita.json) | [设色](../color-research/tj_jizhou_baita.json) |
| 天津文庙 | 府庙大成殿中部三间立面与丹陛局部 | [研究](tj_wenmiao.json) | [设色](../color-research/tj_wenmiao.json) |
| 广东会馆 | 戏台、鸡笼式藻井及短段二层看廊局部 | [研究](tj_guangdonghuiguan.json) | [设色](../color-research/tj_guangdonghuiguan.json) |
| 石家大院 | 内院门楼、抱鼓石与纵深门院 | [研究](tj_shijia.json) | [设色](../color-research/tj_shijia.json) |

天津文庙参考为中部近景，不能据此补造全殿屋脊及四角。石家大院外部门楼照片仅作研究背景，不混入内院门楼形制。真觉寺有五座塔，但正面取景后两塔被遮挡，不把五塔横排展开。卢沟桥逐孔核对十一拱；长陵误减为七开间的两稿保留为失败记录。

## 年代与地域

妙应寺采用1271—1279营建、金刚宝座1473、卢沟桥1192建成、云台1342—1345、广东会馆1907落成。智化寺官方初创表述有1443与1444两说，排序值为约略定位，不称作所有殿阁构件的制作年。

长陵享殿与陵园工程年代分别记为1416、1427，排序采用明前期约值，而非陵园1409初建。蓟县白塔按国保辽至清的历代修缮现貌登记；天津文庙1436为初创、石家大院1875为宅第大规模营建起点，不当作所绘单体精确竣工年。依据分别保存在逐图 `historical_sources` 与目录 `yearNote`。

北京沿用既有市级聚合点；天津市区以老城厢为聚合点，石家大院使用杨柳青镇聚合点，蓟州沿用已有地点。聚合点不宣称各门楼或殿堂精确坐标；新增地点来源见批次清单。

## 生成与审阅

使用内置 imagegen，每张线稿、设色均保留纯白底PNG原件和实际提示词，不需要API Key。线稿由脚本生成朝代色笔画alpha；设色只去外部连通白底与逐图登记的透空种子，实体浅色石墙和门窗暗部保留。记录绑定实际原件SHA-256，失败稿不覆盖最终原件。

逐图 `complete` 表示代理已查看原件、参考及透明副本，不等于用户视觉验收。新增十处透明AVIF默认为 `pending_user`，原有200张用户通过图版沿用原内容、哈希与验收记录。细密瓦纹、雕花概括和局部取景等限制保存在各图研究记录。

运行预览服务器后，可在 [线稿总览](../../proof.html?view=grid)、[设色总览](../../color-proof.html) 和 [来源页](../../sources.html) 按古迹名称检查；设色总览支持底色与原件对照。完整设色提示词随汇总器进入 [提示词清单](../color-research/prompts.json)，线稿提示词在上表逐图研究记录内。

生产资料位于 `assets/generated/<id>.png`、`assets/colored/<id>.png` 及 `assets/references/`，透明交付位于 `assets/plates/`、`assets/colored-transparent/`、`assets/colored-transparent-avif/`。这些图片被Git忽略，实际交付或新工作区必须另行补齐本地素材；JSON路径存在不代表图片已随代码发布。
