import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

import type { SocialConfig } from "./types.js";

const CONFIG_DIR_NAME = ".social-flow";
const LEGACY_CONFIG_DIRS = [".social-cli", ".meta-cli"];

function appHomeDir(): string {
  if (process.env.SOCIAL_FLOW_HOME) return path.resolve(process.env.SOCIAL_FLOW_HOME);
  if (process.env.SOCIAL_CLI_HOME) return path.join(path.resolve(process.env.SOCIAL_CLI_HOME), CONFIG_DIR_NAME);
  if (process.env.META_CLI_HOME) return path.join(path.resolve(process.env.META_CLI_HOME), CONFIG_DIR_NAME);
  return path.join(os.homedir(), CONFIG_DIR_NAME);
}

function legacyConfigFiles(): string[] {
  const current = appHomeDir();
  const parent = path.dirname(current);
  const out = [path.join(current, "config.json")];
  for (const legacyDir of LEGACY_CONFIG_DIRS) {
    out.push(path.join(parent, legacyDir, "config.json"));
  }
  const seen = new Set<string>();
  return out.filter((item) => {
    const key = process.platform === "win32" ? item.toLowerCase() : item;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const DEFAULT_CONFIG: SocialConfig = {
  token: "",
  graphVersion: "v20.0",
  scopes: [],
  ai: {
    provider: "ollama",
    model: "qwen2.5:7b",
    baseUrl: "http://127.0.0.1:11434",
    apiKey: ""
  }
};

export async function configPath(): Promise<string> {
  const dir = appHomeDir();
  await fs.mkdir(dir, { recursive: true });
  return path.join(dir, "config.json");
}

export async function readConfig(): Promise<SocialConfig> {
  const currentFile = await configPath();
  const candidates = legacyConfigFiles();
  for (const file of candidates) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed = JSON.parse(raw) as Partial<SocialConfig>;
      const normalized: SocialConfig = {
        token: typeof parsed.token === "string" ? parsed.token : "",
        graphVersion: typeof parsed.graphVersion === "string" ? parsed.graphVersion : "v20.0",
        scopes: Array.isArray(parsed.scopes) ? parsed.scopes.map((x) => String(x)) : [],
        defaultPageId: typeof parsed.defaultPageId === "string" ? parsed.defaultPageId : undefined,
        defaultAdAccountId: typeof parsed.defaultAdAccountId === "string" ? parsed.defaultAdAccountId : undefined,
        ai: {
          provider: parsed.ai?.provider === "openai" ? "openai" : "ollama",
          model: typeof parsed.ai?.model === "string" ? parsed.ai.model : DEFAULT_CONFIG.ai?.model,
          baseUrl: typeof parsed.ai?.baseUrl === "string" ? parsed.ai.baseUrl : DEFAULT_CONFIG.ai?.baseUrl,
          apiKey: typeof parsed.ai?.apiKey === "string" ? parsed.ai.apiKey : ""
        }
      };
      if (file !== currentFile) await writeConfig(normalized);
      return normalized;
    } catch {
      // try next candidate
    }
  }
  await writeConfig(DEFAULT_CONFIG);
  return { ...DEFAULT_CONFIG };
}

export async function writeConfig(config: SocialConfig): Promise<void> {
  const file = await configPath();
  await fs.writeFile(file, JSON.stringify(config, null, 2), "utf8");
}
