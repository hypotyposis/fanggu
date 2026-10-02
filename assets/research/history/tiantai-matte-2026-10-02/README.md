# 天台庵封闭透空修补前交付稿

2026-10-02 用户指出抠图不干净。核查确认脊刹两侧和外檐柱与墙体两侧共四处封闭空隙残留暗底；原提取只处理边缘连通背景。

此目录保留修补前的交付 PNG、AVIF 与绑定哈希的用户验收记录。旧副本从未改动的[原设色 PNG](../../../colored/tiantai.png)按原提取与编码参数无损重现，两个文件 SHA-256 均与历史交付清单完全一致。原稿及原生成提示词保留。

修补在[逐图设色记录](../../../color-research/tiantai.json)添加四个实际检查的透空种子，仅重建 `tiantai`；中央门洞、窗内暗部和 RGB 不变。新交付稿为 `pending_user`，旧批准不转移到修补稿。

实际检查：线稿、原设色、浅底对照；四个种子 alpha 由 255 改为 0，门洞 alpha 保持 255；透明 PNG 全部 RGB 与原件一致；PNG/AVIF 尺寸和 alpha 解码；浏览器浅底及棋盘格预览。

验证结果：`python3 -B tests/test_transparency.py` 17 项通过；`node --test tests/*.test.cjs` 168 项通过；`git diff --check` 通过。本地 iOS 图版素材已同步（未执行原生 App 构建或模拟器检查）。
