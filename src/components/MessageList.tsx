import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MessageList: React.FC = () => {
  const messages = useSelector((state: RootState) => state.websocket.messages);

  return (
    <div>
      <h2>Last 10 Messages:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
