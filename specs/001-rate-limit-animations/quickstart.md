# Quickstart — 001-rate-limit-animations

**目標**：說明如何在本專案中啟用與驗證「限流策略可視化教學（固定視窗、滑動視窗、Token Bucket）」功能，協助開發者或貢獻者快速上手。

---

## 1. 前置條件

- 已在本機完成專案安裝：
  - `pnpm install`
- 能以開發模式啟動專案：
  - `pnpm dev`
- 使用現代瀏覽器（建議 Chrome / Edge / Firefox 最新版）。

---

## 2. 功能位置

- 啟動開發伺服器後，開啟瀏覽器進入專案首頁。
- 透過導覽或首頁卡片前往「系統架構」主題頁（`/system-architecture` 或既有對應路由）。
- 在頁面中找到「限流」小節，下方預期會出現：
  - 策略切換區（固定視窗／滑動視窗／Token Bucket）；
  - 流量案例選擇；
  - 參數調整控制列；
  - 動畫展示區（時間軸與請求事件）。

實際路由與錨點名稱請依最終實作為準，實作時需更新本檔說明。

---

## 3. 開發步驟概觀

1. **建立元件與 hook**：
   - 在 `src/components/RateLimiting/` 下建立：
     - `RateLimitingVisualization.jsx`
     - `StrategyControls.jsx`
     - `TimelineView.jsx`
   - 在 `src/hooks/` 下建立：
     - `useRateLimitingSimulation.js`（封裝三種限流策略演算法與模擬流程）
2. **整合到 SystemArchitecturePage**：
   - 在 `src/pages/systemarchitecture/SystemArchitecturePage.jsx` 匯入並渲染 `RateLimitingVisualization`；
   - 將其放入「限流」說明文字之後，使使用者先閱讀概念、再透過動畫加深理解。
3. **撰寫樣式**：
   - 在 `src/styles/` 新增 `rate-limiting.css`；
   - 遵守 `.cursor/rules/html-ui-ux-style.mdc` 的色彩與版面規範，維持與其他演算法頁風格一致。
4. **補齊測試**：
   - 在 `tests/unit/hooks/` 下新增 `useRateLimitingSimulation.test.js`，針對三種策略在關鍵案例驗證事件輸出；
   - 在 `tests/integration/` 下新增 `RateLimitingVisualization.test.jsx`，確認策略切換、案例切換與參數調整時畫面有合理更新。

---

## 4. 手動驗證指南

> 對應 spec 中的 User Scenarios & Testing。

### 4.1 P1：以動畫理解單一限流策略

1. 進入系統架構頁並選擇固定視窗策略。
2. 點擊播放，觀察請求在時間軸上依序出現，確認：
   - 每個請求都有明確的「通過」或「被拒絕」標示；
   - 視窗內已通過請求數與視窗邊界資訊能在 hover 或 tooltip 中看到。
3. 依照 spec 中的情境提問，驗證是否可以僅靠動畫與說明理解固定視窗限流原理。

### 4.2 P2：比較不同限流策略的行為差異

1. 選擇一個預設的「尖峰流量」案例。
2. 在固定視窗、滑動視窗與 Token Bucket 之間切換：
   - 確認三者都以同一組請求時間分布播放；
   - 觀察被拒比例與請求通過節奏的差異。
3. 檢查策略摘要區塊是否與實際動畫行為一致（例如是否允許短暫突發、是否較平滑）。

### 4.3 P3：透過參數調整體驗行為變化

1. 選擇 Token Bucket 策略。
2. 將桶容量與補充速率調小，播放動畫，觀察：
   - 短時間內易出現「幾乎全部被拒」的行為。
3. 將桶容量與補充速率調大，再次播放：
   - 應可看到較多請求在短時間內被允許通過。
4. 確認當參數超出建議範圍時，UI 會顯示清楚的提示或錯誤訊息。

---

## 5. 後續擴充建議（非本次必做）

- 新增更多預設流量案例（例如「午餐尖峰」、「半夜低流量」），豐富教學情境。
- 加入簡單的統計摘要圖示（例如通過率圓餅圖），在不增加大型圖表依賴的前提下增強理解。
- 提供匯出目前模擬設定的 JSON 片段，方便在其他教學或文件中重用。

