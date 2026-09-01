import type { AppMode } from '@/types/domain';

export const PRODUCTION_CONFIG = {
  requestedMode: 'live' as AppMode,
  providerConfigured: false,
  staleAfterMinutes: 20,
  minimumSignal: { confidence: 65, dataQuality: 65, edge: 0.025, expectedValue: 0.03, oddsMin: 1.25, oddsMax: 8 },
  tippmixMappingReviewBelow: 75,
  refreshMinutes: { fixtures: 15, odds: 5, statistics: 60 },
} as const;
