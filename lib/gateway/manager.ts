const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn, spawnSync } = require('child_process');
const packageJson = require('../../package.json');
const config = require('../config');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function writeJsonAtomic(filePath, data) {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, filePath);
}

function safeUnlink(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch {
    // Ignore cleanup errors.
  }
}

function getRuntimePaths() {
  const runtimeDir = resolveRuntimeDir();
  return {
    runtimeDir,
    pidFile: path.join(runtimeDir, 'gateway.pid'),
    stateFile: path.join(runtimeDir, 'gateway.json'),
    logFile: path.join(runtimeDir, 'gateway.log')
  };
}

function canWriteDir(dirPath) {
  try {
    ensureDir(dirPath);
    const probe = path.join(dirPath, '.write-test');
    fs.writeFileSync(probe, 'ok', 'utf8');
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

function resolveRuntimeDir() {
  const preferredBase = path.dirname(config.getConfigPath());
  const candidates = [
    path.join(preferredBase, 'runtime'),
    path.join(process.cwd(), '.social-runtime'),
    path.join(os.tmpdir(), 'social-cli-runtime')
  ];
  for (const dir of candidates) {
    if (canWriteDir(dir)) return dir;
  }
  return path.join(preferredBase, 'runtime');
}

function isProcessRunning(pid) {
  const target = Number(pid || 0);
  if (!Number.isInteger(target) || target <= 0) return false;
  try {
    process.kill(target, 0);
    return true;
  } catch (error) {
    const code = error && error.code ? String(error.code) : '';
    // On some systems EPERM means process exists but signal is not permitted.
    if (code === 'EPERM') return true;
    return false;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function currentGatewayVersion() {
  return String(packageJson?.version || '').trim();
}

function isSocialGatewayHealth(health = {}) {
  const data = health && typeof health === 'object' ? (health.data || {}) : {};
  return Boolean(
    health &&
    health.ok &&
    String(data.service || '').trim().toLowerCase() === 'social-api-gateway'
  );
}

function shouldReplaceExternalGateway(existingHealth = {}, options = {}) {
  const forceReplace = options.replace === true || options.replaceExternal === true;
  const allowVersionReplace = options.replaceOnVersionMismatch !== false;
  const requireStudioRoute = options.requireStudioRoute === true;
  const studioRouteOk = options.studioRouteOk !== false;
  if (forceReplace) {
    return {
      replace: true,
      reason: 'forced_replace',
      existingVersion: String(existingHealth?.data?.version || '').trim(),
      currentVersion: currentGatewayVersion()
    };
  }
  if (!allowVersionReplace) {
    return {
      replace: false,
      reason: 'version_replace_disabled',
      existingVersion: String(existingHealth?.data?.version || '').trim(),
      currentVersion: currentGatewayVersion()
    };
  }
  if (!isSocialGatewayHealth(existingHealth)) {
    return {
      replace: false,
      reason: 'not_social_gateway',
      existingVersion: String(existingHealth?.data?.version || '').trim(),
      currentVersion: currentGatewayVersion()
    };
  }
  if (requireStudioRoute && !studioRouteOk) {
    return {
      replace: true,
      reason: 'studio_route_unavailable',
      existingVersion: String(existingHealth?.data?.version || '').trim(),
      currentVersion: currentGatewayVersion()
    };
  }
  const existingVersion = String(existingHealth?.data?.version || '').trim();
  const currentVersion = currentGatewayVersion();
  if (!existingVersion || !currentVersion) {
    return { replace: false, reason: 'unknown_version', existingVersion, currentVersion };
  }
  if (existingVersion !== currentVersion) {
    return { replace: true, reason: 'version_mismatch', existingVersion, currentVersion };
  }
  return { replace: false, reason: 'same_version', existingVersion, currentVersion };
}

function portFromEndpoint(value) {
  const raw = String(value || '').trim();
  const match = raw.match(/:(\d+)$/);
  if (!match) return 0;
  const n = Number(match[1]);
  return Number.isInteger(n) && n > 0 ? n : 0;
}

function windowsListeningPids(port) {
  const out = spawnSync('netstat', ['-ano', '-p', 'tcp'], {
    encoding: 'utf8',
    windowsHide: true
  });
  if (out.error || Number(out.status || 1) !== 0) return [];
  const target = Number(port);
  if (!Number.isInteger(target) || target <= 0) return [];
  const pids = new Set();
  String(out.stdout || '')
    .split(/\r?\n/)
    .forEach((line) => {
      const parts = String(line || '').trim().split(/\s+/);
      if (parts.length < 5) return;
      const proto = String(parts[0] || '').toUpperCase();
      const local = String(parts[1] || '');
      const state = String(parts[3] || '').toUpperCase();
      const pid = Number(parts[4]);
      if (!proto.startsWith('TCP')) return;
      if (state !== 'LISTENING' && state !== 'LISTEN') return;
      if (portFromEndpoint(local) !== target) return;
      if (!Number.isInteger(pid) || pid <= 0) return;
      pids.add(pid);
    });
  return [...pids];
}

function posixListeningPids(port) {
  const target = Number(port);
  if (!Number.isInteger(target) || target <= 0) return [];
  const out = spawnSync('lsof', ['-nP', `-iTCP:${target}`, '-sTCP:LISTEN', '-t'], {
    encoding: 'utf8',
    windowsHide: true
  });
  if (out.error || Number(out.status || 1) !== 0) return [];
  const pids = new Set();
  String(out.stdout || '')
    .split(/\r?\n/)
    .map((line) => Number(String(line || '').trim()))
    .filter((pid) => Number.isInteger(pid) && pid > 0)
    .forEach((pid) => pids.add(pid));
  return [...pids];
}

function listeningPidsForPort(port) {
  if (process.platform === 'win32') return windowsListeningPids(port);
  return posixListeningPids(port);
}

async function terminatePid(pid, options = {}) {
  const target = Number(pid || 0);
  if (!Number.isInteger(target) || target <= 0) {
    return { pid: target, attempted: false, stopped: false };
  }
  if (!isProcessRunning(target)) {
    return { pid: target, attempted: false, stopped: true };
  }
  try {
    process.kill(target, 'SIGTERM');
  } catch {
    // best effort
  }
  const timeoutMs = Math.max(500, Number(options.timeoutMs || 2500));
  const startedAt = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!isProcessRunning(target)) {
      return { pid: target, attempted: true, stopped: true, signal: 'SIGTERM' };
    }
    if (Date.now() - startedAt >= timeoutMs) break;
    // eslint-disable-next-line no-await-in-loop
    await wait(120);
  }
  try {
    process.kill(target, 'SIGKILL');
  } catch {
    // best effort
  }
  await wait(120);
  return {
    pid: target,
    attempted: true,
    stopped: !isProcessRunning(target),
    signal: 'SIGKILL'
  };
}

async function stopListenersOnPort(port, options = {}) {
  const targetPort = Number(port || 0);
  if (!Number.isInteger(targetPort) || targetPort <= 0) {
    return {
      port: targetPort,
      pids: [],
      results: [],
      stoppedCount: 0
    };
  }
  const exclude = new Set([process.pid]);
  const extraExclude = Array.isArray(options.excludePids) ? options.excludePids : [];
  extraExclude
    .map((x) => Number(x))
    .filter((x) => Number.isInteger(x) && x > 0)
    .forEach((x) => exclude.add(x));
  const pids = listeningPidsForPort(targetPort).filter((pid) => !exclude.has(pid));
  const results = [];
  for (const pid of pids) {
    // eslint-disable-next-line no-await-in-loop
    const result = await terminatePid(pid, { timeoutMs: options.timeoutMs });
    results.push(result);
  }
  return {
    port: targetPort,
    pids,
    results,
    stoppedCount: results.filter((x) => x.stopped).length
  };
}

function fetchHealth(host, port, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const req = http.get(
      {
        host,
        port,
        path: '/api/health',
        timeout: timeoutMs
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          let data = {};
          try {
            const raw = Buffer.concat(chunks).toString('utf8');
            data = raw ? JSON.parse(raw) : {};
          } catch {
            data = {};
          }
          resolve({
            ok: res.statusCode === 200 && Boolean(data.ok),
            status: res.statusCode || 0,
            data
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, status: 0, data: {} });
    });
    req.on('error', () => resolve({ ok: false, status: 0, data: {} }));
  });
}

function fetchPath(host, port, pathName, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const req = http.get(
      {
        host,
        port,
        path: String(pathName || '/').trim() || '/',
        timeout: timeoutMs
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: Number(res.statusCode || 0),
            body: Buffer.concat(chunks).toString('utf8')
          });
        });
      }
    );
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, body: '' });
    });
    req.on('error', () => resolve({ status: 0, body: '' }));
  });
}

function isStudioRouteUnavailable(probe = {}) {
  const status = Number(probe.status || 0);
  const body = String(probe.body || '');
  const normalized = body.toLowerCase();
  // `/studio/app/` is expected to return the working Studio HTML directly.
  // Any other status means the process on the port is not serving the usable UI.
  if (status !== 200) return true;
  if (normalized.includes('studio app frontend is not installed')) return true;
  if (normalized.includes('bundled studio frontend is not installed')) return true;
  return false;
}

async function waitForHealthy(options = {}) {
  const host = String(options.host || '127.0.0.1').trim();
  const port = Number(options.port || 1310);
  const timeoutMs = Math.max(500, Number(options.timeoutMs || 12000));
  const startedAt = Date.now();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const health = await fetchHealth(host, port, 1200);
    if (health.ok) return health;
    if (Date.now() - startedAt >= timeoutMs) return health;
    // eslint-disable-next-line no-await-in-loop
    await wait(350);
  }
}

function readPid(paths) {
  if (!fs.existsSync(paths.pidFile)) return 0;
  const raw = String(fs.readFileSync(paths.pidFile, 'utf8') || '').trim();
  const pid = Number(raw);
  return Number.isInteger(pid) && pid > 0 ? pid : 0;
}

function writePid(paths, pid) {
  ensureDir(paths.runtimeDir);
  fs.writeFileSync(paths.pidFile, String(pid), 'utf8');
}

function buildGatewayArgs(options = {}) {
  const host = String(options.host || '127.0.0.1').trim();
  const port = String(options.port || '1310').trim();
  const apiKey = String(options.apiKey || '').trim();
  const corsOrigins = String(options.corsOrigins || '').trim();
  const rateLimitMax = String(options.rateLimitMax || '180').trim();
  const rateLimitWindowMs = String(options.rateLimitWindowMs || '60000').trim();
  const args = ['--no-banner', 'gateway', '--host', host, '--port', port, '--rate-limit-max', rateLimitMax, '--rate-limit-window-ms', rateLimitWindowMs];

  if (apiKey) args.push('--api-key', apiKey);
  if (options.requireApiKey) args.push('--require-api-key');
  if (corsOrigins) args.push('--cors-origins', corsOrigins);
  if (options.debug) args.push('--debug');
  return { host, port: Number(port), args };
}

function getGatewayStatus() {
  const paths = getRuntimePaths();
  ensureDir(paths.runtimeDir);
  const pid = readPid(paths);
  const state = readJson(paths.stateFile) || {};
  const running = isProcessRunning(pid);
  return {
    running,
    pid,
    host: String(state.host || '127.0.0.1'),
    port: Number(state.port || 1310),
    startedAt: String(state.startedAt || ''),
    paths
  };
}

async function startGatewayBackground(options = {}) {
  const { host, port, args } = buildGatewayArgs(options);
  const status = getGatewayStatus();
  const existingHealth = await fetchHealth(host, port);
  let replacedExternal = false;
  let replaceDecision = null;
  let replaceCleanup = null;

  if (existingHealth.ok) {
    let studioRouteOk = true;
    if (isSocialGatewayHealth(existingHealth) && options.requireStudioRoute === true) {
      const studioProbe = await fetchPath(host, port, '/studio/app/', 1400);
      if (isStudioRouteUnavailable(studioProbe)) studioRouteOk = false;
    }
    replaceDecision = shouldReplaceExternalGateway(existingHealth, {
      ...options,
      studioRouteOk
    });
    if (!replaceDecision.replace) {
      return {
        started: false,
        external: true,
        replacedExternal: false,
        replaceDecision,
        status: {
          ...status,
          host,
          port
        },
        health: existingHealth
      };
    }
    replaceCleanup = await stopListenersOnPort(port, { excludePids: [status.pid], timeoutMs: 2800 });
    const healthAfterCleanup = await fetchHealth(host, port);
    if (healthAfterCleanup.ok) {
      return {
        started: false,
        external: true,
        replacedExternal: false,
        replaceDecision,
        replaceCleanup,
        status: {
          ...status,
          host,
          port
        },
        health: healthAfterCleanup
      };
    }
    replacedExternal = Boolean(replaceCleanup && replaceCleanup.stoppedCount > 0);
  }

  if (status.running) {
    const health = await fetchHealth(status.host, status.port);
    return {
      started: false,
      external: false,
      status,
      health
    };
  }

  const paths = getRuntimePaths();
  ensureDir(paths.runtimeDir);

  const binPath = path.join(__dirname, '..', '..', 'bin', 'social.js');
  const commandArgs = [binPath, ...args];
  const outFd = fs.openSync(paths.logFile, 'a');

  const child = spawn(process.execPath, commandArgs, {
    detached: true,
    stdio: ['ignore', outFd, outFd],
    env: process.env,
    windowsHide: true
  });
  child.unref();
  fs.closeSync(outFd);

  writePid(paths, child.pid);
  writeJsonAtomic(paths.stateFile, {
    host,
    port,
    startedAt: new Date().toISOString(),
    args
  });

  const health = await waitForHealthy({ host, port, timeoutMs: options.healthTimeoutMs || 12000 });
  return {
    started: true,
    external: false,
    replacedExternal,
    replaceDecision,
    replaceCleanup,
    status: getGatewayStatus(),
    health
  };
}

async function stopGatewayBackground(options = {}) {
  const status = getGatewayStatus();
  const paths = status.paths;
  if (!status.pid || !status.running) {
    safeUnlink(paths.pidFile);
    return {
      stopped: false,
      alreadyStopped: true,
      status: getGatewayStatus()
    };
  }

  try {
    process.kill(status.pid, 'SIGTERM');
  } catch {
    // If we cannot signal, proceed to cleanup checks.
  }

  const timeoutMs = Math.max(500, Number(options.timeoutMs || 5000));
  const startedAt = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!isProcessRunning(status.pid)) break;
    if (Date.now() - startedAt >= timeoutMs) break;
    // eslint-disable-next-line no-await-in-loop
    await wait(180);
  }

  if (isProcessRunning(status.pid)) {
    try {
      process.kill(status.pid, 'SIGKILL');
    } catch {
      // Best effort hard stop.
    }
  }

  safeUnlink(paths.pidFile);
  if (options.clearState) safeUnlink(paths.stateFile);

  return {
    stopped: !isProcessRunning(status.pid),
    alreadyStopped: false,
    status: getGatewayStatus()
  };
}

function tailLines(text, limit = 120) {
  const n = Math.max(1, Number(limit || 120));
  return String(text || '')
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .slice(-n)
    .join('\n');
}

function readGatewayLogs(options = {}) {
  const paths = getRuntimePaths();
  if (!fs.existsSync(paths.logFile)) return '';
  const raw = fs.readFileSync(paths.logFile, 'utf8');
  return tailLines(raw, Number(options.lines || 120));
}

module.exports = {
  fetchHealth,
  getGatewayStatus,
  startGatewayBackground,
  stopGatewayBackground,
  readGatewayLogs,
  tailLines,
  _private: {
    shouldReplaceExternalGateway,
    portFromEndpoint,
    listeningPidsForPort,
    isStudioRouteUnavailable
  }
};
