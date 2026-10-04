# 访古联机原型

SwiftUI 原生 App 连接真实 HTTP JSON 服务；服务使用 Python 标准库与 SQLite 持久保存账号、评分、短评、关注、屏蔽和举报。不需要额外 Python 包。图鉴和图版继续随 iOS App 打包，不新增网页产品或图片分发服务。

## 运行

在仓库根目录：

```sh
# 纯净社区，没有示例用户
python3 community/server.py

# 或者，在独立的原型数据库中准备有明确「示例」标识的演示资料
python3 community/seed.py
python3 community/server.py --database community/data/prototype.sqlite
```

默认监听 `127.0.0.1:8787`。原型示例账号为 `yanbei`，密码 `fanggu-demo-2026`，以及 `seed.py` 中列出的其余示例账号。它们只用于可丢弃的测试数据库；示例身份会显示在 App 内。重复执行 seed 不覆盖已有真实账号、不修改已有评价。

在模拟器中构建运行 App，顶部点「单机」打开账号入口。创建新账号或使用示例账号，阅读并启用公开同步规则，然后登录。联机模式增加「社区」栏，古迹详情显示社区评分和评价。账号页在「我的」中。

真机和多设备局域网测试：

```sh
python3 community/server.py --host 0.0.0.0 --database community/data/prototype.sqlite
```

在 App 账号页的「原型连接设置」填写电脑的局域网地址（如 `http://192.168.1.20:8787`，换成实际地址）。设备需能访问该地址，首次连接允许 iOS 本地网络权限。Debug 原型可使用本地 HTTP；正式环境使用 HTTPS，Release 界面拒绝配置 HTTP 服务。可用 `FANGGU_COMMUNITY_URL` 启动环境变量指定服务，适合独立测试实例。

账号密码登录已可实际注册、登录、退出和删除。短信、Apple 登录、国内公网域名和部署凭据属于后续环境接入，当前原型不伪造验证码、Apple 身份或公网连接。Python HTTP 服务用于本机和受控测试网络；公网部署应在 HTTPS 反向代理后运行，并补充运营配置、短信/Apple 账号绑定及生产级流量控制。

## 已实现的产品规则

- 未开通账号可完整单机使用。首次开通会公开当前本机评分与短评；笔记、心愿、到访状态与日期不发送至社区。
- 单机开关只改变界面。已登录账号的评分与短评继续公开同步；真正断网时本机保存、待网络恢复重试。iOS 后台运行由系统调度，不能保证应用被系统挂起时持续联网；回到前台即补同步。
- 六维等权，个人综合分和社区总分都是 **5 分制**。填全六项才计入总分与社区六维图；至少五人完整评分后展示聚合值。计算使用未舍入均值，仅显示保留一位小数。缺项、纯短评仍公开；旧五星不推算、不混入总分。
- 每个账号、每处古迹只维护一份评价。编辑更新原动态，清除以带版本的空评价表示，不会因重试复活旧内容。
- 关注为单向关系，双向时显示互相关注。最新和关注动态、古迹评价和公开主页均有分页。屏蔽解除双方关注并隐藏双方内容，可从屏蔽列表恢复。
- 删除账号需要输入密码确认；服务端删除资料、评价、会话、关注和屏蔽关系，评分随之重算。本机个人资料保留。

## 同步与数据边界

`LibraryStore` 继续校验并原子保存版本 4 的个人 JSON，兼容 1–4 备份。社区状态保存在独立 `community-<服务地址哈希>.json`，包含按账号隔离的本机评价快照、远端版本、已确认内容、待发送请求及冲突版本。凭证只进入 Keychain，并按服务地址与账号分别保存。账号切换使用持久过渡记录，在写入个人文件前后退出 App 都能恢复，且不覆盖切换后的新编辑。

本机修改成功后形成持久待发请求，每个请求带唯一 mutation ID 与 base revision。相同请求重放返回原结果；版本不一致返回 409 与远端内容，账号页显示双方版本并提供「保留本机／采用云端」。清除评价保留 tombstone。账号切换前保存当前账号快照，再通过 `LibraryStore` 切换评价，不改私人到访记录。切换服务也隔离评价，避免把另一社区的账号资料上传到新服务。

服务器只接受目录中已存在的古迹 ID。服务端密码使用 PBKDF2-HMAC-SHA256 和独立随机盐，登录 token 随机生成、仅以哈希入库，有效期 30 天。API 按账号限制写入、按来源限制登录尝试，不记录请求正文、密码或 token。

## 运营审核

评价菜单可实际提交举报。运营者使用本地工具读取并处理（数据库路径必须与运行服务一致）：

```sh
python3 community/moderate.py --database community/data/prototype.sqlite
python3 community/moderate.py --database community/data/prototype.sqlite --resolve REPORT_ID --action hide
python3 community/moderate.py --database community/data/prototype.sqlite --resolve REPORT_ID --action dismiss
python3 community/moderate.py --database community/data/prototype.sqlite --resolve REPORT_ID --action restore
```

`hide` 从公开列表及评分中排除该评价；用户后续编辑不会自动解除审核隐藏。`restore` 恢复。可通过 `FANGGU_BLOCKED_TERMS` 逗号分隔配置原型的禁止词过滤；这只是最小审核机制，不能替代公开运营所需的完整审核和响应流程。

## 验证

```sh
python3 -m unittest discover -s community -p 'test_*.py'
node --test tests/*.test.cjs
xcodegen generate --spec ios/project.yml
# 先启动上述示例服务，并使用独立模拟器；不要在个人设备数据上运行 UI 测试
xcodebuild -project ios/Fanggu.xcodeproj -scheme Fanggu \
  -destination 'platform=iOS Simulator,name=Fanggu Community Prototype' \
  -parallel-testing-enabled NO -collect-test-diagnostics never -only-testing:FangguTests \
  -only-testing:FangguUITests/CommunityUITests test
git diff --check
```

Python 测试使用临时数据库及随机端口，覆盖真实 HTTP、持久化、身份、五分制、完整评分门槛、更新/删除/重试/冲突、关注、屏蔽和账号删除。Swift 测试覆盖五分制与旧五星隔离、同步请求持久化、切换中断恢复以及个人记录保护。`CommunitySyncTests` 还连接实际服务验证断网队列、冲突、账号隔离和删除；未启动服务时该项明确跳过，其他单元测试仍可离线运行；UI 测试通过真实网络验证账号、社区、关注、单机模式与公开同步。

## 主要接口

所有写入要求 `Authorization: Bearer <token>`（注册和登录除外）；错误返回 `{ "error": "可读说明" }`。

| 接口 | 用途 |
| --- | --- |
| `GET /health` | 运行检查 |
| `POST /v1/auth/register`, `/login`, `/logout` | 账号与会话 |
| `GET/PATCH/DELETE /v1/me` | 自己的资料及删除账号 |
| `GET /v1/me/reviews` | 当前账号的评价与删除记录 |
| `PUT /v1/me/reviews/:siteID` | 带版本和幂等键的完整评价更新 |
| `GET /v1/reviews` | 按 `site`、`user`、`scope=latest/following`、`before` 翻阅 |
| `GET /v1/sites/:siteID/community` | 社区总分、完整人数、短评数与六维均值 |
| `GET /v1/discover`, `/users?q=…` | 近期古迹与用户发现 |
| `GET /v1/users/:id`, `/:id/followers`, `/:id/following` | 公开主页与关系列表 |
| `PUT/DELETE /v1/users/:id/follow`, `/:id/block` | 关注及屏蔽 |
| `GET /v1/me/blocks` | 屏蔽列表 |
| `POST /v1/reports` | 提交举报 |

运行数据库在 `.gitignore` 内。备份 SQLite 前使用 SQLite backup API，或先停止服务再复制数据库及其 WAL；不要把运行中的主文件单独复制当成一致备份。
