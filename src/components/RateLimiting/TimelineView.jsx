import React from 'react';

function getBounds(events) {
  if (!events || events.length === 0) {
    return [0, 0];
  }
  const min = events[0].timestamp;
  const max = events[events.length - 1].timestamp || min + 1;
  if (min === max) {
    return [min, min + 1];
  }
  return [min, max];
}

export default function TimelineView({
  events,
  currentTime,
  activeEventId,
  onEventHover,
}) {
  const safeEvents = events || [];
  const [minTs, maxTs] = getBounds(safeEvents);
  const span = maxTs - minTs || 1;

  const activeEvent = safeEvents.find((e) => e.id === activeEventId) || safeEvents[0];
  const windowInfo = activeEvent?.windowInfo;

  const allowedCount = safeEvents.filter((e) => e.status === 'allowed').length;
  const rejectedCount = safeEvents.length - allowedCount;

  return (
    <div className="rate-limiting-timeline">
      <div className="rate-limiting-timeline-track">
        {windowInfo && (
          <div
            className="rate-limiting-window-band"
            style={{
              left: `${((windowInfo.windowStart - minTs) / span) * 100}%`,
              right: `${(1 - (windowInfo.windowEnd - minTs) / span) * 100}%`,
            }}
          />
        )}

        {safeEvents.map((event) => {
          const ratio = (event.timestamp - minTs) / span;
          const isActive =
            event.id === activeEventId ||
            (currentTime != null &&
              event.timestamp <= currentTime &&
              currentTime - event.timestamp < span * 0.05);

          return (
            <button
              key={event.id}
              type="button"
              className={[
                'rate-limiting-event',
                event.status === 'allowed'
                  ? 'rate-limiting-event--allowed'
                  : 'rate-limiting-event--rejected',
                isActive ? 'rate-limiting-event--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ left: `${ratio * 100}%` }}
              onMouseEnter={() => onEventHover?.(event.id)}
              onFocus={() => onEventHover?.(event.id)}
              aria-label={`時間 ${event.timestamp}，${event.status === 'allowed' ? '通過' : '被拒絕'}`}
            />
          );
        })}
      </div>

      <div className="rate-limiting-footer">
        <div className="rate-limiting-stats">
          <span className="rate-limiting-stat-chip">
            總請求：{safeEvents.length}（通過 {allowedCount} / 拒絕 {rejectedCount}）
          </span>
          {windowInfo && (
            <span className="rate-limiting-stat-chip">
              目前視窗 [{windowInfo.windowStart} – {windowInfo.windowEnd}]，已通過{' '}
              {windowInfo.requestsInWindow} 次
            </span>
          )}
        </div>
        <div className="rate-limiting-legend">
          <span className="rate-limiting-legend-dot rate-limiting-legend-dot--allowed" />
          <span>通過</span>
          <span className="rate-limiting-legend-dot rate-limiting-legend-dot--rejected" />
          <span>被拒絕</span>
        </div>
      </div>
    </div>
  );
}

