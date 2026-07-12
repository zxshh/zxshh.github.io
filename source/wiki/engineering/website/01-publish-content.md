---
wiki: engineering
title: 本站发布内容 SOP：从 Markdown 到线上页面
date: 2026-07-12
updated: 2026-07-12
tags: [Hexo, 发布, GitHub Pages, SOP]
---

# 本站发布内容 SOP：从 Markdown 到线上页面

这篇是日常最常用的操作卡。每次发布文章、Wiki 或实验笔记都按它执行，不需要记住所有命令。

## 发布前：同步与启动预览

```powershell
cd E:\project_Code\hexo\blog
git pull --ff-only
npm run dev
```

访问 `http://localhost:4000/`。如果你写的是草稿，使用：

```powershell
npm run dev:draft
```

完成预览后，在运行服务的终端按 `Ctrl + C` 停止服务。

## 三种内容的创建方式

### 普通博客文章

适合项目复盘、完整教程、阶段总结：

```powershell
npx hexo new post "四旋翼姿态控制建模"
```

文件会创建在 `source/_posts/`。补齐 `title`、`date`、`updated`、`categories`、`tags` 和 `description`。

### Wiki 页面

适合已经形成稳定结构的知识：

```powershell
npx hexo new wiki --path wiki/control/modern-control/lqr "LQR 状态反馈"
```

打开新文件，将头部改为：

```yaml
wiki: control
```

然后编辑 `source/_data/wiki/control.yml`，把文件路径登记到对应章节：

```yaml
现代控制:
  - modern-control/lqr
```

`tree` 中的路径不写 `.md`，也不写 `wiki/control/` 前缀。

### Notebook 实验记录

适合实验参数、数据、现象、待验证问题：

```powershell
npx hexo new note --path notes/research/attitude-test "姿态环实验记录"
```

确保 Front Matter 中有：

```yaml
notebook: research
```

## 图片怎么放

网页图片先压缩，再放到：

```text
source/assets/<知识域>/<文章-slug>/
```

例如：

```text
source/assets/control/automatic-control/higher-order-response.png
```

正文使用：

```markdown
![高阶系统响应图](/assets/control/automatic-control/higher-order-response.png)
```

流程图优先 SVG，截图和照片优先 WebP。原始照片、实验录像、模型大文件和图表源文件放外部备份，不进入博客 Git。

## 发布检查

编辑完成后：

```powershell
npm run check
```

它会检查：

- Wiki 是否登记在 `wiki.yml`，是否拥有对应配置。
- Notebook 是否填写 `notebook`。
- 图片路径是否真实存在。
- 是否误用了 Obsidian 双方括号链接、`.md` 内部链接、旧图床或示例域名。
- Hexo 是否能从零生成静态网站。

只有检查通过再提交：

```powershell
git status
git add .
git commit -m "docs(uav): add attitude controller note"
git push
```

## 推送后发生什么

```text
git push
→ GitHub 收到 main 新提交
→ Actions 运行 pages.yml
→ npm ci + npm run check
→ public 上传并部署
→ https://zxshh.github.io 更新
```

通常几分钟内可见更新。若未更新，打开 GitHub 仓库的 Actions 页面；如果 Build 失败，先在本地执行 `npm run check` 重现错误。

## 出错时的最小排查顺序

```powershell
git status
npm run check
git log --oneline -5
```

不要一开始就删除文件、重新安装全部工具或使用强制 Git 命令。复制完整报错信息，先判断是内容、依赖、构建还是部署问题。
