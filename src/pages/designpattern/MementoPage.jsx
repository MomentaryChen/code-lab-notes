import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Memento 是行為型模式：在不破壞封裝的前提下，「擷取」物件的內部狀態並外部化，以便之後可「還原」到該狀態。Memento 只由 Originator 寫入，由 Caretaker 持有但不解讀內容。',
  '為何需要：當需要快照、還原、undo 或檢查點機制時，必須保存物件某時刻的狀態，且不希望暴露內部結構給外部。',
  '適用情境：需要 snapshot/restore、undo、檢查點、交易還原。',
  '與其他模式的區別：Command 可做 undo 但常搭配 Memento 存狀態；Prototype 複製物件；Memento 只存狀態以便還原。',
];
const usage = [
  '何時使用：當需要儲存並還原物件狀態，且不想暴露內部實作時。',
  '概念性使用方式：Originator 提供 createMemento() 將自身狀態寫入 Memento，以及 setMemento(m) 從 Memento 還原；Memento 僅暴露給 Originator。Caretaker 持有 Memento 並在適當時機要求還原。',
  '注意事項：狀態大時 Memento 可能佔記憶體；深拷貝與版本管理要考慮清楚。',
];
const example = {
  intro: '以下以 Java 為例：Originator 提供 createMemento() 與 setMemento()，Caretaker 持有 Memento。',
  blocks: [
    {
      code: `public class Memento {
  private final String state;
  public Memento(String state) { this.state = state; }
  public String getState() { return state; }
}
public class Originator {
  private String state;
  public void setState(String s) { state = s; }
  public Memento createMemento() { return new Memento(state); }
  public void setMemento(Memento m) { state = m.getState(); }
}
Originator originator = new Originator();
originator.setState("on");
Memento m = originator.createMemento();
// ... 之後還原
originator.setMemento(m);`,
      note: 'Memento 僅由 Originator 寫入與讀取，對外不暴露內部結構。',
    },
  ],
};

export default function MementoPage() {
  const pattern = getPatternBySlug('memento');
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
