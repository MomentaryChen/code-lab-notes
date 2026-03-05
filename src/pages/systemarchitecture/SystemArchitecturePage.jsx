import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';

export default function SystemArchitecturePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page placeholder-page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/">← 回首頁</Link>
          <h1>Code Lab Notes · 系統架構</h1>
          <p className="subtitle">
            限流、壟斷等系統架構概念介紹與常見情境說明。
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

        <section id="monopoly" aria-labelledby="monopoly-heading">
          <h2 id="monopoly-heading">壟斷</h2>
          <p>
            在系統架構脈絡下，「壟斷」泛指某單一節點、資源或廠商主導關鍵能力，導致其他參與者難以替代或取得公平存取。例如：單一資料庫或服務節點成為瓶頸（單點壟斷）、某項關鍵資源（如授權、金流）僅由一家供應商提供（資源或廠商壟斷）、或技術選型鎖定（Vendor Lock-in）使遷移成本過高。
          </p>
          <p>
            理解壟斷有助於在設計時避免單點故障、評估供應鏈風險、以及在做技術選型時權衡彈性與成本。架構上可透過冗餘、多活、多供應商策略或抽象層來降低壟斷帶來的風險。
          </p>
        </section>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className="back-link" to="/">← 返回首頁</Link>
        </p>
      </main>
    </div>
  );
}
