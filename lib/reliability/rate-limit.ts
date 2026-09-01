export type Quota={requestsPerMinute:number;requestsPerHour:number;requestsPerDay:number;usedToday:number;resetAt:string};
export const remainingQuota=(quota:Quota)=>Math.max(0,quota.requestsPerDay-quota.usedToday);
export const throttleLevel=(quota:Quota)=>{const ratio=remainingQuota(quota)/quota.requestsPerDay;return ratio<.05?'critical':ratio<.2?'conserve':'normal'};
