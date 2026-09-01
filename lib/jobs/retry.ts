import { SCHEDULER_CONFIG } from '@/config/scheduler';
export const isRetryable=(status?:number,message='')=>![401,403].includes(status??0)&&!/invalid api key/i.test(message);
export const retryDelay=(attempt:number)=>SCHEDULER_CONFIG.retryDelaysMs[Math.min(attempt,SCHEDULER_CONFIG.retryDelaysMs.length-1)];
