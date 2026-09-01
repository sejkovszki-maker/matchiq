import type { FixtureProvider, OddsProvider, StatisticsProvider } from './types';
const notConfigured=()=>{throw new Error('Az élő szolgáltató nincs konfigurálva. API-kulcs szükséges.')};
export const liveFixtureProvider: FixtureProvider={name:'Live fixture API',getByDate:notConfigured};
export const liveStatisticsProvider: StatisticsProvider={name:'Live statistics API',getForMatches:notConfigured};
export const liveOddsProvider: OddsProvider={name:'Live odds API',getForMatches:notConfigured};
