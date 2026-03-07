const assert = require('node:assert/strict');
const { buildReadinessReport } = require('../lib/readiness');
const gatewayManager = require('../lib/gateway/manager');
const { tailLines } = gatewayManager;

function mockConfig(input = {}) {
  const tokens = input.tokens || {};
  return {
    getActiveProfile: () => input.activeProfile || 'default',
    getDefaultApi: () => input.defaultApi || 'facebook',
    hasToken: (api) => Boolean(tokens[api]),
    hasCompletedOnboarding: () => Boolean(input.onboardingCompleted),
    hasAppCredentials: () => Boolean(input.appCredentialsConfigured)
  };
}

module.exports = [
  {
    name: 'readiness report blocks start when no tokens are configured',
    fn: () => {
      const report = buildReadinessReport({
        config: mockConfig({
          defaultApi: 'facebook',
          tokens: {},
          onboardingCompleted: false,
          appCredentialsConfigured: false
        })
      });
      assert.equal(report.ok, false);
      assert.equal(report.blockers.length > 0, true);
      assert.equal(report.anyTokenConfigured, false);
    }
  },
  {
    name: 'readiness report is ok when default API token exists',
    fn: () => {
      const report = buildReadinessReport({
        config: mockConfig({
          defaultApi: 'facebook',
          tokens: { facebook: true },
          onboardingCompleted: true,
          appCredentialsConfigured: true
        })
      });
      assert.equal(report.ok, true);
      assert.equal(report.blockers.length, 0);
      assert.equal(report.anyTokenConfigured, true);
    }
  },
  {
    name: 'gateway manager tailLines returns requested trailing lines',
    fn: () => {
      const text = ['one', 'two', 'three', 'four'].join('\n');
      assert.equal(tailLines(text, 2), 'three\nfour');
      assert.equal(tailLines(text, 1), 'four');
    }
  },
  {
    name: 'gateway manager replaces stale social gateway when version differs',
    fn: () => {
      const decision = gatewayManager._private.shouldReplaceExternalGateway(
        {
          ok: true,
          data: {
            service: 'social-api-gateway',
            version: '0.0.0-old'
          }
        },
        { replaceOnVersionMismatch: true }
      );
      assert.equal(decision.replace, true);
      assert.equal(decision.reason, 'version_mismatch');
    }
  },
  {
    name: 'gateway manager does not replace same-version social gateway by default',
    fn: () => {
      const currentVersion = String(require('../package.json').version || '');
      const decision = gatewayManager._private.shouldReplaceExternalGateway(
        {
          ok: true,
          data: {
            service: 'social-api-gateway',
            version: currentVersion
          }
        },
        { replaceOnVersionMismatch: true }
      );
      assert.equal(decision.replace, false);
      assert.equal(decision.reason, 'same_version');
    }
  },
  {
    name: 'gateway manager replaces social gateway when studio route is unavailable',
    fn: () => {
      const currentVersion = String(require('../package.json').version || '');
      const decision = gatewayManager._private.shouldReplaceExternalGateway(
        {
          ok: true,
          data: {
            service: 'social-api-gateway',
            version: currentVersion
          }
        },
        { studioRouteOk: false, requireStudioRoute: true }
      );
      assert.equal(decision.replace, true);
      assert.equal(decision.reason, 'studio_route_unavailable');
    }
  },
  {
    name: 'gateway manager treats legacy studio 404 payload as unavailable',
    fn: () => {
      const unavailable = gatewayManager._private.isStudioRouteUnavailable({
        status: 404,
        body: JSON.stringify({
          ok: false,
          error: 'Bundled Studio frontend is not installed. Add a build to assets/studio or set SOCIAL_STUDIO_ASSET_DIR(S), then open /studio/app.'
        })
      });
      assert.equal(unavailable, true);
    }
  },
  {
    name: 'gateway manager accepts healthy studio app route probe',
    fn: () => {
      const unavailable = gatewayManager._private.isStudioRouteUnavailable({
        status: 200,
        body: '<!doctype html><html><body>Social Flow Studio</body></html>'
      });
      assert.equal(unavailable, false);
    }
  },
  {
    name: 'gateway manager does not replace non-social service on same port',
    fn: () => {
      const decision = gatewayManager._private.shouldReplaceExternalGateway(
        {
          ok: true,
          data: {
            service: 'other-service',
            version: '1.2.3'
          }
        },
        { replaceOnVersionMismatch: true }
      );
      assert.equal(decision.replace, false);
      assert.equal(decision.reason, 'not_social_gateway');
    }
  }
];
