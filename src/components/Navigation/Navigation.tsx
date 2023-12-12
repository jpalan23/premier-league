import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LeagueApi } from "../../api/league";
import { useApi } from "../../hooks/useApi/useApi";
import "./Navigation.css";

const NavigationOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Standings",
    path: "/standings",
  },
  {
    name: "Fixtures",
    path: "/fixtures",
  },
];

export const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useApi<LeagueApi.Response>(LeagueApi.getLeague());

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const routeTo = (path: string) => {
    navigate(path);
    setIsNavOpen(false);
  };

  return (
    <Fragment>
      <button className="toggle-button flex rounded md:hidden" onClick={toggleNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <div className="flex items-center justify-between px-4">
        {data && <img src={data?.data.image_path} alt="logo" className="h-16 w-20"></img>}
        <nav className="hidden py-5 md:block">
          <ul className="flex">
            {NavigationOptions.map((option, index) => (
              <li
                key={index}
                className="mx-2 cursor-pointer rounded border-2 border-black px-3 py-2 hover:bg-gray-200 hover:shadow-xl"
              >
                <Link to={option.path}>{option.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isNavOpen && (
        <nav className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white py-5 md:hidden">
          <ul className="flex flex-col items-center justify-center">
            {NavigationOptions.map((option, index) => (
              <li
                key={index}
                className="mx-2 mb-2 cursor-pointer rounded border-2 border-black px-3 py-2 hover:bg-gray-200 hover:shadow-xl"
              >
                <button onClick={() => routeTo(option.path)}>{option.name}</button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsNavOpen(false)}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </nav>
      )}
    </Fragment>
  );
};
