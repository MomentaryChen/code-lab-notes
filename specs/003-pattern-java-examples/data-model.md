# Data Model: 003-pattern-java-examples

**Feature**: 設計模式切割與全數 Java 範例  
**Date**: 2025-02-13

本 feature 無新增實體；僅擴充既有 `patternContent.js` 內各模式之 **example** 欄位，確保每個模式皆有 Java 範例。

## 既有資料結構（沿用）

每個模式之內容已具備：

- **nameZh**: string
- **explanation**: string[]
- **usage**: string[]
- **example** (可選): `{ intro?: string, blocks: { code: string, note?: string }[] }`

本 feature 完成後，**所有**由 PatternPage 顯示的模式（即 patternList 中除 singleton 外之 22 個）均具備 `example`，且 `example.blocks` 至少含一段 `code`。

## 需補範例之模式清單（20 個）

以下 slug 目前在 patternContent 中**尚無** `example`，本 feature 須為其補上：

| 類別 | Slug |
|------|------|
| 建立型 | abstract-factory, builder, prototype |
| 結構型 | adapter, bridge, composite, decorator, facade, flyweight, proxy |
| 行為型 | chain-of-responsibility, command, iterator, mediator, memento, state, strategy, template-method, visitor |

已具範例（無需本 feature 修改）：

- **singleton**：SingletonPage 內建範例
- **factory-method**, **observer**：patternContent 已含 example

## 驗證對應

- FR-002／FR-003：上表 20 個 slug 在 patternContent 中均有 `example`，且 `example.blocks` 至少一筆含 Java 或 Spring Boot 程式碼。
- FR-001：PatternPage 已依解釋、使用介紹、範例三區塊渲染；補齊 example 後每頁皆會顯示範例區。
