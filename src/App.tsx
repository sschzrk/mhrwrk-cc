import { use } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const fetchAuth = async (): Promise<Response> => {
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
  return response.json();
};

function App() {
  const authPromise = fetchAuth();
  const authData = use(authPromise);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
