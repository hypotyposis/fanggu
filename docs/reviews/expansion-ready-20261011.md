# 资料就绪候选扩收录：2026-10-11

本批41处全部完成生图、透明交付与目录接入，收录数从476增至517。中英日正文、文保范围、地点与地区术语完整；新条目均默认未到访。本批通过 `codex/expansion-ready-20261011` 提交并合并至 `main`；合并与推送状态以 Git 记录为准。

## 范围与产物

| 原候选批次 | 本批接入 | 保留阻塞 |
| --- | ---: | ---: |
| 东北 | 9 | 2 |
| 湖北湖南 | 7 | 10 |
| 西藏 | 11 | 1 |
| 日本国宝建造物 | 14 | 1 |

- 41张黑白线稿原件、41张白底设色原件保留在 `assets/generated/`、`assets/colored/`；41张朝代色透明线稿、41张透明设色 PNG 和41张 AVIF 已交付并同步 App。逐图记录保留实际提示词、输入照片、署名与许可、原件路径和哈希。
- 线稿、设色各41张通过默认命令记录为 `approved_default`；`approved_user` 各0张。实际输入与输出均查看过，AI未作质量通过/淘汰决定，也未冒称人眼验收。
- 恢复82张候选参考照，新增30个地图显示点；没有将近似地图点复制为本体坐标，目录中可用于附近提醒的本体坐标仍为原有88处。
- 新增日本 `jp_tohoku`、`jp_chubu`、`jp_kyushu`，在 `jp_chugoku` 加入岛根、鸟取；岩手县的金色堂尚未接入，不出现在有效省份选项。
- 25处核实国保标签，2处身份未确认而不贴标签，14处日本条目为中国国保制度不适用。非官方范围补充来源保留在研究 JSON 与 intake，官方登记字段沿用公报来源。
- 朝阳北塔历史失败记录完整归档；既有476处线稿与设色交付文件逐项哈希未变。

## 实际耗时与生图调度

- 开始：2026-10-11T19:41:11.307675+08:00；完成：2026-10-11T21:57:27.621740+08:00。
- 墙钟时间：136.3分钟（含恢复资料、查看照片、交叉生图、文字接入、去底转码、测试与备份）；没有把交叉阶段工具时间相加。
- 实际 imagegen 调用82次，线稿41次、设色41次；峰值并发8，服务失败0次、返工0次、降档0次。线稿返回并实际查看后启动其设色。
- 本地曾因一次性返回8张大图超出工具输出大小而失败，拆为两组后正常查看；这是显示调用问题，没有重复生图。
- 集中接入时国保生成器拒绝 intake 中20项非官方范围链接；将其保留到研究记录后重建成功，未放宽官方来源校验。
- 断代修正后重建对应线稿朝代色并重新绑定默认记录；未重新生图。

## 所绘主体的断代修正

候选中的创寺传统不直接代表现状建筑。原始候选保留，正式目录及英日译文同步修正：

| 条目 | 正式目录定位 |
| --- | --- |
| 哲蚌寺措钦大殿 | 1416年起营建的约略定位，保留明清扩建及现正立面各部年代未详 |
| 小昭寺主殿 | 1986年大修后现状；641年创寺、1474年三层格局另述 |
| 桑耶寺乌策大殿 | 1988年后重建阶段，年表1990仅为约略位置，竣工年未详 |
| 托林寺红殿 | 1028年扩建的约略定位，区分996年创寺与后世修缮 |
| 昌珠寺 | 1351年扩建的约略定位，保留14世纪格局、后加金顶与1980年代修复 |

哲蚌寺追加 [熊文彬、廖旸《中国藏学》研究摘要](https://ctrc.cbpt.cnki.net/portal/journal/portal/client/paper/3892ccf8f32f66e23fea768609bccb26) 与 [西藏自治区外事办公室资料](https://wsb.xizang.gov.cn/xzjx/lyjd/201107/t20110713_100953.html)。其他条目沿用并复核逐图记录的 [小昭寺](https://en.wikipedia.org/wiki/Ramoche_Temple)、[桑耶寺](https://en.wikipedia.org/wiki/Samye)、[托林寺](https://de.wikipedia.org/wiki/Thoding-Kloster)、[昌珠寺](https://en.wikipedia.org/wiki/Tradruk_Temple) 来源；这些年表位置的取舍是接入时对所绘主体的解释，不是新增的精确纪年证据。

## 实际执行与检查

按依赖顺序执行 `prepare-plates.mjs`、两轮 `prepare-colored-avif.py`、默认通过命令、`collect-colored-plates.mjs --require-complete`、`prepare-protection.mjs`、`build-catalog.cjs`、`sync-artwork.sh assets`；默认线稿命令未选中没有瞬时状态字段的新记录，随后按本批显式 ID 完成41张绑定。两条历史无原件的瞬时待通过记录仍保持原状，不属于本批。断代调整后只重建相关线稿与目录，最后用 `prepare-plates.mjs --sources-only` 更新来源页。

| 检查 | 本轮结果 |
| --- | --- |
| `node --test tests/*.test.cjs` | 最终135/135；新批次覆盖、透明交付、来源哈希、三语目录、地域、默认标签全部通过 |
| i18n覆盖 | en、ja均517/517完整条目，0部分、0整条中文回退；专题各3/3 |
| `python3 -B -m unittest discover -s tests -p 'test_*.py'` | 25/25 |
| `prepare-protection.mjs --check` | 通过；全目录393处有标签、88处登记不贴、36处历史待核对 |
| 原生单元 | 46/46，断代调整与最后文保译文补齐后均复跑通过 |
| 原生 UI | 首轮4/4；断代调整后新增2项再跑2/2；覆盖六处新增中文详情、英日详情、既有图鉴导航/返回 |
| 真实浏览器 | 逐处点“后一处”，确认41处、82张线稿PNG/设色AVIF complete且naturalWidth>0；查看深浅背景，断代变化的图版再核对 |
| 透明交付 | 本批41张设色AVIF的alpha范围均为0–255；原件均可解码 |
| 既有素材 | 原有476处线稿与476张设色AVIF哈希全部未变 |
| 素材锁与完整包 | 4070文件完整校验，全部tar包及主检出备份哈希通过 |
| `git diff --check` | 通过 |

原生使用独立模拟器 `Fanggu expansion-e884`（342D70BB-FBA6-4943-9E42-E564CCE32E20），DerivedData位于本工作树 `ios/build/DerivedData`，未共用用户的模拟器记录。真实个人记录未修改。Node首轮7个历史固定数量/候选缺席假设失败，经更新具体ID覆盖与历史归档核验后全部通过，未仅修改数量掩盖遗漏。

原生截图与xcresult、Node/Python/流水线日志在被忽略的 `ios/build/`；最新原生结果为 `Test-Fanggu-2026.10.11_21-53-23-+0800.xcresult`，断代调整后UI结果为 `Test-Fanggu-2026.10.11_21-49-16-+0800.xcresult`。没有安装真机或执行全套UI回归；本次未改产品交互。

## 素材保存与剩余范围

完整素材集：`79c3bb538378d239ff4c`，4070个文件、5,303,742,513字节。本工作树 `asset-dist/79c3bb538378d239ff4c/` 与主检出的同路径各保存完整包，主检出包内另存匹配的 `asset-lock.json`。检查索引所列每个tar哈希后备份完成；打包并不发布素材。

当前41处ID与原件逐次调用记录见 [批次JSON](../../assets/research/expansion-ready-20261011-batch.json)，来源与主体检查点见 [批次计划](../../assets/research/expansion-ready-20261011-plan.md)。

14处阻塞候选仍未生图、未接入：

| id | 恢复条件/阻塞原因 |
| --- | --- |
| jl_lingguang | 缺主体照片：Wikimedia Commons 文件搜索“灵光塔／영광탑／Lingguang Pagoda／長白 靈光塔”无结果，Category:Changbai Korean Autonomous County 为空，韩文维基“영광탑”条目无图；在本处首轮搜索预算内未取得 CC0/CC BY/CC BY-SA/公有领域的主体照片。年代、层数、高度与国保批次已核实，补到授权正面照片即可就绪。 |
| hlj_shangjing | 缺主体照片：Wikimedia Commons 关于金上京会宁府遗址的文件只有1930年代 Tolmatscheff 平面图局部（Herrmann 地图集，公有领域）与出土文物（铜坐龙、官印、砖）照片，没有城垣、皇城或午门基址的实景照片；Category:Acheng District 为空。首轮搜索预算内未取得可作主体几何依据的授权照片。年代与国保批次已核实。 |
| hu_kaifu | 缺主体正面照片：Commons 分类 Kaifu Temple 共58件，大雄宝殿（清光绪重建、重檐歇山、高20米、圆形石柱）仅有 Huangdan2060 2017年斜侧近景一张（Mahavira Hall, Kaifu Temple2.jpg，CC0，已存为 hu_kaifu-3-photo.jpg），正面被树木与角度遮挡；已下载的两张正面/俯视照片（Kai Fu Temple 5.jpg 黄丹 公有领域；开福寺 主殿.jpg 維基小霸王 CC BY-SA 4.0）为大悲殿，维基百科记其为近年新建殿宇，落成年份未查到。恢复条件：找到大雄宝殿正面授权照，或用户同意改绘大悲殿并按近现代标注。 |
| hb_yuquan_hall | 缺主体照片与年代依据：Commons 分类 Yuquan Temple (Dangyang) 共20件（Fxqf 2017/2020、Chiangdm 2006），均为山门、三圆门、铁塔、银杏、碑刻与院景，Fxqf 2020 年照片说明“室内不开放”，没有大雄宝殿照片；大殿现存构件年代也未查到可靠来源。既有条目 hb_yuquan 已收铁塔。恢复条件：取得大雄宝殿正面授权照及年代依据。 |
| hb_wuzu | 缺可用正面照片与现存殿宇年代：Commons 分类 Wuzu Temple 共30件（Rowingbohe 2019年2月，CC BY-SA 4.0），已下载 1600px 预览逐张查看：真身殿为斜向仰视且人群遮挡（A corner of Wuzu Temple-11.jpg），天王殿（真慧禅寺匾）正面被节日人群遮住下半部（-2.jpg），麻城殿只见台顶一角（-5.jpg），大雄宝殿仅门前人群（-4.jpg）；且寺院1854年毁于战乱、1927年火灾全毁，现存殿宇年代未取得来源。恢复条件：找到无遮挡的殿宇正面授权照并查明现存殿宇年代。 |
| hb_changchun | 照片不足：Commons 分类 Changchun Temple (Wuhan) 60件（Vmenkov 2008/2011，CC BY-SA 3.0；Wangyou0720 2007 公有领域），山门正面照仅 682×487 像素（Changchun-Taoist-Temple.jpg），三皇殿为斜向仰视（Changchun-Temple-San-Huang-Dian-0337.jpg），其余为街对面远景、殿内与细部，没有清晰的殿宇正面全貌。非国保（1992年省保）。恢复条件：取得山门或三皇殿的高分辨率正面授权照。 |
| hu_shigu | 照片过小且主体为2006年重建：Commons 相关照片中大观楼与正门（人間正道 2007/2013，CC BY-SA 3.0）仅 618×468、500×320 像素，Shigu-Academy.jpg（公有领域 1200×898）为江中远景，Shigu Academy59.jpg（FreeePedia 2025，CC BY-SA 4.0，4000×3000）为新建“石鼓江山”石牌坊。非国保。恢复条件：取得大观楼高分辨率正面授权照，并由用户确认收录近现代重建书院。 |
| hu_laosicheng | Commons 无照片：检索“老司城”“Laosicheng”“Tusi site Yongshun”仅得芙蓉镇全景与湖南地图，无祖师殿或遗址任何照片。国保：维基百科湖南列表记第五批“老司城遗址”（古遗址，五代—清），本会话未在公报渲染页定位编号。恢复条件：取得祖师殿正面授权照。 |
| hu_matian | Commons 无照片：检索“马田鼓楼”“Matian drum tower”“Tongdao drum tower”均无结果。国保：上一轮 OCR 的第四批公报页（r4/p-26）中见“马田鼓楼 · 清”，本会话未逐页核对编号。恢复条件：取得鼓楼正面授权照。 |
| hu_shanggantang | Commons 无照片：检索“上甘棠”“Shanggantang”“Jiangyong village ancient”均无结果。国保第六批 编号670 Ⅲ-373 上甘棠村古建筑群（明至清，湖南省江永县）已在 batch6.html 核对。恢复条件：取得村内主体建筑正面授权照。 |
| hu_huangsiqiao | Commons 无照片：检索“黄丝桥”“Huangsiqiao”“Huangsi Bridge ancient city Fenghuang”均无结果；维基百科湖南国保列表亦无黄丝桥古城条目（国保身份未确认）。恢复条件：取得城门正面授权照并核实保护身份。 |
| hu_chaling | 照片过小：Commons 仅 Allervous 2020 年的 Gate of Chaling.jpg（592×353）与 The defensive walls, old Chaling town.jpg（591×354），CC BY-SA 4.0，分辨率不足以核对结构。国保：维基列表记第七批“茶陵古城墙”（古遗址），本会话未在公报页定位编号。恢复条件：取得高分辨率城门楼正面授权照。 |
| xz_tashilhunpo | 缺主体照片：现有两张授权照片（Prof. Mortel 2018 CC BY 2.0；Bgabel 2010 CC BY-SA 3.0）及 Commons 分类 Tashilhunpo Monastery 中另 11 张候选（见 $S/expansion/tashi/info.json 与 montage.png）均自寺内屋顶或街巷仰视，强巴佛殿下部一至二层被前景屋顶遮挡，没有一张能完整看到主体底部的正面照；措钦大殿、班禅灵塔殿亦无正面全貌照。另需用户确认所绘主体取强巴佛殿还是措钦大殿。强巴佛殿“高约30米、主体五层”“1914年由九世班禅主持营造”来自检索摘要（携程、凤凰网、China Daily），未直接核读，一并待核。 |
| jp_chusonji_konjikido | 缺少可用的自由许可本体照片：金色堂自镰仓时代起置于覆堂内，现藏1965年新覆堂（钢筋混凝土），堂内禁止摄影。Wikimedia Commons 的 Category:Konjikido (Chusonji) 及「中尊寺 金色堂」检索共21件，经逐一查看：全部外景均为新覆堂外观（663highland、Chuson-ji Konjiki-do 02/201806、Konjikido (Chusonji) 01–04 CC0、天台宗東北大本山…P1037618 等），公有领域旧照 NDL-DC 762376 为旧覆堂外观（448×353），「中尊寺金色堂模型」为工艺菓子模型，PD 的 Interior GoldenHall Chusonji 为堂内佛坛，另有堂内具与平面图。无一张呈现金色堂本体外观。恢复条件：找到公有领域的本体外观旧照（如1962–68年解体修理期间或战前出版物的扫描，须核实著作权状态），或由用户决定改绘新覆堂（非国宝主体，不建议）。资料、断代与条目文字已就绪。 |

`hb_ezhou_guanyin`、`hb_wanshou_pagoda`、`hu_yueyang_cishi` 仍按交接明确排除。青海贵州、江西、两广海南、安徽港澳、朝鲜半岛东南亚五组新资料工作不属于本批，仍见 [handoff](../handoff-2026-10-11.md#42-还没做资料的组)。
