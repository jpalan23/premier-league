import { useQuery, UseQueryOptions } from "react-query";
import { GLOBAL_CONSTANT } from "../../constant/global";

function buildQueryParams(args: Record<string, string | number>) {
  return Object.entries(args).map(([key, value]) => [key, String(value)]);
}

export const useApi = <TData>(
  path: string,
  args: Record<string, string | number> = {},
  options: UseQueryOptions<TData, unknown> = {},
) => {
  const { API_BASE_PATH } = GLOBAL_CONSTANT;
  const queryParams = new URLSearchParams(buildQueryParams(args)).toString();
  const url = `${API_BASE_PATH}/${path}${queryParams ? `?${queryParams}` : ""}`;
  const headers = {
    Authorization: "e5glFDTOqV8ei1aA4o9JVqzT8v0OptXYPM26STaxwEQlSkuyrKc3UsirJhCl",
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const key = [path, args]; // Generates a unique key for the query

  const queryResult = useQuery<TData, unknown>(
    key,
    () => fetch(url, { headers: headers }).then((res) => res.json()),
    options,
  );

  return queryResult;
};
