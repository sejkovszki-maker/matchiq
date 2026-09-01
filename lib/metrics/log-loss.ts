export function categoricalLogLoss(probabilities:number[],outcome:number){return-Math.log(Math.max(1e-8,Math.min(1-1e-8,probabilities[outcome]??0)))}
