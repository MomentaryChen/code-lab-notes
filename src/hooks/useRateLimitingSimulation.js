import { useMemo } from 'react';
import { RATE_LIMITING_STRATEGIES } from '../components/RateLimiting/rateLimitingStrategies.js';
import { TRAFFIC_SCENARIOS } from '../components/RateLimiting/trafficScenarios.js';

/**
 * 純函式：根據策略與參數，對一組請求時間進行限流模擬。
 * 回傳 SimulationResult，供視覺化元件使用。
 */
export function simulateRateLimiting(strategyId, parameters, requestTimestamps) {
  const sortedTimestamps = [...requestTimestamps].sort((a, b) => a - b);

  if (sortedTimestamps.length === 0) {
    return {
      events: [],
      totalRequests: 0,
      allowedCount: 0,
      rejectedCount: 0,
      timeRange: [0, 0],
    };
  }

  const strat = RATE_LIMITING_STRATEGIES.find((s) => s.id === strategyId);
  const effectiveParams = { ...(strat?.defaultParameters || {}), ...(parameters || {}) };

  switch (strategyId) {
    case 'fixed-window':
      return simulateFixedWindow(effectiveParams, sortedTimestamps);
    case 'sliding-window':
      return simulateSlidingWindow(effectiveParams, sortedTimestamps);
    case 'token-bucket':
      return simulateTokenBucket(effectiveParams, sortedTimestamps);
    case 'leaky-bucket':
      return simulateLeakyBucket(effectiveParams, sortedTimestamps);
    default:
      // 未知策略時，不做限制，全部允許（僅作為防禦性預設）
      return allowAllFallback(sortedTimestamps, strategyId);
  }
}

function simulateFixedWindow(parameters, timestamps) {
  const windowSize = Number(parameters.windowSizeMs ?? 1000);
  const maxRequests = Number(parameters.maxRequests ?? 5);

  let windowStart = timestamps[0];
  // 將第一個請求所在的視窗向下取整，讓視窗邊界在 0、windowSize、2*windowSize... 上
  windowStart = Math.floor(windowStart / windowSize) * windowSize;
  let windowEnd = windowStart + windowSize;
  let allowedInWindow = 0;

  const events = [];

  for (let i = 0; i < timestamps.length; i += 1) {
    const ts = timestamps[i];

    // 推進視窗直到當前請求落在視窗內
    while (ts >= windowEnd) {
      windowStart = windowEnd;
      windowEnd = windowStart + windowSize;
      allowedInWindow = 0;
    }

    let status;
    if (allowedInWindow < maxRequests) {
      status = 'allowed';
      allowedInWindow += 1;
    } else {
      status = 'rejected';
    }

    events.push({
      id: `fixed-${i}`,
      timestamp: ts,
      status,
      strategyId: 'fixed-window',
      windowInfo: {
        windowStart,
        windowEnd,
        requestsInWindow: allowedInWindow,
      },
    });
  }

  const totalRequests = events.length;
  const allowedCount = events.filter((e) => e.status === 'allowed').length;
  const rejectedCount = totalRequests - allowedCount;
  const timeRange = [events[0].timestamp, events[events.length - 1].timestamp];

  return {
    events,
    totalRequests,
    allowedCount,
    rejectedCount,
    timeRange,
  };
}

function simulateSlidingWindow(parameters, timestamps) {
  const windowSize = Number(parameters.windowSizeMs ?? 1000);
  const maxRequests = Number(parameters.maxRequests ?? 5);

  const events = [];
  const deque = [];

  for (let i = 0; i < timestamps.length; i += 1) {
    const ts = timestamps[i];
    const windowStart = ts - windowSize;

    while (deque.length > 0 && deque[0] <= windowStart) {
      deque.shift();
    }

    let status;
    if (deque.length < maxRequests) {
      status = 'allowed';
      deque.push(ts);
    } else {
      status = 'rejected';
    }

    events.push({
      id: `sliding-${i}`,
      timestamp: ts,
      status,
      strategyId: 'sliding-window',
      windowInfo: {
        windowStart: ts - windowSize,
        windowEnd: ts,
        requestsInWindow: deque.length,
      },
    });
  }

  if (events.length === 0) {
    return {
      events: [],
      totalRequests: 0,
      allowedCount: 0,
      rejectedCount: 0,
      timeRange: [0, 0],
    };
  }

  const totalRequests = events.length;
  const allowedCount = events.filter((e) => e.status === 'allowed').length;
  const rejectedCount = totalRequests - allowedCount;
  const timeRange = [events[0].timestamp, events[events.length - 1].timestamp];

  return {
    events,
    totalRequests,
    allowedCount,
    rejectedCount,
    timeRange,
  };
}

function simulateTokenBucket(parameters, timestamps) {
  const capacity = Number(parameters.bucketCapacity ?? 10);
  const refillRatePerSec = Number(parameters.refillRatePerSec ?? 5);

  if (timestamps.length === 0) {
    return {
      events: [],
      totalRequests: 0,
      allowedCount: 0,
      rejectedCount: 0,
      timeRange: [0, 0],
    };
  }

  let tokens = capacity;
  let lastRefillTime = timestamps[0];

  const events = [];

  for (let i = 0; i < timestamps.length; i += 1) {
    const ts = timestamps[i];

    const elapsedSec = (ts - lastRefillTime) / 1000;
    if (elapsedSec > 0) {
      const refill = elapsedSec * refillRatePerSec;
      tokens = Math.min(capacity, tokens + refill);
      lastRefillTime = ts;
    }

    const before = tokens;
    let status;

    if (tokens >= 1) {
      status = 'allowed';
      tokens -= 1;
    } else {
      status = 'rejected';
    }

    const after = tokens;

    events.push({
      id: `bucket-${i}`,
      timestamp: ts,
      status,
      strategyId: 'token-bucket',
      bucketInfo: {
        tokensBefore: before,
        tokensAfter: after,
        capacity,
      },
    });
  }

  const totalRequests = events.length;
  const allowedCount = events.filter((e) => e.status === 'allowed').length;
  const rejectedCount = totalRequests - allowedCount;
  const timeRange = [events[0].timestamp, events[events.length - 1].timestamp];

  return {
    events,
    totalRequests,
    allowedCount,
    rejectedCount,
    timeRange,
  };
}

function simulateLeakyBucket(parameters, timestamps) {
  const capacity = Number(parameters.queueCapacity ?? 10);
  const leakRatePerSec = Number(parameters.leakRatePerSec ?? 5);

  if (timestamps.length === 0) {
    return {
      events: [],
      totalRequests: 0,
      allowedCount: 0,
      rejectedCount: 0,
      timeRange: [0, 0],
    };
  }

  let level = 0;
  let lastUpdateTime = timestamps[0];
  const events = [];

  for (let i = 0; i < timestamps.length; i += 1) {
    const ts = timestamps[i];

    const elapsedSec = (ts - lastUpdateTime) / 1000;
    if (elapsedSec > 0) {
      const leaked = elapsedSec * leakRatePerSec;
      level = Math.max(0, level - leaked);
      lastUpdateTime = ts;
    }

    const before = level;
    let status;

    if (level < capacity) {
      status = 'allowed';
      level += 1;
    } else {
      status = 'rejected';
    }

    const after = level;

    events.push({
      id: `leaky-${i}`,
      timestamp: ts,
      status,
      strategyId: 'leaky-bucket',
      bucketInfo: {
        levelBefore: before,
        levelAfter: after,
        capacity,
        leakRatePerSec,
      },
    });
  }

  const totalRequests = events.length;
  const allowedCount = events.filter((e) => e.status === 'allowed').length;
  const rejectedCount = totalRequests - allowedCount;
  const timeRange = [events[0].timestamp, events[events.length - 1].timestamp];

  return {
    events,
    totalRequests,
    allowedCount,
    rejectedCount,
    timeRange,
  };
}

function allowAllFallback(timestamps, strategyId) {
  const events = timestamps.map((ts, index) => ({
    id: `${strategyId || 'none'}-${index}`,
    timestamp: ts,
    status: 'allowed',
    strategyId: strategyId || 'unknown',
  }));

  if (events.length === 0) {
    return {
      events: [],
      totalRequests: 0,
      allowedCount: 0,
      rejectedCount: 0,
      timeRange: [0, 0],
    };
  }

  return {
    events,
    totalRequests: events.length,
    allowedCount: events.length,
    rejectedCount: 0,
    timeRange: [events[0].timestamp, events[events.length - 1].timestamp],
  };
}

/**
 * React hook：根據當前策略、參數與流量案例，計算 SimulationResult。
 */
export function useRateLimitingSimulation({ strategyId, scenarioId, parameters }) {
  const scenario = TRAFFIC_SCENARIOS.find((s) => s.id === scenarioId) || TRAFFIC_SCENARIOS[0];
  const timestamps = scenario?.requestTimestamps || [];

  const result = useMemo(
    () => simulateRateLimiting(strategyId, parameters, timestamps),
    [strategyId, parameters, timestamps],
  );

  return { scenario, result };
}

