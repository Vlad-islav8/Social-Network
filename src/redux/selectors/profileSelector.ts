import { createSelector } from "reselect";
import {RootState} from "../reduxStore";

export const getProfile = (state:RootState) => {
    return state.profile
}

export const getPosts = createSelector([getProfile], 
    (profile) => {
        return profile.posts
    }
)

export const getProfileStatus = createSelector([getProfile], 
    (profile) => {
        return profile.profileStatus
    }
)

export const getProfileId = createSelector([getProfile], 
    (profile) => {
        return profile.profile?.userId
    }
)

export const getUpdateAvaIsFetching = (state:RootState) => {
    return state.profile.updateAvaIsFetching
}

export const getPutFetching = createSelector([getProfile],
    (profile) => {
        return profile.putFetching
    }
)

export const getIsFollowered = createSelector([getProfile],
    (profile) => {
        return profile.isFollowered
    })