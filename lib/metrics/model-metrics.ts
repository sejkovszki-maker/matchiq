export function brierScore(probabilities:number[],outcomeIndex:number){return probabilities.reduce((s,p,i)=>s+(p-(i===outcomeIndex?1:0))**2,0)/probabilities.length}
export function logLoss(probability:number){return -Math.log(Math.max(.000001,Math.min(.999999,probability)))}
export function binaryAccuracy(predicted:number,actual:boolean){return (predicted>=.5)===actual}
export const MODEL_VERSION='0.6.0';
