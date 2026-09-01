export type AuditLevel='DEBUG'|'INFO'|'WARN'|'ERROR'|'CRITICAL';
export type AuditEvent={id:string;timestamp:string;level:AuditLevel;event:string;service:string;provider?:string;matchId?:string;oldValue?:unknown;newValue?:unknown;cause?:string};
