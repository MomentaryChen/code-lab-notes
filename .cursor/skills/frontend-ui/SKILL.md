---
name: frontend-ui
description: 專案 HTML 頁面之 UI/UX 設計、色彩、元件風格與互動規範。Use when styling pages, designing cards/buttons, implementing hover/focus, or ensuring responsive layout and accessibility.
---

# 前端 UI/UX 主軸

## 何時使用
- 設計或修改頁面樣式、版面、元件（按鈕、卡片、標籤）
- 實作 hover/focus、鍵盤可達性、響應式斷點
- 統一視覺語言（色彩、陰影、圓角、字型）

## 核心規範（必讀）
- [.cursor/rules/html-ui-ux-style.mdc](../../rules/html-ui-ux-style.mdc) — 整體視覺、版面、元件、互動、視覺化、響應式、文案

## 快速要點
- **主題**：深色背景 + 霓虹感重點色（藍/紫/青綠），高對比文字。
- **Body**：`radial-gradient(circle at top left, #1d283a, #020617 55%)`，system-ui 字型，min-height 100vh。
- **卡片**：圓角 14–18px、深色背景、邊框與漸層；hover 上移、陰影變深。
- **按鈕**：主要操作用漸層膠囊；次要用淺灰。重用 `.btn-primary` / `.btn-secondary` / `.primary-action`。
- **標籤**：大寫 + letter-spacing，技術感（Sorting / Greedy / Pathfinding）。
- **互動**：150–250ms 過渡；可點擊區塊需 `tabindex="0"`、role、Enter/Space、focus 樣式。
- **響應**：約 880px 斷點改單欄；文字行寬約 60–80 字元；避免水平捲動。
- **語言**：繁體中文，術語可中英並列。
