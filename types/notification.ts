export type NotificationType='HIGH_VALUE_SIGNAL'|'PREDICTION_CHANGED'|'LINEUP_CONFIRMED'|'KEY_PLAYER_OUT'|'ODDS_MOVEMENT'|'MATCH_STARTING'|'FINAL_RESULT';
export type UserNotification={id:string;type:NotificationType;matchId?:string;title:string;message:string;createdAt:string;readAt?:string};
