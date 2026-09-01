import type { Match, Odds, Statistics } from '@/types/domain';
export type ProviderMode = 'mock' | 'live';
export interface FixtureProvider { name: string; getByDate(date: string): Promise<Match[]> }
export interface StatisticsProvider { name: string; getForMatches(matches: Match[]): Promise<Statistics[]> }
export interface OddsProvider { name: string; getForMatches(matches: Match[]): Promise<Odds[]> }
export type DataHealth = { mode: ProviderMode; fixture: string; statistics: string; odds: string; updatedAt: string; warnings: string[] };
