import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="lg:max-w-7xl lg:mx-auto w-full px-4">
      <App />
    </div>
  </BrowserRouter>
);
