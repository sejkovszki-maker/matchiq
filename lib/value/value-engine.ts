import type { MarketKey, MarketResult, Odds, OddsQuote } from '@/types/domain';

export function impliedProbability(odds: number) { return odds > 1 ? 1 / odds : 0; }

export function normalizedProbabilities(quotes: OddsQuote[]) {
  const raw = quotes.map((q) => ({ ...q, raw: impliedProbability(q.odds) }));
  const total = raw.reduce((sum, q) => sum + q.raw, 0);
  return raw.map((q) => ({ market: q.market, probability: total ? q.raw / total : 0, odds: q.odds }));
}

export function calculateValue(modelProbability: number, marketProbability: number | undefined, confidence: number, dataQuality: number) {
  if (marketProbability === undefined) return {};
  const valueEdge = modelProbability - marketProbability;
  return { valueEdge, valueScore: valueEdge * (confidence / 100) * (dataQuality / 100) * 100 };
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
