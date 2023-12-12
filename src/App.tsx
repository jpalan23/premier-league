import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Fixtures as FixturesPage } from "./pages/Fixtures/Fixtures";
import { Home as HomePage } from "./pages/Home/Home";
import { Standings as StandingsPage } from "./pages/Standings/Standings";

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-auto flex w-full max-w-screen-xl flex-col p-6 md:p-8">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/fixtures" element={<FixturesPage />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
