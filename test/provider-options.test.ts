const assert = require('node:assert/strict');

const tui = require('../src-runtime/commands/tui');
const startHere = require('../commands/start-here');
const { hasProviderCredential } = require('../lib/llm-providers');

module.exports = [
  {
    name: 'tui provider parser accepts ollama and marks it as no-key provider',
    fn: () => {
      assert.equal(tui._private.parseExplicitProvider('ollama'), 'ollama');
      assert.equal(tui._private.normalizeProvider('local'), 'ollama');
      assert.equal(tui._private.providerNeedsApiKey('ollama'), false);
      assert.equal(tui._private.providerModel('ollama'), 'qwen2.5:7b');
    }
  },
  {
    name: 'start-here provider choices include local ollama',
    fn: () => {
      const values = startHere._private.PROVIDER_CHOICES.map((row) => row.value);
      assert.equal(values.includes('ollama'), true);
      assert.equal(startHere._private.providerNeedsApiKey('ollama'), false);
    }
  },
  {
    name: 'shared llm provider helper treats ollama as credential-free local provider',
    fn: () => {
      assert.equal(hasProviderCredential('ollama', ''), true);
    }
  }
];
