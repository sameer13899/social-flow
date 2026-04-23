import assert from "node:assert/strict";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(__dirname, "..", "docs", "agentic-frontend");
const port = 4173;

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload, null, 2));
}

function sendText(res: ServerResponse, statusCode: number, body: string, contentType = "text/plain; charset=utf-8") {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(body);
}

function createStaticServer() {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = String(req.url || "/").split("?")[0];
    if (url === "/index.html") {
      sendText(res, 200, readFileSync(path.join(root, "index.html"), "utf8"), "text/html; charset=utf-8");
      return;
    }
    if (url === "/app.js" || url === "/styles.css") {
      const filePath = path.join(root, url.slice(1));
      const contentType = url.endsWith(".js")
        ? "application/javascript; charset=utf-8"
        : "text/css; charset=utf-8";
      sendText(res, 200, readFileSync(filePath, "utf8"), contentType);
      return;
    }
    if (url === "/") {
      res.statusCode = 302;
      res.setHeader("Location", "/index.html");
      res.end();
      return;
    }
    sendText(res, 404, "not found");
  });
}

function createGatewayStub() {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = String(req.url || "/");
    if (url.startsWith("/api/health")) {
      sendJson(res, 200, { ok: true, version: "smoke" });
      return;
    }
    if (url.startsWith("/api/status")) {
      sendJson(res, 200, { workspace: "smoke", mode: "beginner" });
      return;
    }
    if (url.startsWith("/api/ops/summary")) {
      sendJson(res, 200, { summary: { alertsOpen: 0, approvalsPending: 0, sourcesConfigured: 1, sourcesReady: 1 } });
      return;
    }
    if (url.startsWith("/api/ops/readiness")) {
      sendJson(res, 200, { report: { score: { passed: 1, total: 1 } } });
      return;
    }
    if (url.startsWith("/api/config")) {
      sendJson(res, 200, {
        config: {
          onboarding: { completed: false }
        }
      });
      return;
    }
    if (url.startsWith("/api/channels/baileys/sessions")) {
      sendJson(res, 200, { sessions: [] });
      return;
    }
    if (url.startsWith("/api/logs")) {
      sendJson(res, 200, { logs: [] });
      return;
    }
    sendJson(res, 404, { ok: false, error: `Unhandled stub route: ${url}` });
  });
}

async function launchBrowser() {
  const browserPaths = [
    process.env.SOCIAL_FRONTEND_SMOKE_CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  ].filter(Boolean) as string[];

  let lastError: unknown = null;
  for (const executablePath of browserPaths) {
    try {
      return await chromium.launch({ headless: true, executablePath });
    } catch (error) {
      lastError = error;
    }
  }

  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    throw lastError || error;
  }
}

async function main() {
  const staticServer = createStaticServer();
  const gatewayServer = createGatewayStub();

  await new Promise<void>((resolve) => staticServer.listen(port, "127.0.0.1", () => resolve()));
  await new Promise<void>((resolve) => gatewayServer.listen(1310, "127.0.0.1", () => resolve()));

  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  try {
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#ui-mode-toggle");
    await page.waitForFunction(() => document.querySelector(".screen.active")?.id === "screen-setup");

    const isHidden = async (selector: string) => page.locator(selector).evaluate((el) => Boolean((el as HTMLElement).hidden));

    assert.equal(await page.locator("#ui-mode-toggle").textContent(), "Beginner Mode");
    assert.equal(await page.locator("#ui-mode-toggle").getAttribute("aria-pressed"), "false");
    assert.equal(await isHidden("#screen-setup"), false);
    assert.equal(await page.evaluate(() => document.querySelector(".screen.active")?.id || ""), "screen-setup");
    assert.equal(await isHidden("#screen-logs"), true);

    await page.click("#ui-mode-toggle");
    await page.waitForTimeout(400);

    assert.equal(await page.locator("#ui-mode-toggle").textContent(), "Advanced Mode");
    assert.equal(await page.locator("#ui-mode-toggle").getAttribute("aria-pressed"), "true");
    assert.equal(await isHidden("#screen-logs"), false);

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("#ui-mode-toggle");
    await page.waitForTimeout(400);

    assert.equal(await page.locator("#ui-mode-toggle").textContent(), "Advanced Mode");
    assert.equal(await page.locator("#ui-mode-toggle").getAttribute("aria-pressed"), "true");

    // eslint-disable-next-line no-console
    console.log("[smoke] frontend beginner/advanced mode checks passed");
  } finally {
    await browser.close().catch(() => {});
    await new Promise<void>((resolve) => staticServer.close(() => resolve()));
    await new Promise<void>((resolve) => gatewayServer.close(() => resolve()));
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
