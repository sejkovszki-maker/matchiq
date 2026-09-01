import type { MatchAnalysis, PredictionSnapshot } from '@/types/domain';
export const snapshotFromAnalysis=(match:MatchAnalysis):PredictionSnapshot=>({id:`${match.id}-${match.model.version}-${match.model.calculatedAt}`,matchId:match.id,createdAt:match.model.calculatedAt,modelVersion:match.model.version,statistics:match.statistics,odds:match.odds,result:match.model});
export const isLocked=(kickoff:string,now=Date.now())=>now>=new Date(kickoff).getTime();
