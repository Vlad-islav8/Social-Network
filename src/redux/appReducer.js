import { createSlice } from "@reduxjs/toolkit";
import { getAuthUserThunkCreator } from "./authReducer";

let initialState = {
    initialize: false
}

const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setinitialize(state, action) {
            return {
                ...state,
                initialize: true
            }
        }
    }
})
export default appReducer.reducer
export const {setinitialize} = appReducer.actions

export const appInitializeThunkCreator = () => {
    return async (dispatch) => {
        let promise = await dispatch(getAuthUserThunkCreator())
        dispatch(setinitialize())
    }
}
