import React, { useState } from "react";

const BuggyComponent: React.FC = () => {
  const [errorTrigger, setErrorTrigger] = useState(false);

  if (errorTrigger) {
    throw new Error("This is a test error!");
  }

  return (
    <div>
      <h2>Buggy Component</h2>
      <button
        onClick={() => setErrorTrigger(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Trigger Error
      </button>
    </div>
  );
};

export default BuggyComponent;
