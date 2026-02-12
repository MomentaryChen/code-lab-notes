# Algorithm

本專案主要用來整理與實作各種常見演算法（如 A* 尋路等），並透過 HTML 頁面與圖像說明，幫助理解演算法的核心概念與實作細節。  
**本專案的入口為瀏覽器開啟的 HTML 頁面（例如 `index.html`），不需要 Java 或其他後端程式啟動。**

## 🌐 Demo 線上體驗

**👉 [點此前往線上 Demo](https://momentarychen.github.io/algorithm-lab/)**

直接在瀏覽器中體驗完整的演算法視覺化說明，無需下載或安裝任何程式。

## 功能與特色

- **演算法視覺化說明**：透過網頁與圖片展示演算法的運作過程。
- **A\* 演算法說明**：提供 `A*` 演算法的原理說明與示意範例（例如：`astar-algorithm-explanation.html` 與相關圖片）。
- **易於擴充**：可以輕鬆新增其他演算法的 HTML 說明頁面與圖片。
- **教學用途**：適合用於自學或教學示範。

## 環境需求

- 作業系統：Windows / macOS / Linux
- 必要工具：  
  - 任一現代瀏覽器（建議：Chrome、Edge、Firefox 等）

## 專案結構（示意）

```text
algorithm/
├─ README.md                         # 專案說明
├─ index.html                        # 使用者入口首頁
├─ astar-algorithm-explanation.html  # A* 演算法說明頁
├─ images/
│  └─ astar-display.png              # A* 演算法視覺化示意圖
└─ docs/                             # 額外說明文件（選用）
```

> 若實際目錄結構不同，請依實際情況修改上方示意。

## 使用說明

1. **下載或複製專案**
   - 若此專案在 Git 儲存庫：
     ```bash
     git clone <your-repo-url>
     cd algorithm
     ```
   - 若為本機資料夾，直接以檔案總管或終端機進入 `algorithm` 目錄即可。

2. **開啟入口頁面**
   - 使用瀏覽器開啟 `index.html` 作為入口，從首頁導覽至各個演算法說明頁。
   - 也可以直接在瀏覽器中開啟 `astar-algorithm-explanation.html`，閱讀 A\* 演算法的圖文說明。

3. **不需要後端啟動**
   - 本專案僅使用純前端 HTML 與圖片，不包含 Java、Python 等後端程式碼。
   - 你只需要使用瀏覽器開啟對應的 `.html` 檔案即可體驗內容。

## 開發與擴充

- **新增演算法說明頁**
  - 在專案根目錄或 `docs/` 底下新增對應的 `.html` 檔案。
  - 在 `index.html` 中加入連結，讓使用者可以從首頁導覽到新頁面。

- **新增圖片與資源**
  - 將圖片放到 `images/` 目錄中，並在對應的 HTML 檔案中引用。

## 授權條款

（請依實際需求選擇授權，例如 MIT License、Apache 2.0、GPL 等）

本專案目前預設為 **個人學習/教學用途**，若需正式授權條款，請在此補上對應 License 內容。


