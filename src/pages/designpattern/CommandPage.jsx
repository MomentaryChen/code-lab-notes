import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Command 是行為型模式：將「請求」封裝成物件，使請求可被參數化、佇列化、記錄（undo）、或在不同情境重複使用。Command 介面通常有 execute()，必要時有 undo()。',
  '為何需要：當需要將操作請求與執行分離（如排程、佇列、復原）、或需要支援巨集／批次操作時，把請求當成物件可延遲執行、記錄、重做。',
  '適用情境：需要 undo/redo、需要佇列或排程請求、需要記錄操作日誌、GUI 選單/按鈕與操作解耦。',
  '與其他模式的區別：Strategy 替換演算法；Command 封裝單次請求。Memento 存狀態；Command 存操作。',
];
const usage = [
  '何時使用：當需要將請求參數化、佇列化、記錄或支援復原時。',
  '概念性使用方式：定義 Command 介面（execute()、可選 undo()）；ConcreteCommand 持有 Receiver 的參考並在 execute() 內呼叫 Receiver 的方法；Invoker 持有 Command 並在適當時機呼叫 execute()。客戶端建立 Command 並交給 Invoker。',
  '注意事項：Undo 需額外實作狀態儲存；大量 Command 類別時可考慮用 lambda 或函式物件簡化。',
];
const example = {
  intro: '以下以 Java 為例：Command 介面含 execute()，ConcreteCommand 持有 Receiver，Invoker 呼叫 Command。',
  blocks: [
    {
      code: `public interface Command {
  void execute();
}
public class Light {
  public void on() {}
  public void off() {}
}
public class LightOnCommand implements Command {
  private final Light light;
  public LightOnCommand(Light l) { light = l; }
  @Override public void execute() { light.on(); }
}
public class Invoker {
  private Command command;
  public void setCommand(Command c) { command = c; }
  public void press() { command.execute(); }
}
Invoker invoker = new Invoker();
invoker.setCommand(new LightOnCommand(light));
invoker.press();`,
      note: '可將 Command 放入佇列、記錄以便 undo/redo。',
    },
  ],
};

export default function CommandPage() {
  const pattern = getPatternBySlug('command');
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
