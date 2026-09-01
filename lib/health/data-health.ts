import { PRODUCTION_CONFIG } from '@/config/production';
export const isStale=(timestamp:string,minutes=PRODUCTION_CONFIG.staleAfterMinutes)=>Date.now()-new Date(timestamp).getTime()>minutes*60_000;
export const freshnessLabel=(timestamp:string)=>isStale(timestamp)?'Elavult adat':'Friss adat';
