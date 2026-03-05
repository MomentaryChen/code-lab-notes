# Research: 005-system-architecture-section

**Feature**: 系統架構區塊（限流與壟斷介紹）  
**Date**: 2025-03-05

## 1. 系統架構區塊的放置與進入方式

**Decision**: 在首頁「網站主軸」現有三個 pillar（演算法、設計模式、Spring Boot）之後，**新增第四個 pillar**「系統架構」，連結至新路由 `/system-architecture`。系統架構的完整內容（標題、簡介、限流、壟斷）放在**單一專屬頁面**，不與其他主軸共用頁面。

**Rationale**:
- Spec FR-001 要求區塊可經由站內導覽或既定入口進入；首頁主軸為既有導覽慣例，新增 pillar 符合「合理步驟內到達」（首頁 → 點系統架構 → 即進入，一步）。
- 設計模式、Spring Boot 皆為「主軸卡片 → 專屬頁面」模式，系統架構比照可維持一致體驗與程式結構。

**Alternatives considered**:
- 將系統架構作為設計模式或演算法底下的子分類：規格要求為獨立「區塊」且主題為系統架構（限流、壟斷），與設計模式／演算法範疇不同，故採獨立主軸。
- 僅在首頁內摺疊展開兩小節：首頁會過長且不利錨點分享；獨立頁面較符合 SC-004（小節可單獨連結）。

---

## 2. 限流／壟斷小節的錨點命名

**Decision**: 小節使用 **英文 id** 作為錨點（如 `rate-limiting`、`monopoly`），對應標題仍為中文「限流」「壟斷」。理由：URL 與錨點在部分環境下對非 ASCII 支援不一，英文 id 較穩妥且與現有專案路由命名慣例一致（如 `/design-pattern/factory-method`）。

**Rationale**:
- SC-004 要求兩小節可單獨被連結或錨點存取；使用穩定、可分享的 id 即可滿足。
- 若未來需 i18n 或 SEO，英文 fragment 較通用。

**Alternatives considered**:
- 使用中文 id（如 `#限流`）：部分舊版瀏覽器或分享連結可能編碼問題，不採用。
- 僅依賴捲動、無錨點：不符合 SC-004，不採用。

---

## 3. 頁面版型與內容來源

**Decision**: 系統架構頁**版型對齊既有單頁內容頁**（如 SpringBootPage）：header（回首頁、標題、副標／簡介、主題切換）、main 內為區塊簡介段落與兩個 `<section>`，各 section 具 `id` 與 `<h2>` 標題。內容可**直接寫在 SystemArchitecturePage.jsx**，或抽出為同目錄下 `content.js`（或 `content/system-architecture.js`）由頁面匯入，以利後續擴充第三個主題時維護。

**Rationale**:
- FR-005 要求結構清晰、段落長度適中；section + h2 結構有助 30 秒內辨識兩小節（SC-002）與 5 分鐘內讀完（SC-003）。
- 單一頁面單一檔案即可滿足 MVP；內容模組為可選，依 tasks 實作時決定。

**Alternatives considered**:
- 每小節獨立路由（如 `/system-architecture/rate-limiting`）：規格要求兩小節在同一區塊內、可依序或選擇性閱讀，單頁多 section 加錨點即可，無需多路由，避免過度設計。
- MD 檔 + 編譯：引入建置步驟與依賴，不採用。
