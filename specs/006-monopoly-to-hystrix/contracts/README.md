# Contracts: 006-monopoly-to-hystrix

本 feature 為前端內容調整，無 REST/API。此目錄記載**路由**與**頁面錨點（Hystrix 版）**約定，供實作與驗收對齊。

## 路由約定

- **系統架構頁**：`GET /system-architecture` → 渲染 `SystemArchitecturePage`。
- **錨點**：
  - `/system-architecture#rate-limiting` 指向限流小節。
  - `/system-architecture#hystrix` 指向 Hystrix 小節。

詳見 [data-model.md](../data-model.md) 之「路由與錨點」與「頁面結構約定」。

## 頁面結構約定（Hystrix 版）

- 頁面須含 **header**（回首頁、標題、簡介、主題切換）與 **main**（區塊簡介 + 兩個 section）。
- Section 須具備 **id** 以支援深層連結與 30 秒內辨識：
  - 限流小節：`id="rate-limiting"`，標題為「限流」。
  - Hystrix 小節：`id="hystrix"`，標題為「Hystrix」。

## 首頁入口約定

- 首頁「網站主軸」須包含第四個 pillar：「系統架構」，`<Link to="/system-architecture">`，描述文字需更新為涵蓋限流與 Hystrix（熔斷／容錯）等概念介紹，而不再提及壟斷。

