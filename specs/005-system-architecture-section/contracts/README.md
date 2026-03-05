# Contracts: 005-system-architecture-section

本 feature 為前端內容擴充，無 REST/API。此目錄記載**路由**與**頁面錨點**約定，供實作與驗收對齊。

## 路由約定

- **系統架構頁**：`GET /system-architecture` → 渲染 `SystemArchitecturePage`。
- **錨點**：`/system-architecture#rate-limiting`、`/system-architecture#monopoly` 可單獨指向限流、壟斷小節。

詳見 [data-model.md](../data-model.md) 之「路由」與「頁面結構約定」。

## 頁面結構約定

- 頁面須含 **header**（回首頁、標題、簡介、主題切換）與 **main**（區塊簡介 + 兩個 section）。
- Section 須具備 **id** 以支援深層連結與 30 秒內辨識：
  - 限流小節：`id="rate-limiting"`，標題為「限流」。
  - 壟斷小節：`id="monopoly"`，標題為「壟斷」。

## 首頁入口約定

- 首頁「網站主軸」須包含第四個 pillar：「系統架構」，`<Link to="/system-architecture">`，描述涵蓋限流與壟斷等概念介紹。
