import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { CalendarRow } from "../../types"
import { AppThunk, RootState } from "../store"

export interface CalendarState {
    events: CalendarRow[]
    list: string[]
    store: Record<string, CalendarRow>
}
const initialState: CalendarState = {
    events: [],
    list: [],
    store: {}
}


export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        loadedEvents: (state, action: PayloadAction<CalendarRow[]>) => {
            state.list = action.payload.map((event) => event.id + "")
            action.payload.map((event) => {
                state.store[event.id + ""] = event

            })
        }
    }
})

export const eventsSelector = (state: RootState) => {

    return state.calendar.list.map((id) => {
        return state.calendar.store[id]

    })
}

const storeSelector = (state: RootState) => state.calendar.store

export const eventsByIdSelector = (id: string) => (state: RootState) => state.calendar.store[id]

export const loadEvents = (): AppThunk => async (dispatch) => {
    const { data } = await axios.get(`/api/calendar`)
    dispatch(loadedEvents(data))
}
export const { loadedEvents } = calendarSlice.actions


export default calendarSlice.reducer