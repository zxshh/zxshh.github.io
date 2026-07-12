# 2026-07-12 网站整理记录

## 已完成的修改

- 将站点 URL 从 `http://example.com` 修正为 `https://zxshh.github.io`。
- 修复 Pandoc 配置层级，改为跨平台的 `pandocPath: pandoc`。
- 关闭未来日期文章发布，使用文章日期作为默认更新时间。
- 移除本地 Git 部署配置，准备改用 GitHub Actions Pages。
- 缩减 Stellar 配置为覆盖项；Notebook 菜单 ID 统一为 `notebooks`；关闭第三方 AI 摘要；统一 Giscus 配置。
- 新增 GitHub Pages 工作流、内容校验脚本、Node 22 版本约束和月度 Dependabot。
- 建立 `control`、`robotics`、`uav`、`embedded`、`engineering`、`computer-science` 六个 Wiki。
- 将最优化和自动控制笔记迁入 `control` Wiki，保留 Izz 测量记录在 `research` Notebook。
- 删除 Hello World、Stellar 示例 Wiki、未配置的“其它项目”和重复自控文章。
- 建立 `source/assets/` 资源规范，并将个人头像与控制系统插图迁移为本地文件。
- 增加 README、写作规范和维护手册。

## 仍需在线完成的操作

- 将当前远程静态站 `main` 备份为 `legacy-static-20260712`。
- 将本地整理后的源码提交到远程 `main`。
- 在 GitHub 仓库 Settings → Pages 中选择 GitHub Actions。
- 确认首次 Actions 构建成功并检查线上页面。

