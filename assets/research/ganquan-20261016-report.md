# 仁寿甘泉寺新增交付记录

- 批次：ganquan-20261016；新增 ID：`sc_ganquan`。原目录没有同名、别名或相同主体条目。
- started_at：2026-10-16T13:41:34.792815+08:00；finished_at：2026-10-16T13:52:50.137060+08:00；从计划落盘计墙钟 675.3 秒（含资料、生成、重建与验证；不含落盘前仓库阅读）。
- 所绘范围：仁寿甘泉寺现存大雄宝殿；明代遗构、后世修缮。1434为寺院始建年，现存主体未有可靠确切建年；1450仅作明代约略排序点。
- 第七批国保：官方PDF第73页（印刷页75），编号7-1315-3-613；本次下载的SHA-256与既有batch7来源一致。
- 地图用仁寿县城约略显示点，未录入本体坐标，不作为附近提醒目标。
- 中英日目录均已导出；默认未到访，未修改任何既有个人记录。

## 图版与实际生成

内置 imagegen 共2次调用：线稿1次、设色1次，返工0次、服务失败0次、阻塞0项。只有1处就绪项，线稿到设色有依赖，峰值在途1，未遇限流或降档。工具返回耗时约35.4秒、25.0秒，是调用墙钟而非可独立核实的模型计算时间；阶段耗时不简单相加。恢复本地素材和全库线稿脚本重处理占用额外时间，未重新生图旧条目。

- [线稿原件](../generated/sc_ganquan.png) · [透明线稿](../plates/sc_ganquan.png) · [线稿来源及完整真实提示词](sc_ganquan.json)
- [设色原件](../colored/sc_ganquan.png) · [透明设色PNG](../colored-transparent/sc_ganquan.png) · [AVIF交付图](../colored-transparent-avif/sc_ganquan.avif) · [设色输入与完整提示词](../color-research/sc_ganquan.json)
- 线稿调用：`exec-374d60a5-65fe-49c5-aec9-e3020846f0b7`；设色调用：`exec-2e5c4da4-ed48-4082-ab33-b38d3125da1b`。工具原件绝对路径记录于逐图JSON。
- 两张图由记录命令标为 `approved_default`，没有人眼验收，不冒充 `approved_user`。
- 新PNG与AVIF均有真实透明和可见主体。所有既有runtime图片哈希及既有AVIF清单记录均与本次基线一致。

## 实际检查

- `node scripts/prepare-protection.mjs` / `--check`：通过。
- `node scripts/prepare-plates.mjs`：通过，610份线稿清单。
- `python3 -B scripts/prepare-colored-avif.py --ids sc_ganquan`：首次转码与默认通过后转码均通过，第二次复用。
- `node scripts/record-plate-review.mjs color --default --all-pending`：新设色1张默认通过。
- `node scripts/record-plate-review.mjs line --default --all-pending`：已有两个未入目录候选因无原件保留原状态；新线稿首次没有pending字段未被扫描，随后用 `line --default sc_ganquan` 明确记录，未修改旧候选。
- `node scripts/collect-colored-plates.mjs --require-complete`：607队列项+3特殊项齐备，pending为空。
- `node ios/scripts/build-catalog.cjs`：三语各610条（含16个承接旧记录的集合条目），翻译610/610。
- `sh ios/scripts/sync-artwork.sh assets`：610项所需图版齐备。
- `node --test tests/*.test.cjs`：最终157/157通过。首轮发现新测试的null预期、默认状态记录时序和旧批次排除集合未列新ID；修正后相关15项和全套复跑通过，未只改数量断言。
- `python3 -B -m unittest discover -s tests -p 'test_*.py'`：25项通过（包括透明处理合成测试）。
- `FANGGU_SIM_NAME='Fanggu 590d Ganquan' sh ios/scripts/run-ios-tests.sh -only-testing:FangguTests/LocalizationTests -only-testing:FangguUITests/FangguUITests/testCatalogOpensNativeDetail`：5项多语言+1项UI测试通过；隔离模拟器141E9E24-573F-4A42-BFE6-B37EB5ABACE4。
- 真实浏览器：本地`color-proof.html?ids=sc_ganquan&mode=pair`，线稿/设色请求、浅底/深底、默认通过文案均显示正常。
- 原生目检：甘泉寺详情的名称、所绘范围、年代、国保标签、线稿显示正常；从图鉴搜索“甘泉寺”只得1条，打开后返回保留搜索。未触发到访或心愿写入。
- `python3 scripts/asset-bundle.py lock`：仅新增本批8个忽略素材条目；随后verify通过，4634个full素材文件齐备。
- `python3 -B tests/test_transparency.py`：独立复跑通过。
- 独立模拟器已删除回收；测试本地审图服务器已停止。
- `git diff --check`：通过。

## 交付与限制

当前工作区和iOS打包资源已更新；代码未提交、未发布，图片未上传公网。原件、照片、官方PDF与透明副本均本地保留，未另做离线外部备份。新图遵循原型默认通过策略；图版为照片参考的艺术转译，不是测绘图。未做真机和本条英日界面人工检查。

## 后续集成说明

上述“未提交、未发布”记录首次交付时的状态。用户随后授权提交、合并到本地 main 并同步图版素材；后续执行结果见 Git 日志与本轮交付回报。main 工作区已有的无关 iOS 改动按文件哈希保留。
