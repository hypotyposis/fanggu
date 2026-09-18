# 上海补遗

2026-09-18 新增四处，目录由201处增至205处。均默认未到访，日期留空；已有浏览器记录优先。地点按城市或城镇归并为上海、松江，省份为上海，地区为华东。

| 古迹 | 所绘主体与年代 | 逐图记录 | 主要文物资料 |
| --- | --- | --- | --- |
| 松江唐经幢 | 八角石幢及层叠石刻，唐大中十三年（859） | [线稿](sh_tangchuang.json)／[设色](../color-research/sh_tangchuang.json) | [松江区政府](https://www.songjiang.gov.cn/zjsj/stepin.html)、[上海文旅推广网](https://www.meet-in-shanghai.net/cn/national-key-cultural-relics-protection-unit/songjiang-tang-scripture-building-473465/) |
| 龙华塔 | 八面七层砖木塔，977年吴越重建；国保断代为宋，木檐等后修另述 | [线稿](sh_longhuata.json)／[设色](../color-research/sh_longhuata.json) | [徐汇区档案局](https://www.xuhui.gov.cn/zfjg_qzfbm_daj_bmdt/20231026/525592.html) |
| 松江兴圣教寺塔（方塔） | 九层方塔，北宋1068—1093；1080仅用于约略排序，不作为确切落成年 | [线稿](sh_fangta.json)／[设色](../color-research/sh_fangta.json) | [松江年鉴2019](https://www.songjiang.gov.cn/sjsz/sjnj/sjnj2019/files/basic-html/page343.html) |
| 真如寺大殿 | 三间单檐歇山木殿，元延祐七年（1320）；现貌经1963年修缮恢复 | [线稿](sh_zhenru.json)／[设色](../color-research/sh_zhenru.json) | [普陀区政府建筑介绍](https://www.shpt.gov.cn/tupianxinwen/20250416/958655.html)、[大殿资料](https://www.shpt.gov.cn/bm-ms/20251203/965629.html) |

方塔2015年年鉴另记1068—1094，本次采用2019年年鉴的范围，差异保留在逐图研究记录。龙华塔不以三国始建传说断定现存塔年代；真如寺图版不包含殿后新塔和侧廊。

## 图版与素材

四张线稿和四张设色均使用内置 imagegen，保留纯白底 PNG 原件。线稿按灰度生成朝代色透明笔画；设色按 `white-matte-v1` 移除外缘连通白底及逐图记录的真实透空种子，仅清理外轮廓白边。浅色石材、粉墙和门窗暗部保留，实体内部 RGB 未改变。原件哈希、输入、完整提示词、照片作者与许可、失败候选及目检结果见逐图 JSON；交付 PNG／AVIF 哈希见 [转码清单](../color-research/avif-manifest.json)。

已实际查看原件并核对七层、九层、三间、材质颜色、背景、文字和裁切。被遮挡的底层和复杂构件作艺术概括，图版不是实测图或文保色彩复原。新图保持 `pending_user`，没有继承既有图版的用户验收。

图片、参考照片和生成原件不随 Git 交付，需保留本地素材。独立素材包位于仓库根目录的 `asset-dist/shanghai-additions.tar.gz`，包含四处原件、候选、参考、交付图及逐图记录；包内 `SHA256.json` 可复核文件。四处新增图片同时补入本地共用素材副本，原有素材不覆盖。

## 本次检查

- `node scripts/prepare-plates.mjs`：205张线稿及来源页生成完成。
- `python3 -B scripts/prepare-colored-avif.py`：205张透明设色完成，既有201张全部复用，四张新增；既有清单记录逐项保持一致。
- `node scripts/collect-colored-plates.mjs --require-complete`：202个队列项完成，加三张既有正式版，整库205个 ID 无缺漏。
- `node --test tests/*.test.cjs`：58项通过，包含上海组合筛选、别名搜索、新条目默认状态、原件哈希绑定、旧记录和备份保留。
- `python3 -B tests/test_transparency.py`：9项通过。
- Codex内置浏览器：上海筛选显示四处，四处详情与图版对照可打开；检查原设色、线稿和透明设色加载，以及深色、浅色、棋盘格背景。真如寺详情在390×844下完整显示，页面无横向溢出；刷新保留上海筛选。
- `git diff --check`：通过。

本次未发布网站，未检查线上图片请求；未重复完整打卡手势、存储失败、跨标签页和辅助输入流程。新图的最终视觉验收待用户审阅。

## 合回 main 的本次验证

2026-09-18 按用户“合”的指令，将上海提交 `41686c7` 连同 main 的山西增补和交付记录合回本地 main；合入点为 `fb65fba`。主目录原有未提交内容仍保留，正文由279处增至283处，设色队列由276项增至280项。已有279处正文、164个地点、276条队列及原有线稿清单逐项保持一致；已有279条设色清单、转码哈希及用户验收记录未改变。上海以外的255个不重叠待提交文件内容与合并前备份完全一致。

本次依照主目录现行原型模式重建线稿及汇总清单，没有新增生图。283张设色AVIF全部复用，上海四处仍为 `pending_user`。主目录与独立工作树均保留上海素材包，图片仍按仓库约定不随Git提交。

- `node --test tests/*.test.cjs`：118项全部通过；上海原件、筛选、空白日期、旧记录和备份检查保留，并将上海纳入后续新增批次集合，原200张用户验收检查不改数量。
- `python3 -B tests/test_transparency.py`：14项通过。
- `git diff --check`：通过；无未解决冲突，原有未提交文件保持未暂存。
- Codex内置浏览器检查主目录8765预览：上海筛选显示四处未到访，四处详情和图版对照的线稿及透明AVIF均加载成功；Back恢复上海筛选。现有教堂、照壁类型与国保显示功能继续保留。

本次仅合入本地 main，没有推送远端或发布。自动暂存 `7e244fe` 的内容已人工恢复并核对，暂存保留作备份，不应重复应用；合并前逐文件备份另保留在上海工作树的 `asset-dist/main-before-shanghai-merge/`。未重复打卡保存、辅助输入及线上请求检查，新增图版仍待用户人眼验收。
