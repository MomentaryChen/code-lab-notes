import React, { useEffect, useState } from 'react';
import { useRateLimitingSimulation } from '../../hooks/useRateLimitingSimulation.js';
import { RATE_LIMITING_STRATEGIES } from './rateLimitingStrategies.js';
import { TRAFFIC_SCENARIOS } from './trafficScenarios.js';
import '../../styles/rate-limiting.css';
import TimelineView from './TimelineView.jsx';
import StrategyControls from './StrategyControls.jsx';

export default function RateLimitingVisualization() {
  const [selectedStrategyId, setSelectedStrategyId] = useState('fixed-window');
  const [selectedScenarioId, setSelectedScenarioId] = useState('steady');
  const [currentParameters, setCurrentParameters] = useState({});
  const [playbackStatus, setPlaybackStatus] = useState('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [activeEventId, setActiveEventId] = useState(null);

  const { result } = useRateLimitingSimulation({
    strategyId: selectedStrategyId,
    scenarioId: selectedScenarioId,
    parameters: currentParameters,
  });

  useEffect(() => {
    if (!result?.events || result.events.length === 0) {
      return undefined;
    }

    if (playbackStatus !== 'playing') {
      return undefined;
    }

    const [start, end] = result.timeRange;
    const span = end - start || 1;
    const durationMs = 4000;

    const startTime = performance.now();

    let frameId;

    const loop = (now) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const t = start + span * progress;
      setCurrentTime(t);

      if (progress < 1) {
        frameId = requestAnimationFrame(loop);
      } else {
        setPlaybackStatus('finished');
      }
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [playbackStatus, result]);

  useEffect(() => {
    if (!result?.events || result.events.length === 0) {
      return;
    }
    setCurrentTime(result.timeRange[0]);
    setActiveEventId(result.events[0].id);
    setPlaybackStatus('idle');
  }, [result]);

  const currentStrategy =
    RATE_LIMITING_STRATEGIES.find((s) => s.id === selectedStrategyId) || RATE_LIMITING_STRATEGIES[0];
  const scenario =
    TRAFFIC_SCENARIOS.find((s) => s.id === selectedScenarioId) || TRAFFIC_SCENARIOS[0];

  const handlePlay = () => {
    if (!result?.events || result.events.length === 0) return;
    setPlaybackStatus('playing');
  };

  const handlePause = () => {
    setPlaybackStatus('paused');
  };

  const handleReplay = () => {
    if (!result?.events || result.events.length === 0) return;
    setCurrentTime(result.timeRange[0]);
    setActiveEventId(result.events[0].id);
    setPlaybackStatus('playing');
  };

  const parameterError = (() => {
    if (!currentStrategy?.parameters) return '';
    for (const field of currentStrategy.parameters) {
      const value = currentParameters?.[field.key];
      if (value == null) continue;
      if (value < field.minValue || value > field.maxValue) {
        return `${field.label} 超出建議範圍（${field.minValue} – ${field.maxValue}），請調整後再播放動畫。`;
      }
    }
    return '';
  })();

  return (
    <div className="rate-limiting-section">
      <div className="rate-limiting-header">
        <div>
          <h3 className="rate-limiting-title">
            限流策略可視化 · {currentStrategy?.name || '固定視窗'}
          </h3>
          <p className="rate-limiting-tagline">
            觀察請求在時間軸上的通過與被拒絕情況，並比較不同限流策略在相同流量下的行為差異。
          </p>
        </div>
        <div>
          <button
            type="button"
            className="primary-action"
            onClick={handlePlay}
            disabled={playbackStatus === 'playing'}
          >
            開始播放
          </button>
        </div>
      </div>

      <div className="rate-limiting-body">
        <p className="description">
          目前展示的是
          <strong>{currentStrategy?.name}</strong>
          。你可以先以「固定視窗」理解基本概念，再切換到「滑動視窗」與「Token Bucket」觀察在相同流量下被拒絕比例與流量平滑度的差異。
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {RATE_LIMITING_STRATEGIES.map((strategy) => (
              <button
                key={strategy.id}
                type="button"
                className={`theme-button ${
                  selectedStrategyId === strategy.id ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedStrategyId(strategy.id);
                  setPlaybackStatus('idle');
                }}
              >
                {strategy.name}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: 12 }}>
            <span style={{ color: 'var(--text-sub)' }}>流量案例：</span>
            {TRAFFIC_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                className={`theme-button ${
                  selectedScenarioId === sc.id ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedScenarioId(sc.id);
                  setPlaybackStatus('idle');
                }}
              >
                {sc.name}
              </button>
            ))}
          </div>
        </div>

        <p className="description" style={{ marginTop: 0 }}>
          <strong>{scenario?.name}</strong>
          {' — '}
          {scenario?.description}
        </p>

        <StrategyControls
          strategyId={selectedStrategyId}
          parameters={currentParameters}
          onChange={(next) => {
            setCurrentParameters(next);
            setPlaybackStatus('idle');
          }}
          error={parameterError}
        />

        <TimelineView
          events={result?.events || []}
          currentTime={currentTime}
          activeEventId={activeEventId}
          onEventHover={setActiveEventId}
        />

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button
            type="button"
            className="primary-action"
            onClick={handleReplay}
            style={{ paddingInline: 10, fontSize: 11 }}
          >
            重新播放
          </button>
          <button
            type="button"
            className="primary-action"
            onClick={handlePause}
            style={{ paddingInline: 10, fontSize: 11, background: 'transparent', color: 'var(--accent)' }}
          >
            暫停
          </button>
        </div>
      </div>
    </div>
  );
}

