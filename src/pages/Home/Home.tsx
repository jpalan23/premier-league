import { useState } from "react";
import { Team, TeamApi } from "../../api/team";
import { Loading } from "../../components/Loading/Loading";
import { useApi } from "../../hooks/useApi/useApi";
import { TeamSquad } from "./TeamSquad";

export const Home = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const { data, isLoading } = useApi<TeamApi.Response>(TeamApi.getTeams());

  return (
    <div>
      <h2 className=" mb-8 text-center text-2xl font-bold">Scottish Premiership</h2>
      <h3 className="mb-4 text-center text-xl font-bold">Teams</h3>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mb-4 grid w-full grid-cols-3 gap-x-2  gap-y-4 md:grid-cols-4">
          {data?.data.map((team, index) => (
            <div
              onClick={() => setSelectedTeam(team)}
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center rounded-sm border border-black p-4 hover:bg-gray-200"
            >
              <img src={team.image_path} alt="team-logo" className="mb-2 h-16 w-20"></img>
              <div className="text-lg font-bold">{team.name}</div>
            </div>
          ))}
        </div>
      )}
      {selectedTeam && (
        <TeamSquad team={selectedTeam} id={selectedTeam.id} onClosed={() => setSelectedTeam(undefined)} />
      )}
    </div>
  );
};
