# Research: 006-monopoly-to-hystrix

**Feature**: 系統架構區塊第二主題改為 Hystrix  
**Date**: 2025-03-05

## 1. 「壟斷」改為「Hystrix」的小節定位與範圍

**Decision**: 延續 005 feature 的結構，維持 `/system-architecture` 單一路由與單頁兩小節設計，僅將第二小節從「壟斷」改為「Hystrix」，並聚焦在 Hystrix 代表的容錯與熔斷模式概念（延遲、隔離、降級、熔斷等），不延伸至壟斷概念本身。頁面頂部與首頁主軸卡片的摘要文案一併從「限流、壟斷等系統架構概念」調整為「限流、Hystrix（熔斷）等容錯相關概念」。

**Rationale**:
- 規格明確要求第二主題由壟斷改為 Hystrix，主要目的是讓讀者在系統架構脈絡下理解 Hystrix 與容錯／熔斷，而非壟斷議題。
- 系統架構頁目前已透過兩個 section 呈現限流與壟斷；將壟斷替換為 Hystrix 可在不變更路由與整體結構的前提下達成目標，符合 MVP 與避免過度設計。
- 首頁主軸卡片是進入系統架構區塊的主要入口，若文案仍提及壟斷會造成預期落差，因此需同步更新。

**Alternatives considered**:
- 保留壟斷小節，新增第三小節 Hystrix：與規格「第二主題改為 Hystrix」不符，且會擴大本 feature scope，不採用。
- 將 Hystrix 放入限流小節內作為延伸說明：會讓 Hystrix 被弱化為限流子議題，與規格想要凸顯 Hystrix 主題的意圖不符。

---

## 2. Hystrix 介紹內容的深度與技術細節

**Decision**: Hystrix 小節以**概念與用途為主**，說明 Hystrix 作為一種延遲與容錯的架構模式（circuit breaker、fallback、隔離、指標監控等），透過高層次範例描述典型使用情境（例如保護下游服務、避免連鎖失敗），**不進入具體程式碼或框架 API 細節**，也不綁定特定實作（Netflix Hystrix 本身、Resilience4j、Spring Cloud 等）。

**Rationale**:
- 規格 Assumptions 已註明「以概念、目的與典型情境為主，不綁定特定程式庫版本或實作細節」，以維持文件壽命與技術中立。
- 本站的目標讀者為學習系統架構與後端設計的工程師；在單一小節內塞入過多實作細節會拉高理解門檻，且在 Hystrix 本身已停止維護的背景下，應強調模式與思維而非工具。

**Alternatives considered**:
- 加入具體的 Spring Cloud Hystrix 設定與程式碼片段：會讓內容對特定技術棧過度耦合，且當前 Spring Boot 版本多半改用 Resilience4j 等替代方案，容易過時。
- 僅描述熔斷概念，不提 Hystrix 名稱：與使用者輸入「壟斷應該更新成 Hystrix」不符，且會失去與既有生態系名詞的連結。

---

## 3. 錨點與識別命名策略

**Decision**: 保持系統架構頁兩個 section 的 id 使用英文，第一小節仍為 `rate-limiting`，第二小節由原本的 `monopoly` 調整為 `hystrix`。未來從首頁或其他頁面連向 Hystrix 小節時，使用 `/system-architecture#hystrix` 作為標準錨點。

**Rationale**:
- 005 feature 研究中已決策採用英文錨點 id，以提升分享與瀏覽器相容性；本次延續該模式即可。
- 以 `hystrix` 作為錨點 id 可直接對應小節標題與主題名詞，易於記憶與辨識。

**Alternatives considered**:
- 保留 `monopoly` 作為 id，只改變顯示標題為 Hystrix：會造成錨點名稱與內容主題不一致，降低可維護性與可讀性。
- 使用較泛化的 `circuit-breaker` 作為 id：雖然語義上正確，但與規格名稱「Hystrix」不完全一致，仍以 `hystrix` 為佳。

---

## 4. 首頁「系統架構」主軸卡片文案更新

**Decision**: 首頁 HomePage 中「系統架構」主軸卡片描述文字，從「限流、壟斷等系統架構概念介紹與常見情境說明」更新為「限流、Hystrix（熔斷）等系統架構與容錯概念介紹與常見情境說明」，確保入口文案與實際內容一致，並在短句內暗示 Hystrix 與熔斷／容錯的關聯。

**Rationale**:
- 規格 Edge Cases 要求首頁或導覽上的描述若提及壟斷，需同步改為涵蓋 Hystrix 或容錯／熔斷概念，以維持資訊一致性。
- 在首頁以括號簡短補充「Hystrix（熔斷）」可協助尚未熟悉 Hystrix 名稱的讀者快速建立聯想。

**Alternatives considered**:
- 僅刪除「壟斷」一詞，不改為 Hystrix：會讓首頁文案過於籠統，且無法讓讀者預期系統架構頁中將介紹 Hystrix。
- 將文案拉長，詳細列出所有概念：首頁卡片應保持精簡；詳細說明留在內頁。

---

## 5. 測試與驗收策略（對應新內容）

**Decision**: 本 feature 延續 005 feature 的驗收路徑，新增針對 Hystrix 小節與首頁文案的檢查步驟，並在 quickstart 中明列：
- 驗證 `/system-architecture` 頁面第二個 section 標題為「Hystrix」，內文聚焦於容錯／熔斷與典型情境。
- 驗證 `#hystrix` 錨點能正確捲動至 Hystrix 小節。
- 驗證首頁「系統架構」主軸卡片描述已改為包含 Hystrix／熔斷，而不再提及壟斷。

**Rationale**:
- 規格要求獨立可測情境，本次變更集中在第二小節與首頁文案，因此驗收項目亦應集中在這兩處。
- 延續既有 quickstart 範本可降低學習成本，並符合專案憲章的可測試性要求。

**Alternatives considered**:
- 引入自動化 end-to-end 測試工具僅為了本次文案更新：成本相較於收益過高，且與本 feature 的 MVP 範圍不符，留待全站測試策略統一規劃時再考慮。

