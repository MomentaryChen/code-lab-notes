# Quickstart: 005-system-architecture-section

**Feature**: 系統架構區塊（限流與壟斷介紹）  
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

3. **驗證系統架構區塊入口（US1）**  
   - 首頁 → 應看到「網站主軸」下第四個區塊「系統架構」。  
   - 點選「系統架構」→ 應進入 `/system-architecture`，頁面顯示「系統架構」標題與簡介。  
   - 導覽深度：首頁 → 點一次即進入區塊（一步，符合 SC-001 三次以內）。

4. **驗證限流／壟斷小節（US2、US3）**  
   - 在系統架構頁內應可看到「限流」「壟斷」兩個小節標題與內容。  
   - 於 30 秒內能辨識兩小節位置（SC-002）。  
   - 直接造訪 `http://localhost:5173/system-architecture#rate-limiting` → 應捲動至限流小節；`#monopoly` → 應捲動至壟斷小節（SC-004）。

5. **建置**  
   ```bash
   pnpm build
   ```
   確認無錯誤；必要時 `pnpm run preview` 預覽靜態產物。

## 相關檔案

- 規格：[spec.md](../spec.md)
- 計畫與資料模型：[plan.md](../plan.md)、[data-model.md](../data-model.md)
- 路由與錨點約定：[contracts/README.md](README.md)
