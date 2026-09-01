export function managerStability(matches:number,changed:boolean){return Math.round(Math.max(25,Math.min(100,(changed?42:70)+Math.min(30,matches))))}
