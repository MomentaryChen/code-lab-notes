import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Composite 是結構型模式：將物件組合成樹狀結構，使客戶端能「一致地」對待個別物件（Leaf）與組合（Composite）。Composite 可包含子節點（Leaf 或 Composite），並將操作遞迴傳給子節點。',
  '為何需要：當部分與整體具有相同操作介面（例如檔案與資料夾都可「列出」、「計算大小」），且需要樹狀結構時，用 Composite 可讓客戶端不用區分是單一節點還是子樹。',
  '適用情境：樹狀結構、部分-整體層級、需對整棵樹或單一節點做相同操作（列印、計算、搜尋）。',
  '與其他模式的區別：Decorator 只有一層包裝；Composite 是樹狀多層。Iterator 遍歷聚合；Composite 定義的是結構與一致介面。',
];
const usage = [
  '何時使用：當你有樹狀結構，且希望對「單一節點」與「整棵子樹」用同一套操作時。',
  '概念性使用方式：定義 Component 介面（共通的 operation() 等）；Leaf 實作並直接處理；Composite 實作並持有子 Component 列表，operation() 時遍歷子節點並呼叫其 operation()。客戶端只依賴 Component。',
  '注意事項：子節點管理（新增/移除）放在 Composite 還是 Component 需依需求決定；過深或過大的樹要注意效能。',
];
const example = {
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
};

export default function CompositePage() {
  const pattern = getPatternBySlug('composite');
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
