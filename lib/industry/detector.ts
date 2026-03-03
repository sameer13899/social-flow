const INDUSTRIES = [
  'real_estate_india',
  'real_estate_uae',
  'ecommerce',
  'edtech',
  'healthcare',
  'local_services'
];

const INDUSTRY_LABELS = {
  real_estate_india: 'Real Estate (India)',
  real_estate_uae: 'Real Estate (UAE)',
  ecommerce: 'E-commerce',
  edtech: 'EdTech / Course Funnels',
  healthcare: 'Clinics / Healthcare',
  local_services: 'Local Services'
};

const CONFIDENCE_THRESHOLDS = {
  high: 0.75,
  medium: 0.45
};

const DETECTOR_VERSION = 'heuristic-v1';
const REAL_ESTATE_MARKETS = new Set(['real_estate_india', 'real_estate_uae']);

const KEYWORD_RULES = [
  { pattern: /\b(real estate|property|apartment|villa|plot|broker)\b/, industry: 'real_estate_india', weight: 0.18, reason: 'Property keywords detected (India baseline)' },
  { pattern: /\b(real estate|property|apartment|villa|plot|broker)\b/, industry: 'real_estate_uae', weight: 0.18, reason: 'Property keywords detected (UAE baseline)' },
  { pattern: /\b(bhk|rera|sqft|possession|society|tower|township|mumbai|delhi|gurgaon|noida|bangalore|bengaluru|pune|hyderabad)\b/, industry: 'real_estate_india', weight: 0.24, reason: 'India real-estate locality/compliance signal detected' },
  { pattern: /\b(off-plan|handover|marina|downtown|jlt|business bay|dubai|uae|abu dhabi|sharjah|damac|emaar)\b/, industry: 'real_estate_uae', weight: 0.24, reason: 'UAE real-estate locality/developer signal detected' },
  { pattern: /\b(add to cart|checkout|purchase|sku|catalog|shop now|order now|cart|aov|roas)\b/, industry: 'ecommerce', weight: 0.34, reason: 'Commerce intent keywords detected' },
  { pattern: /\b(course|cohort|batch|webinar|masterclass|enroll|admission|syllabus|curriculum|certification)\b/, industry: 'edtech', weight: 0.34, reason: 'EdTech funnel keywords detected' },
  { pattern: /\b(clinic|doctor|dental|hospital|appointment|consultation|patient|treatment|diagnostic)\b/, industry: 'healthcare', weight: 0.34, reason: 'Healthcare service keywords detected' },
  { pattern: /\b(gym|salon|solar|cleaning|repair|plumber|electrician|home service|near me|book call|service area)\b/, industry: 'local_services', weight: 0.34, reason: 'Local service keywords detected' },
  { pattern: /\b(lead|inquiry|enquiry|book visit|site visit|viewing)\b/, industry: 'real_estate_india', weight: 0.12, reason: 'Lead + visit language matches real-estate funnel (India)' },
  { pattern: /\b(lead|inquiry|enquiry|book visit|site visit|viewing)\b/, industry: 'real_estate_uae', weight: 0.12, reason: 'Lead + visit language matches real-estate funnel (UAE)' },
  { pattern: /\b(call now|whatsapp now|book now|same day)\b/, industry: 'local_services', weight: 0.16, reason: 'Call/book-now language matches local-services demand capture' },
  { pattern: /\b(attendance|enrollment|enrolment|webinar attendance)\b/, industry: 'edtech', weight: 0.16, reason: 'Attendance-to-enrollment language detected' },
  { pattern: /\b(show-up|show up|follow-up|follow up|consult)\b/, industry: 'healthcare', weight: 0.14, reason: 'Appointment/show-up language detected' }
];

function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function uniq(items) {
  return Array.from(new Set((items || []).filter(Boolean)));
}

function normalizeList(value) {
  if (!Array.isArray(value)) return [];
  return value.map((x) => String(x || '').trim()).filter(Boolean);
}

function normalizeIndustry(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) return '';
  if ([
    'real_estate',
    'real-estate',
    'realestate',
    'property',
    'real_estate_india',
    'real-estate-india',
    'realestateindia',
    'property_india',
    'india_property',
    're_india'
  ].includes(raw)) return 'real_estate_india';
  if ([
    'real_estate_uae',
    'real-estate-uae',
    'realestateuae',
    'property_uae',
    'uae_property',
    'dubai_property',
    're_uae'
  ].includes(raw)) return 'real_estate_uae';
  if (['ecommerce', 'e-commerce', 'commerce'].includes(raw)) return 'ecommerce';
  if (['edtech', 'education', 'course', 'courses'].includes(raw)) return 'edtech';
  if (['healthcare', 'clinic', 'health'].includes(raw)) return 'healthcare';
  if (['local_services', 'local', 'services'].includes(raw)) return 'local_services';
  return '';
}

function legacyIndustryId(value) {
  const normalized = normalizeIndustry(value);
  if (!normalized) return '';
  if (normalized === 'real_estate_india' || normalized === 'real_estate_uae') return 'real_estate';
  return normalized;
}

function marketBiasFromGeo(input = {}) {
  const combined = [
    String(input.geo || ''),
    String(input.country || ''),
    String(input.timezone || '')
  ].join(' ').toLowerCase();
  const indiaHit = /\b(india|mumbai|delhi|gurgaon|noida|bangalore|bengaluru|pune|hyderabad|asia\/kolkata)\b/.test(combined);
  const uaeHit = /\b(uae|dubai|abu dhabi|sharjah|asia\/dubai)\b/.test(combined);
  if (indiaHit && !uaeHit) return 'real_estate_india';
  if (uaeHit && !indiaHit) return 'real_estate_uae';
  return '';
}

function scoreObjective(text, add) {
  const s = String(text || '').toLowerCase();
  if (!s) return;
  if (/(sales|purchase|catalog_sales|conversions?)/.test(s)) {
    add('ecommerce', 0.24, `Objective "${text}" maps to commerce outcomes`);
  }
  if (/(leads?|lead_generation)/.test(s)) {
    add('real_estate_india', 0.12, `Objective "${text}" is lead-centric (India real estate)`);
    add('real_estate_uae', 0.12, `Objective "${text}" is lead-centric (UAE real estate)`);
    add('edtech', 0.12, `Objective "${text}" fits lead-to-enrollment funnels`);
    add('healthcare', 0.12, `Objective "${text}" fits appointment funnels`);
    add('local_services', 0.12, `Objective "${text}" fits local lead capture`);
  }
  if (/(messages?|whatsapp)/.test(s)) {
    add('local_services', 0.16, `Objective "${text}" favors chat-to-booking businesses`);
    add('real_estate_india', 0.1, `Objective "${text}" is common in India property inquiry funnels`);
    add('real_estate_uae', 0.1, `Objective "${text}" is common in UAE property inquiry funnels`);
  }
}

function scoreEvent(text, add) {
  const s = String(text || '').toLowerCase();
  if (!s) return;
  if (/(purchase|checkout|initiatecheckout|addtocart|viewcontent)/.test(s)) {
    add('ecommerce', 0.32, `Event "${text}" indicates commerce intent`);
  }
  if (/(scheduleappointment|bookappointment|appointment|consultation)/.test(s)) {
    add('healthcare', 0.28, `Event "${text}" indicates appointment workflow`);
  }
  if (/(complete_registration|registration|webinar|enroll|enrol)/.test(s)) {
    add('edtech', 0.28, `Event "${text}" indicates education funnel stages`);
  }
  if (/(lead|contact|generate_lead|submit_form)/.test(s)) {
    add('real_estate_india', 0.14, `Event "${text}" aligns with India property lead funnels`);
    add('real_estate_uae', 0.14, `Event "${text}" aligns with UAE property lead funnels`);
    add('local_services', 0.16, `Event "${text}" aligns with local call/book funnels`);
  }
}

function scoreGeo(geo, add) {
  const s = String(geo || '').toLowerCase();
  if (!s) return;
  if (/\b(india|mumbai|delhi|gurgaon|noida|bangalore|bengaluru|pune|hyderabad|asia\/kolkata)\b/.test(s)) {
    add('real_estate_india', 0.18, 'India geo signal strongly correlates with India property campaigns');
    add('local_services', 0.08, 'India geo signal supports local service campaigns');
  }
  if (/\b(uae|dubai|abu dhabi|sharjah|asia\/dubai)\b/.test(s)) {
    add('real_estate_uae', 0.18, 'UAE geo signal strongly correlates with UAE property campaigns');
  }
}

function buildCombinedText(input) {
  const parts = [
    String(input.text || ''),
    ...normalizeList(input.campaignNames),
    ...normalizeList(input.adSetNames),
    ...normalizeList(input.adNames),
    ...normalizeList(input.objectives),
    ...normalizeList(input.events),
    String(input.geo || ''),
    String(input.country || ''),
    String(input.timezone || '')
  ];
  return parts.join(' ').toLowerCase();
}

function detectIndustry(input = {}) {
  const scores = {};
  INDUSTRIES.forEach((id) => {
    scores[id] = {
      industry: id,
      label: INDUSTRY_LABELS[id],
      score: 0.02,
      reasons: []
    };
  });

  const add = (industry, weight, reason) => {
    if (!scores[industry]) return;
    const w = Number(weight || 0);
    if (w <= 0) return;
    scores[industry].score += w;
    if (reason) scores[industry].reasons.push(String(reason));
  };

  const combined = buildCombinedText(input);
  KEYWORD_RULES.forEach((rule) => {
    if (rule.pattern.test(combined)) add(rule.industry, rule.weight, rule.reason);
  });

  normalizeList(input.objectives).forEach((objective) => scoreObjective(objective, add));
  normalizeList(input.events).forEach((eventName) => scoreEvent(eventName, add));
  scoreGeo(input.geo || `${input.country || ''} ${input.timezone || ''}`, add);

  if (String(input.defaultApi || '').toLowerCase() === 'whatsapp') {
    add('local_services', 0.1, 'Default API is WhatsApp (common in local lead workflows)');
  }

  const ranked = INDUSTRIES.map((id) => {
    const entry = scores[id];
    const normalizedScore = clamp(Number(entry.score.toFixed(3)), 0.02, 0.99);
    return {
      industry: id,
      legacyIndustry: legacyIndustryId(id),
      label: entry.label,
      score: normalizedScore,
      reasons: uniq(entry.reasons).slice(0, 4)
    };
  }).sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1] || { score: 0 };
  let recommended = top;
  let reasons = uniq(top.reasons).slice(0, 4);
  let disambiguation = null;

  const closeRealEstateSplit = REAL_ESTATE_MARKETS.has(top.industry) &&
    REAL_ESTATE_MARKETS.has(second.industry) &&
    Math.abs(Number(top.score || 0) - Number(second.score || 0)) <= 0.08;

  if (closeRealEstateSplit) {
    const geoBias = marketBiasFromGeo(input);
    if (geoBias) {
      const biased = ranked.find((row) => row.industry === geoBias);
      if (biased) {
        recommended = biased;
        reasons = uniq([
          ...biased.reasons,
          `Geo market bias selected ${INDUSTRY_LABELS[geoBias]}.`
        ]).slice(0, 4);
      }
    } else {
      disambiguation = {
        reason: 'Real-estate signals are split across India and UAE.',
        question: 'Which market should this workspace use?',
        options: ['real_estate_india', 'real_estate_uae']
      };
      reasons = uniq([
        ...reasons,
        'India and UAE real-estate signals are close; choose market explicitly.'
      ]).slice(0, 4);
    }
  }

  const secondForRecommended = ranked.find((row) => row.industry !== recommended.industry) || { score: 0 };
  const margin = clamp(Number((recommended.score - Number(secondForRecommended.score || 0)).toFixed(3)), 0, 0.99);
  const reasonCount = uniq(reasons).length;
  let confidence = clamp(
    Number((recommended.score * 0.72 + margin * 0.46 + Math.min(0.16, reasonCount * 0.03)).toFixed(3)),
    0.1,
    0.99
  );
  if (disambiguation) {
    confidence = Math.min(confidence, CONFIDENCE_THRESHOLDS.medium - 0.01);
  }
  const confidenceBand = confidence >= CONFIDENCE_THRESHOLDS.high
    ? 'high'
    : confidence >= CONFIDENCE_THRESHOLDS.medium
      ? 'medium'
      : 'low';

  return {
    detectorVersion: DETECTOR_VERSION,
    recommended: recommended.industry,
    recommendedLabel: recommended.label,
    recommendedLegacy: legacyIndustryId(recommended.industry),
    confidence,
    confidenceBand,
    margin,
    reasons,
    requiresDisambiguation: Boolean(disambiguation),
    disambiguation,
    ranked
  };
}

module.exports = {
  INDUSTRIES,
  INDUSTRY_LABELS,
  CONFIDENCE_THRESHOLDS,
  DETECTOR_VERSION,
  legacyIndustryId,
  normalizeIndustry,
  detectIndustry
};
