export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
export type MarketKey = 'home' | 'draw' | 'away' | 'over15' | 'over25' | 'over35' | 'bttsYes';

export type Team = { id: string; name: string; country: string };
export type League = { id: string; name: string; country: string; tier?: number };
export type MatchResult = { homeGoals: number; awayGoals: number; finishedAt: string };

export type Match = {
  id: string; kickoff: string; status: MatchStatus; home: Team; away: Team; league: League;
  isTippmix: boolean; tippmixEventId?: string; source: string; result?: MatchResult;
};

export type Statistics = {
  matchId: string; homeXg: number; awayXg: number; homeForm: string; awayForm: string;
  sampleSize: number; hasXg: boolean; hasSquadInfo: boolean; updatedAt: string;
};

export type OddsQuote = { market: MarketKey; selection: string; odds: number };
export type Odds = {
  matchId: string; provider: string; bookmaker: string; timestamp: string; quotes: OddsQuote[];
  isTippmix: boolean; tippmixEventId?: string;
};

export type MarketResult = {
  market: MarketKey; modelProbability: number; marketProbability?: number; odds?: number;
  valueEdge?: number; valueScore?: number;
};

import type { AdvancedModelOutput } from './model-output';

export type ModelResult = {
  version: string; calculatedAt: string; predictedScore: [number, number]; confidence: number;
  dataQuality: number; markets: MarketResult[]; matrix: Array<{home:number;away:number;probability:number}>; advanced?: AdvancedModelOutput;
};

export type MatchAnalysis = Match & { statistics: Statistics; odds?: Odds; model: ModelResult; dataWarnings: string[] };

export type PredictionSnapshot = {
  id: string; matchId: string; createdAt: string; modelVersion: string; statistics: Statistics;
  odds?: Odds; result: ModelResult;
};
