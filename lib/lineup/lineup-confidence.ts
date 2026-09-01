import type { LineupPlayer } from '@/types/lineup';export function lineupConfidence(players:LineupPlayer[]){return Math.round(players.reduce((s,p)=>s+p.probability,0)/Math.max(players.length,1)*100)}
