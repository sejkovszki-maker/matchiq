export const SCHEDULER_CONFIG={fixturesTtlMinutes:30,oddsTtlMinutes:10,statsTtlMinutes:360,squadTtlMinutes:30,leagueTtlMinutes:1440,maxStaleMinutes:60,retryDelaysMs:[30_000,120_000,300_000],circuitFailureThreshold:5,circuitResetMs:600_000} as const;
export const refreshIntervalForKickoff=(minutes:number)=>minutes<=30?5:minutes<=60?10:minutes<=120?15:30;
