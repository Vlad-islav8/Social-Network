import { createSelector } from "reselect";

export const getProfile = (state) => {
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

export const getUpdateAvaIsFetching = (state) => {
    return state.profile.updateAvaIsFetching
}

export const getPutFetching = createSelector([getProfile],
    (profile) => {
        return profile.putFetching
    }
)