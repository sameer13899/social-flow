import chalk = require("chalk");

const { createGatewayServer } = require("../lib/gateway/server");

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function main(): Promise<void> {
  const host = process.env.HOST || "0.0.0.0";
  const port = toNumber(process.env.PORT, 1310);

  const server = createGatewayServer({
    host,
    port,
    apiKey: process.env.SOCIAL_GATEWAY_API_KEY,
    requireApiKey: true,
    corsOrigins: process.env.SOCIAL_GATEWAY_CORS_ORIGINS || "",
    rateLimitMax: toNumber(process.env.SOCIAL_GATEWAY_RATE_LIMIT_MAX, 180),
    rateLimitWindowMs: toNumber(process.env.SOCIAL_GATEWAY_RATE_WINDOW_MS, 60_000)
  });

  await server.start();

  const url = server.url();
  console.log(chalk.green("Social Flow hosted gateway is running."));
  console.log(chalk.cyan(`Gateway: ${url}`));
  console.log(chalk.gray(`Health: ${url}/api/health`));
  console.log(chalk.gray(`Status: ${url}/api/status`));

  const shutdown = async () => {
    await server.stop();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack || error.message : String(error);
  console.error(message);
  process.exit(1);
});
