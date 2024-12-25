import { io, Socket } from "socket.io-client";
import { store } from "./store";
import { addMessage, addPairs, removePairs } from "./store/websocketSlice";

const SOCKET_URL = "http://localhost:3000";

class WebSocketManager {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);

      this.socket.on("connect", () => {
        store.dispatch(removePairs())
        console.log(`Connected to WebSocket server with ID: ${this.socket?.id}`);
        this.subscribe();
      });

      this.socket.on("data", (data: string) => {
        console.log("Received data:", data);
        store.dispatch(addMessage(data)); // Dispatch the message to Redux
        store.dispatch(addPairs(JSON.parse(data)))
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
    }
  }

  subscribe() {
    let user: any = localStorage.getItem('user') || null
    if(user){ 
      user = JSON.parse(user)
      const subscriptionMessage = {
        event: "subscribe",
        data: user._id,
      };
      this.socket?.emit("subscribe", subscriptionMessage);
      console.log("Subscribed with message:", subscriptionMessage);
    }
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    console.log("Disconnected from WebSocket server");
  }
}

const websocketManager = new WebSocketManager();
export default websocketManager;
