# Research: 004-pattern-per-page

**Feature**: 設計模式一頁一模式與亮色主題範例可讀性  
**Date**: 2025-02-13

## 1. 一模式一專頁的實作方式

**Decision**: 每個設計模式對應**一個獨立 Page 元件**（如 `FactoryMethodPage.jsx`），共 22 個非 Singleton 的 Page；Singleton 沿用既有 `SingletonPage.jsx`。路由在 `main.jsx` 中為每個 slug 註冊一筆 Route，或使用一份「slug → 元件」對照表以單一迴圈註冊，避免 23 筆手寫 Route 重複。

**Rationale**:
- Spec FR-001、FR-002 要求專屬頁面且內容來自該模式專屬來源；一模式一元件最直接滿足「不依賴單一動態資料檔查表」。
- 總覽清單（patternList.js）維持單一來源，僅供 hub 列表與路由對照使用；專頁內容不再從 patternContent.js 讀取。

**Alternatives considered**:
- 保留單一 PatternPage + 每模式一個內容模組（如 `content/factory-method.js`）由 Route 傳入：仍可達成「內容專屬」，但 spec 明確要求「不要透過 patternContent.js 做動態處理」且「使用各自的 Page 做顯示」，故採用各自 Page 元件。
- 動態 import：增加複雜度且本專案無需按需載入，不採用。

---

## 2. 專頁內容的存放方式

**Decision**: 每個模式專頁的內容（說明、使用方式、程式碼範例）**直接寫在該 Page 元件內**，或放在該模式專屬的內容模組（如 `content/factory-method.js`）由對應 Page 匯入。**不**再使用共用的 `patternContent.js` 與 `getPatternContent(slug)`。現有 patternContent.js 中的內容可在實作時遷移到各 Page 或各 content 模組後，刪除或棄用 patternContent.js。

**Rationale**:
- FR-002 要求「每個模式專頁的內容必須來自該模式專屬的來源」；每模式一檔案（Page 或 content 模組）符合「專屬來源」且易於維護與擴充。
- 修改單一模式時僅改動該模式對應的單一檔案，不影響其他模式。

**Alternatives considered**:
- 保留 patternContent.js 僅作「內容來源」但由各 Page 依 slug 匯入對應 key：仍為單一檔案查表，與 spec「不依賴單一動態資料檔」不符。
- 每模式一個 MD 檔再編譯：引入建置步驟與依賴，過度設計，不採用。

---

## 3. 程式碼範例區塊在亮色主題下可讀

**Decision**: 在全站樣式（如 `HomePage.css`）中定義**程式碼區塊專用 CSS 變數**：`--code-bg`、`--code-text`。在 `:root`（暗色預設）與 `:root[data-theme="light"]` 分別設定合適的底色與文字色，使對比度在兩種主題下皆符合可讀性（建議亮色主題下至少滿足 WCAG AA 對比）。所有設計模式專頁內的程式碼 `<pre>` 使用該變數（例如 class `.code-block` 或 style `background: var(--code-bg); color: var(--code-text);`），不再使用僅適合暗色的 fallback（如 `#1e293b`、`#e2e8f0`）。

**Rationale**:
- 目前 PatternPage 與 SingletonPage 使用 `var(--card-bg, #1e293b)` 與 `var(--text, #e2e8f0)`；專案中實際定義的是 `--text-main` 而非 `--text`，且亮色主題下若未正確套用，程式碼區塊會難以辨識。專用變數可明確控制程式碼區塊在兩種主題下的表現。
- 集中在一處定義，所有設計模式專頁一致套用，易於維護。

**Alternatives considered**:
- 僅改用 `--text-main` / `--card-bg`：在亮色主題下 card-bg 與頁面背景接近，程式碼區塊對比可能不足；專用變數可針對程式碼區塊調校（例如亮色主題下略深的灰底 + 深色字）。
- 每頁內聯不同色碼：不一致且難維護，不採用。

---

## 4. 無效模式路徑的處理

**Decision**: 當造訪的 path 為 `/design-pattern/<非已知 slug>` 時，**導向 `/design-pattern`**（設計模式總覽），不顯示空白或錯誤頁。實作上可保留一筆 catch-all Route（如 `path="/design-pattern/:slug"` 且僅在 slug 不在清單時渲染）導向 Navigate to `/design-pattern`，或不再使用動態 `:slug` 而改為 23 條明確 Route，則未知 path 由 React Router  fallback 或 404 處理後導向 hub（依專案既有 404 設定）。

**Rationale**:
- Spec FR-007、Edge case 要求無效路徑導向總覽或約定 fallback；導向 hub 最簡單且符合使用者預期。

**Alternatives considered**:
- 專用「找不到該模式」頁：可選，非 spec 強制；MVP 以導向 hub 為足。
