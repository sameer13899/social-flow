import assert from "node:assert/strict";

import type { TuiTestCase } from "../parser/intent-parser.test.js";
import { handleSlashCommand } from "./tui-command-handlers.js";

export const commandHandlerTests: TuiTestCase[] = [
  {
    name: "slash token command opens whatsapp token page",
    fn: () => {
      const res = handleSlashCommand("/token");
      assert.equal(res.consumed, true);
      assert.equal(res.inputToExecute, "open whatsapp token");
    }
  },
  {
    name: "slash fix command maps to fix last error",
    fn: () => {
      const res = handleSlashCommand("/fix");
      assert.equal(res.consumed, true);
      assert.equal(res.inputToExecute, "fix last error");
    }
  },
  {
    name: "slash open passes index through",
    fn: () => {
      const res = handleSlashCommand("/open 2");
      assert.equal(res.consumed, true);
      assert.equal(res.inputToExecute, "open 2");
    }
  }
];
