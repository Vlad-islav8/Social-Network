import { createSelector } from "reselect"
export const getUsers = (state) => {
    return (
        state.userPage.users
    )
}
export const getTotalUsersCount = (state) => {
    return (
        state.userPage.totalUsersCount
    )
}

export const getUsersPages =  (state) => {
    return (
        state.userPage.usersPages
    )
}

export const getCurrenPages = (state) => {
    return (
        state.userPage.currenPages
    )
}
export const getIsFetching = (state) => {
    return (
        state.userPage.isFetching
    )
}
export const getFolowingFetching = (state) => {
    return (
        state.userPage.followingFetching
    )
}
