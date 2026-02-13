import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';
import { getPatternBySlug, isValidPatternSlug } from './patternList.js';
import { getPatternContent } from './patternContent.js';

export default function PatternPage() {
  const { slug } = useParams();
  const { theme, setTheme } = useTheme();

  if (!slug || !isValidPatternSlug(slug)) {
    return <Navigate to="/design-pattern" replace />;
  }

  const pattern = getPatternBySlug(slug);
  const content = getPatternContent(slug);

  const sectionStyle = { marginTop: '24px' };
  const sectionTitleStyle = { fontSize: '1.25rem', marginBottom: '12px' };
  const pStyle = { lineHeight: 1.7, marginTop: '12px' };

  return (
    <div className="page placeholder-page">
      <header>
        <div className="title-group">
          <Link className="back-link" to="/design-pattern">← 回設計模式</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link className="back-link" to="/">回首頁</Link>
          <h1>Code Lab Notes · {pattern.nameZh}</h1>
          <p className="subtitle">
            {pattern.description}
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
        <section id="section-explanation" aria-labelledby="heading-explanation" style={sectionStyle}>
          <h2 id="heading-explanation" className="section-title" style={sectionTitleStyle}>何謂 {pattern.nameZh}</h2>
          {content ? (
            content.explanation.map((para, i) => (
              <p key={i} className="description" style={i === 0 ? { lineHeight: 1.7 } : pStyle}>
                {para}
              </p>
            ))
          ) : (
            <p className="description" style={{ lineHeight: 1.7 }}>本模式內容建置中。</p>
          )}
        </section>
        <section id="section-usage" aria-labelledby="heading-usage" style={{ marginTop: '32px' }}>
          <h2 id="heading-usage" className="section-title" style={sectionTitleStyle}>何時使用與概念性使用方式</h2>
          {content ? (
            content.usage.map((para, i) => (
              <p key={i} className="description" style={i === 0 ? { lineHeight: 1.7 } : pStyle}>
                {para}
              </p>
            ))
          ) : (
            <p className="description" style={{ lineHeight: 1.7 }}>本模式內容建置中。</p>
          )}
        </section>
        <section id="section-example" aria-labelledby="heading-example" style={{ marginTop: '32px' }}>
          <h2 id="heading-example" className="section-title" style={sectionTitleStyle}>範例：Java 與 Spring Boot</h2>
          {content?.example ? (
            <>
              {content.example.intro && (
                <p className="description" style={{ lineHeight: 1.7, marginBottom: '12px' }}>
                  {content.example.intro}
                </p>
              )}
              {content.example.blocks.map((block, i) => (
                <React.Fragment key={i}>
                  <pre style={{
                    background: 'var(--card-bg, #1e293b)',
                    color: 'var(--text, #e2e8f0)',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    marginTop: i > 0 ? '8px' : 0,
                  }}
                  >
                    {block.code}
                  </pre>
                  {block.note && (
                    <p className="description" style={{ lineHeight: 1.7, marginTop: '12px' }}>
                      {block.note}
                    </p>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : content ? (
            <p className="description" style={{ lineHeight: 1.7 }}>本模式範例建置中。</p>
          ) : (
            <p className="description" style={{ lineHeight: 1.7 }}>本模式內容建置中。</p>
          )}
        </section>
      </main>
    </div>
  );
}
