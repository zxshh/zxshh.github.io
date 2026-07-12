# 内容写作规范

## 三种内容

| 类型 | 适用内容 | 目录 |
| --- | --- | --- |
| Post | 教程、复盘、成果与阶段总结 | `source/_posts/` |
| Wiki | 长期维护的系统知识 | `source/wiki/` |
| Notebook | 实验、过程记录、待验证结论 | `source/notes/` |

Notebook 先记录事实，Wiki 再整理稳定结论，Post 最后输出完整叙事。

## Front Matter

普通文章：

```yaml
---
title: 四旋翼姿态控制建模
date: 2026-07-12
updated: 2026-07-12
description: 从建模到仿真的整理
categories:
  - [无人机, 建模与控制]
tags: [四旋翼, Simulink]
mathjax: true
---
```

Wiki 页面必须有已登记的 `wiki` ID：

```yaml
---
wiki: control
title: LQR 状态反馈
date: 2026-07-12
updated: 2026-07-12
tags: [现代控制, LQR]
mathjax: true
---
```

Notebook 页面必须有 `notebook`：

```yaml
---
title: 姿态环实验记录
date: 2026-07-12
updated: 2026-07-12
notebook: research
tags: [UAV/姿态控制]
---
```

更新已有文章时同步修改 `updated`。分类表达知识树，标签表达横向关键词；不要用两者重复表达同一层级。

## Wiki 目录

当前 Wiki ID：

- `control`：自动控制、现代控制、最优控制、系统辨识、状态估计。
- `robotics`：运动学、动力学、规划、控制、SLAM。
- `uav`：飞行力学、建模、制导导航控制、PX4、轨迹规划。
- `embedded`：MCU、RTOS、通信、驱动、调试。
- `engineering`：MATLAB、Simulink、ROS 2、Linux、Git、Docker。
- `computer-science`：C++、算法、LeetCode、软件工程。

新增一个 Wiki 需要同时：创建 `source/_data/wiki/<id>.yml`、把 `<id>` 加入 `source/_data/wiki.yml`、创建 `source/wiki/<id>/index.md`。

## 图片与资源

网页图片存放在：

```text
source/assets/<domain>/<article-slug>/
```

例如：

```text
source/assets/uav/quadrotor-model/body-frame.webp
```

在文章中使用根路径：

```markdown
![机体系](/assets/uav/quadrotor-model/body-frame.webp)
```

规则：流程图优先 SVG；截图和照片优先 WebP；单个网页资源不超过 5 MiB；文件名只使用小写英文、数字和连字符。原始照片、Draw.io 源文件、实验录像和大数据不进入本仓库，应另行备份或发布到外部存储。

## 链接与 Obsidian

公开内容禁止 `[[Wikilinks]]`、`![[嵌入]]` 和以 `.md` 结尾的链接。已发布页面使用稳定网站路由：

```markdown
[能控性](/wiki/control/modern-control/controllability/)
[跳转到判据](#能控性判据)
```

未来使用 Obsidian 时关闭 `Use [[Wikilinks]]`，开启自动更新内部链接，并生成标准 Markdown 链接。私人 Vault 可保留 Obsidian 专有语法，但复制到本仓库前必须转换。

