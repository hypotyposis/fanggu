# 脚本一览

每个脚本读什么、写什么、需要什么。命令都在仓库根目录执行；写文件的脚本只在对应输入变化时运行。流程背景见 [架构 · 数据流](../docs/architecture.md#数据流)，副作用与模式说明见 [开发指南 · 生成文件与命令副作用](../docs/development.md#生成文件与命令副作用)。

## 模式

`plate-policy.json` 为 `{"mode":"prototype"}`（默认）或 `strict`。读取它的脚本都接受 `--strict` 或 `--prototype` 临时覆盖，两者不能同时给。原型模式关闭白底、偏色、alpha、尺寸等技术拦截，由用户人眼验收；严格模式恢复全部校验。解析逻辑在 `plate-policy.mjs`（Node）与 `prototype-matte.py` 的 `prototype_enabled`（Python）。

## 图版生产 `scripts/`

| 脚本 | 作用 | 读取 | 写入 | 依赖与标志 |
| --- | --- | --- | --- | --- |
| `prepare-plates.mjs` | 把线稿原件转换为着时代色的透明交付 PNG；生成线稿清单与来源页 | `sites.js`、`palette.css`、`assets/generated/<id>.png`、`assets/research/<id>.json`、`legacy-line-originals.json`、`plate-policy.json` | `assets/plates/<id>.png`、`plates.js`、`sources.html` | `magick`、`python3`（经 `line-plate.mjs`）。增量：原件、记录、处理器更新或颜色变化才重做；`--strict` 强制全部重做并启用严格校验；`--sources-only` 只重建 `sources.html`，不需要原件 |
| `line-plate.mjs` | 模块：单张线稿着色。原生透明图只改 RGB；登记 `white-matte-v1` 的白底图走 `white-matte.py`；哈希白名单内的旧白底图走旧 ImageMagick 路径；原型模式统一交给 `prototype-matte.py` | 原件、`background_preparation` | 目标 PNG | 无独立命令行 |
| `prototype-matte.py` | 原型模式处理器：按灰度生成笔画 alpha 并着色，或尽力去除外部连通白底；不做质量拒绝 | 原件 | 输出 PNG | `python3 -B scripts/prototype-matte.py <原件> <输出> --line-color '#rrggbb' [--adaptive-ink]`；NumPy、Pillow |
| `white-matte.py` | 严格处理器：校验近纯白边缘与中性笔画，线稿转 alpha 着色；`extract_color` 供转码脚本去底 | 原件 | 输出 PNG | 命令行只处理线稿：`python3 -B scripts/white-matte.py <原件> <输出> --line-color '#rrggbb'`；原件与输出不能是同一路径 |
| `extract-transparent-background.py` | 旧暗底设色原件的边缘连通抠图；只用于哈希匹配的旧件 | 原件 | 输出 PNG 与报告 | `<原件> <输出> [--tolerance N] [--seed x,y ...]` |
| `prepare-colored-avif.py` | 设色去底、生成透明 PNG 与 AVIF（Q85、4:4:4、speed 6），写交付清单；按原件、参数、处理器哈希复用缓存 | `queue.json`、`assets/colored/<id>.png`、`assets/color-studies/v1/*.png`、逐图设色记录、已有清单 | `assets/colored-transparent/`、`assets/colored-transparent-avif/`、`assets/color-research/avif-manifest.json`；运行中写 `transparent-avif-progress.json`，成功后删除 | `python3 -B scripts/prepare-colored-avif.py [--ids a,b] [--strict|--prototype]`；NumPy、带 AVIF 的 Pillow；4 个进程；`--ids` 只重建指定条目，要求已有完整清单 |
| `collect-colored-plates.mjs` | 汇总队列、逐图记录与交付清单，校验哈希与存在性 | `queue.json`、逐图设色记录、`avif-manifest.json`、`sites.js`、`plates.js` | `colored-plates.js`、`assets/color-research/progress.json`、`prompts.json` | `--require-complete` 有待完成项即报错；不检测队列外遗漏；不改图片 |
| `record-plate-review.mjs` | 记录用户明确通过的图版：写 `user_review` 并绑定当前文件哈希；`color` 同时把记录置为 `complete` | 逐图记录、原件、透明 PNG、AVIF | 对应 `assets/research/<id>.json` 或 `assets/color-research/<id>.json` | `node scripts/record-plate-review.mjs line|color <id> [<id> ...]`；只在用户说出具体通过的 ID 后运行；之后重跑转码与汇总 |
| `plan-colored-plates.mjs` | 2026-09-15 的批次规划器，要求恰好 197 张并重写 `queue.json` 与 `batches/` | `sites.js`、`plates.js`、研究 JSON | `queue.json`、`batches/*.json` | **历史脚本，不要运行**；当前目录规模下直接报错 |
| `generate-transparent-plate.py` | 可选的 API 生成入口，强制透明背景参数并写收据 | 提示词文件、参考图 | 输出 PNG 与 JSON 收据 | 需要外部 imagegen CLI 与凭证；当前流程不使用；`--dry-run` 可查参数 |

## 国保与素材 `scripts/`

| 脚本 | 作用 | 读取 | 写入 | 依赖与标志 |
| --- | --- | --- | --- | --- |
| `prepare-protection.mjs` | 校验国保源数据并生成登记模块 | `assets/research/national-protection.json`、`sites.js` | `protection-data.js` | `--check` 只读核对是否过期，不写文件；不碰图片与个人记录 |
| `asset-bundle.py` | 被忽略素材的锁定、校验、打包、恢复 | `assets/asset-lock.json`、`ios/Fanggu/Resources/catalog.json`、`assets/**` | `lock` 写清单；`pack` 写 `asset-dist/<assetSet>/`（`index.json` 与分卷 TAR）；`restore` 写 `assets/**` | 子命令 `lock`、`verify`、`pack`、`restore`；`--profile runtime|full`（默认 `full`）；`--bundle DIR`；`--force` 覆盖内容不同的本地文件；`--root`。`lock` 要求 `runtime` 文件齐备并被 Git 忽略；`pack` 要求目标目录为空 |

## iOS 导出 `ios/scripts/`

| 脚本 | 作用 | 读取 | 写入 | 依赖与失败条件 |
| --- | --- | --- | --- | --- |
| `build-catalog.cjs` | 导出 App 目录 | 根目录六个 JS、`palette.css`、`assets/research/<id>.json` | `ios/Fanggu/Resources/catalog.json` | 重复 ID、缺地点、缺线稿或设色清单、缺时代色时报错 |
| `sync-artwork.sh <assets 目录>` | 同步运行图版到 App 资源目录并核对 | `assets/plates/`、`assets/colored-transparent-avif/`、`assets/longmen-vairocana.png`、`catalog.json` | `ios/Fanggu/Resources/Artwork/`（被忽略） | `rsync`；缺目录或缺文件时非零退出并列出缺少项 |
| `build-icon.py` | 把用户提供的鸱吻图标原样复制到资产目录 | `ios/icon-concepts/chiwen/AppIcon.appiconset/` | `ios/Fanggu/Assets.xcassets/AppIcon.appiconset/` | 只复制，不重绘 |

## 典型顺序

目录数据改动：`prepare-protection.mjs`（若改国保）→ `build-catalog.cjs` → 测试。

新增图版：`prepare-plates.mjs` → `prepare-colored-avif.py` → `collect-colored-plates.mjs --require-complete` → `build-catalog.cjs` → `sync-artwork.sh assets` → 测试与浏览器检查。每一步确认成功退出后再进行下一步；返回会话 ID 的工具调用要等到完成。
