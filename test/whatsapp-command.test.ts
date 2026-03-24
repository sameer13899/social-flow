const assert = require('node:assert/strict');

const whatsapp = require('../src-runtime/commands/whatsapp');

module.exports = [
  {
    name: 'whatsapp send resolves prod flag first',
    fn: () => {
      const res = whatsapp._private.resolveSendMode({ prod: true }, '', true);
      assert.equal(res.mode, 'prod');
      assert.equal(res.needsPrompt, false);
    }
  },
  {
    name: 'whatsapp send resolves sandbox flag',
    fn: () => {
      const res = whatsapp._private.resolveSendMode({ sandbox: true }, '', true);
      assert.equal(res.mode, 'sandbox');
      assert.equal(res.needsPrompt, false);
    }
  },
  {
    name: 'whatsapp send uses env mode when no flags',
    fn: () => {
      const res = whatsapp._private.resolveSendMode({}, 'prod', false);
      assert.equal(res.mode, 'prod');
      assert.equal(res.needsPrompt, false);
    }
  },
  {
    name: 'whatsapp send prompts in tty when mode missing',
    fn: () => {
      const res = whatsapp._private.resolveSendMode({}, '', true);
      assert.equal(res.mode, '');
      assert.equal(res.needsPrompt, true);
    }
  },
  {
    name: 'whatsapp send requires explicit mode in non-tty',
    fn: () => {
      const res = whatsapp._private.resolveSendMode({}, '', false);
      assert.equal(res.mode, '');
      assert.equal(res.needsPrompt, false);
    }
  }
];
