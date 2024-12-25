import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketState {
  messages: string[]; // Stores the last 5 messages
  pairs: {
    [key: string]: any[]; // Each pair_name will have an array of data objects
  };
}

const initialState: WebSocketState = {
  messages: [],
  pairs: {},
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      // Add the message at the beginning of the array
      state.messages.unshift(action.payload);

      // Keep only the latest 5 messages
      if (state.messages.length > 5) {
        state.messages.pop();
      }
    },
    removePairs: (state)=> {
      state.pairs = {}
    },
    addPairs: (state, action: PayloadAction<{ pair: string; data: any, allPairs: string[] }>) => {
      
      
      const { pair, data, allPairs } = action.payload;
      // Initialize the array if it doesn't exist
      if (!state.pairs[pair]) {
        state.pairs[pair] = [];
      }

      // Add the new data at the beginning of the array
      state.pairs[pair].unshift(data);

      // Keep only the latest 5 data objects for each pair
      if (state.pairs[pair].length > 5) {
        state.pairs[pair].pop();
      }

      Object.keys(state.pairs).forEach((existingPair) => {
        if (!allPairs.includes(existingPair)) {
          delete state.pairs[existingPair];
        }
      });
    },
  },
});

export const { addMessage, addPairs, removePairs } = websocketSlice.actions;

export default websocketSlice.reducer;
