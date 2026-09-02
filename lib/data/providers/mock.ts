import { mockMatches, mockOdds, mockStatistics } from '../mock-data';
import type { FixtureProvider, OddsProvider, StatisticsProvider } from './types';
export const mockFixtureProvider: FixtureProvider={name:'MatchIQ demo fixtures',async getByDate(date){return mockMatches.map(m=>({...m,kickoff:`${date}${m.kickoff.slice(10)}`}))}};
export const mockStatisticsProvider: StatisticsProvider={name:'MatchIQ demo statistics',async getForMatches(matches){return mockStatistics.filter(s=>matches.some(m=>m.id===s.matchId))}};
export const mockOddsProvider: OddsProvider={name:'MatchIQ demo odds',async getForMatches(matches){return mockOdds.filter(o=>matches.some(m=>m.id===o.matchId))}};
