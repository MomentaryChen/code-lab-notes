import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Observer 是行為型模式：定義物件間的一對多相依，當「主題」（Subject）狀態改變時，所有「觀察者」（Observer）會自動收到通知並更新。主題維持觀察者清單，在狀態變更時遍歷並通知。',
  '為何需要：當多個物件需依賴某物件的狀態並保持同步，且希望主題與觀察者解耦（主題不需知道觀察者具體型別）時，用訂閱/通知機制。',
  '適用情境：事件驅動、模型-視圖同步、即時資料推送、GUI 綁定。',
  '與其他模式的區別：Mediator 協調多對多；Observer 是一對多。Pub/Sub 常透過訊息佇列；Observer 通常是同步、同 process。',
];
const usage = [
  '何時使用：當一個物件狀態改變需通知多個依賴者，且希望鬆散耦合時。',
  '概念性使用方式：Subject 維護 Observer 列表（attach/detach），狀態改變時呼叫各 Observer 的 update()。Observer 介面只有 update()；ConcreteObserver 在 update() 內從 Subject 拉取所需資料並更新自己。',
  '注意事項：通知順序與效能（大量觀察者時）；避免在通知中修改主題導致遞迴；考慮用非同步或佇列減少耦合。',
];
const example = {
  intro: '以下為經典 Java Observer 介面與主題實作；Spring 中可用 ApplicationEventPublisher 達成類似效果。',
  blocks: [
    {
      code: `// Observer 介面與 Subject
public interface Observer {
  void update(String state);
}
public abstract class Subject {
  private final List<Observer> observers = new ArrayList<>();
  public void attach(Observer o) { observers.add(o); }
  public void detach(Observer o) { observers.remove(o); }
  protected void notifyObservers(String state) {
    for (Observer o : observers) o.update(state);
  }
}

// 具體主題狀態改變時通知
public class ConcreteSubject extends Subject {
  private String state;
  public void setState(String s) {
    this.state = s;
    notifyObservers(state);
  }
}`,
      note: 'Spring 中可發佈 ApplicationEvent，並以 @EventListener 訂閱，由容器負責一對多通知。',
    },
  ],
};

export default function ObserverPage() {
  const pattern = getPatternBySlug('observer');
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
