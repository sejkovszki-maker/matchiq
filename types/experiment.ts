export type ExperimentParameters={formWeight:number;eloWeight:number;xgWeight:number;homeWeight:number};
export type Experiment={id:string;name:string;modelVersion:string;parameters:ExperimentParameters;createdAt:string;status:'draft'|'running'|'complete'|'failed'};
export type ExperimentResult={experiment:Experiment;metrics:import('./model-metrics').ModelMetrics;datasetFingerprint:string};
