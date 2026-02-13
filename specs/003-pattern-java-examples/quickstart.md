# Quickstart: 003-pattern-java-examples

**Feature**: 設計模式切割與全數 Java 範例  
**Date**: 2025-02-13

## 在地執行與驗證

1. **安裝與啟動**（專案根目錄）
   ```bash
   pnpm install
   pnpm dev
   ```

2. **驗證三區塊與範例**
   - 開啟設計模式 hub（`/design-pattern`），依序點入數個模式專頁（建議涵蓋建立型、結構型、行為型各至少一個）。
   - 每個專頁應可辨識：**何謂…**、**何時使用與概念性使用方式**、**範例：Java 與 Spring Boot** 三區塊。
   - 範例區應含至少一段 Java 或 Spring Boot 程式碼，且與該模式意圖一致。

3. **驗證全數涵蓋**
   - 逐一點入 data-model.md 所列 20 個需補範例之模式，確認每頁皆有範例區且程式碼可讀。
   - 確認 Singleton 專頁（`/design-pattern/singleton`）仍具既有範例。

4. **建置**
   ```bash
   pnpm build
   ```

## 相關檔案

- 規格：`specs/003-pattern-java-examples/spec.md`
- 計畫：`specs/003-pattern-java-examples/plan.md`
- 需補範例清單：`specs/003-pattern-java-examples/data-model.md`
- 內容與範例：`src/pages/designpattern/patternContent.js`
- 專頁渲染：`src/pages/designpattern/PatternPage.jsx`
