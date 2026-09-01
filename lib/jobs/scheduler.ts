import { refreshIntervalForKickoff } from '@/config/scheduler';import type { JobType } from '@/types/job';
export const dailySchedule=[['05:50','SYSTEM_HEALTH'],['06:00','FETCH_FIXTURES'],['06:05','FETCH_STATS'],['06:10','FETCH_ODDS'],['06:15','FETCH_SQUADS'],['06:20','RECALCULATE_MATCH']] as const;
export function scheduledPriority(type:JobType,kickoff:string,isTippmix=false,isFavorite=false){const minutes=(new Date(kickoff).getTime()-Date.now())/60_000;return (isTippmix?40:0)+(isFavorite?20:0)+(minutes<=120?35:minutes<=1440?15:0)+(type==='CREATE_SNAPSHOT'?30:0)}
export const nextRefreshMinutes=(kickoff:string)=>refreshIntervalForKickoff((new Date(kickoff).getTime()-Date.now())/60_000);
