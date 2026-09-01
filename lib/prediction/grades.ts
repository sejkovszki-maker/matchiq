import type { MatchAnalysis } from '@/types/domain';
export type PredictionGrade='A+'|'A'|'B'|'C'|'D';
export function predictionGrade(match:MatchAnalysis):PredictionGrade{const agreement=match.model.advanced?match.model.advanced.consensusCount/match.model.advanced.votes.length*100:50;const score=match.model.confidence*.35+match.model.dataQuality*.3+match.model.predictionStability*.25+agreement*.1;return score>=88?'A+':score>=80?'A':score>=70?'B':score>=58?'C':'D'}
export function valueGrade(match:MatchAnalysis){const score=match.model.bestSignal?.score??0;return score>=8?'A':score>=5?'B':score>=2.5?'C':'D'}
