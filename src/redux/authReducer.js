import { createSlice } from "@reduxjs/toolkit";
import { authAPI, profileAPI } from "../api/api";

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: null,
    userData: null,
    errorMessage: null,
    isLoading: false,
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setUserData(state, action) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.login = action.payload.login
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
        },
        setUserProfileData(state, action) {
            state.userData = action.payload
        },
        deleteUserProfileData(state, action) {
            state.userData = null
            state.id = null
            state.login = null
            state.email = null
            state.isAuth = null
        },
        setLoadingStatus(state, action) {
           state.isLoading = action.payload
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
    }
})

export default authReducer.reducer
export const {
    setUserData, 
    setErrorMessage, 
    setUserProfileData, 
    deleteUserProfileData, 
    setLoadingStatus, 
    setIsAuth
} = authReducer.actions

export const getAuthUserThunkCreator = () => {
    return async (dispatch) => {
        const response = await authAPI.getAuthUser()
        if (response.resultCode === 0) {
            dispatch(setUserData(response.data))
            const profileResponce = await profileAPI.getUserProfile(response.data.id)
            dispatch(setIsAuth(true))
            dispatch(setUserProfileData(profileResponce))
        } else if (response.resultCode === 1) {
            dispatch(setIsAuth(false))
        }
    }
}
export const loginUserThuncCreator = (email, password, rememberMe = false) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingStatus(true))
            const loginUserResponce = await authAPI.loginUser(email, password, rememberMe)
            dispatch(setLoadingStatus(false))
            if (loginUserResponce.data.resultCode === 0) {
                debugger
                dispatch(setErrorMessage(null))
                dispatch(getAuthUserThunkCreator());
            } else {
                dispatch(setErrorMessage(loginUserResponce.data.messages[0]))
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }
}

export const loginOutUserThuncCreator = () => {
    return async (dispatch) => {
        const logoutUserResponce = await authAPI.logoutUser()
        if (logoutUserResponce.resultCode === 0) {
            dispatch(deleteUserProfileData())
        }
    }
}