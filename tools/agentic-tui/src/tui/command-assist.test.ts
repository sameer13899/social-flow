import assert from "node:assert/strict";

import type { TuiTestCase } from "../parser/intent-parser.test.js";
import {
  detectAuthAssist,
  maskCommandSecrets,
  parseAuthApiChoice,
  rewriteStudioShorthand
} from "./command-assist.js";

export const commandAssistTests: TuiTestCase[] = [
  {
    name: "detects social auth root command",
    fn: () => {
      const plan = detectAuthAssist("social auth");
      assert.equal(plan.kind, "auth_root");
    }
  },
  {
    name: "detects social auth login without token for guided follow-up",
    fn: () => {
      const plan = detectAuthAssist("social auth login -a instagram");
      assert.equal(plan.kind, "auth_login");
      assert.equal(plan.api, "instagram");
      assert.equal(plan.token || "", "");
    }
  },
  {
    name: "detects social auth login with token",
    fn: () => {
      const plan = detectAuthAssist("social auth login -a facebook --token abc123");
      assert.equal(plan.kind, "auth_login");
      assert.equal(plan.api, "facebook");
      assert.equal(plan.token, "abc123");
    }
  },
  {
    name: "rewrites social studio url shorthand to --url form",
    fn: () => {
      const rewritten = rewriteStudioShorthand("social studio http://127.0.0.1:1310/api/status?doctor=1");
      assert.equal(rewritten, "social studio --url http://127.0.0.1:1310/api/status?doctor=1");
    }
  },
  {
    name: "masks token and secret arguments in command text",
    fn: () => {
      const masked = maskCommandSecrets("social auth login -a facebook --token abc123 --api-key key123 --secret sec123");
      assert.equal(masked.includes("abc123"), false);
      assert.equal(masked.includes("key123"), false);
      assert.equal(masked.includes("sec123"), false);
      assert.match(masked, /--token \*\*\*/);
      assert.match(masked, /--api-key \*\*\*/);
      assert.match(masked, /--secret \*\*\*/);
    }
  },
  {
    name: "parses auth api choices from simple user replies",
    fn: () => {
      assert.equal(parseAuthApiChoice("facebook"), "facebook");
      assert.equal(parseAuthApiChoice("insta"), "instagram");
      assert.equal(parseAuthApiChoice("waba"), "whatsapp");
      assert.equal(parseAuthApiChoice("2"), "instagram");
    }
  }
];

