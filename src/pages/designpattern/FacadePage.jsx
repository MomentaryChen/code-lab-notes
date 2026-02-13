import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Facade 是結構型模式：為子系統提供一個「簡化的統一介面」，讓客戶端更容易使用子系統，並降低客戶端與子系統內多個類別的耦合。Facade 將多個類別的呼叫組合成少數高階方法。',
  '為何需要：當子系統很複雜、類別很多、或客戶端只需要常用流程時，直接依賴多個類別會難以使用且易出錯。用一個 Facade 封裝常用流程可簡化介面。',
  '適用情境：簡化複雜子系統的使用、層級化子系統（每層一個 Facade）、為 legacy 提供簡化介面。',
  '與其他模式的區別：Adapter 做介面「轉換」；Facade 做介面「簡化」且未必改變型別。Facade 通常不新增行為，只是組合既有呼叫。',
];
const usage = [
  '何時使用：當子系統複雜、類別多，而客戶端只需要少數常用流程時。',
  '概念性使用方式：建立 Facade 類別，內部持有或使用子系統內多個類別；對外提供少數方法（如 startServer()、processOrder()），在方法內依序呼叫子系統。客戶端只依賴 Facade。',
  '注意事項：Facade 可能變成「上帝類別」若塞太多邏輯；子系統仍可被進階客戶端直接使用。',
];
const example = {
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
};

export default function FacadePage() {
  const pattern = getPatternBySlug('facade');
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
