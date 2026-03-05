# Implementation Plan: 系統架構區塊（限流與壟斷介紹）

**Branch**: `005-system-architecture-section` | **Date**: 2025-03-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-system-architecture-section/spec.md`

## Summary

在首頁「網站主軸」新增第四個區塊「系統架構」，並建立專屬頁面 `/system-architecture`，頁面內含：區塊標題與簡介、**限流**介紹小節、**壟斷**介紹小節；兩小節具錨點 id 以支援深層連結與 30 秒內辨識（SC-002、SC-004）。沿用既有 Vite + React、首頁 home-pillars 版型、單頁內容頁版型（與 Spring Boot 頁類似），不引入後端或新依賴，符合憲章 MVP 優先與避免過度設計。

## Technical Context

**Language/Version**: JavaScript (ES module)，React 19、Vite 7、React Router 7  
**Primary Dependencies**: react, react-dom, react-router-dom, vite；無後端  
**Storage**: N/A（靜態 SPA；系統架構頁內容為靜態或單一內容模組）  
**Testing**: 手動驗證首頁進入系統架構、頁面顯示標題與兩小節、錨點連結可達、導覽三步內可進入  
**Target Platform**: 現代瀏覽器，GitHub Pages 靜態部署  
**Project Type**: 單一前端 SPA，擴充 `src/pages/` 與首頁主軸  
**Performance Goals**: 與現有主軸區塊一致，頁面載入與導覽流暢  
**Constraints**: 不引入後端或新執行時依賴；正體中文；內容以概念介紹為主，不含實作細節  
**Scale/Scope**: 新增 1 個主軸區塊、1 條路由、1 個系統架構頁（含 2 個介紹小節）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 檢查結果 |
|------|----------|
| **I. 高品質** | 系統架構頁版型與既有 Spring Boot／設計模式 hub 一致；標題與小節結構清晰，與現有 CSS 風格一致。 |
| **II. 可測試性** | US1/US2/US3 具獨立可測情境（導覽進入區塊、限流／壟斷小節可見可讀、錨點可單獨存取）。 |
| **III. MVP 優先** | 先交付一頁含兩小節與首頁入口，可依 Phase 分批：先入口與頁殼，再補齊限流／壟斷文案。 |
| **IV. 避免過度設計** | 不新增後端、不引入新框架；僅新增一主軸卡片、一頁、兩小節內容與錨點。 |
| **V. 正體中文** | 所有標題、簡介、限流／壟斷說明與導覽維持正體中文。 |
| **額外約束：技術棧** | 依既有 Vite、React、pnpm；未新增技術。 |
| **額外約束：部署** | 維持 GitHub Pages 靜態部署，無需後端。 |

**Gate 結果**：通過，無需填寫 Complexity Tracking。

## Project Structure

### Documentation (this feature)

```text
specs/005-system-architecture-section/
├── plan.md              # 本檔
├── research.md          # Phase 0
├── data-model.md        # Phase 1（區塊與小節結構、路由）
├── quickstart.md        # Phase 1（在地執行、驗證步驟）
├── contracts/           # Phase 1（路由與頁面結構約定）
└── tasks.md             # Phase 2（/speckit.tasks 產出）
```

### Source Code (repository root)

新增系統架構主軸入口與單一系統架構頁；頁面含簡介與限流、壟斷兩小節並具錨點。

```text
src/
├── main.jsx                     # 新增 Route: /system-architecture → SystemArchitecturePage
├── pages/
│   ├── HomePage.jsx              # 新增第四個 home-pillar：系統架構，Link to="/system-architecture"
│   └── systemarchitecture/
│       └── SystemArchitecturePage.jsx   # 系統架構頁：標題與簡介、限流小節(id)、壟斷小節(id)、導覽與主題切換
└── (可選) pages/systemarchitecture/
    └── content.js               # 可選：限流／壟斷文案集中於此，由頁面匯入
```

**Structure Decision**:
- **首頁**：在 `HomePage.jsx` 的 `home-pillars` 內新增第四個 `<article>`，編號 4、標題「系統架構」、描述涵蓋限流與壟斷等概念介紹，`<Link to="/system-architecture">`。
- **系統架構頁**：新增 `SystemArchitecturePage.jsx`，版型對齊既有單頁內容頁（如 SpringBootPage）：header（回首頁、標題、簡介、主題切換）、main 內為區塊簡介與兩個 `<section>`，分別為「限流」（id 如 `rate-limiting` 或 `限流`）、「壟斷」（id 如 `monopoly` 或 `壟斷`），以利錨點連結；小節內為靜態說明文案。
- **路由**：`main.jsx` 新增 `<Route path="/system-architecture" element={<SystemArchitecturePage />} />`。
- **內容**：限流／壟斷介紹以概念與目的為主，不強制實作細節；文案可寫在頁面元件內或抽出為 `content.js` 以利維護。

## Complexity Tracking

> 本 feature 無憲章違反或過度設計，本節留空。
