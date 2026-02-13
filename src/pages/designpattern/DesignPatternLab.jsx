import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';

export default function DesignPatternLab() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/">← 回首頁</Link>
          <h1>Code Lab Notes · 設計模式</h1>
          <p className="subtitle">
            建立型（Creational）、結構型（Structural）、行為型（Behavioral）等設計模式說明與範例。從下方選擇主題進入。
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
      <main>
        <section className="algorithms-grid" style={{ maxWidth: '900px' }}>
          <h2 className="section-title">設計模式列表</h2>
          <ul className="side-list" style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <div className="side-bullet" />
              <div>
                <Link to="/design-pattern/singleton">Singleton（單例模式）</Link>
                <div>確保類別只有一個實例，並提供全域存取點；常見於設定、連線池等。</div>
              </div>
            </li>
          </ul>
          <p style={{ marginTop: '24px' }}>
            <Link className="back-link" to="/">← 返回首頁</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
