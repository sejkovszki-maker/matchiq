import type { FormRating,TeamStrength } from './team-rating';
export type Outcome='home'|'draw'|'away';
export type ConsensusVote={model:'Poisson'|'Team Strength'|'Elo / Forma'|'Piac';outcome:Outcome;label:string};
export type PredictionImpact={label:string;value:number;direction:'positive'|'negative'|'neutral'};
export type AdvancedModelOutput={expectedGoals:[number,number];homeStrength:TeamStrength;awayStrength:TeamStrength;homeForm:FormRating;awayForm:FormRating;homeElo:number;awayElo:number;votes:ConsensusVote[];consensusOutcome:Outcome;consensusCount:number;impacts:PredictionImpact[];modelAgreement:number;formStability:number;eloReliability:number;leaguePredictability:number};
