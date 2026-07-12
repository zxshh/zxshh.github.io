---
wiki: engineering
title: 工程工具知识库
date: 2026-07-12
updated: 2026-07-12
tags: [工程工具]
---

这里不仅记录 MATLAB、Simulink、ROS 2、Linux、Git、Docker 的命令，更关注它们如何组成可复现、可维护的工程流程。

## 建议学习顺序

1. [Git：心智模型与日常工作流](/wiki/engineering/git/01-mental-model-and-daily-workflow/)：先学会安全保存、查看和提交改动。
2. [Git：分支、回退与恢复](/wiki/engineering/git/02-branches-and-recovery/)：再学会在不影响主线的情况下试错。
3. [Node、npm 与 npx](/wiki/engineering/node/01-node-npm-npx/)：理解为什么网站需要 `npm ci`、`npm run` 与 `npx`。
4. [GitHub Pages 工作流](/wiki/engineering/github-actions/01-pages-workflow/)：逐段理解本站如何自动构建与发布。
5. [内容发布 SOP](/wiki/engineering/website/01-publish-content/)：把知识变成每次都能执行的操作流程。

先用这个网站练习。等流程熟练后，同一套 Git、GitHub Actions、依赖锁定和自动检查方法可以直接迁移到 C++、ROS 2、无人机和科研复现项目。
