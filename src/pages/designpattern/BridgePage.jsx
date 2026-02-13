import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Bridge 是結構型模式：將「抽象」與「實作」分離，使兩者可獨立變化。這裡的實作指的是底層實作（如繪圖 API、儲存後端），抽象指的是高層邏輯（如視窗、形狀）。用組合取代繼承，避免類別階層爆炸。',
  '為何需要：當用繼承同時擴充「抽象維度」與「實作維度」時，會產生大量子類別（如 Shape × Color × Renderer）。將實作抽成獨立階層並以組合注入，可分別擴充。',
  '適用情境：抽象與實作需獨立擴充、多個維度變化會導致繼承組合爆炸、希望執行期可切換實作。',
  '與其他模式的區別：Strategy 替換演算法；Bridge 分離抽象與實作兩套階層。Adapter 做介面轉換；Bridge 是結構分離。',
];
const usage = [
  '何時使用：當你有兩個可獨立變化的維度（如形狀 × 繪圖 API），希望避免子類別數量乘積成長時。',
  '概念性使用方式：定義 Abstraction 持有 Implementor；Implementor 介面定義底層操作，ConcreteImplementor 實作（如不同 API）。Abstraction 將請求委派給 implementor。客戶端組合 abstraction 與 implementor。',
  '注意事項：若只有一個實作或抽象不會變，可能不需要 Bridge；設計時要清楚劃分「抽象」與「實作」的邊界。',
];
const example = {
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
};

export default function BridgePage() {
  const pattern = getPatternBySlug('bridge');
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
