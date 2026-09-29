# 京都建筑单体九处增补计划

- 批次名：kyoto-nine-20260926
- 用户约定范围：承接上一轮明确列出的九个京都建筑主体；当前分支 `codex/japan-architecture-batch`，本地网页与 iOS 同步。
- started_at：2026-09-26T15:26:29+08:00
- 基线：`SITES` 365，设色队列 362 项、另有 3 项 excluded；保留既有未提交改动与已审图版。
- 图版流程：核对现存主体与来源实拍 → 内置 imagegen 原件 → 本地透明交付 → 两平台目录同步；新增图版保持 `pending_user`。

| ID | 所绘主体及年代依据 | 阶段 |
| --- | --- | --- |
| `jp_hokanji_tower` | 法观寺八坂塔现存五重塔，1440 年再建；京都市资料 | 本地待审 |
| `jp_gosho_shishinden` | 京都御所紫宸殿现存建筑，1855 年；宫内厅资料 | 本地待审 |
| `jp_daitokuji_karamon` | 大德寺唐门，桃山时代；文化厅记载聚乐第来源仅是传说 | 本地待审 |
| `jp_daitokuji_hojo` | 大德寺现存方丈，约 1635—1636 年；文化厅资料 | 本地待审 |
| `jp_jishoji_togudo` | 慈照寺东求堂，约 1485—1486 年；文化厅资料 | 本地待审 |
| `jp_toji_kondo` | 东寺金堂，1603 年再建；京都市资料 | 本地待审 |
| `jp_daigoji_sanboin` | 醍醐寺三宝院表书院，1598 年；文化厅资料 | 本地待审 |
| `jp_hongwanji_goeido` | 西本愿寺御影堂，1636 年再建；京都市资料 | 本地待审 |
| `jp_chionin_mieido` | 知恩院御影堂，1639 年再建；京都市资料 | 本地待审 |

## 在途及结果

九处均有同主体照片、本地参考文件、官方断代资料、原件路径、真实提示词、原件 SHA-256 与逐图审阅记录，分别保存在 `assets/research/<id>.json` 和 `assets/color-research/<id>.json`。大德寺唐门、方丈及三宝院表书院的参考照片未声明再利用许可，仅供本地制图参考，原照不随网页交付。线稿和设色 PNG 原件均保留在本地素材目录；生成器对部分线稿直接给出透明灰色原稿，使用登记了哈希的 `adaptive-ink-v1` 提取细线。所有新图版的视觉状态为 `pending_user`。

## 最终交付

- 网页与 iOS 目录均为 374 处；设色队列 371 张，另有 3 张先前确定的正式版。九处新图的线稿、透明 PNG、AVIF 和 iOS Artwork 均已生成。
- `node --test tests/*.test.cjs`：143/143 通过；`python3 -B tests/test_transparency.py`：15/15 通过；`git diff --check`：通过。
- `xcodebuild -project Fanggu.xcodeproj -scheme Fanggu -destination 'generic/platform=iOS Simulator' -derivedDataPath /tmp/fanggu-kyoto-nine-derived build`：BUILD SUCCEEDED。
- 真实浏览器在 `127.0.0.1:8876` 查看八坂塔详情与大德寺唐门线稿，图片加载、标题、年代及“未到访”显示正常。未在本轮逐一模拟触摸打卡或审定九张图的历史准确性。
- 本地资源锁 `f0298bb4e5b8e81d4e5c`，`verify --profile full` 已核验 3077 个文件；资源包位于忽略目录 `asset-dist/f0298bb4e5b8e81d4e5c`，分成 5 个 tar。未提交、推送或部署。
