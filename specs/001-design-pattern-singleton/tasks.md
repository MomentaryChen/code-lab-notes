# Tasks: 設計模式主軸與 Singleton 頁面

**Input**: Design documents from `/specs/001-design-pattern-singleton/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 規格未要求自動化測試；以手動依 quickstart.md 驗證。

**Organization**: 依 User Story 分階段，每階段可獨立驗證。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可並行（不同檔案、無依賴）
- **[Story]**: 所屬 user story（US1, US2）
- 描述含明確檔案路徑

## Path Conventions

- 專案為單一前端 SPA：`src/` 在 repository root；本 feature 新增 `src/pages/designpattern/`。

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立本 feature 所需目錄結構

- [x] T001 Create directory `src/pages/designpattern/` per plan.md structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 路由與設計模式區塊最小頁面，使首頁連結與 /oop 導向可運作；所有 user story 依賴此階段完成。

**⚠️ CRITICAL**: 未完成前無法獨立驗證 US1/US2

- [x] T002 [P] Create design pattern hub page in `src/pages/designpattern/DesignPatternLab.jsx`（最小可行：標題「設計模式」、副標、返回首頁連結、正體中文；版型可參照 `src/pages/algorithm/AlgorithmLab.jsx`）
- [x] T003 [P] Create Singleton placeholder page in `src/pages/designpattern/SingletonPage.jsx`（最小可行：標題「Singleton 單例模式」、返回設計模式 hub 與返回首頁連結、正體中文）
- [x] T004 Register routes in `src/main.jsx`：`/design-pattern` → DesignPatternLab、`/design-pattern/singleton` → SingletonPage；並將 `/oop` 設為重新導向至 `/design-pattern`（使用 React Router 的 Navigate 或 redirect）

**Checkpoint**: 可手動輸入 `/design-pattern` 與 `/design-pattern/singleton` 看到頁面，且 `/oop` 會導向 `/design-pattern`

---

## Phase 3: User Story 1 - 設計模式主軸入口 (Priority: P1) 🎯 MVP

**Goal**: 首頁主軸改為「設計模式」、點擊進入設計模式 hub，hub 顯示子主題入口並可返回首頁。

**Independent Test**: 開啟首頁可見「設計模式」主軸標題與描述，點擊進入設計模式區塊首頁，可見導覽或子主題列表，可返回首頁。

### Implementation for User Story 1

- [x] T005 [US1] Update `src/pages/HomePage.jsx`：將原「Java OOP」主軸改為「設計模式」標題、描述改為設計模式相關、連結改為 `/design-pattern`（正體中文）
- [x] T006 [US1] Update `src/pages/designpattern/DesignPatternLab.jsx`：新增子主題列表，至少含「Singleton」之連結至 `/design-pattern/singleton`；確保返回首頁連結明顯；版型與正體中文符合 FR-002、FR-006、FR-007

**Checkpoint**: User Story 1 可獨立驗證：首頁→設計模式→見 Singleton 入口→返回首頁

---

## Phase 4: User Story 2 - Singleton 說明與使用介紹頁 (Priority: P2)

**Goal**: Singleton 專頁具完整解釋與使用介紹，含 Java/Spring Boot 範例脈絡，可從設計模式 hub 進入並返回。

**Independent Test**: 從設計模式區塊點擊 Singleton 進入專頁，可閱讀解釋（何謂單例、為何需要、適用情境）與使用介紹（何時使用、概念性使用方式、注意事項或常見陷阱），可返回 hub 或首頁。

### Implementation for User Story 2

- [x] T007 [US2] Add Singleton 解釋區塊 in `src/pages/designpattern/SingletonPage.jsx`：單例意涵、為何需要、適用情境、與其他模式的區別（正體中文，對應 FR-004）
- [x] T008 [US2] Add Singleton 使用介紹區塊 in `src/pages/designpattern/SingletonPage.jsx`：何時使用、概念性使用方式、注意事項或常見陷阱（正體中文，對應 FR-005）
- [x] T009 [US2] Add Java/Spring Boot 程式範例 in `src/pages/designpattern/SingletonPage.jsx`：以 Java 或 Spring Boot（如 @Component 單例 Bean）為例的簡短程式碼片段，支援解釋與使用介紹（正體中文說明；對應 research.md 決策）

**Checkpoint**: User Story 2 可獨立驗證：設計模式 hub→Singleton→完整內容與導覽

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 驗證與文件

- [x] T010 Run quickstart.md validation：依 `specs/001-design-pattern-singleton/quickstart.md` 本地 dev 與驗證步驟確認首頁、hub、Singleton、/oop 導向皆符合規格
- [x] T011 [P] Update `CHANGELOG.md`：於 Unreleased 新增本 feature 實作完成之條目（設計模式主軸與 Singleton 頁面）

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 無依賴，可立即執行
- **Phase 2 (Foundational)**: 依賴 Phase 1；完成後 US1、US2 所需路由與頁面骨架就緒
- **Phase 3 (US1)**: 依賴 Phase 2；可單獨完成並驗證（MVP）
- **Phase 4 (US2)**: 依賴 Phase 2（及 Phase 3 以有 hub 可點入 Singleton）；可於 US1 後執行
- **Phase 5 (Polish)**: 依賴 Phase 3、4 完成

### User Story Dependencies

- **User Story 1 (P1)**: 僅依賴 Phase 2；完成 T005、T006 即可獨立驗證
- **User Story 2 (P2)**: 依賴 Phase 2 與設計模式 hub 存在（Phase 3）；完成 T007、T008、T009 即可獨立驗證

### Within Each User Story

- US1：先更新 HomePage（T005），再更新 DesignPatternLab 子主題列表（T006）
- US2：同一檔案 SingletonPage.jsx 內先解釋（T007）、再使用介紹（T008）、再範例（T009）；可依序或合併實作

### Parallel Opportunities

- T002 與 T003 可並行（不同檔案）
- T007、T008、T009 為同一檔案，建議依序；T011 可與 T010 並行（不同檔案）

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1：T001
2. 完成 Phase 2：T002、T003、T004
3. 完成 Phase 3：T005、T006
4. **STOP and VALIDATE**：依 quickstart 驗證首頁→設計模式→返回
5. 可部署／展示後再進行 US2

### Incremental Delivery

1. Phase 1 + 2 → 路由與骨架就緒
2. Phase 3 → 設計模式主軸與 hub 可獨立使用（MVP）
3. Phase 4 → Singleton 專頁完整內容
4. Phase 5 → 驗證與 CHANGELOG

### Notes

- 所有可見文字為正體中文（FR-006、FR-007）。
- 版型與導覽對齊既有 `AlgorithmLab.jsx` 與專案 `.cursor/rules` 之 UI 風格。
