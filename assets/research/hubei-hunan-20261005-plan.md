# 本批新增计划

- 批次名：hubei-hunan-20261005
- 用户约定范围及分支：湖北、湖南新增古迹，目标 10 处（至少 8 处 ready）；分支 `claude/unlimited-token-budget-suggestions-4576ae`（worktree）。本批为“资料就绪”批：核实选目、授权照片、结构检查点、考据、条目草稿与提示词；**本会话没有 imagegen，不生图**。
- started_at：2026-10-05T02:50:00+09:00（上一轮代理建立候选目录，03:29–04:01 落盘 14 张照片后中断，未产出 JSON）；本续做会话自 2026-10-05T22:10:00+09:00 起，完成于 2026-10-05T23:01+09:00
- 基线来源：当前 SITES 476 个 ID（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/ref/ids.txt`；湖北既有 hb_yuquan、hb_zixiao、hb_jindian、hb_xianling，湖南既有 hu_zhanggu、hu_tianhou、hu_yueyang、hu_nanyue、hn_xizhou）；`assets/color-research/queue.json` 与 AVIF 清单未改动。本批 20 个新 ID（10 ready + 10 blocked）均已与 ids.txt 逐一核对不重复；hb_yuquan_hall 与既有 hb_yuquan（铁塔）为同一国保单位的不同主体。
- 候选来源：用户给定候选方向 + 维基百科《湖北／湖南全国重点文物保护单位列表》发现，再逐项对照国务院公报原件渲染页核实（第三批 1988 年第 4 号 PDF 第 12 页、第四批 1996 年第 36 号 PDF 第 25 页、第五批浙江政报转载 PDF 第 13 页、第六批文旅部转载网页文本、第七批中国政府网 PDF 第 69／70 页；本地文件 SHA-256 与 `national-protection.json` 记录一致）。9 处 ready 为 confirmed（荆州城墙、襄阳城墙、荆州三观、钟祥文风塔、鄂州观音阁、荆州万寿宝塔、岳麓书院、浏阳文庙、慈氏塔），黄鹤楼非国保不贴标签；每项正式单位名、批次、编号、页码与所绘主体对应范围见各 JSON `protection`。未进入本批而经检索放弃的方向见下表 blocked 行；另记备选：永州柳子庙（第五批，Commons 有 Huangdan2060 2017 CC0 大门正面两张，未展开）。
- 生图起始并发目标：8（线稿与设色合计）；本会话无 imagegen，未启动任何生成。
- 本次交付范围：本地（`assets/research/candidates/hubei-hunan-20261005/*.json` 20 个、`assets/references/hb_*／hu_*-photo.jpg` 新增 24 张、本计划、`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/expansion/hubei-hunan-20261005-intake.json`）。未改 `sites.js`、`catalog.js`、`national-protection.json`、`queue.json`、tests，未运行 git 与任何生图／去底／转码脚本。

| id | 所绘主体/范围、年代依据 | 已查看照片及来源 | 结构检查点、材质色 | 阶段 | 生成次数 | 下一步/阻塞原因 |
| --- | --- | --- | --- | --- | --- | --- |
| hb_jingzhou_wall | 荆州城墙 · 东门寅宾门城台与宾阳楼正面（自城外东侧）；清 · 1646年重建城垣 · 1987年复建城楼（year=1646）；国保第4批「荆州城墙」组成部分；依据：维基百科：荆州城墙；荆州古城历史文化旅游区·古城墙景区等4条 | `hb_jingzhou_wall-photo.jpg` Fxqf，CC BY-SA 4.0；`hb_jingzhou_wall-2-photo.jpg` Popolon，CC BY-SA 3.0（自城内侧斜视城楼，核对上檐歇山、平座…）；已用 Read 查看原图并裁图核数 | 4条检查点：城台：灰色条砖砌筑，略有收分，顶部一排雉堞（垛口）贯通全幅；正中一座半圆券门洞，券顶上方嵌一块横长石门额（线稿留空白牌位…；材质：城台与城墙为青灰色条砖，砖缝灰白；城楼木构朱红色（柱、栏杆、格扇），额枋青绿彩画间夹金色回纹带，屋面… | ready | 0 | 等待有 imagegen 的会话生图 |
| hb_xiangyang_wall | 襄阳城墙 · 临汉门（小北门）城台与城楼正面；明 · 清 · 1826年重修城楼（year=1826）；国保第5批「襄阳城墙」组成部分；依据：维基百科：襄阳城；新浪博客《襄阳临汉门》等4条 | `hb_xiangyang_wall-photo.jpg` Yumeto，CC BY-SA 4.0；`hb_xiangyang_wall-2-photo.jpg` Windmemories，CC BY-SA 4.0（暮色中正对全貌，核对四柱三间、重檐比…）；已用 Read 查看原图并裁图核数 | 4条检查点：城台：砖砌（青灰与土黄砖混砌），正中一座半圆券门洞，券顶上方嵌一块横长石匾（留白）；台顶一排方形雉堞贯通，雉堞之间露出城…；材质：城砖以青灰色为主，夹杂土黄与赭红色旧砖，砖缝白灰；城楼柱、枋、格扇朱红，雀替与额枋青绿彩画点金，屋面… | ready | 0 | 等待有 imagegen 的会话生图 |
| hb_taihui | 荆州太晖观 · 朝圣门、阙楼与祖师殿正面（高台金顶）；明 · 1393年重建（year=1393）；国保第6批「荆州三观」组成部分；依据：维基百科：太晖观等1条 | `hb_taihui-photo.jpg` Zhangzhugang，CC BY-SA 3.0；已用 Read 查看原图并裁图核数 | 4条检查点：底部：高大的红褐色砖砌台基，正面分为左右两座塔楼状体量（阙楼）与中央略凹进的门段；两座阙楼上部各开一扇半圆拱窗，顶覆黄琉…；材质：台基与阙楼墙面为红褐色（砖砌抹灰，局部露青砖）；屋面黄色琉璃瓦，脊饰灰色；门楼檐下斗栱青绿，额枋暗红… | ready | 0 | 等待有 imagegen 的会话生图 |
| hb_zhongxiang_wenfeng | 钟祥文风塔 · 覆钵式砖塔全貌（正南面）；明 · 1389年重建（880年始建）（year=1389）；国保第6批「钟祥文风塔」独立单位；依据：维基百科：钟祥文风塔等1条 | `hb_zhongxiang_wenfeng-photo.jpg` 三猎，CC BY-SA 4.0；已用 Read 查看原图并裁图核数 | 4条检查点：自下而上：八角形塔基（照片下部被铁丝网与草木遮挡，资料记三层收砌，线稿可简化为一座八角台座）；其上为钟形覆钵塔身，正面开…；材质：塔身通体刷白（略泛黄），相轮环间砖雕呈浅赭；宝盖与刹杆为深褐色铁件，铜铃深色；塔基露出青砖处灰色。… | ready | 0 | 等待有 imagegen 的会话生图 |
| hb_huanghelou | 黄鹤楼 · 1985年重建主楼正面（黄鹤楼匾一侧）；近现代 · 1985年重建（223年始建）（year=1985）；未贴国保标签（unconfirmed）；依据：维基百科：黄鹤楼；黄鹤楼公园官方网站等2条 | `hb_huanghelou-photo.jpg` 螺钉，CC BY-SA 4.0；`hb_huanghelou-2-photo.jpg` Nature42，CC0（另一侧（“楚天极目”匾面）近景，核对…）；已用 Read 查看原图并裁图核数 | 4条检查点：主楼五层，每层四面出檐，各面中央凸出一座歇山山面朝前的抱厦顶，两侧各一个翘角，因此每层正面可见三个翘角；五层檐口自下而上…；材质：屋面黄色琉璃瓦，檐口翘角处带绿色琉璃剪边；木构、栏杆与柱均为深赭红色；檐下斗栱与彩画青绿；台基与栏杆… | ready | 0 | 等待有 imagegen 的会话生图 |
| hb_ezhou_guanyin | 鄂州观音阁 · 龙蟠矶上的殿阁南立面（自南岸平视）；元 · 1345年始建 · 明清重修（year=1345）；国保第6批「鄂州观音阁」独立单位；依据：维基百科：鄂州观音阁等1条 | `hb_ezhou_guanyin-photo.jpg` Huangchenhai，CC BY-SA 4.0；`hb_ezhou_guanyin-2-photo.jpg` Walter Grassroot，CC0（远景全貌（CC0），核对礁石与建筑的…）；`hb_ezhou_guanyin-3-photo.jpg` Saigyouji-Noriko，CC BY-SA 4.0（2024年汛期近景，核对屋顶、宝顶与…）；已用 Read 查看原图并裁图核数 | 5条检查点：整体：自南岸平视的长条形立面，坐落在裸露的褐色礁石（龙蟠矶）上；下部为红砂岩砌的挡土高墙，上部为白粉墙的殿阁，灰瓦屋顶，…；材质：殿阁墙面白色粉刷（略泛黄、有水渍），下部挡土墙为红褐色砂岩块石，礁石土黄与褐色；屋面青灰色小瓦，封火… | ready | 0 | 等待有 imagegen 的会话生图 |
| hb_wanshou_pagoda | 荆州万寿宝塔 · 八角七层砖塔全貌（自塔坑边南望）；明 · 1548–1552年建（year=1548）；国保第6批「荆州万寿宝塔」独立单位；依据：维基百科：万寿宝塔等1条 | `hb_wanshou_pagoda-photo.jpg` Zhangzhugang，CC BY-SA 3.0；`hb_wanshou_pagoda-2-photo.jpg` Zhangzhugang，CC BY-SA 3.0（自远处平视的全塔，核对七层腰檐、塔刹…）；`hb_wanshou_pagoda-3-photo.jpg` Zhangzhugang，CC BY-SA 3.0（底层近景，核对佛龛、力士与门额位置…）；已用 Read 查看原图并裁图核数 | 4条检查点：八角形平面、七层：每层以一道出挑的腰檐（檐下一排砖雕仿木斗栱）和其上的平座分层，层高自下而上递减，塔身逐层收分；主图自上…；材质：塔身青灰色砖砌，砖面风化泛白、带苔痕；腰檐与斗栱砖色略深；佛龛内石像灰白；底层石砌须弥座灰褐；塔刹灰… | ready | 0 | 等待有 imagegen 的会话生图 |
| hu_yuelu | 岳麓书院 · 大门正面（白墙青瓦、惟楚有材联）；清 · 1868年重建大门（976年创院）（year=1868）；国保第3批「岳麓书院」组成部分；依据：维基百科：岳麓书院；湖南大学岳麓书院·书院古建等3条 | `hu_yuelu-photo.jpg` Zhangzhugang，CC BY-SA 4.0；`hu_yuelu-2-photo.jpg` EditQ，CC BY-SA 4.0（讲堂正面（上一轮下载的备用主体，本批…）；`hu_yuelu-3-photo.jpg` Zhangzhugang，CC BY-SA 4.0（大门近景（竖幅），核对抱鼓石、匾额与…）；已用 Read 查看原图并裁图核数 | 4条检查点：单层、硬山灰瓦顶，屋脊为一道镂空的花脊（琉璃构件拼成的连续图案），檐口一排黄绿琉璃沟头滴水；屋面正面坡较长，檐下露出椽头…；材质：墙面白色粉刷；屋面青灰色筒瓦，花脊与滴水黄、绿、蓝琉璃；门扇与匾额黑色，匾文与边框金色；石柱与抱鼓石… | ready | 0 | 等待有 imagegen 的会话生图 |
| hu_liuyang_wenmiao | 浏阳文庙 · 大成殿正面与月台；清 · 1843年重建（year=1843）；国保第7批「浏阳文庙」组成部分；依据：维基百科：浏阳文庙；人民网转载长沙晚报《浏阳文庙祭孔古乐濒危 曾国藩曾派人学习》等3条 | `hu_liuyang_wenmiao-photo.jpg` Huangdan2060，CC BY 3.0；`hu_liuyang_wenmiao-2-photo.jpg` Huangdan2060，CC BY 3.0（正面近景，核对六根石柱、五间格扇与上…）；已用 Read 查看原图并裁图核数 | 4条检查点：大成殿两重檐：上檐歇山，正脊中央一座葫芦形宝顶、两端鸱吻，垂脊端部有小兽；上层殿身为一排连续的木格栅板，正中嵌竖匾（留白…；材质：屋面黄绿色琉璃瓦（黄瓦为主、绿色剪边，瓦面带苔），脊饰灰黑；木构格扇与檐柱间板壁深褐近黑，上层格栅板… | ready | 0 | 等待有 imagegen 的会话生图 |
| hu_cishi | 岳阳慈氏塔 · 七级八角砖塔全貌；宋 · 1066（塔刹铭文）（year=1066）；国保第7批「慈氏塔」独立单位；依据：维基百科：慈氏塔等1条 | `hu_cishi-photo.jpg` Saigyouji-Noriko，CC BY-SA 4.0；`hu_cishi-2-photo.jpg` ZSong，CC BY-SA 3.0（街巷仰视近景（2012年），核对各层…）；已用 Read 查看原图并裁图核数 | 5条检查点：八角七层，底层最高，往上逐层变矮、面阔逐层内收；每层以一道叠涩出挑的檐分隔，檐上贴青瓦，檐下有堆塑莲花（线稿以细线示意）…；材质：塔身青砖砌筑，风化后呈灰褐与青灰色，砖缝黄砂泥浆略泛黄；檐上青瓦深灰，堆塑莲花灰白；塔基花岗石浅灰；… | ready | 0 | 等待有 imagegen 的会话生图 |
| hu_kaifu | 见 `hu_kaifu.json` blocked_reason | — | — | blocked | 0 | 阻塞：缺主体正面照片：Commons 分类 Kaifu Temple 共58件，大雄宝殿（清光绪重建、重檐歇山、高20米、圆形石柱）仅有 Huangdan2060 2017年斜侧近景一张（Mahavira Hall, Kaif… |
| hb_yuquan_hall | 见 `hb_yuquan_hall.json` blocked_reason | — | — | blocked | 0 | 阻塞：缺主体照片与年代依据：Commons 分类 Yuquan Temple (Dangyang) 共20件（Fxqf 2017/2020、Chiangdm 2006），均为山门、三圆门、铁塔、银杏、碑刻与院景，Fxqf 20… |
| hb_wuzu | 见 `hb_wuzu.json` blocked_reason | — | — | blocked | 0 | 阻塞：缺可用正面照片与现存殿宇年代：Commons 分类 Wuzu Temple 共30件（Rowingbohe 2019年2月，CC BY-SA 4.0），已下载 1600px 预览逐张查看：真身殿为斜向仰视且人群遮挡（A … |
| hb_changchun | 见 `hb_changchun.json` blocked_reason | — | — | blocked | 0 | 阻塞：照片不足：Commons 分类 Changchun Temple (Wuhan) 60件（Vmenkov 2008/2011，CC BY-SA 3.0；Wangyou0720 2007 公有领域），山门正面照仅 682×… |
| hu_shigu | 见 `hu_shigu.json` blocked_reason | — | — | blocked | 0 | 阻塞：照片过小且主体为2006年重建：Commons 相关照片中大观楼与正门（人間正道 2007/2013，CC BY-SA 3.0）仅 618×468、500×320 像素，Shigu-Academy.jpg（公有领域 12… |
| hu_laosicheng | 见 `hu_laosicheng.json` blocked_reason | — | — | blocked | 0 | 阻塞：Commons 无照片：检索“老司城”“Laosicheng”“Tusi site Yongshun”仅得芙蓉镇全景与湖南地图，无祖师殿或遗址任何照片。国保：维基百科湖南列表记第五批“老司城遗址”（古遗址，五代—清），本… |
| hu_matian | 见 `hu_matian.json` blocked_reason | — | — | blocked | 0 | 阻塞：Commons 无照片：检索“马田鼓楼”“Matian drum tower”“Tongdao drum tower”均无结果。国保：上一轮 OCR 的第四批公报页（r4/p-26）中见“马田鼓楼 · 清”，本会话未逐页… |
| hu_shanggantang | 见 `hu_shanggantang.json` blocked_reason | — | — | blocked | 0 | 阻塞：Commons 无照片：检索“上甘棠”“Shanggantang”“Jiangyong village ancient”均无结果。国保第六批 编号670 Ⅲ-373 上甘棠村古建筑群（明至清，湖南省江永县）已在 batc… |
| hu_huangsiqiao | 见 `hu_huangsiqiao.json` blocked_reason | — | — | blocked | 0 | 阻塞：Commons 无照片：检索“黄丝桥”“Huangsiqiao”“Huangsi Bridge ancient city Fenghuang”均无结果；维基百科湖南国保列表亦无黄丝桥古城条目（国保身份未确认）。恢复条件：… |
| hu_chaling | 见 `hu_chaling.json` blocked_reason | — | — | blocked | 0 | 阻塞：照片过小：Commons 仅 Allervous 2020 年的 Gate of Chaling.jpg（592×353）与 The defensive walls, old Chaling town.jpg（591×3… |

说明：
- 10 处 ready 共 21 张照片，全部来自 Wikimedia Commons：CC BY-SA 4.0 ×11、CC BY-SA 3.0 ×6、CC BY 3.0 ×2、CC0 ×2；元数据（作者、许可、许可链接、拍摄日期、原图 URL）经 Commons API 取得，上一轮下载的 14 张已用 SHA-1 反查 Commons 确认文件身份，本轮新下载 12 张逐张校验 SHA-1 一致。
- `dyn` 仅用现有键：明·清（荆州城墙、襄阳城墙、太晖观、文风塔、万寿宝塔、岳麓书院、浏阳文庙）、元（鄂州观音阁）、宋（慈氏塔）、近现代（黄鹤楼 1985 年重建）。无需新增时代、地区或省份。
- 需新增地点 6 处：hb_jingzhou（荆州，供 hb_jingzhou_wall/hb_taihui/hb_wanshou_pagoda）、hb_xiangyang（襄阳，供 hb_xiangyang_wall）、hb_wuhan（武汉，供 hb_huanghelou）、hb_ezhou（鄂州，供 hb_ezhou_guanyin）、hu_changsha（长沙，供 hu_yuelu）、hu_liuyang（浏阳，供 hu_liuyang_wenmiao）；文风塔复用既有 hb_zhongxiang（显示点在显陵），慈氏塔复用既有 hu_yueyang_city（岳阳楼显示点）。坐标均为 Wikidata 本体近似坐标，非测绘。
- 荆州城墙所绘含 1987 年重建的宾阳楼、岳麓书院取大门而非讲堂、慈氏塔年份取 2015 年铭文 1066 年而非旧说 1242 年、临汉门城楼取 1826 年重修（另有 1648 年重建说），均已写入各 JSON `yearNote`，如需改动请用户确认。
- 上一轮已下载但本批改作备用或阻塞的照片：`hu_yuelu-2-photo.jpg`（讲堂）、`hu_kaifu-*-photo.jpg`（开福寺大悲殿／大雄宝殿斜侧），已在对应 JSON 登记，无孤儿文件。

## 在途及结果记录

| id | 线稿/设色 | 工具返回的任务或调用标识 | started_at | completed_at（未知则留空） | received_at | 原件路径 | 结果/失败原因/下次策略 |
| --- | --- | --- | --- | --- | --- | --- | --- |

（空：本会话没有 imagegen，没有发起任何生成调用。）

## 并发调整

| at | 原目标→新目标 | 错误信号/原因 | 冷却至 | 尚在途数量 | 恢复结果 |
| --- | --- | --- | --- | --- | --- |

（空：未发起生成，无并发调整。）

## 检索收口

- 预算：每处首轮 3–5 分钟或 2 轮查询。用户候选 17 个方向中，8 个方向在预算内取得照片与年代；玉泉寺大殿、五祖寺、长春观、石鼓书院、老司城、马田鼓楼、上甘棠、黄丝桥、茶陵在 Commons 分类／检索两轮内无可用照片或仅有低分辨率、斜视、人群遮挡照片，按手册标 blocked；开福寺因大雄宝殿无正面照、大悲殿为新建而阻塞。为凑足 10 处，从湖北／湖南国保名单补入鄂州观音阁、荆州万寿宝塔、岳阳慈氏塔三处（均 Commons 有授权正面照，国保已核）。
- 实际问题：
  - WebSearch 会话额度已耗尽（200/200），改用 DuckDuckGo HTML 页（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/ddg.py`）取得宾阳楼、临汉门、真身殿、开福寺、岳麓讲堂的检索摘要；百度百科直接访问 403、baike.baidu.hk 跳回主站、Bing／搜狗搜索页无结果或反爬，故百度百科数据（宾阳楼尺寸、临汉门 1648 年与四柱三间、开福寺 1887 年）只以“检索摘要取得、未直接核读”登记。
  - `jzgcly.com`（荆州古城旅游区）HTTPS 证书过期，WebFetch 失败，改用 `curl -k` 读取正文核对宾阳楼 1986–1987 年重建。
  - 临汉门城楼重修年代各源不一（百度百科 1648 年重建；搜狐与新浪博客 1826 年周凯重修；搜狗摘要称 1648 年重建、1826 年重修、1952 年依原样修复），JSON 取 1826 年并保留两说。
  - 慈氏塔第七批编号不在上一轮渲染的第 70–92 页内，用 `pdftoppm` 补渲染第 58–69 页并以 macOS Vision OCR（`/private/tmp/claude-501/-Users-fuxiangyu-Workspace-fanggu--claude-worktrees-unlimited-token-budget-suggestions-4576ae/80588dfa-0005-4f7d-b9bd-33dea6f77f00/scratchpad/ocr/ocr`）定位到第 69 页（7-1229-3-527）。
  - 国保公报扫描 PDF 无文字层，`pdftotext` 为空；OCR 文本对“襄阳城墙”“荆州城墙”误识别，均改为查看渲染页图片确认编号。
  - 浏阳文庙大成殿的开间、太晖观祖师殿的尺寸未找到可读来源，结构检查点以照片裁图计数为准并在 facts 中注明“据照片”。
  - 上一轮缓存的人民网两页（浏阳文庙祭孔古乐）URL 按缓存文件名推定，本会话未重新打开。

## 最终交付

- finished_at、墙钟耗时：2026-10-05T23:01+09:00；上一轮约 70 分钟（02:50–04:04，含被中断的检索），本续做会话约 60 分钟；不含生图。
- 生成调用总数、返工数；服务耗时：0 / 0；无（本会话无 imagegen）。
- 峰值在途数量、最终有效并发、降档原因及服务失败数：0 / 0 / 无 / 0。
- 阶段时间窗及超预算原因；用户等待/服务异常单列：资料阶段 22:10–23:01；超预算项为临汉门年代（多源冲突，约 12 分钟）与慈氏塔编号定位（补渲染 PDF，约 6 分钟）；无用户等待；WebSearch 额度耗尽属会话限制而非服务异常。
- 新增、复用、阻塞的 ID；默认通过（`approved_default`）数量 / 用户明确通过（`approved_user`）数量：新增 ready 10（hb_jingzhou_wall、hb_xiangyang_wall、hb_taihui、hb_zhongxiang_wenfeng、hb_huanghelou、hb_ezhou_guanyin、hb_wanshou_pagoda、hu_yuelu、hu_liuyang_wenmiao、hu_cishi）；复用 0；阻塞 10（hu_kaifu、hb_yuquan_hall、hb_wuzu、hb_changchun、hu_shigu、hu_laosicheng、hu_matian、hu_shanggantang、hu_huangsiqiao、hu_chaling）；0 / 0（未生图）。
- 实际检查命令及结果、浏览器检查范围、未验证项：`python3 gen.py` 校验 10 处 lede 90–150 字、facts 恰 3 条且 45–90 字、照片文件存在与许可类型通过；`python3 -m json.tool` 逐个解析 20 个 JSON 通过；ID 与 ids.txt 逐一 grep 无重复。未运行 Node 测试、未重建目录、未开审图服务器（本批不接入 sites.js）。未验证项：百度百科来源的数字未直接核读；浏阳文庙开间与太晖观屋顶层次仅据照片。
- 素材是否备份/发布、代码是否提交：未备份、未发布、未提交；未运行 git。
- 下一步：等待有 imagegen 的会话按各 JSON `prompt` 与 `reference_files` 生图（线稿→设色），然后按手册第 5 节接入 `sites.js`、`national-protection.json`（9 条 entries、黄鹤楼 untagged）、新增 6 个地点与 i18n 译文。
