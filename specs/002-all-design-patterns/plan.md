# Implementation Plan: 加入所有設計模式

**Branch**: `002-all-design-patterns` | **Date**: 2025-02-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-all-design-patterns/spec.md`

## Summary

在既有設計模式區塊（hub + Singleton 專頁）上擴充：**依建立型、結構型、行為型分類**列出所有 GoF 設計模式，並為每個模式提供專屬專頁；專頁結構與 Singleton 一致（解釋 + 使用介紹，可選 Java/Spring Boot 範例）。沿用 **Vite + React** 與現有 `DesignPatternLab`／`SingletonPage` 結構，以**單一資料來源**（模式清單 + slug）驅動 hub 列表與路由，新增模式專頁可採共用版型 + 內容設定或逐頁元件，符合憲章「MVP 優先、避免過度設計、靜態部署」。

## Technical Context

**Language/Version**: JavaScript (ES module)，React 19、Vite 7、React Router 7  
**Primary Dependencies**: react, react-dom, react-router-dom, vite；無後端  
**Storage**: N/A（靜態 SPA，模式清單可為常數或模組內資料）  
**Testing**: 手動驗證分類、列表、導覽與 3 次點擊內抵達任一本 feature 模式專頁  
**Target Platform**: 現代瀏覽器，GitHub Pages 靜態部署  
**Project Type**: 單一前端 SPA，擴充 `src/pages/designpattern/`  
**Performance Goals**: 與現有設計模式／演算法區塊一致，列表與路由切換流暢  
**Constraints**: 不引入後端或新執行時依賴；正體中文；Singleton 沿用既有專頁不重複  
**Scale/Scope**: 設計模式總數為 GoF 23（或約定子集）；hub 依三類分組、每模式一專頁、未知路徑友善導向

**內容脈絡**：與 001 一致，頁面內說明與程式範例以 **Java / Spring Boot** 為例；實作仍為 React 前端。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 檢查結果 |
|------|----------|
| **I. 高品質** | 沿用既有 DesignPatternLab / SingletonPage 版型與風格；新頁面與現有設計模式區塊一致。 |
| **II. 可測試性** | US1/US2/US3 具獨立可測情境（分類瀏覽、進入專頁、3 次點擊內抵達、返回導覽）。 |
| **III. MVP 優先** | 可依 Phase 分批交付：先 hub 分類＋列表＋數個模式專頁，再補齊其餘模式。 |
| **IV. 避免過度設計** | 不新增後端、不引入新框架；模式清單與路由為前端常數/設定，可選共用版型減少重複。 |
| **V. 正體中文** | 所有標題、描述、按鈕、導覽與各模式內容為正體中文。 |
| **額外約束：技術棧** | 依既有 Vite、React、pnpm；未新增技術。 |
| **額外約束：部署** | 維持 GitHub Pages 靜態部署，無需後端。 |

**Gate 結果**：通過，無需填寫 Complexity Tracking。

## Project Structure

### Documentation (this feature)

```text
specs/002-all-design-patterns/
├── plan.md              # 本檔
├── research.md          # Phase 0
├── data-model.md        # Phase 1（模式清單、分類、路由）
├── quickstart.md        # Phase 1（在地執行、新增模式步驟）
├── contracts/           # Phase 1（本 feature 無 API，README 說明）
└── tasks.md             # Phase 2（/speckit.tasks 產出）
```

### Source Code (repository root)

擴充既有設計模式區塊：hub 改為依分類分組列表，新增各模式專頁與路由；Singleton 沿用既有頁面與路由。

```text
src/
├── main.jsx             # 新增 design-pattern/:slug 或逐一路由
├── pages/
│   ├── HomePage.jsx     # 無變更（設計模式主軸已存在）
│   ├── designpattern/
│   │   ├── DesignPatternLab.jsx   # 擴充：依建立型/結構型/行為型分組列表，連結至各模式
│   │   ├── SingletonPage.jsx      # 沿用（FR-006），納入列表與分類
│   │   ├── [PatternName]Page.jsx  # 其餘模式專頁（可為共用 PatternPage + 內容設定）
│   │   └── ...
│   └── ...
└── (可選) 集中模式清單與 slug 對應，供 hub 與路由使用
```

**Structure Decision**：  
- **Hub**：`DesignPatternLab.jsx` 改為依「建立型、結構型、行為型」三區塊呈現，每區塊列出該類模式並連結至 `/design-pattern/<slug>`。模式清單（含 slug、中文名、類別、簡短描述）可抽成常數或獨立模組，避免硬編碼於 JSX。  
- **專頁**：Singleton 維持 `SingletonPage.jsx` 與 `/design-pattern/singleton`。其餘模式可（A）每個模式一個 Page 元件（如 `FactoryMethodPage.jsx`），或（B）單一 `PatternPage.jsx` 依 URL slug 載入對應內容設定（解釋、使用介紹、可選範例）。選（B）可減少檔案數、選（A）利於每頁客製版型；plan 建議依 tasks 優先實作數個模式後再決定是否抽象為共用 PatternPage。  
- **路由**：`/design-pattern`（hub）、`/design-pattern/singleton`（既有）、`/design-pattern/<slug>`（其餘模式）。未知 slug 時導向 `/design-pattern` 或顯示友善「找不到該模式」頁（符合 spec edge case）。  
- **舊連結**：無本 feature 新增的舊 path；既有 `/oop` → `/design-pattern` 已存在。

## Complexity Tracking

> 本 feature 無憲章違反或過度設計，本節留空。
