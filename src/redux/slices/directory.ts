import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { DirectoryRow } from "../../types"
import { AppThunk, RootState } from "../store"

export interface DirectoryState{
   
    list: string[]
    store: Record<string, DirectoryRow>
}
const initialState: DirectoryState = {
   
    list: [], 
    store: {}
}


export const directorySlice = createSlice({
    name: "directory",
    initialState,
    reducers: {
        loaded: (state, action: PayloadAction<DirectoryRow[]>)=>{
            state.list = action.payload.map((event)=>event.id+"")
            action.payload.map((event)=>{
                state.store[event.id+""] = event

            })
        }
    }
})

export const contactsSelector = (state: RootState)=>{
 
    return state.directory.list.map((id)=>{
        return state.directory.store[id]

    })
}

const storeSelector = (state:RootState)=>state.directory.store

export const contactByIdSelector = (id:string) => (state:RootState)=>state.directory.store[id]

export const loadDirectory = (): AppThunk => async (dispatch)=>{
    const {data} = await axios.get(`/api/directory`)
    dispatch(loaded(data))
}
export const {loaded} = directorySlice.actions


export default directorySlice.reducer