import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Adapter 是結構型模式：將一個類別的介面轉換成客戶端期望的另一介面，使原本介面不相容的類別能一起工作。Adapter 包裝被轉接者並實作目標介面，在方法內呼叫被轉接者的 API 並轉換參數或回傳值。',
  '為何需要：當要使用既有類別或第三方程式庫，但其介面與目前系統期望的介面不一致時，與其改動既有程式碼，不如加一層 Adapter 轉接。',
  '適用情境：整合 legacy 或第三方 API、讓多個介面不同的實作可被同一套客戶端程式使用、介面轉換而不改動既有類別。',
  '與其他模式的區別：Decorator 增強同一介面；Adapter 是「轉換」成另一介面。Facade 簡化介面但未必改變介面型別；Adapter 明確做介面轉換。',
];
const usage = [
  '何時使用：當有一個類別功能符合需求但介面與你期望的不符，且無法或不想修改該類別時。',
  '概念性使用方式：定義目標介面（客戶端要的）；建立 Adapter 類別實作目標介面並持有被轉接者；Adapter 的方法內呼叫被轉接者並轉換參數/回傳值。客戶端只依賴目標介面，由 Adapter 負責轉接。',
  '注意事項：過多 Adapter 可能讓呼叫鏈變長；若可修改被轉接者，有時直接讓其實作目標介面更簡單。',
];
const example = {
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
};

export default function AdapterPage() {
  const pattern = getPatternBySlug('adapter');
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
