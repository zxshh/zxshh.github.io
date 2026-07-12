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

## 已完成的远程迁移

- 原静态站 `main` 已备份到 `legacy-static-20260712` 分支。
- Hexo 源码迁移提交已推送到 `main`：`e37bfad`。
- GitHub Pages 已切换为 GitHub Actions 工作流发布。
- 首次手动发布工作流已成功完成，线上首页返回 HTTP 200 并加载本地头像资源。
