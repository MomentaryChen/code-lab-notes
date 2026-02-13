import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Chain of Responsibility 是行為型模式：將請求沿著「處理者」鏈傳遞，直到有物件處理為止。每個處理者持有下一個處理者的參考，可選擇處理請求或轉給下一位。',
  '為何需要：當多個物件都可能處理同一請求，但事先不知道該由誰處理，或希望發送者與處理者解耦時，用鏈條讓請求依序被嘗試。',
  '適用情境：多個候選處理者、需動態指定鏈條順序、請求得由其中一個處理（如事件處理、審核流程、過濾器）。',
  '與其他模式的區別：Decorator 是層層增強；責任鏈是「傳下去直到有人處理」。Command 封裝請求；責任鏈是傳遞與處理。',
];
const usage = [
  '何時使用：當多個物件都可能處理請求，且希望發送者不需知道具體處理者時。',
  '概念性使用方式：定義 Handler 介面（handleRequest()、setNext()）；ConcreteHandler 實作並在 handleRequest() 內決定是否處理或呼叫 next.handleRequest()。客戶端組裝鏈並從頭傳入請求。',
  '注意事項：要保證請求最終被處理或明確拒絕，避免無止境傳遞；鏈的組裝與順序要清楚。',
];
const example = {
  intro: '以下以 Java 為例：Handler 介面含 setNext 與 handle，ConcreteHandler 決定是否處理或轉給 next。',
  blocks: [
    {
      code: `public abstract class Handler {
  protected Handler next;
  public void setNext(Handler h) { next = h; }
  public void handle(String request) {
    if (canHandle(request)) {
      doHandle(request);
    } else if (next != null) {
      next.handle(request);
    }
  }
  protected abstract boolean canHandle(String request);
  protected abstract void doHandle(String request);
}
public class ConcreteHandlerA extends Handler {
  @Override protected boolean canHandle(String r) {
    return r.startsWith("A");
  }
  @Override protected void doHandle(String r) {
    System.out.println("A handled: " + r);
  }
}
Handler a = new ConcreteHandlerA();
Handler b = new ConcreteHandlerB();
a.setNext(b);
a.handle("A1");`,
      note: '請求沿鏈傳遞，直到有 Handler 處理或鏈結束。',
    },
  ],
};

export default function ChainOfResponsibilityPage() {
  const pattern = getPatternBySlug('chain-of-responsibility');
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
