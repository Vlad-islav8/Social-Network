import { createSelector } from "reselect"
import {RootState} from "../reduxStore";
export const getUsersPage = (state:RootState) => {
    return state.userPage
}
export const getUsers = createSelector([getUsersPage], (userPage) => {
    return (
        userPage.users
    )
})
export const getTotalUsersCount = createSelector([getUsersPage], (userPage) => {
    return (
        userPage.totalUsersCount
    )
})
export const getUsersPages = createSelector([getUsersPage], (userPage) => {
    return (
        userPage.usersPages
    )
})
export const getCurrenPages = createSelector([getUsersPage], (userPage) => {
    return (
        userPage.currenPages
    )
})
export const getIsFetching = createSelector([getUsersPage], (userPage) => {
    return (
        userPage.isFetching
    )
})
export const getFolowingFetching = createSelector([getUsersPage], (userPage) => {
    return (
        userPage.followingFetching
    )
})

