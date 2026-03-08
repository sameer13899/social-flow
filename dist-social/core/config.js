"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configPath = configPath;
exports.readConfig = readConfig;
exports.writeConfig = writeConfig;
const node_fs_1 = require("node:fs");
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const CONFIG_DIR_NAME = ".social-flow";
const LEGACY_CONFIG_DIRS = [".social-cli", ".meta-cli"];
function appHomeDir() {
    if (process.env.SOCIAL_FLOW_HOME)
        return node_path_1.default.resolve(process.env.SOCIAL_FLOW_HOME);
    if (process.env.SOCIAL_CLI_HOME)
        return node_path_1.default.join(node_path_1.default.resolve(process.env.SOCIAL_CLI_HOME), CONFIG_DIR_NAME);
    if (process.env.META_CLI_HOME)
        return node_path_1.default.join(node_path_1.default.resolve(process.env.META_CLI_HOME), CONFIG_DIR_NAME);
    return node_path_1.default.join(node_os_1.default.homedir(), CONFIG_DIR_NAME);
}
function legacyConfigFiles() {
    const current = appHomeDir();
    const parent = node_path_1.default.dirname(current);
    const out = [node_path_1.default.join(current, "config.json")];
    for (const legacyDir of LEGACY_CONFIG_DIRS) {
        out.push(node_path_1.default.join(parent, legacyDir, "config.json"));
    }
    const seen = new Set();
    return out.filter((item) => {
        const key = process.platform === "win32" ? item.toLowerCase() : item;
        if (seen.has(key))
            return false;
        seen.add(key);
        return true;
    });
}
const DEFAULT_CONFIG = {
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
async function configPath() {
    const dir = appHomeDir();
    await node_fs_1.promises.mkdir(dir, { recursive: true });
    return node_path_1.default.join(dir, "config.json");
}
async function readConfig() {
    const currentFile = await configPath();
    const candidates = legacyConfigFiles();
    for (const file of candidates) {
        try {
            const raw = await node_fs_1.promises.readFile(file, "utf8");
            const parsed = JSON.parse(raw);
            const normalized = {
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
            if (file !== currentFile)
                await writeConfig(normalized);
            return normalized;
        }
        catch {
            // try next candidate
        }
    }
    await writeConfig(DEFAULT_CONFIG);
    return { ...DEFAULT_CONFIG };
}
async function writeConfig(config) {
    const file = await configPath();
    await node_fs_1.promises.writeFile(file, JSON.stringify(config, null, 2), "utf8");
}
