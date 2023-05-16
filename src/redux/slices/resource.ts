import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { Resource } from "../../types"
import { AppThunk, RootState } from "../store"

export interface ResourceState {

    list: string[]
    store: Record<string, Resource>
}
const initialState: ResourceState = {

    list: [],
    store: {}
}

export const resourceSlice = createSlice({
    name: "resource",
    initialState,
    reducers: {
        loaded: (state, action: PayloadAction<Resource[]>) => {
            state.list = action.payload.map((row) => row.id + "")
            action.payload.map((row) => {
                state.store[row.id + ""] = row

            })
        },
        deleted: (state, action: PayloadAction<string | number>) => {

            const { [action.toString()]: entry, ...rest } = state.store
            state.store = rest
            state.list = []

        }
    }
})

export const resourcesSelector = (state: RootState) => {

    return state.resource.list.map((id) => {
        return state.resource.store[id]

    })
}

const storeSelector = (state: RootState) => state.resource.store
export const { loaded, deleted } = resourceSlice.actions

export const resourceByIdSelector = (id: string) => (state: RootState) => state.resource.store[id]

export const loadResources = (): AppThunk => async (dispatch) => {
    const { data } = await axios.get(`/api/resources`)
    dispatch(loaded(data))
}

export const deleteResource = (id: string | number): AppThunk => async (dispatch) => {
    console.log(id);
    await axios.delete(`/api/resources/${id}`)
    dispatch(deleted(id))
}


export default resourceSlice.reducer