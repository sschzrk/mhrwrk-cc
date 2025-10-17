import { use } from "react";
import type { Shop } from "../types";

type ShopResponse = {
  currentPage: number;
  numberOfPages: number;
  numberOfResults: number;
  items: Shop[];
};

export const fetchShops = async (token: string): Promise<ShopResponse> => {
  const response = await fetch(
    "https://testapi.mehrwerk.de/v3/cashback/shops",
    {
      method: "GET",
      headers: {
        "X-API-Key": "lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shops");
  }

  return response.json();
};

const promiseCache = new Map<
  string,
  { promise: Promise<unknown>; timescale: Date }
>();

export function useQuery<T>({
  queryKey,
  queryFn,
  options = { staleTime: 600000 }, // Default: 10 minutes (in milliseconds)
}: {
  queryKey: string;
  queryFn: () => Promise<T>;
  options?: { staleTime?: number };
}) {
  const { staleTime = 600000 } = options;

  const cached = promiseCache.get(queryKey);
  const isStale = cached
    ? new Date().getTime() - cached.timescale.getTime() > staleTime
    : true;

  if (!cached || isStale) {
    promiseCache.set(queryKey, { promise: queryFn(), timescale: new Date() });
  }

  const promise = promiseCache.get(queryKey)?.promise as Promise<T>;

  const result = use(promise);

  return result;
}
