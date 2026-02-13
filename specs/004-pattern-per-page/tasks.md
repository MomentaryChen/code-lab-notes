# Tasks: 設計模式一頁一模式與亮色主題範例可讀性

**Input**: Design documents from `/specs/004-pattern-per-page/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: 規格未要求自動化測試；以手動依 quickstart.md 驗證。

**Organization**: 依 User Story 分階段，每階段可獨立驗證。US3（亮色主題可讀）先做為共用基礎，再進行 US1+US2（一頁一模式與內容專屬）。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可並行（不同檔案、無依賴）
- **[Story]**: 所屬 user story（US1, US2, US3）
- 描述含明確檔案路徑

## Path Conventions

- 專案為單一前端 SPA：`src/` 在 repository root；本 feature 重構並擴充 `src/pages/designpattern/`。

---

## Phase 1: Setup（程式碼區塊主題變數）

**Purpose**: 全站程式碼範例區塊在亮色／暗色主題下皆可讀，供所有設計模式專頁使用。

- [x] **T001** [US3] 在 `src/styles/HomePage.css` 新增程式碼區塊用 CSS 變數：於 `:root` 定義 `--code-bg`、`--code-text`（暗色主題）；於 `:root[data-theme="light"]` 定義同兩變數（亮色主題，對比度足夠可讀）。見 data-model.md 與 research.md。
- [x] **T002** [US3] 更新 `src/pages/designpattern/SingletonPage.jsx`：所有 `<pre>` 程式碼區塊改為使用 `background: var(--code-bg); color: var(--code-text);`（或 class 引用該變數），移除僅適合暗色之 fallback（如 `#1e293b`、`#e2e8f0`）。

**Checkpoint**: 開啟 Singleton 專頁，切換亮色／暗色，程式碼範例區塊在兩種主題下皆可讀。

---

## Phase 2: Foundational（路由對應與無效路徑）

**Purpose**: 建立 slug → 元件對照與 23 條路由；無效 slug 導向 hub。為後續「一模式一 Page」就緒，過渡期可仍用 PatternPage 服務尚未拆出的 slug。

**⚠️ CRITICAL**: 未完成前無法完整驗證 US1/US2（每模式獨立專頁）

- [x] **T003** [US1] 在 `src/main.jsx` 建立設計模式路由對照：自 `patternList.js` 的 PATTERN_LIST 取得 23 個 slug；`singleton` → SingletonPage，其餘 22 個 slug 先仍對應現有 PatternPage（過渡）。以對照表迴圈輸出 `<Route path="/design-pattern/:slug" element={...} />` 或 23 條明確 Route；並新增無效 slug 處理（如 catch-all 或未知 slug 時 `<Navigate to="/design-pattern" replace />`）。見 plan.md、data-model.md。
- [x] **T004** [US1] 確認 DesignPatternLab 連結仍指向 `/design-pattern/<slug>`，且總覽篩選行為不變；確認無效路徑造訪時導向 `/design-pattern`。見 FR-007。

**Checkpoint**: 從 hub 點任一模式可進入專頁；輸入 `/design-pattern/unknown` 會導向 hub。

---

## Phase 3: User Story 3 - 亮色主題下程式範例清楚可讀 (Priority: P2)

**Goal**: 所有設計模式專頁上的程式碼範例區塊在亮色與暗色主題下皆可讀，切換主題即時生效。

**Independent Test**: 在任一本 feature 設計模式專頁切換至亮色主題，程式碼區塊對比足夠可讀；再切回暗色仍可讀。

### Implementation for User Story 3

- [x] **T005** [US3] 建立共用程式碼區塊樣式：在 `HomePage.css` 新增 class（如 `.code-block`）使用 `var(--code-bg)`、`var(--code-text)`，或於文件註明各專頁 `<pre>` 須使用該兩變數，供後續新增之 21 個專頁一致套用。見 contracts/README.md。

**Checkpoint**: Phase 1 + T005 完成後，US3 在既有 Singleton 與過渡期 PatternPage 上已滿足；待 21 個專頁建立時一律使用該變數即可。

---

## Phase 4: User Story 1 + 2 - 一模式一專頁、內容專屬 (Priority: P1)

**Goal**: 每個設計模式有獨立 Page 元件與固定 URL，內容來自該模式專屬來源（頁面內或專屬模組），不再依賴 patternContent.js 動態查表。

**Independent Test**: 從總覽點選多個不同模式，每個皆有獨立 URL 與專屬頁面內容；修改單一模式內容僅改該模式對應檔案。

### 4a. 建立型（Creational，4 個，不含 Singleton）

- [x] **T006** [US1][US2] 新增 `src/pages/designpattern/FactoryMethodPage.jsx`：內容自 patternContent.js 之 `factory-method` 遷入（解釋、使用方式、範例）；版型對齊 SingletonPage（標題、導覽、主題切換、三區塊）；程式碼區塊使用 `var(--code-bg)`、`var(--code-text)`。在 main.jsx 路由對照中將 `factory-method` 改為 FactoryMethodPage。
- [x] **T007** [US1][US2] 新增 `src/pages/designpattern/AbstractFactoryPage.jsx`，內容自 patternContent 之 `abstract-factory` 遷入，版型與程式碼區塊同上；註冊路由。
- [x] **T008** [US1][US2] 新增 `src/pages/designpattern/BuilderPage.jsx`，內容自 patternContent 之 `builder` 遷入；註冊路由。
- [x] **T009** [US1][US2] 新增 `src/pages/designpattern/PrototypePage.jsx`，內容自 patternContent 之 `prototype` 遷入；註冊路由。

**Checkpoint**: 建立型 5 個模式（含 Singleton）皆為獨立專頁，內容專屬。

### 4b. 結構型（Structural，7 個）

- [x] **T010** [US1][US2] 新增 `AdapterPage.jsx`，內容自 `adapter` 遷入；註冊路由。
- [x] **T011** [US1][US2] 新增 `BridgePage.jsx`，內容自 `bridge` 遷入；註冊路由。
- [x] **T012** [US1][US2] 新增 `CompositePage.jsx`，內容自 `composite` 遷入；註冊路由。
- [x] **T013** [US1][US2] 新增 `DecoratorPage.jsx`，內容自 `decorator` 遷入；註冊路由。
- [x] **T014** [US1][US2] 新增 `FacadePage.jsx`，內容自 `facade` 遷入；註冊路由。
- [x] **T015** [US1][US2] 新增 `FlyweightPage.jsx`，內容自 `flyweight` 遷入；註冊路由。
- [x] **T016** [US1][US2] 新增 `ProxyPage.jsx`，內容自 `proxy` 遷入；註冊路由。

**Checkpoint**: 結構型 7 個模式皆為獨立專頁。

### 4c. 行為型（Behavioral，11 個）

- [x] **T017** [US1][US2] 新增 `ChainOfResponsibilityPage.jsx`，內容自 `chain-of-responsibility` 遷入；註冊路由。
- [x] **T018** [US1][US2] 新增 `CommandPage.jsx`，內容自 `command` 遷入；註冊路由。
- [x] **T019** [US1][US2] 新增 `IteratorPage.jsx`，內容自 `iterator` 遷入；註冊路由。
- [x] **T020** [US1][US2] 新增 `MediatorPage.jsx`，內容自 `mediator` 遷入；註冊路由。
- [x] **T021** [US1][US2] 新增 `MementoPage.jsx`，內容自 `memento` 遷入；註冊路由。
- [x] **T022** [US1][US2] 新增 `ObserverPage.jsx`，內容自 `observer` 遷入；註冊路由。
- [x] **T023** [US1][US2] 新增 `StatePage.jsx`，內容自 `state` 遷入；註冊路由。
- [x] **T024** [US1][US2] 新增 `StrategyPage.jsx`，內容自 `strategy` 遷入；註冊路由。
- [x] **T025** [US1][US2] 新增 `TemplateMethodPage.jsx`，內容自 `template-method` 遷入；註冊路由。
- [x] **T026** [US1][US2] 新增 `VisitorPage.jsx`，內容自 `visitor` 遷入；註冊路由。

**Checkpoint**: 23 個設計模式皆為獨立專頁，內容來自各 Page 或專屬模組，不再依賴 patternContent.js 動態渲染。

---

## Phase 5: 移除動態頁與舊資料檔

**Purpose**: 完全移除對 PatternPage 與 patternContent.js 的專頁渲染依賴。

- [x] **T027** [US1][US2] 自 `src/main.jsx` 移除對 PatternPage 的引用與動態 `/design-pattern/:slug` Route；改為僅使用 slug→專屬 Page 對照（23 條明確路由或迴圈對照表）。無效 slug 仍導向 `/design-pattern`。
- [x] **T028** [US2] 移除或棄用 `src/pages/designpattern/patternContent.js`：若無其他引用則刪除；若有歷史參考需求可保留檔案但移除從專頁的 import，並在檔案頂端註明已棄用、內容已遷至各 *Page.jsx。同時自 `PatternPage.jsx` 移除對 `getPatternContent` 的依賴（若該檔仍存在則改為僅用於 fallback 或刪除 PatternPage.jsx）。見 plan.md。

**Checkpoint**: 專頁渲染僅來自 23 個專屬 Page 元件，無 patternContent.js 查表。

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: 驗證與文件

- [x] **T029** 依 `specs/004-pattern-per-page/quickstart.md` 執行在地驗證：總覽連結、每模式獨立 URL、亮色主題下程式碼可讀、無效路徑導向 hub、`pnpm build` 通過。
- [x] **T030** [P] 更新 `CHANGELOG.md`：於 Unreleased 新增本 feature 實作完成之條目（設計模式一頁一模式與亮色主題範例可讀性）。

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 無依賴，可立即執行。
- **Phase 2 (Foundational)**: 無依賴；完成後路由與無效路徑處理就緒。
- **Phase 3 (US3)**: 依賴 Phase 1；T005 可與 T002 同輪或緊接完成。
- **Phase 4 (US1+US2)**: 依賴 Phase 2（路由對照已存在）；可依 4a→4b→4c 或依資源並行多個 Page。每完成一個專頁即更新路由對照，過渡期未拆出的 slug 仍由 PatternPage 服務直至 T027。
- **Phase 5**: 依賴 Phase 4 全部完成（23 個專頁皆已建立）。
- **Phase 6**: 依賴 Phase 5。

### User Story Dependencies

- **US3 (P2)**: Phase 1 + T005 即可在既有頁面上驗證；其餘專頁建立時沿用同一程式碼區塊變數即滿足。
- **US1+US2 (P1)**: Phase 2 後可開始建立專頁；每完成一批專頁即可獨立驗證「該批模式為獨立專頁、內容專屬」。

### Parallel Opportunities

- T006–T026：不同 Page 檔案可並行實作（同一時間只改 main.jsx 路由一處時需協調，或每人負責不同 slug 再合併）。
- T029 與 T030 可並行。

---

## Implementation Strategy

### MVP First（先交付數個專頁 + 亮色可讀）

1. 完成 Phase 1：T001、T002（程式碼區塊主題變數 + Singleton 套用）。
2. 完成 Phase 2：T003、T004（路由對照、無效路徑導向）。
3. 完成 Phase 3：T005（共用程式碼區塊約定）。
4. 完成 Phase 4a：T006–T009（建立型 4 個專頁）。
5. **STOP and VALIDATE**：依 quickstart 驗證總覽、4 個建立型專頁獨立 URL、亮色主題範例可讀、無效路徑導向。
6. 再進行 Phase 4b、4c，最後 Phase 5、6。

### Incremental Delivery

1. Phase 1 + 2 + 3 → 亮色可讀 + 路由就緒。
2. Phase 4a → 建立型 5 個（含 Singleton）皆為獨立專頁（MVP 切片）。
3. Phase 4b → 結構型 7 個獨立專頁。
4. Phase 4c → 行為型 11 個獨立專頁。
5. Phase 5 → 移除 PatternPage / patternContent.js 依賴。
6. Phase 6 → 驗證與 CHANGELOG。

### Notes

- 各專頁版型與導覽對齊 `SingletonPage.jsx`（標題、回設計模式、回首頁、主題切換、解釋／使用方式／範例三區塊）。
- 內容遷移自 `patternContent.js` 時保留正體中文與既有段落結構；程式碼範例一律使用 `--code-bg`、`--code-text`。
- 檔名與元件名對應：slug 為 `factory-method` → `FactoryMethodPage.jsx`、`FactoryMethodPage`；slug 為 `chain-of-responsibility` → `ChainOfResponsibilityPage.jsx`。
