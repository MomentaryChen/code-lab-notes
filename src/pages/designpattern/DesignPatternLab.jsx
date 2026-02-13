import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../useTheme.js';
import { getPatternsByCategory } from './patternList.js';

const CATEGORY_LABELS = {
  all: '全部',
  creational: '建立型',
  structural: '結構型',
  behavioral: '行為型',
};

export default function DesignPatternLab() {
  const { theme, setTheme } = useTheme();
  const [filter, setFilter] = useState('all');
  const creational = getPatternsByCategory('creational');
  const structural = getPatternsByCategory('structural');
  const behavioral = getPatternsByCategory('behavioral');

  const sections = [
    { key: 'creational', title: CATEGORY_LABELS.creational, patterns: creational },
    { key: 'structural', title: CATEGORY_LABELS.structural, patterns: structural },
    { key: 'behavioral', title: CATEGORY_LABELS.behavioral, patterns: behavioral },
  ];

  const visibleSections = filter === 'all'
    ? sections
    : sections.filter((s) => s.key === filter);

  function PatternSection({ title, patterns }) {
    return (
      <section style={{ marginBottom: '32px' }} id={`category-${title}`}>
        <h2 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{title}</h2>
        <ul className="side-list" style={{ listStyle: 'none', padding: 0 }}>
          {patterns.map((p) => (
            <li key={p.slug} style={{ marginBottom: '12px' }}>
              <div className="side-bullet" />
              <div>
                <Link to={`/design-pattern/${p.slug}`}>{p.nameZh}</Link>
                <div>{p.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

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
          <p style={{ marginBottom: '12px' }}>
            依類別篩選：
            {(['all', 'creational', 'structural', 'behavioral']).map((key) => (
              <button
                key={key}
                type="button"
                className={`theme-button ${filter === key ? 'active' : ''}`}
                style={{ marginRight: '8px', marginTop: '4px' }}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
              >
                {CATEGORY_LABELS[key]}
              </button>
            ))}
          </p>
          {visibleSections.map((s) => (
            <PatternSection key={s.key} title={s.title} patterns={s.patterns} />
          ))}
          <p style={{ marginTop: '24px' }}>
            <Link className="back-link" to="/">← 返回首頁</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
