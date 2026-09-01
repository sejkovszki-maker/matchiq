import type { Match,Odds,Statistics } from '@/types/domain';
export type ValidationResult={valid:boolean;errors:string[]};
export const validateMatch=(m:Match):ValidationResult=>{const errors:string[]=[];if(!Number.isFinite(new Date(m.kickoff).getTime()))errors.push('INVALID_KICKOFF');if(m.home.id===m.away.id)errors.push('SAME_TEAM');return{valid:!errors.length,errors}};
export const validateOdds=(o:Odds):ValidationResult=>{const errors=o.quotes.filter(q=>!Number.isFinite(q.odds)||q.odds<=1).map(q=>`INVALID_ODDS:${q.market}`);return{valid:!errors.length,errors}};
export const validateStatistics=(s:Statistics):ValidationResult=>{const errors:string[]=[];if(s.homeXg<0||s.homeXg>8||s.awayXg<0||s.awayXg>8)errors.push('INVALID_XG');return{valid:!errors.length,errors}};
