# 江浙国保增补记录（2026-09-30）

- 范围：浙江、江苏各 10 处；从原有 374 处扩至 394 处。选目兼顾藏书楼、会馆、塔、桥、园林、陵寝、石刻和近代馆舍，并优先选择能用实拍辨认的具体主体。
- 开始：2026-09-30 01:07:51 +08:00；完成：2026-09-30 01:56:42 +08:00；墙钟 48 分 51 秒。
- 生图：内置 imagegen 40 次（20 张线稿、20 张设色），起始并发目标和实际峰值均为 8；返工 0 次，未发生生图限流。先核线稿文件，再启动对应设色。
- 检索：Commons API 一度返回 HTTP 429，调整资料检索方式后取得全部实拍；无古迹因资料不足阻塞。
- 处理：20 对纯白 PNG 原件全部保存并写入 SHA-256；本地去底、转码和清单生成成功。原型模式未作 AI 视觉通过判定；用户于 2026-09-30 明确验收本批最终线稿/设色对照，20 张设色交付均由 `record-plate-review.mjs color` 绑定原件、透明 PNG 与 AVIF 哈希，显示为 `approved_user`。
- 既有浏览器记录与已通过图版保持原状；本批新条目均为 `unvisited`。

## 收录与所绘范围

| ID | 地区 | 国保正式单位（批次） | 本次图版主体 |
| --- | --- | --- | --- |
| `zj_tianyige` | 浙江 | 天一阁（第1批） | 宁波天一阁藏书楼正面 |
| `zj_qinganhui` | 浙江 | 庆安会馆（第5批） | 宁波庆安会馆前戏台与回廊内景 |
| `zj_yongan` | 浙江 | 安吉永安寺塔（第8批） | 安吉永安寺塔（灵芝塔）现存全塔 |
| `zj_daan` | 浙江 | 义乌大安寺塔（第8批） | 义乌大安寺塔现存六面五层塔身 |
| `zj_dashan` | 浙江 | 绍兴大善寺塔（第8批） | 绍兴大善寺塔现存六面七层塔身 |
| `zj_chaoyin` | 浙江 | 湖州潮音桥（第8批） | 湖州潮音桥现存三孔石拱桥 |
| `zj_yuyaotongji` | 浙江 | 余姚通济桥（第8批） | 余姚通济桥现存三孔石拱桥 |
| `zj_guyue` | 浙江 | 古月桥（第5批） | 义乌古月桥现存单孔石拱桥 |
| `zj_library_old` | 浙江 | 浙江图书馆旧址（第8批） | 浙江图书馆孤山馆舍红楼及前廊局部 |
| `zj_shinantang` | 浙江 | 石楠塘徐氏宗祠（第8批） | 金华石楠塘徐氏宗祠现存门楼与两侧白墙 |
| `js_mingxiao` | 江苏 | 明孝陵（第1批） | 南京明孝陵方城明楼正面与石城 |
| `js_zhongshan` | 江苏 | 中山陵（第1批） | 南京中山陵祭堂与前方主要石阶 |
| `js_nanjingwall` | 江苏 | 南京城墙（第3批） | 南京城墙中华门北立面中央城门及相连墙体 |
| `js_chaotiangong` | 江苏 | 朝天宫（第7批） | 南京朝天宫清代大成殿正面与石阶 |
| `js_liuyuan` | 江苏 | 留园（第1批） | 苏州留园冠云峰及后方亭阁局部 |
| `js_baodai` | 江苏 | 宝带桥（第5批） | 苏州宝带桥现存连续石拱桥 |
| `js_zhaoguan` | 江苏 | 昭关石塔（第6批） | 镇江西津渡昭关石塔及下部过街券门 |
| `js_geyuan` | 江苏 | 个园（第3批） | 扬州个园假山、亭阁与水边局部 |
| `js_heyuan` | 江苏 | 何园（第3批） | 扬州何园船厅正面与相连回廊局部 |
| `js_nanchao_stone` | 江苏 | 南朝陵墓石刻（第3批） | 南京萧景墓神道东辟邪石刻 |

国保批次、正式单位、局部范围与官方出处见 [国保源数据](national-protection.json)；每处实拍页面、作者、许可、真实提示词和生成记录见同目录的 `<ID>.json` 与 [`assets/color-research/`](../color-research/) 同 ID 记录。官方批次原件：[第一批](https://www.gov.cn/gongbao/shuju/1961/gwyb196104.pdf)、[第三批](https://www.gov.cn/gongbao/shuju/1988/gwyb198804.pdf)、[第五批](https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3096/site/attach/zfgb/200221.pdf)、[第六批](https://zwgk.mct.gov.cn/zfxxgkml/qt/202012/t20201206_918486.html)、[第七批](https://www.gov.cn/guoqing/2014-07/21/dqpqgzdwwbhdwmd.pdf)、[第八批](https://www.gov.cn/gbgl/75e17ff291dd418f8f758d508087cd8b/files/6250670fc770465787b85d705d4b12f9.pdf)。

## 已执行检查

- `node scripts/prepare-protection.mjs`、`node scripts/prepare-plates.mjs`、`python3 -B scripts/prepare-colored-avif.py`、`node scripts/collect-colored-plates.mjs --require-complete` 均完成；设色队列 391/391，连同 3 张原有确认稿共 394 张透明图。
- `node ios/scripts/build-catalog.cjs` 与 `bash ios/scripts/sync-artwork.sh /Users/fuxiangyu/Workspace/fanggu/assets` 完成；iOS 目录 394 处。
- `node --test tests/*.test.cjs`：144/144 通过；`python3 -B tests/test_transparency.py`：15/15 通过。验收后重新执行设色转码、汇总与测试。
- `python3 scripts/asset-bundle.py lock` 与 `verify --profile full`：3,205 个文件一致；`git diff --check` 通过。
- 本地真实浏览器：首页 394 处、浙江 28 处、江苏 26 处；天一阁详情页线稿及设色 AVIF 加载成功，第一批国保显示正确。

## 用户验收

用户于本批交付后的回复“验收通过”确认全部 20 处最终对照。逐图 `user_review` 与透明交付清单已标记 `approved_user` 并绑定图片哈希；线稿的单独提前审图状态保持原记录。若今后改动图片，应重新验收。
