# Tasks: 系統架構區塊（限流與壟斷介紹）

**Input**: Design documents from `/specs/005-system-architecture-section/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: 規格未要求自動化測試；以手動依 quickstart.md 驗證。

**Organization**: 依 User Story 分階段。US1（入口與區塊）先做，US2+US3（限流／壟斷小節）於同一頁實作。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可並行（不同檔案、無依賴）
- **[Story]**: 所屬 user story（US1, US2, US3）

---

## Phase 1: 入口與路由（US1）

**Purpose**: 首頁新增系統架構 pillar，路由註冊 `/system-architecture`。

- [x] **T001** [US1] 在 `src/pages/HomePage.jsx` 的 `home-pillars` 內新增第四個 `<article>`：編號 4、標題「系統架構」、描述涵蓋限流與壟斷等概念介紹、`<Link to="/system-architecture">`。版型與既有 pillar 一致（home-pillar、home-pillar-link、home-pillar-inner 等）。
- [x] **T002** [US1] 在 `src/main.jsx` 新增 Route：`path="/system-architecture"`、`element={<SystemArchitecturePage />}`；並 import `SystemArchitecturePage` from `./pages/systemarchitecture/SystemArchitecturePage.jsx`。

**Checkpoint**: 首頁可見「系統架構」卡片，點擊進入 `/system-architecture`（頁面可仍為空白或佔位）。

---

## Phase 2: 系統架構頁與兩小節（US1、US2、US3）

**Purpose**: 建立 SystemArchitecturePage，含標題與簡介、限流小節（id=rate-limiting）、壟斷小節（id=monopoly），版型對齊 SpringBootPage。

- [x] **T003** [US1][US2][US3] 新增 `src/pages/systemarchitecture/SystemArchitecturePage.jsx`：header（回首頁、主標「Code Lab Notes · 系統架構」、副標／簡介、主題切換）、main 內區塊簡介段落、`<section id="rate-limiting"><h2>限流</h2>...</section>`、`<section id="monopoly"><h2>壟斷</h2>...</section>`。限流與壟斷內文為概念與目的之介紹（見 data-model.md、spec 與 research.md）。使用既有 page 類別與 useTheme，與 SpringBootPage 版型一致。

**Checkpoint**: 造訪 `/system-architecture` 可見標題、簡介與兩小節；`/system-architecture#rate-limiting`、`/system-architecture#monopoly` 可錨點跳轉。

---

## Phase 3: 驗證與 CHANGELOG

- [x] **T004** 手動驗證：首頁 → 系統架構 → 頁面顯示完整；兩小節可辨識、錨點可達。執行 `pnpm build` 確認無錯誤。
- [x] **T005** 更新 `CHANGELOG.md`：在 Unreleased 區塊新增本 feature 實作完成條目。
