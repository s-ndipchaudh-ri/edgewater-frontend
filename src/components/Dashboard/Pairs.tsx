import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { updateUserPairs } from "../../store/userSlice";
import websocketManager from "../../websocketManager";

const PairsComponent: React.FC = () => {
  const dispatch = useDispatch();

  // Fetch the current user's pairs from Redux store
  const userPairs = useAppSelector((state) => state.user.user?.pairs || [])
  
  
  const [selectedPairs, setSelectedPairs] = useState<string[]>(userPairs);

  // Sync state with user pairs from the store
  useEffect(() => {
    setSelectedPairs(userPairs);
  }, [userPairs]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      setSelectedPairs((prev) => [...prev, name]);
    } else {
      setSelectedPairs((prev) => prev.filter((pair) => pair !== name));
    }
  };

  const handleUpdatePairs = () => {
    dispatch(updateUserPairs(selectedPairs));
    websocketManager.disconnect()
    websocketManager.connect()
  };

  return (
    <div>
      <h3>Select Pairs</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {["BTC-USD", "ETH-USD", "XRP-USD", "LTC-USD"].map((pair) => (
          <label key={pair}>
            <input
              type="checkbox"
              name={pair}
              checked={selectedPairs.includes(pair)}
              onChange={handleCheckboxChange}
            />
            {pair}
          </label>
        ))}

      </div>
      <button
        onClick={handleUpdatePairs}
        style={{
        //   padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        Update Pairs
      </button>
  
    </div>
  );
};

export default PairsComponent;
