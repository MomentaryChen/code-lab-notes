import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Mediator 是行為型模式：用「中介物件」封裝一組物件間的互動，使物件彼此不直接參照，降低耦合。物件只與 Mediator 通訊，由 Mediator 協調誰該做什麼。',
  '為何需要：當多個物件互相依賴、溝通複雜（網狀參照）時，改為都與中介者溝通可變成星狀結構，易於維護與擴充。',
  '適用情境：物件間互動複雜、希望集中協調邏輯、需要簡化多對多關係（如表單欄位、聊天室成員）。',
  '與其他模式的區別：Observer 是一對多通知；Mediator 是多對多經由中介。Facade 簡化對子系統的呼叫；Mediator 協調同層物件間的互動。',
];
const usage = [
  '何時使用：當多個物件需要互相溝通且互動複雜，希望集中協調時。',
  '概念性使用方式：定義 Mediator 介面與 ConcreteMediator；Colleague 持有 Mediator 參考，在需要與其他 Colleague 互動時透過 Mediator 傳遞。Mediator 知道所有 Colleague 並協調其行為。',
  '注意事項：Mediator 可能變得過於龐大；要避免把太多業務邏輯塞進單一 Mediator。',
];
const example = {
  intro: '以下以 Java 為例：Colleague 透過 Mediator 與其他 Colleague 溝通，不直接參照。',
  blocks: [
    {
      code: `public interface Mediator {
  void notify(Colleague sender, String msg);
}
public abstract class Colleague {
  protected Mediator mediator;
  public Colleague(Mediator m) { mediator = m; }
}
public class ConcreteColleagueA extends Colleague {
  public void doSomething() {
    mediator.notify(this, "A done");
  }
}
public class ConcreteMediator implements Mediator {
  private ConcreteColleagueA a;
  private ConcreteColleagueB b;
  @Override
  public void notify(Colleague sender, String msg) {
    if (sender == a) b.receive(msg);
    else if (sender == b) a.receive(msg);
  }
}`,
      note: 'Mediator 集中協調邏輯，Colleague 彼此解耦。',
    },
  ],
};

export default function MediatorPage() {
  const pattern = getPatternBySlug('mediator');
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
