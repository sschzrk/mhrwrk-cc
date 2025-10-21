import { use } from "react";
import type { Shop } from "../types";

type AuthData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: unknown[];
};

type ShopResponse = {
  currentPage: number;
  numberOfPages: number;
  numberOfResults: number;
  items: Shop[];
};

let tokenRefreshPromise: Promise<AuthData> | null = null;

export const fetchAuth = async (): Promise<AuthData> => {
  if (tokenRefreshPromise) {
    return tokenRefreshPromise;
  }

  tokenRefreshPromise = fetch(
    "https://testapi.mehrwerk.de/v2/iam/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": import.meta.env.VITE_X_API_KEY,
      },
      body: JSON.stringify({
        grant_type: import.meta.env.VITE_GRANT_TYPE,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch auth data");
      }
      return response.json();
    })
    .finally(() => {
      tokenRefreshPromise = null;
    });

  return tokenRefreshPromise as Promise<AuthData>;
};

const onTokenRefresh = (newToken: string) => {
  localStorage.setItem("token", newToken);
};

export const fetchShops = async (): Promise<ShopResponse> => {
  const token = localStorage.getItem("token");

  const response = await fetchWithTokenRefresh(
    "https://testapi.mehrwerk.de/v3/cashback/shops",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": import.meta.env.VITE_X_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    },
    onTokenRefresh
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shops");
  }

  return response.json();
};

export const fetchShopById = async (id: string | undefined): Promise<Shop> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token provided");
  }

  if (!id) {
    throw new Error("No id provided");
  }

  const response = await fetchWithTokenRefresh(
    `https://testapi.mehrwerk.de/v3/cashback/shops/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": import.meta.env.VITE_X_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    },
    onTokenRefresh
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shop by id");
  }

  return response.json();
};

const fetchWithTokenRefresh = async (
  url: string,
  options: RequestInit,
  onTokenRefresh: (newToken: string) => void
): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    try {
      const newAuthData = await fetchAuth();
      const newToken = newAuthData.access_token;
      onTokenRefresh(newToken);

      // Retry the request with the new token
      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };
      return fetch(url, newOptions);
    } catch (error) {
      console.error(error);
      throw new Error("Token refresh failed");
    }
  }

  return response;
};

const promiseCache = new Map<
  string,
  { promise: Promise<unknown>; timestamp: Date; data?: unknown }
>();

export function useQuery<T>({
  queryKey,
  queryFn,
  options = { staleTime: 600000 }, // Default: 10 minutes
}: {
  queryKey: string;
  queryFn: () => Promise<T>;
  options?: { staleTime?: number };
}) {
  const { staleTime = 600000 } = options;

  let cached = promiseCache.get(queryKey);
  const isStale = cached
    ? new Date().getTime() - cached.timestamp.getTime() > staleTime
    : true;

  if (!cached || isStale) {
    const promise = queryFn().then((data) => {
      promiseCache.set(queryKey, { promise, data, timestamp: new Date() });
      return data;
    });
    promiseCache.set(queryKey, { promise, timestamp: new Date() });
    cached = promiseCache.get(queryKey);
  }

  if (cached!.data !== undefined) {
    return cached!.data as T;
  }

  return use(cached!.promise as Promise<T>);
}
