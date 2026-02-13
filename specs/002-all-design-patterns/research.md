# Research: 002-all-design-patterns

**Feature**: 加入所有設計模式  
**Date**: 2025-02-13

## 1. 設計模式範圍與分類

**Decision**: 採用 **GoF 23** 為設計模式清單，依 **建立型（Creational）、結構型（Structural）、行為型（Behavioral）** 三類分組；分類名稱於介面使用正體中文「建立型」「結構型」「行為型」，必要時可附英文括註。

**Rationale**:
- Spec 與 Assumptions 明示「業界常見之完整集合（例如 GoF 23）」；GoF 23 為最普遍之定義，利於讀者對照外部資料。
- 三類與既有 `DesignPatternLab.jsx` 副標題一致，無需新增分類維度。

**清單摘要**（詳見 data-model.md）:
- **建立型**：Abstract Factory、Builder、Factory Method、Prototype、Singleton
- **結構型**：Adapter、Bridge、Composite、Decorator、Facade、Flyweight、Proxy
- **行為型**：Chain of Responsibility、Command、Iterator、Mediator、Memento、Observer、State、Strategy、Template Method、Visitor

**Alternatives considered**:
- 僅做子集：規格為「加入所有設計模式」，以完整 23 為目標；若實作分階段，列表僅顯示已有專頁的模式即可。
- 四類或更多：GoF 僅三類，不擴充以免與常見教材不一致。

---

## 2. 路由與 slug 命名

**Decision**: 每個模式對應一個 **slug**（URL 路徑片段），規則為：小寫、英文、多字以連字號連接（例如 `factory-method`、`abstract-factory`）。路由形式為 `/design-pattern/<slug>`；既有的 `/design-pattern`（hub）與 `/design-pattern/singleton` 維持不變。

**Rationale**:
- 與現有 Singleton 路由一致；書籤與分享連結穩定。
- 英文 slug 利於與國際術語對照，且不與中文 URL 編碼混用。

**未知 slug 處理**：請求 `/design-pattern/unknown-slug` 時，導向 `/design-pattern` 或顯示「找不到該模式」之靜態說明頁並提供返回 hub 連結，符合 spec edge case。

**Alternatives considered**:
- 中文 slug：不利於複製貼上與部分環境相容性，不採用。
- 僅用 id 數字：可讀性較差，不採用。

---

## 3. Hub 列表資料來源與實作

**Decision**: 模式清單（含 slug、中文名、類別、簡短描述）集中為 **單一資料來源**（例如常數陣列或獨立 JS/JSON 模組），供 `DesignPatternLab.jsx` 依類別分組渲染；新增模式時只需改動該清單與對應專頁，避免在 hub 內重複硬編碼。

**Rationale**:
- FR-001、FR-002 要求「可瀏覽所有設計模式」且「依三類分類呈現」；單一來源可保證列表與路由一致、減少遺漏或錯字。
- 與憲章「可維護、可讀」一致；後續擴充或調整順序僅改一處。

**Alternatives considered**:
- 每個模式在 hub 手寫一筆 JSX：易不一致且難維護，不採用。
- 從後端或 CMS 讀取：規格為靜態部署，不引入後端，不採用。

---

## 4. 專頁實作策略（逐頁元件 vs 共用版型）

**Decision**: **兩階段**——（1）先以**逐頁元件**實作數個模式（例如 Factory Method、Adapter、Observer），與 Singleton 版型一致（解釋 + 使用介紹 + 可選 Java/Spring Boot 範例），驗證導覽與 3 次點擊內抵達；（2）若重複結構過多，再引入**共用版型**（例如 `PatternPage.jsx` 依 slug 載入內容設定），其餘模式填內容即可。Singleton 維持既有 `SingletonPage.jsx` 不重寫。

**Rationale**:
- MVP 優先：先交付可測的列表與數個完整專頁，再決定是否抽象。
- 避免過度設計：不在一開始就做通用內容引擎；若 23 頁結構高度一致，再抽共用版型可減少重複。

**Alternatives considered**:
- 一開始就做 PatternPage + 內容檔：可行但增加初次實作複雜度；延後至有足夠樣本再評估。
- 全部手寫 23 個 Page 元件：重複多但單純；若僅 23 頁且無動態內容，可接受，再依 tasks 拆解。

---

## 5. 內容深度與範例

**Decision**: 每個模式專頁 MUST 含 **解釋**（意涵、適用情境、與他模式區別）與 **使用介紹**（何時使用、概念性使用方式、注意事項或陷阱）；**程式範例**為可選，若提供則以 **Java / Spring Boot** 為例，與 001 及專案 Spring Boot 主軸一致。

**Rationale**:
- FR-004、FR-005 明定解釋與使用介紹為必要；SC-002 要求讀者能理解何謂該模式與何時／如何概念性使用。
- 範例語言與 001 一致，不擴大技術棧。

**Alternatives considered**:
- 多語言範例：MVP 不納入，避免範圍膨脹。
- 無範例：允許；有範例時統一 Java/Spring Boot。
