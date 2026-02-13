import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Proxy 是結構型模式：為其他物件提供「代理」以控制對該物件的存取。Proxy 與實際物件實作同一介面，客戶端透過 Proxy 存取；Proxy 可在轉發前後加入延遲載入、權限檢查、快取、紀錄等。',
  '為何需要：當直接存取物件不方便或不可取時（例如物件在遠端、建立成本高、需要存取控制），需要一層代理來延遲、控制或優化存取。',
  '適用情境：虛擬代理（延遲建立）、保護代理（權限）、遠端代理（RPC）、快取代理、智慧參考（計數、釋放）。',
  '與其他模式的區別：Decorator 增強行為；Proxy 控制存取。Adapter 轉換介面；Proxy 保持介面。外觀簡化介面；Proxy 通常保持相同介面。',
];
const usage = [
  '何時使用：當需要控制、延遲或優化對某物件的存取時。',
  '概念性使用方式：定義與 RealSubject 相同介面的 Proxy，並持有 RealSubject（或其建立方式）；Proxy 的方法內依需求建立、快取、檢查權限後再轉呼叫給 RealSubject。客戶端依賴介面，使用 Proxy。',
  '注意事項：要清楚區分 Proxy 的職責（延遲/快取/權限），避免單一 Proxy 做太多事；注意線程安全與生命週期。',
];
const example = {
  intro: '以下以 Java 為例：Proxy 實作與 RealSubject 相同介面，在轉發前加入延遲載入或權限檢查。',
  blocks: [
    {
      code: `// Subject 介面
public interface Image {
  void display();
}
public class RealImage implements Image {
  public RealImage(String path) { loadFromDisk(path); }
  @Override public void display() { System.out.println("Display"); }
  private void loadFromDisk(String path) {}
}

// Proxy：延遲建立 RealImage
public class ProxyImage implements Image {
  private RealImage real;
  private final String path;
  public ProxyImage(String path) { this.path = path; }
  @Override
  public void display() {
    if (real == null) real = new RealImage(path);
    real.display();
  }
}

Image img = new ProxyImage("photo.jpg");
img.display(); // 第一次才載入`,
      note: '可改為快取代理、保護代理等，介面不變。',
    },
  ],
};

export default function ProxyPage() {
  const pattern = getPatternBySlug('proxy');
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
