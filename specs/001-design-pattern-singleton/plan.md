# Implementation Plan: 設計模式主軸與 Singleton 頁面

**Branch**: `001-design-pattern-singleton` | **Date**: 2025-02-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-design-pattern-singleton/spec.md`

## Summary

將首頁「Java OOP」主軸改為「設計模式」，並新增設計模式區塊首頁（hub）與 Singleton 專頁；內容為靜態說明與使用介紹，頁面內程式範例與說明脈絡採用 **Java 與 Spring Boot**。實作沿用既有 **Vite + React** 技術棧與演算法區塊的 hub／子頁結構，不新增後端或 API，符合憲章「依既有專案、避免過度設計、GitHub Pages 靜態部署」。

## Technical Context

**Language/Version**: JavaScript (ES module)，React 19、Vite 7、React Router 7  
**Primary Dependencies**: react, react-dom, react-router-dom, vite, @vitejs/plugin-react-swc；無後端框架  
**Storage**: N/A（靜態 SPA，無伺服端儲存）  
**Testing**: 手動驗證導覽與內容；可選：既有專案未強制單元測試  
**Target Platform**: 現代瀏覽器，部署於 GitHub Pages（靜態）  
**Project Type**: 單一前端 SPA（src/pages/ 下依主軸分目錄）  
**Performance Goals**: 首屏與路由切換流暢，與現有頁面一致  
**Constraints**: 不引入後端或新執行時依賴；正體中文介面與內容  
**Scale/Scope**: 新增 1 個主軸落地頁（設計模式 hub）、1 個子頁（Singleton）；內容以靜態 Markdown/JSX 呈現  

**內容／範例脈絡**（使用者指定）：設計模式說明與程式範例以 **Java** 與 **Spring Boot** 為例，便於與專案內 Spring Boot 筆記一致；此為「頁面內容與範例語言」之選擇，非將網站改為 Java/Spring Boot 實作。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 檢查結果 |
|------|----------|
| **I. 高品質** | 沿用既有頁面結構與風格，程式可讀、與現有 OopPage/AlgorithmLab 一致。 |
| **II. 可測試性** | 每項 US 具獨立可測情境（首頁→設計模式→Singleton、導覽返回）。 |
| **III. MVP 優先** | 先交付設計模式主軸＋hub＋Singleton 一頁，不一次做多個設計模式。 |
| **IV. 避免過度設計** | 不新增後端、不引入新框架；Java/Spring Boot 僅用於頁面內範例與說明。 |
| **V. 正體中文** | 所有標題、描述、按鈕、導覽與 Singleton 內容為正體中文。 |
| **額外約束：技術棧** | 依既有 Vite、React、pnpm；未新增技術。 |
| **額外約束：部署** | 維持 GitHub Pages 靜態部署，無需後端。 |

**Gate 結果**：通過，無需填寫 Complexity Tracking。

## Project Structure

### Documentation (this feature)

```text
specs/001-design-pattern-singleton/
├── plan.md              # 本檔
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1（本 feature 無 API，可為空或說明）
└── tasks.md             # Phase 2（/speckit.tasks 產出）
```

### Source Code (repository root)

沿用既有 SPA 結構；設計模式區塊比照演算法區塊（hub + 子頁）。

```text
src/
├── main.jsx             # 新增 design-pattern 與 design-pattern/singleton 路由
├── pages/
│   ├── HomePage.jsx     # 主軸標題/描述/連結：Java OOP → 設計模式，連結改至 /design-pattern
│   ├── algorithm/
│   │   ├── AlgorithmLab.jsx
│   │   ├── AStarPage.jsx
│   │   └── ...
│   ├── oop/
│   │   └── OopPage.jsx  # 可保留或改為重新導向；本 feature 以 designpattern 為新入口
│   ├── designpattern/   # 新增：設計模式區塊
│   │   ├── DesignPatternLab.jsx   # 設計模式 hub（列出 Singleton 等子頁）
│   │   └── SingletonPage.jsx      # Singleton 說明與使用介紹
│   └── springboot/
│       └── SpringBootPage.jsx
└── styles/
    └── HomePage.css     # 沿用，必要時擴充 class
```

**Structure Decision**: 新增 `src/pages/designpattern/`，內含 `DesignPatternLab.jsx`（hub）與 `SingletonPage.jsx`；路由 `/oop` 可保留並導向 `/design-pattern` 以處理舊書籤。首頁主軸「Java OOP」改為「設計模式」，連結改為 `/design-pattern`。

## Complexity Tracking

> 本 feature 無憲章違反或過度設計，本節留空。
