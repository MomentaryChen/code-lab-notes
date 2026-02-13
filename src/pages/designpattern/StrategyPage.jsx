import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Strategy 是行為型模式：定義「演算法家族」，並使它們可互換；將演算法與使用它的客戶端分離。Context 持有 Strategy，將工作委派給 Strategy；可於執行期更換 Strategy。',
  '為何需要：當同一問題有多種解法（如排序、壓縮、定價），且希望能在執行期選擇或替換時，把演算法抽成策略可避免在 Context 裡塞滿條件。',
  '適用情境：多種演算法可互換、希望隱藏演算法實作、需要執行期切換行為。',
  '與其他模式的區別：State 依內部狀態改變行為；Strategy 由外部注入。Template Method 用繼承固定骨架；Strategy 用組合替換整段邏輯。',
];
const usage = [
  '何時使用：當有多種演算法或策略可選，且希望可替換與擴充時。',
  '概念性使用方式：定義 Strategy 介面（如 execute()）；ConcreteStrategy 實作不同演算法。Context 持有 Strategy，在需要時呼叫 strategy.execute()。客戶端建立 Context 並注入所需 Strategy。',
  '注意事項：策略數量多時可考慮工廠或註冊表；要避免 Context 與 Strategy 間過多耦合。',
];
const example = {
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
};

export default function StrategyPage() {
  const pattern = getPatternBySlug('strategy');
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
