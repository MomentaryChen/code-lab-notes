import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Visitor 是行為型模式：將「作用於某結構中元素的操作」分離出來，使操作可擴充而不必修改元素類別。Visitor 定義對每種元素型別的 visit(ElementX)，元素接受 Visitor 並呼叫 visit(this)，形成雙重分派。',
  '為何需要：當在穩定結構上要經常新增「對元素的操作」，若把操作都加在元素類別會違反開閉原則。用 Visitor 可把新操作加在新增的 Visitor 類別，而不改元素。',
  '適用情境：結構穩定、操作常變或需擴充、需依元素型別做不同處理（如型別列舉、序列化、報表）。',
  '與其他模式的區別：Iterator 遍歷；Visitor 對每個元素執行操作。Strategy 替換單一演算法；Visitor 是對整棵結構的操作。',
];
const usage = [
  '何時使用：當結構（如 AST、組合樹）穩定，但需要經常新增或變更「對元素的操作」時。',
  '概念性使用方式：定義 Visitor 介面（visit(ElementA)、visit(ElementB)…）；Element 介面有 accept(Visitor)，實作為 visitor.visit(this)。ConcreteVisitor 實作各 visit()。客戶端讓 Visitor 走訪結構。',
  '注意事項：新增元素型別時要改所有 Visitor；雙重分派與語言支援（overload/override）有關。',
];
const example = {
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
};

export default function VisitorPage() {
  const pattern = getPatternBySlug('visitor');
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
