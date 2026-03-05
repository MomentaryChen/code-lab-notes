# Data Model: 006-monopoly-to-hystrix

**Feature**: 系統架構區塊第二主題改為 Hystrix  
**Date**: 2025-03-05

本 feature 為前端內容調整，無後端儲存。此處描述**系統架構區塊與小節結構（Hystrix 版）**、**路由與錨點**以及**頁面結構約定**，供實作與驗收對齊。

## 系統架構區塊（邏輯實體）

- **標題**：系統架構（站內一致顯示名稱）
- **入口**：首頁「網站主軸」第四個 pillar，連結至 `/system-architecture`
- **內容載體**：單一頁面 `SystemArchitecturePage`，含區塊級簡介與兩個主題小節（限流、Hystrix）

## 主題小節（Hystrix 版）

| 小節 | 錨點 id（英文） | 標題（顯示） | 內容要點 |
|------|-----------------|--------------|----------|
| 限流 | `rate-limiting` | 限流 | 概念、目的（如保護系統、公平分配資源）、常見情境；不含實作細節 |
| Hystrix | `hystrix` | Hystrix | 作為延遲與容錯／熔斷模式代表的 Hystrix；說明熔斷（circuit breaker）、隔離、降級與監控等概念與典型使用情境；以概念與目的為主，不含特定程式庫實作細節 |

兩小節須同頁、同區塊內，讀者可依序或透過錨點跳轉閱讀。

## 路由與錨點

| 路由 | 對應元件 | 說明 |
|------|----------|------|
| `/system-architecture` | SystemArchitecturePage | 系統架構區塊專頁，含簡介、限流、Hystrix |

無子路由；小節以 fragment 存取，例如：

- `/system-architecture#rate-limiting` → 直接捲動至限流小節  
- `/system-architecture#hystrix` → 直接捲動至 Hystrix 小節

## 頁面結構約定（Hystrix 版）

系統架構頁須包含：

1. **Header**：回首頁連結、主標「Code Lab Notes · 系統架構」、副標／簡介（一句話說明本區塊，文字更新為提及 Hystrix／熔斷概念）、主題切換（暗色／亮色）
2. **Main**  
   - 區塊簡介段落（可與副標合一或另段），描述本頁介紹限流與 Hystrix（熔斷／容錯）等系統架構概念  
   - **Section 1**：`<section id="rate-limiting">`，`<h2>` 為「限流」，內文為限流介紹  
   - **Section 2**：`<section id="hystrix">`，`<h2>` 為「Hystrix」，內文為 Hystrix 與熔斷／容錯概念與典型情境  
3. **導覽**：回首頁連結可僅在 header，或 main 底再加一處，依既有單頁慣例

樣式與排版仍與既有單頁內容頁（如 SpringBootPage、DesignPatternLab 標題區）一致，使用既有 CSS 類別與變數。

## 驗證對應規格（006 spec）

- FR-001：系統架構區塊仍可由首頁主軸卡片「系統架構」進入 `/system-architecture`
- FR-002：頁面含「限流」小節，標題與內容足以理解概念與目的
- FR-003：頁面第二小節改為「Hystrix」，內容足以理解其在系統架構中的目的與典型情境
- FR-004：限流與 Hystrix 同頁、同區塊，可依序或錨點跳轉
- FR-005：結構清晰、段落長度適中，讀者可在合理時間內完成兩小節閱讀
- SC-001／SC-002／SC-003：頁面載入後能在 30 秒內辨識「限流」「Hystrix」兩小節位置，5 分鐘內可讀完並理解主要概念
- SC-004：小節具 `id="rate-limiting"`、`id="hystrix"`，可單獨連結

