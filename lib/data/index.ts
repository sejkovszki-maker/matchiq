import { mockFixtureProvider, mockOddsProvider, mockStatisticsProvider } from './providers/mock';
import type { DataHealth, ProviderMode } from './providers/types';
export async function loadDailyData(date:string,mode:ProviderMode='mock'){
  const warnings:string[]=[];
  if(mode==='live') warnings.push('Az élő API nincs konfigurálva; hiteles adatok helyett a demonstrációs cache látható.');
  const matches=await mockFixtureProvider.getByDate(date);
  const [statistics,odds]=await Promise.all([mockStatisticsProvider.getForMatches(matches),mockOddsProvider.getForMatches(matches)]);
  const health:DataHealth={mode:'mock',fixture:mockFixtureProvider.name,statistics:mockStatisticsProvider.name,odds:mockOddsProvider.name,updatedAt:new Date().toISOString(),warnings};
  return {matches,statistics,odds,health};
}
