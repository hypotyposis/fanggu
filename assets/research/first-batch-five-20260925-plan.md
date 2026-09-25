# 第一批国保五处补录

- 批次：first-batch-five-20260925
- 用户范围：孝堂山郭氏墓石祠、清净寺、安平桥、房山云居寺塔及石经、大昭寺；网页与 iOS 共用数据。
- 分支：`codex/first-batch-five`，基线为 `main` 的 308 条队列。
- 名录来源：[国务院第一批全国重点文物保护单位名单](https://www.gov.cn/gongbao/shuju/1961/gwyb196104.pdf)。逐项范围和年代证据见 `assets/research/national-protection.json` 与同名逐图 JSON。
- 制图：内置 imagegen 生成纯白原件，本地透明处理；用户已明确通过本批五处的线稿与设色图，逐图 `user_review` 绑定实际文件哈希。

| ID | 所绘范围与年代 | 实拍／资料 | 结构、材质 | 阶段 |
| --- | --- | --- | --- | --- |
| `sd_xiaotang_shrine` | 东汉石祠本体，约一世纪；不含罩屋 | 故宫博物院院刊图版，杨爱国提供 | 小石室、石板悬山顶、青灰石 | 用户验收通过 |
| `fj_qingjing_gate` | 现存石门楼；1009始建、1310重修 | Wikimedia Commons，Zhangzhugang | 两进尖拱、青灰与米色石墙 | 用户验收通过 |
| `fj_anping_bridge` | 石板桥面与桥墩代表性局部；1138始建、1152建成 | Wikimedia Commons，Zhangzhugang、董辰兴 | 平梁石桥、栏杆、花岗石 | 用户验收通过 |
| `bj_yunju_north` | 辽代北塔，后世修葺 | Wikimedia Commons，Siyuwj | 楼阁、鼓形中段、钟形上部，灰褐砖石 | 用户验收通过 |
| `xz_jokhang` | 多期现状正立面；寺院647始建 | Wikimedia Commons，Rene Heise | 金顶、深红墙、暗木；非吐蕃复原图 | 用户验收通过 |

最初检索到的孝堂山罩屋和标牌照片被剔除；本批只保留真正用于制图的本体参考。图片为现状意写，不作为测绘图。完整生成提示词、原件哈希及来源署名记录在逐图 JSON；参考照片和原件仅在本地资源包，不随 Git 提交。

本批生成线稿和设色白底原件各五张，均已通过本地透明处理并输出 PNG／AVIF。网页和 iOS 目录均导出 316 处古迹；浏览器已核对五处详情和图版地址，iOS 模拟器目标编译通过。自动测试 130 项、透明处理测试 14 项均通过。完整资源包 `assetSet` 为 `f58db3ee2fcc3aa99086`，位于本机 `asset-dist/f58db3ee2fcc3aa99086`；`verify --profile full` 核对 2711 个文件。用户随后明确验收通过，线稿原件及设色原件／透明 PNG／AVIF 的当前哈希写入逐图记录；清单已重建为 `approved_user`。
