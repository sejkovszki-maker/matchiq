import type { MarketKey } from '@/types/domain';
export const CALIBRATION_VERSION='rc-unverified';
const clamp=(v:number)=>Math.max(.001,Math.min(.999,v));
export function calibrateBinary(raw:number){return clamp(.5+(raw-.5)*.92)}
export function calibrateOneXTwo(raw:Record<'home'|'draw'|'away',number>){const power=.94;const weighted=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,Math.pow(v,power)])) as Record<'home'|'draw'|'away',number>;const sum=weighted.home+weighted.draw+weighted.away;return{home:weighted.home/sum,draw:weighted.draw/sum,away:weighted.away/sum}}
export function calibratedMarket(key:MarketKey,raw:number,oneXTwo:ReturnType<typeof calibrateOneXTwo>){return key==='home'||key==='draw'||key==='away'?oneXTwo[key]:calibrateBinary(raw)}
export const calibrateConfidence=(raw:number)=>Math.max(0,Math.min(100,Math.round(raw*.92)));
