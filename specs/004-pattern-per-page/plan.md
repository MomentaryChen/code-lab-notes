# Implementation Plan: 設計模式一頁一模式與亮色主題範例可讀性

**Branch**: `004-pattern-per-page` | **Date**: 2025-02-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-pattern-per-page/spec.md`

## Summary

將設計模式專頁從「單一動態頁 + patternContent.js 查表渲染」改為**一模式一專頁**：每個模式有獨立 Page 元件與固定路由，內容來自該模式專屬來源（頁面內或每模式專屬模組），不再依賴 `patternContent.js` 動態查表。並修正**程式碼範例區塊**在亮色主題下的對比度，使範例在亮色／暗色主題下皆可讀。沿用既有 Vite + React、`patternList.js`（總覽清單）、DesignPatternLab（hub）；移除對 `patternContent.js` 的專頁渲染依賴，符合憲章 MVP 優先與避免過度設計。

## Technical Context

**Language/Version**: JavaScript (ES module)，React 19、Vite 7、React Router 7  
**Primary Dependencies**: react, react-dom, react-router-dom, vite；無後端  
**Storage**: N/A（靜態 SPA；模式清單由 patternList.js 維護，專頁內容由各 Page 或每模式專屬模組提供）  
**Testing**: 手動驗證總覽連結、每模式專頁獨立 URL 與內容、亮色主題下程式碼範例可讀、無效路徑導向 hub  
**Target Platform**: 現代瀏覽器，GitHub Pages 靜態部署  
**Project Type**: 單一前端 SPA，重構並擴充 `src/pages/designpattern/`  
**Performance Goals**: 與現有設計模式區塊一致，路由與主題切換流暢  
**Constraints**: 不引入後端或新執行時依賴；正體中文；總覽清單仍由單一來源（patternList.js）維護  
**Scale/Scope**: 23 個設計模式各一專頁（Singleton 沿用既有頁），共 23 條對應路由；程式碼範例區塊需雙主題可讀

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 檢查結果 |
|------|----------|
| **I. 高品質** | 各模式專頁版型與既有 Singleton 一致；程式碼區塊使用主題變數，與現有 CSS 變數風格一致。 |
| **II. 可測試性** | US1/US2/US3 具獨立可測情境（每模式獨立 URL、內容來源隔離、亮色主題範例可讀、無效路徑導向）。 |
| **III. MVP 優先** | 可依 Phase 分批：先路由與數個模式專頁 + 亮色範例樣式，再補齊其餘 22 個專頁。 |
| **IV. 避免過度設計** | 不新增後端、不引入新框架；僅重構為一頁一元件、內容拆出為每模式專屬，並新增程式碼區塊主題變數。 |
| **V. 正體中文** | 所有標題、描述、按鈕、導覽與各模式內容維持正體中文。 |
| **額外約束：技術棧** | 依既有 Vite、React、pnpm；未新增技術。 |
| **額外約束：部署** | 維持 GitHub Pages 靜態部署，無需後端。 |

**Gate 結果**：通過，無需填寫 Complexity Tracking。

## Project Structure

### Documentation (this feature)

```text
specs/004-pattern-per-page/
├── plan.md              # 本檔
├── research.md          # Phase 0
├── data-model.md        # Phase 1（路由對應、專頁結構、程式碼區塊樣式約定）
├── quickstart.md        # Phase 1（在地執行、驗證步驟）
├── contracts/           # Phase 1（路由與程式碼區塊樣式約定）
└── tasks.md             # Phase 2（/speckit.tasks 產出）
```

### Source Code (repository root)

一模式一 Page、每模式專屬內容來源；路由為每模式一筆；程式碼範例區塊使用主題感知 CSS 變數。

```text
src/
├── main.jsx                     # 路由：/design-pattern、/design-pattern/singleton、/design-pattern/<slug> 改為 23 條明確 Route
├── pages/
│   └── designpattern/
│       ├── DesignPatternLab.jsx # 沿用，依 patternList 分組列表，連結至各專頁
│       ├── SingletonPage.jsx    # 沿用，程式碼區塊改用主題變數
│       ├── FactoryMethodPage.jsx   # 新增：工廠方法專頁（內容自帶或專屬模組）
│       ├── AbstractFactoryPage.jsx # 新增：其餘 21 個模式各一 Page...
│       └── ...                  # 共 22 個非 Singleton 的 *Page.jsx（或依命名慣例）
├── styles/
│   └── HomePage.css             # 新增 :root / [data-theme="light"] 之程式碼區塊用變數（--code-bg, --code-text）
└── (可選) pages/designpattern/content/
    └── factory-method.js         # 每模式可選：內容模組供對應 Page 匯入，取代 patternContent[slug]
```

**Structure Decision**:
- **Hub**：`DesignPatternLab.jsx` 不變，仍依 `patternList.js` 依類別分組，連結至 `/design-pattern/<slug>`。
- **專頁**：Singleton 維持 `SingletonPage.jsx`；其餘 22 個模式各有一個 Page 元件（如 `FactoryMethodPage.jsx`），內容寫在該元件內或由同名的內容模組（如 `content/factory-method.js`）匯入，**不再**使用 `getPatternContent(slug)` 從 `patternContent.js` 查表。
- **路由**：`main.jsx` 中為每個 slug 註冊一筆 `<Route path="/design-pattern/<slug>" element={<XxxPage />} />`，共 23 條（含 `/design-pattern/singleton`）；或使用一個 route map 迴圈以符合「一頁一模式」且易於維護。無效 path 導向 `/design-pattern`。
- **程式碼範例**：所有設計模式專頁內的 `<pre>` 程式碼區塊使用 CSS 類別或內聯變數，引用全站定義的 `--code-bg`、`--code-text`（在 `:root` 與 `:root[data-theme="light"]` 分別定義），確保亮色主題下對比度足夠。
- **patternContent.js**：不再被任何專頁用於動態渲染；可於重構完成後刪除或保留僅供遷移參考，依 tasks 決定。

## Complexity Tracking

> 本 feature 無憲章違反或過度設計，本節留空。
