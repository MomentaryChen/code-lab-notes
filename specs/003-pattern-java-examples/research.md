# Research: 003-pattern-java-examples

**Feature**: 設計模式切割與全數 Java 範例  
**Date**: 2025-02-13

## 1. 範例涵蓋範圍與既有實作

**Decision**: 本 feature 僅在 `patternContent.js` 內為「尚未具 `example` 之模式」補上 `example` 欄位；不修改 SingletonPage、不新增路由或元件。Singleton 已於 001 具範例；002 實作中已為 `factory-method`、`observer` 加入 example，其餘 20 個模式由本 feature 補齊。

**Rationale**:
- Spec 要求每個模式專頁皆有 Java 範例；PatternPage 已支援依 `content.example` 顯示「範例：Java 與 Spring Boot」區塊，缺的只是內容。
- 補齊 20 個模式的 example 即可達成 100% 涵蓋（含 Singleton 共 23 個皆有範例）。

**Alternatives considered**:
- 為 Singleton 也改為使用 patternContent：會變更既有 Singleton 專頁結構，且 001 已交付完整內容，故不採用。
- 新增獨立「範例檔」再由 patternContent 引用：增加檔案與建置複雜度，YAGNI，故不採用。

---

## 2. 範例格式與風格

**Decision**: 沿用既有 `patternContent` 之 example 結構：`example: { intro?: string, blocks: { code: string, note?: string }[] }`。每個模式至少一段 `code`（Java 或 Spring Boot 程式碼），可選 `intro`、`note`；程式碼具適當縮排與註解，正體中文說明。

**Rationale**:
- FR-004 要求與既有設計模式專頁風格一致；PatternPage 已依此結構渲染，無需改動元件。
- 與既有 factory-method、observer 範例格式一致，利於讀者體驗一致。

**Alternatives considered**:
- 多語言範例切換：規格未要求，且會增加實作與維護量，不採用。
- 範例僅 Spring Boot：部分模式（如 Memento、State）以純 Java 較直觀，允許 Java 或 Spring Boot 混用。

---

## 3. 分批交付策略

**Decision**: 可依「建立型 → 結構型 → 行為型」或依 tasks 拆成多個 PR／批次補範例；每批完成後可手動驗證該批模式專頁具三區塊與範例。最終交付時 20 個模式全部補齊。

**Rationale**:
- 憲章 MVP 優先；分批可先交付部分價值並及早驗證風格與可讀性。
- 單一 PR 補 20 段範例仍可接受，依團隊習慣選擇分批或一次完成。

**Alternatives considered**:
- 僅補數個「代表」模式：規格要求 100% 具範例（SC-002），故須全數補齊。
