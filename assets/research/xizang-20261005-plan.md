# 本批新增计划

- 批次名：xizang-20261005
- 用户约定范围及分支：西藏自治区新增古迹，目标 10 处（至少 8 处 ready）；分支 `claude/unlimited-token-budget-suggestions-4576ae`（worktree）。本批为“资料就绪”批：核实选目、授权照片、结构检查点、考据、条目草稿与提示词；**本会话没有 imagegen，不生图**。
- started_at：2026-10-05T03:27:00+09:00（上一轮代理首批照片落盘）；本续做会话自 2026-10-05T22:10:00+09:00 起，完成于 2026-10-05T22:30:00+09:00
- 基线来源：当前 SITES 476 个 ID（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/ref/ids.txt`，西藏仅 `xz_jokhang`、`xz_potala`）；`assets/color-research/queue.json` 473 项；`assets/color-research/avif-manifest.json` 476 图。本批 12 个新 ID 均不与既有 ID、别名重复。
- 候选来源：维基百科《西藏自治区全国重点文物保护单位列表》发现候选，再逐项对照国务院公报原件渲染页核实（第一批 1961 年第 4 号、第二批 1982 年第 7 号、第三批 1988 年第 4 号、第四批 1996 年第 36 号、第五批浙江政报 2002 年第 21 期转载；本地 PDF SHA-256 与 `national-protection.json` 记录一致）。每项正式单位名、批次、所绘主体对应范围、公报编号与页码见各 JSON `protection`，12 处全部核实为 confirmed（所绘主体均为该单位组成部分）。未进入本批的方向：噶丹寺（无合适授权正面照，未展开）。
- 生图起始并发目标：8（线稿与设色合计）；本会话无 imagegen，未启动任何生成。
- 本次交付范围：本地（`assets/research/candidates/xizang-20261005/*.json`、`assets/references/xz_*-photo.jpg`、本计划、`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/expansion/xizang-20261005-intake.json`）。未改 `sites.js`、`catalog.js`、`national-protection.json`、`queue.json`、tests。

| id | 所绘主体/范围、年代依据 | 已查看照片及来源 | 结构检查点、材质色 | 阶段 | 生成次数 | 下一步/阻塞原因 |
| --- | --- | --- | --- | --- | --- | --- |
| xz_samye_utse | 桑耶寺 · 乌策大殿正面（现状，三层金顶）；8世纪创建 · 乌策大殿现状（year=779，约）；国保第4批「桑耶寺」独立单位；依据：维基百科：桑耶寺等3条 | `xz_samye_utse-photo.jpg` Gerd Eichmann，CC BY-SA 4.0（Samye-66-Hauptgebaeude-2014-gje.jpg）；`xz_samye_utse-2-photo.jpg` Preston Rhea，CC BY-SA 2.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：正面自下而上：白色石砌一层长墙，窗为黑色梯形窗套、金色格栅、橙红色短帘，正面可见左三右四共七窗（两端被画幅截断，墙体更长…；材质：下层墙面白色石砌抹灰、略见砌缝；边玛墙带赭红、白点；窗套黑色、格栅金黄、窗帘橙红… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_sakya_south | 萨迦寺 · 南寺拉康钦莫大殿正面（1268年建，现状）；1073年北寺 · 1268年南寺（year=1268）；国保第1批「萨迦寺」独立单位；依据：维基百科：萨迦寺等2条 | `xz_sakya_south-photo.jpg` Dieter Schuh at de.wikipedia，CC BY-SA 3.0（Sakya,_Haupttempel_des_S%C3%BCdklosters.jpg）；`xz_sakya_south-2-photo.jpg` Moszczynski，Public domain；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：主殿为深赭红色厚重砌体，墙面微收分，正面三段：左翼三层高、三排窗（上两排各三窗、底排两窗另一小窗），窗带黑色窗套与白色短…；材质：主殿墙面深赭红（石砌抹面），腰线与窗帘白色，窗套黑色，门帘深褐；石阶、石狮灰白色… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_shalu | 夏鲁寺 · 措钦大殿（夏鲁拉康）前院正面与二层汉式琉璃瓦顶；1087年创寺 · 1333年重建（year=1333）；国保第3批「夏鲁寺」独立单位；依据：维基百科：夏鲁寺等2条 | `xz_shalu-photo.jpg` Gerd Eichmann，CC BY-SA 4.0（Shalu-08-Kloster-Vorhof-2014-gje.jpg）；`xz_shalu-2-photo.jpg` Gerd Eichmann，CC BY-SA 4.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：前院正面：底层为青灰色抹面的收分厚墙，近乎无窗，仅中央一间入口；门上出挑一座两层木构门廊（阳台），挂黑棕条纹门帘，顶部与…；材质：底层墙面青灰色抹灰（略带蓝灰），门帘黑棕条纹、布幔红白蓝黄流苏；二层殿墙明黄色，… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_sera | 色拉寺 · 措钦大殿正面（1710年建，现状）；1419年建寺 · 措钦大殿1710年（year=1710）；国保第2批「色拉寺」独立单位；依据：维基百科：色拉寺等2条 | `xz_sera-photo.jpg` Hiroki Ogawa，CC BY 3.0（Sera_Monastery_Lhasa_Tibet_China_%E8%A5%BF%E8%97%8F_%E6%8B%89%E8%90%A8_%E8%89%B2%E6%8B%89%E5%AF%BA_-_panoramio_(2).jpg）；`xz_sera-2-photo.jpg` Andrew and Annemarie，CC BY-SA 2.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：正立面自下而上三段：灰白色石砌墙基与台阶；底层入口柱廊，红色木柱白色柱础、按正面照片约六根，柱廊外悬黑底白纹的大门帘；柱…；材质：墙体为白色石砌（略泛灰、有砌缝），墙顶边玛草墙带深赭红，窗框黑色梯形，门帘黑底白… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_tholing | 托林寺 · 红殿正面与殿前佛塔（现状）；996年创寺 · 1028年扩建（year=996，约）；国保第4批「托林寺」独立单位；依据：维基百科：托林寺等4条 | `xz_tholing-photo.jpg` Dieter Schuh，CC BY 3.0（Tholing-Kloster_(Tibet)_Roter_Tempel_Dieter_Schuh.JPG）；`xz_tholing-2-photo.jpg` Dieter Schuh，CC BY 3.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：红殿为低矮的平顶土坯殿堂：赭红色墙面，上部一道白色墙带，再压一道深红女儿墙带（檐口有黑色细线）；殿身前低后高，前部入口段…；材质：墙面赭红色土坯抹灰，略有流淌痕迹；白色墙带与深红女儿墙；门帘深褐、幔帐粉白；佛塔… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_tradruk | 昌珠寺 · 入口正面与金顶（现状）；7世纪创建 · 1351年扩建 · 1980年代重修（year=650，约）；国保第1批「昌珠寺」独立单位；依据：维基百科：昌珠寺等3条 | `xz_tradruk-photo.jpg` Gerd Eichmann，CC BY-SA 4.0（Tradruk_Lhakhang-02-2014-gje.jpg）；`xz_tradruk-2-photo.jpg` Esiymbro，CC BY-SA 4.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：正面为一字排开的白色石砌殿墙，墙顶一律是平直的赭红色边玛墙带（白点饰）；中央入口门楼略高、略凸，门洞上悬白色流苏帘与黑底…；材质：墙面白色石砌、抹灰粗糙；边玛墙带赭红、白点饰；门帘黑底白纹、流苏帘白色；金顶与宝… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_ramoche | 小昭寺 · 主殿正立面（现状，三层红墙与金顶）；641年创建 · 1474年重建 · 1986年重修（year=641）；国保第5批「小昭寺」独立单位；依据：维基百科：小昭寺等3条 | `xz_ramoche-photo.jpg` Gerd Eichmann，CC BY-SA 4.0（Lhasa-Ramoche-02-2014-gje.jpg）；`xz_ramoche-2-photo.jpg` 陈博洋，CC BY-SA 4.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：正立面为深红色三层主殿：中段较宽，两侧各一座略凸的红色塔楼状体量，塔楼每层一窗（黑色窗套、金色格栅、白色短檐）。…；材质：主殿墙面深红色抹灰；窗套黑色、窗格金色；门帘黑底金纹；幔帐白色、黄色与红蓝条纹；… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_gyantse_dzong | 江孜宗山 · 宗山城堡现状（自县城仰视）；967年初建 · 1365年建宫 · 1390年筑堡（year=1390，约）；国保第1批「江孜宗山抗英遗址」独立单位；依据：维基百科：江孜宗山等3条 | `xz_gyantse_dzong-photo.jpg` PenumbraLpz，CC BY-SA 4.0（FestungGyangze2015.jpg）；`xz_gyantse_dzong-2-photo.jpg` Gerd Eichmann，CC BY-SA 4.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 3条检查点：城堡沿山脊自左向右上方层层叠高：左侧与中部为数座白墙平顶的碉楼状建筑和连绵的白色围墙，墙顶一律为赭红色檐带；右下为一排两…；材质：墙面白色（带土黄与红褐色水渍），檐带赭红，窗洞为深色小方窗，台阶与挡墙浅灰白，山… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_guge | 古格王国遗址 · 札布让王城遗址（红殿与山顶宫堡，自山下仰视）；10世纪建国 · 1630年废弃（year=1000，约）；国保第1批「古格王国遗址」独立单位；依据：维基百科：古格王国遗址等3条 | `xz_guge-photo.jpg` Pseudois (talk) (Uploads)，CC BY-SA 3.0（Tsaparang-ruins_of_ancient_capital_of_Guge_Kingdom_03.JPG）；`xz_guge-2-photo.jpg` Jean-Marie Hullot，CC BY-SA 4.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：土山自左下向右上升起，山顶最高处一座白墙红檐的小殿（王宫区），顶上挂经幡；山体各层布满洞窟口（数十个）与土坯残墙、残塔。…；材质：土山与土坯残墙为土黄至灰白色，层理明显；红殿赭红色、檐带深褐；山顶小殿白墙红檐、… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_gyantse_kumbum | 白居寺 · 吉祥多门塔（十万佛塔）全貌；明 · 1427–1436（year=1427，约）；国保第4批「白居寺」组成部分；依据：人民网·艺术收藏《白居寺建筑与壁画艺术》等5条 | `xz_gyantse_kumbum-photo.jpg` Antoine Taveneaux，CC BY-SA 3.0（Kumbum_Gyantse.jpg）；`xz_gyantse_kumbum-2-photo.jpg` Gerd Eichmann，CC BY-SA 4.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 5条检查点：塔瓶以下自下而上共五道赭红色檐带：最下为高大的白色塔基，檐下绕一圈蓝地彩绘宝相花带；其上四层佛殿塔座逐层收缩，每层檐口为…；材质：塔身为石砌白色抹灰；各层檐口赭红色，檐下彩绘菱形纹与蓝、绿、金色图案带，白点饰；… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_drepung | 哲蚌寺 · 措钦大殿正面；明 · 1416创寺（year=1416，约）；国保第2批「哲蚌寺」组成部分；依据：中国西藏网：哲蚌寺等6条 | `xz_drepung-photo.jpg` Dennis G. Jarvis，CC BY-SA 2.0（Great_Assembly_Hall_Drepung_Monastery.jpg）；`xz_drepung-2-photo.jpg` Maris Burbergs，CC BY 3.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 5条检查点：台基：全宽的灰色石砌大台阶（资料记17级）自广场升至一层明廊地坪；台阶中央立一根高大经幡柱（线稿去除）。…；材质：墙体白色石砌抹灰，略见砌缝；边玛墙带赭红色，饰鎏金法轮与圆饰；明廊柱裹红布、柱头… | ready | 0 | 等待有 imagegen 的会话生图 |
| xz_tashilhunpo | 扎什伦布寺 · 强巴佛殿（弥勒殿）正面；近现代 · 1914（寺1447年创）（year=1914，约）；国保第1批「扎什伦布寺」组成部分；依据：维基百科：扎什伦布寺等4条 | `xz_tashilhunpo-photo.jpg` Prof. Mortel，CC BY 2.0（Tashilhunpo_Monastery,_Shigatse,_Tibet_(2).jpg）；`xz_tashilhunpo-2-photo.jpg` Bgabel，CC BY-SA 3.0；已用 Read 查看（前 9 处为上一轮代理，后 3 处为本轮） | 4条检查点：强巴佛殿为一座高大的赭红色方体，顶为平顶，平顶中央升起一座鎏金汉式歇山小殿顶，四角立鎏金宝幢/宝瓶（主图可见左二右二）。…；材质：殿身赭红色石砌抹灰；边玛墙带深褐色，饰鎏金圆饰与法轮；屋顶鎏金铜；窗廊木构黄色窗… | blocked | 0 | 阻塞：缺主体照片：现有两张授权照片（Prof. Mortel 2018 CC BY 2.0；Bgabel 2010 CC BY-SA 3.0）及 Commons 分类 Tashilhunpo Monastery 中另 11 张候选（见 /private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/ex… |

说明：
- 12 处全部为 Wikimedia Commons 照片，许可为 CC BY 2.0/3.0、CC BY-SA 2.0/3.0/4.0 或公有领域；元数据经 Commons API 取得，三处新条目本会话重新核对一次。
- `dyn` 仅用现有键：吐蕃（桑耶、昌珠、小昭）、元（萨迦、夏鲁）、明·清（色拉、江孜宗山、白居塔、哲蚌）、宋（托林、古格，按国保名单“宋”“约十世纪”作约略归期）、近现代（扎什伦布强巴佛殿，待定）。无需新增时代、地区或省份。
- 需新增地点 10 处：xz_samye、xz_sakya、xz_shalu、xz_sera、xz_tholing、xz_tradruk、xz_tsaparang、xz_gyantse（宗山与白居塔共用）、xz_drepung、xz_shigatse；小昭寺复用 xz_lhasa。坐标均为 Wikidata 本体近似坐标，非测绘。
- 上一轮已下载但本轮才立条目的照片：`xz_gyantse_kumbum-*`、`xz_drepung-*`、`xz_tashilhunpo-*`，已全部绑定到对应 JSON，无孤儿文件。

## 在途及结果记录

| id | 线稿/设色 | 工具返回的任务或调用标识 | started_at | completed_at（未知则留空） | received_at | 原件路径 | 结果/失败原因/下次策略 |
| --- | --- | --- | --- | --- | --- | --- | --- |

（空：本会话没有 imagegen，没有发起任何生成调用。）

## 并发调整

| at | 原目标→新目标 | 错误信号/原因 | 冷却至 | 尚在途数量 | 恢复结果 |
| --- | --- | --- | --- | --- | --- |

（空：未发起生成，无并发调整。）

## 检索收口

- 预算：每处首轮 3–5 分钟或 2 轮查询。上一轮 9 处在预算内收口；本轮白居塔、哲蚌寺各约 10 分钟（多次换源），扎什伦布寺到预算仍缺完整正面照，按手册标 blocked。
- 实际问题：
  - 国保公报 OCR 文本（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/expansion/protection/batch*.txt`）检索不到“白居寺”“哲蚌寺”“扎什伦布寺”，改为逐页查看渲染页（r4/p-25、r2/p-23、r1/p-12）定位编号与页码。
  - `www.tibet.cn`、`art.people.com.cn` HTTPS 证书与域名不符，WebFetch 失败；改用明文 HTTP curl 读取正文。`wsb.xizang.gov.cn` 返回 508（防火墙），`lasa.gov.cn` 两页 404，未取得哲蚌寺措钦大殿的官方改建年代，写未知。
  - zh.wikipedia `action=raw` 被拒（Wikimedia Error），改用 `api.php?action=parse&prop=wikitext`。
  - 白居塔年代与尺寸各源不一（奠基 1427 / 始建 1414；高 42.4 m / 32 m 余；佛殿 77 / 76 间），JSON 以《汉藏史集》系统（人民网引）为主、并列他说，`yearApprox` 置 true。
  - 扎什伦布寺：Commons 分类 13 张候选（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/expansion/tashi/info.json`、`montage.png`）均为屋顶或街巷仰视，强巴佛殿下部被遮挡；所绘主体（强巴佛殿 vs 措钦大殿）需用户确认。

## 最终交付

- finished_at、墙钟耗时：2026-10-05T22:30:00+09:00；上一轮约 40 分钟（03:27–04:04），本续做会话约 20 分钟；不含生图。
- 生成调用总数、返工数；服务耗时：0 / 0；无（本会话无 imagegen）。
- 峰值在途数量、最终有效并发、降档原因及服务失败数：0 / 0 / 无 / 0。
- 阶段时间窗及超预算原因；用户等待/服务异常单列：资料阶段见“检索收口”；无用户等待；服务异常为上述证书、防火墙与 404。
- 新增、复用、阻塞的 ID；默认通过（`approved_default`）数量 / 用户明确通过（`approved_user`）数量：ready 11 处（xz_samye_utse, xz_sakya_south, xz_shalu, xz_sera, xz_tholing, xz_tradruk, xz_ramoche, xz_gyantse_dzong, xz_guge, xz_gyantse_kumbum, xz_drepung）；复用 0；blocked 1 处（xz_tashilhunpo）；approved_default 0 / approved_user 0（未生图）。
- 实际检查命令及结果、浏览器检查范围、未验证项：`python3 /private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/xz2/write3.py` 字段完整性、dyn/types 键、lede 90–150 字、facts 恰好 3 条 45–90 字、照片文件存在性全部通过；12 份 JSON 均可解析；公报 PDF SHA-256 与 `national-protection.json` 一致。未运行 `build-catalog`、Node 测试与审图页（未接入目录）；未生图。
- 素材是否备份/发布、代码是否提交：未备份、未发布、未提交（按约定不运行 git）。
- 下一步：等待有 imagegen 的会话生图；扎什伦布寺待用户确认主体并另觅完整正面照。
