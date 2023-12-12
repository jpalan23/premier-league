export namespace SquadApi {
  export type Response = {
    data: Player[];
  };

  export const getSquad = (id: number) => {
    return `football/squads/teams/${id}/extended`;
  };
}

export type Player = {
  id: number;
  detail_position_id: number;
  common_name: string;
  fistname: string;
  lastname: string;
  display_name: string;
  image_path: string;
  height: number;
  weight: number;
  date_of_birth: string;
};
