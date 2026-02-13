# Implementation Plan: 設計模式切割與全數 Java 範例

**Branch**: `003-pattern-java-examples` | **Date**: 2025-02-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/003-pattern-java-examples/spec.md`

## Summary

在既有設計模式專頁（002 之 PatternPage + patternContent、SingletonPage）上補齊：**每個模式專頁均具明確三區塊**（解釋、使用介紹、範例），且**每個模式皆含至少一段 Java 或 Spring Boot 程式碼範例**。不新增路由或頁面類型，僅擴充 `patternContent.js` 之 `example` 欄位，使目前尚無範例的 20 個模式補上範例；Singleton 沿用既有專頁。沿用 **Vite + React** 與既有 PatternPage 範例區塊樣式，符合憲章「MVP 優先、避免過度設計」。

## Technical Context

**Language/Version**: JavaScript (ES module)，React 19、Vite 7、React Router 7  
**Primary Dependencies**: react, react-dom, react-router-dom, vite；無後端  
**Storage**: N/A（靜態內容，範例存於 patternContent.js）  
**Testing**: 手動驗證每個設計模式專頁具三區塊且範例區含 Java 程式碼  
**Target Platform**: 現代瀏覽器，GitHub Pages 靜態部署  
**Project Type**: 單一前端 SPA，僅擴充 `src/pages/designpattern/patternContent.js`  
**Performance Goals**: 與現有專頁一致，無額外載入  
**Constraints**: 不引入後端或新依賴；範例為靜態展示；正體中文說明  
**Scale/Scope**: 需補範例的模式數 = 20（GoF 23 扣除 Singleton、Factory Method、Observer）

**內容脈絡**：範例以 **Java** 或 **Spring Boot** 為例，與 001／002 一致；程式碼以說明模式意圖為主，不要求可編譯或執行。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 檢查結果 |
|------|----------|
| **I. 高品質** | 範例程式碼與說明需可讀、與既有 Factory Method／Observer 範例風格一致。 |
| **II. 可測試性** | US1／US2／US3 可手動逐頁驗證三區塊與範例存在、風格一致。 |
| **III. MVP 優先** | 可分批補範例（先建立型／結構型／行為型各數個），再全數補齊。 |
| **IV. 避免過度設計** | 不新增元件或路由；僅擴充既有 patternContent 之 example 結構。 |
| **V. 正體中文** | 範例區 intro／note 與區塊標題為正體中文。 |
| **額外約束：技術棧** | 依既有 Vite、React、pnpm；未新增技術。 |
| **額外約束：部署** | 維持 GitHub Pages 靜態部署。 |

**Gate 結果**：通過，無需填寫 Complexity Tracking。

## Project Structure

### Documentation (this feature)

```text
specs/003-pattern-java-examples/
├── plan.md              # 本檔
├── research.md          # Phase 0
├── data-model.md        # Phase 1（範例資料結構與涵蓋清單）
├── quickstart.md        # Phase 1（驗證步驟）
├── contracts/           # Phase 1（本 feature 無 API，README 說明）
└── tasks.md             # Phase 2（/speckit.tasks 產出）
```

### Source Code (repository root)

本 feature 不新增檔案；僅修改既有 `patternContent.js`，為尚未具 `example` 之模式補上 `example: { intro?, blocks: [{ code, note? }] }`。

```text
src/pages/designpattern/
├── patternList.js       # 無變更
├── patternContent.js    # 擴充：為 20 個模式新增 example 欄位（Java 範例）
├── PatternPage.jsx      # 無變更（已支援 content.example 渲染範例區）
├── DesignPatternLab.jsx # 無變更
└── SingletonPage.jsx    # 無變更（已含範例）
```

**Structure Decision**：  
- **區塊切割**：PatternPage 已依「何謂…」「何時使用與概念性使用方式」「範例：Java 與 Spring Boot」三區塊渲染；本 feature 藉由為每個模式補上 `example`，確保每頁都會顯示範例區，達成 FR-001／FR-002。  
- **範例風格**：沿用既有 `example.intro`、`example.blocks[].code`、`example.blocks[].note` 與 PatternPage 之 `<pre>` 樣式（與 Singleton 一致）。  
- **涵蓋範圍**：patternList 中除 `singleton`（自有 SingletonPage）外，其餘 22 個模式由 PatternPage + patternContent 負責；其中 `factory-method`、`observer` 已有 example，本 feature 為其餘 20 個補齊。

## Complexity Tracking

> 本 feature 無憲章違反或過度設計，本節留空。
