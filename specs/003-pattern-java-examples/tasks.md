# Tasks: 設計模式切割與全數 Java 範例

**Input**: Design documents from `/specs/003-pattern-java-examples/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 規格未要求自動化測試；以手動依 quickstart.md 驗證。

**Organization**: 依 User Story 分階段，每階段可獨立驗證。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可並行（不同檔案或同一檔不同區塊、無依賴）
- **[Story]**: 所屬 user story（US1, US2, US3）
- 描述含明確檔案路徑

## Path Conventions

- 專案為單一前端 SPA；本 feature 僅修改 `src/pages/designpattern/patternContent.js`，可選修改 `PatternPage.jsx`。

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 無新增專案結構；確認既有 PatternPage 與 patternContent 可支援三區塊與範例。

- [x] T001 Verify that `src/pages/designpattern/PatternPage.jsx` and `src/pages/designpattern/patternContent.js` exist and PatternPage renders 解釋、使用介紹、範例（當 content.example 存在時）；必要時補齊或修正區塊標題以符合 FR-001

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 確保每個設計模式專頁「結構上」皆具三區塊，使 US1 可獨立驗證。

**⚠️ CRITICAL**: 未完成前無法保證每頁皆可辨識三區塊

- [x] T002 [US1] Update `src/pages/designpattern/PatternPage.jsx` so that the 範例 section is always shown for pattern pages with content：when `content.example` exists render it, when `content` exists but `content.example` is missing show placeholder text（例如「本模式範例建置中」）so that every pattern page has three identifiable sections（何謂、何時使用與概念性使用方式、範例：Java 與 Spring Boot）（FR-001）

**Checkpoint**: 任一點入設計模式專頁（含尚無範例者）皆可辨識三個區塊

---

## Phase 3: User Story 1 - 每個設計模式專頁結構分明 (Priority: P1) 🎯 MVP

**Goal**: 訪客可清楚區分解釋、使用介紹、範例三區塊，區塊標題與內容分離清楚。

**Independent Test**: 任選一設計模式專頁，可辨識至少三個明確區塊（解釋、使用介紹、範例），區塊標題與內容分離清楚。

### Implementation for User Story 1

- [x] T003 [US1] Confirm section headings in `src/pages/designpattern/PatternPage.jsx` are consistent and clearly identifiable（何謂、何時使用與概念性使用方式、範例：Java 與 Spring Boot）；必要時為區塊加上 id 或 aria 以利定位（FR-001、SC-001）

**Checkpoint**: User Story 1 可獨立驗證：任一點入專頁可見三區塊且可透過標題定位

---

## Phase 4: User Story 2 - 每個設計模式皆有 Java 範例 (Priority: P2)

**Goal**: 每個設計模式專頁均具「範例：Java 與 Spring Boot」區塊且含至少一段 Java 或 Spring Boot 程式碼。

**Independent Test**: 逐一點入本 feature 涵蓋之所有設計模式專頁，每頁均具範例區塊且含至少一段可閱讀之 Java 程式碼；Singleton 沿用既有專頁。

### Implementation for User Story 2

- [x] T004 [P] [US2] Add `example` (intro + blocks with Java/Spring Boot code and optional note) in `src/pages/designpattern/patternContent.js` for creational patterns: abstract-factory, builder, prototype；每筆至少一段 code，正體中文 intro/note（FR-002、FR-005）
- [x] T005 [P] [US2] Add `example` in `src/pages/designpattern/patternContent.js` for structural patterns: adapter, bridge, composite, decorator, facade, flyweight, proxy（FR-002、FR-005）
- [x] T006 [P] [US2] Add `example` in `src/pages/designpattern/patternContent.js` for behavioral patterns: chain-of-responsibility, command, iterator, mediator, memento, state, strategy, template-method, visitor（FR-002、FR-005）

**Checkpoint**: User Story 2 可獨立驗證：20 個模式專頁均有範例區且含 Java 程式碼；SC-002 達成

---

## Phase 5: User Story 3 - 範例風格一致、易讀 (Priority: P3)

**Goal**: 所有專頁的範例區塊標題與程式碼區塊樣式一致，程式碼具適當縮排與可選註解。

**Independent Test**: 比較至少三個不同設計模式專頁的範例區，標題與程式碼區塊風格一致；程式碼具基本可讀性。

### Implementation for User Story 3

- [x] T007 [US3] Review all new examples in `src/pages/designpattern/patternContent.js` for consistent format（intro、blocks[].code、blocks[].note）and code readability（縮排、分段、可選註解）；align with existing factory-method and observer examples（FR-004、SC-003、SC-004）

**Checkpoint**: User Story 3 可獨立驗證：範例風格與既有一致、程式碼可讀

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 驗證與文件

- [x] T008 Run quickstart validation：依 `specs/003-pattern-java-examples/quickstart.md` 執行 pnpm dev，驗證三區塊與全數範例、pnpm build 通過
- [x] T009 [P] Update `CHANGELOG.md`：於 Unreleased 新增本 feature 實作完成之條目（設計模式切割與全數 Java 範例）

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 無依賴，可立即執行
- **Phase 2 (Foundational)**: 依賴 Phase 1；完成後每頁皆具三區塊（US1 基礎）
- **Phase 3 (US1)**: 依賴 Phase 2；可單獨驗證
- **Phase 4 (US2)**: 可與 Phase 2／3 並行或於其後執行；T004、T005、T006 可並行
- **Phase 5 (US3)**: 依賴 Phase 4（需有全部範例後再統一檢視風格）
- **Phase 6 (Polish)**: 依賴 Phase 3、4、5 完成

### User Story Dependencies

- **User Story 1 (P1)**: 依賴 Phase 2 完成；T003 確認標題與可辨識性
- **User Story 2 (P2)**: 無依賴其他 story；T004–T006 補齊 20 個模式 example
- **User Story 3 (P3)**: 依賴 US2 完成後檢視風格與可讀性

### Parallel Opportunities

- T004、T005、T006 可並行（同一檔案 patternContent.js 不同區塊，或協調後分區撰寫）
- T009 可與 T008 並行（不同檔案）

---

## Parallel Example: User Story 2

```text
# 可依類別並行產製範例（同一檔不同區塊）：
T004: Add example for abstract-factory, builder, prototype in patternContent.js
T005: Add example for adapter, bridge, composite, decorator, facade, flyweight, proxy in patternContent.js
T006: Add example for chain-of-responsibility, command, iterator, mediator, memento, state, strategy, template-method, visitor in patternContent.js
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1：T001
2. 完成 Phase 2：T002
3. 完成 Phase 3：T003
4. **STOP and VALIDATE**：任一點入設計模式專頁可見三區塊且可定位
5. 可再進行 US2、US3

### Incremental Delivery

1. Phase 1 + 2 → 每頁三區塊就緒（含範例佔位）
2. Phase 3 → 區塊標題與可辨識性確認（MVP）
3. Phase 4 → 20 個模式範例補齊（可分批：建立型 → 結構型 → 行為型）
4. Phase 5 → 風格與可讀性檢視
5. Phase 6 → 驗證與 CHANGELOG

### Notes

- Singleton 專頁不修改；factory-method、observer 已有 example，不重複編輯。
- 範例格式與既有 `example: { intro?, blocks: [{ code, note? }] }` 一致，正體中文說明。
