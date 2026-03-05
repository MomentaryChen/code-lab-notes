# Contracts — 001-rate-limit-animations

本功能為純前端限流策略教學與可視化，不引入後端 API 或外部服務，因此不存在傳統意義上的 HTTP/REST/GraphQL 介面合約。  
為了保持一致性，本檔案僅說明前端內部可視為「合約」的部分，供未來擴充或重構參考。

---

## 1. Internal Contracts（前端內部約定）

### 1.1 Strategy Simulation Function

- 簡述：  
  - 針對每種策略，會有一個純函式或共用函式 `simulateRateLimiting(strategyId, parameters, requestTimestamps)`。  
  - 該函式不依賴瀏覽器 DOM 或 React state，僅根據輸入回傳 `SimulationResult`。
- 合約約定（語言無關、以概念描述）：
  - **Input**:
    - `strategyId`: 限流策略識別字串。
    - `parameters`: key → value 映射，需與該策略定義的 `ParameterDefinition.key` 相容。
    - `requestTimestamps`: 代表請求時間點的數值陣列。
  - **Output**:
    - `SimulationResult` 物件，至少包含：
      - `events`: `RequestEvent[]`（含 timestamp、status、策略特有資訊）；
      - `totalRequests`, `allowedCount`, `rejectedCount`, `timeRange`。
  - **Behavior**:
    - 不修改輸入參數（不可變性）。
    - 對相同輸入必須回傳相同結果（決定性）。

### 1.2 RateLimitingVisualization Props

- 若未來將可視化元件抽成可重用 component，建議 props 介面包含：
  - `availableStrategies`: `RateLimitingStrategy[]`
  - `availableScenarios`: `TrafficScenario[]`
  - `defaultStrategyId`, `defaultScenarioId`
  - 可選的 callback，如 `onSimulationChange(result: SimulationResult)`

---

## 2. External Contracts（未來擴充預留）

目前不規劃任何外部 API；若未來需要：

- 應新增對應檔案（例如 `contracts/rate-limiting-openapi.yaml`）描述 HTTP/REST 介面；
- 並在 changelog 與 plan 中說明為何新增後端服務，確保不違反「避免過度設計」原則。

