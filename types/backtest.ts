import type { HistoricalMatch } from './historical-match';import type { ModelMetrics } from './model-metrics';
export type BacktestFilter={leagueIds?:string[];seasons?:string[];modelVersions?:string[]};
export type BacktestRun={id:string;startedAt:string;completedAt?:string;filter:BacktestFilter;validRecords:number;rejectedLeakage:number;metrics?:ModelMetrics};
export type TimeSplit={training:HistoricalMatch[];validation:HistoricalMatch[];test:HistoricalMatch[]};
