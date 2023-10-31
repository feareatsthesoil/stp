import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import app from "./slices/app";

export const store = configureStore({
  reducer: {
    app,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<any>
>;
