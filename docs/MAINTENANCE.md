# 维护手册

## 每次发布

1. 新建或编辑 Markdown，补齐 Front Matter。
2. 将网页图片导出到 `source/assets/`，不要依赖免费图床作为唯一来源。
3. 本地预览：`npm run dev`。
4. 发布前检查：`npm run check`。
5. 确认公式、图片、目录、搜索和链接正常后提交：

```powershell
git add .
git commit -m "docs(control): add lqr state feedback"
git push
```

推送到 `main` 后 GitHub Actions 会自动构建并发布。失败时先打开 GitHub 的 Actions 日志，根据失败步骤在本地运行 `npm run check` 复现。

## 每月

- 处理 Dependabot 的 npm 和 GitHub Actions 更新；每个更新都应先通过 `npm run check`。
- 检查失效外链、图片体积和无用标签。
- 将成熟 Notebook 整理为 Wiki 页面。
- 备份原始图片、图表源文件和实验数据。

## 每学期

- 复查 Wiki 目录是否仍符合研究方向。
- 整理课程、项目、论文复现和实验总结。
- 更新 About 页面与个人链接。
- 为较大版本创建 Git 标签，例如 `v2026-fall`。

## 升级依赖与主题

1. 新建分支。
2. 更新依赖或合并 Dependabot Pull Request。
3. 阅读 Stellar 更新说明，检查 `_config.stellar.yml` 覆盖项是否仍有效。
4. 运行 `npm ci` 与 `npm run check`。
5. 本地访问首页、Wiki、Notebook、公式页和移动端导航。
6. 合并后观察 GitHub Actions 发布结果。

不要直接修改 `node_modules/hexo-theme-stellar`。主题个性化只写在根目录 `_config.stellar.yml`。

