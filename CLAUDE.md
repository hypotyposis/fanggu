# 访古 · Claude Code 入口

@AGENTS.md

本文件只负责把 Claude Code 接到仓库通用的代理约定上。规则正文在 [AGENTS.md](AGENTS.md)，不在此重复；两份文件同时被读取时以 AGENTS.md 为准。

- 第一次进入仓库先读 [架构与数据流](docs/architecture.md)，再按任务查 [常见任务](docs/tasks.md) 对应的步骤。
- 改数据前查 [数据模型](docs/data-model.md)；交付前按 [测试与验证](docs/testing.md) 选择并执行检查；不懂的名词查 [术语表](docs/glossary.md)。
- 图片素材不随 Git 交付。新克隆或 worktree 里，`sync-artwork.sh` 和大多数 Node 测试会因缺少 `assets/` 下的图片而失败；这是环境缺素材，不是代码缺陷。能运行的子集与恢复方法见 [没有本地素材时](docs/testing.md#没有本地素材时)。
