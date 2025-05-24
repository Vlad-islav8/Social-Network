import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI, usersAPI} from "../api/api";

export interface postsType  {
    id: number,
    text: string,
}
export interface photosType  {
    small: string,
    large: string
}
export interface profileType {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: photosType

}
interface initialStateType {
    posts: postsType[]
    profile: profileType,
    profileStatus: string | null,
    updateAvaIsFetching: boolean,
    error: string,
    putFetching: boolean,
    isFollowered: boolean | null
}
interface thinkType  {(dispatch:Function): Promise<void>}

interface responceType {
    resultCode: number
    messages: []
    data: {}
}
interface responceTypePhotos {
    resultCode: number
    messages: []
    data: {
        small: string
        large: string
    }
}

let initialState: initialStateType = {
    posts: [],
    profile: null,
    profileStatus: "Дефолт статус",
    updateAvaIsFetching: false,
    error: null,
    putFetching: false,
    isFollowered: null
}


const profileReducer = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        onAddPost(state:initialStateType, action:PayloadAction<string>) {
            const newPost: postsType = {
                id: Number(nanoid()),
                text: action.payload,
            }
            state.posts.push(newPost)
        },
        setUsersProfile(state:initialStateType, action:PayloadAction<profileType>):void {
            state.profile = action.payload
        },
        setProfileStatus(state:initialStateType, action:PayloadAction<string>):void {
            state.profileStatus = action.payload
        },
        setProfilePhoto(state:initialStateType, action:PayloadAction<photosType>):void {
            const small: string = action.payload.small
            const large: string = action.payload.large
            if (small) {
                state.profile.photos.small = small
            } else if (large) {
                state.profile.photos.large = large
            }
        },
        setUpdateAvaISFetching(state:initialStateType, action:PayloadAction<boolean>):void {
            state.updateAvaIsFetching = action.payload
        },
        setPutFetching(state:initialStateType, action:PayloadAction<boolean>):void {
            state.putFetching = action.payload
        },
        setToogleFollow(state:initialStateType, action:PayloadAction<boolean>):void {
            state.isFollowered = action.payload
        }
    }
})

export const {
    onAddPost,
    setUsersProfile,
    setProfileStatus,
    setProfilePhoto,
    setUpdateAvaISFetching,
    setPutFetching,
    setToogleFollow,
} = profileReducer.actions

export default profileReducer.reducer

export const followUserThunkCreator = (userId:number, followAction:string):thinkType => {
    return async (dispatch:Function):Promise<void> => {
        if (followAction === "follow") {
            const responce:responceType = await usersAPI.followUser(userId)
            if (responce.resultCode === 0) {
                dispatch(setToogleFollow(true))
            }
        } else if (followAction === 'unFollow') {
            const responce:responceType = await usersAPI.unFollowUser(userId)
            if (responce.resultCode === 0) {
                dispatch(setToogleFollow(false))
            }
        }
    }
}
export const putProfileDataThuncCreator = (data:profileType):(dispatch:Function) => Promise<responceType> => {
    return async (dispatch:Function) => {
        try {
            dispatch(setPutFetching(true));
            const response:responceType = await profileAPI.putProfileData(data);
            return response
        } finally {
            dispatch(setPutFetching(false));
        }
    };
};
export const addAvatarThuckCreator = (avatar: string):thinkType => {
    return async (dispatch:Function) => {
        dispatch(setUpdateAvaISFetching(true))
        const responce:responceTypePhotos = await profileAPI.addAvatar(avatar)
        dispatch(setProfilePhoto(responce.data))
        dispatch(setUpdateAvaISFetching(false))
    }
}
export const getUserProfileThunkCreator = (userId:number) => {
    return async (dispatch:Function) => {
        const responce:profileType = await profileAPI.getUserProfile(userId)
        const followResponce:boolean = await profileAPI.getFollowUser(userId)
        if (responce) {
            dispatch(setUsersProfile(responce))
            dispatch(setProfilePhoto(responce.photos))
            return responce
        }
        dispatch(setToogleFollow(followResponce))
    }
}
export const getStatusThunkCreator = (userId:number):thinkType => {
    return async (dispatch:Function) => {
        const profileStatusResponce:string = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(profileStatusResponce))
    }
}
export const updateStatusThuncCreator = (status:string):thinkType => {
    return async (dispatch:Function) => {
        const updateProfileStatusResponce:string = await profileAPI.updateProfileStatus(status)
        dispatch(setProfileStatus(updateProfileStatusResponce))
    }
}