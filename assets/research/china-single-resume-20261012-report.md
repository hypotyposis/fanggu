# 中国单体拆分续作 · 2026-10-12

本次接力新增 **宁海崇兴庙戏台**，以戏台与相连勾连廊内部为一个连体单元，加入宁海古戏台集合。现有集合保留岙胡胡氏宗祠、崇兴庙、城隍庙三个独立成员；旧 `xitai` 到访、笔记、评价仍在集合，不复制到新单体。新单体默认未标记。

前批的39个单体及16个集合保持，本轮累计接入40个拆分单体。原始目录609项，16项仅承接旧集合记录，App可浏览593个单体。没有把资料未齐的剩余项写成已完成。

## 图版、考据与来源

- 线稿恢复自前会话成功返回的 `exec-3898adfd-e7ef-4d98-8f40-efde03d933b1.png`，真实输入和提示词保存在 [线稿记录](xitai_chongxing.json)；没有重复生图。
- 本轮内置 `image_gen.imagegen` 仅调用一次设色，真实提示词、五张输入及材质观察见 [设色记录](../color-research/xitai_chongxing.json)。原件为纯白底PNG，透明线稿与透明设色PNG/AVIF由本地脚本处理，不标成原生透明生成。
- 原件与参考照片保存在本地 `assets/generated/xitai_chongxing.png`、`assets/colored/xitai_chongxing.png`、`assets/references/xitai_chongxing_a2-photo.jpg`、`a3-photo.jpg`、`a6-photo.jpg`，均被Git忽略。摄影者为confusingstone，照片许可未声明，不公开分发原照片。
- [中国宁波网现场报道](https://news.cnnb.com.cn/system/2009/01/25/005970480.shtml)明确1841年开始重建、历数年形成三连贯藻井。中英日正文均区分着工、完工与创庙年代；图版不复原外屋顶、庙门或对面正厅。
- 国保第六批名单中的正式单位为“宁海古戏台”；[宁海县域总体规划](https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3575/site/attach/0/481f457c1a214b4395b4ac9a069b52ab.pdf)PDF第25页（文本第23页）表6-2第1项明确崇兴庙古戏台及2006-05-25公布日期。已读取PDF正文并查看渲染原页，来源文件与哈希入记录。
- 1张线稿与1张设色均通过 `record-plate-review.mjs` 记为 `approved_default`，0张 `approved_user`；默认接入不表示用户人眼审阅。设色交付AVIF有257153个透明像素、1304684个不透明像素，抠图内部RGB保持。

## 未补齐的资料项

- `longxing_dabei`：近景补齐中央阁体，航拍/全景可确认两耳阁与空中连廊，但耳阁下部仍被树木和其他殿堂遮挡，缺完整主体；不按遮挡轮廓臆补。
- `sx_jishan_jiwang`：献殿与钟鼓楼連体保留；后稷楼仅见上檐，未获得独立全楼和连接关系的完整实拍。
- `xz_guge`：新论文有红殿15世纪70—80年代依据，但既有全景的其余宫堡和房屋残迹未建立可靠单体身份与范围对应，不能将王城整体拆为推测条目。
- `xz_tholing`：红殿年代新研究定位1436或1449，既有照片殿前塔与围墙接合，尚未核清塔的独立身份、年代及完整范围；保留现有组合。
- `nx_108towers`：二手资料转引1991年清理维修简报有自上而下、自南而北001—108编号规则；未读取原报告编号图及对应现存实拍，未核实七塔逐塔身份，不凭行列推建ID。

本轮按首轮两轮查询收口，并对大悲阁现有全景作定向补证；仍不把近景擅改成约定完整主体。研究发现与具体缺口保存在 [批次记录](china-single-resume-20261012-batch.json)。未重新生成这些条目，没有修改既有个人记录。

## 时间与生成

- 接力开始：2026-10-12T20:58:06+08:00；制作计划落盘：2026-10-12T21:00:59.934938+08:00；收尾：2026-10-12T21:20:09.454930+08:00。本轮墙钟约22.06分钟，包括读取任务、恢复4620份被忽略素材、资料复核、生成、接入、测试与打包。
- 当前会话实际生成1次（设色）；恢复前会话已生成线稿1张，本单体跨会话共2次。返工0次，服务失败0次，服务计算耗时未知，不将提交至领取间隔当模型耗时。
- 目标并发8，实际峰值1：本轮仅有一个就绪设色任务；无并发拒绝、限流降档或新增代理。

## 实际执行的检查

- `node scripts/prepare-plates.mjs` → `prepare-colored-avif.py --ids xitai_chongxing` → color/line默认通过 → 再转码 → `collect-colored-plates.mjs --require-complete` → `build-catalog.cjs` → `sync-artwork.sh assets`，均成功。`line --default --all-pending`未选中未设置瞬时状态的新记录，随后以 `line --default xitai_chongxing`完成绑定；未覆盖旧用户验收。
- `node --test tests/*.test.cjs`最终148/148通过。首轮5项旧数量基线失败，已把续作ID加入相应覆盖集合，同时新增主体、年代、来源、哈希、阻塞边界与三语导出回归；没有仅修改固定数量。
- 核实官方PDF链接与来源哈希后复跑 `china-single-resume`、`china-single`、`ios-catalog`、`protection`、`i18n`、`curations`、`plate-tools`：24/24通过。
- `python3 -B -m unittest discover -s tests -p 'test_*.py'`：25/25通过。
- `node scripts/prepare-protection.mjs --check`、`git diff --check`：通过。
- 独立模拟器先 `build-for-testing`，再 `test-without-building`：CurationTests 8/8及新增三语UI测试1/1通过；中英日均打开崇兴庙详情及宁海三成员集合。截图与结果包保存在 `ios/build/china-single-resume-screenshots/`、`china-single-resume-qa.xcresult`（忽略文件）。原生存储与交互实现未改动，无需重复全套手势测试。
- 实际浏览器：新线稿PNG和设色AVIF均解码为1536×1024；检查棋盘、浅、深背景，原图／线稿切换、单张对照、线稿单页及来源署名。
- 比较1216份既有运行图版：哈希变化0。所有旧验收记录保持，旧生成原件未重画。
- `asset-bundle.py lock` 与 `verify --profile full`：4626份素材通过；`pack --profile full --bundle asset-dist/china-single-resume-20261012-full`成功。完整素材包约6GB，保存本地，包括运行图、原件与参考资料。

## 交付状态与未验证项

- 分支 `codex/china-single-resume-20261012`，改动未提交、未合入main、未推送、未安装到iPhone。历史任务的提交与手机安装已完成，不视作本轮新增授权。
- 图版与全部本地素材已保存并同步iOS资源；没有修改用户真实到访记录。
- 未在真机检查触觉或实际触摸。本轮其余五项仍受资料缺口限制，恢复条件见上方列表。
