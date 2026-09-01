export function maximumDrawdown(profits:number[]){let equity=0,peak=0,max=0;for(const p of profits){equity+=p;peak=Math.max(peak,equity);max=Math.max(max,peak-equity)}return max}
