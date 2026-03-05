import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';
import RateLimitingVisualization from '../../components/RateLimiting/RateLimitingVisualization.jsx';

export default function SystemArchitecturePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page placeholder-page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/">← 回首頁</Link>
          <h1>Code Lab Notes · 系統架構</h1>
          <p className="subtitle">
            限流、Hystrix（熔斷）等系統架構與容錯概念介紹與常見情境說明。
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
        <p className="subtitle" style={{ marginBottom: '1.5rem' }}>
          本區塊介紹系統架構中常見的兩大主題：限流（Rate Limiting）與壟斷（Monopoly），協助理解分散式系統設計與資源分配時的重要概念。
        </p>

        <section id="rate-limiting" aria-labelledby="rate-limiting-heading">
          <h2 id="rate-limiting-heading">限流</h2>
          <p>
            限流（Rate Limiting）是指在系統中對請求的頻率或數量進行控制，避免單一來源或整體負載超過系統負荷。主要目的包括：保護後端服務不被過多請求壓垮、公平分配資源給多個使用者、以及防禦惡意或異常流量（如 DDoS、爬蟲濫用）。
          </p>
          <p>
            常見情境包括：API 依呼叫次數或 QPS 限制、登入失敗次數限制、排隊或佇列長度上限、以及依使用者或 IP 的配額管理。實作上可依需求選擇固定視窗、滑動視窗、Token Bucket 等策略；本介紹以概念與目的為主，不涉及具體實作細節。
          </p>
        </section>

        <section id="rate-limiting-visualization" aria-label="限流策略可視化實驗室（互動動畫區）">
          <RateLimitingVisualization />
        </section>

        <section id="hystrix" aria-labelledby="hystrix-heading">
          <h2 id="hystrix-heading">Hystrix</h2>
          <p>
            Hystrix 最初是 Netflix 提出的延遲與容錯程式庫，也是一組常見的架構模式總稱：透過<strong>熔斷（Circuit Breaker）</strong>、<strong>隔離</strong>與<strong>資源保護</strong>，避免單一服務或下游依賴出現異常時拖垮整個系統。當偵測到錯誤率或延遲升高時，熔斷器會暫時「斷開」對該服務的呼叫，讓系統以可預期的方式退化，而不是連鎖失敗。
          </p>
          <p>
            典型情境包括：保護依賴外部 API 或資料庫的關鍵服務、在尖峰時段自動降級非必要功能（例如顯示快取資料或簡化介面）、以及透過儀表板監控各服務的成功率與延遲。現代架構中雖可使用 Resilience4j、Service Mesh 等替代方案，但「Hystrix」仍常被用來代表這類熔斷與容錯設計思維。
          </p>
        </section>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className="back-link" to="/">← 返回首頁</Link>
        </p>
      </main>
    </div>
  );
}
