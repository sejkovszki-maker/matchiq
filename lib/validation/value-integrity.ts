import type { MarketResult } from '@/types/domain';
export function validateValue(market:MarketResult){if(market.odds===undefined||market.expectedValue===undefined)return{valid:true,error:undefined};const expected=market.modelProbability*market.odds-1;return Math.abs(expected-market.expectedValue)<.0001?{valid:true,error:undefined}:{valid:false,error:'VALUE_CALCULATION_ERROR'}}
