# 鸱吻 App 图标

2026-10-02 按用户“把 logo 换成这套”的要求，导入 `斗拱App图标设计方案.zip` 中的 `export/ChiwenIcon/`。文件名虽为斗拱方案，包内实际是鸱吻剪影，沿用提供的造型与颜色。

- `AppIcon.appiconset/`：默认、深色和着色三个 1024 × 1024 图标及 Xcode 配置，作为正式交付源。
- `_src/`：提供的三个配色、三档线宽 SVG 原件。
- `Legacy-AllSizes/`：提供的旧版各尺寸 PNG 原件。
- `README.txt`：素材包原始说明，按原文保留。

在仓库根目录运行 `python3 ios/scripts/build-icon.py`，将正式图标原样复制到 App 资产目录。历史斗栱方案见 [round-7](../round-7/README.md)。
