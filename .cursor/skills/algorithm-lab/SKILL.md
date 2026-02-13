---
name: algorithm-lab
description: 撰寫或修改演算法教學頁面（排序、A*、貪婪等）時遵循格式、章節大綱與視覺化規範。Use when adding or editing algorithm pages, visualization, step-by-step content, or complexity tables.
---

# 演算法實驗室頁面

## 何時使用
- 新增/修改 `src/pages/algorithm/` 下演算法頁面（Sorting、A*、Greedy 等）
- 撰寫演算法步驟、視覺化區塊、複雜度表格或程式碼示範

## 核心規範（必讀）
專案規則已定義完整格式，實作前請讀取：
- **章節與結構**：[.cursor/rules/src-pages-outline.mdc](../../rules/src-pages-outline.mdc) — 檔案結構、主框架、章節大綱、步驟樣式、視覺化區塊、漂浮按鈕
- **UI 風格**：[.cursor/rules/html-ui-ux-style.mdc](../../rules/html-ui-ux-style.mdc) — 色彩、按鈕、卡片、響應式

## 快速檢查清單
- [ ] 完整 HTML + `lang="zh-Hant"`、viewport、標題
- [ ] 主框架：深色放射漸層 body、白底 `.container`、回首頁連結、`<h1>` + `.subtitle`
- [ ] 章節：`<h2>` 主節（概述／原理／步驟／視覺化／複雜度／比較）、`<h3>` 子節
- [ ] 步驟：沿用既有 `.step` + `.step-number` 或 `<ol class="step-list">`，勿新增第三種
- [ ] 視覺化：控制列（.btn-primary 等）+ 展示區（.array-display/.grid-container）+ .info-panel
- [ ] 複雜度：使用 .complexity-table 或 .comparison-table
- [ ] 右下角 .float-button（返回 + 回到頂部），scroll 超過約 300px 顯示
- [ ] 程式碼區塊：深背景、演算法核心流程、註解，優先 JavaScript/偽程式碼

## 文案
- 繁體中文、教學導向；章節命名與既有頁面一致（演算法原理、時間複雜度、視覺化示範等）。
