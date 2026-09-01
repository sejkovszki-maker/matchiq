import type { PredictionHistoryItem } from '@/types/prediction-history';
export const MIN_SAMPLE_SIZE=150;export function groupByLeague(items:PredictionHistoryItem[]){return Object.entries(Object.groupBy(items,x=>x.leagueName)).map(([league,rows])=>({league,sampleSize:rows?.length??0,qualified:(rows?.length??0)>=MIN_SAMPLE_SIZE}))}
