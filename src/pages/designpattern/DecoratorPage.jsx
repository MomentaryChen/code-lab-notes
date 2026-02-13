import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Decorator 是結構型模式：動態地為物件「附加」額外職責，比子類別化更彈性。Decorator 與被裝飾物件實作同一介面，並持有被裝飾物件的參考，在方法內先呼叫被裝飾物件再加上自己的行為（或取代）。',
  '為何需要：當需要為物件增加行為，但用繼承會導致類別爆炸（各種組合）或無法在執行期動態組合時，用包裝一層一層疊加職責。',
  '適用情境：為個別物件動態加上職責、可組合的附加行為（如加密、壓縮、日誌）、不想用子類別擴充時。',
  '與其他模式的區別：Adapter 改變介面；Decorator 保持同一介面並增強。Composite 是樹狀；Decorator 是鏈狀包裝。Strategy 替換演算法；Decorator 疊加行為。',
];
const usage = [
  '何時使用：當要動態、可組合地為物件增加職責，且不想用大量子類別時。',
  '概念性使用方式：定義與 Component 相同介面的 Decorator，並持有 Component；ConcreteDecorator 在呼叫被包裝物件前後加上自己的邏輯。客戶端用多個 Decorator 包裝同一 Component。',
  '注意事項：裝飾順序可能影響行為；多層包裝時除錯要追蹤整條鏈；若職責很固定，繼承可能更直觀。',
];
const example = {
  intro: '以下以 Java 為例：Decorator 與 Component 同一介面，包裝被裝飾者並在呼叫前後加上行為。',
  blocks: [
    {
      code: `// Component
public interface DataSource {
  void writeData(String data);
}
public class FileDataSource implements DataSource {
  @Override public void writeData(String data) { /* 寫檔 */ }
}

// Decorator
public abstract class DataSourceDecorator implements DataSource {
  protected final DataSource wrapped;
  protected DataSourceDecorator(DataSource w) { wrapped = w; }
}
public class EncryptionDecorator extends DataSourceDecorator {
  @Override
  public void writeData(String data) {
    wrapped.writeData(encrypt(data));
  }
}

DataSource ds = new EncryptionDecorator(new FileDataSource());
ds.writeData("hello"); // 先加密再寫入`,
      note: '可多層疊加（壓縮、加密等），與 Component 介面一致。',
    },
  ],
};

export default function DecoratorPage() {
  const pattern = getPatternBySlug('decorator');
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
