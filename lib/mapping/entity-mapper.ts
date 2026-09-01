import type { ExternalMapping } from '@/types/provider';

const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\b(fc|cf|ac|sc)\b/g,'').replace(/[^a-z0-9]/g,'');
export function mappingConfidence(externalName:string,internalName:string){const a=normalize(externalName),b=normalize(internalName);if(a===b)return 100;if(a.includes(b)||b.includes(a))return 86;const common=[...new Set(a)].filter(c=>b.includes(c)).length;return Math.round(common/Math.max(new Set(a).size,new Set(b).size)*75)}
export function createMapping(provider:string,externalId:string,internalId:string,externalName:string,internalName:string):ExternalMapping{const confidence=mappingConfidence(externalName,internalName);return{provider,externalId,internalId,confidence,reviewRequired:confidence<75}}
