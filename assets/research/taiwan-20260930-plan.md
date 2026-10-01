# 台湾古建筑增量批次

- 批次名：taiwan-20260930
- 用户约定范围：补充台湾的古建筑；本批先覆盖臺南、鹿港、臺北三种不同主体。分支 `codex/taiwan-monuments`。
- started_at：2026-09-30T02:14:43+08:00
- 基线：`HEAD` 的设色队列 371 项、特殊接入 3 项；当前工作区另有江浙未提交批次，不在本分支复写。
- 候选来源：台湾文化部国家文化资产网与内政部宗教文化地图；台湾当地的「国定古蹟」不等同本项目的「全国重点文物保护单位」，不贴国保批次。
- 生图起始并发目标：8（线稿与设色合计，实际就绪数较少时按就绪数）。
- 本次交付范围：本地分支和待用户审图预览，不提交、不发布。

| id | 所绘主体/范围、年代依据 | 已查看照片及来源 | 结构检查点、材质色 | 阶段 | 生成次数 | 下一步/阻塞原因 |
| --- | --- | --- | --- | --- | --- | --- |
| tw_tainan_confucius | 臺南孔子廟大成殿；1665年创庙，1712年扩建，1917年解体修护；文化部文资网 | Chainwit 2026 正面 `assets/references/tw_tainan_confucius-rgb.jpg`，Zeze0729 侧面用于研究核对 | 双层橙红瓦歇山顶、前列朱红柱与台基；依现状燕尾脊饰 | delivery_ready | 3（1次输入验证失败、2张成品） | 线稿、设色和透明副本已接入；待用户审图 |
| tw_lukang_longshan | 鹿港龍山寺五門殿；1786年迁建、1831年重修，1960年代五门檐柱梁曾改，内政部宗教文化地图 | Fcuk1203 2013 正面 `assets/references/tw_lukang_longshan-photo.jpg` | 中央主屋脊与两侧较低脊组成五门；正面两根龙柱、五个开口，红瓦灰白脊与深褐旧木 | delivery_ready | 2 | 线稿、设色和透明副本已接入；待用户审图 |
| tw_taipei_northgate | 臺北府城北門（承恩門）；1884年竣工，文化部/台北市官方资料 | Bahnfrend 2023 西北斜视 `assets/references/tw_taipei_northgate-photo.jpg` | 厚重灰石城台、一个拱门洞、上部红墙单檐歇山、侧面两开口；按照片斜视，不补已拆瓮城 | delivery_ready | 2 | 线稿、设色和透明副本已接入；待用户审图 |

## 在途及结果记录

| id | 线稿/设色 | 工具返回的任务或调用标识 | started_at | completed_at | received_at | 原件路径 | 结果/失败原因/下次策略 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tw_tainan_confucius | 线稿初次调用 | imagegen HTTP 400 | 未提供 | 未提供 | 未提供 | 无 | 含 HDR 增益层的 JPEG 输入被拒绝；同一实拍转存标准 RGB 后重试 |
| tw_tainan_confucius | 线稿 | `exec-962654b6-17f1-475f-9131-5fbf189f81d0` | 未提供 | 未提供 | 未提供 | `assets/generated/tw_tainan_confucius.png` | 成功，原件哈希见逐图 JSON；实际输入仅风格样本与 RGB 正面照片 |
| tw_tainan_confucius | 设色 | `exec-0ea4c059-7db8-432f-beca-db4527bc77b9` | 未提供 | 未提供 | 未提供 | `assets/colored/tw_tainan_confucius.png` | 成功；去白底后待用户审图 |
| tw_lukang_longshan | 线稿 | `exec-bdcc5875-00cb-4edf-8a26-3e8d9d19858e` | 未提供 | 未提供 | 未提供 | `assets/generated/tw_lukang_longshan.png` | 成功 |
| tw_lukang_longshan | 设色 | `exec-60c7b2f3-19a2-4db3-acb8-7cedcbd7b784` | 未提供 | 未提供 | 未提供 | `assets/colored/tw_lukang_longshan.png` | 成功；去白底后待用户审图 |
| tw_taipei_northgate | 线稿 | `exec-5f6e94c6-13cf-4729-94ad-20d6bcbb2af1` | 未提供 | 未提供 | 未提供 | `assets/generated/tw_taipei_northgate.png` | 成功 |
| tw_taipei_northgate | 设色 | `exec-4eb000c5-2773-4c5e-afee-4ea341d54938` | 未提供 | 未提供 | 未提供 | `assets/colored/tw_taipei_northgate.png` | 成功；去白底后待用户审图 |

## 并发调整

| at | 原目标→新目标 | 错误信号/原因 | 冷却至 | 尚在途数量 | 恢复结果 |
| --- | --- | --- | --- | --- | --- |
| 本批 | 8→8 | 无限流或服务过载；仅3项就绪，峰值在途3 | 不适用 | 不适用 | 无需降档 |

## 最终交付

- finished_at：2026-09-30T03:12:13+08:00；墙钟耗时 57 分 30 秒（从计划落盘到最终验证，包含资料、生成、整理、测试和审图）。
- 生成调用总数 7：成功线稿 3、设色 3，输入验证失败 1；输入修复重试 1，视觉返工 0。工具没有提供可核对的单次起止时间，故服务耗时未知，不把墙钟时间算作服务耗时。
- 峰值在途 3；目标并发 8，实际就绪数只有 3；无限流、并发拒绝或服务过载，服务失败 0，无降档。输入验证错误单列。
- 阶段相互交叉：先完成选目、来源及结构检查，再并行生成线稿，线稿核验后启动各自设色，随后集中去底、清单接入、测试和浏览器检查。单项超过 5 分钟时继续其他就绪工作；无可核对的阶段起止时间，不虚构阶段耗时。
- 新增并交付候选：`tw_tainan_confucius`、`tw_lukang_longshan`、`tw_taipei_northgate`；3 项均为 `pending_user`，没有用户视觉批准。旧图版按哈希复用，未重画；无阻塞 ID。
- 已执行：`node scripts/prepare-plates.mjs`、`python3 -B scripts/prepare-colored-avif.py`、`node scripts/collect-colored-plates.mjs --require-complete`、`node scripts/prepare-protection.mjs` 及 `--check`、`node ios/scripts/build-catalog.cjs`、`sh ios/scripts/sync-artwork.sh assets`、`node --test tests/*.test.cjs`（145 通过）、`python3 -B tests/test_transparency.py`（15 通过）、`python3 -B -m unittest discover -s tests -p test_asset_bundle.py`（5 通过）、`git diff --check`。浏览器在隔离端口 8766 核对台湾筛选、三张详情线稿与设色请求、代表项窄屏及透明对照页。尚未由用户人眼验收图版。
- 原件、参考和交付图片留在隔离工作区的本地忽略目录；资源锁定清单比基线精确新增 21 个台湾素材，无缺失或旧项改写。`verify --profile full` 通过 3098 文件，本地资源包位于 `asset-dist/437ed9f637ff30dcfb08/`。未做异地备份、提交或发布。
