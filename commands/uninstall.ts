const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');

const PACKAGE_NAME = '@vishalgojha/social-flow';

type UninstallOptions = {
  yes?: boolean;
  print?: boolean;
};

function npmExecutable(platform: string = process.platform) {
  return platform === 'win32' ? 'npm.cmd' : 'npm';
}

function uninstallArgs(packageName: string = PACKAGE_NAME) {
  return ['uninstall', '-g', packageName];
}

function uninstallCommandText(platform: string = process.platform, packageName: string = PACKAGE_NAME) {
  return `${npmExecutable(platform)} ${uninstallArgs(packageName).join(' ')}`;
}

function socialDataDir(env: NodeJS.ProcessEnv = process.env, homeDir: string = os.homedir()) {
  const homeRoot = String(env.SOCIAL_CLI_HOME || env.META_CLI_HOME || homeDir || '').trim() || homeDir;
  return path.join(homeRoot, '.social-cli');
}

function runUninstall(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: process.env
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Command failed with exit code ${code}`));
    });
  });
}

async function confirmUninstall(commandText: string) {
  if (!process.stdout.isTTY || !process.stdin.isTTY) return false;
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: `Run "${commandText}" now?`,
      default: false
    }
  ]);
  return Boolean(answers.confirmed);
}

function printDataRetentionNotice() {
  const dataDir = socialDataDir();
  console.log(chalk.gray(`Local data was not removed: ${dataDir}`));
  console.log(chalk.gray('Delete that folder manually if you want a full cleanup.'));
}

function registerUninstallCommand(program: any) {
  program
    .command('uninstall')
    .description('Uninstall the global social CLI package (keeps local data)')
    .option('--yes', 'Skip confirmation prompt', false)
    .option('--print', 'Print the npm uninstall command without running it', false)
    .action(async (opts: UninstallOptions) => {
      const command = npmExecutable();
      const args = uninstallArgs();
      const commandText = uninstallCommandText();

      if (opts.print) {
        console.log(commandText);
        return;
      }

      let confirmed = Boolean(opts.yes);
      if (!confirmed) {
        if (!process.stdout.isTTY || !process.stdin.isTTY) {
          console.error(chalk.red('Non-interactive uninstall requires --yes.'));
          console.error(chalk.gray(`Direct command: ${commandText}`));
          process.exit(1);
        }

        confirmed = await confirmUninstall(commandText);
      }

      if (!confirmed) {
        console.log(chalk.yellow('Uninstall cancelled.'));
        return;
      }

      console.log(chalk.cyan(`Running: ${commandText}\n`));

      try {
        await runUninstall(command, args);
        console.log(chalk.green('\nSocial Flow global uninstall finished.'));
        console.log(chalk.gray('Open a new terminal if `social` is still cached in the current shell.'));
        printDataRetentionNotice();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(chalk.red(`\nGlobal uninstall failed: ${message}`));
        console.error(chalk.gray('If the package is still in use, close this terminal and run:'));
        console.error(chalk.cyan(`  ${commandText}`));
        printDataRetentionNotice();
        process.exit(1);
      }
    });
}

module.exports = registerUninstallCommand;
module.exports._private = {
  PACKAGE_NAME,
  npmExecutable,
  uninstallArgs,
  uninstallCommandText,
  socialDataDir
};
