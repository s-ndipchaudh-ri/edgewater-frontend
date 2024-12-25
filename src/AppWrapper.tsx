import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";

const AppWrapper: React.FC = () => {
  const handleReset = () => {
    // Custom logic for resetting state, if needed
    console.log("Resetting the app after an error...");
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      <App />
    </ErrorBoundary>
  );
};

export default AppWrapper;
