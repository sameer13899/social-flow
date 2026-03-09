const assert = require('node:assert/strict');
const path = require('node:path');

const uninstall = require('../commands/uninstall');

module.exports = [
  {
    name: 'uninstall command builds npm global uninstall command on windows',
    fn: () => {
      assert.equal(
        uninstall._private.uninstallCommandText('win32'),
        'npm.cmd uninstall -g @vishalgojha/social-flow'
      );
    }
  },
  {
    name: 'uninstall command builds npm global uninstall command on unix',
    fn: () => {
      assert.equal(
        uninstall._private.uninstallCommandText('linux'),
        'npm uninstall -g @vishalgojha/social-flow'
      );
    }
  },
  {
    name: 'uninstall command resolves data dir from SOCIAL_FLOW_HOME',
    fn: () => {
      const explicitHome = path.join('/tmp', 'social-home', '.social-flow');
      const out = uninstall._private.socialDataDir({
        SOCIAL_FLOW_HOME: explicitHome
      }, path.join('/tmp', 'social-user'));
      assert.equal(out, path.resolve(explicitHome));
    }
  },
  {
    name: 'uninstall command resolves data dir from SOCIAL_CLI_HOME',
    fn: () => {
      const legacyHome = path.join('/tmp', 'social-home');
      const out = uninstall._private.socialDataDir({
        SOCIAL_CLI_HOME: legacyHome
      }, path.join('/tmp', 'social-user'));
      assert.equal(out, path.join(path.resolve(legacyHome), '.social-flow'));
    }
  },
  {
    name: 'uninstall command falls back to user home when no override exists',
    fn: () => {
      const out = uninstall._private.socialDataDir({}, '/tmp/social-user');
      assert.equal(out, path.join(path.resolve('/tmp/social-user'), '.social-flow'));
    }
  }
];
