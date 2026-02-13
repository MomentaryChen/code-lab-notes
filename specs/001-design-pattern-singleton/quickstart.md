# Quickstart: 001-design-pattern-singleton

**Feature**: 設計模式主軸與 Singleton 頁面  
**Branch**: `001-design-pattern-singleton`

## 前置需求

- Node.js（建議 LTS）
- pnpm（專案規定）

```powershell
pnpm install
```

## 本地開發

```powershell
pnpm dev
```

瀏覽器開啟 Vite 提供的本機網址（如 `http://localhost:5173/`）。  
**注意**：若專案設有 `base`（如 GitHub Pages 子路徑），本機路徑可能為 `http://localhost:5173/code-lab-notes/`，依 `vite.config.mts` 與 `main.jsx` 的 `basename` 為準。

## 本 Feature 完成後之驗證

1. **首頁**：主軸區塊顯示「設計模式」（非 Java OOP），點擊進入設計模式區塊。
2. **設計模式 hub**：URL 為 `/design-pattern`（或 `/{base}/design-pattern`），頁面列出至少「Singleton」子主題，點擊進入 Singleton 頁。
3. **Singleton 頁**：URL 為 `/design-pattern/singleton`，內容含解釋與使用介紹，可返回設計模式 hub 或首頁。
4. **舊連結**：造訪 `/oop` 應重新導向至 `/design-pattern`（或等同 path）。

## 建置與部署

```powershell
pnpm build
pnpm run deploy
```

部署後於 GitHub Pages 網址依上述步驟再驗證一次。

## 實作順序參考

依 `tasks.md`（由 `/speckit.tasks` 產出）：先完成設計模式主軸與 hub（US1），再完成 Singleton 頁內容與路由（US2）；最後處理 `/oop` 導向與首頁主軸文案。
