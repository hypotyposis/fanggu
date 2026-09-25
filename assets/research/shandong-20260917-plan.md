# 山东补充批次：8 处原型交付

批次 `shandong-20260917` 已接入：山东从 6 处增至 14 处，整库从 261 处增至 269 处。8 处新增默认未到访，线稿与设色全部 `pending_user`；文件齐备、脚本成功及浏览器加载不构成用户视觉批准。当前为 [prototype 模式](../../docs/monument-batch-workflow.md#当前原型模式)。

本次在 `main` 工作，开工已有其他任务未提交修改并保留。没有修改个人记录、提交、发布或增加代理。图片、原稿、参考照片和本页总览图均为本地素材，不随 Git 交付。

## 人审入口

![山东 8 处线稿与设色对照](shandong-20260917-contact.png)

| ID | 实际所绘主体 | 完整对照 | 验收状态 |
| --- | --- | --- | --- |
| `sd_guangyue` | 聊城光岳楼整楼与台基 | [线稿 / 设色](../../color-proof.html?id=sd_guangyue&ref=line&bg=light) | 待人审 |
| `sd_yantai_huiguan` | 烟台福建会馆沿街外观 | [线稿 / 设色](../../color-proof.html?id=sd_yantai_huiguan&ref=line&bg=light) | 待人审 |
| `sd_jiuding` | 济南九顶塔整塔 | [线稿 / 设色](../../color-proof.html?id=sd_jiuding&ref=line&bg=light) | 待人审 |
| `sd_hongjialou` | 洪家楼天主教堂正立面 | [线稿 / 设色](../../color-proof.html?id=sd_hongjialou&ref=line&bg=light) | 待人审 |
| `sd_qingdao_catholic` | 青岛天主教堂西立面 | [线稿 / 设色](../../color-proof.html?id=sd_qingdao_catholic&ref=line&bg=light) | 待人审 |
| `sd_qingdao_christ` | 青岛基督教堂主堂与钟楼 | [线稿 / 设色](../../color-proof.html?id=sd_qingdao_christ&ref=line&bg=light) | 待人审 |
| `sd_yanmiao` | 曲阜颜庙复圣殿整殿 | [线稿 / 设色](../../color-proof.html?id=sd_yanmiao&ref=line&bg=light) | 待人审 |
| `sd_chongjue` | 济宁崇觉寺铁塔塔身与上部台座 | [线稿 / 设色](../../color-proof.html?id=sd_chongjue&ref=line&bg=light) | 待人审 |

本批 8 项在对照页连续排列于 262–269 / 269，可用页面“后一处”或键盘箭头逐张浏览。用户明确通过的具体 ID 再按 [验收记录流程](../../docs/development.md) 记录；浏览不会改写个人到访状态。

## 主体、年代与国保

- 光岳楼绘整楼与台基，定位明洪武七年（1374）。
- 烟台福建会馆绘沿街外观，1884 年始建、1906 年落成；照片早于 2025 年修缮，色稿不声称反映此轮修缮后的全部材质色。
- 九顶塔绘整塔，属唐代；`750` 仅为年表约略定位，界面显示“唐代”，不虚构确年。第三批正式单位“千佛崖造像”范围包含九顶塔。
- 洪家楼天主教堂绘双尖塔正立面，1905 年竣工，第六批正式单位“洪家楼天主教堂”。
- 青岛天主教堂绘西立面，以 1934 年建成定位，区分 1932 年动工；青岛基督教堂绘主堂与单钟楼，1908–1910 年营建，以 1910 年定位，属清代分类。
- 青岛两堂为第六批“青岛德国建筑群”增补单体，并入第四批“青岛德国建筑”；各单体显示“第六批国保（并入）”，没有直接继承母单位第四批。
- 颜庙绘复圣殿，以 1507 年明代重建定位；区分寺庙迁址与 1509 年碑亭。第五批正式单位“颜庙”。
- 崇觉寺铁塔绘塔身与上部台座：1105 年宋建七层，1581 年明增两层及塔刹；没有补画参考中被裁掉的下部砖台基。第三批正式单位“崇觉寺铁塔”。

国保维护源为 [national-protection.json](national-protection.json)，由 `prepare-protection.mjs` 重建。旧候选蓬莱阁 `sd_penglai` 保持原有阻塞状态，不属于本批已接入 8 项。

## 参考与生成记录

逐图 [线稿 JSON](sd_guangyue.json) 与 [设色 JSON](../color-research/sd_guangyue.json) 保存真实完整提示词、真实输入路径、来源作者与许可证、照片日期与哈希、提交/领取/保存时间、工具原件路径及所绘主体；其余 ID 按同样路径规则存放。全部参考和原稿已实际查看，AI 未作视觉通过或淘汰决定。

线稿参考龙门线稿风格样本与建筑实拍，设色使用实际保存的对应线稿、同主体实拍与佛光设色风格样本。原件分别位于 `assets/generated/<id>.png` 与 `assets/colored/<id>.png`；交付位于 `assets/plates/<id>.png`、`assets/colored-transparent/<id>.png` 和 `assets/colored-transparent-avif/<id>.avif`。

提示词均要求不透明纯白底，原件完整保留，`background_preparation` 绑定实际原件 SHA256。**本批 8 张设色原件实际返回 RGBA 原生 alpha**（原稿 alpha 范围 0–254），已在逐图 `actual_original_background` 如实记录；透明流程保留既有 alpha，不把它描述为白底去除效果。透明 PNG/AVIF 已解码验证有透明像素及可见主体。原型模式没有依据白底、偏色、尺寸或像素保持阈值自动返工。

- **聊城光岳楼整楼与台基**：[九三学社山东省委：聊城光岳楼建于明洪武七年](https://www.sd93.gov.cn/m_detail.php?i=id-8083.html)（1374年建成。）；[山东省文旅厅国保保护范围表](https://whhly.shandong.gov.cn/module/download/downfile.jsp?classid=0&filename=7dfd1c59d14947558ead43458d35e1cf.pdf)（表序号16，第三批光岳楼；检索摘要已核对，下载因证书主机名不匹配失败，未伪称保存PDF。）
- **烟台福建会馆沿街外观**：[烟台市文化和旅游局：烟台福建会馆](https://www.yantai.gov.cn/art/2025/1/13/art_43277_3235410.html)（1884始建、1906落成。）；[烟台市文化和旅游局：福建会馆1996年入选国保](https://www.yantai.gov.cn/art/2023/12/24/art_43277_3168148.html)；[烟台市文化和旅游局：2025年福建会馆修缮](https://www.yantai.gov.cn/art/2025/12/4/art_43277_3299835.html)（本批实拍早于此轮修缮，不声称反映修缮后的所有材质色。）
- **济南九顶塔整塔**：[济南市政协：九顶塔年代与1962年维修](https://www.jnzx.gov.cn/folder325/folder450/2020-10-27/109580.html)（唐代遗物；本批不确定确切建年。）；[济南市南部山区国土空间分区规划](https://nrp.jinan.gov.cn/cms_files/complat3/48724/attach/20255/84eb65d4e5dc476cbe1434583ff4c3d2.pdf)（正文第58页、第94条：千佛崖造像包括龙虎塔与九顶塔。）；[山东省文旅厅国保保护范围表](https://whhly.shandong.gov.cn/module/download/downfile.jsp?classid=0&filename=7dfd1c59d14947558ead43458d35e1cf.pdf)（表序号15第三批千佛崖造像，列九顶塔范围；根据官方索引摘要核对。）
- **洪家楼天主教堂正立面**：[济南市生态环境局公开环评：洪家楼教堂1905年竣工](https://jnepb.jinan.gov.cn/jnhbj/150/9357/华信路陶瓷市场片区房地产项目环境影响报告书2.pdf)（现存教堂1905年竣工。）；[国务院第六批国保通知（国家民委转载）](https://www.neac.gov.cn/seac/xxgk/200606/1079967.shtml)（近现代重要史迹类序号976，V-103，洪家楼天主教堂。）
- **青岛天主教堂西立面**：[青岛市文旅局：圣弥厄尔教堂1934年建成](https://www.qingdao.gov.cn/zwgk/xxgk/whly/gkml/gzxx/202601/t20260126_10481040.shtml)（1934建成，黄墙红瓦双钟塔。）；[青岛市政府：第六批青岛德国建筑群单体范围](https://www.qingdao.gov.cn/lslm/zt/whyc/wwzl/202111/t20211126_3877116.shtml)（列天主教堂（1932年动工），浙江路15号；第六批并入第四批青岛德国建筑。）；[国务院第六批国保合并项目](https://www.neac.gov.cn/seac/xxgk/200606/1079967.shtml)（合并项目序号95，青岛德国建筑群。）
- **青岛基督教堂主堂与钟楼**：[青岛市政府：第六批青岛德国建筑群单体范围](https://www.qingdao.gov.cn/lslm/zt/whyc/wwzl/202111/t20211126_3877116.shtml)（列基督教堂1908—1910年，江苏路15号；第六批并入第四批青岛德国建筑。）；[国务院第六批国保合并项目](https://www.neac.gov.cn/seac/xxgk/200606/1079967.shtml)（合并项目序号95，青岛德国建筑群。）
- **曲阜颜庙复圣殿整殿**：[孟子研究院《游学三孔》：颜庙复圣殿](https://www.mzyjy.cn/index.php/cms/item-view-id-2938.shtml)（复圣殿1507年重建，七间重檐；1509年为碑亭建年。）；[济宁市文旅局国保单位名单](https://whlyj.jining.gov.cn/art/2020/2/10/art_65780_2450513.html)（颜庙第五批。）；[山东省文旅厅国保保护范围表](https://whhly.shandong.gov.cn/module/download/downfile.jsp?classid=0&filename=7dfd1c59d14947558ead43458d35e1cf.pdf)（表序号46，第五批颜庙；官方索引摘要已核对。）
- **济宁崇觉寺铁塔塔身与上部台座**：[济宁市文旅局：崇觉寺铁塔](https://whlyj.jining.gov.cn/art/2025/6/12/art_70690_2706007.html)（1105宋建七级，1581明增两级；第三批国保。）

Commons 图片直连/API 遇 403，改用浏览器已观察到的页面图片资产保存并核对作者与许可证。山东省文旅厅保护范围 PDF 直接下载失败（证书主机名不匹配），只以官方检索索引摘要作对应范围核对，并结合其他官方资料；未绕过证书验证或伪称保存该 PDF。

## 耗时与调度

- 开始：`2026-09-17T22:28:09.343325+08:00`；完成：`2026-09-17T22:54:57.650853+08:00`。
- 墙钟：26 分 48 秒（1608.308 秒），包括资料、参考领取、生成、保存、转码、接入和验证。
- 实际生成 16 次：8 线稿 + 8 设色；返工 0 次，生成服务失败 0 次，本批阻塞 0 项。
- 起始并发目标 8（线稿/设色合计），实际在途峰值 7。输入分批就绪并持续填充；没有限流、并发拒绝或过载信号，没有降档。
- 生成调用时间窗：`2026-09-17T22:30:23.262920+08:00` 至 `2026-09-17T22:40:15.691340+08:00`；领取可能晚于服务完成，不声称是纯模型耗时，不将交叉阶段与单次工具时长简单相加。
- 执行错误：首批 3 张线稿路径解析误取目录导致保存失败；修正正则后保存原结果。没有重复生成；未单独计量额外延迟。
- AVIF 转码 14.8 秒：261 项哈希缓存复用 + 8 新增，0 失败；设色汇总约 4.16 秒。其余阶段未单独精确计时。

机器可读的 ID、主体、结构检查点、调用次数、时间、验收状态、旧交付哈希与验证结果见 [本批 JSON](shandong-20260917-batch.json)。

## 本次验证

依次完成 `node scripts/prepare-protection.mjs`、`node scripts/prepare-plates.mjs`、`python3 -B scripts/prepare-colored-avif.py`、`node scripts/collect-colored-plates.mjs --require-complete`，各退出成功。队列 266/266 + 3 排除项 = 269 可用；没有仅以数量断言代替完整 ID、范围和文件校验。

- `node --test tests/*.test.cjs`：94/94 通过，0 失败（7.394 秒）。新增测试验证 8 对真实输入/来源哈希、主体年代、青岛国保并入关系、山东完整 14 项、默认未到访和旧交付不变；旧省批测试按原批作用域核对。
- `python3 -B tests/test_transparency.py`：14/14 通过（3.122 秒）。
- `node scripts/prepare-protection.mjs --check`：258 项有标签，11 项未贴，0 项新增待核对。
- 旧 261 项设色 source/input/AVIF 哈希及验收状态全部保持。
- `git diff --check`：通过。
- 本次真实浏览器：山东筛选 14 项及继续展开；光岳楼详情独立打开、刷新与 Back 恢复筛选/展开；8 项对照页各两张实际图片加载；铁塔浅色/深色/棋盘格切换及 390×844 窄屏无水平溢出；光岳楼单张线稿与来源链接。验收仍全部待用户。

本地预览为 `python3 -m http.server 8766 --bind 127.0.0.1`，使用独立端口。仅目录和素材接入，未改写记录逻辑；没有新增或重新宣称验证触摸打卡手势。
