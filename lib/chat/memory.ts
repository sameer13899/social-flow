const fs = require('fs');
const path = require('path');
const appPaths = require('../app-paths');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function writeJsonAtomic(filePath, data) {
  ensureDir(path.dirname(filePath));
  const tmp = `${filePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, filePath);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function sanitizeSessionId(sessionId) {
  const raw = String(sessionId || '').trim();
  const safe = raw.replace(/[^a-zA-Z0-9._-]/g, '_');
  return safe || '';
}

function generateSessionId() {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const rnd = Math.random().toString(36).slice(2, 8);
  return `chat_${stamp}_${rnd}`;
}

let cachedChatRoot = '';

function uniqueRoots(list) {
  const seen = new Set();
  const out = [];
  list.forEach((x) => {
    const key = String(x || '');
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(key);
  });
  return out;
}

function candidateChatRoots() {
  return uniqueRoots([
    path.join(appPaths.migrateLegacyAppHome(), 'chat', 'sessions'),
    ...appPaths.candidatePaths(['chat', 'sessions']).slice(1),
    path.join(process.cwd(), '.social-flow-chat', 'sessions'),
    path.join(process.cwd(), '.social-cli-chat', 'sessions')
  ]);
}

function isWritableDir(dirPath) {
  try {
    ensureDir(dirPath);
    const probe = path.join(dirPath, `.write_probe_${process.pid}_${Date.now()}.tmp`);
    fs.writeFileSync(probe, 'ok', 'utf8');
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

function chatRoot() {
  if (cachedChatRoot) return cachedChatRoot;
  const candidates = candidateChatRoots();
  for (let i = 0; i < candidates.length; i += 1) {
    const root = candidates[i];
    try {
      if (!isWritableDir(root)) continue;
      cachedChatRoot = root;
      return cachedChatRoot;
    } catch {
      // try next
    }
  }
  throw new Error('Unable to initialize chat session storage directory.');
}

function sessionPath(sessionId) {
  return path.join(chatRoot(), `${sanitizeSessionId(sessionId)}.json`);
}

function sessionCandidates(sessionId) {
  const fileName = `${sanitizeSessionId(sessionId)}.json`;
  return candidateChatRoots().map((root) => path.join(root, fileName));
}

class PersistentMemory {
  constructor(sessionId) {
    this.id = sanitizeSessionId(sessionId) || generateSessionId();
    this.filePath = sessionPath(this.id);
    this.legacyFilePaths = sessionCandidates(this.id).filter((candidate) => candidate !== this.filePath);
  }

  exists() {
    return [this.filePath, ...this.legacyFilePaths].some((candidate) => fs.existsSync(candidate));
  }

  load() {
    const candidates = [this.filePath, ...this.legacyFilePaths];
    for (let i = 0; i < candidates.length; i += 1) {
      const current = readJson(candidates[i]);
      if (current) return current;
    }
    return null;
  }

  save(payload) {
    const data = {
      sessionId: this.id,
      updatedAt: new Date().toISOString(),
      ...payload
    };
    writeJsonAtomic(this.filePath, data);
  }

  static list(limit = 20) {
    const seen = new Map();
    uniqueRoots(candidateChatRoots()).forEach((root) => {
      if (!fs.existsSync(root)) return;
      fs.readdirSync(root)
        .filter((name) => name.endsWith('.json'))
        .forEach((name) => {
          const full = path.join(root, name);
          const stat = fs.statSync(full);
          const sessionId = name.slice(0, -5);
          const existing = seen.get(sessionId);
          const next = {
            sessionId,
            updatedAt: stat.mtime.toISOString(),
            filePath: full
          };
          if (!existing || Date.parse(next.updatedAt) > Date.parse(existing.updatedAt)) {
            seen.set(sessionId, next);
          }
        });
    });
    return Array.from(seen.values())
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      .slice(0, limit);
  }
}

module.exports = {
  PersistentMemory,
  generateSessionId,
  sanitizeSessionId
};
