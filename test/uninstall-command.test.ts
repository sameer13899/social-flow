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
      const out = uninstall._private.socialDataDir({
        SOCIAL_FLOW_HOME: 'C:\\temp\\social-home\\.social-flow'
      }, 'C:\\Users\\example');
      assert.equal(out, 'C:\\temp\\social-home\\.social-flow');
    }
  },
  {
    name: 'uninstall command resolves data dir from SOCIAL_CLI_HOME',
    fn: () => {
      const out = uninstall._private.socialDataDir({
        SOCIAL_CLI_HOME: 'C:\\temp\\social-home'
      }, 'C:\\Users\\example');
      assert.equal(out, 'C:\\temp\\social-home\\.social-flow');
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
