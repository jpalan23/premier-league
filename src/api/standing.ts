import { GLOBAL_CONSTANT } from "../constant/global";

export namespace StandingApi {
  export type Response = {
    data: Standing[];
  };

  export const getStanding = () => {
    const { CURRENT_SEASON } = GLOBAL_CONSTANT;
    return `football/standings/seasons/${CURRENT_SEASON}`;
  };
}

export type Standing = {
  id: number;
  participant_id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  group_id: number;
  round_id: number;
  standing_rule_id: number;
  position: number;
  result: string;
  points: number;
};
