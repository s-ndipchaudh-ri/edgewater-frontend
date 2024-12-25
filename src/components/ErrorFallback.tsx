import React from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8d7da" }}>
      <h2>Something went wrong</h2>
      <p style={{ color: "red" }}>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
