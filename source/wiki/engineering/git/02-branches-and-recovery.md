---
wiki: engineering
title: Git：分支、回退与恢复
date: 2026-07-12
updated: 2026-07-12
tags: [Git, 分支, 回退]
---

# Git：分支、回退与恢复

分支可以理解为“指向某个提交的可移动标签”。`main` 是网站正式发布主线；推送到它会触发部署。因此，主题调整、插件尝试、工作流修改和大规模目录重组应在独立分支中完成。

普通文章、小型 Wiki 页面和普通图片通常可以直接在 `main` 提交。

## 安全的分支流程

```powershell
git pull --ff-only
git switch -c feat/mermaid-notes

# 编辑、预览、检查
npm run check
git add .
git commit -m "feat(engineering): add mermaid examples"
git push -u origin feat/mermaid-notes
```

此时 GitHub 会运行 Pull Request 构建检查，但不会部署 Pages，因为工作流只在 `main` 上部署。确认后在 GitHub 网页创建 Pull Request，再合并到 `main`。

完成后更新本地主线：

```powershell
git switch main
git pull --ff-only
git branch -d feat/mermaid-notes
```

## 三种“回退”要分清

### 修改尚未暂存

你刚改错一个文件，还没有 `git add`：

```powershell
git restore source\wiki\control\index.md
```

这会将该文件恢复到最近一次 commit 的内容，当前未保存的修改会消失。

### 已提交，但还未推送

最安全的方式通常是继续修改并创建一个修复提交。如果确实需要撤销最近一次提交、但想保留文件改动：

```powershell
git reset --soft HEAD~1
```

它只适合最近提交未推送、且只影响自己时使用。

### 已推送并已部署

使用 `git revert` 创建一次反向提交：

```powershell
git log --oneline
git revert <错误提交的短哈希>
git push
```

它不会改写公共历史，GitHub Actions 会将回退后的版本重新部署。这是公开主分支最推荐的恢复方式。

## 合并冲突怎么办

冲突表示 Git 无法判断两处编辑如何组合。先运行：

```powershell
git status
```

打开冲突文件，寻找：

```text
<<<<<<< HEAD
本地内容
=======
远程内容
>>>>>>> origin/main
```

保留正确内容，删除标记后：

```powershell
git add 冲突文件
git commit
```

不确定时先复制冲突文件再求助；不要直接运行 `git reset --hard`。

## 本站已有的保护措施

- `legacy-static-20260712`：迁移前旧静态站的备份分支。
- Git 提交历史：每次文章、配置和工作流变更都有记录。
- Pull Request 构建：分支改动先构建检查，不自动部署。
- `npm run check`：推送前验证内容结构与 Hexo 构建。

