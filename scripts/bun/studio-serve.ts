import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 4173);
const gatewayUrl = String(process.argv[4] || "");
const gatewayApiKey = String(process.argv[5] || "");

function mime(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "text/plain; charset=utf-8";
}

function safeResolve(requestPath: string): string | null {
  const normalized = path.posix.normalize(requestPath).replace(/^\/+/, "");
  const candidate = path.resolve(root, normalized);
  const relative = path.relative(root, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return candidate;
}

function configScript(): string {
  return `window.__SOCIAL_FLOW_GATEWAY__=${JSON.stringify({ url: gatewayUrl, apiKey: gatewayApiKey })};`;
}

function injectConfig(html: string): string {
  if (html.includes("</head>")) {
    return html.replace("</head>", `<script src="/studio-config.js"></script></head>`);
  }
  return `<!doctype html><html><head><meta charset="utf-8"><script src="/studio-config.js"></script></head><body>${html}</body></html>`;
}

Bun.serve({
  hostname: "127.0.0.1",
  port,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/studio-config.js") {
      return new Response(configScript(), {
        headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-store" }
      });
    }

    const requested = url.pathname === "/" ? "/index.html" : url.pathname;
    const candidate = safeResolve(requested);
    if (candidate && existsSync(candidate) && statSync(candidate).isFile()) {
      return new Response(Bun.file(candidate), {
        headers: { "Content-Type": mime(candidate), "Cache-Control": candidate.endsWith(".html") ? "no-store" : "public, max-age=300" }
      });
    }

    const indexPath = path.join(root, "index.html");
    if (existsSync(indexPath) && statSync(indexPath).isFile()) {
      const html = readFileSync(indexPath, "utf8");
      return new Response(injectConfig(html), {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
      });
    }

    return new Response(JSON.stringify({ ok: false, error: "index.html missing" }, null, 2), {
      status: 404,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
});

console.log(`Bun Studio server listening on http://127.0.0.1:${port}`);
