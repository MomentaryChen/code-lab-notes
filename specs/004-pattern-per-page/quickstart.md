# Quickstart: 004-pattern-per-page

**Feature**: 設計模式一頁一模式與亮色主題範例可讀性  
**Date**: 2025-02-13

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

3. **驗證設計模式一頁一模式**  
   - 首頁 → 點「設計模式」→ 進入 `/design-pattern`（hub）。  
   - 點選任一模式（如 Factory Method）→ 應進入該模式專屬 URL（如 `/design-pattern/factory-method`），頁面內容為該模式專屬，非動態查表。  
   - 從 hub 依序點選不同模式 → 每個模式應有獨立 URL 與專屬內容，共 23 個可個別造訪的專頁。  
   - 在網址列輸入 `/design-pattern/unknown-slug` → 應導向 `/design-pattern` 或友善 fallback，不出現空白或錯誤頁。

4. **驗證亮色主題下程式碼範例可讀**  
   - 進入任一本 feature 設計模式專頁（含 Singleton）。  
   - 點選「亮色」切換至亮色主題。  
   - 頁面上所有程式碼範例區塊（Java 等）應與背景有足夠對比，文字清楚可讀。  
   - 再切回「暗色」→ 範例區塊應維持可讀。  
   - 以亮色主題重新整理或直接造訪專頁 → 程式碼區塊自載入起即為亮色可讀樣式。

5. **建置**  
   ```bash
   pnpm build
   ```
   確認無錯誤；必要時 `pnpm run preview` 預覽靜態產物。

## 新增一個設計模式專頁的步驟（實作時參考）

本 feature 完成後，每個模式已有獨立 Page；若未來新增新模式：

1. **更新模式清單**  
   在 `patternList.js` 新增一筆：slug、nameZh、category、description。

2. **新增 Page 元件**  
   新增 `XxxPage.jsx`（或依專案命名慣例），內容結構對齊既有專頁（標題、解釋、使用方式、程式碼範例）；內容寫在元件內或該模式專屬 content 模組。

3. **註冊路由**  
   在 `main.jsx` 的 route 對照中新增一筆：`/design-pattern/<slug>` → `<XxxPage />`。

4. **程式碼區塊**  
   專頁內 `<pre>` 使用 `var(--code-bg)`、`var(--code-text)`，確保雙主題可讀。

5. **驗證**  
   從 hub 點選該模式進入專頁，切換亮色／暗色確認範例可讀。

## 相關檔案

- 規格：[spec.md](../spec.md)
- 計畫與資料模型：[plan.md](../plan.md)、[data-model.md](../data-model.md)
- 路由與樣式約定：[contracts/README.md](contracts/README.md)
