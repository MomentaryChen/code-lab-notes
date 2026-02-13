import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Builder 是建立型模式：將複雜物件的建構「步驟」與「表現」分離，使相同建構過程可產出不同表現。Director 依序呼叫 Builder 的步驟，ConcreteBuilder 實作每一步並組裝出最終產品。',
  '為何需要：當建構邏輯很複雜（多參數、可選參數、步驟有順序或條件），若全塞在建構子會難以閱讀與維護；且有時希望同一套步驟能產出不同表示（例如同一份資料輸出 HTML 或純文字）。',
  '適用情境：物件有許多可選參數、建構步驟多且可能依情境變化、需要與產品表示分離的建構流程。',
  '與其他模式的區別：Abstract Factory 回傳整組產品；Builder 一步步組裝一個產品。Factory Method 只負責「建立哪一個」，Builder 負責「怎麼一步步建」。',
];
const usage = [
  '何時使用：當物件建構很複雜（多可選參數、多步驟）或希望建構過程與最終表示分離時。',
  '概念性使用方式：定義 Builder 介面（如 setA()、setB()、build()）；ConcreteBuilder 實作並在內部組裝產品；可選 Director 依固定順序呼叫 builder 的步驟。客戶端取得 builder 後呼叫步驟再 build() 取得產品。',
  '注意事項：若產品很簡單，builder 可能過度設計；需注意 build() 呼叫時機與產品不可變性（是否允許建構後再改）。',
];
const example = {
  intro: '以下以 Java 為例：Builder 介面定義步驟與 build()，具體 Builder 組裝產品。',
  blocks: [
    {
      code: `// 產品
public class Report {
  private String header, body, footer;
  public void setHeader(String s) { header = s; }
  public void setBody(String s) { body = s; }
  public void setFooter(String s) { footer = s; }
}

// Builder 介面
public interface ReportBuilder {
  ReportBuilder header(String s);
  ReportBuilder body(String s);
  ReportBuilder footer(String s);
  Report build();
}

// 具體 Builder
public class PdfReportBuilder implements ReportBuilder {
  private Report report = new Report();
  @Override public ReportBuilder header(String s) {
    report.setHeader("[PDF] " + s); return this;
  }
  @Override public Report build() { return report; }
  // ... body, footer 類似
}

// 使用
Report r = new PdfReportBuilder().header("Title").body("Content").footer("End").build();`,
      note: 'Director 可依固定順序呼叫 builder 的步驟，封裝常用組裝流程。',
    },
  ],
};

export default function BuilderPage() {
  const pattern = getPatternBySlug('builder');
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
