const chalk = require('chalk');
const { getGatewayStatus, fetchHealth } = require('../lib/gateway/manager');
const { buildReadinessReport, buildProfilesReadinessReport } = require('../lib/readiness');
const { renderPanel, formatBadge, kv } = require('../lib/ui/chrome');
const { deriveGuidanceSteps, guidanceRows } = require('../lib/guidance');

function registerStatusCommand(program) {
  program
    .command('status')
    .description('Show gateway runtime status and setup readiness')
    .option('--json', 'Output as JSON')
    .option('--profiles', 'Show readiness across all profiles')
    .action(async (opts) => {
      let service = getGatewayStatus();
      const readiness = buildReadinessReport();
      const profilesReadiness = opts.profiles ? buildProfilesReadinessReport() : null;
      let health = await fetchHealth(service.host, service.port);

      // Recover from stale runtime state by probing default localhost endpoint.
      if (!service.running && !health.ok) {
        const fallbackHost = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
        const fallbackPort = Number(process.env.PORT || 1310);
        const shouldProbeFallback = fallbackHost !== service.host || fallbackPort !== service.port;
        if (shouldProbeFallback) {
          const fallbackHealth = await fetchHealth(fallbackHost, fallbackPort);
          if (fallbackHealth.ok) {
            service = {
              ...service,
              host: fallbackHost,
              port: fallbackPort
            };
            health = fallbackHealth;
          }
        }
      }
      const managedRunning = service.running;
      const externalRunning = !managedRunning && health.ok;

      if (opts.json) {
        console.log(JSON.stringify({
          service: {
            running: managedRunning || externalRunning,
            managed: managedRunning,
            external: externalRunning,
            pid: service.pid,
            host: service.host,
            port: service.port,
            startedAt: service.startedAt,
            health
          },
          readiness,
          profilesReadiness
        }, null, 2));
        return;
      }

      const serviceRows = [
        kv(
          'Running',
          managedRunning || externalRunning ? formatBadge('YES', { tone: 'success' }) : formatBadge('NO', { tone: 'warn' }),
          { labelWidth: 12 }
        ),
        kv('Mode', managedRunning ? chalk.cyan('managed') : (externalRunning ? chalk.yellow('external') : chalk.gray('down')), { labelWidth: 12 }),
        kv('PID', managedRunning ? chalk.cyan(String(service.pid)) : '', { labelWidth: 12 }),
        kv('Host', chalk.cyan(service.host), { labelWidth: 12 }),
        kv('Port', chalk.cyan(String(service.port)), { labelWidth: 12 }),
        kv('Health', health.ok ? formatBadge('OK', { tone: 'success' }) : formatBadge('DOWN', { tone: 'warn' }), { labelWidth: 12 }),
        kv('Started', service.startedAt ? chalk.gray(service.startedAt) : '', { labelWidth: 12 })
      ];

      const readinessRows = [
        kv('Profile', chalk.cyan(readiness.activeProfile), { labelWidth: 16 }),
        kv('Ready', readiness.ok ? formatBadge('YES', { tone: 'success' }) : formatBadge('NO', { tone: 'warn' }), { labelWidth: 16 }),
        kv('Default API', chalk.cyan(readiness.defaultApi || 'facebook'), { labelWidth: 16 }),
        kv('Tokens', readiness.anyTokenConfigured ? formatBadge('READY', { tone: 'success' }) : formatBadge('MISSING', { tone: 'warn' }), { labelWidth: 16 }),
        kv('Onboarding', readiness.onboardingCompleted ? formatBadge('DONE', { tone: 'success' }) : formatBadge('PENDING', { tone: 'warn' }), { labelWidth: 16 }),
        kv('App Credentials', readiness.appCredentialsConfigured ? formatBadge('READY', { tone: 'success' }) : formatBadge('PENDING', { tone: 'warn' }), { labelWidth: 16 })
      ];

      const guidance = deriveGuidanceSteps({
        readiness,
        health
      });
      const nextRows = guidanceRows(guidance);
      if (externalRunning) {
        nextRows.splice(0, 0, chalk.yellow('Gateway is running as an external process; `social stop` will not stop it.'));
      }

      console.log('');
      console.log(renderPanel({
        title: ' Runtime Status ',
        rows: serviceRows,
        minWidth: 84,
        borderColor: (value) => chalk.cyan(value)
      }));
      console.log('');
      console.log(renderPanel({
        title: ' Setup Readiness ',
        rows: readinessRows,
        minWidth: 84,
        borderColor: (value) => chalk.blue(value)
      }));

      if (profilesReadiness) {
        const profileRows = profilesReadiness.profiles.map((item) => {
          const readyBadge = item.readiness.ok
            ? formatBadge('READY', { tone: 'success' })
            : formatBadge('SETUP', { tone: 'warn' });
          const tokenBadge = item.readiness.anyTokenConfigured
            ? formatBadge('TOKENS', { tone: 'success' })
            : formatBadge('TOKENS?', { tone: 'warn' });
          const onboardingBadge = item.readiness.onboardingCompleted
            ? formatBadge('ONBOARD', { tone: 'success' })
            : formatBadge('ONBOARD?', { tone: 'warn' });
          const appBadge = item.readiness.appCredentialsConfigured
            ? formatBadge('APP', { tone: 'success' })
            : formatBadge('APP?', { tone: 'warn' });
          const prefix = item.active ? chalk.green('*') : ' ';
          return `${prefix} ${chalk.cyan(item.profile)}  ${readyBadge} ${tokenBadge} ${onboardingBadge} ${appBadge}`;
        });

        const summaryRows = [
          kv('Profiles', chalk.cyan(String(profilesReadiness.summary.total)), { labelWidth: 16 }),
          kv('Ready', chalk.cyan(String(profilesReadiness.summary.ready)), { labelWidth: 16 }),
          kv('Needs Setup', chalk.cyan(String(profilesReadiness.summary.needsSetup)), { labelWidth: 16 }),
          kv('Tokens Missing', chalk.cyan(String(profilesReadiness.summary.tokensMissing)), { labelWidth: 16 })
        ];

        console.log('');
        console.log(renderPanel({
          title: ' Profiles Summary ',
          rows: summaryRows,
          minWidth: 84,
          borderColor: (value) => chalk.cyan(value)
        }));
        console.log('');
        console.log(renderPanel({
          title: ' Profiles Readiness ',
          rows: profileRows,
          minWidth: 84,
          borderColor: (value) => chalk.blue(value)
        }));
      }
      console.log('');
      console.log(renderPanel({
        title: ' Guidance Sequence ',
        rows: nextRows,
        minWidth: 84,
        borderColor: (value) => chalk.yellow(value)
      }));
      console.log('');
    });
}

module.exports = registerStatusCommand;
