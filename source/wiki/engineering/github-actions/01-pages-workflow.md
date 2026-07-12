---
wiki: engineering
title: GitHub Actions：逐段理解本站 Pages 工作流
date: 2026-07-12
updated: 2026-07-12
tags: [GitHub Actions, GitHub Pages, CI/CD]
---

# GitHub Actions：逐段理解本站 Pages 工作流

GitHub Actions 是 GitHub 提供的自动化运行环境。你把规则写进仓库的 `.github/workflows/*.yml`，GitHub 在指定事件发生时启动一台临时 Linux 机器执行这些规则。

本站的规则位于：

```text
.github/workflows/pages.yml
```

它完成的是一条典型 CI/CD 链路：

```text
推送 Markdown 与配置
→ 临时 Ubuntu 机器
→ 安装 Node、Pandoc、项目依赖
→ 内容校验与 Hexo 构建
→ 上传 public 作为构建产物
→ GitHub Pages 部署
```

## 工作流的触发条件

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

- `push main`：日常发布。代码推送到主分支后构建并部署。
- `pull_request main`：分支合并前构建检查，但不部署。
- `workflow_dispatch`：在 GitHub Actions 页面手动点击运行，适合排查或重新部署。

因此可以把 `main` 理解成“生产环境”：它上的提交必须能构建。

## Build Job 做了什么

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

`job` 是一组在同一台临时机器上顺序执行的步骤。`ubuntu-latest` 表示 GitHub 提供的 Ubuntu 环境，每次运行都是新的干净环境。

后续步骤依次是：

1. `actions/checkout`：下载本次提交的源码。
2. `actions/setup-node`：安装 Node.js 22，并缓存 npm 下载内容。
3. `apt-get install pandoc`：安装 Markdown/公式渲染器。
4. `npm ci`：严格按锁文件安装依赖。
5. `npm run check`：运行内容校验和 Hexo 构建。
6. `actions/upload-pages-artifact`：把 `public/` 上传成 Pages 部署产物。

本地能构建不代表云端一定能构建：Actions 是 Linux，而你的电脑是 Windows。因此 Pandoc 路径在 `_config.yml` 中配置为 `pandoc`，而不是某台电脑上的绝对 Windows 路径。

## Deploy Job 为什么单独存在

```yaml
deploy:
  if: github.event_name != 'pull_request'
  needs: build
```

`needs: build` 保证构建成功后才允许部署。`if` 保证 Pull Request 只检查不发布，避免未合并的试验分支覆盖正式网站。

部署作业使用：

```yaml
permissions:
  pages: write
  id-token: write
```

这两项是 `actions/deploy-pages` 部署到 GitHub Pages 所需的最小权限。不要为了省事把 workflow 权限写成全局 `write-all`。

## 怎样查看一次发布是否成功

1. 打开仓库 GitHub 页面。
2. 点击顶部 **Actions**。
3. 选择 **Deploy Hexo site**。
4. 点击最新运行记录。
5. 先看 `build`，再看 `deploy`。

最常见情况：

| 失败位置 | 常见原因 | 本地先做什么 |
| --- | --- | --- |
| Install dependencies | `package-lock.json` 与 `package.json` 不一致 | `npm ci` |
| Validate and build | Front Matter、图片路径、Wiki 登记或 Hexo 配置错误 | `npm run check` |
| Install Pandoc | Actions 临时网络或 apt 问题 | 重新运行一次；持续失败再排查 workflow |
| Deploy | Pages 设置、权限或 artifact 问题 | 检查 Settings → Pages 是否为 GitHub Actions |

## 如何安全修改工作流

工作流等同于“云端执行脚本”，比普通 Markdown 风险更高。修改它时：

1. 创建分支，例如 `ci/improve-pages-cache`。
2. 只改一个目的明确的部分。
3. 推送分支，观察 Pull Request 构建是否成功。
4. 确认后再合并 `main`。

不要把 Token、密码、API Key 直接写进 `pages.yml`。未来确实需要密钥时，放在仓库 Settings → Secrets and variables → Actions，并通过 `${{ secrets.NAME }}` 使用。

