export function travelPenalty(distance:number,timeZones:number,international:boolean){return Math.min(.06,distance/50000+timeZones*.008+(international?.01:0))}
