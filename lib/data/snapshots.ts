import type { PredictionSnapshot } from '@/types/domain';
const KEY='matchiq-prediction-snapshots-v03';
export function saveSnapshot(snapshot:PredictionSnapshot){if(typeof window==='undefined')return;const all=getSnapshots();if(all.some(s=>s.matchId===snapshot.matchId&&s.modelVersion===snapshot.modelVersion))return;localStorage.setItem(KEY,JSON.stringify([...all,snapshot]))}
export function getSnapshots():PredictionSnapshot[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
