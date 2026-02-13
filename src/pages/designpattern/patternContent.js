/**
 * 各設計模式專頁內容（解釋 + 使用介紹 + 可選範例）
 * 僅涵蓋非 Singleton 之 22 個模式；Singleton 沿用 SingletonPage.jsx。
 * @typedef {{ nameZh: string, explanation: string[], usage: string[], example?: { intro?: string, blocks: { code: string, note?: string }[] } }} PatternContent
 */

/** @type {Record<string, PatternContent>} */
export const PATTERN_CONTENT = {};

/**
 * @param {string} slug
 * @returns {PatternContent|undefined}
 */
export function getPatternContent(slug) {
  return PATTERN_CONTENT[slug];
}

// ----- 建立型 Creational (4 個，不含 singleton) -----

PATTERN_CONTENT['factory-method'] = {
  nameZh: 'Factory Method（工廠方法）',
  explanation: [
    'Factory Method 是一種建立型設計模式：父類別定義建立物件的介面（工廠方法），由子類別決定要實例化哪一個具體類別。這樣可將「要建立什麼物件」的決策延遲到執行期，並保持與具體類別的鬆散耦合。',
    '為何需要：當無法在編譯期預知要建立的物件類型，或希望擴充產品家族時不修改既有客戶端程式碼，就需要把建立邏輯封裝起來並可被覆寫。',
    '適用情境：框架提供擴充點（子類別覆寫工廠方法以回傳自訂物件）、多個相關產品家族需要一致建立方式、希望集中物件建立邏輯於一處。',
    '與其他模式的區別：Abstract Factory 常以多個工廠方法組成，用來建立一整組相關物件；Simple Factory 只是單一方法回傳不同類型，沒有子類別化。Factory Method 強調「一個方法、子類別決定實例」。',
  ],
  usage: [
    '何時使用：當你無法預先知道要建立的具體類別，或希望新增產品類型時只新增子類別而不改呼叫端。',
    '概念性使用方式：在建立者類別中定義抽象（或預設）的 factoryMethod()，回傳抽象產品型別；子類別覆寫該方法並 return new ConcreteProduct()。客戶端透過建立者取得產品，而不直接 new 具體類別。',
    '注意事項：可能導致子類別數量增加（每種產品一子類）；若產品類型很固定，簡單工廠或建構子可能就夠用。',
  ],
  example: {
    intro: '以下以 Java 為例：抽象建立者定義工廠方法，具體子類別回傳不同產品。',
    blocks: [
      {
        code: `// 抽象產品與具體產品
public interface Product { String name(); }
public class ProductA implements Product {
  @Override public String name() { return "A"; }
}

// 建立者：工廠方法由子類別實作
public abstract class Creator {
  public void doSomething() {
    Product p = createProduct();
    System.out.println(p.name());
  }
  protected abstract Product createProduct();
}

// 具體建立者
public class CreatorA extends Creator {
  @Override protected Product createProduct() {
    return new ProductA();
  }
}`,
        note: '客戶端依賴 Creator 與 Product 介面，不直接 new ProductA，擴充時新增 Creator 子類別即可。',
      },
    ],
  },
};

PATTERN_CONTENT['abstract-factory'] = {
  nameZh: 'Abstract Factory（抽象工廠）',
  explanation: [
    'Abstract Factory 是建立型模式：提供一個介面用來建立「一系列相關或相依的物件」而不指定具體類別。每個具體工廠實作該介面，負責產生同一家族的产品（例如現代風家具 vs 古典風家具）。',
    '為何需要：當系統需要多個相關產品一起使用，且希望能整組替換（例如換主題、換資料庫）而不散落一堆 new 時，需要一個能建立整組產品的工廠。',
    '適用情境：UI 主題（按鈕、視窗、捲軸一組）、跨平台元件、不同資料來源的 DAO 家族。',
    '與其他模式的區別：Factory Method 是「一個方法建立一個產品」；Abstract Factory 是「一個工廠介面建立多個相關產品」。Builder 關注步驟與組裝，Abstract Factory 關注產品家族。',
  ],
  usage: [
    '何時使用：當有多個相關產品需一起建立，且希望能整組替換實作（如換主題、換資料庫）時。',
    '概念性使用方式：定義 AbstractFactory 介面（多個 createX() 方法）；每個具體工廠實作該介面並回傳同一家族的具體產品。客戶端只依賴抽象工廠與抽象產品型別，由注入的具體工廠決定實際類型。',
    '注意事項：新增產品類型時通常要改介面與所有具體工廠；產品家族數或產品種類很多時類別會變多。',
  ],
  example: {
    intro: '以下以 Java 為例：抽象工廠介面定義多個 create 方法，具體工廠回傳同一家族的產品。',
    blocks: [
      {
        code: `// 抽象產品與抽象工廠
public interface Button { void render(); }
public interface GUIFactory {
  Button createButton();
}

// 具體工廠回傳同一風格產品
public class ModernFactory implements GUIFactory {
  @Override public Button createButton() {
    return new ModernButton();
  }
}
public class ClassicFactory implements GUIFactory {
  @Override public Button createButton() {
    return new ClassicButton();
  }
}

// 客戶端依賴 GUIFactory，由注入的具體工廠決定風格
GUIFactory factory = new ModernFactory();
Button btn = factory.createButton();`,
        note: '換主題時只需替換為另一 ConcreteFactory，客戶端程式碼不變。',
      },
    ],
  },
};

PATTERN_CONTENT['builder'] = {
  nameZh: 'Builder（建造者）',
  explanation: [
    'Builder 是建立型模式：將複雜物件的建構「步驟」與「表現」分離，使相同建構過程可產出不同表現。Director 依序呼叫 Builder 的步驟，ConcreteBuilder 實作每一步並組裝出最終產品。',
    '為何需要：當建構邏輯很複雜（多參數、可選參數、步驟有順序或條件），若全塞在建構子會難以閱讀與維護；且有時希望同一套步驟能產出不同表示（例如同一份資料輸出 HTML 或純文字）。',
    '適用情境：物件有許多可選參數、建構步驟多且可能依情境變化、需要與產品表示分離的建構流程。',
    '與其他模式的區別：Abstract Factory 回傳整組產品；Builder 一步步組裝一個產品。Factory Method 只負責「建立哪一個」，Builder 負責「怎麼一步步建」。',
  ],
  usage: [
    '何時使用：當物件建構很複雜（多可選參數、多步驟）或希望建構過程與最終表示分離時。',
    '概念性使用方式：定義 Builder 介面（如 setA()、setB()、build()）；ConcreteBuilder 實作並在內部組裝產品；可選 Director 依固定順序呼叫 builder 的步驟。客戶端取得 builder 後呼叫步驟再 build() 取得產品。',
    '注意事項：若產品很簡單，builder 可能過度設計；需注意 build() 呼叫時機與產品不可變性（是否允許建構後再改）。',
  ],
  example: {
    intro: '以下以 Java 為例：Builder 介面定義步驟與 build()，具體 Builder 組裝產品。',
    blocks: [
      {
        code: `// 產品
public class Report {
  private String header, body, footer;
  public void setHeader(String s) { header = s; }
  public void setBody(String s) { body = s; }
  public void setFooter(String s) { footer = s; }
}

// Builder 介面
public interface ReportBuilder {
  ReportBuilder header(String s);
  ReportBuilder body(String s);
  ReportBuilder footer(String s);
  Report build();
}

// 具體 Builder
public class PdfReportBuilder implements ReportBuilder {
  private Report report = new Report();
  @Override public ReportBuilder header(String s) {
    report.setHeader("[PDF] " + s); return this;
  }
  @Override public Report build() { return report; }
  // ... body, footer 類似
}

// 使用
Report r = new PdfReportBuilder().header("Title").body("Content").footer("End").build();`,
        note: 'Director 可依固定順序呼叫 builder 的步驟，封裝常用組裝流程。',
      },
    ],
  },
};

PATTERN_CONTENT['prototype'] = {
  nameZh: 'Prototype（原型）',
  explanation: [
    'Prototype 是建立型模式：透過「複製既有物件」來建立新物件，而不是用類別建構子 new。被複製的物件稱為原型；複製可以是淺拷貝或深拷貝，依需求實作。',
    '為何需要：當 new 的成本高（例如要讀檔、連線、複雜計算），或希望新物件與某既有物件狀態幾乎相同只改少數欄位時，複製比重新建構更合適。也可避免子類別爆炸（用組合與複製取代繼承）。',
    '適用情境：建立成本高且與現有實例相似、系統需動態載入類別而無法事先知道具體類別、需要還原或複製複雜狀態。',
    '與其他模式的區別：Factory 系列由工廠「建立」新物件；Prototype 由「物件自己複製自己」。與 Memento 不同：Memento 是狀態快照與還原，Prototype 是產生新物件。',
  ],
  usage: [
    '何時使用：當建立新實例的成本高、或新物件與某實例狀態相近只需微調時。',
    '概念性使用方式：原型類別實作 clone()（或 copy()），在內部複製自身並回傳；可選 PrototypeManager 註冊多個原型供客戶端依名稱取得並 clone。客戶端不 new，改為取得原型後呼叫 clone()。',
    '注意事項：深拷貝要處理巢狀物件與循環參照；clone 的語意要明確（淺/深、是否共用內部狀態）。',
  ],
  example: {
    intro: '以下以 Java 為例：實作 Cloneable 並覆寫 clone()，或提供 copy 建構子。',
    blocks: [
      {
        code: `// 原型類別
public class Document implements Cloneable {
  private String title;
  private List<String> paragraphs;
  public void setTitle(String s) { title = s; }

  @Override
  public Document clone() {
    try {
      Document copy = (Document) super.clone();
      copy.paragraphs = new ArrayList<>(paragraphs);
      return copy;
    } catch (CloneNotSupportedException e) {
      throw new RuntimeException(e);
    }
  }
}

// 使用：複製既有物件而非 new
Document template = loadTemplate();
Document newDoc = template.clone();
newDoc.setTitle("新文件");`,
        note: '深拷貝時需複製巢狀集合，避免共用參考。',
      },
    ],
  },
};

// ----- 結構型 Structural (7 個) -----

PATTERN_CONTENT['adapter'] = {
  nameZh: 'Adapter（轉接器）',
  explanation: [
    'Adapter 是結構型模式：將一個類別的介面轉換成客戶端期望的另一介面，使原本介面不相容的類別能一起工作。Adapter 包裝被轉接者並實作目標介面，在方法內呼叫被轉接者的 API 並轉換參數或回傳值。',
    '為何需要：當要使用既有類別或第三方程式庫，但其介面與目前系統期望的介面不一致時，與其改動既有程式碼，不如加一層 Adapter 轉接。',
    '適用情境：整合 legacy 或第三方 API、讓多個介面不同的實作可被同一套客戶端程式使用、介面轉換而不改動既有類別。',
    '與其他模式的區別：Decorator 增強同一介面；Adapter 是「轉換」成另一介面。Facade 簡化介面但未必改變介面型別；Adapter 明確做介面轉換。',
  ],
  usage: [
    '何時使用：當有一個類別功能符合需求但介面與你期望的不符，且無法或不想修改該類別時。',
    '概念性使用方式：定義目標介面（客戶端要的）；建立 Adapter 類別實作目標介面並持有被轉接者；Adapter 的方法內呼叫被轉接者並轉換參數/回傳值。客戶端只依賴目標介面，由 Adapter 負責轉接。',
    '注意事項：過多 Adapter 可能讓呼叫鏈變長；若可修改被轉接者，有時直接讓其實作目標介面更簡單。',
  ],
  example: {
    intro: '以下以 Java 為例：目標介面與被轉接者介面不同，Adapter 實作目標介面並委派給被轉接者。',
    blocks: [
      {
        code: `// 目標介面（客戶端期望的）
public interface Target { String request(); }

// 被轉接者（既有類別，介面不同）
public class Adaptee {
  public String specificRequest() {
    return "adapted";
  }
}

// Adapter：實作 Target，內部委派給 Adaptee
public class Adapter implements Target {
  private final Adaptee adaptee = new Adaptee();
  @Override
  public String request() {
    return adaptee.specificRequest();
  }
}

Target t = new Adapter();
t.request(); // 客戶端只依賴 Target`,
        note: '若 Adaptee 為第三方類別無法修改，Adapter 是整合的標準做法。',
      },
    ],
  },
};

PATTERN_CONTENT['bridge'] = {
  nameZh: 'Bridge（橋接）',
  explanation: [
    'Bridge 是結構型模式：將「抽象」與「實作」分離，使兩者可獨立變化。這裡的實作指的是底層實作（如繪圖 API、儲存後端），抽象指的是高層邏輯（如視窗、形狀）。用組合取代繼承，避免類別階層爆炸。',
    '為何需要：當用繼承同時擴充「抽象維度」與「實作維度」時，會產生大量子類別（如 Shape × Color × Renderer）。將實作抽成獨立階層並以組合注入，可分別擴充。',
    '適用情境：抽象與實作需獨立擴充、多個維度變化會導致繼承組合爆炸、希望執行期可切換實作。',
    '與其他模式的區別：Strategy 替換演算法；Bridge 分離抽象與實作兩套階層。Adapter 做介面轉換；Bridge 是結構分離。',
  ],
  usage: [
    '何時使用：當你有兩個可獨立變化的維度（如形狀 × 繪圖 API），希望避免子類別數量乘積成長時。',
    '概念性使用方式：定義 Abstraction 持有 Implementor；Implementor 介面定義底層操作，ConcreteImplementor 實作（如不同 API）。Abstraction 將請求委派給 implementor。客戶端組合 abstraction 與 implementor。',
    '注意事項：若只有一個實作或抽象不會變，可能不需要 Bridge；設計時要清楚劃分「抽象」與「實作」的邊界。',
  ],
  example: {
    intro: '以下以 Java 為例：形狀（抽象）持有繪圖 API（實作），兩者可獨立擴充。',
    blocks: [
      {
        code: `// Implementor：繪圖 API
public interface Renderer {
  void drawCircle(double r);
}
public class VectorRenderer implements Renderer {
  @Override public void drawCircle(double r) {
    System.out.println("Vector circle " + r);
  }
}

// Abstraction：形狀持有 Renderer
public abstract class Shape {
  protected final Renderer renderer;
  protected Shape(Renderer r) { this.renderer = r; }
  public abstract void draw();
}
public class Circle extends Shape {
  private double radius;
  public Circle(Renderer r, double radius) {
    super(r); this.radius = radius;
  }
  @Override public void draw() { renderer.drawCircle(radius); }
}

new Circle(new VectorRenderer(), 5).draw();`,
        note: '換成 RasterRenderer 或新增 Triangle 都不影響另一維度。',
      },
    ],
  },
};

PATTERN_CONTENT['composite'] = {
  nameZh: 'Composite（組合）',
  explanation: [
    'Composite 是結構型模式：將物件組合成樹狀結構，使客戶端能「一致地」對待個別物件（Leaf）與組合（Composite）。Composite 可包含子節點（Leaf 或 Composite），並將操作遞迴傳給子節點。',
    '為何需要：當部分與整體具有相同操作介面（例如檔案與資料夾都可「列出」、「計算大小」），且需要樹狀結構時，用 Composite 可讓客戶端不用區分是單一節點還是子樹。',
    '適用情境：樹狀結構、部分-整體層級、需對整棵樹或單一節點做相同操作（列印、計算、搜尋）。',
    '與其他模式的區別：Decorator 只有一層包裝；Composite 是樹狀多層。Iterator 遍歷聚合；Composite 定義的是結構與一致介面。',
  ],
  usage: [
    '何時使用：當你有樹狀結構，且希望對「單一節點」與「整棵子樹」用同一套操作時。',
    '概念性使用方式：定義 Component 介面（共通的 operation() 等）；Leaf 實作並直接處理；Composite 實作並持有子 Component 列表，operation() 時遍歷子節點並呼叫其 operation()。客戶端只依賴 Component。',
    '注意事項：子節點管理（新增/移除）放在 Composite 還是 Component 需依需求決定；過深或過大的樹要注意效能。',
  ],
  example: {
    intro: '以下以 Java 為例：Component 介面，Leaf 與 Composite 皆實作，Composite 持有子節點並遞迴呼叫。',
    blocks: [
      {
        code: `// Component
public interface Component {
  void operation();
}
public class Leaf implements Component {
  @Override public void operation() {
    System.out.println("Leaf");
  }
}
public class Composite implements Component {
  private final List<Component> children = new ArrayList<>();
  public void add(Component c) { children.add(c); }
  @Override
  public void operation() {
    for (Component c : children) c.operation();
  }
}

Composite root = new Composite();
root.add(new Leaf());
root.add(new Leaf());
root.operation(); // 一致對待 Leaf 與 Composite`,
        note: '客戶端只依賴 Component，不需區分是單一節點還是子樹。',
      },
    ],
  },
};

PATTERN_CONTENT['decorator'] = {
  nameZh: 'Decorator（裝飾者）',
  explanation: [
    'Decorator 是結構型模式：動態地為物件「附加」額外職責，比子類別化更彈性。Decorator 與被裝飾物件實作同一介面，並持有被裝飾物件的參考，在方法內先呼叫被裝飾物件再加上自己的行為（或取代）。',
    '為何需要：當需要為物件增加行為，但用繼承會導致類別爆炸（各種組合）或無法在執行期動態組合時，用包裝一層一層疊加職責。',
    '適用情境：為個別物件動態加上職責、可組合的附加行為（如加密、壓縮、日誌）、不想用子類別擴充時。',
    '與其他模式的區別：Adapter 改變介面；Decorator 保持同一介面並增強。Composite 是樹狀；Decorator 是鏈狀包裝。Strategy 替換演算法；Decorator 疊加行為。',
  ],
  usage: [
    '何時使用：當要動態、可組合地為物件增加職責，且不想用大量子類別時。',
    '概念性使用方式：定義與 Component 相同介面的 Decorator，並持有 Component；ConcreteDecorator 在呼叫被包裝物件前後加上自己的邏輯。客戶端用多個 Decorator 包裝同一 Component。',
    '注意事項：裝飾順序可能影響行為；多層包裝時除錯要追蹤整條鏈；若職責很固定，繼承可能更直觀。',
  ],
  example: {
    intro: '以下以 Java 為例：Decorator 與 Component 同一介面，包裝被裝飾者並在呼叫前後加上行為。',
    blocks: [
      {
        code: `// Component
public interface DataSource {
  void writeData(String data);
}
public class FileDataSource implements DataSource {
  @Override public void writeData(String data) { /* 寫檔 */ }
}

// Decorator
public abstract class DataSourceDecorator implements DataSource {
  protected final DataSource wrapped;
  protected DataSourceDecorator(DataSource w) { wrapped = w; }
}
public class EncryptionDecorator extends DataSourceDecorator {
  @Override
  public void writeData(String data) {
    wrapped.writeData(encrypt(data));
  }
}

DataSource ds = new EncryptionDecorator(new FileDataSource());
ds.writeData("hello"); // 先加密再寫入`,
        note: '可多層疊加（壓縮、加密等），與 Component 介面一致。',
      },
    ],
  },
};

PATTERN_CONTENT['facade'] = {
  nameZh: 'Facade（外觀）',
  explanation: [
    'Facade 是結構型模式：為子系統提供一個「簡化的統一介面」，讓客戶端更容易使用子系統，並降低客戶端與子系統內多個類別的耦合。Facade 將多個類別的呼叫組合成少數高階方法。',
    '為何需要：當子系統很複雜、類別很多、或客戶端只需要常用流程時，直接依賴多個類別會難以使用且易出錯。用一個 Facade 封裝常用流程可簡化介面。',
    '適用情境：簡化複雜子系統的使用、層級化子系統（每層一個 Facade）、為 legacy 提供簡化介面。',
    '與其他模式的區別：Adapter 做介面「轉換」；Facade 做介面「簡化」且未必改變型別。Facade 通常不新增行為，只是組合既有呼叫。',
  ],
  usage: [
    '何時使用：當子系統複雜、類別多，而客戶端只需要少數常用流程時。',
    '概念性使用方式：建立 Facade 類別，內部持有或使用子系統內多個類別；對外提供少數方法（如 startServer()、processOrder()），在方法內依序呼叫子系統。客戶端只依賴 Facade。',
    '注意事項：Facade 可能變成「上帝類別」若塞太多邏輯；子系統仍可被進階客戶端直接使用。',
  ],
  example: {
    intro: '以下以 Java 為例：Facade 對外提供簡化方法，內部組合多個子系統類別。',
    blocks: [
      {
        code: `// 子系統類別（多個、介面複雜）
public class SubsystemA { public void doA() {} }
public class SubsystemB { public void doB() {} }

// Facade：單一入口，組合常用流程
public class Facade {
  private final SubsystemA a = new SubsystemA();
  private final SubsystemB b = new SubsystemB();
  public void start() {
    a.doA();
    b.doB();
  }
}

// 客戶端只依賴 Facade
Facade f = new Facade();
f.start();`,
        note: '進階需求仍可直接使用 SubsystemA、SubsystemB。',
      },
    ],
  },
};

PATTERN_CONTENT['flyweight'] = {
  nameZh: 'Flyweight（享元）',
  explanation: [
    'Flyweight 是結構型模式：以「共享」方式有效支援大量細粒度物件，節省記憶體。共用的內在狀態（intrinsic）存在 Flyweight 中並被多處共享；外在狀態（extrinsic）由客戶端在呼叫時傳入，不儲存在 Flyweight 內。',
    '為何需要：當系統需要大量相似物件（如字元、圖元、樹葉），若每個都存完整狀態會耗盡記憶體。若把可共用的部分抽出來共享，可大幅減少記憶體。',
    '適用情境：大量相似物件、可區分內在（可共享）與外在（每次不同）狀態、物件可被少數共享實例代表。',
    '與其他模式的區別：Singleton 是單一實例；Flyweight 是「少數共享實例」對應多個邏輯物件。Object pool 是重用可變物件；Flyweight 是共享不可變的內在狀態。',
  ],
  usage: [
    '何時使用：當需要大量細粒度物件且其多數狀態可共享時。',
    '概念性使用方式：將物件狀態拆成 intrinsic（可共享）與 extrinsic（每次不同）；Flyweight 只存 intrinsic，factory 管理共享的 Flyweight 實例；客戶端呼叫時傳入 extrinsic。',
    '注意事項：辨識內在/外在狀態是關鍵；若外在狀態很大或計算成本高，節省可能有限。',
  ],
  example: {
    intro: '以下以 Java 為例：共用的字元型別（內在狀態）由 Factory 管理，外在狀態（位置、顏色）由呼叫端傳入。',
    blocks: [
      {
        code: `// Flyweight：只存內在狀態
public class CharacterFlyweight {
  private final char symbol;
  public CharacterFlyweight(char c) { symbol = c; }
  public void draw(int x, int y) {
    System.out.println(symbol + " at " + x + "," + y);
  }
}

// Factory 快取共用實例
public class FlyweightFactory {
  private final Map<Character, CharacterFlyweight> cache = new HashMap<>();
  public CharacterFlyweight get(char c) {
    return cache.computeIfAbsent(c, CharacterFlyweight::new);
  }
}

FlyweightFactory f = new FlyweightFactory();
f.get('A').draw(0, 0);
f.get('A').draw(1, 1); // 同一實例，不同外在狀態`,
        note: '大量重複字元時可大幅減少物件數量。',
      },
    ],
  },
};

PATTERN_CONTENT['proxy'] = {
  nameZh: 'Proxy（代理）',
  explanation: [
    'Proxy 是結構型模式：為其他物件提供「代理」以控制對該物件的存取。Proxy 與實際物件實作同一介面，客戶端透過 Proxy 存取；Proxy 可在轉發前後加入延遲載入、權限檢查、快取、紀錄等。',
    '為何需要：當直接存取物件不方便或不可取時（例如物件在遠端、建立成本高、需要存取控制），需要一層代理來延遲、控制或優化存取。',
    '適用情境：虛擬代理（延遲建立）、保護代理（權限）、遠端代理（RPC）、快取代理、智慧參考（計數、釋放）。',
    '與其他模式的區別：Decorator 增強行為；Proxy 控制存取。Adapter 轉換介面；Proxy 保持介面。外觀簡化介面；Proxy 通常保持相同介面。',
  ],
  usage: [
    '何時使用：當需要控制、延遲或優化對某物件的存取時。',
    '概念性使用方式：定義與 RealSubject 相同介面的 Proxy，並持有 RealSubject（或其建立方式）；Proxy 的方法內依需求建立、快取、檢查權限後再轉呼叫給 RealSubject。客戶端依賴介面，使用 Proxy。',
    '注意事項：要清楚區分 Proxy 的職責（延遲/快取/權限），避免單一 Proxy 做太多事；注意線程安全與生命週期。',
  ],
  example: {
    intro: '以下以 Java 為例：Proxy 實作與 RealSubject 相同介面，在轉發前加入延遲載入或權限檢查。',
    blocks: [
      {
        code: `// Subject 介面
public interface Image {
  void display();
}
public class RealImage implements Image {
  public RealImage(String path) { loadFromDisk(path); }
  @Override public void display() { System.out.println("Display"); }
  private void loadFromDisk(String path) {}
}

// Proxy：延遲建立 RealImage
public class ProxyImage implements Image {
  private RealImage real;
  private final String path;
  public ProxyImage(String path) { this.path = path; }
  @Override
  public void display() {
    if (real == null) real = new RealImage(path);
    real.display();
  }
}

Image img = new ProxyImage("photo.jpg");
img.display(); // 第一次才載入`,
        note: '可改為快取代理、保護代理等，介面不變。',
      },
    ],
  },
};

// ----- 行為型 Behavioral (10 個) -----

PATTERN_CONTENT['chain-of-responsibility'] = {
  nameZh: 'Chain of Responsibility（責任鏈）',
  explanation: [
    'Chain of Responsibility 是行為型模式：將請求沿著「處理者」鏈傳遞，直到有物件處理為止。每個處理者持有下一個處理者的參考，可選擇處理請求或轉給下一位。',
    '為何需要：當多個物件都可能處理同一請求，但事先不知道該由誰處理，或希望發送者與處理者解耦時，用鏈條讓請求依序被嘗試。',
    '適用情境：多個候選處理者、需動態指定鏈條順序、請求得由其中一個處理（如事件處理、審核流程、過濾器）。',
    '與其他模式的區別：Decorator 是層層增強；責任鏈是「傳下去直到有人處理」。Command 封裝請求；責任鏈是傳遞與處理。',
  ],
  usage: [
    '何時使用：當多個物件都可能處理請求，且希望發送者不需知道具體處理者時。',
    '概念性使用方式：定義 Handler 介面（handleRequest()、setNext()）；ConcreteHandler 實作並在 handleRequest() 內決定是否處理或呼叫 next.handleRequest()。客戶端組裝鏈並從頭傳入請求。',
    '注意事項：要保證請求最終被處理或明確拒絕，避免無止境傳遞；鏈的組裝與順序要清楚。',
  ],
  example: {
    intro: '以下以 Java 為例：Handler 介面含 setNext 與 handle，ConcreteHandler 決定是否處理或轉給 next。',
    blocks: [
      {
        code: `public abstract class Handler {
  protected Handler next;
  public void setNext(Handler h) { next = h; }
  public void handle(String request) {
    if (canHandle(request)) {
      doHandle(request);
    } else if (next != null) {
      next.handle(request);
    }
  }
  protected abstract boolean canHandle(String request);
  protected abstract void doHandle(String request);
}
public class ConcreteHandlerA extends Handler {
  @Override protected boolean canHandle(String r) {
    return r.startsWith("A");
  }
  @Override protected void doHandle(String r) {
    System.out.println("A handled: " + r);
  }
}
Handler a = new ConcreteHandlerA();
Handler b = new ConcreteHandlerB();
a.setNext(b);
a.handle("A1");`,
        note: '請求沿鏈傳遞，直到有 Handler 處理或鏈結束。',
      },
    ],
  },
};

PATTERN_CONTENT['command'] = {
  nameZh: 'Command（命令）',
  explanation: [
    'Command 是行為型模式：將「請求」封裝成物件，使請求可被參數化、佇列化、記錄（undo）、或在不同情境重複使用。Command 介面通常有 execute()，必要時有 undo()。',
    '為何需要：當需要將操作請求與執行分離（如排程、佇列、復原）、或需要支援巨集／批次操作時，把請求當成物件可延遲執行、記錄、重做。',
    '適用情境：需要 undo/redo、需要佇列或排程請求、需要記錄操作日誌、GUI 選單/按鈕與操作解耦。',
    '與其他模式的區別：Strategy 替換演算法；Command 封裝單次請求。Memento 存狀態；Command 存操作。',
  ],
  usage: [
    '何時使用：當需要將請求參數化、佇列化、記錄或支援復原時。',
    '概念性使用方式：定義 Command 介面（execute()、可選 undo()）；ConcreteCommand 持有 Receiver 的參考並在 execute() 內呼叫 Receiver 的方法；Invoker 持有 Command 並在適當時機呼叫 execute()。客戶端建立 Command 並交給 Invoker。',
    '注意事項：Undo 需額外實作狀態儲存；大量 Command 類別時可考慮用 lambda 或函式物件簡化。',
  ],
  example: {
    intro: '以下以 Java 為例：Command 介面含 execute()，ConcreteCommand 持有 Receiver，Invoker 呼叫 Command。',
    blocks: [
      {
        code: `public interface Command {
  void execute();
}
public class Light {
  public void on() {}
  public void off() {}
}
public class LightOnCommand implements Command {
  private final Light light;
  public LightOnCommand(Light l) { light = l; }
  @Override public void execute() { light.on(); }
}
public class Invoker {
  private Command command;
  public void setCommand(Command c) { command = c; }
  public void press() { command.execute(); }
}
Invoker invoker = new Invoker();
invoker.setCommand(new LightOnCommand(light));
invoker.press();`,
        note: '可將 Command 放入佇列、記錄以便 undo/redo。',
      },
    ],
  },
};

PATTERN_CONTENT['iterator'] = {
  nameZh: 'Iterator（迭代器）',
  explanation: [
    'Iterator 是行為型模式：提供一種方式「順序存取」聚合物件的元素，而不暴露該聚合的內部表示。迭代器介面通常有 next()、hasNext() 或 currentItem()，讓客戶端能遍歷而不依賴實作。',
    '為何需要：當聚合的內部結構（陣列、樹、圖）不應暴露給客戶端，或希望用統一方式遍歷不同結構時，迭代器封裝遍歷邏輯。',
    '適用情境：需要統一遍歷不同資料結構、需要隱藏聚合內部、需要多個同時進行的遍歷、語言未內建迭代協定時。',
    '與其他模式的區別：Visitor 是「對每個元素做操作」；Iterator 是「順序存取」。Composite 定義結構；Iterator 遍歷結構。',
  ],
  usage: [
    '何時使用：當需要統一、順序地存取聚合元素且不想暴露內部結構時。',
    '概念性使用方式：定義 Iterator 介面（next()、hasNext() 等）；Aggregate 提供 createIterator() 回傳具體 Iterator；ConcreteIterator 持有聚合參考並維護遍歷位置。客戶端透過 Iterator 遍歷。',
    '注意事項：遍歷中修改聚合可能導致未定義行為；多執行緒時需考慮迭代器狀態。',
  ],
  example: {
    intro: '以下以 Java 為例：Iterator 介面含 hasNext()、next()，Aggregate 提供 createIterator()。',
    blocks: [
      {
        code: `public interface Iterator<T> {
  boolean hasNext();
  T next();
}
public class ListAggregate {
  private final List<String> list = List.of("a", "b", "c");
  public Iterator<String> createIterator() {
    return new Iterator<String>() {
      private int i = 0;
      @Override public boolean hasNext() { return i < list.size(); }
      @Override public String next() { return list.get(i++); }
    };
  }
}
ListAggregate agg = new ListAggregate();
Iterator<String> it = agg.createIterator();
while (it.hasNext()) System.out.println(it.next());`,
        note: 'Java 內建 java.util.Iterator 與 Iterable 即為此模式。',
      },
    ],
  },
};

PATTERN_CONTENT['mediator'] = {
  nameZh: 'Mediator（中介者）',
  explanation: [
    'Mediator 是行為型模式：用「中介物件」封裝一組物件間的互動，使物件彼此不直接參照，降低耦合。物件只與 Mediator 通訊，由 Mediator 協調誰該做什麼。',
    '為何需要：當多個物件互相依賴、溝通複雜（網狀參照）時，改為都與中介者溝通可變成星狀結構，易於維護與擴充。',
    '適用情境：物件間互動複雜、希望集中協調邏輯、需要簡化多對多關係（如表單欄位、聊天室成員）。',
    '與其他模式的區別：Observer 是一對多通知；Mediator 是多對多經由中介。Facade 簡化對子系統的呼叫；Mediator 協調同層物件間的互動。',
  ],
  usage: [
    '何時使用：當多個物件需要互相溝通且互動複雜，希望集中協調時。',
    '概念性使用方式：定義 Mediator 介面與 ConcreteMediator；Colleague 持有 Mediator 參考，在需要與其他 Colleague 互動時透過 Mediator 傳遞。Mediator 知道所有 Colleague 並協調其行為。',
    '注意事項：Mediator 可能變得過於龐大；要避免把太多業務邏輯塞進單一 Mediator。',
  ],
  example: {
    intro: '以下以 Java 為例：Colleague 透過 Mediator 與其他 Colleague 溝通，不直接參照。',
    blocks: [
      {
        code: `public interface Mediator {
  void notify(Colleague sender, String msg);
}
public abstract class Colleague {
  protected Mediator mediator;
  public Colleague(Mediator m) { mediator = m; }
}
public class ConcreteColleagueA extends Colleague {
  public void doSomething() {
    mediator.notify(this, "A done");
  }
}
public class ConcreteMediator implements Mediator {
  private ConcreteColleagueA a;
  private ConcreteColleagueB b;
  @Override
  public void notify(Colleague sender, String msg) {
    if (sender == a) b.receive(msg);
    else if (sender == b) a.receive(msg);
  }
}`,
        note: 'Mediator 集中協調邏輯，Colleague 彼此解耦。',
      },
    ],
  },
};

PATTERN_CONTENT['memento'] = {
  nameZh: 'Memento（備忘錄）',
  explanation: [
    'Memento 是行為型模式：在不破壞封裝的前提下，「擷取」物件的內部狀態並外部化，以便之後可「還原」到該狀態。Memento 只由 Originator 寫入，由 Caretaker 持有但不解讀內容。',
    '為何需要：當需要快照、還原、undo 或檢查點機制時，必須保存物件某時刻的狀態，且不希望暴露內部結構給外部。',
    '適用情境：需要 snapshot/restore、undo、檢查點、交易還原。',
    '與其他模式的區別：Command 可做 undo 但常搭配 Memento 存狀態；Prototype 複製物件；Memento 只存狀態以便還原。',
  ],
  usage: [
    '何時使用：當需要儲存並還原物件狀態，且不想暴露內部實作時。',
    '概念性使用方式：Originator 提供 createMemento() 將自身狀態寫入 Memento，以及 setMemento(m) 從 Memento 還原；Memento 僅暴露給 Originator。Caretaker 持有 Memento 並在適當時機要求還原。',
    '注意事項：狀態大時 Memento 可能佔記憶體；深拷貝與版本管理要考慮清楚。',
  ],
  example: {
    intro: '以下以 Java 為例：Originator 提供 createMemento() 與 setMemento()，Caretaker 持有 Memento。',
    blocks: [
      {
        code: `public class Memento {
  private final String state;
  public Memento(String state) { this.state = state; }
  public String getState() { return state; }
}
public class Originator {
  private String state;
  public void setState(String s) { state = s; }
  public Memento createMemento() { return new Memento(state); }
  public void setMemento(Memento m) { state = m.getState(); }
}
Originator originator = new Originator();
originator.setState("on");
Memento m = originator.createMemento();
// ... 之後還原
originator.setMemento(m);`,
        note: 'Memento 僅由 Originator 寫入與讀取，對外不暴露內部結構。',
      },
    ],
  },
};

PATTERN_CONTENT['observer'] = {
  nameZh: 'Observer（觀察者）',
  explanation: [
    'Observer 是行為型模式：定義物件間的一對多相依，當「主題」（Subject）狀態改變時，所有「觀察者」（Observer）會自動收到通知並更新。主題維持觀察者清單，在狀態變更時遍歷並通知。',
    '為何需要：當多個物件需依賴某物件的狀態並保持同步，且希望主題與觀察者解耦（主題不需知道觀察者具體型別）時，用訂閱/通知機制。',
    '適用情境：事件驅動、模型-視圖同步、即時資料推送、GUI 綁定。',
    '與其他模式的區別：Mediator 協調多對多；Observer 是一對多。Pub/Sub 常透過訊息佇列；Observer 通常是同步、同 process。',
  ],
  usage: [
    '何時使用：當一個物件狀態改變需通知多個依賴者，且希望鬆散耦合時。',
    '概念性使用方式：Subject 維護 Observer 列表（attach/detach），狀態改變時呼叫各 Observer 的 update()。Observer 介面只有 update()；ConcreteObserver 在 update() 內從 Subject 拉取所需資料並更新自己。',
    '注意事項：通知順序與效能（大量觀察者時）；避免在通知中修改主題導致遞迴；考慮用非同步或佇列減少耦合。',
  ],
  example: {
    intro: '以下為經典 Java Observer 介面與主題實作；Spring 中可用 ApplicationEventPublisher 達成類似效果。',
    blocks: [
      {
        code: `// Observer 介面與 Subject
public interface Observer {
  void update(String state);
}
public abstract class Subject {
  private final List<Observer> observers = new ArrayList<>();
  public void attach(Observer o) { observers.add(o); }
  public void detach(Observer o) { observers.remove(o); }
  protected void notifyObservers(String state) {
    for (Observer o : observers) o.update(state);
  }
}

// 具體主題狀態改變時通知
public class ConcreteSubject extends Subject {
  private String state;
  public void setState(String s) {
    this.state = s;
    notifyObservers(state);
  }
}`,
        note: 'Spring 中可發佈 ApplicationEvent，並以 @EventListener 訂閱，由容器負責一對多通知。',
      },
    ],
  },
};

PATTERN_CONTENT['state'] = {
  nameZh: 'State（狀態）',
  explanation: [
    'State 是行為型模式：讓物件的「行為」隨其「內部狀態」改變而改變，並將狀態邏輯從主類別抽離成獨立的 State 類別。Context 持有目前 State，將請求委派給 State；State 可切換 Context 的狀態。',
    '為何需要：當物件行為依狀態不同而差異大，若用一堆 if/switch 會難以維護；把每個狀態封裝成類別可讓邏輯清晰且易擴充。',
    '適用情境：行為明顯依狀態改變、狀態轉換有規則、希望避免大量條件判斷。',
    '與其他模式的區別：Strategy 替換演算法，通常客戶端決定；State 由狀態自己決定何時切換。Strategy 可無狀態；State 代表狀態。',
  ],
  usage: [
    '何時使用：當物件行為依內部狀態大幅變化，且狀態數不少時。',
    '概念性使用方式：定義 State 介面（handle() 等）；ConcreteState 實作並在適當時機呼叫 Context.setState(nextState)。Context 持有 currentState，請求委派給 currentState.handle()。',
    '注意事項：狀態轉換要明確（誰負責 setState）；避免循環切換或遺漏狀態。',
  ],
  example: {
    intro: '以下以 Java 為例：Context 持有 State，請求委派給 currentState；State 可切換 Context 的狀態。',
    blocks: [
      {
        code: `public interface State {
  void handle(Context ctx);
}
public class Context {
  private State state;
  public void setState(State s) { state = s; }
  public void request() { state.handle(this); }
}
public class ConcreteStateA implements State {
  @Override
  public void handle(Context ctx) {
    System.out.println("StateA");
    ctx.setState(new ConcreteStateB());
  }
}
Context ctx = new Context();
ctx.setState(new ConcreteStateA());
ctx.request(); // 可能切換到 StateB`,
        note: '狀態邏輯封裝在各自 State 類別，Context 不寫 if/switch。',
      },
    ],
  },
};

PATTERN_CONTENT['strategy'] = {
  nameZh: 'Strategy（策略）',
  explanation: [
    'Strategy 是行為型模式：定義「演算法家族」，並使它們可互換；將演算法與使用它的客戶端分離。Context 持有 Strategy，將工作委派給 Strategy；可於執行期更換 Strategy。',
    '為何需要：當同一問題有多種解法（如排序、壓縮、定價），且希望能在執行期選擇或替換時，把演算法抽成策略可避免在 Context 裡塞滿條件。',
    '適用情境：多種演算法可互換、希望隱藏演算法實作、需要執行期切換行為。',
    '與其他模式的區別：State 依內部狀態改變行為；Strategy 由外部注入。Template Method 用繼承固定骨架；Strategy 用組合替換整段邏輯。',
  ],
  usage: [
    '何時使用：當有多種演算法或策略可選，且希望可替換與擴充時。',
    '概念性使用方式：定義 Strategy 介面（如 execute()）；ConcreteStrategy 實作不同演算法。Context 持有 Strategy，在需要時呼叫 strategy.execute()。客戶端建立 Context 並注入所需 Strategy。',
    '注意事項：策略數量多時可考慮工廠或註冊表；要避免 Context 與 Strategy 間過多耦合。',
  ],
  example: {
    intro: '以下以 Java 為例：Strategy 介面定義演算法，Context 持有 Strategy 並委派。',
    blocks: [
      {
        code: `public interface Strategy {
  int execute(int a, int b);
}
public class AddStrategy implements Strategy {
  @Override public int execute(int a, int b) { return a + b; }
}
public class MultiplyStrategy implements Strategy {
  @Override public int execute(int a, int b) { return a * b; }
}
public class Context {
  private Strategy strategy;
  public void setStrategy(Strategy s) { strategy = s; }
  public int run(int a, int b) { return strategy.execute(a, b); }
}
Context ctx = new Context();
ctx.setStrategy(new AddStrategy());
ctx.run(2, 3); // 5`,
        note: '執行期可更換 Strategy，不需修改 Context。',
      },
    ],
  },
};

PATTERN_CONTENT['template-method'] = {
  nameZh: 'Template Method（樣板方法）',
  explanation: [
    'Template Method 是行為型模式：在「方法」中定義演算法的骨架，將某些步驟延遲到子類別實作。父類別的樣板方法呼叫抽象或預設的步驟，子類別覆寫需要變化的步驟。',
    '為何需要：當多個類別有相同流程但部分步驟實作不同時，把流程固定在父類別可避免重複，並保證順序與鉤子一致。',
    '適用情境：固定流程、可變步驟、框架提供擴充點（子類別實作 hook）。',
    '與其他模式的區別：Strategy 用組合替換整段邏輯；Template Method 用繼承替換步驟。Factory Method 常是 Template Method 的一步（建立物件）。',
  ],
  usage: [
    '何時使用：當有固定流程，其中部分步驟需由子類別提供不同實作時。',
    '概念性使用方式：在抽象類別中定義 templateMethod()，內含呼叫 step1()、step2() 等；step1() 等為抽象或預設實作，子類別覆寫。客戶端呼叫 templateMethod() 即可。',
    '注意事項：繼承的缺點（單一繼承、子類別負擔）；可考慮用組合與委派取代部分繼承。',
  ],
  example: {
    intro: '以下以 Java 為例：抽象類別定義 templateMethod() 呼叫 step1()、step2()，子類別覆寫步驟。',
    blocks: [
      {
        code: `public abstract class AbstractClass {
  public final void templateMethod() {
    step1();
    step2();
  }
  protected abstract void step1();
  protected abstract void step2();
}
public class ConcreteClass extends AbstractClass {
  @Override protected void step1() {
    System.out.println("Step 1");
  }
  @Override protected void step2() {
    System.out.println("Step 2");
  }
}
new ConcreteClass().templateMethod();`,
        note: '流程固定在父類別，子類別只實作可變步驟。',
      },
    ],
  },
};

PATTERN_CONTENT['visitor'] = {
  nameZh: 'Visitor（訪問者）',
  explanation: [
    'Visitor 是行為型模式：將「作用於某結構中元素的操作」分離出來，使操作可擴充而不必修改元素類別。Visitor 定義對每種元素型別的 visit(ElementX)，元素接受 Visitor 並呼叫 visit(this)，形成雙重分派。',
    '為何需要：當在穩定結構上要經常新增「對元素的操作」，若把操作都加在元素類別會違反開閉原則。用 Visitor 可把新操作加在新增的 Visitor 類別，而不改元素。',
    '適用情境：結構穩定、操作常變或需擴充、需依元素型別做不同處理（如型別列舉、序列化、報表）。',
    '與其他模式的區別：Iterator 遍歷；Visitor 對每個元素執行操作。Strategy 替換單一演算法；Visitor 是對整棵結構的操作。',
  ],
  usage: [
    '何時使用：當結構（如 AST、組合樹）穩定，但需要經常新增或變更「對元素的操作」時。',
    '概念性使用方式：定義 Visitor 介面（visit(ElementA)、visit(ElementB)…）；Element 介面有 accept(Visitor)，實作為 visitor.visit(this)。ConcreteVisitor 實作各 visit()。客戶端讓 Visitor 走訪結構。',
    '注意事項：新增元素型別時要改所有 Visitor；雙重分派與語言支援（overload/override）有關。',
  ],
  example: {
    intro: '以下以 Java 為例：Element 有 accept(Visitor)，Visitor 定義 visit(ElementA)、visit(ElementB)。',
    blocks: [
      {
        code: `public interface Visitor {
  void visit(ElementA a);
  void visit(ElementB b);
}
public interface Element {
  void accept(Visitor v);
}
public class ElementA implements Element {
  @Override public void accept(Visitor v) {
    v.visit(this);
  }
}
public class ConcreteVisitor implements Visitor {
  @Override public void visit(ElementA a) {
    System.out.println("Visit A");
  }
  @Override public void visit(ElementB b) {
    System.out.println("Visit B");
  }
}
Element e = new ElementA();
e.accept(new ConcreteVisitor());`,
        note: '新操作時新增 Visitor 類別即可，不需改 Element。',
      },
    ],
  },
};
