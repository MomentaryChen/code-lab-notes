/**
 * GoF 23 設計模式清單（單一資料來源）
 * 供 DesignPatternLab hub 與路由使用；與 data-model.md 一致。
 * @typedef {{ slug: string, nameZh: string, category: 'creational'|'structural'|'behavioral', description: string }} PatternEntry
 */

/** @type {PatternEntry[]} */
export const PATTERN_LIST = [
  // 建立型 Creational
  { slug: 'singleton', nameZh: 'Singleton（單例模式）', category: 'creational', description: '確保類別只有一個實例，並提供全域存取點；常見於設定、連線池等。' },
  { slug: 'factory-method', nameZh: 'Factory Method（工廠方法）', category: 'creational', description: '由子類別決定要建立的物件類型，將物件建立邏輯封裝在工廠方法中。' },
  { slug: 'abstract-factory', nameZh: 'Abstract Factory（抽象工廠）', category: 'creational', description: '建立一系列相關或相依的物件家族，而不指定具體類別。' },
  { slug: 'builder', nameZh: 'Builder（建造者）', category: 'creational', description: '將複雜物件的建構步驟分離，使相同建構過程可產出不同表現。' },
  { slug: 'prototype', nameZh: 'Prototype（原型）', category: 'creational', description: '透過複製既有物件來建立新物件，避免子類別化與重複初始化。' },
  // 結構型 Structural
  { slug: 'adapter', nameZh: 'Adapter（轉接器）', category: 'structural', description: '將一個類別的介面轉換成客戶端期望的另一介面，使不相容的類別能合作。' },
  { slug: 'bridge', nameZh: 'Bridge（橋接）', category: 'structural', description: '將抽象與實作分離，使兩者可獨立變化，減少繼承層級。' },
  { slug: 'composite', nameZh: 'Composite（組合）', category: 'structural', description: '將物件組合成樹狀結構，使客戶端能一致地對待個別物件與組合。' },
  { slug: 'decorator', nameZh: 'Decorator（裝飾者）', category: 'structural', description: '動態地為物件附加額外職責，比子類別化更彈性。' },
  { slug: 'facade', nameZh: 'Facade（外觀）', category: 'structural', description: '為子系統提供簡化的統一介面，降低與子系統的耦合。' },
  { slug: 'flyweight', nameZh: 'Flyweight（享元）', category: 'structural', description: '以共享方式有效支援大量細粒度物件，節省記憶體。' },
  { slug: 'proxy', nameZh: 'Proxy（代理）', category: 'structural', description: '為其他物件提供代理以控制對該物件的存取（延遲載入、權限、快取等）。' },
  // 行為型 Behavioral
  { slug: 'chain-of-responsibility', nameZh: 'Chain of Responsibility（責任鏈）', category: 'behavioral', description: '將請求沿著處理者鏈傳遞，直到有物件處理為止。' },
  { slug: 'command', nameZh: 'Command（命令）', category: 'behavioral', description: '將請求封裝成物件，以便參數化、佇列化、記錄與復原。' },
  { slug: 'iterator', nameZh: 'Iterator（迭代器）', category: 'behavioral', description: '提供順序存取聚合物件元素的方法，而不暴露其內部表示。' },
  { slug: 'mediator', nameZh: 'Mediator（中介者）', category: 'behavioral', description: '用中介物件封裝物件間的互動，降低耦合。' },
  { slug: 'memento', nameZh: 'Memento（備忘錄）', category: 'behavioral', description: '在不破壞封裝下擷取並外部化物件的內部狀態，以便之後復原。' },
  { slug: 'observer', nameZh: 'Observer（觀察者）', category: 'behavioral', description: '定義物件間一對多相依，當主題狀態改變時所有觀察者會收到通知。' },
  { slug: 'state', nameZh: 'State（狀態）', category: 'behavioral', description: '讓物件的行為隨其內部狀態改變而改變，將狀態邏輯從主類別抽離。' },
  { slug: 'strategy', nameZh: 'Strategy（策略）', category: 'behavioral', description: '定義演算法家族並可互換，將演算法與使用它的客戶端分離。' },
  { slug: 'template-method', nameZh: 'Template Method（樣板方法）', category: 'behavioral', description: '在方法中定義演算法骨架，將某些步驟延遲到子類別實作。' },
  { slug: 'visitor', nameZh: 'Visitor（訪問者）', category: 'behavioral', description: '將作用於某結構中元素的操作分離出來，使操作可擴充而不改元素類別。' },
];

const slugSet = new Set(PATTERN_LIST.map((p) => p.slug));

/**
 * 檢查 slug 是否為有效設計模式
 * @param {string} slug
 * @returns {boolean}
 */
export function isValidPatternSlug(slug) {
  return slugSet.has(slug);
}

/**
 * 依類別取得模式列表
 * @param {'creational'|'structural'|'behavioral'} category
 * @returns {PatternEntry[]}
 */
export function getPatternsByCategory(category) {
  return PATTERN_LIST.filter((p) => p.category === category);
}

/**
 * 依 slug 取得單一模式
 * @param {string} slug
 * @returns {PatternEntry|undefined}
 */
export function getPatternBySlug(slug) {
  return PATTERN_LIST.find((p) => p.slug === slug);
}
