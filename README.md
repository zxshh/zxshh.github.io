# zxsの小屋

一个使用 Hexo 与 Stellar 构建的个人技术知识库，记录控制理论、机器人、无人机、嵌入式和工程工具。

## 快速开始

要求：Node.js 22、Git、Pandoc。

```powershell
cd E:\project_Code\hexo\blog
npm ci
npm run dev
```

浏览器访问 <http://localhost:4000>。预览草稿使用：

```powershell
npm run dev:draft
```

提交前必须执行：

```powershell
npm run check
```

通过后提交并推送 `main`，GitHub Actions 会自动发布网站。

## 写新内容

普通博客文章：

```powershell
npx hexo new post "四旋翼姿态控制建模"
```

草稿：

```powershell
npx hexo new draft "LQR 控制器推导"
npx hexo publish "LQR 控制器推导"
```

Wiki 页面需要指定目标路径和 Wiki ID：

```powershell
npx hexo new wiki --path wiki/control/modern-control/lqr "LQR 状态反馈"
```

然后将生成文件中的 `wiki:` 改为 `control`，并在 `source/_data/wiki/control.yml` 的 `tree` 中登记它。

Notebook 页面：

```powershell
npx hexo new note --path notes/research/attitude-test "姿态环实验记录"
```

## 内容放置规则

- `source/_posts/`：项目复盘、完整教程、阶段总结。
- `source/wiki/`：已经整理成熟的体系知识。
- `source/notes/`：实验、参数、踩坑、临时推导与研究日志。
- `source/_drafts/`：未公开的文章草稿。
- `source/assets/`：网页实际引用的优化图片。

详细规范见 [内容写作规范](docs/CONTENT_GUIDE.md) 与 [维护手册](docs/MAINTENANCE.md)。本轮整理的具体变更见 [迁移记录](docs/CHANGELOG-2026-07-12.md)。

