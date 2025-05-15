import { createSlice, nanoid } from "@reduxjs/toolkit";
import { profileAPI } from "../api/api";
let initialState = {
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

}

const profileReducer = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        onAddPost(state, action) {
            state.posts.push({ 
                id: nanoid(), 
                title: '',
                text: action.payload,
                url: 'https://i.pinimg.com/originals/56/c7/5d/56c75d13636b5830b34385f6df90ca43.jpg',
                likesCount: 0,
                comments: 0,
                name: state.profile ? state.profile.fullName : 'Автор'
            });
        },
        setUsersProfile(state, action) {
            state.profile = action.payload
        },
        setProfileStatus(state, action) {
            state.profileStatus = action.payload
        },
        setProfilePhoto(state, action) {
            const small = action.payload.small
            const large = action.payload.large
            if(state.profile) {
                state.profile.photos.small = small
            }
        },
        setUpdateAvaISFetching(state, action) {
            state.updateAvaIsFetching = action.payload
        },
        setPutFetching(state, action) {
            state.putFetching = action.payload
        }
    }
})

export const {onAddPost, setUsersProfile, setProfileStatus, setProfilePhoto, setUpdateAvaISFetching, setPutFetching} = profileReducer.actions
export default profileReducer.reducer

export const putProfileDataThuncCreator = (data) => {
    return async (dispatch) => {
        dispatch(setPutFetching(true))
        const responce = await profileAPI.putProfileData(data)
        if(responce.resultCode === 0) {
            dispatch(setPutFetching(false))
        }
    }
}

export const addAvatarThuckCreator = (avatar) => {
    return async (dispatch) => {
        dispatch(setUpdateAvaISFetching(true))
        const responce = await profileAPI.addAvatar(avatar)
        if(responce.resultCode === 0) {
            dispatch(setProfilePhoto(responce))
            dispatch(setUpdateAvaISFetching(false))
        }
    }
}

export const getUserProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        const responce = await profileAPI.getUserProfile(userId)
            dispatch(setUsersProfile(responce))
            dispatch(setProfilePhoto(responce.photos))
    }
}

export const getUserProfileThunkCreatorу = (userId) => {
    return async (dispatch) => {
        const getProfileResponce = await profileAPI.getUserProfile(userId)
        dispatch(setUsersProfile(getProfileResponce))
    }
}

export const getStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        const profileStatusResponce = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(profileStatusResponce))
    }
}

export const updateStatusThuncCreator = (status) => {
    return async (dispatch) => {
        const updateProfileStatusResponce = await profileAPI.updateProfileStatus(status)
        dispatch(setProfileStatus(updateProfileStatusResponce))
    }
}