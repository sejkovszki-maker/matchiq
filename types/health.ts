export type ServiceStatus='HEALTHY'|'DEGRADED'|'UNSTABLE'|'DOWN'|'DISABLED'|'UNKNOWN';
export type CircuitState='CLOSED'|'OPEN'|'HALF_OPEN';
export type ProviderHealth={provider:string;status:ServiceStatus;successRate?:number;averageLatencyMs?:number;consecutiveFailures:number;lastSuccessAt?:string;circuit:CircuitState};
export type Freshness={fixture:number;odds:number;stats:number;squad:number;lineup:number;overall:number};
