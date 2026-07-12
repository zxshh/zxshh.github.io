---
wiki: engineering
title: Node、npm、npx 与项目脚本
date: 2026-07-12
updated: 2026-07-12
tags: [Node.js, npm, npx, 工具链]
---

# Node、npm、npx 与项目脚本

Hexo 是运行在 Node.js 上的静态网站程序。可以把这几个名词按层理解：

```text
Node.js：运行 JavaScript 工具的运行时
npm：下载、记录和执行 Node 项目依赖的包管理器
npx：临时或优先使用本项目依赖来运行一个命令
Hexo：本项目通过 npm 安装的具体工具
```

## 四个关键文件/目录

| 名称 | 是否提交 Git | 用途 |
| --- | --- | --- |
| `package.json` | 是 | 声明项目名称、依赖版本范围和常用脚本 |
| `package-lock.json` | 是 | 锁定依赖的精确版本与下载来源 |
| `node_modules/` | 否 | 实际安装的依赖文件，可随时重装 |
| `.nvmrc` | 是 | 指明本项目推荐 Node 22 |

`node_modules/` 很大且由前两个文件恢复，因此放进 `.gitignore`。换电脑时不复制它，而是在项目根目录运行：

```powershell
npm ci
```

## npm install 和 npm ci

```powershell
npm install
npm ci
```

- `npm install`：根据 `package.json` 安装依赖；必要时可能更新 `package-lock.json`。
- `npm ci`：严格按照已有 `package-lock.json` 重新安装；会先清理已有 `node_modules`，适合新电脑、CI 和复现问题。

因此本站的 GitHub Actions 使用 `npm ci`，这样云端构建与本地锁定的依赖一致。

## npm run：运行项目定义好的动作

本站 `package.json` 中定义了：

```text
npm run dev        启动本地预览
npm run dev:draft  连草稿一起预览
npm run validate   检查 Wiki、Notebook、图片和禁止链接
npm run check      校验后清理并构建
npm run build      生成 public 静态文件
npm run clean      删除生成缓存与 public
```

`npm run check` 是发布前最重要的一条命令。它会先运行内容校验器，再执行 `hexo clean && hexo generate --bail`；任意步骤出错都会终止。

## npx：运行项目里的命令

```powershell
npx hexo new post "文章标题"
npx hexo new wiki --path wiki/control/topic/example "页面标题"
```

`npx` 会优先寻找当前项目 `node_modules/.bin` 内的可执行程序，因此这里运行的是本项目安装的 Hexo，而不是系统中版本未知的全局 Hexo。

不要随意对陌生包执行 `npx 包名`；如果包不在本地，npx 可能会下载它。对本项目已有命令，`npx hexo ...` 是安全且清晰的。

## 依赖更新原则

1. 先创建分支。
2. 修改依赖或合并 Dependabot Pull Request。
3. 执行 `npm ci`。
4. 执行 `npm run check`。
5. 本地预览首页、Wiki、公式与搜索。
6. 提交、推送，并检查 Actions。

升级主题或 Hexo 前，不要直接编辑 `node_modules`；真正的自定义配置都应放在项目根目录。

