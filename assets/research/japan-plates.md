# 日本古寺图版

表中图版与原稿链接用于已补齐素材的本地工作区，图片不随 Git 交付；JSON 考据记录保留在仓库。素材准备见 [图版目录](../README.md)。

首批六处均加入心愿单，采用内置 `image_gen`，以真实建筑照片约束形制、以卢舍那大佛线稿为统一风格母版。黑线白底原稿经过项目标准流程转换为带时代色的透明 PNG。

| 古迹与绘制主体 | 时代与颜色 | 最终网页图版 | 原稿 | 参考、来源与完整提示词 |
| --- | --- | --- | --- | --- |
| 法隆寺 · 金堂正面 | 飞鸟 · 淡赭 | [horyuji.png](../plates/horyuji.png) | [黑线白底](../generated/horyuji.png) | [绘图记录](horyuji.json) |
| 唐招提寺 · 金堂正面 | 奈良 · 灰绿 | [toshodaiji.png](../plates/toshodaiji.png) | [黑线白底](../generated/toshodaiji.png) | [绘图记录](toshodaiji.json) |
| 平等院 · 凤凰堂正面与两翼 | 平安 · 藤紫 | [byodoin.png](../plates/byodoin.png) | [黑线白底](../generated/byodoin.png) | [绘图记录](byodoin.json) |
| 东大寺 · 南大门正面 | 镰仓 · 青碧 | [todaiji.png](../plates/todaiji.png) | [黑线白底](../generated/todaiji.png) | [绘图记录](todaiji.json) |
| 清水寺 · 本堂与清水舞台 | 江户 · 茶红 | [kiyomizu.png](../plates/kiyomizu.png) | [黑线白底](../generated/kiyomizu.png) | [绘图记录](kiyomizu.json) |
| 东寺 · 五重塔 | 江户 · 茶红 | [toji.png](../plates/toji.png) | [黑线白底](../generated/toji.png) | [绘图记录](toji.json) |

各绘图记录的 `prompt` 以及存在时的生成历史字段保存了实际使用的完整提示词、输入参考路径和各轮修改。时代分界与地图点位归并说明见 [日本时代资料](japan-periods.json)。

图鉴与年表按绘制主体的现存年代归类。法隆寺金堂、唐招提寺金堂标记为世纪范围；年表坐标使用近似排序点。
