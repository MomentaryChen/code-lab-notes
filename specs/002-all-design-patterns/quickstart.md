# Quickstart: 002-all-design-patterns

**Feature**: 加入所有設計模式  
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

3. **驗證設計模式區塊**  
   - 首頁 → 點「設計模式」→ 應進入 `/design-pattern`（hub）。  
   - Hub 應依「建立型」「結構型」「行為型」分組列出模式，點任一模式進入 `/design-pattern/<slug>`。  
   - 從 hub 起算，應在 **3 次點擊內** 進入任一所列模式專頁。  
   - 各專頁應有「回設計模式」「回首頁」導覽。

4. **建置**  
   ```bash
   pnpm build
   ```
   確認無錯誤；必要時 `pnpm run preview` 預覽靜態產物。

## 新增一個設計模式專頁的步驟（實作時參考）

1. **更新模式清單**  
   在集中定義模式清單的模組中新增一筆：`slug`、`nameZh`、`category`、`description`。

2. **新增路由**  
   在 `main.jsx` 中為 `/design-pattern/<slug>` 註冊對應元件；若採用共用 `PatternPage`，則一筆參數化路由即可；若為逐頁元件，則新增一筆 Route 指向新 Page。

3. **新增或擴充專頁內容**  
   - 若為逐頁：新增 `XxxPage.jsx`，結構對齊 `SingletonPage.jsx`（解釋 + 使用介紹 + 可選 Java/Spring Boot 範例）。  
   - 若為共用版型：在內容設定（依 slug 對應）中新增該模式的解釋、使用介紹與可選範例。

4. **確認 hub 列表**  
   清單來源若已含該模式，hub 會自動顯示；否則檢查 `DesignPatternLab.jsx` 是否依同一清單渲染。

5. **驗證**  
   從首頁 → 設計模式 → 點選該模式，確認專頁內容與導覽正確；再確認未知 slug 會導向 hub 或友善錯誤頁。

## 相關檔案

- 規格：`specs/002-all-design-patterns/spec.md`
- 計畫：`specs/002-all-design-patterns/plan.md`
- 資料結構與 slug 一覽：`specs/002-all-design-patterns/data-model.md`
- Hub 與既有 Singleton：`src/pages/designpattern/DesignPatternLab.jsx`、`SingletonPage.jsx`
- 路由：`src/main.jsx`
