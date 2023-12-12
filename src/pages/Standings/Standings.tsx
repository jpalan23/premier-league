import { useMemo } from "react";
import { StandingApi } from "../../api/standing";
import { TeamApi } from "../../api/team";
import { Loading } from "../../components/Loading/Loading";
import { useApi } from "../../hooks/useApi/useApi";
import "./Standings.css";

export const Standings = () => {
  const { data: standingData, isLoading: isStadningApiLoading } = useApi<StandingApi.Response>(
    StandingApi.getStanding(),
  );
  const { data: teamData, isLoading: isTeamApiLoading } = useApi<TeamApi.Response>(TeamApi.getTeams());

  const isLoading = isStadningApiLoading || isTeamApiLoading;

  const data = useMemo(() => {
    if (!isLoading && standingData && teamData) {
      const standings = standingData.data;
      const teams = teamData.data;
      const standingsWithTeamName = standings.map((standing) => {
        const team = teams.find((team) => team.id === standing.participant_id);
        return {
          ...standing,
          team_name: team?.name,
          image_path: team?.image_path,
          short_code: team?.short_code,
        };
      });
      return standingsWithTeamName;
    } else {
      return [];
    }
  }, [standingData, teamData]);

  return (
    <div className="flex w-full flex-col md:p-8">
      <h2 className=" mb-8 text-center text-2xl font-bold">Scottish Premiership</h2>
      <h3 className="mb-4 text-center text-xl font-bold">Standings</h3>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="standings-table-container">
          <table className="standings-table">
            <thead>
              <tr>
                <th className="w-6 text-center">Rank</th>
                <th className="w-8">Logo</th>
                <th>Team Name</th>
                <th className="w-8 text-center">Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map((team) => (
                <tr key={team.position}>
                  <td className="w-6 text-center">{team.position}</td>
                  <td className="w-8">
                    <img src={team.image_path} alt={`${team.team_name} Logo`} className="team-logo" />
                  </td>
                  <td className="font-bold">{team.team_name}</td>
                  <td className="w-8 text-center">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
