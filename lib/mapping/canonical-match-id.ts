import type { Match } from '@/types/domain';
const token=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,5);
export function canonicalMatchId(match:Match){const country=token(match.league.country).slice(0,3),league=token(match.league.name).slice(0,5),date=match.kickoff.slice(0,10).replaceAll('-','');return`MIQ-${country}-${league}-${date}-${token(match.home.id)}-${token(match.away.id)}`}
