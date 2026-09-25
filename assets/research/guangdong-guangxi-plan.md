# 两广增量计划

- started_at：2026-09-17T12:28:15Z（规范读取前开工时间未精确记录）
- 范围：广东、广西各四处；main 分支，本地交付，不提交或发布。
- 基线：SITES 241；完整既有 ID / 交付哈希在批次 JSON 中记录。
- 模式：prototype；目标并发 8（线稿 + 设色合计），不增加代理。
- 候选：陈家祠、佛山祖庙、梅庵、瑞石楼；真武阁、程阳永济桥、大士阁、恭城文庙。候选尚可在资料就绪前调整，阻塞如实保留。
- 官方国保名单：复用已核对的第一至第八批登记来源；主体范围逐项核对，不为贴标拖延图版。

| id | 所绘主体 | 已查看实拍及结构检查点 | 阶段 | 调用数 |
| --- | --- | --- | --- | --- |
| gd_chen | 陈家祠中央头门立面 | https://commons.wikimedia.org/wiki/File:Chen_Clan_Ancestral_Hall_2025.06_01.jpg；中央头门及左右相接屋面的可见立面；硬山坡屋面、人物陶塑花脊、石柱石梁，中央门洞，不复原庭院后殿。 | pending_user | 2 |
| gx_zhenwu | 经略台真武阁完整阁体 | https://commons.wikimedia.org/wiki/File:%E5%AE%B9%E5%8E%BF%E7%9C%9F%E6%AD%A6%E9%98%81.jpg；三重檐与两层阁身、翘角、下层开放木柱，基台完整；不画周边仿古建筑。 | pending_user | 2 |
| gx_dashi | 合浦永安大士阁前阁及相连后阁 | https://commons.wikimedia.org/wiki/File:Dashi_Pavilion.jpg；前低后高相连阁体，下层开敞木柱，灰瓦、蓝绿彩绘檐口，不把左右香炉亭并入。 | pending_user | 2 |

| gd_zumiao | 佛山祖庙三门立面 | https://commons.wikimedia.org/wiki/File:佛山祖庙.JPG；三座券门、长陶塑花脊和两端上层屋面；不画池岸栏杆、香炉和前方石狮。 | pending_user | 2 |
| gd_ruishi | 开平锦江里瑞石楼完整楼体 | https://commons.wikimedia.org/wiki/File:Jinjiangli_Ruishi_Lou_SF0007.jpg；九层碉楼体量，五层主体与上部柱廊、角亭、中央瞭望亭分开；保留照片轻微仰视，不变成中国 pagoda。 | pending_user | 2 |
| gx_chengyang | 程阳永济桥全桥与五座楼亭 | https://commons.wikimedia.org/wiki/File:程阳永济桥1.jpg；五座楼亭、连续木廊与船形石墩，全桥而非端部局部；中央攒尖顶与两端歇山顶区分。 | pending_user | 2 |

| gd_meian | 梅庵大雄宝殿完整殿体 | https://commons.wikimedia.org/wiki/File:肇庆梅庵大殿.JPG 和广东省文物局梅庵介绍配图；现状硬山顶、五开间宋代木构，不复原初建屋顶。 | pending_user | 2 |
| gx_gongcheng | 恭城文庙大成殿 | https://commons.wikimedia.org/wiki/File:Gongcheng_Wenmiao_2012.09.29_16-20-19.jpg；三开间重檐歇山殿，去除前方香炉亭，不画庑房。 | pending_user | 2 |

八处参考已查看。完成结果立即落盘；用户未审均 pending_user，无 AI 图版质量淘汰。Commons 图片查询曾返回 429，暂停查询后恢复；该信号不是生图限流。梅庵以两个互补实拍覆盖现状，不缩小主体；恭城首张下载为国保碑，未用作生图输入，按页面的大成殿图注领取准确照片。

## 本批交付

- 八处已接入，广东／广西各四处；目录 241 → 249，图版队列 238 → 246。
- 线稿 8 次、设色 8 次；生图失败 0、质量返工 0。工具在途峰值 4（目标 8，非 GPU 并发）。
- 从明确记录的起点至本批记录完成约 31 分钟；更早规范读取未计入，各阶段存在交叉。
- 旧设色 241 张缓存复用，原件、透明交付与用户验收哈希保持；新八处 pending_user。
- [集中人审页](guangdong-guangxi-review.html)；[真实时间与执行记录](guangdong-guangxi-batch.json)。
- 已运行线稿生成器、设色转码器、汇总器、国保生成器，82 项测试和差异空白检查通过。真实浏览器检查 16 张对照图加载、主题切换、两省各四处筛选、恭城详情及返回筛选、瑞石楼放大对照；没有修改个人记录。
- 未做 AI 图版视觉淘汰和严格质量门禁；只等用户审过。未提交、未发布。
