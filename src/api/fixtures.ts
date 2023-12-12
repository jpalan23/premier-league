import { GLOBAL_CONSTANT } from "../constant/global";

export namespace FixturesApi {
  export type Response = {
    data: Schedule[];
  };

  export const getSchedule = () => {
    const { CURRENT_SEASON } = GLOBAL_CONSTANT;
    return `football/schedules/seasons/${CURRENT_SEASON}`;
  };
}

export type Schedule = {
  starting_at: string;
  ending_at: string;
  games_in_current_week: boolean;
  is_current: boolean;
  id: number;
  rounds: Round[];
};

export type Round = {
  id: number;
  name: string;
  finished: boolean;
  is_current: boolean;
  starting_at: string;
  ending_at: string;
  games_in_current_week: boolean;
  fixtures: Fixture[];
};

export type Fixture = {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  round_id: number;
  state_id: number;
  venue_id: number;
  name: string;
  starting_at: string;
  result_info: string;
  leg: string;
  length: number;
  placeholder: boolean;
  has_odds: boolean;
  starting_at_timestamp: number;
  participants: Participant[];
  scores: Score[];
};

export interface Participant {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number;
  gender: string;
  name: string;
  short_code: string;
  image_path: string;
  founded: number;
  type: string;
  placeholder: boolean;
  last_played_at: string;
  meta: Meta;
}

export interface Meta {
  location: string;
  winner: boolean;
  position: number;
}

export interface Score {
  id: number;
  fixture_id: number;
  type_id: number;
  participant_id: number;
  score: Score2;
  description: string;
}

export interface Score2 {
  goals: number;
  participant: string;
}
