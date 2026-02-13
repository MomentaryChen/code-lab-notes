import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';

const sectionStyle = { marginTop: '24px' };
const sectionTitleStyle = { fontSize: '1.25rem', marginBottom: '12px' };
const pStyle = { lineHeight: 1.7, marginTop: '12px' };
const mainStyle = { maxWidth: '720px', margin: '0 auto', padding: '0 16px 48px' };
const preStyle = {
  background: 'var(--code-bg)',
  color: 'var(--code-text)',
  padding: '16px',
  borderRadius: '8px',
  overflow: 'auto',
  fontSize: '0.9rem',
  lineHeight: 1.5,
};

/**
 * 設計模式專頁共用版型：標題、導覽、主題切換、解釋／使用方式／範例三區塊。
 * @param {{ nameZh: string, description: string, explanation: string[], usage: string[], example?: { intro?: string, blocks: { code: string, note?: string }[] } }} props
 */
export default function PatternPageLayout({ nameZh, description, explanation, usage, example }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="page placeholder-page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/design-pattern">← 回設計模式</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link className="back-link" to="/">回首頁</Link>
          <h1>Code Lab Notes · {nameZh}</h1>
          <p className="subtitle">{description}</p>
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
      <main style={mainStyle}>
        <section id="section-explanation" aria-labelledby="heading-explanation" style={sectionStyle}>
          <h2 id="heading-explanation" className="section-title" style={sectionTitleStyle}>何謂 {nameZh}</h2>
          {explanation.map((para, i) => (
            <p key={i} className="description" style={i === 0 ? { lineHeight: 1.7 } : pStyle}>{para}</p>
          ))}
        </section>
        <section id="section-usage" aria-labelledby="heading-usage" style={{ marginTop: '32px' }}>
          <h2 id="heading-usage" className="section-title" style={sectionTitleStyle}>何時使用與概念性使用方式</h2>
          {usage.map((para, i) => (
            <p key={i} className="description" style={i === 0 ? { lineHeight: 1.7 } : pStyle}>{para}</p>
          ))}
        </section>
        <section id="section-example" aria-labelledby="heading-example" style={{ marginTop: '32px' }}>
          <h2 id="heading-example" className="section-title" style={sectionTitleStyle}>範例：Java 與 Spring Boot</h2>
          {example ? (
            <>
              {example.intro && (
                <p className="description" style={{ lineHeight: 1.7, marginBottom: '12px' }}>{example.intro}</p>
              )}
              {example.blocks.map((block, i) => (
                <React.Fragment key={i}>
                  <pre className="code-block" style={{ ...preStyle, marginTop: i > 0 ? '8px' : 0 }}>{block.code}</pre>
                  {block.note && (
                    <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>{block.note}</p>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <p className="description" style={{ lineHeight: 1.7 }}>本模式範例建置中。</p>
          )}
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
