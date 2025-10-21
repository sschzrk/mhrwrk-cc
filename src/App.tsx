import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router";
import "./App.css";
import { ShopDetail } from "./components/ShopDetail";
import { ShopOveriew } from "./components/ShopList";
import { ShopOverviewLoading } from "./components/ShopOverviewLoading";
import { ShopDetailLoading } from "./components/ShopDetailLoading";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary fallback={<div>Error</div>}>
            <Suspense fallback={<ShopOverviewLoading />}>
              <ShopOveriew />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/shop/:id"
        element={
          <ErrorBoundary fallback={<div>Error</div>}>
            <Suspense fallback={<ShopDetailLoading />}>
              <ShopDetail />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
}

export default App;
