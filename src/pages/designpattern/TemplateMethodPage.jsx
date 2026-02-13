import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Template Method 是行為型模式：在「方法」中定義演算法的骨架，將某些步驟延遲到子類別實作。父類別的樣板方法呼叫抽象或預設的步驟，子類別覆寫需要變化的步驟。',
  '為何需要：當多個類別有相同流程但部分步驟實作不同時，把流程固定在父類別可避免重複，並保證順序與鉤子一致。',
  '適用情境：固定流程、可變步驟、框架提供擴充點（子類別實作 hook）。',
  '與其他模式的區別：Strategy 用組合替換整段邏輯；Template Method 用繼承替換步驟。Factory Method 常是 Template Method 的一步（建立物件）。',
];
const usage = [
  '何時使用：當有固定流程，其中部分步驟需由子類別提供不同實作時。',
  '概念性使用方式：在抽象類別中定義 templateMethod()，內含呼叫 step1()、step2() 等；step1() 等為抽象或預設實作，子類別覆寫。客戶端呼叫 templateMethod() 即可。',
  '注意事項：繼承的缺點（單一繼承、子類別負擔）；可考慮用組合與委派取代部分繼承。',
];
const example = {
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
};

export default function TemplateMethodPage() {
  const pattern = getPatternBySlug('template-method');
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
