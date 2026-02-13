# Data Model: 004-pattern-per-page

**Feature**: 設計模式一頁一模式與亮色主題範例可讀性  
**Date**: 2025-02-13

本 feature 為前端重構，無後端儲存。此處描述**路由與專頁對應**、**專頁內容結構**與**程式碼範例區塊樣式約定**，供實作對齊。

## 設計模式清單（沿用）

模式清單仍由 **patternList.js** 單一來源維護，含：slug、nameZh、category、description。供 DesignPatternLab（hub）分組列表與連結使用。結構與 002 之 data-model 一致，不重複列舉 23 個 slug。

## 路由與專頁對應

| 路由 | 對應元件 | 說明 |
|------|----------|------|
| `/design-pattern` | DesignPatternLab | 總覽，依類別篩選並連結至各 `/design-pattern/<slug>` |
| `/design-pattern/singleton` | SingletonPage | 沿用既有 |
| `/design-pattern/factory-method` | FactoryMethodPage | 一模式一 Page，其餘 21 個同理 |
| … | … | 共 23 條路由（1 hub + 23 專頁） |
| `/design-pattern/<未知>` | Navigate to `/design-pattern` | 無效 slug 導向總覽 |

**實作建議**：可建立 slug → 元件對照表，在 main.jsx 中迴圈註冊 Route，或逐筆撰寫 23 條 Route；任一種皆需保證「每模式一專頁、一 URL」。

## 專頁內容結構（邏輯）

每個模式專頁（含 Singleton）須包含：

1. **標題區**：模式名稱、簡述（可自 patternList 或自帶）、導覽（回設計模式、回首頁）、主題切換按鈕
2. **解釋區塊**：何謂該模式、為何需要、適用情境、與他模式區別
3. **使用方式區塊**：何時使用、概念性使用方式、注意事項
4. **程式碼範例區塊**（若有）：Java / Spring Boot 範例，使用全站程式碼區塊樣式（見下）

內容來源：該 Page 元件內或該模式專屬內容模組，**不**從 patternContent.js 查表。

## 程式碼範例區塊樣式約定

為滿足亮色／暗色主題下皆可讀：

- **CSS 變數**（定義於全站樣式，如 HomePage.css）：
  - `--code-bg`：程式碼區塊背景色
  - `--code-text`：程式碼區塊文字色
- **暗色主題**（:root 或 :root[data-theme="dark"]）：設定深色底、淺色字，與現有可讀性一致。
- **亮色主題**（:root[data-theme="light"]）：設定淺色底、深色字，對比度至少滿足可讀（建議 WCAG AA：4.5:1 以上）。

所有設計模式專頁內的 `<pre>` 程式碼區塊須使用上述變數（例如 `background: var(--code-bg); color: var(--code-text);`），不得僅使用僅適合暗色之 fallback。

## 驗證對應規格

- FR-001：每個設計模式有專屬頁面與固定網址，總覽可導向該頁
- FR-002：專頁內容來自該模式專屬來源，不依賴 patternContent.js 動態查表
- FR-003：總覽列出所有模式並連結至對應專頁，篩選行為不變
- FR-004：專頁含標題、說明、使用方式、程式碼範例（若有），版面與導覽一致
- FR-005、FR-006：程式碼區塊使用 --code-bg / --code-text，亮色與暗色主題下皆可讀
- FR-007：無效模式路徑導向 /design-pattern
