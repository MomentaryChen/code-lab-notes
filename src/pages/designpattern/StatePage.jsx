import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'State 是行為型模式：讓物件的「行為」隨其「內部狀態」改變而改變，並將狀態邏輯從主類別抽離成獨立的 State 類別。Context 持有目前 State，將請求委派給 State；State 可切換 Context 的狀態。',
  '為何需要：當物件行為依狀態不同而差異大，若用一堆 if/switch 會難以維護；把每個狀態封裝成類別可讓邏輯清晰且易擴充。',
  '適用情境：行為明顯依狀態改變、狀態轉換有規則、希望避免大量條件判斷。',
  '與其他模式的區別：Strategy 替換演算法，通常客戶端決定；State 由狀態自己決定何時切換。Strategy 可無狀態；State 代表狀態。',
];
const usage = [
  '何時使用：當物件行為依內部狀態大幅變化，且狀態數不少時。',
  '概念性使用方式：定義 State 介面（handle() 等）；ConcreteState 實作並在適當時機呼叫 Context.setState(nextState)。Context 持有 currentState，請求委派給 currentState.handle()。',
  '注意事項：狀態轉換要明確（誰負責 setState）；避免循環切換或遺漏狀態。',
];
const example = {
  intro: '以下以 Java 為例：Context 持有 State，請求委派給 currentState；State 可切換 Context 的狀態。',
  blocks: [
    {
      code: `public interface State {
  void handle(Context ctx);
}
public class Context {
  private State state;
  public void setState(State s) { state = s; }
  public void request() { state.handle(this); }
}
public class ConcreteStateA implements State {
  @Override
  public void handle(Context ctx) {
    System.out.println("StateA");
    ctx.setState(new ConcreteStateB());
  }
}
Context ctx = new Context();
ctx.setState(new ConcreteStateA());
ctx.request(); // 可能切換到 StateB`,
      note: '狀態邏輯封裝在各自 State 類別，Context 不寫 if/switch。',
    },
  ],
};

export default function StatePage() {
  const pattern = getPatternBySlug('state');
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
