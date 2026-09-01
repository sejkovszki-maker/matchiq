import type { AppMode, Match, Odds, Statistics } from '@/types/domain';
export type ProviderMode = AppMode;
export interface FixtureProvider { name: string; getByDate(date: string): Promise<Match[]> }
export interface StatisticsProvider { name: string; getForMatches(matches: Match[]): Promise<Statistics[]> }
export interface OddsProvider { name: string; getForMatches(matches: Match[]): Promise<Odds[]> }
export type ProviderState = 'healthy' | 'degraded' | 'offline' | 'not_configured';
export type DataHealth = { requestedMode: ProviderMode; mode: ProviderMode; state: ProviderState; fixture: string; statistics: string; odds: string; updatedAt: string; stale: boolean; cacheUsed: boolean; warnings: string[] };
