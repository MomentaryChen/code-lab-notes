# Changelog

本專案變更記錄依 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/) 格式維護。

## [Unreleased]

### Added
- **實作 004**：設計模式一頁一模式與亮色主題範例可讀性 — 完成 T001–T030：HomePage.css 新增 --code-bg/--code-text 與 .code-block；SingletonPage 與各專頁程式碼區塊改用主題變數；main.jsx 以 PATTERN_LIST 與 PATTERN_ROUTE_MAP 註冊 23 條路由，無效路徑導向 /design-pattern；新增 PatternPageLayout 與 21 個專頁（FactoryMethod、AbstractFactory、Builder、Prototype、Adapter、Bridge、Composite、Decorator、Facade、Flyweight、Proxy、ChainOfResponsibility、Command、Iterator、Mediator、Memento、Observer、State、Strategy、TemplateMethod、Visitor）；移除 PatternPage.jsx，patternContent.js 已棄用；建置通過
- **Tasks 004**：設計模式一頁一模式與亮色主題範例可讀性 — 產出 `specs/004-pattern-per-page/tasks.md`（Phase 1 程式碼區塊變數、Phase 2 路由與無效路徑、Phase 3 US3 亮色可讀、Phase 4a–4c 共 21 個專頁、Phase 5 移除 PatternPage/patternContent、Phase 6 驗證與 CHANGELOG）
- **Plan 004**：設計模式一頁一模式與亮色主題範例可讀性 — `specs/004-pattern-per-page/` 產出 plan.md、research.md、data-model.md、quickstart.md、contracts/；一模式一 Page、路由與程式碼區塊樣式約定；agent 脈絡已更新
- **Spec 004**：設計模式一頁一模式與亮色主題範例可讀性 — 規格 `specs/004-pattern-per-page/spec.md`（每模式獨立專頁與 URL、內容不依賴單一動態資料檔、亮色主題下程式碼範例可讀）；品質檢查清單 `checklists/requirements.md` 通過
- **實作 003**：設計模式切割與全數 Java 範例 — 完成 T001–T009：PatternPage 永遠顯示三區塊（無範例時顯示「本模式範例建置中」）、區塊 id/aria 以利定位；patternContent.js 為 20 個模式補齊 example（abstract-factory、builder、prototype、adapter、bridge、composite、decorator、facade、flyweight、proxy、chain-of-responsibility、command、iterator、mediator、memento、state、strategy、template-method、visitor）；建置通過
- **Plan 003**：設計模式切割與全數 Java 範例 — `specs/003-pattern-java-examples/` 產出 plan.md、research.md、data-model.md、quickstart.md、contracts/；僅擴充 patternContent.js 為 20 個模式補 example（Java 範例），不新增路由或元件
- **Spec 003**：設計模式切割與全數 Java 範例 — 規格 `specs/003-pattern-java-examples/spec.md`（每模式專頁結構分明、每個模式皆有 Java／Spring Boot 範例、範例風格一致易讀）；品質檢查清單通過
- **實作 002**：加入所有設計模式 — 完成 T001–T012：`src/pages/designpattern/patternList.js`（GoF 23 清單）、`PatternPage.jsx`、`patternContent.js`（22 模式解釋與使用介紹）；DesignPatternLab 依建立型/結構型/行為型分組列表與類別篩選；路由 `/design-pattern/:slug`；Singleton 沿用既有頁；建置通過
- **範例區塊 002**：設計模式專頁支援可選「範例：Java 與 Spring Boot」區塊（`patternContent.example`）；PatternPage 有則顯示、無則不顯示；已為 Factory Method、Observer 加入範例，其餘模式可逐步補上
- **Plan 002**：加入所有設計模式 — `specs/002-all-design-patterns/` 產出 plan.md、research.md、data-model.md、quickstart.md、contracts/；擴充 DesignPatternLab 依三類分組、GoF 23 slug 與路由、專頁策略（逐頁或共用版型）
- **Spec 002**：加入所有設計模式 — 規格 `specs/002-all-design-patterns/spec.md`（依建立型／結構型／行為型分類、每模式專頁含解釋與使用介紹、Singleton 沿用既有頁）；品質檢查清單通過
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
