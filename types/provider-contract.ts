export type TippmixMappingStatus='VERIFIED'|'AUTO_MATCHED'|'UNRESOLVED';
export type NormalizedProviderRecord<T>={provider:string;providerVersion:string;sourceId:string;fetchedAt:string;sourceUpdatedAt:string;confidence:number;rawStatus:string;normalizedData:T};
export type ProviderCategory='fixtures'|'statistics'|'odds'|'squads';
export type ProviderRegistration={category:ProviderCategory;primary?:string;secondary?:string;configured:boolean};
