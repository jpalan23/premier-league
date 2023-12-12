import { SquadApi } from "../../api/squad";
import { Team } from "../../api/team";
import { Loading } from "../../components/Loading/Loading";
import { useApi } from "../../hooks/useApi/useApi";

type Props = {
  team: Team;
  id: number;
  onClosed: () => void;
};

export const TeamSquad = ({ id, team, onClosed }: Props) => {
  const { data, isLoading } = useApi<SquadApi.Response>(SquadApi.getSquad(id));
  return (
    <div className="flex flex-col items-center justify-center border-t border-black pt-8">
      <div className="mb-4 flex h-6 w-full items-center justify-between">
        <h4 className="flex text-xl font-bold">
          {team.name} - {team.founded}
        </h4>
        <button
          onClick={() => onClosed()}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
      <div className="mb-4 text-2xl font-bold">Squad</div>
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid w-full grid-cols-3 gap-x-2  gap-y-4 md:grid-cols-4">
            {data?.data.map((player, index) => (
              <div
                key={index}
                className="flex cursor-pointer flex-col items-center justify-center rounded-sm border border-black p-4 hover:bg-gray-200"
              >
                <img src={player.image_path} alt="team-logo" className="mb-2 h-16 w-20"></img>
                <p className="text-lg font-bold">{player.display_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
