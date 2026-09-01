import type { AuditEvent,AuditLevel } from '@/types/audit-event';
export const createAuditEvent=(level:AuditLevel,event:string,service:string,details:Partial<AuditEvent>={}):AuditEvent=>({id:crypto.randomUUID(),timestamp:new Date().toISOString(),level,event,service,...details});
export const publicErrorMessage=(service:string)=>service==='odds'?'Az oddsadatok átmenetileg nem érhetők el.':'Az adatok átmenetileg nem érhetők el.';
