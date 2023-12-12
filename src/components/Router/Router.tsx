import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Fixtures as FixturesPage } from "../../pages/Fixtures/Fixtures";
import { Home as HomePage } from "../../pages/Home/Home";
import { Standings as StandingsPage } from "../../pages/Standings/Standings";

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/standings" element={<StandingsPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
    </>,
  ),
);
