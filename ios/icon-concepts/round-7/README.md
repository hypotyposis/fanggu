# 斗栱轮廓与素雅配色

用户指出上一版手绘矢量比[所选原稿](reference-two-tone-red.png)逊色，且朱红底过于浓烈。本轮从原稿提取同一斗栱轮廓，保留檐角、斗块、层叠拱臂及其间隙，仅换用平面配色；没有重新概括成三层结构。

[配色对照](comparison-subdued.png)同时展示 240 px 与 76 px：墨底米金、黛绿米白、纸色深墨。用户最终指定[黛绿米白图片](selected-raster-source.png)本身作为正式图标。App 资产 PNG 直接由这张 1254 px 原图缩至 1024 px，保留图中的柔和明暗；早先的 `02-jade-ivory.svg` 是纯色轮廓备选稿，不再用作交付源文件。

`trace-icon.py` 是一次性的矢量备选稿生成工具，依赖 Python OpenCV；运行后可重新生成三款 SVG。App 构建不依赖 OpenCV。
