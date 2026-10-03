# 东京古建增补计划

- 用户范围：补充东京古建；本批选8处，含东村山市。
- 分支：main，保留开工时已有图标、京都线稿修复等未提交修改。
- started_at：2026-10-03T22:27:52.252938+09:00
- 基线：468个目录条目，465个队列条目及3个特殊接入；ID集合保存在本批交付记录。
- 原型模式：纯白底原件→本地透明处理；待用户集中人审。
- 生图起始并发目标：8（线稿与设色合计），不启用代理。
- 交付范围：本地目录、iOS资源与审图；不提交、发布或修改个人记录。
- 候选依据：日本寺社官方与文化遗产数据库；不添加中国国保标签。

| id | 主体 | 年代 | 阶段 |
| --- | --- | --- | --- |
| jp_ueno_toshogu_karamon | 上野东照宫唐门 · 唐门单体 | 1651年建立 | 已接入，线稿/设色均 pending_user |
| jp_nezu_romon | 根津神社楼门 · 三间一户楼门 | 1706年建立 | 已接入，线稿/设色均 pending_user |
| jp_asakusa_jinja | 浅草神社 · 拜殿正面 | 1649年建立 | 已接入，线稿/设色均 pending_user |
| jp_zojoji_sangedatsumon | 增上寺三解脱门 · 五间三户二重门 | 1622年建立 | 已接入，线稿/设色均 pending_user |
| jp_kaneiji_kiyomizu | 宽永寺清水观音堂 · 观音堂与前方舞台 | 1631年建立 · 1694年移建 | 已接入，线稿/设色均 pending_user |
| jp_gokokuji_hondo | 护国寺本堂 · 本堂 · 观音堂 | 1697年建立 | 已接入，线稿/设色均 pending_user |
| jp_ikegami_pagoda | 池上本门寺五重塔 · 现存五重木塔 | 1608年建立 | 已接入，线稿/设色均 pending_user |
| jp_shofukuji_jizodo | 正福寺地藏堂 · 单层裳阶禅宗佛殿 | 1407年建立 | 已接入，线稿/设色均 pending_user |

## 在途及结果记录

真实调用、时间、原件路径与提示词见各项JSON及本批生成日志。

## 资料就绪与结构检查点

- `jp_ueno_toshogu_karamon`：唐门单体，1651年建立。[年代依据](https://online.bunka.go.jp/heritages/detail/121344)；已查看 [File:Toshogu Shrine @ Ueno (10065271306).jpg](https://commons.wikimedia.org/wiki/File:Toshogu_Shrine_@_Ueno_(10065271306).jpg)。结构：Ueno Toshogu Karamon in Tokyo, built 1651. Draw the SINGLE central one-bay karamon only, its undulating karahafu curved gable, paired doors, four supporting posts and selective dragon and bird carvings. Omit the shrine hall behind, lateral walls, lanterns and fences. Use the slightly angled view in the photograph, retaining the whole gate roof and its base.。材质：gold leaf on the curved gable, doors and posts; charcoal dark copper roof, small red, green and blue carved details; neutral stone base。资料阶段 ready，现已完成生成与接入。
- `jp_nezu_romon`：三间一户楼门，1706年建立。[年代依据](https://online.bunka.go.jp/heritages/detail/144228/1)；已查看 [File:Nezu-jinja Romon 3.jpg](https://commons.wikimedia.org/wiki/File:Nezu-jinja_Romon_3.jpg)。结构：Nezu Shrine Romon in Tokyo, built 1706. FRONT VIEW of the full two-storey gate with ONLY ONE main tiled roof, NO lower tier roof. Three bays across ground floor: central open passage and two enclosed guardian niches; upper balcony railing and painted brackets. Match the photo exactly.。材质：vermilion red posts and balcony, charcoal gray tiles, green niche palings, muted gold, green, blue and cream bracket ornament; dark recessed guardian niches。资料阶段 ready，现已完成生成与接入。
- `jp_asakusa_jinja`：拜殿正面，1649年建立。[年代依据](https://asakusajinja.jp/asakusajinja/about/)；已查看 [File:Asakusa shrine 2012.JPG](https://commons.wikimedia.org/wiki/File:Asakusa_shrine_2012.JPG)。结构：Asakusa Jinja Haiden in Tokyo, built 1649. Draw ONLY the low broad central worship hall in the photo, NOT the taller modern building on the right or small shrine on the left. Straight front view, a single tiled gabled roof, five facade bays, three central door bays flanked by lattice windows, six front posts, restrained decorative frieze and shallow stone steps. Omit lions, noticeboards, people and movable offering boxes.。材质：red lacquered posts and beams, dark gray roof tiles, gold painted frieze and beam ends with small blue-green carvings; dark wooden lattice doors and windows; gray stone steps。资料阶段 ready，现已完成生成与接入。
- `jp_zojoji_sangedatsumon`：五间三户二重门，1622年建立。[年代依据](https://www.zojoji.or.jp/en/index.html)；已查看 [File:Zojo-ji Sangedatsu-mon 1.jpg](https://commons.wikimedia.org/wiki/File:Zojo-ji_Sangedatsu-mon_1.jpg)。结构：Zojoji Sangedatsumon in Tokyo, built 1622. Complete front facade: TWO roof tiers, two-storey broad red timber gate, FIVE structural bays across, THREE open central ground passages with closed end bays, continuous upper balcony, gray tiled hipped-and-gabled main roof. Complete both eave tips even though photo is close framed. Remove temporary white event curtain and banners, signs, cars, visitors, side gates and Tokyo Tower.。材质：deep weathered vermilion timber posts, beams, walls and balcony; dark gray tile roofs; small muted gold metal fittings, gray stone base。资料阶段 ready，现已完成生成与接入。
- `jp_kaneiji_kiyomizu`：观音堂与前方舞台，1631年建立 · 1694年移建。[年代依据](https://kiyomizu.kaneiji.jp/about)；已查看 [File:Kiyomizu Kannondo 06.jpg](https://commons.wikimedia.org/wiki/File:Kiyomizu_Kannondo_06.jpg)。结构：Kaneiji Kiyomizu Kannondo in Ueno Tokyo, built 1631 and relocated 1694. Draw the complete front hall AND its elevated projecting wooden stage with support posts below. Broad SINGLE gray tiled hipped-and-gabled roof, red five-bay facade, red balcony railing. Remove all trees including the circular pine in front, rock slope, modern bars, visitors and signage. Keep the stage low as photographed, never substitute the much taller Kyoto Kiyomizudera structure.。材质：vermilion red hall and upper stage railing, charcoal gray roof tiles, small gold fittings, weathered gray-brown structural supports beneath the stage。资料阶段 ready，现已完成生成与接入。
- `jp_gokokuji_hondo`：本堂 · 观音堂，1697年建立。[年代依据](https://www.gokokuji.or.jp/english/about)；已查看 [File:Gokokuji - hondo.jpg](https://commons.wikimedia.org/wiki/File:Gokokuji_-_hondo.jpg)。结构：Gokokuji Hondo (Kannon-do), Tokyo, built 1697. Complete front view of broad seven-bay main hall, ONE massive hipped-and-gabled ribbed COPPER roof, three-bay central worship porch below the continuous eaves, timber veranda, pale window panels and broad central steps. No pagoda, side halls, trees, visitors, lanterns or signs. Preserve the distinctive very tall sweeping roof and understated timber structure.。材质：blue-green verdigris copper sheet roof with vertical ribs, dark weathered brown wood posts and beams, pale cream-white window paper panels, gray stone stair, a small pale hanging lantern。资料阶段 ready，现已完成生成与接入。
- `jp_ikegami_pagoda`：现存五重木塔，1608年建立。[年代依据](https://honmonji.jp/outline/reiho.html)；已查看 [File:Five-storied Pagoda, Ikegami Honmonji 01.jpg](https://commons.wikimedia.org/wiki/File:Five-storied_Pagoda,_Ikegami_Honmonji_01.jpg)。结构：Ikegami Honmonji five-storey pagoda, Tokyo, built 1608. Draw the entire freestanding square wooden pagoda, exactly FIVE distinct roof tiers and five wooden storeys, tapering upward, balcony rails, central tall bronze sorin finial. Near-front three-quarter view as photo; keep complete tip and base. Remove cemetery, monuments, trees, poles and outer security fence.。材质：deep aged red-brown timber posts, doors and balconies, charcoal gray tiles with slightly paler tile edges, dark green bronze finial and small green painted details, neutral gray stone plinth。资料阶段 ready，现已完成生成与接入。
- `jp_shofukuji_jizodo`：单层裳阶禅宗佛殿，1407年建立。[年代依据](https://online.bunka.go.jp/heritages/detail/173812)；已查看 [File:Shohukuji2.JPG](https://commons.wikimedia.org/wiki/File:Shohukuji2.JPG)。结构：Shofukuji Jizodo in Higashimurayama Tokyo, built 1407. Front view of compact square Zen hall, a SINGLE storey with lower surrounding mokoshi pent roof, not a two-storey pagoda. Core three-by-three bays; high sweeping wood-shingle hipped-and-gabled main roof with sharply lifted corners, thin lower copper-covered mokoshi roof, wooden doors and flanking cusped windows. Keep both roof outlines and the full base. Remove stone lanterns, trees, people and modern fence.。材质：weathered dark brown timber, gray-brown wood-shingle upper roof, subdued brown-green copper lower mokoshi roof, dark wooden doors, off-white window infills, neutral stone base。资料阶段 ready，现已完成生成与接入。

- 资料局限：增上寺参照修缮前照片；上野唐门实拍含部分遮挡；不作测绘或当前开放状态承诺。全部图稿留待用户验收。

## 生成阶段结果

- 生成时间窗：2026-10-03T13:31:40.243Z 至 2026-10-03T13:37:38.741Z（收到结果时间；工具未提供服务完成时间）。
- 实际调用16次：8张线稿、8张设色；返工0次、服务失败0次。
- 实际峰值在途8；未收到限流/并发拒绝/过载信号，未降档；尾部随就绪项减少自然收束。
- 路径领取时首次尝试从仍在运行的函数会话读缓存得到 undefined；依据工具已返回的精确原件路径立即领取，未重新生成。全部完成后回填真实提交与领取时间。
- [生成日志](tokyo-20261003-generation-log.json)保存每次调用标识、时间、路径及哈希；每项JSON保留实际输入和完整提示词。
- 所有原件已查看，不作AI视觉通过/淘汰；全部 `pending_user`。

## 接入与检查

- 新增8个独立ID，全部 `initialStatus: unvisited`；目录468→476，东京1→9；设色队列465→473，另有原有3个特殊接入。
- `sites.js` 增加日本关东/东京都地点与中、日、英文别名；海外文保状态为 `not_applicable`，不贴中国国保标签。
- 按依赖顺序完成 `prepare-plates.mjs` → `prepare-colored-avif.py` → `collect-colored-plates.mjs --require-complete` → `build-catalog.cjs` → `sync-artwork.sh assets`，均退出成功。后补海外文保来源记录并重建 `protection-data.js` 与 iOS 目录。
- 新增16份白底PNG原件均完整保留，逐图JSON绑定原件SHA-256；线稿与设色交付均具有真实透明像素和不透明主体。设色生成器复用原有468张，只处理本批8张；旧图原件、透明PNG、AVIF哈希与验收状态对比均未变。
- 浏览器实际打开8处线稿/设色对照，16张图片均加载；检查深/浅背景、最后一处的原设色/透明设色单图对照。保持全部待用户审阅，未记录通过。
- `node --test tests/*.test.cjs`：122/122通过。随后使本批来源测试兼容今后的显式人审记录，再单独运行本批2项测试通过。
- `python3 scripts/asset-bundle.py lock` 及 `verify --profile full`：3785个文件验证通过；本地资源锁已更新，本次未制作或上传离机备份。
- 工作区同时存在其他任务的线稿开洞修复、图标和审计改动，保留原样；共享生成清单按当时源记录正常重建，不将其他任务改动列为本批产出。
- 本地证据保存在 `../../tmp/tokyo-20261003/`（被Git忽略），包括命令日志、测试结果与浏览器截图。原生验证与最终墙钟时间见本批交付记录。

## 最终交付

- finished_at：2026-10-03T22:48:01.079601+09:00；从本批计划落盘开始，墙钟耗时1208.8秒（约20.1分钟）。资料准备、生图、领取与接入存在交叉，不把工具时长相加为总耗时。
- 16次实际生图、0次重画、0次服务失败；峰值在途8，有效并发目标维持8。服务计算耗时未知。生成提交/领取窗口见上方记录；设色转码日志终写时间为2026-10-03T13:39:48.445542Z。
- 原生构建完成；首次UI测试在安装/启动阶段停滞，重启本次专用模拟器。恢复安装与一次重试重叠，导致该次App被终止；最终干净重跑于2026-10-03T22:47:06.956+09:00通过，1项测试、0失败。验证时间主要增加在模拟器恢复，不归为生图耗时。
- 原生实测：日本→东京都筛选、`Nezu`别名搜索、根津神社详情线稿加载、返回保留搜索与结果。已查看两张XCTest截图，结果位于 `../../tmp/tokyo-20261003/TokyoReviewFinal.xcresult`。
- `git diff --check`通过。本批8处全部完成本地接入，无资料或编码阻塞；全部16张图稿仍待用户验收，尚无通过记录。
- 未验证：真机、原生设色拖动全过程、严格模式全量像素回归；本批未改共享交互与个人存储代码，未重跑完整手势/存储测试。
- 素材已在本地保存并更新资源锁，未制作离机备份、未发布、未提交代码、未修改个人记录。
