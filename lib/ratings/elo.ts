import { MODEL_CONFIG } from '@/config/prediction-model';
export function expectedEloScore(rating:number,opponent:number,homeAdvantage=0){return 1/(1+10**((opponent-rating-homeAdvantage)/400))}
export function updateElo(rating:number,opponent:number,actual:number,goalDifference:number,k=MODEL_CONFIG.elo.kFactor){const expected=expectedEloScore(rating,opponent);const multiplier=1+Math.max(0,Math.abs(goalDifference)-1)*MODEL_CONFIG.elo.goalDifferenceBonus;return Math.round(rating+k*multiplier*(actual-expected))}
export function eloOutcome(home:number,away:number):'home'|'draw'|'away'{const p=expectedEloScore(home,away,55);return p>.59?'home':p<.44?'away':'draw'}
export function eloReliability(home:number,away:number){return Math.min(1,.55+Math.abs(home-away)/700)}
