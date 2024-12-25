import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Manage toggle state

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {isLogin ? <Login /> : <Register />}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleAuthMode}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
