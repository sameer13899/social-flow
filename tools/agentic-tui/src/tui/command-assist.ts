export type AuthApi = "facebook" | "instagram" | "whatsapp";

export type AuthAssistPlan =
  | { kind: "none" }
  | { kind: "auth_root" }
  | { kind: "auth_login"; api?: AuthApi; token?: string };

function parseCommandTokens(raw: string): string[] {
  const text = String(raw || "").trim();
  if (!text) return [];
  const out: string[] = [];
  const token = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`((?:\\.|[^`\\])*)`|([^\s]+)/g;
  let match: RegExpExecArray | null;
  while ((match = token.exec(text)) !== null) {
    const value = match[1] ?? match[2] ?? match[3] ?? match[4] ?? "";
    out.push(value.replace(/\\(["'`\\])/g, "$1"));
  }
  return out;
}

function hasFlag(tokens: string[], flags: string[]): boolean {
  return tokens.some((token) => flags.some((flag) => token === flag || token.startsWith(`${flag}=`)));
}

function flagValue(tokens: string[], flags: string[]): string {
  for (let i = 0; i < tokens.length; i += 1) {
    const token = String(tokens[i] || "");
    for (const flag of flags) {
      if (token === flag) {
        const next = String(tokens[i + 1] || "");
        if (next && !next.startsWith("-")) return next;
      }
      if (token.startsWith(`${flag}=`)) return token.slice(flag.length + 1);
    }
  }
  return "";
}

export function parseAuthApiChoice(raw: string): AuthApi | null {
  const text = String(raw || "").trim().toLowerCase();
  if (!text) return null;
  if (text === "1" || text.includes("facebook") || text === "fb") return "facebook";
  if (text === "2" || text.includes("instagram") || text === "ig" || text === "insta") return "instagram";
  if (text === "3" || text.includes("whatsapp") || text.includes("waba") || text === "wa") return "whatsapp";
  return null;
}

export function detectAuthAssist(raw: string): AuthAssistPlan {
  const tokens = parseCommandTokens(raw);
  if (!tokens.length) return { kind: "none" };
  const first = String(tokens[0] || "").toLowerCase();
  const offset = first === "social" || first === "social-flow" ? 1 : 0;
  const cmd = String(tokens[offset] || "").toLowerCase();
  const sub = String(tokens[offset + 1] || "").toLowerCase();

  if (cmd !== "auth") return { kind: "none" };
  if (!sub) return { kind: "auth_root" };
  if (sub !== "login") return { kind: "none" };

  const apiRaw = flagValue(tokens, ["--api", "-a"]).toLowerCase();
  const api = apiRaw === "instagram" || apiRaw === "whatsapp" || apiRaw === "facebook"
    ? apiRaw
    : undefined;
  const token = flagValue(tokens, ["--token", "-t"]);
  const oauth = hasFlag(tokens, ["--oauth"]);
  const scopes = hasFlag(tokens, ["--scopes", "--scope"]);
  if (oauth || scopes) return { kind: "auth_login", api, token: "" };
  return { kind: "auth_login", api, token };
}

export function rewriteStudioShorthand(raw: string): string {
  const text = String(raw || "").trim();
  if (!text) return text;
  const tokens = parseCommandTokens(text);
  if (tokens.length < 3) return text;
  const first = String(tokens[0] || "").toLowerCase();
  if (first !== "social" && first !== "social-flow") return text;
  if (String(tokens[1] || "").toLowerCase() !== "studio") return text;
  if (!/^https?:\/\//i.test(String(tokens[2] || ""))) return text;
  if (hasFlag(tokens, ["--url", "-u"])) return text;
  const rebuilt = [...tokens.slice(0, 2), "--url", tokens[2], ...tokens.slice(3)];
  return rebuilt.join(" ");
}

export function maskCommandSecrets(raw: string): string {
  let out = String(raw || "").trim();
  if (!out) return out;
  out = out.replace(/(--token|-t)\s+("[^"]+"|'[^']+'|`[^`]+`|[^\s]+)/gi, "$1 ***");
  out = out.replace(/(--token|-t)=("[^"]+"|'[^']+'|`[^`]+`|[^\s]+)/gi, "$1=***");
  out = out.replace(/(--secret|--api-key)\s+("[^"]+"|'[^']+'|`[^`]+`|[^\s]+)/gi, "$1 ***");
  out = out.replace(/(--secret|--api-key)=("[^"]+"|'[^']+'|`[^`]+`|[^\s]+)/gi, "$1=***");
  return out;
}

