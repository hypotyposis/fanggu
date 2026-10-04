# 文档索引

按“先读什么”排列。规则入口是仓库根目录的 [AGENTS.md](../AGENTS.md)；本目录保存机制、步骤与参考资料。

| 文档 | 何时读 | 内容 |
| --- | --- | --- |
| [架构与数据流](architecture.md) | 第一次进入仓库 | 仓库地图、两条数据流、源文件与生成文件、iOS 模块、素材分层、审图工具、环境依赖 |
| [常见任务](tasks.md) | 动手之前 | 改动 → 重建 → 验证矩阵，逐项操作步骤，常见陷阱 |
| [数据模型](data-model.md) | 改任何数据或记录格式之前 | `sites.js`、`catalog.js`、国保 JSON、研究记录、队列与清单、`catalog.json`、个人记录 `library.json` 的字段与约束 |
| [测试与验证](testing.md) | 交付之前 | 测试层次与前置条件、没有本地素材时能跑什么、子集命令、原生测试、汇报约定 |
| [术语表](glossary.md) | 遇到不懂的名词 | 线稿／设色／图版／原型模式／验收状态／素材层级等 |
| [开发指南](development.md) | 需要机制细节 | 环境、本地资源包、模块关系、数据约束、命令副作用、新增古迹检查清单、验证矩阵、文档维护 |
| [增量制图操作手册](monument-batch-workflow.md) | 新增或重绘古迹 | 原型模式、批次计划模板、搜索与并发预算、返工止损、集中接入、恢复与耗时报告 |
| [国保标签与选目规则](national-protection.md) | 维护国保资料或拟选目 | 标签确定方式、官方来源、源数据字段与命令 |
| [reviews/](reviews/) | 了解产品设计决策的来龙去脉 | 带日期的 UIUX 评审与修复记录；历史资料，不是新任务的授权 |

目录之外还有：[iOS 开发说明](../ios/README.md)（App 行为、构建、原生测试）、[图版说明](../assets/README.md)（素材目录与历史批次）、[线稿规范](../assets/research/STYLE.md)、[设色流程](../assets/color-research/WORKFLOW.md)、[脚本一览](../scripts/README.md)、[测试一览](../tests/README.md)。
