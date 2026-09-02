import { MODEL_CONFIG } from '@/config/prediction-model';
import { runAdvancedEngine } from '@/lib/prediction/prediction-engine';
import { calculateValue, quoteFor, rankScore } from '@/lib/value/value-engine';
import type { Match, MatchAnalysis, MarketKey, Odds, Statistics } from '@/types/domain';
import { calibratedMarket,calibrateConfidence,calibrateOneXTwo,CALIBRATION_VERSION } from '@/lib/calibration/production-calibration';
import { canonicalMatchId } from '@/lib/mapping/canonical-match-id';
import { validateMatch,validateOdds,validateStatistics } from '@/lib/validation/provider-validation';

export function calculateDataQuality(stat:Statistics,odds?:Odds){let score=35;score+=Math.min(25,stat.sampleSize*1.25);if(stat.hasXg)score+=20;if(odds)score+=15;if(stat.hasSquadInfo)score+=5;const ageHours=(Date.now()-new Date(stat.updatedAt).getTime())/36e5;if(ageHours>24)score-=10;return Math.max(0,Math.min(100,Math.round(score)))}

export function analyzeMatch(match:Match,statistics:Statistics,odds?:Odds):MatchAnalysis{
 const dataQuality=calculateDataQuality(statistics,odds);const engine=runAdvancedEngine(match,statistics,odds,dataQuality);const p=engine.poisson;
 const raw:Record<MarketKey,number>={home:p.homeWin,draw:p.draw,away:p.awayWin,over15:p.over15,over25:p.over25,over35:p.over35,bttsYes:p.bttsYes};const calibrated1x2=calibrateOneXTwo({home:raw.home,draw:raw.draw,away:raw.away});const confidence=calibrateConfidence(engine.confidence);
 const markets=(Object.keys(raw) as MarketKey[]).map(market=>{const quote=quoteFor(odds,market),modelProbability=calibratedMarket(market,raw[market],calibrated1x2);return{market,modelProbability,rawModelProbability:raw[market],marketProbability:quote?.probability,odds:quote?.odds,...calculateValue(modelProbability,quote?.probability,confidence,dataQuality,quote?.odds)}});
 const best=markets.filter(m=>m.signal==='STRONG'||m.signal==='GOOD').sort((a,b)=>(b.valueScore??-99)-(a.valueScore??-99))[0];
 const predictionStability=Math.max(0,Math.min(100,Math.round(confidence*.55+dataQuality*.35+(odds?8:0))));
 const noPredictionReasons=[...(dataQuality<65?['DATA_QUALITY_BELOW_MINIMUM']:[]),...validateMatch(match).errors,...validateStatistics(statistics).errors,...(odds?validateOdds(odds).errors:[])];const publishable=noPredictionReasons.length===0;
 const warnings:string[]=[];if(!odds)warnings.push('Ehhez a mérkőzéshez nincs oddsadat; Value nem számítható.');if(!statistics.hasSquadInfo)warnings.push('Keretinformáció nem érhető el; csökkentett modell fut.');if(!match.isTippmix)warnings.push('Nincs hiteles Tippmix-jelölés.');if(!publishable)warnings.push('A No Prediction Policy letiltotta a publikálást.');
 return{...match,canonicalId:canonicalMatchId(match),statistics,odds,model:{version:MODEL_CONFIG.modelVersion,calculatedAt:new Date().toISOString(),predictedScore:p.predictedScore,confidence,rawConfidence:engine.confidence,calibrationVersion:CALIBRATION_VERSION,dataQuality,markets,matrix:p.matrix,predictionStability,publishable,noPredictionReasons,bestSignal:publishable&&best?{market:best.market,classification:best.signal!,edge:best.valueEdge!,expectedValue:best.expectedValue!,score:best.valueScore!}:undefined,advanced:engine.advanced},dataWarnings:warnings};
}
export function analysisRank(match:MatchAnalysis){return rankScore(match.model.markets,match.model.confidence,match.model.dataQuality)}
