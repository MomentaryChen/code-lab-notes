# Tasks: 加入所有設計模式

**Input**: Design documents from `/specs/002-all-design-patterns/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 規格未要求自動化測試；以手動依 quickstart.md 驗證。

**Organization**: 依 User Story 分階段，每階段可獨立驗證。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可並行（不同檔案、無依賴）
- **[Story]**: 所屬 user story（US1, US2, US3）
- 描述含明確檔案路徑

## Path Conventions

- 專案為單一前端 SPA：`src/` 在 repository root；本 feature 擴充 `src/pages/designpattern/`。

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立本 feature 所需之單一資料來源（模式清單），供 hub 與路由使用。

- [x] T001 Create pattern list module in `src/pages/designpattern/patternList.js` with GoF 23 entries per data-model.md：每筆含 slug、nameZh、category（'creational'|'structural'|'behavioral'）、description（正體中文）；分類與 slug 與 data-model.md 一致，Singleton 納入建立型。

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 路由與通用專頁元件，使 hub 可連結至各模式、未知 slug 友善導向；所有 user story 依賴此階段完成。

**⚠️ CRITICAL**: 未完成前無法獨立驗證 US1/US2/US3

- [x] T002 Create PatternPage component in `src/pages/designpattern/PatternPage.jsx`：自 useParams() 取得 slug；若 slug 不在 patternList 則 `<Navigate to="/design-pattern" replace />`；否則依 slug 顯示標題與佔位內容（解釋、使用介紹區塊可先為「本模式內容建置中」）；版型與導覽（回設計模式、回首頁）對齊 `src/pages/designpattern/SingletonPage.jsx`，正體中文
- [x] T003 Register route in `src/main.jsx`：新增 `<Route path="/design-pattern/:slug" element={<PatternPage />} />`，並確保 `/design-pattern`、`/design-pattern/singleton` 維持現有（DesignPatternLab、SingletonPage）；路由順序須讓 `/design-pattern/singleton` 仍對應 SingletonPage（較具體路徑先於 :slug）

**Checkpoint**: 可手動輸入 `/design-pattern/<slug>` 看到專頁或未知 slug 導回 hub；/design-pattern/singleton 仍為既有 Singleton 頁

---

## Phase 3: User Story 1 - 依類別瀏覽設計模式 (Priority: P1) 🎯 MVP

**Goal**: Hub 依建立型、結構型、行為型三類分組列出所有設計模式，點擊可進入該模式專頁。

**Independent Test**: 從設計模式區塊進入 hub，可辨識三類（建立型、結構型、行為型），每類下列出該類模式；點擊任一模式進入專頁，可自專頁返回 hub 或首頁。

### Implementation for User Story 1

- [x] T004 [US1] Update `src/pages/designpattern/DesignPatternLab.jsx`：自 `src/pages/designpattern/patternList.js` 讀取模式清單；依 category 分為三區塊（建立型、結構型、行為型），每區塊標題為正體中文、下列出該類模式；每項為 Link 至 `/design-pattern/<slug>` 並顯示 nameZh 與 description；Singleton 須在建立型區塊中並連結至既有專頁；保留主題切換與返回首頁連結（FR-001、FR-002、FR-006、FR-007）

**Checkpoint**: User Story 1 可獨立驗證：首頁→設計模式→見三類與全部模式連結→點任一路徑進入專頁→返回 hub

---

## Phase 4: User Story 2 - 閱讀單一設計模式的解釋與使用介紹 (Priority: P2)

**Goal**: 每個設計模式專頁（除 Singleton 沿用既有頁外）具完整解釋與使用介紹，版型與 Singleton 一致。

**Independent Test**: 任選一非 Singleton 模式專頁進入，可閱讀該模式解釋（何謂、為何需要、適用情境、與他模式區別）與使用介紹（何時使用、概念性使用方式、注意事項或陷阱）；可返回 hub 或首頁。

### Implementation for User Story 2

- [x] T005 [US2] Create pattern content module in `src/pages/designpattern/patternContent.js`：export 內容結構（依 slug 對應），每筆含 nameZh、explanation（意涵、為何需要、適用情境、與他模式區別）、usage（何時使用、概念性使用方式、注意事項或陷阱）；僅涵蓋非 Singleton 之 22 個模式；正體中文
- [x] T006 [US2] Update `src/pages/designpattern/PatternPage.jsx`：自 patternContent 依 slug 載入內容，渲染「解釋」與「使用介紹」兩區塊（取代佔位）；版型、標題、導覽與 `src/pages/designpattern/SingletonPage.jsx` 一致；若無該 slug 內容則維持導向 hub（FR-004、FR-005、FR-008）
- [x] T007 [P] [US2] Add 解釋+使用介紹 content in `src/pages/designpattern/patternContent.js` for creational patterns：factory-method、abstract-factory、builder、prototype（各含意涵、適用情境、使用方式、注意事項，正體中文）
- [x] T008 [P] [US2] Add 解釋+使用介紹 content in `src/pages/designpattern/patternContent.js` for structural patterns：adapter、bridge、composite、decorator、facade、flyweight、proxy
- [x] T009 [P] [US2] Add 解釋+使用介紹 content in `src/pages/designpattern/patternContent.js` for behavioral patterns：chain-of-responsibility、command、iterator、mediator、memento、observer、state、strategy、template-method、visitor

**Checkpoint**: User Story 2 可獨立驗證：hub→任一本 feature 模式→完整解釋與使用介紹→返回 hub；SC-002 可驗證

---

## Phase 5: User Story 3 - 快速對照與查找 (Priority: P3)

**Goal**: 訪客可依類別或名稱在有限點擊內（如 3 次）從首頁或 hub 抵達任一所列模式專頁。

**Independent Test**: 從首頁或設計模式 hub，在 3 次點擊內進入指定名稱的設計模式專頁；依類別瀏覽時可辨識並僅見該類模式。

### Implementation for User Story 3

- [x] T010 [US3] Ensure hub 依類別瀏覽可達成「選擇某一類別則僅顯示該類」：在 `src/pages/designpattern/DesignPatternLab.jsx` 中為三類加上可辨識的區塊標題或錨點（建立型、結構型、行為型），必要時可加入類別篩選（例如按鈕/標籤僅顯示該類）；驗證自首頁→設計模式→點選任一模式為 3 次點擊內（SC-001、SC-003）

**Checkpoint**: User Story 3 可獨立驗證：依類別找到目標模式、3 次點擊內進入專頁

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 驗證與文件

- [x] T011 Run quickstart validation：依 `specs/002-all-design-patterns/quickstart.md` 執行 pnpm install、pnpm dev，驗證首頁→設計模式→三類列表→任一模式專頁→返回；建置 pnpm build 通過
- [x] T012 [P] Update `CHANGELOG.md`：於 Unreleased 新增本 feature 實作完成之條目（加入所有設計模式：hub 依三類、GoF 23 專頁與內容）

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 無依賴，可立即執行
- **Phase 2 (Foundational)**: 依賴 Phase 1（patternList）；完成後 US1/US2/US3 所需路由與 PatternPage 就緒
- **Phase 3 (US1)**: 依賴 Phase 2；可單獨完成並驗證（MVP）
- **Phase 4 (US2)**: 依賴 Phase 2；可於 US1 後執行；T007、T008、T009 可並行
- **Phase 5 (US3)**: 依賴 Phase 3（hub 已依類別列出）；可於 US1 後執行
- **Phase 6 (Polish)**: 依賴 Phase 3、4、5 完成

### User Story Dependencies

- **User Story 1 (P1)**: 僅依賴 Phase 2；完成 T004 即可獨立驗證
- **User Story 2 (P2)**: 依賴 Phase 2 與 hub 存在（Phase 3）；完成 T005–T009 即可獨立驗證
- **User Story 3 (P3)**: 依賴 Phase 3；完成 T010 即可獨立驗證

### Within Each User Story

- US1：單一任務 T004
- US2：先 T005（內容結構與 PatternPage 串接）、T006（PatternPage 渲染內容），再 T007–T009 補齊 22 個模式內容（T007、T008、T009 可並行）
- US3：單一任務 T010

### Parallel Opportunities

- T007、T008、T009 可並行（同一檔案但不同區塊；若分檔則可完全並行）
- T012 可與 T011 並行（不同檔案）

---

## Parallel Example: User Story 2

```text
# 內容產製可並行（若拆成多檔或同一檔內分區塊）：
T007: Add creational (factory-method, abstract-factory, builder, prototype) content in patternContent.js
T008: Add structural (adapter, bridge, composite, decorator, facade, flyweight, proxy) content in patternContent.js
T009: Add behavioral (10 patterns) content in patternContent.js
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1：T001
2. 完成 Phase 2：T002、T003
3. 完成 Phase 3：T004
4. **STOP and VALIDATE**：依 quickstart 驗證 hub 三類列表與連結、任一點擊進入專頁與返回
5. 可部署／展示後再進行 US2、US3

### Incremental Delivery

1. Phase 1 + 2 → 模式清單、路由與 PatternPage 佔位就緒
2. Phase 3 → Hub 依三類列出所有模式（MVP）
3. Phase 4 → 22 個模式專頁內容補齊（可再細分為先做數個模式再全量）
4. Phase 5 → 依類別瀏覽與 3 次點擊驗證
5. Phase 6 → 驗證與 CHANGELOG

### Notes

- 所有可見文字為正體中文（FR-007、SC-004）。
- Singleton 沿用既有 `SingletonPage.jsx`，僅在 patternList 與 hub 列表中列出（FR-006）。
- 未知 slug 導向 `/design-pattern`，符合 spec edge case。
