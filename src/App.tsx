import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { useQuery } from "./fetch";
import { useAuth } from "./store";
import { ShopList } from "./shop-list";

type AuthData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: unknown[];
};

// TODO: Implement refetching of auth data if it expires
const fetchAuth = async (): Promise<AuthData> => {
  const response = await fetch(
    "https://testapi.mehrwerk.de/v2/iam/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: "bewerber",
        client_secret: "hj52Ws4kF",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch auth data");
  }

  return response.json();
};

function App() {
  const authData = useQuery({
    queryKey: "auth",
    queryFn: fetchAuth,
    options: { staleTime: 600 * 1000 },
  });
  const { token, setToken } = useAuth();

  if (authData.access_token && token !== authData.access_token) {
    setToken(authData.access_token);
  }

  return (
    <div>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ShopList token={authData.access_token} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
