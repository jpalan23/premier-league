import { GLOBAL_CONSTANT } from "../constant/global";

export namespace LeagueApi {
  export type Response = {
    data: League;
  };

  export const getLeague = () => {
    const { BASE_LEAGUE } = GLOBAL_CONSTANT;
    return `football/leagues/${BASE_LEAGUE}`;
  };
}

export type League = {
  id: number;
  sport_id: number;
  name: string;
  image_path: string;
  last_played_at: string;
};
