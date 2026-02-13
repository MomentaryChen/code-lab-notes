import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';

export default function SingletonPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page placeholder-page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/design-pattern">← 回設計模式</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link className="back-link" to="/">回首頁</Link>
          <h1>Code Lab Notes · Singleton 單例模式</h1>
          <p className="subtitle">
            確保類別只有一個實例，並提供全域存取點。
          </p>
        </div>
        <div className="theme-toggle" role="group" aria-label="色彩主題切換">
          <button
            type="button"
            className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
            data-theme="dark"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme('dark')}
          >
            暗色
          </button>
          <button
            type="button"
            className={`theme-button ${theme === 'light' ? 'active' : ''}`}
            data-theme="light"
            aria-pressed={theme === 'light'}
            onClick={() => setTheme('light')}
          >
            亮色
          </button>
        </div>
      </header>
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '0 16px 48px' }}>
        {/* T007: 解釋區塊 */}
        <section style={{ marginTop: '24px' }}>
          <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>何謂 Singleton（單例模式）</h2>
          <p className="description" style={{ lineHeight: 1.7 }}>
            Singleton 是一種建立型設計模式，目的在保證某個類別在整個應用程式中只有一個實例（instance），並提供一個全域的存取點讓其他程式取得這個實例。
          </p>
          <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
            <strong>為何需要：</strong>當多個地方共用同一份資源（例如設定檔、資料庫連線池、日誌記錄器、執行緒池）時，若各自 new 出多個實例，可能造成資源浪費、狀態不一致或重複初始化。單例可集中管理這份唯一實例，避免重複建立。
          </p>
          <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
            <strong>適用情境：</strong>需要嚴格控制實例數量的場景——例如全域設定、快取、連線管理、執行緒池等。若只是「目前剛好只用一個」但未來可能擴充，則不一定要用 Singleton。
          </p>
          <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
            <strong>與其他模式的區別：</strong>Factory 負責「建立物件」、Builder 負責「組裝複雜物件」；Singleton 則強調「只有一個實例」。簡單工廠可能回傳同一實例，但意圖不同——Singleton 的意圖就是保證唯一性。
          </p>
        </section>

        {/* T008: 使用介紹區塊 */}
        <section style={{ marginTop: '32px' }}>
          <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>何時使用與概念性使用方式</h2>
          <p className="description" style={{ lineHeight: 1.7 }}>
            <strong>何時使用：</strong>當你明確需要「全系統只有一個」的物件時——例如應用程式設定、資料庫連線管理、日誌、或某個服務的 facade。若只是模組內共用，可考慮依賴注入或傳參，不一定用 Singleton。
          </p>
          <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
            <strong>概念性使用方式：</strong>類別將建構子設為 private，對外只提供一個 static 方法（如 <code>getInstance()</code>）回傳唯一實例；第一次呼叫時建立實例並快取，之後一律回傳同一實例。
          </p>
          <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
            <strong>注意事項與常見陷阱：</strong>
          </p>
          <ul style={{ lineHeight: 1.8, paddingLeft: '1.5rem', marginTop: '8px' }}>
            <li>多執行緒環境下須考慮 thread-safety（懶漢式可用 double-checked locking 或 volatile；或使用餓漢式／靜態內部類別）。</li>
            <li>過度使用會讓依賴隱藏、測試時難以替換（mock），可考慮用依賴注入容器管理「單一實例」而非手寫 Singleton 類別。</li>
            <li>在 Spring 等 IoC 容器中，預設 scope 為 singleton，由容器保證唯一性，通常不需再手寫 Singleton 類別。</li>
          </ul>
        </section>

        {/* T009: Java / Spring Boot 程式範例 */}
        <section style={{ marginTop: '32px' }}>
          <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>範例：Java 與 Spring Boot</h2>
          <p className="description" style={{ lineHeight: 1.7, marginBottom: '12px' }}>
            以下為經典 Java 單例寫法（懶漢式、雙重檢查鎖），以及 Spring 中以 <code>@Component</code> 預設 singleton scope 的用法。
          </p>
          <pre style={{
            background: 'var(--card-bg, #1e293b)',
            color: 'var(--text, #e2e8f0)',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            lineHeight: 1.5,
          }}
          >
{`// 經典 Java 單例（雙重檢查鎖，thread-safe）
public class ConfigManager {
  private static volatile ConfigManager instance;

  private ConfigManager() {}

  public static ConfigManager getInstance() {
    if (instance == null) {
      synchronized (ConfigManager.class) {
        if (instance == null) {
          instance = new ConfigManager();
        }
      }
    }
    return instance;
  }
}`}
          </pre>
          <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
            在 Spring Boot 中，由容器管理 Bean 生命週期，預設即為 singleton：同一 Bean 在整個應用中只有一個實例，無需手寫 getInstance()。
          </p>
          <pre style={{
            background: 'var(--card-bg, #1e293b)',
            color: 'var(--text, #e2e8f0)',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            marginTop: '8px',
          }}
          >
{`// Spring Boot：預設 singleton，全應用共用同一實例
@Component
public class AppConfigService {
  // 注入處拿到的都是同一個 AppConfigService 實例
}`}
          </pre>
        </section>

        <p style={{ marginTop: '32px' }}>
          <Link className="back-link" to="/design-pattern">← 回設計模式</Link>
          <span style={{ margin: '0 12px' }}>·</span>
          <Link className="back-link" to="/">返回首頁</Link>
        </p>
      </main>
    </div>
  );
}
