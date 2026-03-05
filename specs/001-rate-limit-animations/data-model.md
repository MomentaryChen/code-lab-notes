# Data Model & State Design — 001-rate-limit-animations

**Feature**: 限流策略可視化教學（固定視窗、滑動視窗、Token Bucket）  
**Branch**: `001-rate-limit-animations`  
**Spec**: `specs/001-rate-limit-animations/spec.md`  
**Research**: `specs/001-rate-limit-animations/research.md`

本文件整理本功能在前端中的資料結構與狀態設計，對應 spec 中的 Key Entities 與 Functional Requirements。

---

## 1. Domain Entities（概念層）

> 僅描述資料意義與欄位，不綁定實作語言或框架 API。

### 1.1 RateLimitingStrategy（限流策略）

- **Purpose**: 描述固定視窗、滑動視窗與 Token Bucket 等不同策略的屬性，供 UI 顯示與模擬器選擇。
- **Fields**:
  - `id`: 策略識別字串（例如 `"fixed-window"`, `"sliding-window"`, `"token-bucket"`）
  - `name`: 顯示名稱（例如「固定視窗限流」）
  - `description`: 簡短文字說明，用於摘要區塊
  - `allowsBurst`: 是否允許短暫突發流量（布林）
  - `isSmooth`: 是否傾向平滑分散請求（布林）
  - `typicalUseCases`: 典型適用情境列表（簡短文字陣列）
  - `parameters`: 參數定義（見下方 ParameterDefinition）

### 1.2 ParameterDefinition（參數定義）

- **Purpose**: 定義特定策略下可調整的參數與其建議範圍，以支援控制列 UI 與驗證。
- **Fields**:
  - `key`: 參數鍵（例如 `"maxRequests"`, `"windowSizeMs"`, `"bucketCapacity"`, `"refillRatePerSec"`）
  - `label`: UI 顯示名稱（正體中文）
  - `description`: 簡短說明；可用於 tooltip
  - `minValue`: 建議最小值
  - `maxValue`: 建議最大值
  - `defaultValue`: 預設值
  - `step`: UI 調整步進值（滑桿／數字輸入）

### 1.3 TrafficScenario（流量案例）

- **Purpose**: 表示一組預設或自訂的請求時間分佈，用於在不同策略間重播與比較。
- **Fields**:
  - `id`: 案例識別字串（例如 `"steady"`, `"spiky"`, `"burst-periodic"`）
  - `name`: 顯示名稱（例如「平穩流量」、「尖峰流量」）
  - `description`: 說明文字，描述請求模式
  - `requestTimestamps`: 數值陣列，代表相對時間（毫秒或秒）上的請求發生點

### 1.4 RequestEvent（請求事件）

- **Purpose**: 代表動畫時間軸上的單一請求與其模擬結果。
- **Fields**:
  - `id`: 唯一識別（可由索引與時間組合）
  - `timestamp`: 請求發生的相對時間
  - `status`: 模擬結果狀態（`"allowed" | "rejected"`）
  - `strategyId`: 所使用的限流策略 id
  - `windowInfo`（選填，限固定／滑動視窗）:
    - `windowStart`: 該請求所屬時間視窗起點
    - `windowEnd`: 該請求所屬時間視窗終點
    - `requestsInWindow`: 該視窗內已允許的請求數
  - `bucketInfo`（選填，Token Bucket）:
    - `tokensBefore`: 請求發生前桶中 token 數
    - `tokensAfter`: 請求處理後桶中 token 數

### 1.5 SimulationConfig（模擬設定）

- **Purpose**: 綜合代表「策略 + 參數 + 流量案例」的一次模擬設定。
- **Fields**:
  - `strategyId`: 選擇的限流策略
  - `parameters`: 實際使用的參數值（對應 ParameterDefinition）
  - `scenarioId`: 選擇的流量案例
  - `speedMultiplier`: 動畫播放速度倍率（例如 0.5x, 1x, 2x）

### 1.6 SimulationResult（模擬結果）

- **Purpose**: 封裝一次模擬所產生的事件序列與統計資訊，供動畫與摘要顯示使用。
- **Fields**:
  - `events`: `RequestEvent[]`，依時間排序
  - `totalRequests`: 總請求數
  - `allowedCount`: 被允許的請求數
  - `rejectedCount`: 被拒絕的請求數
  - `timeRange`: `[start, end]`，涵蓋請求與動畫的時間範圍

---

## 2. UI State（前端狀態）

> 這些狀態預期由 React state / hook 管理，不一定一一對應到後端實體。

### 2.1 RateLimitingUIState

- **Fields**:
  - `selectedStrategyId`: 目前選擇的策略 id
  - `selectedScenarioId`: 目前選擇的流量案例 id
  - `currentParameters`: 目前 UI 上各參數的值（以 key → value 映射表示）
  - `playbackStatus`: `"idle" | "playing" | "paused" | "finished"`
  - `currentTime`: 動畫目前進行到的相對時間點
  - `speedMultiplier`: 動畫速度倍率
  - `activeEventId`: 目前滑鼠 hover 或被點選的事件 id（用於顯示詳情）
  - `error`: 若使用者輸入不合理參數時的錯誤訊息（字串或 null）

### 2.2 Derived State（衍生狀態）

- `currentSimulationConfig`: 由 `selectedStrategyId`、`selectedScenarioId` 與 `currentParameters` 組合而成，用於觸發重算模擬結果。
- `currentSimulationResult`: 由演算法模擬函式回傳的 `SimulationResult`，在策略／案例／參數改變時更新。
- `visibleEvents`: 根據 `currentTime` 過濾出目前應顯示為「已發生」的事件，用於動畫播放。

---

## 3. 行為與狀態轉移（概略）

### 3.1 播放控制

- **初始狀態**:  
  - `playbackStatus = "idle"`，`currentTime = 0`，`currentSimulationResult` 已根據預設策略與案例計算完畢。
- **開始播放**:
  - 事件：使用者按下「播放」按鈕。  
  - 狀態轉移：
    - `playbackStatus`: `"idle" | "paused" → "playing"`
    - 使用 `requestAnimationFrame` 或計時器推進 `currentTime`，依 `speedMultiplier` 調整步進速度。
- **暫停播放**:
  - 事件：使用者按下「暫停」或觸發 UI 中預設暫停行為。  
  - 狀態轉移：
    - `playbackStatus`: `"playing" → "paused"`
    - 保留 `currentTime`，停止時間推進。
- **重播**:
  - 事件：使用者按下「重播」。  
  - 狀態轉移：
    - `currentTime → 0`
    - `playbackStatus → "playing"` 或 `"idle"` 視設計行為而定（多數情境下直接進入 `"playing"`）。

### 3.2 策略／案例／參數變更

- **策略切換**:
  - 事件：使用者選擇不同的策略按鈕或下拉選單。  
  - 狀態轉移：
    - `selectedStrategyId` 更新，`currentParameters` 使用該策略對應的預設值或保留部分相容參數。
    - 重新計算 `currentSimulationResult`。
    - `currentTime` 重設為 0，`playbackStatus` 回到 `"idle"`。
- **流量案例切換**:
  - 事件：使用者在案例清單中選擇不同流量模式。  
  - 狀態轉移類似策略切換：更新 `selectedScenarioId` 並重新計算模擬結果。
- **參數調整**:
  - 事件：使用者透過滑桿或輸入框修改參數值。  
  - 驗證：
    - 若輸入超出建議範圍，設定 `error` 訊息並在 UI 顯示提示。  
  - 狀態：
    - 將合法的參數值寫入 `currentParameters`，重新計算 `currentSimulationResult`，並視設計決定是否自動重播或等待使用者按下「重播」。

---

## 4. Validation Rules（驗證規則摘要）

- 參數值驗證：
  - 每個參數必須介於其 `minValue` 與 `maxValue` 之間，否則顯示說明性錯誤訊息並拒絕套用。
  - 可允許極端值（例如接近上限或下限）以展示特殊行為，但需有明確的 UI 提示。
- 流量案例驗證：
  - `requestTimestamps` 必須為非負數且遞增（或在模擬前進行排序）。
  - 若案例定義使動畫時間過長，應在資源載入前截斷或縮放，避免超出可教學範圍。
- 策略資料完整性：
  - 每個策略必須定義對應的 `parameters` 集合，且與實作演算法預期的參數鍵一致。

---

## 5. 與現有系統的關聯

- 本資料模型僅存在於前端，且限於限流教學區塊；不與後端資料或其他主軸（演算法實驗室、設計模式、Spring Boot 筆記等）共享狀態。
- `RateLimitingStrategy`／`TrafficScenario` 等靜態資料可由常數模組匯出，與 `useRateLimitingSimulation` hook 共用，以避免重複定義。
- `SystemArchitecturePage` 僅需持有「是否展開限流教學區塊」等 UI 狀態，其餘皆由本功能內部元件自行管理。

