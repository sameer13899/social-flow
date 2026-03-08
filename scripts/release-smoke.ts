import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const distRoot = path.resolve(__dirname, '..');

type JsonResponse = {
  status: number | undefined;
  data: Record<string, unknown>;
};

type RawResponse = {
  status: number | undefined;
  body: string;
  contentType: string;
};

function requestJson({ port, method, pathName }: {
  port: number;
  method: string;
  pathName: string;
}): Promise<JsonResponse> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: pathName,
      method,
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        let data: Record<string, unknown> = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          data = {};
        }
        resolve({ status: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function requestRaw({ port, method, pathName }: {
  port: number;
  method: string;
  pathName: string;
}): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: pathName,
      method
    }, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: Buffer.concat(chunks).toString('utf8'),
          contentType: String(res.headers['content-type'] || '')
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function runCliHelpSmoke() {
  const cliPath = path.join(distRoot, 'bin', 'social.js');
  const tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'social-cli-smoke-help-home-'));
  const result = spawnSync(process.execPath, [cliPath, '--help'], {
    cwd: path.resolve(distRoot, '..'),
    env: {
      ...process.env,
      SOCIAL_FLOW_HOME: tempHome,
      SOCIAL_CLI_HOME: tempHome,
      META_CLI_HOME: tempHome
    },
    encoding: 'utf8'
  });

  try {
    assert.equal(result.status, 0, result.stderr || result.stdout || 'social --help failed');
    const output = `${String(result.stdout || '')}\n${String(result.stderr || '')}`;
    assert.match(output, /Usage: social/i);
    assert.match(output, /onboard\|setup/i);
    assert.match(output, /\bdoctor\b/i);
    assert.match(output, /\bstatus\b/i);
    assert.ok(!output.includes('gateway --open'), 'legacy gateway --open reference still present');
  } finally {
    fs.rmSync(tempHome, { recursive: true, force: true });
  }
}

async function runGatewaySmoke() {
  const tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'social-cli-smoke-gateway-home-'));
  const oldMetaHome = process.env.META_CLI_HOME;
  const oldSocialHome = process.env.SOCIAL_CLI_HOME;
  const oldFlowHome = process.env.SOCIAL_FLOW_HOME;
  process.env.META_CLI_HOME = tempHome;
  process.env.SOCIAL_CLI_HOME = tempHome;
  process.env.SOCIAL_FLOW_HOME = tempHome;

  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { createGatewayServer } = require(path.join(distRoot, 'lib', 'gateway', 'server'));
  const server = createGatewayServer({ host: '127.0.0.1', port: 0 });
  try {
    await server.start();

    const health = await requestJson({
      port: server.port,
      method: 'GET',
      pathName: '/api/health'
    });
    assert.equal(health.status, 200);
    assert.equal(health.data.ok, true);

    const root = await requestRaw({
      port: server.port,
      method: 'GET',
      pathName: '/'
    });
    assert.equal(root.status, 410);
    assert.match(root.contentType, /application\/json/i);
    assert.match(root.body, /(Bundled Studio frontend is disabled|Root route is disabled)/i);
    assert.match(root.body, /\/studio\/app/i);
  } finally {
    await server.stop();
    if (oldMetaHome === undefined) delete process.env.META_CLI_HOME;
    else process.env.META_CLI_HOME = oldMetaHome;
    if (oldSocialHome === undefined) delete process.env.SOCIAL_CLI_HOME;
    else process.env.SOCIAL_CLI_HOME = oldSocialHome;
    if (oldFlowHome === undefined) delete process.env.SOCIAL_FLOW_HOME;
    else process.env.SOCIAL_FLOW_HOME = oldFlowHome;
    fs.rmSync(tempHome, { recursive: true, force: true });
  }
}

async function main() {
  // eslint-disable-next-line no-console
  console.log('[smoke] checking CLI help surface...');
  runCliHelpSmoke();
  // eslint-disable-next-line no-console
  console.log('[smoke] checking gateway health and root behavior...');
  await runGatewaySmoke();
  // eslint-disable-next-line no-console
  console.log('[smoke] all release smoke checks passed');
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
