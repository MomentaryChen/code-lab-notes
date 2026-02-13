# Research: 001-design-pattern-singleton

**Feature**: 設計模式主軸與 Singleton 頁面  
**Date**: 2025-02-13

## 1. 技術棧與「Java/Spring Boot 作為框架」之解讀

**Decision**: 網站實作維持既有 **Vite + React**；「使用 Java、Spring Boot 作為框架」解讀為：**頁面內容與程式範例**以 Java 與 Spring Boot 為例，不新增 Java/Spring Boot 後端。

**Rationale**:
- 規格為靜態說明頁、GitHub Pages 部署；憲章要求依既有專案、避免過度設計。
- 專案已為 React SPA，引入 Spring Boot 後端會違反 YAGNI 且偏離規格範圍。
- 使用者仍可於 Singleton（及未來設計模式）頁面內以 Java/Spring Boot 程式碼範例與術語說明，與本專案 Spring Boot 筆記主軸一致。

**Alternatives considered**:
- 以 Spring Boot 實作後端 API：規格未要求動態資料或 API，且部署目標為靜態 Pages，故不採用。
- 僅用 Java 語法、不用 Spring：採用 Spring Boot 範例可涵蓋單例在 Spring 容器中的常見用法，利於讀者延伸學習，故採用。

---

## 2. 路由命名與舊連結

**Decision**: 新增路由 `/design-pattern`（hub）、`/design-pattern/singleton`（Singleton 頁）；保留 `/oop` 並以重新導向至 `/design-pattern`。

**Rationale**:
- 規格要求「設計模式」主軸入口明確；與演算法區塊 `/algorithm/lab` 對齊，設計模式 hub 用 `/design-pattern`。
- Edge case：舊書籤或連結指向 `/oop` 時，重新導向可避免 404，符合 spec 邊界條件。

**Alternatives considered**:
- 將 `/oop` 改為設計模式 hub 內容（同一 path）：會使「Java OOP」與「設計模式」語意混用；採用新 path 較清晰。
- 不保留 `/oop`：會使舊連結失效；採用導向以兼顧相容性。

---

## 3. 設計模式區塊結構對齊演算法區塊

**Decision**: 設計模式區塊比照演算法區塊：hub 頁列出子主題卡片／連結，子頁（如 Singleton）具返回 hub 與首頁之導覽。

**Rationale**:
- 既有 `AlgorithmLab.jsx` 已提供可複用之模式（標題、副標、主題卡片、主題切換、返回首頁）。
- 一致結構利於維護與使用者預期；憲章要求與現有風格一致。

**Alternatives considered**:
- 設計模式僅單頁、無 hub：規格 FR-002 要求「進入後可見該區塊之導覽或子主題列表」，故需 hub。
- 使用不同版型：為維持高品質與一致性，採用與演算法區塊相同之版型概念。

---

## 4. Singleton 頁面內容範圍

**Decision**: Singleton 專頁包含（1）解釋：單例意涵、適用情境、與其他模式的區別；（2）使用介紹：何時使用、概念性使用方式、注意事項或常見陷阱；程式範例以 **Java** 與 **Spring Boot**（如 `@Component` 單例 Bean）為例。

**Rationale**:
- 符合 FR-004、FR-005；SC-003 要求讀者能理解何謂 Singleton 與何時／如何概念性使用。
- 以 Java/Spring Boot 為例與使用者指定之「框架」脈絡一致，且與專案 Spring Boot 主軸銜接。

**Alternatives considered**:
- 僅文字無程式碼：加入簡短 Java/Spring Boot 範例可提升可讀性與說服力。
- 多語言範例：MVP 僅正體中文＋Java/Spring Boot，避免過度設計。
