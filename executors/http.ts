import axios, { type AxiosInstance, type AxiosError } from "axios";

import type { SocialConfig } from "../core/types.js";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(error: AxiosError): boolean {
  const status = error.response?.status;
  const code = (error.response?.data as { error?: { code?: number } } | undefined)?.error?.code;
  if (status === 429) return true;
  if (status && status >= 500 && status <= 599) return true;
  if (code === 613 || code === 17 || code === 32) return true;
  const networkCodes = new Set(["ECONNRESET", "ETIMEDOUT", "ECONNABORTED", "ENOTFOUND", "EAI_AGAIN"]);
  return Boolean(error.code && networkCodes.has(String(error.code)));
}

function retryDelayMs(attempt: number): number {
  const base = Number.parseInt(process.env.SOCIAL_META_RETRY_BASE_MS || "1000", 10) || 1000;
  const max = Number.parseInt(process.env.SOCIAL_META_RETRY_MAX_MS || "8000", 10) || 8000;
  const backoff = Math.min(max, base * Math.pow(2, attempt));
  const jitter = Math.floor(backoff * 0.3 * Math.random());
  return backoff + jitter;
}

export class MetaHttpExecutor {
  private readonly client: AxiosInstance;
  private readonly token: string;
  private readonly maxRetries: number;

  constructor(config: SocialConfig) {
    this.token = config.token;
    this.client = axios.create({
      baseURL: `https://graph.facebook.com/${config.graphVersion}`,
      timeout: 30_000
    });
    const parsed = Number.parseInt(process.env.SOCIAL_META_RETRY_MAX || "3", 10);
    this.maxRetries = Number.isFinite(parsed) ? Math.max(1, parsed) : 3;
  }

  private async requestWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    for (let attempt = 0; attempt < this.maxRetries; attempt += 1) {
      try {
        return await fn();
      } catch (error) {
        const err = error as AxiosError;
        if (attempt < this.maxRetries - 1 && shouldRetry(err)) {
          await sleep(retryDelayMs(attempt));
          continue;
        }
        throw error;
      }
    }
    throw new Error("Unreachable");
  }

  async get(path: string, params: Record<string, string>): Promise<Record<string, unknown>> {
    return this.requestWithRetry(async () => {
      const { data } = await this.client.get(path, {
        params: { ...params, access_token: this.token }
      });
      return data as Record<string, unknown>;
    });
  }

  async post(path: string, params: Record<string, string>): Promise<Record<string, unknown>> {
    return this.requestWithRetry(async () => {
      const { data } = await this.client.post(path, null, {
        params: { ...params, access_token: this.token }
      });
      return data as Record<string, unknown>;
    });
  }
}

export const _private = {
  shouldRetry,
  retryDelayMs
};
