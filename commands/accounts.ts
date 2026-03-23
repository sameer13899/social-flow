const chalk = require('chalk');
const inquirer = require('inquirer');
const config = require('../lib/config');
const storage = require('../lib/ops/storage');
const { buildReadinessReport } = require('../lib/readiness');
const { renderPanel, formatBadge } = require('../lib/ui/chrome');

const SUCCESS_STATUSES = new Set(['done', 'success', 'ok']);
const FAILURE_STATUSES = new Set(['error', 'failed']);

function summarizeActionLog(rows) {
  const entries = Array.isArray(rows) ? rows : [];
  let success = 0;
  let failed = 0;
  let lastError = '';
  let lastActivity = '';

  entries.forEach((entry) => {
    const status = String(entry?.status || '').toLowerCase();
    if (SUCCESS_STATUSES.has(status)) success += 1;
    if (FAILURE_STATUSES.has(status)) failed += 1;
  });

  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const when = String(entries[i]?.when || entries[i]?.createdAt || '').trim();
    if (when) {
      lastActivity = when;
      break;
    }
  }

  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const status = String(entries[i]?.status || '').toLowerCase();
    if (FAILURE_STATUSES.has(status)) {
      lastError = String(entries[i]?.summary || entries[i]?.why || entries[i]?.action || '');
      break;
    }
  }

  return { success, failed, lastError, lastActivity };
}

function truncateText(value, max = 36) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function formatActivity(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toISOString().replace('T', ' ').slice(0, 16);
}

function withProfile(profile, fn) {
  config.useProfile(profile);
  try {
    return fn();
  } finally {
    config.clearProfileOverride();
  }
}

function registerAccountsCommands(program) {
  const accounts = program.command('accounts').description('Manage multiple accounts/profiles');

  accounts
    .command('list')
    .description('List profiles and show the active one')
    .option('--json', 'Output as JSON')
    .action((options) => {
      const profiles = config.listProfiles();
      const active = config.getActiveProfile();
      if (options.json) {
        console.log(JSON.stringify({ active, profiles }, null, 2));
        return;
      }
      console.log(chalk.bold('\nProfiles:'));
      profiles.forEach((p) => {
        const mark = p === active ? chalk.green('*') : ' ';
        console.log(`${mark} ${chalk.cyan(p)}`);
      });
      console.log('');
    });

  accounts
    .command('summary')
    .description('Agency summary across profiles (readiness + recent ops)')
    .option('--json', 'Output as JSON')
    .action((options) => {
      const profiles = config.listProfiles();
      const active = config.getActiveProfile();
      if (!profiles.length) {
        console.log(chalk.yellow('! No profiles found. Add one with: social accounts add <name>'));
        console.log('');
        return;
      }

      const snapshots = profiles.map((profile) => {
        const readiness = withProfile(profile, () => buildReadinessReport());
        const metrics = summarizeActionLog(storage.listActionLog(profile));
        return {
          profile,
          active: profile === active,
          readiness,
          metrics
        };
      });

      if (options.json) {
        console.log(JSON.stringify({ active, profiles: snapshots }, null, 2));
        return;
      }

      const readyCount = snapshots.filter((s) => s.readiness.ok).length;
      const tokenMissing = snapshots.filter((s) => !s.readiness.anyTokenConfigured).length;
      const errorCount = snapshots.filter((s) => s.metrics.failed > 0).length;

      const summaryRows = [
        `${chalk.gray('Active workspace'.padEnd(18, ' '))} ${chalk.cyan(active)}`,
        `${chalk.gray('Workspaces'.padEnd(18, ' '))} ${chalk.cyan(String(snapshots.length))}`,
        `${chalk.gray('Ready to run'.padEnd(18, ' '))} ${chalk.cyan(String(readyCount))}`,
        `${chalk.gray('Needs setup'.padEnd(18, ' '))} ${chalk.cyan(String(snapshots.length - readyCount))}`,
        `${chalk.gray('Access missing'.padEnd(18, ' '))} ${chalk.cyan(String(tokenMissing))}`,
        `${chalk.gray('Workspaces w/errors'.padEnd(18, ' '))} ${chalk.cyan(String(errorCount))}`
      ];

      const rows = snapshots.map((s) => {
        const readyBadge = s.readiness.ok ? formatBadge('READY', { tone: 'success' }) : formatBadge('SETUP', { tone: 'warn' });
        const tokenBadge = s.readiness.anyTokenConfigured
          ? formatBadge('ACCESS', { tone: 'success' })
          : formatBadge('ACCESS?', { tone: 'warn' });
        const onboardingBadge = s.readiness.onboardingCompleted
          ? formatBadge('SETUP', { tone: 'success' })
          : formatBadge('SETUP?', { tone: 'warn' });
        const appBadge = s.readiness.appCredentialsConfigured
          ? formatBadge('APP', { tone: 'success' })
          : formatBadge('APP?', { tone: 'warn' });
        const metrics = chalk.gray(`${s.metrics.success} ok / ${s.metrics.failed} fail`);
        const lastActivity = s.metrics.lastActivity
          ? chalk.gray(`last ${formatActivity(s.metrics.lastActivity)}`)
          : chalk.gray('no activity');
        const lastError = s.metrics.lastError
          ? chalk.red(truncateText(s.metrics.lastError, 36))
          : chalk.gray('no errors');
        const prefix = s.active ? chalk.green('*') : ' ';
        return `${prefix} ${chalk.cyan(s.profile)}  ${readyBadge} ${tokenBadge} ${onboardingBadge} ${appBadge}  ${metrics}  ${lastActivity}  ${lastError}`;
      });

      console.log('');
      console.log(renderPanel({
        title: ' Agency Summary ',
        rows: summaryRows,
        minWidth: 86,
        borderColor: (value) => chalk.cyan(value)
      }));
      console.log('');
      console.log(renderPanel({
        title: ' Profile Readiness ',
        rows,
        minWidth: 110,
        borderColor: (value) => chalk.blue(value)
      }));
      console.log('');
    });

  accounts
    .command('add <name>')
    .description('Create a new profile (e.g. client1)')
    .action((name) => {
      try {
        const created = config.createProfile(name);
        console.log(chalk.green(`OK Profile created: ${created}`));
        console.log('');
      } catch (e) {
        console.error(chalk.red(`X ${e.message}`));
        process.exit(1);
      }
    });

  accounts
    .command('switch <name>')
    .description('Switch active profile')
    .action((name) => {
      try {
        config.setActiveProfile(name);
        console.log(chalk.green(`OK Active profile: ${config.getActiveProfile()}`));
        console.log('');
      } catch (e) {
        console.error(chalk.red(`X ${e.message}`));
        process.exit(1);
      }
    });

  accounts
    .command('show [name]')
    .description('Show sanitized config for a profile (defaults to active)')
    .action((name) => {
      config.display({ profile: name || config.getActiveProfile() });
    });

  accounts
    .command('remove <name>')
    .description('Delete a profile (cannot delete active)')
    .action(async (name) => {
      if (!process.stdout.isTTY) {
        console.error(chalk.red('X Refusing to delete profile without a TTY.'));
        process.exit(1);
      }
      const ans = await inquirer.prompt([
        { type: 'confirm', name: 'ok', default: false, message: `Delete profile "${name}"?` }
      ]);
      if (!ans.ok) return;
      try {
        config.deleteProfile(name);
        console.log(chalk.green(`OK Profile deleted: ${name}`));
        console.log('');
      } catch (e) {
        console.error(chalk.red(`X ${e.message}`));
        process.exit(1);
      }
    });
}

module.exports = registerAccountsCommands;

(registerAccountsCommands)._private = {
  summarizeActionLog,
  truncateText,
  formatActivity
};
