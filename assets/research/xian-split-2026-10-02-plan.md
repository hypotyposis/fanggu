# 西安大小雁塔拆分

- 范围：main 分支，本地拆分为两个独立条目；不提交、不发布。
- started_at：2026-10-02T06:39:25.815Z
- 旧 ID `xian` 保留给大雁塔；新增 `xian_small` 默认未到访，不复制笔记和评价。状态偏好询问尚无回复，采用保留原 ID 关联的处理。
- 基线：现有双塔组合记录及照片；第一批国保两条独立登记分别对应慈恩寺大雁塔、荐福寺小雁塔。
- 生图起始并发目标：8；本批每阶段就绪项为2，无降档。

| id | 主体与结构检查点 | 已查看参考 | 阶段 |
| --- | --- | --- | --- |
| xian | 大雁塔；七层楼阁式、方形、塔刹；土赭墙与灰褐檐 | xian-big-photo.png、xian-big-clear-photo.jpg；Commons 来源沿用旧记录 | delivery_ready / pending_user |
| xian_small | 小雁塔；十三层密檐、残顶、不补塔刹；土褐砖与深灰褐檐 | xian-small-full-photo.jpg；Commons 来源沿用旧记录 | delivery_ready / pending_user |

原组合稿与真实记录保留于 [历史目录](history/xian-pair-2026-10-02/)。新图均待用户人审，AI 不作视觉通过决定。

## 最终交付

- finished_at：2026-10-02T06:46:21.784923+00:00；墙钟时间约 6.9 分钟。
- 内置 imagegen 共4次：2次线稿、2次设色；返工0次、服务失败0次、阻塞0项。峰值在途2项，就绪项不足8，无限流或降档信号。服务净耗时未知，不将交叉阶段时间相加。
- 小雁塔线稿先返回即推进设色，大雁塔线稿随后返回即推进设色；集中处理和接入。每张图实际输入和真实提示词见逐图记录。
- 原组合图的3份交付副本、2份原件和真实记录完整归档；其用户验收绑定原图哈希，未转授新图。新图均 `pending_user`。
- `SITES`、线稿与设色清单均覆盖468个独立ID，设色队列465项加3项特殊入口；`progress.pending`为空。转码466张复用，仅拆分的2张重建。国保登记分别对应大雁塔、小雁塔。
- 两项原件保存于 `assets/generated/xian.png`、`assets/generated/xian_small.png` 与 `assets/colored/xian.png`、`assets/colored/xian_small.png`；透明交付图在 `assets/plates/`、`assets/colored-transparent/`、`assets/colored-transparent-avif/` 的同ID文件。
- [大雁塔线稿记录](xian.json)、[小雁塔线稿记录](xian_small.json)、[大雁塔设色记录](../color-research/xian.json)、[小雁塔设色记录](../color-research/xian_small.json) 包含完整提示词、输入、原件路径和哈希。
- 已执行并成功：国保重建；线稿重建；透明AVIF转码；设色汇总；iOS目录导出及素材同步；素材 `lock`、`verify --profile full`（3698文件）；`node --test tests/*.test.cjs`（168/168）；`python3 -B tests/test_transparency.py`（15/15）；`git diff --check`。
- 首次全套测试有12项旧批次哈希断言与本次主动拆分冲突。保留历史批次报告未修改，在共享测试助手中核对归档原件/透明图/AVIF真实哈希和原用户验收；新图另验独立ID、队列、年代、来源与记录隔离，第二次全套168/168通过。
- Codex内置浏览器、独立预览origin端口8875：搜索“雁塔”得到2项；小雁塔独立详情及刷新；返回恢复筛选；旧 `index.html#xian` 跳到大雁塔；两组线稿/设色深色及棋盘背景对照，4张图片加载完成。未做窄屏与iOS模拟器UI验收。
- iOS目录和本地Artwork副本已同步；既有iOS代码与其他未提交工作保留。素材清单已更新，本地归档齐备，未生成资源分卷或异地备份；不提交、不发布。
