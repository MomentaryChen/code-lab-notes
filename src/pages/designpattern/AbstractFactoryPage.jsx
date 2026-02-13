import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Abstract Factory 是建立型模式：提供一個介面用來建立「一系列相關或相依的物件」而不指定具體類別。每個具體工廠實作該介面，負責產生同一家族的产品（例如現代風家具 vs 古典風家具）。',
  '為何需要：當系統需要多個相關產品一起使用，且希望能整組替換（例如換主題、換資料庫）而不散落一堆 new 時，需要一個能建立整組產品的工廠。',
  '適用情境：UI 主題（按鈕、視窗、捲軸一組）、跨平台元件、不同資料來源的 DAO 家族。',
  '與其他模式的區別：Factory Method 是「一個方法建立一個產品」；Abstract Factory 是「一個工廠介面建立多個相關產品」。Builder 關注步驟與組裝，Abstract Factory 關注產品家族。',
];
const usage = [
  '何時使用：當有多個相關產品需一起建立，且希望能整組替換實作（如換主題、換資料庫）時。',
  '概念性使用方式：定義 AbstractFactory 介面（多個 createX() 方法）；每個具體工廠實作該介面並回傳同一家族的具體產品。客戶端只依賴抽象工廠與抽象產品型別，由注入的具體工廠決定實際類型。',
  '注意事項：新增產品類型時通常要改介面與所有具體工廠；產品家族數或產品種類很多時類別會變多。',
];
const example = {
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
};

export default function AbstractFactoryPage() {
  const pattern = getPatternBySlug('abstract-factory');
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
