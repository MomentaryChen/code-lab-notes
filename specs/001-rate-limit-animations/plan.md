# Implementation Plan: 限流策略可視化教學（固定視窗、滑動視窗、Token Bucket）

**Branch**: `001-rate-limit-animations` | **Date**: 2026-03-05 | **Spec**: `specs/001-rate-limit-animations/spec.md`  
**Input**: Feature specification from `specs/001-rate-limit-animations/spec.md`

**Note**: 本計畫檔依 `/speckit.plan` 流程產生，對應憲章版本 1.0.0，僅描述實作策略與分階段輸出，不含低階程式碼細節。

## Summary

本功能要在現有的 `SystemArchitecturePage`（系統架構頁）底下，為「限流」主題新增一個互動式教學區塊，用三種常見限流策略（固定視窗、滑動視窗、Token Bucket）的動畫，讓使用者在同一頁中以可視化方式理解請求在時間軸上的通過／被拒行為、策略差異與參數調整效果。  
技術上將沿用既有前端技術棧（Vite + React + React Router），以前端模擬器的方式在瀏覽器端運算請求事件與限流演算法，再以 React state + CSS 動畫／過場效果呈現，不新增後端與額外基礎設施，保持純前端、靜態部署的特性。

## Technical Context

**Language/Version**: JavaScript（React 19 + Vite 7，沿用既有專案設定）  
**Primary Dependencies**: React、React Router、既有 CSS/主題系統（不新增大型動畫框架；以自訂 hook + CSS 過場為主）  
**Storage**: N/A（純前端模擬，無後端儲存；僅以 React state 暫存流量案例與參數）  
**Testing**: Vitest + React Testing Library（沿用 Vite 生態系測試工具，用於關鍵演算法函式與互動行為測試）  
**Target Platform**: 現代桌面與行動瀏覽器，透過 GitHub Pages 靜態部署  
**Project Type**: web SPA（單一前端專案，新增／擴充既有頁面與元件）  
**Performance Goals**: 動畫播放與互動操作在一般裝置上維持流暢（目標 60fps，至少不出現明顯卡頓），在常見情境下單頁載入時間維持與目前系統架構頁同級  
**Constraints**: 僅使用前端資源、不引入後端服務；不新增體積過大的第三方圖表／動畫套件，以避免部署至 GitHub Pages 時 bundle 過度膨脹；維持 UI／CSS 與 `.cursor/rules/html-ui-ux-style.mdc` 一致  
**Scale/Scope**: 單一教學區塊（含策略切換、流量案例、參數控制與動畫展示），預期程式碼範圍集中於一個新 React 元件樹與少量輔助 hook／utils，不擴散到其他主軸頁面

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

根據《Code Lab Notes 專案憲章》（v1.0.0），本功能需通過以下關卡：

- **高品質（I）**：  
  - 規劃：新元件需依現有頁面結構與 CSS 規範設計，避免出現與其他演算法／設計模式頁風格不一致的 UI。  
  - 狀態：此計畫僅在 `SystemArchitecturePage` 附近新增一組清楚命名的子元件與輔助函式，避免深層巢狀與難以閱讀的狀態管理。  
- **可測試性（II）**：  
  - 規劃：限流模擬邏輯（固定視窗、滑動視窗、Token Bucket）以純函式或 hook 拆出，能針對「給定流量輸入 → 預期通過／拒絕序列」撰寫單元測試；互動行為則以簡單的互動測試覆蓋。  
  - 狀態：本計畫不引入難以測試的隱藏全域狀態或非決定性行為（例如依系統真實時間隨機運行），而是以可重播的「腳本式請求時間列」驅動動畫。  
- **MVP 優先（III）**：  
  - 規劃：優先完成「單一策略 + 預設流量 + 基本動畫」作為 P1，可獨立上線與驗證；策略比較與參數調整作為後續增量（對應 spec 中 P2/P3 user story）。  
  - 狀態：本計畫不一次規劃完整腳本編輯器或複雜統計圖表，而是先以簡化控件與固定案例達成教學目的。  
- **避免過度設計（IV）**：  
  - 規劃：不新增後端、不引入 canvas/三方圖表庫除非後續實證 CSS 方案無法達成目標；以簡單的 flex/grid + transition 呈現。  
  - 狀態：目前僅規劃一個專用的 `RateLimitingVisualization` 元件樹與少量 utils，尚無需引入 Redux、全新動畫架構或額外 routing。  
- **正體中文（V）**：  
  - 規劃：所有新 UI 文案、工具提示、文件與註解皆使用正體中文，並沿用現有頁面之語氣與術語。  
  - 狀態：本 plan 與 spec 已全數採用正體中文說明。

> **Gate Verdict（前置檢查）**：  
> - 本計畫未新增後端或額外專案層級結構，符合「避免過度設計」。  
> - 計畫中已明確拆出可獨立驗證的 P1/P2/P3 user story，符合 MVP 與可測試性要求。  
> - 目前無違反憲章的設計，故 **允許進入 Phase 0（Outline & Research）**。

## Project Structure

### Documentation (this feature)

```text
specs/001-rate-limit-animations/
├── plan.md              # 本檔案：實作計畫與設計分解（/speckit.plan）
├── research.md          # Phase 0：研究與設計決策彙總（/speckit.plan）
├── data-model.md        # Phase 1：資料模型與狀態設計（/speckit.plan）
├── quickstart.md        # Phase 1：如何在專案中啟用與驗證本功能的指引（/speckit.plan）
├── contracts/           # Phase 1：若有 API/互動契約，放於此；本功能預期僅前端合約
└── tasks.md             # Phase 2：實作任務拆解（/speckit.tasks 產出，不由 /speckit.plan 建立）
```

### Source Code (repository root，與本功能相關的區塊)

```text
src/
├── pages/
│   ├── systemarchitecture/
│   │   └── SystemArchitecturePage.jsx   # 既有系統架構主頁，將在此掛載限流動畫區塊
│   ├── algorithm/
│   │   └── ...                          # 既有演算法實驗室頁（參考既有視覺化實作風格）
│   ├── designpattern/
│   │   └── ...                          # 設計模式相關頁面
│   └── ...                              # 其他學習主軸頁（OOP、Spring Boot 等）
├── components/
│   ├── RateLimiting/
│   │   ├── RateLimitingVisualization.jsx   # 新增：限流可視化主元件（策略切換 + 動畫展示）
│   │   ├── StrategyControls.jsx            # 新增：策略／案例／參數控制列（Phase 1 可合併）
│   │   ├── TimelineView.jsx                # 新增：時間軸與請求事件動畫呈現
│   │   └── index.js                        # 選擇性：匯出組合（依實作時再決定）
│   └── common/                             # 既有共用元件（按鈕、卡片等，優先重用）
├── hooks/
│   └── useRateLimitingSimulation.js        # 新增：封裝固定視窗、滑動視窗、Token Bucket 模擬邏輯
└── styles/
    └── rate-limiting.css                   # 新增：本區塊專用樣式（遵守 html-ui-ux-style 規範）

tests/
├── unit/
│   └── hooks/
│       └── useRateLimitingSimulation.test.js   # 單元測試：三種策略演算法與輸出事件序列
└── integration/
    └── RateLimitingVisualization.test.jsx      # 互動測試：策略切換、控制列與動畫呈現基本行為
```

**Structure Decision**:  
- 延續單一前端 SPA 專案結構，不新增 backend/api 專案或多 package。  
- 新增的元件集中於 `src/components/RateLimiting/` 與一個對應的 hook，並由 `SystemArchitecturePage.jsx` 匯入與掛載，以維持關注點清晰。  
- 測試檔案落在既有 `tests` 結構下，區分 hook 單元測試與視覺化元件的互動測試。  
- 此結構符合憲章對「避免過度設計」與「MVP 優先」的要求，未引入額外專案層級或過度抽象。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
