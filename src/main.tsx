import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="lg:max-w-7xl lg:mx-auto w-full px-4">
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<div>Error</div>}>
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path="/shop/:id" element={<div>Shop</div>} />
      </Routes>
    </div>
  </BrowserRouter>
);
