const assert = require('node:assert/strict');

const accounts = require('../commands/accounts');

module.exports = [
  {
    name: 'accounts summary counts successes and failures',
    fn: () => {
      const rows = [
        { status: 'done' },
        { status: 'error', summary: 'API failed' },
        { status: 'success' }
      ];
      const out = accounts._private.summarizeActionLog(rows);
      assert.equal(out.success, 2);
      assert.equal(out.failed, 1);
      assert.equal(out.lastError, 'API failed');
    }
  },
  {
    name: 'accounts summary uses most recent error',
    fn: () => {
      const rows = [
        { status: 'error', summary: 'first' },
        { status: 'done' },
        { status: 'failed', summary: 'last' }
      ];
      const out = accounts._private.summarizeActionLog(rows);
      assert.equal(out.lastError, 'last');
    }
  },
  {
    name: 'accounts truncateText shortens long strings',
    fn: () => {
      const out = accounts._private.truncateText('0123456789012345678901234567890123456789', 10);
      assert.equal(out.length, 10);
      assert.ok(out.endsWith('…'));
    }
  }
];
