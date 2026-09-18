# 山西增补图版记录

本轮新增两处，山西共72处、全库203处。两处默认未到访，不预填日期，已有浏览器记录优先；没有修改个人存储格式或既有古迹 ID。

## 主体与来源

| ID | 所绘主体及年表定位 | 逐图记录 |
| --- | --- | --- |
| `sx_doudafu` | 太原窦大夫祠献亭与大殿；按元至正三年（1343）重建定位，非春秋人物年代。排除两侧配房。 | [线稿考据与实际提示词](sx_doudafu.json)、[设色材料与提示词](../color-research/sx_doudafu.json) |
| `sx_jiulongbi` | 大同九龙壁；采用故宫博物院所列明洪武二十五年（1392）纪年，只绘现存照壁，不绘复建代王府。 | [线稿考据与实际提示词](sx_jiulongbi.json)、[设色材料与提示词](../color-research/sx_jiulongbi.json) |

窦大夫祠的沿革、重建与屋顶形制参照[太原市人民政府新闻办公室供稿](https://gd.huaxia.com/c/2008/12/08/762387.shtml)。九龙壁纪年、尺度与形制参照[故宫博物院](https://www.dpm.org.cn/lemmas/241443.html)，原代王府照壁关系另参照[大同市人民政府介绍](https://www.dt.gov.cn/english/placestovisit/202501/916d3d6f6ec14655978f5a3212ee06b6.shtml)。单体坐标在 JSON 留存，地图沿用既有太原、大同城市归并点。

实拍参考均已下载并实际查看：

- [窦大夫祠正面](https://commons.wikimedia.org/wiki/File:窦大夫祠-1.jpg)：Fymking，2012-08-26，CC BY-SA 4.0；保存为 `assets/references/sx_doudafu-photo.jpg`。另查看内檐照片作背景理解，但没有作为生成输入。
- [大同九龙壁全壁](https://commons.wikimedia.org/wiki/File:9dragonwall_Datong_Shanxi.jpg)：Chlukoe，2013-06-25，CC0 1.0；保存为 `assets/references/sx_jiulongbi-photo.jpg`。照片左上有柳枝遮挡，生成时规整局部屋檐，未声称逐砖复刻。

九龙壁使用独立类型 `screen`（照壁），搜索兼容“影壁”“琉璃照壁”，不归入 `wall`（城墙城防）。

## 原件与交付

使用内置 imagegen，不使用 API Key。线稿以卢舍那黑线白底母版为风格参考、实拍为主体依据；设色以最终线稿为构图输入、实拍为材料依据、既有佛光寺设色为风格参考。全部实际提示词、输入路径、工具原件路径与生成迭代记录保存在上述逐图 JSON。

每个 ID 的素材路径如下，两个 ID 均遵循同一结构：

| 用途 | 路径 |
| --- | --- |
| 黑线白底最终原件 | `assets/generated/<id>.png` |
| 设色白底最终原件 | `assets/colored/<id>.png` |
| 朝代色透明线稿 | `assets/plates/<id>.png` |
| 透明设色 PNG | `assets/colored-transparent/<id>.png` |
| 网页透明设色 AVIF | `assets/colored-transparent-avif/<id>.avif` |

四张最终白底原件均为1536×1024，原件哈希绑定 `background_preparation.method: "white-matte-v1"`；本轮没有需要手动指定的封闭透空种子。原件未标为原生透明图，透明度由本地脚本生成。设色保留浅色石材、墙面及暗门窗，不作历史彩绘复原。

窦大夫祠首轮有半透明灰雾、第二轮误带两侧配房，均保留为未采用候选，最终经局部修正移除。九龙壁首轮两端留白不足，修正后保留完整屋顶、九条主要龙形和底座。候选与失败原因见 `generation_history`。最终图版是照片规整与细节简化后的艺术转译，不是实测图；设色相对线稿存在轻微尺度差异，不声称像素配准。

实际图片被 Git 忽略，代码差异不包含它们；新工作区及部署时须携带上述目录中的本轮素材，并保留白底原件、参考照片与候选。没有发布到公网。

## 检查与验收

已执行：

- `node scripts/prepare-plates.mjs`：生成203张线稿清单及来源页，没有重新调用 imagegen 绘制旧图。
- `python3 -B scripts/prepare-colored-avif.py`：203张交付可用，新处理两张、复用201张既有设色缓存；旧图的哈希和验收记录保持不变。
- `node scripts/collect-colored-plates.mjs --require-complete`：队列200张齐备，另保留三张既有正式图版。
- `node --test tests/*.test.cjs`：58项通过，涵盖新 ID、纪年、省份与类型、搜索别名、默认状态、素材哈希及覆盖范围。
- `python3 -B tests/test_transparency.py`：9项通过。
- `git diff --check`：通过。

真实浏览器在独立本地预览来源检查山西／照壁组合筛选、“影壁”与“烈石神祠”搜索、两处详情页 PNG 与 AVIF 实际加载、返回后的筛选恢复、设色对照图切换、棋盘格与深色背景。预览不会改写真实使用来源的个人记录。未进行手机实机触摸手势验证；本轮未修改手势代码。

两张新增透明设色均为 `pending_user`，上述检查不等同于用户图版验收。逐张审阅入口：[窦大夫祠](../../color-proof.html?id=sx_doudafu&bg=dark&ref=line)、[九龙壁](../../color-proof.html?id=sx_jiulongbi&bg=dark&ref=line)。
