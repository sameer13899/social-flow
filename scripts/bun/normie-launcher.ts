import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { spawn } from "node:child_process";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dir, "..", "..");
const socialBin = path.join(repoRoot, "bin", "social.js");

const rl = createInterface({ input: stdin, output: stdout });

function runSocial(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [socialBin, "--no-banner", ...args], {
      cwd: repoRoot,
      stdio: "inherit",
      env: process.env
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`social ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function main() {
  const choice = String(await rl.question([
    "",
    "Social Flow starter",
    "1) Set up Facebook, Instagram, and WhatsApp ads",
    "2) Open Studio only",
    "3) Exit",
    "",
    "Pick 1, 2, or 3: "
  ].join("\n"))).trim();

  if (!["1", "2", "3"].includes(choice)) {
    rl.close();
    console.error("Please choose 1, 2, or 3.");
    process.exitCode = 1;
    return;
  }

  if (choice === "3") {
    rl.close();
    return;
  }

  if (choice === "2") {
    rl.close();
    await runSocial(["studio", "--frontend-path", path.join(repoRoot, "docs", "agentic-frontend")]);
    return;
  }

  console.log("\nLaunching guided onboarding, then opening Studio...\n");
  rl.close();
  await runSocial(["onboard", "--no-hatch"]);
  await runSocial(["studio", "--frontend-path", path.join(repoRoot, "docs", "agentic-frontend")]);
}

main().catch((error) => {
  console.error(String(error?.stack || error));
  process.exitCode = 1;
});
