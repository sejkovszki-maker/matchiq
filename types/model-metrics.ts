export type CalibrationBucket={from:number;to:number;predicted:number;actual:number;sampleSize:number};
export type ModelMetrics={modelVersion:string;sampleSize:number;accuracy1x2:number;bttsAccuracy:number;over25Accuracy:number;exactScoreAccuracy:number;brier:number;logLoss:number;calibrationError:number;marketBrier?:number;roi?:number;yield?:number;maxDrawdown?:number;calibration:CalibrationBucket[]};
export type Diagnostic={best:string;worst:string;note:string};
