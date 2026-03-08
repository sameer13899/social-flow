const { openUrl } = require('./open-url');

let PLAYWRIGHT_INSTANCE = null;
let PLAYWRIGHT_LOAD_ATTEMPTED = false;

function loadPlaywrightOrThrow() {
  if (PLAYWRIGHT_INSTANCE) return PLAYWRIGHT_INSTANCE;
  if (PLAYWRIGHT_LOAD_ATTEMPTED) throw new Error('Playwright unavailable');
  PLAYWRIGHT_LOAD_ATTEMPTED = true;

  const candidates = ['playwright', 'playwright-core'];
  let lastError = null;
  for (let i = 0; i < candidates.length; i += 1) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const loaded = require(candidates[i]);
      if (loaded && loaded.chromium && typeof loaded.chromium.launch === 'function') {
        PLAYWRIGHT_INSTANCE = loaded;
        return PLAYWRIGHT_INSTANCE;
      }
      if (loaded && loaded.default && loaded.default.chromium && typeof loaded.default.chromium.launch === 'function') {
        PLAYWRIGHT_INSTANCE = loaded.default;
        return PLAYWRIGHT_INSTANCE;
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Playwright unavailable');
}

function noOpClose() {
  return Promise.resolve();
}

async function createBrowserAssistSession(options = {}) {
  const browserAgent = options.browserAgent !== false;
  const timeoutMs = Math.max(1_000, Number(options.timeoutMs || 20_000));

  if (!browserAgent) {
    return {
      via: 'system-browser',
      async goto(url) {
        return openUrl(url);
      },
      close: noOpClose
    };
  }

  try {
    const playwright = loadPlaywrightOrThrow();
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 920 }
    });
    const page = await context.newPage();
    page.setDefaultTimeout(timeoutMs);
    page.setDefaultNavigationTimeout(timeoutMs);

    return {
      via: 'browser-agent',
      async goto(url) {
        await page.goto(String(url || '').trim(), {
          waitUntil: 'domcontentloaded',
          timeout: timeoutMs
        });
        return true;
      },
      async close() {
        await browser.close();
      }
    };
  } catch (error) {
    return {
      via: 'system-browser',
      error,
      async goto(url) {
        return openUrl(url);
      },
      close: noOpClose
    };
  }
}

module.exports = {
  createBrowserAssistSession
};
