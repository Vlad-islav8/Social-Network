import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { authAPI } from "../api/api";
import {getUserProfileThunkCreator, } from "./profileReducer";
type initialStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean ,
    errorMessage: string | null,
    isLoading: boolean,
    capchaUrl: string | null
}
type authType = {
    login: string,
    email: string,
    id: number
}
type loginDataType = {
    token: string
    userId: number
}
type loginType = {
    data: loginDataType
    fieldsErrors: []
    messages: []
    resultCode: number
}
type getUserType = {
    data: authType
    fieldsErrors: []
    messages: []
    resultCode: number
}
type thinkType  = (dispatch:Function) => Promise<void>
let initialState:initialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: null,
    errorMessage: null,
    isLoading: false,
    capchaUrl: null
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setUserData(state:initialStateType, action:PayloadAction<authType>):void {
            state.email = action.payload.email
            state.id = action.payload.id
            state.login = action.payload.login
        },
        setErrorMessage(state:initialStateType, action:PayloadAction<string>):void {
            state.errorMessage = action.payload
        },
        deleteUserProfileData(state:initialStateType):void {
            state.id = null
            state.login = null
            state.email = null
            state.isAuth = null
        },
        setLoadingStatus(state, action:PayloadAction<boolean>):void {
           state.isLoading = action.payload
        },
        setIsAuth(state, action:PayloadAction<boolean>):void {
            state.isAuth = action.payload
        },
        setCapchaUrl(state, action:PayloadAction<string>):void {
            state.capchaUrl = action.payload
        }
    }
})

export default authReducer.reducer

export const {
    setUserData, 
    setErrorMessage, 
    deleteUserProfileData,
    setLoadingStatus, 
    setIsAuth,
    setCapchaUrl,
} = authReducer.actions

export const getCapchaUrlThunkCreator = ():thinkType => {
    return async (dispatch:Function) => {
        const responce = await authAPI.capcha()
        dispatch(setCapchaUrl(responce))
    }
}
export const getAuthUserThunkCreator = ():thinkType => {
    return async (dispatch:Function) => {
        const response:getUserType = await authAPI.getAuthUser()
        if (response.resultCode === 0) {
            const data:authType = response.data
            dispatch(setUserData(data))
            dispatch(setIsAuth(true))
            dispatch(getUserProfileThunkCreator(response.data.id))
        } else {
            dispatch(setIsAuth(false))
        }
    }
}
export const loginUserThuncCreator = (email:string, password:number, rememberMe:boolean = false, capcha:string):thinkType => {
    return async (dispatch:Function) => {
        try {
            dispatch(setLoadingStatus(true))
            const loginUserResponce:loginType = await authAPI.loginUser(email, password, rememberMe, capcha)
            dispatch(setLoadingStatus(false))

            if (loginUserResponce.resultCode === 0) {
                dispatch(setErrorMessage(null))
                dispatch(getAuthUserThunkCreator());
            } else {
                const error:string = loginUserResponce.messages.find(el => el)
                dispatch(setErrorMessage(error))
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }
}
export const loginOutUserThuncCreator = ():thinkType => {
    return async (dispatch:Function) => {
        const logoutUserResponce:loginType = await authAPI.logoutUser()
        if (logoutUserResponce.resultCode === 0) {
            dispatch(deleteUserProfileData())
        }
    }
}