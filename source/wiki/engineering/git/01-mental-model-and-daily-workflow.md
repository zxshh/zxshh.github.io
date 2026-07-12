---
wiki: engineering
title: Git：心智模型与日常工作流
date: 2026-07-12
updated: 2026-07-12
tags: [Git, GitHub, 版本控制]
---

# Git：心智模型与日常工作流

Git 的核心不是“上传代码”，而是为项目保存一连串可回到过去的快照。每一个 commit 都是一个你可以命名、比较、分享和恢复的项目版本。

对本网站而言，Git 保存文章、图片、Hexo 配置、主题覆盖配置和 GitHub Actions 工作流；它**不**保存自动生成的 `public/`、安装后的 `node_modules/` 和本地数据库 `db.json`。

## 先建立四层模型

```text
工作区（你正在编辑的文件）
        ↓ git add
暂存区（下一次提交准备包含哪些改动）
        ↓ git commit
本地仓库（本电脑里的版本历史）
        ↓ git push
远程仓库（GitHub 上的 origin/main）
```

- **工作区**：你在 VS Code、Obsidian 或资源管理器中看到的文件。
- **暂存区**：一次 commit 的“候选清单”。`git add` 不是上传，只是选择要放入下一次快照的内容。
- **本地仓库**：`.git` 目录中的历史，断网时也可提交。
- **远程仓库**：GitHub 上名为 `origin` 的仓库。`push` 才会把本地提交传到 GitHub。

因此，`git commit` 和 `git push` 是两件事：前者保存到本电脑，后者同步到 GitHub。

## 本站日常工作流

每次准备写内容前，先进入项目目录：

```powershell
cd E:\project_Code\hexo\blog
git pull --ff-only
```

`git pull --ff-only` 会先从 GitHub 获取最新提交，再只在能安全“快进”时更新本地文件。若它报错，不要急着用强制命令；先运行 `git status`，确认是否有自己未提交的修改。

写完后，按下面顺序执行：

```powershell
git status
git diff
git add source/wiki/engineering/git/01-mental-model-and-daily-workflow.md
git diff --cached
git commit -m "docs(engineering): add git workflow guide"
git push
```

每一条命令的作用：

| 命令 | 它做什么 | 是否修改远程 |
| --- | --- | --- |
| `git status` | 列出修改、新文件和当前分支 | 否 |
| `git diff` | 查看尚未暂存的逐行差异 | 否 |
| `git add <文件>` | 把指定文件放入暂存区 | 否 |
| `git diff --cached` | 查看下一次 commit 的内容 | 否 |
| `git commit -m "..."` | 在本地创建一个历史快照 | 否 |
| `git push` | 上传本地提交并触发网站部署 | 是 |

## 提交信息怎么写

建议使用：`类型(范围): 动作`。

```text
docs(control): add lqr introduction
docs(uav): record attitude test
fix(site): correct local avatar path
chore(deps): update hexo dependencies
ci(pages): cache npm downloads
```

常用类型：

- `docs`：文章、Wiki、说明文档。
- `fix`：修复错误、链接、配置或页面问题。
- `feat`：新增网站功能、页面或工具。
- `chore`：依赖、配置和不改变读者功能的维护。
- `ci`：GitHub Actions 等自动化流程。

一次提交应只表达一个清楚的意图。比如“新增 LQR 笔记”和“升级主题”最好拆成两个提交，出问题时更容易定位和回退。

## 新手最常用的查看命令

```powershell
git status                 # 我现在改了什么？
git log --oneline -10      # 最近十次提交是什么？
git remote -v              # origin 指向哪里？
git branch -vv             # 我在哪个分支，是否跟踪远程？
git show HEAD              # 最近一次提交具体改了什么？
```

这些命令只读，不会破坏项目；不确定时优先使用它们。

## 不要在不理解前使用的命令

以下命令可能丢失未提交内容，遇到问题先停下来查状态或复制报错：

```powershell
git reset --hard
git clean -fd
git push --force
git checkout .
```

如果只是想丢弃某个**尚未暂存**文件的改动，优先使用更明确的：

```powershell
git restore 路径\文件.md
```

执行前仍应先用 `git diff` 看清楚将要丢弃的内容。

## 和这个网站的关系

当前 `main` 分支上的每次 `git push` 都会触发网站构建。GitHub Actions 读取本次提交里的 `_config.yml`、`package-lock.json`、`source/` 和 `.github/workflows/pages.yml`，在独立 Linux 环境中构建网站。

下一篇：[Git：分支、回退与恢复](/wiki/engineering/git/02-branches-and-recovery/)。
