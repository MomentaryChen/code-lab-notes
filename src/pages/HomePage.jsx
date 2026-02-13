import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../useTheme.js';
import '../styles/HomePage.css';

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page home-page">
      <header className="home-header">
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

      <section className="home-hero" aria-label="首頁主視覺">
        <span className="home-hero-badge">學習筆記 · 演算法 · 後端</span>
        <h1 className="home-hero-title">Code Lab Notes</h1>
        <p className="home-hero-subtitle">
          演算法視覺化、Java OOP、Spring Boot 等主題筆記。從下方選擇主軸進入各主題。
        </p>
        <div className="home-hero-about" aria-label="關於作者">
          <p className="home-hero-about-text">
            我是 MomentaryChen，專注於演算法視覺化、Java 物件導向與 Spring Boot 後端開發。
            這裡整理學習筆記與實作，方便複習也分享給同好。
          </p>
          <span className="home-hero-meta">MomentaryChen · v{typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.1'}</span>
        </div>
      </section>

      <main className="home-main">
        <h2 className="home-section-heading">網站主軸</h2>
        <div className="home-pillars">
          <article className="home-pillar home-pillar-link">
            <Link to="/algorithm/lab" className="home-pillar-inner">
              <span className="home-pillar-num">1</span>
              <h3 className="home-pillar-title">演算法</h3>
              <p className="home-pillar-desc">
                A* 路徑搜尋、排序視覺化、貪婪演算法等互動說明與演示。
              </p>
              <span className="home-pillar-cta">
                進入實驗室 <span className="home-pillar-arrow">→</span>
              </span>
            </Link>
          </article>
          <article className="home-pillar home-pillar-link">
            <Link to="/oop" className="home-pillar-inner">
              <span className="home-pillar-num">2</span>
              <h3 className="home-pillar-title">Java OOP</h3>
              <p className="home-pillar-desc">
                物件導向程式設計：封裝、繼承、多型、介面與設計原則等整理。
              </p>
              <span className="home-pillar-cta">
                進入 <span className="home-pillar-arrow">→</span>
              </span>
            </Link>
          </article>
          <article className="home-pillar home-pillar-link">
            <Link to="/springboot" className="home-pillar-inner">
              <span className="home-pillar-num">3</span>
              <h3 className="home-pillar-title">Spring Boot</h3>
              <p className="home-pillar-desc">
                RESTful API、依賴注入、Spring Data JPA、設定與最佳實踐等說明。
              </p>
              <span className="home-pillar-cta">
                進入 <span className="home-pillar-arrow">→</span>
              </span>
            </Link>
          </article>
        </div>
      </main>
    </div>
  );
}
