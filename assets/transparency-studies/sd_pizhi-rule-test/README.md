# 辟支塔透明图生产规则实测

日期：2026-09-16。用户要求新增一个古迹测试透明图生产规则，选用济南灵岩寺辟支塔，ID `sd_pizhi`。以下按阶段保留真实尝试及当前结果。

## 当前结果：白底生成、脚本去底

用户明确表示没有 API Key，并授权内置 imagegen 生成白底图片、后续脚本去底。该流程已接通：辟支塔作为第 201 处古迹接入，默认未到访，图版待用户审阅。原有 200 张透明设色交付版全部复用，既有用户验收状态保留。

- 白底原件：[线稿 PNG](../../generated/sd_pizhi.png)、[设色 PNG](../../colored/sd_pizhi.png)，均为内置 imagegen 原始输出，RGB、1024 × 1536。提示词分别保存为 [线稿提示词](line-white-prompt.txt) 和 [设色提示词](color-white-prompt.txt)。
- 透明交付版：[朝代色线稿 PNG](../../plates/sd_pizhi.png)、[设色 PNG](../../colored-transparent/sd_pizhi.png)、[网页设色 AVIF](../../colored-transparent-avif/sd_pizhi.avif)。透明度由本地脚本生成，不是 imagegen 原生输出。
- 线稿去除全部白色留白，并按朝代色生成笔画 alpha。设色去除与外缘连通的白底，记录塔刹链间的两个透空种子 `(478,153)`、`(540,153)`，仅在最外层轮廓去白边，建筑内部 RGB 不变。
- 两份逐图 JSON 保存 `white-matte-v1`、原件 SHA-256 和种子。转换器检查白底、透明像素、可见主体、PNG 往返及 AVIF alpha；不合格底图会拒绝处理。自动校验不等于形制和视觉验收。
- [打开棋盘格对照审图](http://localhost:8765/color-proof.html?id=sd_pizhi&bg=checker&ref=original)。后续规则见 [开发指南](../../../docs/development.md#新图默认白底生成脚本去底)。

当前阶段验证：46 项 Node 测试、9 项透明处理测试与差异空白检查通过。浏览器确认对照页实际显示透明 AVIF，详情页默认显示透明线稿和未到访状态；未修改个人到访记录。新图仍标为 `pending_user`，不代替用户验收。

## 第一阶段：原生透明底尝试（历史）

**此阶段没有获得符合规则的线稿与设色原件，当时未完成正式新增。** 仅靠提示词不能稳定保证当前内置 imagegen 输出合格透明图。线稿和设色各生成一次、各定向重试一次，均保留工具原文件，未做脚本抠图；当时目录为 200 处。

| 原件 | 实际文件 | 结果 |
| --- | --- | --- |
| [线稿首次](line-attempt-1.png) | RGBA，1024 × 1536，alpha 0–254 | 约 74.77% 像素完全透明，但塔内有白色填充、外缘有光晕，不是仅保留笔画的线稿。 |
| [线稿重试](line-attempt-2.png) | RGB，1024 × 1536，无 alpha | 棋盘格被画在图中，非真实透明。 |
| [设色首次](color-attempt-1.png) | RGB，1024 × 1536，无 alpha | 棋盘格被画在图中，非真实透明。 |
| [设色重试](color-attempt-2.png) | RGB，1024 × 1536，无 alpha | 简化提示词并定向去背景后仍无 alpha。 |

图片均由内置 imagegen 生成，副本与返回原件字节一致；原始路径及 SHA-256 在逐图记录中。未改用 CLI/API。

### 当时的入库拦截测试

- 将两张线稿分别传入现有 `recolorLinePlate()`，输出仅放在临时目录，测试后删除。第二张被新原件必须真实透明的错误拦截。第一张通过 alpha 数值检查，说明**透明通道检查不能替代线稿留白、轮廓与光晕的目检**；此图已被实际目检拒绝。
- 将两张设色原件分别传入现有 `prepare_source()`，不提供旧文件哈希例外。两张均被 `New colored PNG must be generated with a real transparent background` 拦截，未生成 AVIF。
- 结果分别保存为 [线稿拦截记录](line-gate-results.json) 和 [设色拦截记录](color-gate-results.json)。这些结果只证明本次样本的行为，不等同于所有图像质量的自动识别。
- 未把 `sd_pizhi` 加入 `SITES`、图版队列、旧原稿例外清单或正式图版清单。既有图版和用户到访记录不受此次测试影响。

### 当时的验证

本次实际执行：`node --test tests/*.test.cjs`，45 项通过；`python3 -B tests/test_transparency.py`，6 项通过；`git diff --check` 通过。另核对四个保存副本与工具原件字节及 SHA-256 一致。未改动页面或交付图片地址，因此未重复浏览器验收。自动测试通过仅说明现有机制保持正常，不表示这四张候选图合格。

### 来源与提示词

- [线稿研究及两次完整提示词](../../research/sd_pizhi.json)
- [设色研究及两次完整提示词](../../color-research/sd_pizhi.json)
- [线稿定向重试提示词](line-retry-prompt.txt)
- [设色定向重试提示词](color-retry-prompt.txt)

几何参考来自 [G41rn8 的 2009 年照片](https://commons.wikimedia.org/wiki/File:Jinan_2009_1487.jpg)（CC BY-SA 4.0）和 [M. Weitzel / Matt314 的 2007 年照片](https://commons.wikimedia.org/wiki/File:Pagoda_at_Lingyan_Si.jpg)（CC BY-SA 2.5），已下载并实际查看。主体为八角九层、十二重檐的砖塔，下三层重檐；此阶段候选未通过透明度验收。

此阶段候选仅作为失败记录保留，未用于当前交付图。

## 第二阶段：显式 API 参数预检（未调用）

用户随后明确要求直接使用 API 的透明背景参数。项目已增加 [统一生成入口](../../../scripts/generate-transparent-plate.py)，实际请求固定发送 `background: "transparent"`、`output_format: "png"`，不再依赖提示词设置输出格式。

辟支塔的新 [API 提示词](line-api-prompt.txt) 只约束主体、笔画和留空区域；[配套 CLI 的实际请求预检](line-api-dry-run.json) 已确认接口为 `/v1/images/edits`、模型为 `gpt-image-2.5-sunburst`、三个参考输入及透明参数均正确。`openai` SDK 和 Pillow 已通过 `uv run --no-project` 准备在独立缓存环境。**这只是无网络调用的请求预检，当前尚未配置 `OPENAI_API_KEY`，没有产生 API 新图，不能记为生成成功或通过验收。**

新增入口的 3 项自动测试覆盖参数固定、透明通道结果验证、原件与记录防覆盖、缺少凭证时停止；当时沿用的 45 项 Node 测试与 6 项透明处理测试也已通过。用户随后选择白底脚本流程，因此 API 入口仅保留为可选工具，不是当前默认生产路径。
