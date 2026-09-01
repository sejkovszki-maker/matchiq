import type { LeagueProfile } from '@/types/league-profile';
const profiles:Record<string,LeagueProfile>={
pl:{leagueId:'pl',homeGoalsAvg:1.63,awayGoalsAvg:1.28,drawRate:.24,bttsRate:.59,over25Rate:.57,homeAdvantage:1.08,eloKFactor:24,predictability:.78},
sa:{leagueId:'sa',homeGoalsAvg:1.55,awayGoalsAvg:1.18,drawRate:.27,bttsRate:.52,over25Rate:.49,homeAdvantage:1.07,eloKFactor:22,predictability:.80},
bl:{leagueId:'bl',homeGoalsAvg:1.72,awayGoalsAvg:1.39,drawRate:.23,bttsRate:.62,over25Rate:.61,homeAdvantage:1.06,eloKFactor:24,predictability:.73},
nb1:{leagueId:'nb1',homeGoalsAvg:1.58,awayGoalsAvg:1.24,drawRate:.25,bttsRate:.56,over25Rate:.54,homeAdvantage:1.09,eloKFactor:26,predictability:.68},
ll:{leagueId:'ll',homeGoalsAvg:1.43,awayGoalsAvg:1.08,drawRate:.28,bttsRate:.47,over25Rate:.44,homeAdvantage:1.07,eloKFactor:22,predictability:.82},
};
export function getLeagueProfile(id:string):LeagueProfile{return profiles[id]??{leagueId:id,homeGoalsAvg:1.5,awayGoalsAvg:1.2,drawRate:.26,bttsRate:.52,over25Rate:.51,homeAdvantage:1.07,eloKFactor:24,predictability:.65}}
