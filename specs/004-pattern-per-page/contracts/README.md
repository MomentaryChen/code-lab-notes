# Contracts: 004-pattern-per-page

本 feature 為前端重構，無 REST/API。此目錄記載**路由對應**與**程式碼區塊樣式**約定，供實作與驗收對齊。

## 路由約定

- **Hub**：`GET /design-pattern` → 渲染 `DesignPatternLab`。
- **專頁**：`GET /design-pattern/<slug>` → 渲染對應之 Page 元件；slug 與 patternList.js 一致，共 23 個。
- **Fallback**：若 slug 不在清單內，導向 `/design-pattern`（或專案既有 404 後導向 hub）。

詳見 [data-model.md](../data-model.md) 之「路由與專頁對應」。

## 程式碼範例區塊樣式約定

所有設計模式專頁內用於顯示程式碼的區塊（如 `<pre>`）須使用全站 CSS 變數：

- `--code-bg`：背景色（由主題切換決定）
- `--code-text`：文字色（由主題切換決定）

全站樣式須在 `:root` 與 `:root[data-theme="light"]` 分別定義上述變數，確保亮色主題下對比度足夠可讀。  
詳見 [data-model.md](../data-model.md) 之「程式碼範例區塊樣式約定」。
