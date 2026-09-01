import { MODEL_CONFIG } from '@/config/prediction-model';
import { runAdvancedEngine } from '@/lib/prediction/prediction-engine';
import { calculateValue, quoteFor, rankScore } from '@/lib/value/value-engine';
import type { Match, MatchAnalysis, MarketKey, Odds, Statistics } from '@/types/domain';

export function calculateDataQuality(stat:Statistics,odds?:Odds){let score=35;score+=Math.min(25,stat.sampleSize*1.25);if(stat.hasXg)score+=20;if(odds)score+=15;if(stat.hasSquadInfo)score+=5;const ageHours=(Date.now()-new Date(stat.updatedAt).getTime())/36e5;if(ageHours>24)score-=10;return Math.max(0,Math.min(100,Math.round(score)))}

export function analyzeMatch(match:Match,statistics:Statistics,odds?:Odds):MatchAnalysis{
 const dataQuality=calculateDataQuality(statistics,odds);const engine=runAdvancedEngine(match,statistics,odds,dataQuality);const p=engine.poisson;
 const probabilities:Record<MarketKey,number>={home:p.homeWin,draw:p.draw,away:p.awayWin,over15:p.over15,over25:p.over25,over35:p.over35,bttsYes:p.bttsYes};
 const markets=(Object.keys(probabilities) as MarketKey[]).map(market=>{const quote=quoteFor(odds,market);return{market,modelProbability:probabilities[market],marketProbability:quote?.probability,odds:quote?.odds,...calculateValue(probabilities[market],quote?.probability,engine.confidence,dataQuality)}});
 const warnings:string[]=[];if(!odds)warnings.push('Ehhez a mérkőzéshez nincs oddsadat.');if(!statistics.hasSquadInfo)warnings.push('Keretinformáció nem érhető el.');if(!match.isTippmix)warnings.push('Nincs hiteles Tippmix-jelölés.');
 return{...match,statistics,odds,model:{version:MODEL_CONFIG.modelVersion,calculatedAt:new Date().toISOString(),predictedScore:p.predictedScore,confidence:engine.confidence,dataQuality,markets,matrix:p.matrix,advanced:engine.advanced},dataWarnings:warnings};
}
export function analysisRank(match:MatchAnalysis){return rankScore(match.model.markets,match.model.confidence,match.model.dataQuality)}

