# Quickstart: 006-monopoly-to-hystrix

**Feature**: 系統架構區塊第二主題改為 Hystrix  
**Date**: 2025-03-05

## 在地執行與驗證

1. **安裝依賴**（專案根目錄）  
   ```bash
   pnpm install
   ```

2. **啟動開發伺服器**  
   ```bash
   pnpm dev
   ```  
   瀏覽器開啟對應位址（如 `http://localhost:5173`）。

3. **驗證系統架構區塊入口（沿用 US1）**  
   - 首頁 → 應看到「網站主軸」下第四個區塊「系統架構」。  
   - 點選「系統架構」→ 應進入 `/system-architecture`，頁面顯示「系統架構」標題與簡介。  
   - 導覽深度：首頁 → 點一次即進入區塊（一步，符合「合理步驟內到達」）。

4. **驗證首頁文案已從壟斷改為 Hystrix（本 feature 新增）**  
   - 在首頁「系統架構」主軸卡片上，描述文字應改為提及「Hystrix（熔斷）」或容錯概念，不再出現「壟斷」。  
   - 文案應與系統架構頁實際內容一致：說明限流與 Hystrix／熔斷等系統架構概念。

5. **驗證限流／Hystrix 小節（US2 + 本 feature 新增）**  
   - 在系統架構頁內應可看到「限流」「Hystrix」兩個小節標題與內容。  
   - 於 30 秒內能辨識兩小節位置（對應 SC-002／SC-003 類型指標）。  
   - 直接造訪 `http://localhost:5173/system-architecture#rate-limiting` → 應捲動至限流小節；  
     造訪 `http://localhost:5173/system-architecture#hystrix` → 應捲動至 Hystrix 小節（對應錨點要求）。
   - Hystrix 小節內容應說明：其作為延遲與容錯／熔斷模式的角色、避免連鎖失敗的目的，以及至少一種典型情境（例如保護下游服務、降級策略等）。

6. **建置**  
   ```bash
   pnpm build
   ```  
   確認無錯誤；必要時 `pnpm run preview` 預覽靜態產物。

## 相關檔案

- 規格：[spec.md](../spec.md)
- 計畫與資料模型：[plan.md](../plan.md)、[data-model.md](../data-model.md)
- 研究與設計決策：[research.md](../research.md)
- 路由與錨點約定：[contracts/README.md](contracts/README.md)

