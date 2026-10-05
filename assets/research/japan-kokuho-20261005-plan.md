# 本批新增计划

- 批次名：japan-kokuho-20261005
- 用户约定范围及分支：日本近畿以外的国宝建造物，目标 10 处（至少 8 处 ready），兼顾塔、天守、神社、佛堂；净土寺净土堂（兵库县，近畿）按用户候选名单补收。分支 `claude/unlimited-token-budget-suggestions-4576ae`（worktree）；本会话只新建候选、计划与 intake，不改既有仓库文件，不运行 git、生图、去底或转码脚本。
- started_at：约 2026-10-05T22:14+09:00（本会话接续上一轮代理的照片下载；上一轮起止时间未知）
- 基线来源：`$S/ref/ids.txt` 共 477 个目录 ID，其中日本条目 64 个；本批 15 个候选 ID 均不在其中（已逐一查重）。队列与 AVIF 清单未读取（本会话不生图）。
- 候选来源：文化厅「国指定文化財等データベース」（online.bunka.go.jp / kunishitei.bunka.go.jp）逐条核实国宝指定、指定日与「構造及び形式等」；ja.wikipedia 补充年轮年代、尺寸与沿革；坐标取 ja.wikipedia GeoData。每项的正式名、指定日、所绘主体范围与来源见各候选 JSON 的 `protection.designation`、`historical_sources`、`subject`。不贴中国国保标签（`protection.status: not_applicable`）。
- 生图起始并发目标：8（线稿与设色合计）；本会话无 imagegen，未启动任何生成。
- 本次交付范围：本地候选文件 `assets/research/candidates/japan-kokuho-20261005/*.json`（15 份）、参考照片 `assets/references/jp_*`（上一轮下载，本轮核对许可与内容）、本计划、`$S/expansion/japan-kokuho-20261005-intake.json`。不接入 `sites.js`/`catalog.js`，不发布。

| id | 所绘主体/范围、年代依据 | 已查看照片及来源 | 结构检查点、材质色 | 阶段 | 生成次数 | 下一步/阻塞原因 |
| --- | --- | --- | --- | --- | --- | --- |
| jp_chusonji_konjikido | 中尊寺 · 金色堂；1124年完成（[年代依据](https://online.bunka.go.jp/heritages/detail/199039)）；landscape 1536×1024 | 无可用照片（见阻塞原因） | （待照片）方三间一间四面堂，单层宝形造，顶上宝珠；木瓦葺（本瓦形板葺）。；（待照片）丸柱，柱头平三斗，中备本蟇股；二轩角繁垂木，檐口反势强；四周缘侧。；材质：据文化厅解说：堂内外黑漆押金箔，内阵螺钿宝相华唐草、蒔绘菩萨像与饰金具；未经照片核对。 | blocked | 0 | 阻塞：缺少可用的自由许可本体照片：金色堂自镰仓时代起置于覆堂内，现藏1965年新覆堂（钢筋混凝土），堂内禁止摄影。 |
| jp_zuiganji_hondo | 瑞岩寺 · 本堂正面；1609年上栋（[年代依据](https://online.bunka.go.jp/heritages/detail/173372)）；landscape 1536×1024 | [jp_zuiganji_hondo-photo.jpg](https://commons.wikimedia.org/wiki/File:Zuigan-ji_Hondo_202506.jpg) 掬茶 · CC BY-SA 4.0；[jp_zuiganji_hondo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Main_Hall,_Zuiganji_201227.jpg) Suicasmo · CC BY-SA 4.0 | 单层，一座入母屋造本瓦葺大屋顶，正脊长直，山面在左右两端；屋面灰瓦，檐口平直。；正面桁行十三间（文化厅记录），照片中为成对板门/障子与细柱连续排列，门上一道连续的格子欄间带，再上为白灰壁。；材质：素木灰褐色木构，门上白灰壁，灰色本瓦屋面；前庭白砂、绿树与石灯笼均去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_osaki_hachimangu | 大崎八幡宫 · 拜殿正面；约1607年建成（[年代依据](https://online.bunka.go.jp/heritages/detail/184266)）；landscape 1536×1024 | [jp_osaki_hachimangu-photo.jpg](https://commons.wikimedia.org/wiki/File:Osaki_Hachiman-gu_20130819a.jpg) Tak1701d · CC BY-SA 3.0；[jp_osaki_hachimangu-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Osakimachimangu.JPG) ジダネ · Public domain | 拜殿单层入母屋造柿葺，正面屋坡中央一座大千鸟破风（三角形），破风内金色饰件；其下为五间向拝，向拝前檐中央一座轩唐破风（曲线形）。；拜殿正面七间（文化厅记录），前檐下为开敞柱列；檐下一道雕刻彩绘的饰带；中央垂三条铃绳；阶前短石阶。；材质：黑漆壁柱，金箔饰件与金具，彩绘雕刻（红、蓝、绿）饰带，灰褐色柿葺屋面，白石阶。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_haguro_pagoda | 羽黑山五重塔 · 素木五重塔；约1372年重建（[年代依据](https://online.bunka.go.jp/heritages/detail/199129)）；portrait 1024×1536 | [jp_haguro_pagoda-photo.jpg](https://commons.wikimedia.org/wiki/File:2023.04.23_Five-storied_Pagoda,_Haguro-san_2.jpg) YedidyaPopper · CC BY 4.0；[jp_haguro_pagoda-2-photo.jpg](https://commons.wikimedia.org/wiki/File:%E5%87%BA%E7%BE%BD%E4%B8%89%E5%B1%B1%E7%A5%9E%E7%A4%BE%E4%BA%94%E9%87%8D%E5%A1%9420221015-IMG_4041.jpg) くろふね · CC BY 4.0 | 五层屋檐（五重），每层三间，自下而上逐层收分；屋面为薄柿葺，檐角微翘。；每层檐下为密集斗栱组，无回缘高栏；初重正面中央一扇格子门，两侧为板壁。；材质：风化成银灰色的素木柱壁，灰褐色柿葺屋面，深灰铜色相轮；周围杉林、石灯笼、石板路去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_zenkoji_hondo | 善光寺 · 本堂正面；1707年再建（[年代依据](https://online.bunka.go.jp/heritages/detail/121917)）；landscape 1536×1024 | [jp_zenkoji_hondo-photo.jpg](https://commons.wikimedia.org/wiki/File:Main_Hall,_Zenkoji_20201120.jpg) Suicasmo · CC BY-SA 4.0；[jp_zenkoji_hondo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Main_Hall_of_Zenk%C5%8D-ji_1.jpg) Christophe95 · CC BY-SA 4.0 | 正面为山面（妻入）：上层入母屋大屋顶的三角形山花朝前，山花内金色饰件；其下一圈裳阶屋顶环绕，比上层屋顶更宽。；裳阶前檐中央为三间向拝，向拝檐口一座轩唐破风（曲线形）；两侧面各有一间向拝（侧面不入画）。；材质：深褐色风化木构，灰褐色桧皮葺屋面，山花与破风饰件金色，白幕（去除），灰石阶。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_anrakuji_pagoda | 安乐寺 · 八角三重塔；镰仓后期 · 约1290年代（[年代依据](https://online.bunka.go.jp/heritages/detail/188773)）；portrait 1024×1536 | [jp_anrakuji_pagoda-photo.jpg](https://commons.wikimedia.org/wiki/File:260828_Anraku-ji_Ueda_Nagano_pref_Japan26s3.jpg) 663highland · CC BY-SA 4.0；[jp_anrakuji_pagoda-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Anrakuji_Hakkakusanjyuunotou_BessyoOnsen.jpg) Rsa · CC BY-SA 3.0 | 八角平面，共四层屋面：最下一层为裳阶，其上三层为塔身三重；屋面柿葺，坡度平缓。；初重裳阶下为板壁与门窗，裳阶以上各重檐下为密集的詰组斗栱、放射状垂木。；材质：深褐色风化木构，灰褐色柿葺屋面、檐下裏板略带红褐，深色铜质相轮；林木、石栅与墓石去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_daizenji_hondo | 大善寺 · 本堂正面；1286年建立（[年代依据](https://kunishitei.bunka.go.jp/heritage/detail/102/882)）；landscape 1536×1024 | [jp_daizenji_hondo-photo.jpg](https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E5%96%84%E5%AF%BA_%E5%B1%B1%E6%A2%A8%E7%9C%8C.jpg) NMaia · CC BY-SA 4.0；[jp_daizenji_hondo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Daizen-ji-4a.jpg) 江戸村のとくぞう · CC BY-SA 4.0 | 单层，一座寄栋造（四坡）桧皮葺大屋顶，屋脊短而中央有小箱棟；屋面红褐色，无瓦垄。；正面五间：中央三间为对开板门（照片中开启），两端两间为板壁上加格子窗；方柱，柱头舟肘木，无斗栱。；材质：深褐色风化木构，红褐色桧皮葺屋面，灰白石阶与台基；白砂地与绿植去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_eihoji_kannondo | 永保寺 · 观音堂正面；室町前期（南北朝期）建立（[年代依据](https://online.bunka.go.jp/heritages/detail/121854)）；landscape 1536×1024 | [jp_eihoji_kannondo-photo.jpg](https://commons.wikimedia.org/wiki/File:Kokeizan_Eih%C5%8D-ji_Temple_20221127_13.jpg) 先従隗始 · CC0；[jp_eihoji_kannondo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Kokeizan-kannondo4.jpg) Y.Torayama · Public domain | 方三间主屋外加一圈裳阶，故外观为上下两层屋面：上为入母屋造，下为裳阶披檐；均桧皮葺，上层檐角翘起明显。；正面吹放：外圈四根细柱之间无门，内侧可见栈唐户与弓欄间（格子透窗）；组物仅柱头出组，不作詰组。；材质：深褐色木构，灰褐色桧皮葺上下屋面，浅灰石台基；蓝天与树木去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_zuiryuji_butsuden | 瑞龙寺 · 佛殿正面；1659年竣工（[年代依据](https://online.bunka.go.jp/heritages/detail/193370)）；landscape 1536×1024 | [jp_zuiryuji_butsuden-photo.jpg](https://commons.wikimedia.org/wiki/File:Zuiryuji_Temple_2010-08-29_02.jpg) 柑橘類 (talk) · CC BY-SA 3.0；[jp_zuiryuji_butsuden-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Butsuden_Hall_of_Zuiryuji_Temple.JPG) そらみみ · CC BY-SA 4.0 | 方三间主屋加裳阶：上为入母屋造大屋顶，下为裳阶披檐，两层屋面均铺铅瓦（银灰色瓦垄，画法同普通瓦）；上层屋脊两端鬼瓦、檐角翘起。；上层檐下密集詰组斗栱；裳阶正面中央三间为栈唐户门，两端为板壁。；材质：深褐色木构，银灰色铅瓦屋面，回廊白灰壁、深色木骨，灰石台基；绿草坪与蓝天去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_matsumoto_tenshu | 松本城 · 大天守与连结天守群；约1615年（文化厅）· 另说1594–1599年（[年代依据](https://online.bunka.go.jp/heritages/detail/193580)）；landscape 1536×1024 | [jp_matsumoto_tenshu-photo.jpg](https://commons.wikimedia.org/wiki/File:%E6%9D%BE%E6%9C%AC%E5%9F%8E%E5%A4%A9%E5%AE%88%EF%BC%91.jpg) Hiroaki Kikuchi · CC0；[jp_matsumoto_tenshu-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Matsumoto_Matsumoto-jo_05.jpg) Zairon · CC BY-SA 4.0 | 大天守自外观数恰五层屋檐（五重六阶）；每层下半为黑色下见板、上半为白灰壁，线稿只勾分界，不作黑色填充；本瓦葺灰瓦，顶层入母屋带鯱。；南面第三重设三角形千鸟破风，另有唐破风（照片2可见于西面第四重位置），按照片位置绘制。；材质：黑漆下见板、白灰壁，灰色本瓦，青灰石垣，月见橹朱漆高栏，鯱为金铜色；水面、云、山与树去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_inuyama_tenshu | 犬山城 · 天守正面；1601年筑橹 · 约1620年加望楼（[年代依据](https://online.bunka.go.jp/heritages/detail/200169)）；landscape 1536×1024 | [jp_inuyama_tenshu-photo.jpg](https://commons.wikimedia.org/wiki/File:Inuyama_Castle_Keep_Tower_2018.jpg) Suikotei · CC BY-SA 4.0；[jp_inuyama_tenshu-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Inuyama_Castle_Keep_Tower_20170409.jpg) Suicasmo · CC BY-SA 4.0 | 三层屋檐、四层楼身：下两层共用一座入母屋大屋顶（第一重），其下墙面下段为深色板壁、上段白灰壁开小窗；第三层楼身正面带一座唐破风（第二重）；最上层望楼四周开敞回缘加高栏，入母屋顶带鯱。；南面附橹一重，深色板壁，接于天守右侧；天守立于野面积石垣（约5米）之上。；材质：白灰壁、深褐色板壁，灰色本瓦，金黄褐色野面积石垣；天空与树木去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_izumo_honden | 出云大社 · 本殿（瑞垣外所见）；1744年造营（[年代依据](https://online.bunka.go.jp/heritages/detail/146668)）；landscape 1536×1024 | [jp_izumo_honden-photo.jpg](https://commons.wikimedia.org/wiki/File:The_main_shrine,_Izumo-taisha_(35933485350).jpg) Big Ben in Japan from Kawasaki, Japan · CC BY-SA 2.0；[jp_izumo_honden-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Izumo_Taisha_20170126-6.jpg) Suicasmo · CC BY-SA 4.0 | 本殿为切妻妻入的大社造：山面朝向观者，桧皮葺屋面曲线内凹而陡，屋脊两端各一组交叉千木，脊上三根胜男木。；素木板壁，外圈有带高栏的缘（照片中仅见上部）；破风板与悬鱼有绿色金具点缀。；材质：深灰褐色桧皮葺屋面，银灰色素木板壁，深色千木与胜男木，绿色金具点缀，深褐色瑞垣；天空与树木去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_sanbutsuji_nageiredo | 三佛寺 · 投入堂；平安后期 · 用材伐于1165年（[年代依据](https://online.bunka.go.jp/heritages/detail/123947)）；landscape 1536×1024 | [jp_sanbutsuji_nageiredo-photo.jpg](https://commons.wikimedia.org/wiki/File:Sanbutsu-ji,_nageiredou-1-1.jpg) Saigen Jiro · CC0；[jp_sanbutsuji_nageiredo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:Sanbutsu-ji,_nageiredou-2-1.jpg) Saigen Jiro · CC0 | 小堂嵌于岩壁凹处，床下一排细长的悬造长柱与斜撑落在倾斜岩面上；柱极长，是识别特征。；流造屋顶（不对称两坡，前坡长），两侧加庇屋顶与隅庇，桧皮葺；正面一道带高栏的缘。；材质：极浅的银灰色素木，灰褐色桧皮葺屋面，灰色岩石；绿色植被去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_fukiji_odo | 富贵寺 · 大堂正面；平安后期建立（[年代依据](https://online.bunka.go.jp/heritages/detail/124404)）；landscape 1536×1024 | [jp_fukiji_odo-photo.jpg](https://commons.wikimedia.org/wiki/File:%E5%AF%8C%E8%B2%B4%E5%AF%BA_%E5%A4%A7%E5%A0%82.JPG) JNN360 · CC BY-SA 4.0；[jp_fukiji_odo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:%E5%AF%8C%E8%B2%B4%E5%AF%BA%E5%A4%A7%E5%A0%82.JPG) JNN360 · CC BY-SA 4.0 | 单层，一座宝形造（四坡攒尖）屋顶，顶上露盘宝珠；屋面为行基葺圆瓦，瓦列粗壮，线稿稀疏示意即可。；正面三间，每间一对板扉；方柱，柱头舟肘木，一道素枋，无斗栱。；材质：银灰色风化木构与板扉，灰色瓦，灰石台基；林木与沙地去除。 | ready | 0 | 等待有 imagegen 的会话生图 |
| jp_jodoji_jododo | 净土寺 · 净土堂东面；1192年建立（[年代依据](https://online.bunka.go.jp/heritages/detail/147581)）；landscape 1536×1024 | [jp_jodoji_jododo-photo.jpg](https://commons.wikimedia.org/wiki/File:Jodoji_Temple_Jodo_Hall.JPG) KishujiRapid · CC BY-SA 4.0；[jp_jodoji_jododo-2-photo.jpg](https://commons.wikimedia.org/wiki/File:J%C5%8Ddo-ji,_J%C5%8Ddo_Hall_001.jpg) Naokijp · CC BY-SA 4.0 | 单层方三间，一座宝形造本瓦葺屋顶，顶上宝珠；檐口完全平直无反翘，垂木端钉鼻隐板。；东面（入口面，照片2右侧立面）三间各纳一对栈唐户，门两侧立小脇柱；圆柱，檐下插肘木层叠；南北面中央为连子窗（不作正面）。；材质：朱红（丹涂）柱梁与斗栱，白灰壁，灰色本瓦，深色宝珠，灰石台基；樱花与天空去除。 | ready | 0 | 等待有 imagegen 的会话生图 |

## 在途及结果记录

| id | 线稿/设色 | 工具返回的任务或调用标识 | started_at | completed_at（未知则留空） | received_at | 原件路径 | 结果/失败原因/下次策略 |
| --- | --- | --- | --- | --- | --- | --- | --- |

（本会话无 imagegen 工具，未发起任何生成调用；表留空。）

## 并发调整

| at | 原目标→新目标 | 错误信号/原因 | 冷却至 | 尚在途数量 | 恢复结果 |
| --- | --- | --- | --- | --- | --- |

（无生成调用，无并发事件。）

## 检索收口与实际问题

- 中尊寺金色堂：本体置于 1965 年新覆堂内、禁止摄影；Commons 分类与检索共 21 件逐一查看，全部为覆堂外观、旧覆堂旧照（448×353）、工艺菓子模型、堂内佛坛或堂内具，无本体外观 → `blocked`，资料与文字已就绪，恢复条件写在 JSON。
- 大善寺本堂：上一轮数据库检索命中两条同名民俗文化财（藤切祭、玉垂宫鬼夜）；本轮经 WebSearch 定位 kunishitei 102/882 与 online 174122，确认 弘安九年（1286）、五间五间寄栋造桧皮葺、国宝 1955-06-22；数据库解说文把弘安九年写作一二八五，年号换算按 1286。
- 瑞岩寺：上一轮缓存的 7 条记录中只有 173372 为本堂（元方丈），其余为中门、五大堂、庫裏、御成门与两幅绘画误命中；本条只用 173372。
- 松本城天守年代：数据库「江户前期／1615頃」、解说文（国宝辞典）1594–1599、2025 年年轮 1596；按数据库分类归 `jp_edo`、年表点约 1615，异说保留在 yearNote 与 facts。
- 犬山城：数据库归桃山 1601，但望楼约 1620 增建，年表点取初建年并另述。
- 出云大社本殿：垣外只见上部，所绘为「瑞垣外所见」的局部主体，已在 subject/sub/facts 写明，不补画高床与阶梯；属已约定范围内的局部，若用户要求整殿需另找许可照片。
- 松本城主图（CC0）右侧月见橹带修缮脚手架，提示词要求去除；Zairon 直视图作为大天守层数核对。净土堂主图为东南角景，提示词指定取右侧东面立面。
- 照片查看：用上一轮生成的 1400px 复制件（`$S/work/review/`，与 `assets/references/` 原件同源）数间数/层数；原件最大 15 MB（安乐寺 663highland）。`jp_daizenji_hondo-photo.jpg` 原件含 EXIF 旋转，查看工具会按正向显示。
- 许可分布（主图+副图，共 28 张）：CC BY 4.0 2, CC BY-SA 2.0 1, CC BY-SA 3.0 3, CC BY-SA 4.0 16, CC0 4, Public domain 2；全部在允许范围内。
- 需在 `catalog.js` 新增地区 `jp_tohoku`（岩手县、宫城县、山形县）、`jp_chubu`（长野县、山梨县、岐阜县、富山县、爱知县）、`jp_kyushu`（大分县），并在 `jp_chugoku` 追加 岛根县、鸟取县；`PLACES` 新增 15 个城镇级显示点（见 intake）。无需新增时代键。
- 每处首轮检索控制在 5 分钟内；多数资料为上一轮已缓存，本轮主要做核对、计数与写作。

## 最终交付

- finished_at：2026-10-05T22:37+09:00；本会话墙钟约 23 分钟（资料核对、看图与写作，不含上一轮下载）。
- 生成调用总数 0、返工 0；服务耗时不适用（本会话无 imagegen）。
- 峰值在途 0、最终有效并发不适用、无降档、服务失败 0。
- 阶段时间窗：资料核对与看图约前 2/3，写作与落盘约后 1/3；无用户等待或服务异常。
- 新增候选 15 个：ready 14（jp_zuiganji_hondo, jp_osaki_hachimangu, jp_haguro_pagoda, jp_zenkoji_hondo, jp_anrakuji_pagoda, jp_daizenji_hondo, jp_eihoji_kannondo, jp_zuiryuji_butsuden, jp_matsumoto_tenshu, jp_inuyama_tenshu, jp_izumo_honden, jp_sanbutsuji_nageiredo, jp_fukiji_odo, jp_jodoji_jododo）；blocked 1（jp_chusonji_konjikido）；复用 0；`approved_default` / `approved_user` 均为 0（未生图）。
- 实际检查：每份 JSON 由脚本校验字段齐全、dyn/types 键合法、lede 90–150 字、facts 恰好 3 条 45–90 字、caption 2 条、参考文件存在、许可在允许集合内、placeKey 不与既有 PLACES 冲突；未运行 Node/Python 测试与浏览器审图（无需重建）。
- 素材未备份/发布；代码未提交；未修改任何既有仓库文件。
- 下一步：等待有 imagegen 的会话生图（按各 JSON 的 prompt、reference_files 与 orientation），随后再按手册第 5 节接入。
