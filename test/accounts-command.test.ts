const assert = require('node:assert/strict');

const accounts = require('../commands/accounts');

module.exports = [
  {
    name: 'accounts summary counts successes and failures',
    fn: () => {
      const rows = [
        { status: 'done', when: '2026-03-23T10:00:00.000Z' },
        { status: 'error', summary: 'API failed', when: '2026-03-23T11:00:00.000Z' },
        { status: 'success', when: '2026-03-23T12:00:00.000Z' }
      ];
      const out = accounts._private.summarizeActionLog(rows);
      assert.equal(out.success, 2);
      assert.equal(out.failed, 1);
      assert.equal(out.lastError, 'API failed');
      assert.equal(out.lastActivity, '2026-03-23T12:00:00.000Z');
    }
  },
  {
    name: 'accounts summary uses most recent error',
    fn: () => {
      const rows = [
        { status: 'error', summary: 'first', when: '2026-03-22T10:00:00.000Z' },
        { status: 'done', when: '2026-03-23T10:00:00.000Z' },
        { status: 'failed', summary: 'last', when: '2026-03-24T10:00:00.000Z' }
      ];
      const out = accounts._private.summarizeActionLog(rows);
      assert.equal(out.lastError, 'last');
      assert.equal(out.lastActivity, '2026-03-24T10:00:00.000Z');
    }
  },
  {
    name: 'accounts truncateText shortens long strings',
    fn: () => {
      const out = accounts._private.truncateText('0123456789012345678901234567890123456789', 10);
      assert.equal(out.length, 10);
      assert.ok(out.endsWith('…'));
    }
  },
  {
    name: 'accounts formatActivity returns iso-ish text',
    fn: () => {
      const out = accounts._private.formatActivity('2026-03-23T10:00:00.000Z');
      assert.equal(out.startsWith('2026-03-23'), true);
    }
  }
];
