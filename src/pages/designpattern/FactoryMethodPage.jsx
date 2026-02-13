import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Factory Method 是一種建立型設計模式：父類別定義建立物件的介面（工廠方法），由子類別決定要實例化哪一個具體類別。這樣可將「要建立什麼物件」的決策延遲到執行期，並保持與具體類別的鬆散耦合。',
  '為何需要：當無法在編譯期預知要建立的物件類型，或希望擴充產品家族時不修改既有客戶端程式碼，就需要把建立邏輯封裝起來並可被覆寫。',
  '適用情境：框架提供擴充點（子類別覆寫工廠方法以回傳自訂物件）、多個相關產品家族需要一致建立方式、希望集中物件建立邏輯於一處。',
  '與其他模式的區別：Abstract Factory 常以多個工廠方法組成，用來建立一整組相關物件；Simple Factory 只是單一方法回傳不同類型，沒有子類別化。Factory Method 強調「一個方法、子類別決定實例」。',
];
const usage = [
  '何時使用：當你無法預先知道要建立的具體類別，或希望新增產品類型時只新增子類別而不改呼叫端。',
  '概念性使用方式：在建立者類別中定義抽象（或預設）的 factoryMethod()，回傳抽象產品型別；子類別覆寫該方法並 return new ConcreteProduct()。客戶端透過建立者取得產品，而不直接 new 具體類別。',
  '注意事項：可能導致子類別數量增加（每種產品一子類）；若產品類型很固定，簡單工廠或建構子可能就夠用。',
];
const example = {
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
};

export default function FactoryMethodPage() {
  const pattern = getPatternBySlug('factory-method');
  return (
    <PatternPageLayout
      nameZh={pattern.nameZh}
      description={pattern.description}
      explanation={explanation}
      usage={usage}
      example={example}
    />
  );
}
