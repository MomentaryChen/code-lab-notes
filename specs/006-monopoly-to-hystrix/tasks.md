# Tasks: 006-monopoly-to-hystrix

**Input**: Design documents from `/specs/006-monopoly-to-hystrix/`  
**Prerequisites**: `plan.md`、`spec.md`（user stories）、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**Tests**: 本 feature 未要求新增自動化測試框架，驗收以 `quickstart.md` 所述手動檢查與畫面確認為主。下列任務不包含額外測試程式碼任務。

**Organization**: 任務依 user story 分組，確保每則故事可以獨立實作與驗收。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行執行（不同檔案、無彼此依賴）
- **[Story]**: 此任務對應之 user story（US1、US2）
- 描述中需含**明確檔案路徑**

---

## Phase 1: Setup（共用環境）

**Purpose**: 確保專案可在本機正確啟動並提供系統架構頁面供後續開發與驗收。

- [X] T001 確認專案依賴已安裝（若尚未執行過）`pnpm install`（於專案根目錄）
- [X] T002 [P] 確認開發伺服器可正常啟動並進入系統架構頁 `pnpm dev` → 手動開啟 `/system-architecture`

---

## Phase 2: Foundational（阻擋性前置作業）

**Purpose**: 彙整並確認 005 feature 產出的系統架構結構與路由現況，避免在錯誤前提上調整內容。

**⚠️ CRITICAL**: 本階段完成前，不進行 user story 相關內容修改。

- [X] T003 閱讀既有系統架構頁實作結構（限流、壟斷兩小節）於 `src/pages/systemarchitecture/SystemArchitecturePage.jsx`
- [X] T004 [P] 確認首頁「系統架構」主軸卡片連結至 `/system-architecture` 並觀察現有文案於 `src/pages/HomePage.jsx`
- [X] T005 對照 005 feature 的 `data-model.md` 與 `contracts/README.md`，確認現有錨點 `#rate-limiting`、`#monopoly` 與頁面結構

**Checkpoint**: 確認目前結構與 005 設計一致後，方可開始 Hystrix 相關改動。

---

## Phase 3: User Story 1 - 讀者在系統架構區塊看到 Hystrix 介紹（Priority: P1）🎯 MVP

**Goal**: 使用者進入系統架構頁時，第二個主題小節為「Hystrix」，原「壟斷」小節不再顯示，且順序維持「限流」→「Hystrix」。

**Independent Test**: 進入 `/system-architecture`，向下捲動可看到第一小節「限流」與第二小節「Hystrix」；頁面中不再出現壟斷小節標題與內容。

### Implementation for User Story 1

- [X] T006 [US1] 將系統架構頁中第二個 section 的標題由「壟斷」改為「Hystrix」，並更新 `section` 的錨點 id 由 `monopoly` 改為 `hystrix` 於 `src/pages/systemarchitecture/SystemArchitecturePage.jsx`
- [X] T007 [US1] 移除或改寫原「壟斷」介紹段落，改為符合 Hystrix 主題的標題與結構（保留兩段說明格式）於 `src/pages/systemarchitecture/SystemArchitecturePage.jsx`
- [X] T008 [P] [US1] 依 `data-model.md` 與 `contracts/README.md` 更新對應文件中的錨點與標題說明（若尚未調整到 Hystrix 版，確保與程式碼一致）於 `specs/006-monopoly-to-hystrix/data-model.md`、`specs/006-monopoly-to-hystrix/contracts/README.md`
- [X] T009 [US1] 手動驗證：啟動 `pnpm dev`，造訪 `/system-architecture`，確認頁面出現「限流」「Hystrix」兩個小節、原壟斷內容已消失（對應 US1、FR-001、FR-002、SC-001）

**Checkpoint**: User Story 1 完成後，讀者已能在系統架構頁看到 Hystrix 小節且不再看到壟斷小節。

---

## Phase 4: User Story 2 - 讀者理解 Hystrix 介紹內容（Priority: P2）

**Goal**: 讀者閱讀 Hystrix 小節後，能理解其在系統架構中的目的（延遲與容錯、防止連鎖失敗等）與至少一種典型使用情境（例如保護下游服務、降級策略等）。

**Independent Test**: 依 `quickstart.md` 步驟造訪 `/system-architecture#hystrix`，閱讀 Hystrix 介紹後能口頭或文字說出其目的與至少一種典型情境。

### Implementation for User Story 2

- [X] T010 [US2] 依 `research.md` 中的決策，撰寫 Hystrix 小節內容文字（包含熔斷、隔離、降級、監控等概念與典型情境），更新於 `src/pages/systemarchitecture/SystemArchitecturePage.jsx`
- [X] T011 [P] [US2] 檢查 Hystrix 小節文字長度與段落切分是否符合「5 分鐘內可讀完」與結構清晰要求，必要時微調段落劃分於 `src/pages/systemarchitecture/SystemArchitecturePage.jsx`
- [X] T012 [US2] 手動驗證：透過 `/system-architecture#hystrix` 直接進入 Hystrix 小節，確認內容聚焦在延遲與容錯／熔斷目的與典型情境，讀者在閱讀後能說明一種使用情境（對應 FR-003、FR-004、FR-005、SC-002、SC-003、SC-004）

---

## Phase 5: Edge Cases & 首頁文案一致性（跨 User Stories）

**Purpose**: 處理規格 Edge Cases（壟斷錨點／連結）與首頁文案同步更新，確保入口預期與內頁內容一致。

- [X] T013 更新首頁「系統架構」主軸卡片描述文字，從「限流、壟斷等系統架構概念介紹與常見情境說明」改為提及「限流、Hystrix（熔斷）等系統架構與容錯概念介紹與常見情境說明」於 `src/pages/HomePage.jsx`
- [X] T014 [P] 掃描專案中是否仍有指向 `/system-architecture#monopoly` 的內部連結或錨點，若有則改為 `/system-architecture#hystrix` 或導向 `/system-architecture` 頁首（限檢查 `.jsx`、`.md` 檔）
- [X] T015 手動驗證：  
  - 從首頁點擊「系統架構」主軸卡片 → 進入 `/system-architecture`，確認卡片文案與頁面實際內容一致（提及 Hystrix／熔斷）；  
  - 直接造訪任何舊有 `/system-architecture#monopoly` 連結（若仍存在），確認不會導向不存在的小節（需已改為 `#hystrix` 或頁首）

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 清理文件、確認 quickstart 與實作完全對齊，並更新專案層級說明。

- [X] T016 [P] 對齊並微調 `specs/006-monopoly-to-hystrix/quickstart.md` 內的描述，確保步驟與實際 UI 文案／錨點完全一致
- [X] T017 [P] 檢查 `specs/006-monopoly-to-hystrix/research.md`、`data-model.md`、`contracts/README.md` 是否皆與最終實作同步（如有措辭差異，進行小幅修正）
- [X] T018 在完成所有實作後，依專案規則更新根目錄 `CHANGELOG.md`，新增一條描述「系統架構區塊第二主題改為 Hystrix，並更新對應規格／設計文件」

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup（Phase 1）**：無相依，可立即開始。
- **Foundational（Phase 2）**：依賴 Phase 1，負責確認現況與結構；完成前不進行 user story 修改。
- **User Story Phases（Phase 3、4）**：
  - Phase 3（US1，P1）需在 Phase 2 完成後開始，為本 feature MVP 核心。
  - Phase 4（US2，P2）依賴 Phase 3 已建立 Hystrix 小節架構，可與 Phase 5 部分任務並行。
- **Edge Cases & 首頁文案（Phase 5）**：依賴 US1/US2 的主要內容已成形，處理入口與舊錨點。
- **Polish（Phase 6）**：在所有前述 phase 完成後進行文件與 CHANGELOG 對齊。

### User Story Dependencies

- **User Story 1（P1）**：僅依賴 Foundational phase 結果（確認現有結構），不依賴其他 user story，作為 MVP。
- **User Story 2（P2）**：依賴 US1 已建立 Hystrix 小節結構與錨點，但在文字內容與細節調整上可獨立驗收。

### Within Each User Story

- US1：先完成結構與標題／錨點更新（T006、T007），再進行文件對齊與手動驗證（T008、T009）。
- US2：先完成內容撰寫（T010）、再微調結構與長度（T011），最後執行錨點與理解度驗證（T012）。

### Parallel Opportunities

- Phase 1：T001、T002 可由不同人員交錯執行（例如一人啟動 dev server，一人確認依賴）。
- Phase 2：T003、T004、T005 可平行閱讀與比對文件與程式碼。
- Phase 3：T008 可與程式碼修改（T006、T007）間隔進行，只需在最終前再做一次同步確認。
- Phase 4：T010 與 T011 的內容撰寫與調整可由不同人協作，最終再由一人整體校稿。
- Phase 5：T013、T014 可平行進行（首頁文案 vs 專案內連結掃描），最後由 T015 聚合驗證。
- Phase 6：T016、T017 可並行更新文件，T018 於所有內容確定後最後執行。

---

## Implementation Strategy

### MVP First（User Story 1）

1. 完成 Phase 1：Setup。
2. 完成 Phase 2：Foundational，確認現況結構與路由。
3. 完成 Phase 3：User Story 1，使系統架構頁顯示「Hystrix」且移除壟斷小節。
4. 依 `quickstart.md` 執行對應驗證步驟，確保 US1 行為正確。

### Incremental Delivery

1. 在 US1 完成且可驗收後，繼續 Phase 4（US2），補齊 Hystrix 內容深度。
2. 完成 Phase 5，處理首頁文案與 Edge Cases，確保入口預期與內容一致。
3. 最後進入 Phase 6，同步更新文件與 `CHANGELOG.md`，完成 feature 交付。

