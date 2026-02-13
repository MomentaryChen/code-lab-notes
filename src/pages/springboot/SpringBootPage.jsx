import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';

export default function SpringBootPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page placeholder-page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/">← 回首頁</Link>
          <h1>Code Lab Notes · Spring Boot</h1>
          <p className="subtitle">
            RESTful API、依賴注入、Spring Data JPA、設定與最佳實踐等說明。
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
        <section style={{ padding: '24px 0', textAlign: 'center' }}>
          <p className="subtitle" style={{ maxWidth: 'none' }}>
            此主軸內容籌備中，敬請期待。
          </p>
          <Link className="back-link" to="/" style={{ marginTop: 16, display: 'inline-block' }}>
            ← 返回首頁
          </Link>
        </section>
      </main>
    </div>
  );
}
