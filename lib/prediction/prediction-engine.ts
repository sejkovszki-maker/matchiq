import { CONTEXT_CONFIG } from '@/config/context-model';
import { getElo,getFormMatches,getSeasonInput } from '@/lib/data/team-model-data';
import { buildMatchContext } from '@/lib/context/match-context-engine';
import { getLeagueProfile } from '@/lib/leagues/league-profile';
import { calculatePrediction } from '@/lib/prediction';
import { consensus,probabilityOutcome } from './consensus';
import { expectedGoals } from './expected-goals';
import { eloOutcome,eloReliability } from '@/lib/ratings/elo';
import { calculateForm } from '@/lib/ratings/form-rating';
import { calculateTeamStrength } from '@/lib/ratings/team-strength';
import { quoteFor } from '@/lib/value/value-engine';
import type { AdvancedModelOutput,ConsensusVote,Outcome,PredictionImpact } from '@/types/model-output';
import type { Match,Odds,Statistics } from '@/types/domain';
const outLabel=(o:Outcome)=>o==='home'?'HAZAI':o==='away'?'VENDÉG':'DÖNTETLEN';
export function runAdvancedEngine(match:Match,statistics:Statistics,odds:Odds|undefined,dataQuality:number){
 const league=getLeagueProfile(match.league.id),homeForm=calculateForm(match.home.id,getFormMatches(match.home.id)),awayForm=calculateForm(match.away.id,getFormMatches(match.away.id)),avg=(league.homeGoalsAvg+league.awayGoalsAvg)/2;
 const homeStrength=calculateTeamStrength(getSeasonInput(match.home.id,avg),league.homeGoalsAvg,league.awayGoalsAvg,homeForm),awayStrength=calculateTeamStrength(getSeasonInput(match.away.id,avg),league.homeGoalsAvg,league.awayGoalsAvg,awayForm);
 let [h,a]=expectedGoals(homeStrength,awayStrength,homeForm,awayForm,league);h=h*.72+statistics.homeXg*.28;a=a*.72+statistics.awayXg*.28;
 const raw=calculatePrediction(h,a),strengthDelta=homeStrength.overall-awayStrength.overall,strengthVote:Outcome=strengthDelta>.12?'home':strengthDelta<-.12?'away':'draw',he=getElo(match.home.id),ae=getElo(match.away.id),formEloVote=eloOutcome(he+(homeForm.home-.7)*110,ae+(awayForm.away-.7)*110);
 const marketHome=quoteFor(odds,'home')?.probability??0,marketDraw=quoteFor(odds,'draw')?.probability??0,marketAway=quoteFor(odds,'away')?.probability??0,marketVote=probabilityOutcome(marketHome,marketDraw,marketAway);
 let votes:ConsensusVote[]=[{model:'Poisson',outcome:probabilityOutcome(raw.homeWin,raw.draw,raw.awayWin),label:outLabel(probabilityOutcome(raw.homeWin,raw.draw,raw.awayWin))},{model:'Team Strength',outcome:strengthVote,label:outLabel(strengthVote)},{model:'Elo / Forma',outcome:formEloVote,label:outLabel(formEloVote)},{model:'Piac',outcome:marketVote,label:outLabel(marketVote)}];
 let agreed=consensus(votes);const formStability=(homeForm.stability+awayForm.stability)/2,context=buildMatchContext(match,[h,a],dataQuality,agreed.agreement,formStability,odds),poisson=calculatePrediction(context.finalXg[0],context.finalXg[1]),poissonOutcome=probabilityOutcome(poisson.homeWin,poisson.draw,poisson.awayWin);
 votes=votes.map(v=>v.model==='Poisson'?{...v,outcome:poissonOutcome,label:outLabel(poissonOutcome)}:v);agreed=consensus(votes);
 const impacts:PredictionImpact[]=[{label:`${match.home.name} támadóereje`,value:(homeStrength.home.attack-1)*100,direction:homeStrength.home.attack>=1?'positive':'negative'},{label:`${match.away.name} idegenbeli védekezése`,value:(awayStrength.away.defence-1)*100,direction:awayStrength.away.defence>1?'positive':'negative'},{label:'Hazai pálya',value:(league.homeAdvantage-1)*100,direction:'positive'},{label:'Pihenőelőny',value:context.homeAdjustment.rest*100,direction:context.homeAdjustment.rest>=0?'positive':'negative'},{label:'Keretkorrekció',value:context.homeAdjustment.squad*100,direction:context.homeAdjustment.squad>=0?'positive':'negative'},{label:'Elo-különbség',value:(he-ae)/28,direction:he>=ae?'positive':'negative'}];
 const cc=context.confidenceComponents,c=CONTEXT_CONFIG.confidence,confidence=Math.round(cc.dataQuality*c.dataQuality+cc.modelAgreement*c.modelAgreement+cc.formStability*c.formStability+cc.lineupCertainty*c.lineupCertainty+cc.squadStability*c.squadStability+cc.marketStability*c.marketStability+cc.contextStability*c.contextStability);
 const advanced:AdvancedModelOutput={expectedGoals:context.finalXg,homeStrength,awayStrength,homeForm,awayForm,homeElo:he,awayElo:ae,votes,consensusOutcome:agreed.outcome,consensusCount:agreed.count,impacts,modelAgreement:agreed.agreement,formStability,eloReliability:eloReliability(he,ae),leaguePredictability:league.predictability,context};
 return{poisson,confidence:Math.max(35,Math.min(96,confidence)),advanced};
}
