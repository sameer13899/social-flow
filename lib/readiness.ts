const config = require('./config');

function getTokenState(cfg) {
  const byApi = {
    facebook: Boolean(cfg.hasToken('facebook')),
    instagram: Boolean(cfg.hasToken('instagram')),
    whatsapp: Boolean(cfg.hasToken('whatsapp'))
  };
  return {
    byApi,
    anyConfigured: Boolean(byApi.facebook || byApi.instagram || byApi.whatsapp)
  };
}

function getAgentState(cfg) {
  const raw = typeof cfg.getAgentConfig === 'function'
    ? cfg.getAgentConfig()
    : { provider: 'openai', model: '', apiKey: '' };
  const provider = String(raw.provider || 'openai').trim().toLowerCase() || 'openai';
  const needsApiKey = provider !== 'ollama';
  return {
    provider,
    model: String(raw.model || '').trim(),
    needsApiKey,
    apiKeyConfigured: needsApiKey ? Boolean(String(raw.apiKey || '').trim()) : true
  };
}

function buildReadinessReport(options = {}) {
  const cfg = options.config || config;
  const includeWarnings = options.includeWarnings !== false;

  const activeProfile = cfg.getActiveProfile();
  const defaultApi = cfg.getDefaultApi();
  const tokenState = getTokenState(cfg);
  const agentState = getAgentState(cfg);
  const onboardingCompleted = Boolean(cfg.hasCompletedOnboarding());
  const appCredentialsConfigured = Boolean(cfg.hasAppCredentials());

  const blockers = [];
  const warnings = [];
  const nextActions = [];

  if (!tokenState.anyConfigured) {
    blockers.push({
      code: 'missing_tokens',
      message: 'No API token is configured for this profile.',
      fix: 'Run: social setup'
    });
  }

  if (defaultApi && !tokenState.byApi[defaultApi]) {
    blockers.push({
      code: 'default_api_token_missing',
      message: `Default API "${defaultApi}" has no token configured.`,
      fix: `Run: social auth login -a ${defaultApi}`
    });
  }

  if (!onboardingCompleted && includeWarnings) {
    warnings.push({
      code: 'onboarding_incomplete',
      message: 'Onboarding is not marked complete for this profile.',
      fix: 'Run: social onboard --no-hatch'
    });
  }

  if (!appCredentialsConfigured && includeWarnings) {
    warnings.push({
      code: 'app_credentials_missing',
      message: 'App ID / App Secret are not configured (needed for OAuth and advanced diagnostics).',
      fix: 'Run: social auth app'
    });
  }

  if (agentState.needsApiKey && !agentState.apiKeyConfigured && includeWarnings) {
    warnings.push({
      code: 'agent_api_key_missing',
      message: `Agent provider "${agentState.provider}" has no API key configured (needed for chat/copilot).`,
      fix: `Open Studio Setup Concierge or run: social agent setup --provider ${agentState.provider} --api-key <key>`
    });
  }

  if (blockers.length) {
    nextActions.push('social setup');
    if (defaultApi) nextActions.push(`social auth login -a ${defaultApi}`);
  } else {
    nextActions.push('social start');
    nextActions.push('social doctor');
  }
  if (agentState.needsApiKey && !agentState.apiKeyConfigured) {
    nextActions.push(`social agent setup --provider ${agentState.provider} --api-key <key>`);
  }

  return {
    ok: blockers.length === 0,
    activeProfile,
    defaultApi,
    onboardingCompleted,
    appCredentialsConfigured,
    agent: agentState,
    anyTokenConfigured: tokenState.anyConfigured,
    tokens: tokenState.byApi,
    blockers,
    warnings,
    nextActions: Array.from(new Set(nextActions))
  };
}

function withProfile(cfg, profile, fn) {
  if (typeof cfg?.useProfile !== 'function' || typeof cfg?.clearProfileOverride !== 'function') {
    return fn();
  }
  if (typeof cfg?.hasProfile === 'function' && !cfg.hasProfile(profile)) {
    return fn();
  }
  cfg.useProfile(profile);
  try {
    return fn();
  } finally {
    cfg.clearProfileOverride();
  }
}

function buildProfilesReadinessReport(options = {}) {
  const cfg = options.config || config;
  const includeWarnings = options.includeWarnings !== false;
  const activeProfile = typeof cfg.getActiveProfile === 'function' ? cfg.getActiveProfile() : 'default';
  const profiles = typeof cfg.listProfiles === 'function'
    ? cfg.listProfiles()
    : [activeProfile];

  const rows = profiles.map((profile) => {
    const readiness = withProfile(cfg, profile, () => buildReadinessReport({ config: cfg, includeWarnings }));
    return {
      profile,
      active: profile === activeProfile,
      readiness
    };
  });

  const readyCount = rows.filter((r) => r.readiness.ok).length;
  const tokenMissing = rows.filter((r) => !r.readiness.anyTokenConfigured).length;

  return {
    activeProfile,
    profiles: rows,
    summary: {
      total: rows.length,
      ready: readyCount,
      needsSetup: rows.length - readyCount,
      tokensMissing: tokenMissing
    }
  };
}

module.exports = {
  buildReadinessReport,
  buildProfilesReadinessReport
};
