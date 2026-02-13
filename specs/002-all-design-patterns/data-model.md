# Data Model: 002-all-design-patterns

**Feature**: 加入所有設計模式  
**Date**: 2025-02-13

本 feature 為靜態內容，無後端儲存；此處描述 **模式清單結構**、**分類**與**路由對應**，供 hub 與專頁實作對齊。

## 設計模式清單與分類

### 類別（Category）

| 英文 | 正體中文（介面顯示） |
|------|----------------------|
| Creational | 建立型 |
| Structural | 結構型 |
| Behavioral | 行為型 |

### GoF 23 模式一覽（slug、中文名、類別）

**建立型（Creational）**

| Slug | 中文名（建議） |
|------|----------------|
| `singleton` | Singleton（單例模式） |
| `factory-method` | Factory Method（工廠方法） |
| `abstract-factory` | Abstract Factory（抽象工廠） |
| `builder` | Builder（建造者） |
| `prototype` | Prototype（原型） |

**結構型（Structural）**

| Slug | 中文名（建議） |
|------|----------------|
| `adapter` | Adapter（轉接器） |
| `bridge` | Bridge（橋接） |
| `composite` | Composite（組合） |
| `decorator` | Decorator（裝飾者） |
| `facade` | Facade（外觀） |
| `flyweight` | Flyweight（享元） |
| `proxy` | Proxy（代理） |

**行為型（Behavioral）**

| Slug | 中文名（建議） |
|------|----------------|
| `chain-of-responsibility` | Chain of Responsibility（責任鏈） |
| `command` | Command（命令） |
| `iterator` | Iterator（迭代器） |
| `mediator` | Mediator（中介者） |
| `memento` | Memento（備忘錄） |
| `observer` | Observer（觀察者） |
| `state` | State（狀態） |
| `strategy` | Strategy（策略） |
| `template-method` | Template Method（樣板方法） |
| `visitor` | Visitor（訪問者） |

### 資料結構建議（供前端常數／模組使用）

每個模式至少包含：

- **slug**: string，對應 URL 路徑片段
- **nameZh**: string，正體中文名稱（可含英文括註）
- **category**: `'creational' | 'structural' | 'behavioral'`
- **description**: string，簡短一句描述（供 hub 列表顯示）

範例：

```js
{ slug: 'singleton', nameZh: 'Singleton（單例模式）', category: 'creational', description: '確保類別只有一個實例，並提供全域存取點；常見於設定、連線池等。' }
```

## 路由對應

| 路由 | 對應 | 說明 |
|------|------|------|
| `/design-pattern` | 設計模式 hub | 依三類分組列出所有模式，連結至各 `/design-pattern/<slug>` |
| `/design-pattern/singleton` | Singleton 專頁 | 沿用既有 SingletonPage，納入列表與「建立型」 |
| `/design-pattern/<slug>` | 各模式專頁 | 其餘 22 個模式；slug 見上表 |
| `/design-pattern/<未知>` | 導向或錯誤頁 | 導向 `/design-pattern` 或顯示「找不到該模式」+ 返回 hub |

## 專頁內容結構（邏輯）

每個模式專頁（含既有 Singleton）應包含：

1. **解釋**：何謂該模式、為何需要、適用情境、與他模式區別
2. **使用介紹**：何時使用、概念性使用方式、注意事項或常見陷阱
3. **範例**（可選）：Java / Spring Boot 程式碼片段

標題、導覽（回設計模式、回首頁）與既有 Singleton 頁一致。

## 驗證對應規格

- FR-001：hub 提供「所有設計模式」入口，清單涵蓋上列 23 個模式
- FR-002：列表依建立型、結構型、行為型分組呈現
- FR-003：每個模式有專頁，由 `/design-pattern/<slug>` 進入
- FR-006：Singleton 沿用既有專頁與路由，僅在清單與分類中列出
