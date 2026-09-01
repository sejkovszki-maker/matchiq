export type JobType='FETCH_FIXTURES'|'FETCH_ODDS'|'FETCH_STATS'|'FETCH_SQUADS'|'RECALCULATE_MATCH'|'CREATE_SNAPSHOT'|'FETCH_RESULTS'|'EVALUATE_PREDICTION';
export type JobStatus='queued'|'running'|'completed'|'failed'|'retrying'|'cancelled';
export type Job={id:string;type:JobType;matchId?:string;priority:number;idempotencyKey:string;createdAt:string;startedAt?:string;finishedAt?:string;status:JobStatus;retryCount:number;error?:string};
