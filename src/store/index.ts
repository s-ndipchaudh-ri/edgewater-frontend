import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import websocketReducer from "./websocketSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
    user: userReducer,

  },
});

// Types for App
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Custom hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;