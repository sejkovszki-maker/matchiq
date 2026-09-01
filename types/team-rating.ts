export type VenueStrength={attack:number;defence:number};
export type TeamStrength={teamId:string;attack:number;defence:number;home:VenueStrength;away:VenueStrength;overall:number};
export type EloRating={teamId:string;rating:number;updatedAt:string};
export type FormMatch={result:'W'|'D'|'L';goalsFor:number;goalsAgainst:number;xg:number;xga:number;opponentElo:number;venue:'home'|'away'};
export type FormRating={teamId:string;overall:number;home:number;away:number;stability:number;matches:FormMatch[]};
