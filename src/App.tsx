import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard/Layout";
import { useAppSelector } from "./store";





const App: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return (
    <>
    <Router>
      <Routes>
      <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Auth />}
          />
        {/* Use ProtectedRoute for protected pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Redirect all other paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
