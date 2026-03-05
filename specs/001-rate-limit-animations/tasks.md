# Tasks: 限流策略可視化教學（固定視窗、滑動視窗、Token Bucket）

**Input**: Design documents from `specs/001-rate-limit-animations/`  
**Prerequisites**: `plan.md`（已完成）、`spec.md`（已完成）、`research.md`、`data-model.md`、`contracts/README.md`、`quickstart.md`

**Tests**: 本功能屬教學型前端互動，未在 spec 中明確要求 TDD；此處不強制加入程式層級測試任務，但建議在實作過程中依 `quickstart.md` 中的手動驗證步驟與必要單元測試自行補強。

**Organization**: Tasks 依 user story 分組，以確保每個 story 都可獨立實作與驗證。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行執行（不同檔案、無相依）
- **[Story]**: 所屬 user story（例如 US1、US2、US3）
- 每個描述須包含「明確動作 + 檔案路徑」

---

## Phase 1: Setup（本地環境與基礎確認）

**Purpose**: 確保開發者環境與專案設定已就緒，便於實作限流可視化區塊。

- [X] T001 確認專案在 `001-rate-limit-animations` 分支上且依賴已安裝（`pnpm install`）  
- [X] T002 啟動開發伺服器並確認既有 `SystemArchitecturePage` 正常載入（`pnpm dev` + 檢查 `src/pages/systemarchitecture/SystemArchitecturePage.jsx` 顯示）

---

## Phase 2: Foundational（限流可視化核心基礎）

**Purpose**: 建立後續所有 user story 共同依賴的基礎：模擬 hook、靜態策略與流量案例定義、基本樣式。

> ⚠️ **CRITICAL**：未完成本階段前，不應開始任何 user story 特定 UI 與動畫實作。

- [X] T003 [P] 建立限流模擬 hook 檔案骨架（`src/hooks/useRateLimitingSimulation.js`），暴露模擬三種策略的主要介面（例如 `simulate(config)` 或回傳 `SimulationResult`）  
- [X] T004 [P] 建立限流策略與參數定義常數模組（`src/components/RateLimiting/rateLimitingStrategies.js`），包含 `RateLimitingStrategy` 與 `ParameterDefinition` 清單  
- [X] T005 [P] 建立預設流量案例定義常數模組（`src/components/RateLimiting/trafficScenarios.js`），對應 `TrafficScenario` 結構與至少「平穩流量／尖峰流量／週期性突發」三種案例  
- [X] T006 定義 `useRateLimitingSimulation` 內部的 `SimulationConfig` 與 `SimulationResult` 型態結構（`src/hooks/useRateLimitingSimulation.js`），實作固定視窗策略模擬邏輯雛形（暫不連接 UI）  
- [X] T007 [P] 在 `src/styles/rate-limiting.css` 建立限流區塊的基本版面與色彩骨架（容器、標題、控制列、時間軸區塊），遵守 `.cursor/rules/html-ui-ux-style.mdc`  
- [X] T008 在 `src/pages/systemarchitecture/SystemArchitecturePage.jsx` 新增占位容器（例如 `<section id="rate-limiting-visualization">`）供後續掛載 `RateLimitingVisualization`，確保版面結構與現有文案協調

**Checkpoint**：  
- `useRateLimitingSimulation.js` 已能以固定視窗策略對簡單腳本輸入產生基本 `SimulationResult`；  
- 策略與案例常數模組已定義且可被 hook 匯入；  
- 系統架構頁上已有預留的限流可視化區塊容器與基本樣式。

---

## Phase 3: User Story 1 — 以動畫理解單一限流策略 (Priority: P1) 🎯 MVP

**Goal**: 在系統架構頁展示「固定視窗限流」的單一策略動畫，讓使用者能看到請求在時間軸上的通過／拒絕與視窗資訊，並可獨立理解此策略原理。

**Independent Test**（對應 spec）:  
- 僅啟用固定視窗策略與預設流量案例；  
- 使用者觀看動畫 3 分鐘內，能回答「在固定視窗內再發出請求會被如何處理」並用自己的話描述規則；  
- 手動驗證步驟參考 `quickstart.md` 4.1。

### Implementation for User Story 1

- [X] T009 [P] [US1] 建立限流可視化主元件檔案骨架 `RateLimitingVisualization.jsx`（`src/components/RateLimiting/RateLimitingVisualization.jsx`），串接 `useRateLimitingSimulation` 取得固定視窗策略的 `SimulationResult`  
- [X] T010 [P] [US1] 建立時間軸與事件視圖元件檔案 `TimelineView.jsx`（`src/components/RateLimiting/TimelineView.jsx`），接收 `events` 與 `currentTime` props 並以 DOM + CSS 呈現請求點與通過／拒絕狀態  
- [X] T011 [US1] 在 `RateLimitingVisualization.jsx` 中管理 `RateLimitingUIState`（含 `playbackStatus`、`currentTime`、`activeEventId`），以 `requestAnimationFrame` 或計時器驅動時間推進並呼叫 `TimelineView` 更新畫面  
- [X] T012 [US1] 在 `TimelineView.jsx` 中實作 hover 行為與資訊顯示區塊（可在同檔或相鄰元件內），當使用者移到事件上時顯示該事件的視窗範圍與已通過請求數（對應 `windowInfo`）  
- [X] T013 [US1] 在 `src/pages/systemarchitecture/SystemArchitecturePage.jsx` 匯入並渲染 `RateLimitingVisualization`，初期僅鎖定固定視窗策略與單一預設流量案例  
- [X] T014 [US1] 擴充 `rate-limiting.css`，為固定視窗策略動畫與狀態標記（通過／拒絕、視窗邊界）定義清晰的顏色與圖示樣式，確保在亮／暗主題下皆易讀  
 - [X] T015 [US1] 依 `quickstart.md` 4.1 的步驟在瀏覽器中進行手動驗證，若有需要更新元件文案或行為，修正 `RateLimitingVisualization.jsx` 與 `TimelineView.jsx`

**Checkpoint**：  
- 僅啟用固定視窗策略時，使用者可以播放／暫停動畫，清楚看到請求通過／拒絕與視窗資訊，並依 spec 的 Independent Test 說明正確回答情境問題。  
- 此時即可作為本功能的最小可行教學增量（MVP）進行 demo。

---

## Phase 4: User Story 2 — 比較不同限流策略的行為差異 (Priority: P2)

**Goal**: 使用相同的流量案例，在固定視窗、滑動視窗與 Token Bucket 之間切換動畫，讓使用者能直觀比較三種策略在尖峰時被拒比例與流量平滑度上的差異。

**Independent Test**:  
- 使用預設「尖峰流量」案例，三種策略皆以相同請求時間分布播放動畫；  
- 使用者可根據動畫回答「哪一種策略在尖峰時最容易拒絕請求」、「哪一種較能平滑長期流量／允許短暫突發」等問題；  
- 手動驗證步驟參考 `quickstart.md` 4.2。

### Implementation for User Story 2

- [X] T016 [P] [US2] 在 `useRateLimitingSimulation.js` 中補齊滑動視窗與 Token Bucket 策略模擬實作，確保三種策略皆可透過共同介面輸出 `SimulationResult`  
- [X] T017 [P] [US2] 在 `RateLimitingVisualization.jsx` 中加入策略切換 UI（例如按鈕群組或 tabs），狀態以 `selectedStrategyId` 管理，切換時重新計算模擬結果  
- [X] T018 [P] [US2] 調整 `RateLimitingVisualization.jsx` 使其可以選擇並切換「流量案例」（使用 `trafficScenarios.js` 中的清單），至少提供「尖峰流量」案例選項  
- [X] T019 [US2] 新增或擴充策略摘要／比較說明區塊（可在 `RateLimitingVisualization.jsx` 或新元件中），根據目前 `selectedStrategyId` 顯示該策略的高層說明（是否允許突發、是否平滑、典型場景），內容需與動畫行為一致  
- [X] T020 [US2] 更新 `rate-limiting.css`，為策略切換控制元件與摘要區塊設計風格一致的樣式（含 hover/active 狀態），並確保在小螢幕上仍可使用  
 - [X] T021 [US2] 依 `quickstart.md` 4.2 手動驗證：在三種策略間切換尖峰流量案例，確認動畫行為與摘要說明均符合 spec 的 Acceptance Scenarios

**Checkpoint**：  
- 在同一個尖峰流量案例下，三種策略的通過／拒絕模式有明顯可見差異；  
- 使用者可透過文字摘要快速對照動畫並理解適用情境；  
- US1 功能仍可獨立運作（僅啟用固定視窗時仍符合先前測試）。

---

## Phase 5: User Story 3 — 透過參數調整體驗限流策略的行為變化 (Priority: P3)

**Goal**: 讓使用者能透過調整限流參數（例如視窗大小、每視窗最大請求數、桶容量與補充速率）體驗策略行為的變化，特別是極端設定時的效果。

**Independent Test**:  
- 僅針對一種策略（建議 Token Bucket）開放參數調整；  
- 使用者在調整參數後重新播放動畫，可明顯看到通過／拒絕模式的變化，並能口頭描述「調大或調小」的影響；  
- 手動驗證步驟參考 `quickstart.md` 4.3。

### Implementation for User Story 3

- [X] T022 [P] [US3] 建立參數控制列元件檔案 `StrategyControls.jsx`（`src/components/RateLimiting/StrategyControls.jsx`），根據當前策略與 `ParameterDefinition` 產生對應的 slider／數字輸入欄位  
- [X] T023 [US3] 在 `RateLimitingVisualization.jsx` 中整合 `StrategyControls`，將使用者輸入同步至 `currentParameters`，並在參數變更時依設計決定是自動重算並重播或顯示「請重新播放」提示  
- [X] T024 [US3] 在 `StrategyControls.jsx` 中加入基本參數驗證邏輯（依 `data-model.md` 中的 min/max），超出建議範圍時以清楚的錯誤或警示訊息提示使用者，並避免送入模擬  
- [X] T025 [P] [US3] 擴充 `useRateLimitingSimulation.js`，處理極端參數設定（非常小或非常大的數值），確保模擬仍能輸出合理的事件序列，不致造成動畫無限延伸或卡死  
 - [X] T026 [US3] 調整 `TimelineView.jsx` 與相關樣式，使在極端設定下（例如「幾乎全部被拒」或「短時間大量通過」）畫面仍可理解，不會因過多標記而變得難以辨識  
 - [X] T027 [US3] 依 `quickstart.md` 4.3 手動驗證：針對 Token Bucket 策略調整桶容量與補充速率，確定動畫行為與錯誤提示符合 spec 的 Acceptance Scenarios 與 Edge Cases

**Checkpoint**：  
- 對於至少一種策略（建議 Token Bucket），參數調整能明顯影響動畫行為，使用者可從中體會參數與行為間的關係；  
- 參數驗證與錯誤提示清楚，避免造成「動畫壞掉」的誤解。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 對三個 user story 共同關注的體驗與品質進行收尾與優化。

 - [X] T028 [P] 統整並微調 `rate-limiting.css`，減少重複樣式，確保在不同 viewport 下版面仍清楚（特別是時間軸與控制列的排版）  
 - [X] T029 檢查所有新元件（`RateLimitingVisualization.jsx`、`TimelineView.jsx`、`StrategyControls.jsx`、`useRateLimitingSimulation.js`）的命名與註解是否清楚且使用正體中文說明非顯而易見的設計意圖  
 - [X] T030 比照 `quickstart.md` 中的三段手動驗證流程（US1/US2/US3），完整走過一次並記錄任何需在 spec 或 quickstart 中修正的細節（如文字不一致、截圖需求等），同步更新對應文件

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup（Phase 1）**：無前置相依，可立即執行（T001–T002）。  
- **Foundational（Phase 2）**：依賴 Setup 完成，且為 US1/US2/US3 的共同前置（T003–T008）。  
- **User Story 階段（Phase 3–5）**：
  - US1（Phase 3）依賴 Phase 2 完成；無需等待 US2/US3。  
  - US2（Phase 4）依賴 Phase 2 完成；可在 US1 完成後或平行進行，但實務上建議在 US1 穩定後再啟動，以便重用 UI。  
  - US3（Phase 5）依賴 Phase 2 完成，並實務上建議在 US2 完成後啟動，以重用策略與案例切換邏輯。  
- **Polish（Phase 6）**：依賴所有欲交付之 user story 完成後再進行。

### User Story Dependencies

- **User Story 1（P1）**：  
  - 依賴：T003–T008（Foundational）。  
  - 無對其他 user story 的硬相依，可作為 MVP 單獨交付。  
- **User Story 2（P2）**：  
  - 依賴：T003–T008；實務上建議 T009–T015（US1）已完成，以避免重複實作視覺化骨架。  
- **User Story 3（P3）**：  
  - 依賴：T003–T008；實務上建議 T016–T021（US2）已完成，以便在參數調整時能跨策略或至少重用現有控制列架構。

### Within Each User Story

- 自上而下建議順序：  
  - 先擴充 hook 與資料定義（Foundational 與 USx 中的演算法或 config 任務）；  
  - 再建立／調整元件與樣式；  
  - 最後進行手動驗證與文件微調。  
- 各 user story 在自身階段內仍應保持「任一時點皆可獨立驗證」的特性。

---

## Parallel Opportunities

- **Phase 2（Foundational）**：  
  - T003、T004、T005、T007 為不同檔案，可於不同開發者間並行；T006 與 T008 依賴前述檔案結構，建議在常數與樣式基礎就緒後進行。  
- **User Story 1（US1）**：  
  - T009（主元件骨架）與 T010（時間軸視圖骨架）可平行開發，最終由 T011–T015 串接整體行為。  
- **User Story 2（US2）**：  
  - T016（擴充模擬邏輯）與 T017、T018（策略／案例切換 UI）可由不同人負責，最後由 T019–T021 進行整合與樣式調整。  
- **User Story 3（US3）**：  
  - T022（控制列元件）與 T025（極端參數處理）部份可平行進行，但 T023–T024–T026–T027 需在控制列與模擬邏輯穩定後統一驗證。  
- **Polish（Phase 6）**：  
  - T028 可與 T029 同時進行，T030 則建議在程式與樣式較穩定後集中一次完成。

---

## Implementation Strategy

### MVP First（僅交付 User Story 1）

1. 完成 Phase 1：Setup（T001–T002）。  
2. 完成 Phase 2：Foundational（T003–T008），確保模擬與基本樣式架構穩定。  
3. 完成 Phase 3：User Story 1（T009–T015）。  
4. 依 `quickstart.md` 4.1 進行完整手動驗證，確認固定視窗限流動畫可獨立教學。  
5. 若需要，可在此階段先行 demo 或合併，作為最小限流教學增量。

### Incremental Delivery（逐步增加策略比較與參數調整）

1. 在 MVP 穩定後，啟動 Phase 4（US2）：加入多策略切換與尖峰流量比較（T016–T021），再依 `quickstart.md` 4.2 驗證。  
2. 接著進入 Phase 5（US3）：解鎖參數調整能力與極端情境展示（T022–T027），依 `quickstart.md` 4.3 驗證。  
3. 最後執行 Phase 6（T028–T030），統整樣式、註解與文件，使三個 user story 在體驗與文字上維持一致。

### Parallel Team Strategy

若有多位開發者可投入：

1. 共同完成 Phase 1–2，協調好 `RateLimiting` 相關檔案命名與資料結構。  
2. Foundational 完成後：
   - 開發者 A：專注於 US1（視覺化與動畫控制）。  
   - 開發者 B：專注於 US2（策略比較與摘要說明）。  
   - 開發者 C：專注於 US3（參數控制列與極端行為處理）。  
3. 每位開發者在完成自身 user story 後，以 `quickstart.md` 中對應段落進行自我驗證，最後由團隊一起走過完整流程並調整文件。

