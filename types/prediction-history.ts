import type { PredictionSnapshot } from './domain';
export type PredictionOutcome={matchId:string;homeGoals:number;awayGoals:number;oneXtwoHit:boolean;bttsHit:boolean;over25Hit:boolean;evaluatedAt:string};
export type PredictionHistoryItem={snapshot:PredictionSnapshot;outcome:PredictionOutcome;homeName:string;awayName:string;leagueName:string;kickoff:string};
export type TimelineEvent={id:string;matchId:string;timestamp:string;homeProbability:number;reason:'ODDS_MOVEMENT'|'LINEUP_UPDATE'|'INJURY_UPDATE'|'MODEL_UPDATE'|'FINAL';isFinal:boolean};
