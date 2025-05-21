import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI, usersAPI} from "../api/api";
export type postsType  = {
    id: number,
    title: string,
    text: string,
    url: string,
    likesCount: number,
    comments: number,
    name: string,
}
export type photosType = {
    small: string,
    large: string
}
export type profileType = {
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
type initialStateType = {
    posts: postsType[]
    profile: profileType,
    profileStatus: string | null,
    updateAvaIsFetching: boolean,
    AboutMe: string,
    error: string,
    putFetching: boolean,
    isFollowered: boolean | null
}

let initialState: initialStateType = {
    posts: [
        {
            id: 0,
            title: 'Мой пост',
            text: 'Это мой текст',
            url: 'https://i.pinimg.com/originals/56/c7/5d/56c75d13636b5830b34385f6df90ca43.jpg',
            likesCount: 0,
            comments: 0,
            name: 'Автор'
        },
    ],
    profile: null,
    profileStatus: "Дефолт статус",
    updateAvaIsFetching: false,
    AboutMe: 'Статус отсутсвует',
    error: null,
    putFetching: false,
    isFollowered: null
}


const profileReducer = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        onAddPost(state, action: PayloadAction<string>) {
            const newPost: postsType = {
                    id: Number(nanoid()),
                    title: '',
                    text: action.payload,
                    url: 'https://i.pinimg.com/originals/56/c7/5d/56c75d13636b5830b34385f6df90ca43.jpg',
                    likesCount: 0,
                    comments: 0,
                    name: state.profile ? state.profile.fullName : 'Автор'
            }
            state.posts.push(newPost)

        },
        setUsersProfile(state, action: PayloadAction<profileType> ) {
            state.profile = action.payload
        },
        setProfileStatus(state, action: PayloadAction<string>) {
            state.profileStatus = action.payload
        },
        setProfilePhoto(state, action: PayloadAction<photosType>) {
            const small = action.payload.small
            const large = action.payload.large
            if(state.profile) {
                if(small) {
                    state.profile.photos.small = small
                } else if(large) {
                    state.profile.photos.large = large
                }
            }
        },
        setUpdateAvaISFetching(state, action: PayloadAction<boolean>) {
            state.updateAvaIsFetching = action.payload
        },
        setPutFetching(state, action: PayloadAction<boolean>) {
            state.putFetching = action.payload
        },
        setToogleFollow(state, action: PayloadAction<boolean>) {
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

export const followUserThunkCreator = (userId:any, followAction:any) => {
    return async (dispatch:any) => {
        if(followAction === "follow") {
            const responce = await usersAPI.followUser(userId)
            if(responce.resultCode === 0) {
                dispatch(setToogleFollow(true))
            }
        } else if(followAction === 'unFollow') {
            const responce = await usersAPI.unFollowUser(userId)
            if(responce.resultCode === 0) {
                dispatch(setToogleFollow(false))
            }
        }
    }
}
export const putProfileDataThuncCreator = (data:any) => {
    return async (dispatch:any) => {
        try {
            dispatch(setPutFetching(true));
            const response = await profileAPI.putProfileData(data);
            return response
        }  finally {
            dispatch(setPutFetching(false));
        }
    };
};
export const addAvatarThuckCreator = (avatar:any) => {
    return async (dispatch:any) => {
        dispatch(setUpdateAvaISFetching(true))
        const responce = await profileAPI.addAvatar(avatar)
            dispatch(setProfilePhoto(responce))
            dispatch(setUpdateAvaISFetching(false))
    }
}
export const getUserProfileThunkCreator = (userId:any) => {
    return async (dispatch:any) => {
        const responce = await profileAPI.getUserProfile(userId)
        const followResponce = await profileAPI.getFollowUser(userId)
        if(responce) {
            dispatch(setUsersProfile(responce))
            dispatch(setProfilePhoto(responce.photos))
        }
        dispatch(setToogleFollow(followResponce))
    }
}
export const getStatusThunkCreator = (userId:any) => {
    return async (dispatch:any) => {
        const profileStatusResponce = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(profileStatusResponce))
    }
}
export const updateStatusThuncCreator = (status:any) => {
    return async (dispatch:any) => {
        const updateProfileStatusResponce = await profileAPI.updateProfileStatus(status)
        dispatch(setProfileStatus(updateProfileStatusResponce))
    }
}