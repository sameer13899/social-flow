const assert = require('node:assert/strict');

const integrations = require('../commands/integrations');

module.exports = [
  {
    name: 'integrations formats WABA check labels',
    fn: () => {
      const label = integrations._private.formatCheckLabel('waba_id');
      assert.equal(label, 'WhatsApp Business account (WABA) ID');
    }
  },
  {
    name: 'integrations normalizes expired token errors',
    fn: () => {
      const msg = integrations._private.normalizeMetaError('Error validating access token: Session has expired on 2026-01-01.');
      assert.equal(msg, 'Access token expired.');
    }
  },
  {
    name: 'integrations normalizes unauthorized app errors',
    fn: () => {
      const msg = integrations._private.normalizeMetaError('Error validating access token: The user has not authorized application 123');
      assert.equal(msg, 'App not authorized for this token.');
    }
  },
  {
    name: 'integrations normalizes unsupported get request errors',
    fn: () => {
      const msg = integrations._private.normalizeMetaError('Unsupported get request.');
      assert.equal(msg, 'Token valid but resource not found or insufficient permissions.');
    }
  },
  {
    name: 'integrations recommends scopes when missing',
    fn: () => {
      const fix = integrations._private.fixForCheck('required_scopes');
      assert.match(fix, /whatsapp_business_messaging/);
      assert.match(fix, /whatsapp_business_management/);
    }
  },
  {
    name: 'integrations builds token expiry checks',
    fn: () => {
      const now = Date.UTC(2026, 2, 1);
      const nearExpiry = integrations._private.tokenExpiryCheck(Math.floor((now + 5 * 24 * 60 * 60 * 1000) / 1000), now);
      assert.equal(nearExpiry.ok, null);
      assert.match(nearExpiry.detail, /5 day/);

      const expired = integrations._private.tokenExpiryCheck(Math.floor((now - 5 * 60 * 1000) / 1000), now);
      assert.equal(expired.ok, false);
      assert.match(expired.detail, /expired/i);

      const healthy = integrations._private.tokenExpiryCheck(Math.floor((now + 45 * 24 * 60 * 60 * 1000) / 1000), now);
      assert.equal(healthy.ok, true);
      assert.match(healthy.detail, /45 day/);
    }
  },
  {
    name: 'integrations recommends re-auth for expiring tokens',
    fn: () => {
      const fix = integrations._private.fixForCheck('token_expiry');
      assert.match(fix, /auth login -a whatsapp/);
    }
  }
];
