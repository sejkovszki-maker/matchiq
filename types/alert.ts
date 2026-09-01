export type AlertSeverity='INFO'|'WARNING'|'ERROR'|'CRITICAL';
export type AlertStatus='OPEN'|'ACKNOWLEDGED'|'RESOLVED';
export type SystemAlert={id:string;severity:AlertSeverity;status:AlertStatus;service:string;message:string;createdAt:string;resolvedAt?:string};
