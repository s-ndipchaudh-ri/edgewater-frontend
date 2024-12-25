import React, {  useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { logout } from "../store/userSlice";
import websocketManager from "../websocketManager";

const Navbar: React.FC = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isSocketEnable, setIsSocketEnable] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    websocketManager.disconnect();
  };


  return (
    <nav>
      {isLoggedIn && (
        <div>
          <p>Welcome, {user?.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          {isSocketEnable ? (
            <button onClick={() => {websocketManager.disconnect(); setIsSocketEnable(false)}}>
              Discconect socket
            </button>
          ) : (
            <button onClick={() => {websocketManager.connect(); setIsSocketEnable(true)}}>
              Connect socket
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
