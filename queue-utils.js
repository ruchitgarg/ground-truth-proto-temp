(function (global) {
  const DEFAULT_CONFIG = {
    namespace: 'whatsapp.fpo.capture.v1',
    antiBan: {
      rateLimitPerSecond: 4,
      burstCap: 12,
      jitterMs: { min: 150, max: 900 },
      retry: {
        maxAttempts: 5,
        backoff: 'exponential',
        baseDelayMs: 1000,
        maxDelayMs: 120000,
        respectRetryAfter: true,
        retryOnStatuses: [408, 425, 429, 500, 502, 503, 504]
      }
    }
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function randomJitter(min, max) {
    const low = Number.isFinite(min) ? min : 0;
    const high = Number.isFinite(max) ? max : low;
    return Math.floor(low + Math.random() * (high - low + 1));
  }

  function computeRetryDelayMs(attempt, config) {
    const retry = (config && config.antiBan && config.antiBan.retry) || DEFAULT_CONFIG.antiBan.retry;
    const a = Math.max(1, attempt || 1);
    const base = retry.baseDelayMs || 1000;
    const maxDelay = retry.maxDelayMs || 120000;
    const exp = Math.min(maxDelay, base * Math.pow(2, a - 1));
    const jitter = randomJitter(config.antiBan.jitterMs.min, config.antiBan.jitterMs.max);
    return clamp(exp + jitter, base, maxDelay);
  }

  function buildFpoQueueJob(row, queueConfig) {
    const cfg = queueConfig || DEFAULT_CONFIG;
    const phone = String(row.phone || '').replace(/\D/g, '');
    const lang = String(row.language || '').toLowerCase().trim();
    return {
      queue: cfg.namespace,
      dedupeKey: `${phone}:${lang}`,
      payload: {
        type: 'capture-link',
        phone,
        language: lang,
        fpoName: row.fpoName || '',
        state: row.state || '',
        district: row.district || ''
      },
      antiBan: cfg.antiBan
    };
  }

  global.QueueUtils = {
    DEFAULT_CONFIG,
    computeRetryDelayMs,
    buildFpoQueueJob
  };
})(window);
