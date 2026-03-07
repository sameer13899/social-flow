const assert = require('node:assert/strict');

const auth = require('../src-runtime/commands/auth');

module.exports = [
  {
    name: 'auth login auto-enables oauth when app credentials exist for facebook',
    fn: () => {
      const result = auth._private.resolveLoginFlow({
        api: 'facebook',
        oauth: false,
        manual: false,
        hasAppCredentials: true
      });
      assert.equal(result.mode, 'oauth');
      assert.equal(result.shouldPromptForAppSetup, false);
      assert.equal(result.reason, 'auto_oauth_available');
    }
  },
  {
    name: 'auth login prompts app setup when app credentials are missing for instagram',
    fn: () => {
      const result = auth._private.resolveLoginFlow({
        api: 'instagram',
        oauth: false,
        manual: false,
        hasAppCredentials: false
      });
      assert.equal(result.mode, 'manual');
      assert.equal(result.shouldPromptForAppSetup, true);
      assert.equal(result.reason, 'missing_app_credentials');
    }
  },
  {
    name: 'auth login respects manual override even when app credentials exist',
    fn: () => {
      const result = auth._private.resolveLoginFlow({
        api: 'facebook',
        oauth: false,
        manual: true,
        hasAppCredentials: true
      });
      assert.equal(result.mode, 'manual');
      assert.equal(result.shouldPromptForAppSetup, false);
      assert.equal(result.reason, 'manual_requested');
    }
  },
  {
    name: 'auth login keeps whatsapp on manual flow',
    fn: () => {
      const result = auth._private.resolveLoginFlow({
        api: 'whatsapp',
        oauth: true,
        manual: false,
        hasAppCredentials: true
      });
      assert.equal(result.mode, 'manual');
      assert.equal(result.shouldPromptForAppSetup, false);
      assert.equal(result.reason, 'manual_only_api');
    }
  }
];
