import type { DataHealth, ProviderMode } from './providers/types';
import type { Match,Odds,Statistics } from '@/types/domain';
export async function loadDailyData(date:string,mode:ProviderMode='live'){
  const response=await fetch(`/api/daily?date=${encodeURIComponent(date)}&mode=${mode}`,{cache:'no-store'});
  if(!response.ok) throw new Error('A napi adatforrás átmenetileg nem érhető el.');
  return response.json() as Promise<{matches:Match[];statistics:Statistics[];odds:Odds[];health:DataHealth}>;
}
