export type Position='GK'|'CB'|'FB'|'DM'|'CM'|'AM'|'W'|'ST';export type AvailabilityStatus='available'|'out'|'doubtful'|'returning';export type SourceCertainty='confirmed'|'reported'|'doubtful'|'unknown';
export type Player={id:string;name:string;teamId:string;position:Position;minutes:number;starts:number;xg:number;xa:number;shots:number;keyPasses:number;defensiveActions:number;teamShare:number};
export type PlayerImpact={playerId:string;score:number;replacementQuality:number};
