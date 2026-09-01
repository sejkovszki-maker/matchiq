export function multiclassBrier(probabilities:number[],outcome:number){return probabilities.reduce((sum,p,i)=>sum+(p-(i===outcome?1:0))**2,0)/probabilities.length}
