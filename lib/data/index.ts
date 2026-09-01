import { mockFixtureProvider, mockOddsProvider, mockStatisticsProvider } from './providers/mock';
import { liveFixtureProvider, liveOddsProvider, liveStatisticsProvider } from './providers/live';
import type { DataHealth, ProviderMode } from './providers/types';
import { PRODUCTION_CONFIG } from '@/config/production';
export async function loadDailyData(date:string,mode:ProviderMode=PRODUCTION_CONFIG.requestedMode){
  const warnings:string[]=[];
  if(mode==='live'&&PRODUCTION_CONFIG.providerConfigured){try{
    const matches=await liveFixtureProvider.getByDate(date);const[statistics,odds]=await Promise.all([liveStatisticsProvider.getForMatches(matches),liveOddsProvider.getForMatches(matches)]);
    const health:DataHealth={requestedMode:mode,mode:'live',state:'healthy',fixture:liveFixtureProvider.name,statistics:liveStatisticsProvider.name,odds:liveOddsProvider.name,updatedAt:new Date().toISOString(),stale:false,cacheUsed:false,warnings};return{matches,statistics,odds,health};
  }catch(error){warnings.push(`Az élő adatfolyam nem elérhető: ${error instanceof Error?error.message:'ismeretlen hiba'}`)}}
  if(mode==='live') warnings.push('Az élő szolgáltatók még nincsenek konfigurálva; a felület egyértelműen jelölt demonstrációs fallbacket használ.');
  if(mode==='offline') warnings.push('Offline mód: a legutóbb elérhető demonstrációs cache látható.');
  const matches=await mockFixtureProvider.getByDate(date);
  const [statistics,odds]=await Promise.all([mockStatisticsProvider.getForMatches(matches),mockOddsProvider.getForMatches(matches)]);
  const health:DataHealth={requestedMode:mode,mode:mode==='offline'?'offline':'demo',state:mode==='demo'?'healthy':'not_configured',fixture:mockFixtureProvider.name,statistics:mockStatisticsProvider.name,odds:mockOddsProvider.name,updatedAt:new Date().toISOString(),stale:false,cacheUsed:mode!=='demo',warnings};
  return {matches,statistics,odds,health};
}
