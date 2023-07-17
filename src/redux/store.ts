import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import app from "./slices/app";
import calendar from "./slices/calendar";
import resource from "./slices/resource";

export const store = configureStore({
  reducer: {
    app,
    calendar,
    resource,
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
