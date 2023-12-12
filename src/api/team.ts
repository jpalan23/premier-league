import { GLOBAL_CONSTANT } from "../constant/global";

export namespace TeamApi {
  export type Response = {
    data: Team[];
  };

  export const getTeams = () => {
    const { CURRENT_SEASON } = GLOBAL_CONSTANT;
    return `football/teams/seasons/${CURRENT_SEASON}`;
  };
}

export type Team = {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number;
  name: string;
  short_code: string;
  image_path: string;
  founded: number;
  type: string;
  placeholder: boolean;
  last_played_at: string;
};
