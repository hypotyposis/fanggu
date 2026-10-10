# 本批新增计划

- 批次名：dongbei-20261005
- 用户约定范围及分支：辽宁、吉林、黑龙江新增古迹，目标 10 处（至少 8 处 ready）；分支 `claude/unlimited-token-budget-suggestions-4576ae`（worktree）。本批为“资料就绪”批：核实选目、授权照片、结构检查点、考据、条目草稿与提示词；**本会话没有 imagegen，不生图**，生图由之后有 imagegen 的会话执行。
- started_at：2026-10-05T03:25:00+09:00（上一轮代理下载首批 ln_/jl_/hlj_ 照片）；本续做会话自 2026-10-05T22:10:00+09:00 起，完成于 2026-10-05T23:05:00+09:00
- 基线来源：当前 SITES 476 个 ID（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/ref/ids.txt`），东北三省既有 10 个：`jl_jiangjunfen`、`hlj_shideng`、`jl_nongan`、`fengguo`、`huanghuatan`、`ln_liaoyang`、`ln_chongxing`、`ln_dazheng`、`jl_wenmiao`、`hlj_sofia`；`assets/color-research/queue.json` 与 `avif-manifest.json` 未改。候选方向中的崇兴寺双塔、吉林文庙已收录，排除；本批 11 个新 ID 均不与既有 ID、别名重复。
- 候选来源：维基百科辽宁／吉林／黑龙江《全国重点文物保护单位列表》发现候选，再对照本地缓存的国务院公报原件（第一批 1961 年第 4 号、第二批 1982 年第 7 号、第三批 1988 年第 4 号、第四批 1996 年第 36 号、第五批浙江政报 2002 年第 21 期转载、第六批文旅部转载、第七批中国政府网 PDF、第八批林草局转载；SHA-256 与 `national-protection.json` 的 sources 一致）核实。公报 PDF 无文字层，本会话用 Vision OCR 定位页码后回看渲染页核对分类、序号与地址。每项正式单位名、批次、所绘主体对应关系与公报页码见各 JSON `protection`：10 处 confirmed（独立单位 2：朝阳北塔、灵光塔；组成部分 8：万佛堂石窟（第六窟）、兴城城墙、广济寺古建筑群、清昭陵、洞沟古墓群（备注含好太王碑）、丸都山故城、哈尔滨文庙、金上京会宁府遗址），1 处 unconfirmed（沈阳北塔为 2003 年辽宁省保，第一至八批名单未见）。未进入本批：析木金塔（第七批国保“金塔”，Commons 无照片）、卜奎东寺（维持上一轮阻塞）。
- 生图起始并发目标：8（线稿与设色合计）；本会话无 imagegen，未启动任何生成。
- 本次交付范围：本地（`assets/research/candidates/dongbei-20261005/*.json` 11 个、`assets/references/ln_*|jl_*|hlj_*` 照片（沿用上一轮下载并经 Commons SHA1 反查确认来源）、本计划、`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/expansion/dongbei-20261005-intake.json`）。未改 `sites.js`、`catalog.js`、`national-protection.json`、`queue.json`、tests；未运行 git。

| id | 所绘主体/范围、年代依据 | 已查看照片及来源 | 结构检查点、材质色 | 阶段 | 生成次数 | 下一步/阻塞原因 |
| --- | --- | --- | --- | --- | --- | --- |
| ln_wanfotang | 义县万佛堂石窟 · 西区第六窟交脚弥勒大佛正面；北魏 · 499（year=499）；国保第3批「万佛堂石窟」组成部分；依据：辽宁省文化和旅游厅 · 重点文物保护单位：万佛堂石窟；维基百科：万佛堂石窟 | `ln_wanfotang-photo.jpg` 猫猫的日记本，CC BY-SA 4.0（Wanfo_Hall_Grottoes_14_2015-09.JPG）；`ln_wanfotang-2-photo.jpg` 亜細亜写真大観社（黑龙会出版，1930年代）· 摄影者未署名，Public domain；已用 Read 查看 | 5条检查点：龛形：浅弧形露天大龛，龛顶为天然岩面，左右岩壁向前略收；像座为近代砌筑的方形台座（2015年照片中被红布覆盖）。…；材质：崖壁为灰褐色砂岩，表面多孔风化；主像石质灰色，面部经修补略光滑；背光保留后世彩绘（土红、靛蓝、白），… | ready | 0 | 等待有 imagegen 的会话生图 |
| ln_xingcheng | 兴城古城 · 东门春和门城楼与瓮城正面（城外视角）；明 · 1428（year=1428）；国保第3批「兴城城墙」组成部分；依据：辽宁省文化和旅游厅 · 重点文物保护单位：兴城古城；维基百科：兴城古城 | `ln_xingcheng-photo.jpg` Pechorin04，CC BY-SA 3.0（Xingcheng_East_Gate.jpg）；`ln_xingcheng-2-photo.jpg` 猫猫的日记本，CC BY-SA 3.0；已用 Read 查看 | 5条检查点：瓮城：画面左右各一段高大的灰砖城墙斜向前伸（瓮城两翼），墙顶有雉堞与收分；两翼之间露出主城门墙面。…；材质：城墙与瓮城为青灰色大砖包砌、灰浆勾缝，墙面平整略有风化；城楼木构为深褐近黑色，槛窗为暗色木格；屋面灰… | ready | 0 | 等待有 imagegen 的会话生图 |
| ln_guangjita | 锦州广济寺塔 · 八角十三层密檐塔正面全貌；辽 · 1057（year=1057）；国保第5批「广济寺古建筑群」组成部分；依据：辽宁省文化和旅游厅 · 重点文物保护单位：广济寺古建筑群；中国新闻网 2001-07-16：第五批全国重点文物保护单位名单 | `ln_guangjita-photo.jpg` EditQ（호고호），CC BY-SA 4.0（锦州广济寺塔.jpg）；`ln_guangjita-2-photo.jpg` Rrmarcellus，CC BY-SA 3.0；已用 Read 查看 | 5条检查点：基座：须弥座式基座，上部有一圈仿木斗栱与栏板带（2010年照片可见），下部素面；2023年正面照片基座下部被寺前殿宇遮挡…；材质：塔身青灰色砖砌，砖缝细密；檐口灰筒瓦、檐角风铎深灰；佛龛内造像与胁侍为灰色砖雕，局部泛黄白；塔刹为灰… | ready | 0 | 等待有 imagegen 的会话生图 |
| ln_zhaoling | 沈阳清昭陵 · 隆恩殿正面（含须弥座台基与月台三出陛）；清 · 1643–1651（year=1643，约）；国保第2批「清昭陵」组成部分；依据：辽宁省文化和旅游厅 · 重点文物保护单位：清昭陵；维基百科：清昭陵 | `ln_zhaoling-photo.jpg` ScareCriterion12，CC0（沈阳清昭陵享殿2024.10_(2).jpg）；`ln_zhaoling-2-photo.jpg` ScareCriterion12，CC0；已用 Read 查看 | 5条检查点：屋顶：单檐歇山，正脊两端大吻，垂脊与戗脊各有脊兽；檐口平直、角部起翘，檐下一圈斗栱与彩画额枋。…；材质：屋面黄色琉璃筒瓦，檐口剪边略带绿色；斗栱与额枋青绿彩画加金线；柱身朱红；槛窗槛门朱红带金色菱花；台基… | ready | 0 | 等待有 imagegen 的会话生图 |
| ln_shenyang_beita | 沈阳北塔（护国法轮寺塔）· 藏式覆钵式白塔正面；清 · 1643–1645（year=1645）；国保未贴标（unconfirmed：省保）；依据：维基百科：护国法轮寺；维基百科：沈阳西塔／护国延寿寺 | `ln_shenyang_beita-photo.jpg` Gary Todd，CC0（North_Pagoda.jpg）；`ln_shenyang_beita-3-photo.jpg` ruiraykwok（panoramio），CC BY-SA 3.0；`ln_shenyang_beita-2-photo.jpg` Ati（zh.wikipedia），CC BY-SA 3.0；已用 Read 查看 | 5条检查点：塔基：方形多层须弥座，自下而上为方形台座、束腰（四面有鎏金线条勾边的浮雕壸门，2014年照片下缘可见一角）、上枋，再上为…；材质：覆钵、塔脖与基座白色灰浆粉刷，局部剥落露出灰砖；焰光门鎏金、门内红底；相轮、宝盖、日月火焰鎏金铜；基… | ready | 0 | 等待有 imagegen 的会话生图 |
| jl_haotaiwangbei | 集安好太王碑 · 碑体正面（碑亭内）；高句丽 · 414（year=414）；国保第1批「洞沟古墓群」组成部分；依据：维基百科：好太王碑；国务院公报1961年第4号：第一批全国重点文物保护单位名单 | `jl_haotaiwangbei-photo.jpg` Yumeto，CC BY-SA 4.0（20230605_Stela_for_Gwanggaeto.jpg）；`jl_haotaiwangbei-2-photo.jpg` EditQ（호고호），CC BY-SA 4.0；`jl_haotaiwangbei-3-photo.jpg` 1903年日本出版旧照，摄影者未署名（Commons 上传者 최현진），Public domain；已用 Read 查看 | 5条检查点：整体：一根不规则的四面方柱，自下而上略有收分并在中上部微向一侧倾斜，顶部略呈圆弧斜面，四角圆钝而非直棱。…；材质：碑体为灰黑至灰褐色角砾凝灰岩，表面粗糙多孔、有浅色风化斑块与裂纹；刻字处略显白色；岩基灰黄色；碑亭地… | ready | 0 | 等待有 imagegen 的会话生图 |
| jl_wandu | 集安丸都山城 · 石砌瞭望台正面；高句丽 · 198（year=198，约）；国保第2批「丸都山故城」组成部分；依据：维基百科：丸都山城；Wikipedia (en): Hwando | `jl_wandu-photo.jpg` EditQ（호고호），CC BY-SA 4.0（Lookout_Tower,_Hwando_Mountain_Fortress_1.jpg）；`jl_wandu-2-photo.jpg` Yumeto，CC BY-SA 4.0；已用 Read 查看 | 4条检查点：整体：一座近似梯形轮廓的石砌台体，底边最宽、向上逐层内收，左右两侧坡度不同（左侧坍塌较多、轮廓更缓，右侧较陡）。…；材质：石块为灰色至淡红褐色花岗岩，表面粗糙、棱角分明；石缝间长有杂草与小灌木；台前草地黄绿；无灰浆。… | ready | 0 | 等待有 imagegen 的会话生图 |
| hlj_wenmiao | 哈尔滨文庙 · 大成殿正面（含月台与汉白玉栏杆）；民国 · 1926–1929（year=1929）；国保第4批「哈尔滨文庙」组成部分；依据：买购网·哈尔滨文庙条目；维基百科：哈尔滨文庙 | `hlj_wenmiao-photo.jpg` Huanokinhejo，CC BY-SA 4.0（Dacheng_Hall._Harbin_Confucian_Temple.jpg）；`hlj_wenmiao-2-photo.jpg` Jason（picasaweb），CC BY-SA 3.0；已用 Read 查看 | 4条检查点：开间：前檐可数十二根红色圆柱（“红度”剖面检出12根，间距自左至右约362/352/347/417/457/520/47…；材质：屋面黄色琉璃筒瓦，脊饰黄琉璃；斗栱、额枋青绿彩画加金线、朱红地；柱身与门窗深红近赭，格心金线；台基灰… | ready | 0 | 等待有 imagegen 的会话生图 |
| ln_chaoyangbei | 朝阳北塔 · 方形十三层密檐塔南面全貌；辽 · 1044重修（year=1044，约）；国保第3批「朝阳北塔」独立单位；依据：辽宁省文化和旅游厅 · 重点文物保护单位：朝阳北塔；国务院公报1988年第4号：第三批全国重点文物保护单位名单 | `ln_chaoyangbei-photo.jpg` 猫猫的日记本，CC BY-SA 4.0（Northern_Chaoyang_Pagoda_04_2015-09.JPG）；`ln_chaoyangbei-eaves-crop.png` 猫猫的日记本（上一轮自同一照片裁出的檐部局部），CC BY-SA 4.0；`ln_chaoyangbei-candidate1.jpg` 猫猫的日记本，CC BY-SA 4.0；已用 Read 查看 | 5条检查点：台基：方形砖砌须弥座式基座，上有一圈仿木栏板（照片下缘），基座正面中央一道台阶；基座前的现代地面与围栏不画。…；材质：塔身与檐为青灰色砖，檐面覆灰筒瓦、檐端有瓦当滴水；塔身浮雕砖雕灰色、局部泛土黄；塔顶宝盖为绿色琉璃；… | ready | 0 | 等待有 imagegen 的会话生图 |
| jl_lingguang | 长白灵光塔 · 渤海五层楼阁式方砖塔正面；渤海 · 8–10世纪（year=800，约）；国保第3批「灵光塔」独立单位；依据：维基百科：灵光塔；中国日报网 2022-03-01：灵光塔 | 无（见阻塞原因） | 3条检查点：（文献，未经照片核对）方形平面，五层楼阁式，逐层收分：底边3.3米、顶边1.9米。…；材质：未知（无照片）；文献记砖塔、黄泥勾缝。… | blocked | 0 | 阻塞：缺主体照片：Wikimedia Commons 文件搜索“灵光塔／영광탑／Lingguang Pagoda／長白 靈光塔”无结果，Category:Changbai Korean Autonomous County 为空，韩文维基“영광탑”… |
| hlj_shangjing | 金上京会宁府遗址 · 皇城／城垣土筑遗址；金 · 1115–1153（year=1115，约）；国保第2批「金上京会宁府遗址」组成部分；依据：维基百科：金上京会宁府遗址；国务院公报1982年第7号：第二批全国重点文物保护单位名单 | 无（见阻塞原因） | 2条检查点：（文献）南城、北城与皇城三部分，城垣土版筑、马面与护城河；皇城午门基址与宫殿台基尚存。…；材质：未知（无照片）；文献记土版筑城垣。… | blocked | 0 | 阻塞：缺主体照片：Wikimedia Commons 关于金上京会宁府遗址的文件只有1930年代 Tolmatscheff 平面图局部（Herrmann 地图集，公有领域）与出土文物（铜坐龙、官印、砖）照片，没有城垣、皇城或午门基址的实景照片；C… |

说明：
- 照片全部来自 Wikimedia Commons，许可为 CC0、CC BY-SA 3.0/4.0 或公有领域；上一轮下载的 19 个文件经 Commons `list=allimages&aisha1` 反查确认文件名、作者与许可（两张昭陵图为 2048px 缩略图，原图 24 MB 超过 20 MB 阈值，按宽高比与内容核对）。
- 结构计数：朝阳北塔 13 檐（上下两段裁图目视 + 中轴灰度剖面两法一致）；广济寺塔 13 檐（2010 年侧前方照片檐角计数；正面照片对比度低、计数在 12—13 之间，以侧前方与文献为准）；沈阳北塔相轮目测约 13 重；哈尔滨文庙大成殿红柱检测 12 柱 11 间；昭陵隆恩殿正面 6 根可见红柱 = 三间 + 周围廊角柱；兴城春和门城楼两层重檐、官方记五开间。
- `dyn` 仅用现有键：bei（万佛堂）、ming（兴城、昭陵、北塔）、liao（广济寺塔、朝阳北塔、金上京）、goguryeo（好太王碑、丸都）、modern（哈尔滨文庙）、balhae（灵光塔）。无需新增时代、地区或省份。
- 需新增地点 4 处：`ln_xingcheng`（兴城）、`ln_jinzhou`（锦州）、`jl_changbai`（长白）、`hlj_acheng`（阿城）；其余复用 yixian、shenyang、jian_jilin、harbin、chaoyang。坐标均为 Wikidata／OSM 近似坐标，非测绘。
- 朝阳北塔为重新评估：`assets/research/ln_chaoyangbei.json` 记录上一轮三稿檐数错误（14/12/12），资料本身完整；本轮确认照片为 13 檐并改写提示词为分段计数描述。
- 上一轮已下载但本轮才立条目的照片：`ln_wanfotang-*`、`ln_xingcheng-*`、`ln_guangjita-*`、`ln_zhaoling-*`、`ln_shenyang_beita-*`、`jl_haotaiwangbei-*`、`jl_wandu-*`、`hlj_wenmiao-*`，已全部绑定到对应 JSON；`ln_chaoyangbei-candidate1.jpg`、`-eaves-crop.png` 沿用。无孤儿文件。

## 在途及结果记录

| id | 线稿/设色 | 工具返回的任务或调用标识 | started_at | completed_at（未知则留空） | received_at | 原件路径 | 结果/失败原因/下次策略 |
| --- | --- | --- | --- | --- | --- | --- | --- |

（空：本会话没有 imagegen，没有发起任何生成调用。）

## 并发调整

| at | 原目标→新目标 | 错误信号/原因 | 冷却至 | 尚在途数量 | 恢复结果 |
| --- | --- | --- | --- | --- | --- |

（空：未发起生成，无并发调整。）

## 检索收口

- 预算：每处首轮 3–5 分钟或 2 轮查询。上一轮 8 处照片在预算内收口；本轮 9 处 ready 的考据各约 5–8 分钟（含公报 OCR 定位），灵光塔、金上京各约 5 分钟到预算仍无授权实景照片，按手册标 blocked。
- 实际问题：
  - WebSearch 会话配额（200 次）在本轮中途用尽，其后只用 WebFetch 与 Commons/Wikidata/Nominatim API；百度百科与 UNESCO 页面返回 403，`zh.wikipedia` 的 `广济寺塔_(锦州)`、`盛京四塔`、`沈阳四塔`、`沈阳西塔` 等标题 404，改用辽宁文旅官方页、`护国法轮寺`、`护国延寿寺` 等条目。
  - 国保公报 PDF 无文字层（`pdftotext` 只得页数），改以 Vision OCR（Swift 脚本）逐页识别后定位：好太王碑在第一批不是独立单位，而是“洞沟古墓群”备注“包括好太王碑”（PDF 第 15 页）；第二批正式名为“丸都山故城”（编号 52）、清昭陵编号 61、金上京会宁府遗址编号 54；第三批正式名为“兴城城墙”（第六批合并通知写作“兴城古城墙”）。
  - 沈阳北塔高度各源不一（“通高 26 米多”／“四塔原高 33 米”），facts 不写高度；相轮数文献未给，按照片目测约 13 重。
  - 兴城城楼是否原构／何时重建未查到，yearNote 如实写未知，年份取城墙始建 1428。
  - 丸都山城瞭望台无单独尺寸与修缮记载（baike 403），facts 写“尺寸未查到”；昭陵隆恩殿开间文献未给，按主图红柱计数（三间 + 周围廊）。
  - 上一轮照片无来源记录，本轮用 Commons SHA1 反查全部补齐；两张昭陵缩略图无法 SHA1 匹配，按宽高比（7790×5217→2048×1372、7736×5217→2048×1381）与内容核对。

## 最终交付

- finished_at、墙钟耗时：2026-10-05T23:05:00+09:00；上一轮约 40 分钟（03:25–04:05），本续做会话约 55 分钟；不含生图。
- 生成调用总数、返工数；服务耗时：0 / 0；无（本会话无 imagegen）。
- 峰值在途数量、最终有效并发、降档原因及服务失败数：0 / 0 / 无 / 0。
- 阶段时间窗及超预算原因；用户等待/服务异常单列：资料准备 22:10–23:05；WebSearch 配额用尽与 403/404 换源各约 10 分钟；无用户等待。
- 新增、复用、阻塞的 ID：新增候选 11（ready 9：ln_wanfotang、ln_xingcheng、ln_guangjita、ln_zhaoling、ln_shenyang_beita、jl_haotaiwangbei、jl_wandu、hlj_wenmiao、ln_chaoyangbei；blocked 2：jl_lingguang、hlj_shangjing）；复用既有图版 0；默认通过（`approved_default`）0 / 用户明确通过（`approved_user`）0（未生图）。
- 实际检查命令及结果、浏览器检查范围、未验证项：`python3 gen.py` 校验 lede 90–150 字、facts 恰好 3 条 45–90 字、reference_files 存在（全部通过）；JSON 可解析；未运行 `node --test`（未改目录数据）；未做浏览器与 App 检查（无图版）。下一步：等待有 imagegen 的会话生图。
- 素材是否备份/发布、代码是否提交：未备份、未发布、未提交（本会话不运行 git）。
