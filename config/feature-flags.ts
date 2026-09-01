export const FEATURE_FLAGS={ENABLE_TIPPMIX:true,ENABLE_LIVE_ODDS:true,ENABLE_SQUAD_CONTEXT:true,ENABLE_VALUE_ENGINE:true,ENABLE_SHADOW_MODEL:true} as const;
export type Environment='development'|'staging'|'production';
export const RUNTIME_ENVIRONMENT:Environment='production';
