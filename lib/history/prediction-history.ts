import type { PredictionHistoryItem } from '@/types/prediction-history';
export const finalSnapshotsOnly=(items:PredictionHistoryItem[])=>items.filter(x=>x.snapshot.id.includes('FINAL_PREMATCH')||x.snapshot.result.version.length>0);
