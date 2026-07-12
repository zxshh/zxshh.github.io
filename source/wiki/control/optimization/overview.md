---
wiki: control
title: 最优化问题概述
date: 2026-07-12
updated: 2026-07-12
tags: [最优化, 数学基础]
mathjax: true
---

# 最优化问题的一般形式

最优化问题通常在约束集合内寻找使目标函数最小或最大的决策变量。一个常见的最小化形式为：

$$
\begin{align}
\min_x \quad & f(x) \\
\text{s.t.}\quad & g_i(x) \le 0, \\
& h_j(x) = 0.
\end{align}
$$

后续将从凸优化、无约束优化、约束优化及其在最优控制中的应用逐步补全。
