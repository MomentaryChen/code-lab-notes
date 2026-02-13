import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Iterator 是行為型模式：提供一種方式「順序存取」聚合物件的元素，而不暴露該聚合的內部表示。迭代器介面通常有 next()、hasNext() 或 currentItem()，讓客戶端能遍歷而不依賴實作。',
  '為何需要：當聚合的內部結構（陣列、樹、圖）不應暴露給客戶端，或希望用統一方式遍歷不同結構時，迭代器封裝遍歷邏輯。',
  '適用情境：需要統一遍歷不同資料結構、需要隱藏聚合內部、需要多個同時進行的遍歷、語言未內建迭代協定時。',
  '與其他模式的區別：Visitor 是「對每個元素做操作」；Iterator 是「順序存取」。Composite 定義結構；Iterator 遍歷結構。',
];
const usage = [
  '何時使用：當需要統一、順序地存取聚合元素且不想暴露內部結構時。',
  '概念性使用方式：定義 Iterator 介面（next()、hasNext() 等）；Aggregate 提供 createIterator() 回傳具體 Iterator；ConcreteIterator 持有聚合參考並維護遍歷位置。客戶端透過 Iterator 遍歷。',
  '注意事項：遍歷中修改聚合可能導致未定義行為；多執行緒時需考慮迭代器狀態。',
];
const example = {
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
};

export default function IteratorPage() {
  const pattern = getPatternBySlug('iterator');
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
