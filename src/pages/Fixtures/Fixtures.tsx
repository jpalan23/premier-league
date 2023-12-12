import { useEffect, useMemo, useState } from "react";
import { FixturesApi } from "../../api/fixtures";
import { Loading } from "../../components/Loading/Loading";
import { useApi } from "../../hooks/useApi/useApi";
import "../Standings/Standings.css";

export const Fixtures = () => {
  const { data, isLoading } = useApi<FixturesApi.Response>(FixturesApi.getSchedule());
  const [roundIndex, setRoundIndex] = useState<number | undefined>(undefined);

  const roundsData = useMemo(() => (data && data.data.length ? data?.data[0].rounds || [] : []), [data]);

  useEffect(() => {
    const currentRoundIndex = roundsData?.findIndex((round) => round.is_current === true) || undefined;
    if (roundsData && roundsData.length > 0 && roundIndex === undefined && currentRoundIndex !== undefined) {
      setRoundIndex(currentRoundIndex);
    }
  }, [roundsData]);

  const currentRound =
    roundsData && roundsData.length > 0 && roundIndex !== undefined ? roundsData[roundIndex] : undefined;

  return (
    <div className="flex w-full flex-col md:p-8">
      <h2 className=" mb-8 text-center text-2xl font-bold">Scottish Premiership</h2>
      {isLoading || !currentRound ? (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="mb-4 flex w-full items-center justify-between">
            <button
              disabled={roundIndex === 0}
              className="mr-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              onClick={() => setRoundIndex((roundIndex) => (roundIndex && roundIndex > 0 ? roundIndex - 1 : 0))}
            >
              Previous
            </button>
            <h4 className="mb-4 text-center text-lg font-bold">Round: {currentRound?.name}</h4>
            <button
              disabled={roundIndex === roundsData.length - 1}
              className="ml-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              onClick={() =>
                setRoundIndex((roundIndex) =>
                  roundIndex && roundIndex < roundsData.length - 1 ? roundIndex + 1 : roundsData.length - 1,
                )
              }
            >
              Next
            </button>
          </div>
          <table className="fixtures-table">
            <thead>
              <tr>
                <th className="">Home</th>
                <th className="">Away</th>
              </tr>
            </thead>
            <tbody>
              {currentRound?.fixtures.map((match, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center justify-center">
                      <img src={match.participants[0].image_path} alt="team-logo" className="mr-2 h-10 w-10"></img>
                      <span>{match.participants[0].name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <img src={match.participants[1].image_path} alt="team-logo" className="mr-2 h-10 w-10"></img>
                      <span>{match.participants[1].name}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
