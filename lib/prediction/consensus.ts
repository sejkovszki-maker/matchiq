import type { ConsensusVote,Outcome } from '@/types/model-output';
export function probabilityOutcome(home:number,draw:number,away:number):Outcome{return home>=draw&&home>=away?'home':away>=home&&away>=draw?'away':'draw'}
export function consensus(votes:ConsensusVote[]){const counts:Record<Outcome,number>={home:0,draw:0,away:0};votes.forEach(v=>counts[v.outcome]++);const outcome=(Object.keys(counts) as Outcome[]).sort((a,b)=>counts[b]-counts[a])[0];return{outcome,count:counts[outcome],agreement:counts[outcome]/Math.max(1,votes.length)}}
