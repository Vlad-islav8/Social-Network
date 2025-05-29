import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getAuthUserThunkCreator } from "./authReducer";

export interface AppStateType  {
    initialize: boolean
}
interface thinkType {(dispatch:Function): Promise<void>}
let initialState:AppStateType = {
    initialize: false
}

const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setinitialize(state:AppStateType):void{
            state.initialize = true
        }
    }
})

export default appReducer.reducer
export const {setinitialize} = appReducer.actions

export const appInitializeThunkCreator = () => {
    return async (dispatch:Function):Promise<void> => {
        await dispatch(getAuthUserThunkCreator())
        dispatch(setinitialize())
    }
}
