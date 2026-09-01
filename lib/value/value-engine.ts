import type { MarketKey, MarketResult, Odds, OddsQuote, SignalClass } from '@/types/domain';
import { PRODUCTION_CONFIG } from '@/config/production';

export function impliedProbability(odds: number) { return odds > 1 ? 1 / odds : 0; }

export function normalizedProbabilities(quotes: OddsQuote[]) {
  const raw = quotes.map((q) => ({ ...q, raw: impliedProbability(q.odds) }));
  const total = raw.reduce((sum, q) => sum + q.raw, 0);
  return raw.map((q) => ({ market: q.market, probability: total ? q.raw / total : 0, odds: q.odds }));
}

export function calculateValue(modelProbability: number, marketProbability: number | undefined, confidence: number, dataQuality: number, odds?:number, liquidity=.72, stability=.82):Partial<Pick<MarketResult,'valueEdge'|'expectedValue'|'valueScore'|'signal'>> {
  if (marketProbability === undefined || odds === undefined) return {signal:'AVOID' as const};
  const valueEdge = modelProbability - marketProbability;
  const expectedValue=modelProbability*odds-1;
  const valueScore=valueEdge*(confidence/100)*(dataQuality/100)*liquidity*stability*100;
  const min=PRODUCTION_CONFIG.minimumSignal;
  const eligible=confidence>=min.confidence&&dataQuality>=min.dataQuality&&valueEdge>=min.edge&&expectedValue>=min.expectedValue&&odds>=min.oddsMin&&odds<=min.oddsMax;
  const signal:SignalClass=!eligible?(valueEdge<=0||expectedValue<=0?'NO_VALUE':'WATCH'):valueScore>=6&&confidence>=78&&dataQuality>=78?'STRONG':valueScore>=3.5?'GOOD':'WATCH';
  return { valueEdge, expectedValue, valueScore, signal };
}

export function quoteFor(odds: Odds | undefined, market: MarketKey) {
  if (!odds) return undefined;
  const group = ['home','draw','away'].includes(market) ? odds.quotes.filter((q)=>['home','draw','away'].includes(q.market)) : odds.quotes.filter((q)=>q.market===market);
  return normalizedProbabilities(group).find((q)=>q.market===market);
}

export function rankScore(markets: MarketResult[], confidence: number, dataQuality: number) {
  const bestValue = Math.max(0, ...markets.map((m)=>m.valueScore ?? 0));
  return confidence * .45 + dataQuality * .25 + Math.min(bestValue, 20) * 1.5;
}
