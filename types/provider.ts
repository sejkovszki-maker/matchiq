import type { Match, Odds, Statistics } from './domain';

export type ProviderPayload<T>={provider:string;fetchedAt:string;stale:boolean;data:T;warnings:string[]};
export type ExternalMapping={provider:string;externalId:string;internalId:string;confidence:number;reviewRequired:boolean};
export interface TippmixProvider{getEvents(date:string):Promise<ProviderPayload<Match[]>>;getOdds(matchIds:string[]):Promise<ProviderPayload<Odds[]>>}
export interface ProductionProvider{getFixtures(date:string):Promise<ProviderPayload<Match[]>>;getStatistics(matches:Match[]):Promise<ProviderPayload<Statistics[]>>;getOdds(matches:Match[]):Promise<ProviderPayload<Odds[]>>}
