import assert from "node:assert/strict";

import type { TuiTestCase } from "../parser/intent-parser.test.js";
import { getExecutor } from "./registry.js";

export const registryExecutorTests: TuiTestCase[] = [
  {
    name: "run_cli blocks interactive auth login without token",
    fn: async () => {
      const executor = getExecutor("run_cli");
      const result = await executor.execute({
        action: "run_cli",
        params: { command: "social auth login -a facebook" }
      });
      assert.equal(result.ok, false);
      assert.match(String(result.output.error || ""), /interactive input/i);
      assert.match(String(result.output.suggestion || ""), /--token/);
    }
  },
  {
    name: "run_cli blocks interactive auth app when credentials are missing",
    fn: async () => {
      const executor = getExecutor("run_cli");
      const result = await executor.execute({
        action: "run_cli",
        params: { command: "social auth app" }
      });
      assert.equal(result.ok, false);
      assert.match(String(result.output.error || ""), /app id\/secret/i);
      assert.match(String(result.output.suggestion || ""), /--id APP_ID --secret APP_SECRET/);
    }
  },
  {
    name: "run_cli blocks setup wizard passthrough",
    fn: async () => {
      const executor = getExecutor("run_cli");
      const result = await executor.execute({
        action: "run_cli",
        params: { command: "social setup" }
      });
      assert.equal(result.ok, false);
      assert.match(String(result.output.error || ""), /interactive wizard/i);
      assert.equal(String(result.output.suggestion || ""), "social setup --help");
    }
  }
];

