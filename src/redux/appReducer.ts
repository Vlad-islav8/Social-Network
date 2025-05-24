import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getAuthUserThunkCreator } from "./authReducer";

interface initialStateType  {
    initialize: boolean
}
interface thinkType {(dispatch:Function): Promise<void>}
let initialState:initialStateType = {
    initialize: false
}

const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setinitialize(state:initialStateType):void{
            state.initialize = true
        }
    }
})

export default appReducer.reducer
export const {setinitialize} = appReducer.actions

export const appInitializeThunkCreator:() => thinkType = ():thinkType => {
    return async (dispatch:Function):Promise<void> => {
        await dispatch(getAuthUserThunkCreator())
        dispatch(setinitialize())
    }
}
