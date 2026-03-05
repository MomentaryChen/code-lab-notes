import React, { useMemo } from 'react';
import { RATE_LIMITING_STRATEGIES } from './rateLimitingStrategies.js';

export default function StrategyControls({ strategyId, parameters, onChange, error }) {
  const strategy =
    RATE_LIMITING_STRATEGIES.find((s) => s.id === strategyId) || RATE_LIMITING_STRATEGIES[0];

  const fields = useMemo(() => strategy.parameters || [], [strategy]);

  const handleChange = (key, rawValue, def) => {
    const numeric = Number(rawValue);
    const next = {
      ...parameters,
      [key]: Number.isNaN(numeric) ? def : numeric,
    };
    onChange?.(next);
  };

  return (
    <div className="rate-limiting-controls">
      <div className="rate-limiting-controls-header">
        <span className="rate-limiting-controls-title">參數調整</span>
        <span className="rate-limiting-controls-subtitle">
          嘗試改變視窗長度與配額，觀察通過／拒絕模式的變化。
        </span>
      </div>
      <div className="rate-limiting-controls-grid">
        {fields.map((field) => {
          const current = parameters?.[field.key] ?? field.defaultValue;
          return (
            <label key={field.key} className="rate-limiting-control-field">
              <span className="rate-limiting-control-label">
                {field.label}
                <span className="rate-limiting-control-range">
                  （建議 {field.minValue} – {field.maxValue}）
                </span>
              </span>
              <div className="rate-limiting-control-inputs">
                <input
                  type="range"
                  min={field.minValue}
                  max={field.maxValue}
                  step={field.step}
                  value={current}
                  onChange={(e) =>
                    handleChange(field.key, e.target.value, field.defaultValue)
                  }
                />
                <input
                  type="number"
                  min={field.minValue}
                  max={field.maxValue}
                  step={field.step}
                  value={current}
                  onChange={(e) =>
                    handleChange(field.key, e.target.value, field.defaultValue)
                  }
                  className="rate-limiting-control-number"
                />
              </div>
              <span className="rate-limiting-control-help">{field.description}</span>
            </label>
          );
        })}
      </div>
      {error && <div className="rate-limiting-control-error">{error}</div>}
    </div>
  );
}

