import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { CalendarRow } from "../../types";
import { AppThunk, RootState } from "../store";

export interface CalendarState {
  events: CalendarRow[];
  list: string[];
  store: Record<string, CalendarRow>;
}
const initialState: CalendarState = {
  events: [],
  list: [],
  store: {},
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    loadedEvents: (state, action: PayloadAction<CalendarRow[]>) => {
      state.list = action.payload.map((event) => event.id + "");
      action.payload.map((event) => {
        state.store[event.id + ""] = event;
      });
    },
    loadedEvent: (state, action: PayloadAction<CalendarRow>) => {
      state.store[action.payload.id] = action.payload;
    },
    deleted: (state, action: PayloadAction<string | number>) => {
      const { [action.toString()]: entry, ...rest } = state.store;
      state.store = rest;
      state.list = [];
    },
  },
});

export const eventsSelector = (state: RootState) => {
  return state.calendar.list.map((id) => {
    return state.calendar.store[id];
  });
};

const storeSelector = (state: RootState) => state.calendar.store;

export const eventsByIdSelector = (id: string) => (state: RootState) =>
  state.calendar.store[id];

export const loadEvents = (): AppThunk => async (dispatch) => {
  const { data } = await axios.get(`/api/calendar`);
  dispatch(loadedEvents(data));
};

export const loadEvent =
  (id: string | number): AppThunk =>
  async (dispatch) => {
    const { data } = await axios.get(`/api/calendar/${id}`);
    dispatch(loadedEvent(data));
  };
export const deleteEvent =
  (id: string | number): AppThunk =>
  async (dispatch) => {
    await axios.delete(`/api/calendar/${id}`);
    dispatch(deleted(id));
  };

export const { loadedEvents, loadedEvent, deleted } = calendarSlice.actions;

export default calendarSlice.reducer;
