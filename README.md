# 鹈鹕对照室 · Pelican Compare

2026-09-26 七次独立对话生成的「鹈鹕骑自行车」HTML + SVG 原作对比。

**在线查看：https://unimpl.github.io/pelican-compare/**

| 模型 | 推理强度 |
| --- | --- |
| GPT-6 Sol | medium / high / xhigh |
| GPT-6 Astra | low / medium / high / xhigh |

原始提示词：`使用html + svg 实现 鹈鹕骑自行车`

- 同强度并排展示，支持按强度筛选；手机上逐项排列。
- 预览使用统一的 1200 × 850 视口等比缩放；点击「打开原作」查看完整交互。
- `artifacts/` 保存原始生成文件，内容未经修改；`data.json` 记录模型、强度、对话开始时间（UTC）与文件 SHA-256。
- 模型及强度来自生成时的对话记录。未发布完整对话、内部任务 ID 或本地路径。
- 仅为单次生成样本展示，不构成严格评测；生成环境、工具使用及随机性也会影响结果。

## 本地运行

直接打开 `index.html`，或在此目录执行：

```sh
python3 -m http.server 8080
```

打开 http://localhost:8080 。无需构建或外部依赖。

## 发布

GitHub Pages 从 `main` 分支根目录发布，`.nojekyll` 禁用 Jekyll 处理。
