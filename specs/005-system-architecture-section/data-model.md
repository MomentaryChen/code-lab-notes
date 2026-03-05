# Data Model: 005-system-architecture-section

**Feature**: 系統架構區塊（限流與壟斷介紹）  
**Date**: 2025-03-05

本 feature 為前端內容擴充，無後端儲存。此處描述**系統架構區塊與小節結構**、**路由**與**頁面結構約定**，供實作對齊。

## 系統架構區塊（邏輯實體）

- **標題**：系統架構（站內一致顯示名稱）
- **入口**：首頁「網站主軸」第四個 pillar，連結至 `/system-architecture`
- **內容載體**：單一頁面 `SystemArchitecturePage`，含區塊級簡介與兩個主題小節

## 主題小節

| 小節 | 錨點 id（英文） | 標題（顯示） | 內容要點 |
|------|-----------------|--------------|----------|
| 限流 | `rate-limiting` | 限流 | 概念、目的（如保護系統、公平分配資源）、常見情境；不含實作細節 |
| 壟斷 | `monopoly` | 壟斷 | 在系統／架構脈絡下的意涵（單點壟斷、資源壟斷、廠商壟斷等）與影響 |

兩小節須同頁、同區塊內，讀者可依序或透過錨點跳轉閱讀。

## 路由

| 路由 | 對應元件 | 說明 |
|------|----------|------|
| `/system-architecture` | SystemArchitecturePage | 系統架構區塊專頁，含簡介、限流、壟斷 |

無子路由；小節以 fragment 存取，例如 `/system-architecture#rate-limiting`、`/system-architecture#monopoly`。

## 頁面結構約定

系統架構頁須包含：

1. **Header**：回首頁連結、主標「Code Lab Notes · 系統架構」、副標／簡介（一句話說明本區塊）、主題切換（暗色／亮色）
2. **Main**  
   - 區塊簡介段落（可與副標合一或另段）  
   - **Section 1**：`<section id="rate-limiting">`，`<h2>` 為「限流」，內文為限流介紹  
   - **Section 2**：`<section id="monopoly">`，`<h2>` 為「壟斷」，內文為壟斷介紹  
3. **導覽**：回首頁連結可僅在 header，或 main 底再加一處，依既有單頁慣例

樣式與排版與既有單頁內容頁（如 SpringBootPage、DesignPatternLab 標題區）一致，使用既有 CSS 類別與變數。

## 驗證對應規格

- FR-001：首頁有「系統架構」入口，點擊進入 `/system-architecture`
- FR-002：頁面含「限流」小節，標題與內容足以理解概念與目的
- FR-003：頁面含「壟斷」小節，標題與內容足以理解系統／架構脈絡意涵
- FR-004：限流與壟斷同頁、同區塊，可依序或錨點跳轉
- FR-005：結構清晰、段落長度適中
- SC-002／SC-004：小節具 `id="rate-limiting"`、`id="monopoly"`，可單獨連結
