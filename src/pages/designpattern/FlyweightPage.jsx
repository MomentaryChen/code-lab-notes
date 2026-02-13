import React from 'react';
import PatternPageLayout from './PatternPageLayout.jsx';
import { getPatternBySlug } from './patternList.js';

const explanation = [
  'Flyweight 是結構型模式：以「共享」方式有效支援大量細粒度物件，節省記憶體。共用的內在狀態（intrinsic）存在 Flyweight 中並被多處共享；外在狀態（extrinsic）由客戶端在呼叫時傳入，不儲存在 Flyweight 內。',
  '為何需要：當系統需要大量相似物件（如字元、圖元、樹葉），若每個都存完整狀態會耗盡記憶體。若把可共用的部分抽出來共享，可大幅減少記憶體。',
  '適用情境：大量相似物件、可區分內在（可共享）與外在（每次不同）狀態、物件可被少數共享實例代表。',
  '與其他模式的區別：Singleton 是單一實例；Flyweight 是「少數共享實例」對應多個邏輯物件。Object pool 是重用可變物件；Flyweight 是共享不可變的內在狀態。',
];
const usage = [
  '何時使用：當需要大量細粒度物件且其多數狀態可共享時。',
  '概念性使用方式：將物件狀態拆成 intrinsic（可共享）與 extrinsic（每次不同）；Flyweight 只存 intrinsic，factory 管理共享的 Flyweight 實例；客戶端呼叫時傳入 extrinsic。',
  '注意事項：辨識內在/外在狀態是關鍵；若外在狀態很大或計算成本高，節省可能有限。',
];
const example = {
  intro: '以下以 Java 為例：共用的字元型別（內在狀態）由 Factory 管理，外在狀態（位置、顏色）由呼叫端傳入。',
  blocks: [
    {
      code: `// Flyweight：只存內在狀態
public class CharacterFlyweight {
  private final char symbol;
  public CharacterFlyweight(char c) { symbol = c; }
  public void draw(int x, int y) {
    System.out.println(symbol + " at " + x + "," + y);
  }
}

// Factory 快取共用實例
public class FlyweightFactory {
  private final Map<Character, CharacterFlyweight> cache = new HashMap<>();
  public CharacterFlyweight get(char c) {
    return cache.computeIfAbsent(c, CharacterFlyweight::new);
  }
}

FlyweightFactory f = new FlyweightFactory();
f.get('A').draw(0, 0);
f.get('A').draw(1, 1); // 同一實例，不同外在狀態`,
      note: '大量重複字元時可大幅減少物件數量。',
    },
  ],
};

export default function FlyweightPage() {
  const pattern = getPatternBySlug('flyweight');
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
