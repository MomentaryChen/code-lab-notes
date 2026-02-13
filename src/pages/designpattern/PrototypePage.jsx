import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Prototype 是建立型模式：透過「複製既有物件」來建立新物件，而不是用類別建構子 new。被複製的物件稱為原型；複製可以是淺拷貝或深拷貝，依需求實作。',
  '為何需要：當 new 的成本高（例如要讀檔、連線、複雜計算），或希望新物件與某既有物件狀態幾乎相同只改少數欄位時，複製比重新建構更合適。也可避免子類別爆炸（用組合與複製取代繼承）。',
  '適用情境：建立成本高且與現有實例相似、系統需動態載入類別而無法事先知道具體類別、需要還原或複製複雜狀態。',
  '與其他模式的區別：Factory 系列由工廠「建立」新物件；Prototype 由「物件自己複製自己」。與 Memento 不同：Memento 是狀態快照與還原，Prototype 是產生新物件。',
];
const usage = [
  '何時使用：當建立新實例的成本高、或新物件與某實例狀態相近只需微調時。',
  '概念性使用方式：原型類別實作 clone()（或 copy()），在內部複製自身並回傳；可選 PrototypeManager 註冊多個原型供客戶端依名稱取得並 clone。客戶端不 new，改為取得原型後呼叫 clone()。',
  '注意事項：深拷貝要處理巢狀物件與循環參照；clone 的語意要明確（淺/深、是否共用內部狀態）。',
];
const example = {
  intro: '以下以 Java 為例：實作 Cloneable 並覆寫 clone()，或提供 copy 建構子。',
  blocks: [
    {
      code: `// 原型類別
public class Document implements Cloneable {
  private String title;
  private List<String> paragraphs;
  public void setTitle(String s) { title = s; }

  @Override
  public Document clone() {
    try {
      Document copy = (Document) super.clone();
      copy.paragraphs = new ArrayList<>(paragraphs);
      return copy;
    } catch (CloneNotSupportedException e) {
      throw new RuntimeException(e);
    }
  }
}

// 使用：複製既有物件而非 new
Document template = loadTemplate();
Document newDoc = template.clone();
newDoc.setTitle("新文件");`,
      note: '深拷貝時需複製巢狀集合，避免共用參考。',
    },
  ],
};

export default function PrototypePage() {
  const pattern = getPatternBySlug('prototype');
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
