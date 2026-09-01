export function congestionScore(matches14:number,matches30:number,minutes14:number,travel:number){return Math.round(Math.max(0,Math.min(100,matches14*9+matches30*3+minutes14/70+travel/250)))}
