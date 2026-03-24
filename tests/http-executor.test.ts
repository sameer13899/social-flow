const assert = require('node:assert/strict');

const http = require('../executors/http');

module.exports = [
  {
    name: 'meta http retries on 429',
    fn: () => {
      const err = { response: { status: 429, data: {} } };
      assert.equal(http._private.shouldRetry(err), true);
    }
  },
  {
    name: 'meta http retries on 5xx',
    fn: () => {
      const err = { response: { status: 503, data: {} } };
      assert.equal(http._private.shouldRetry(err), true);
    }
  },
  {
    name: 'meta http retries on graph rate limit codes',
    fn: () => {
      const err = { response: { status: 400, data: { error: { code: 613 } } } };
      assert.equal(http._private.shouldRetry(err), true);
    }
  },
  {
    name: 'meta http retries on network errors',
    fn: () => {
      const err = { code: 'ETIMEDOUT' };
      assert.equal(http._private.shouldRetry(err), true);
    }
  },
  {
    name: 'meta http does not retry on 4xx without rate limits',
    fn: () => {
      const err = { response: { status: 400, data: {} } };
      assert.equal(http._private.shouldRetry(err), false);
    }
  },
  {
    name: 'meta http retry delay stays within jitter range',
    fn: () => {
      const prevBase = process.env.SOCIAL_META_RETRY_BASE_MS;
      const prevMax = process.env.SOCIAL_META_RETRY_MAX_MS;
      process.env.SOCIAL_META_RETRY_BASE_MS = '100';
      process.env.SOCIAL_META_RETRY_MAX_MS = '100';
      const delay = http._private.retryDelayMs(0);
      if (prevBase === undefined) delete process.env.SOCIAL_META_RETRY_BASE_MS;
      else process.env.SOCIAL_META_RETRY_BASE_MS = prevBase;
      if (prevMax === undefined) delete process.env.SOCIAL_META_RETRY_MAX_MS;
      else process.env.SOCIAL_META_RETRY_MAX_MS = prevMax;
      assert.ok(delay >= 100 && delay <= 130, `delay ${delay} out of expected range`);
    }
  }
];
