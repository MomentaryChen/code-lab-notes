# Changelog

本專案變更記錄依 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/) 格式維護。

## [Unreleased]

### Added
- **CI/CD**：新增 `.github/workflows/deploy.yml`，在 push 至 `main` 時自動執行 `pnpm run deploy` 部署至 GitHub Pages（gh-pages 分支）
- **實作 001**：設計模式主軸與 Singleton 頁面 — 完成 T001–T011：新增 `src/pages/designpattern/`（DesignPatternLab.jsx、SingletonPage.jsx）、路由 `/design-pattern`、`/design-pattern/singleton`、`/oop` 導向；首頁主軸改為「設計模式」；Singleton 頁含解釋、使用介紹與 Java/Spring Boot 範例；建置通過
- **Tasks 001**：設計模式主軸與 Singleton 頁面 — 產出 `specs/001-design-pattern-singleton/tasks.md`（Phase 1~5，T001–T011；依 US1/US2 分階段、可獨立驗證）
- **Plan 001**：設計模式主軸與 Singleton 頁面 — `specs/001-design-pattern-singleton/` 產出 plan.md、research.md、data-model.md、quickstart.md、contracts/；技術棧沿用 Vite/React，頁面內容與範例以 Java/Spring Boot 為脈絡；Cursor agent 脈絡已更新（.cursor/rules/specify-rules.mdc）
- **Spec 001**：設計模式主軸與 Singleton 頁面 — 規格 `specs/001-design-pattern-singleton/spec.md`（Java OOP 改為設計模式、新增 Singleton 解釋與使用介紹頁）；品質檢查清單通過
- **Spec-Kit 專案憲章**：建立 `.specify/memory/constitution.md` v1.0.0 — 高品質、可測試性、MVP 優先、避免過度設計、正體中文；含額外約束、開發流程與 Governance
- **Spec-Kit**：引入 GitHub Spec-Kit（Spec-Driven Development），在專案根目錄初始化；新增 `.specify/`（constitution、腳本、模板）與 Cursor 的 `/speckit.*` 指令（constitution、specify、plan、tasks、implement 等）
- **規則**：新增 `.cursor/rules/tool-usage.mdc`，指定使用 pnpm、Git、PowerShell (pwsh)；deploy 腳本改為使用 pnpm

---

## [0.0.1] - 2025-02-13

首個正式釋出版本，提供演算法視覺化、Java OOP、Spring Boot 等學習筆記的網頁入口與說明頁面。

### Added
- **專案架構**：React 19 + Vite 7 + React Router 7，支援 GitHub Pages 部署（含 404 複製以支援 SPA 路由）。
- **首頁**：`HomePage` 作為入口，可導覽至演算法、OOP、Spring Boot 等區塊；含主題切換（`useTheme.js`）與首頁樣式（`HomePage.css`）。
- **演算法區**：`AlgorithmLab` 底下包含 A* 演算法說明（`AStarPage`）、貪心演算法（`GreedyPage`）、排序演算法視覺化（`SortingPage`）。
- **其他筆記區**：Java OOP 說明頁（`OopPage`）、Spring Boot 說明頁（`SpringBootPage`）。
- **UI/UX**：深色主題、霓虹感重點色、卡片式版面；專案內含 `.cursor/rules` 之 HTML UI/UX 風格與頁面結構規範。
- **主題系統**：`ThemeContext.jsx` 與 `ThemeProvider`，主題單一來源、全站同步；`main.jsx` 全域載入 `HomePage.css`；`index.html` 前置 script 依 localStorage 設定 `data-theme` 避免首屏閃爍。
- **亮色主題**：暖灰底、柔和對比、亮色專用樣式（首頁、演算法實驗室頁卡片／側邊欄／按鈕等）。
- **規則**：`.cursor/rules/reusable-components.mdc`（共用 UI 包裝成 component）、`changelog-updates.mdc`（每次變更更新 CHANGELOG）。
- **Skills**：`.cursor/skills/` 四種主軸 — `algorithm-lab`、`frontend-ui`、`spring-boot-notes`、`oop-notes`。

### Changed
- **亮色主題**：優化視覺舒適度 — 暖灰底（#fafaf9）、柔和主文色、淡邊框與陰影，減少刺眼感。
- **演算法視覺化實驗室頁亮色**：卡片、側邊欄、預覽區、按鈕、chip、列表 hover 等亮色專用樣式。

### 技術與使用
- 入口為瀏覽器開啟的 HTML（如 `index.html`），無需後端；可部署至 GitHub Pages 線上體驗。
- 依賴：`react`、`react-dom`、`react-router-dom`；建置與部署腳本：`dev`、`build`、`preview`、`deploy`。
