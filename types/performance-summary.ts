export type PerformancePeriod='7d'|'30d'|'90d'|'season'|'all';
export type PerformanceMetric={key:string;label:string;value?:number;format:'percent'|'decimal'|'count';sampleSize:number};
export type CalibrationBucket={from:number;to:number;predicted:number;actual:number;sampleSize:number};
export type PerformanceSummary={period:PerformancePeriod;matches:number;metrics:PerformanceMetric[];calibration:CalibrationBucket[];generatedAt:string;hasEnoughData:boolean};
