# 鹈鹕对照室 · Pelican Compare

2026-09-26 十次独立对话生成的「鹈鹕骑自行车」原作对比。

**在线查看：https://unimpl.github.io/pelican-compare/**

| Agent | 模型 | 推理强度 | 作品数 |
| --- | --- | --- | --- |
| Codex | GPT-6 Sol | medium / high / xhigh | 3 |
| Codex | GPT-6 Astra | low / medium / high / xhigh | 4 |
| Iota（个人开发） | GLM-5.3 | medium（默认） | 1 |
| pi | DeepSeek-V4-Flash-0731 | high | 1 |
| pi | GLM-5.3 | high | 1 |

按推理强度分组并排展示，支持强度筛选，手机上逐项排列。不同 agent、模型的强度标识不代表相等计算预算；本项目仅展示单次样本，不构成严格模型评测。

## 原作与来源

- `artifacts/` 保存十份未经修改的原始作品。
- Iota 原作是 SVG，额外提供一个仅用于等比展示的 HTML 容器；仍可直接打开 SVG。
- `data.json` 记录 agent、模型、强度、对话开始时间、提示词与原作 SHA-256。`data.js` 是相同数据的离线可用版本。
- Codex 和 pi 的模型、强度来自生成时的 session。两份 pi 会话在发送提示词前均已切换到 high。
- Iota 的模型来自 session；默认 medium 来自作品提供者确认，session 未单独记录推理强度，以 `effortSource: user-provided` 标明。
- Iota 提示词为 `使用svg实现鹈鹕骑自行车`，其他九份为 `使用html + svg 实现 鹈鹕骑自行车`。
- 不发布完整会话、内部 session ID 或本地路径。
- 预览统一使用 1200 × 850 视口等比缩放，打开原作可查看完整交互。

## 本地运行

直接打开 `index.html`，或运行 `python3 -m http.server 8080` 后访问 http://localhost:8080 。无需构建或外部依赖。

## 发布

GitHub Pages 从 `main` 分支根目录发布，`.nojekyll` 禁用 Jekyll 处理。
