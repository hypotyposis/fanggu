# 离线底图来源

- 数据：Natural Earth 1:110m Land，保留 v5.1.2 仓库 GeoJSON 原文件。
- 数据说明：https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/
- 原文件：https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_land.geojson
- 许可：Public Domain，https://www.naturalearthdata.com/about/terms-of-use/
- 获取日期：2026-10-04。
- SHA-256：`9e0729ee253ca7d7a5c4ae9395fb1902264c5377c52e224d13dd85010e2835d9`

`ne_110m_land.geojson` 随 App 打包，由 `OfflineLand` 读取并按足迹投影绘制陆地及海岸线。无行政边界、在线地图请求或定位权限。地点标记来自现有目录坐标；概览不能用于导航。
