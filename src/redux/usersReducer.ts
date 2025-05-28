import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";
import {UserPhotos} from "./profileReducer";
export interface ResponceType  {
    resultCode: number
    messages: string[],
    data: {}
}
interface UserType {
    name: string,
    id: number,
    uniqueUrlName: null | string,
    photos: UserPhotos | []
    status: null | string,
    followed: boolean
}
interface UsersType {
    items: UserType[]
    totalCount: number
    error: null | string
}
export interface UsersStateType {
    users: UserType[]
    usersPages: number
    totalUsersCount: number
    currenPages: number
    isFetching: boolean
    followingFetching: number[]
}
let initialState:UsersStateType = {
    users: [],
    usersPages: 100,
    totalUsersCount: 14,
    currenPages: Number(1),
    isFetching: false,
    followingFetching: [],
};

const usersReducer = createSlice({
    name: 'usersReducer',
    initialState,
    reducers: {
        setTotalIsFetching(state, action:PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        setTotalCount(state, action:PayloadAction<number>) {
            state.totalUsersCount = action.payload;
        },
        toggleFollow(state, action:PayloadAction<number>) {
            const userId:number = action.payload;
            const user = state.users.find(user => user.id === userId)
            if (user) {
                user.followed = !user.followed;
            }
        },
        setUsers(state, action:PayloadAction<UsersType>) {
            state.users = action.payload.items;
        },
        activePage(state, action:PayloadAction<number>) {
            state.currenPages = Number(action.payload);
        },
        setFollowingFetching(state, action:PayloadAction<{isFetching:boolean, userId:number}>) {
            const { isFetching, userId } = action.payload;
            if (isFetching) {
                state.followingFetching.push(userId);
            } else {
                state.followingFetching = state.followingFetching.filter(id => id !== userId);
            }
        },
        setPageNumberActive(state, action:PayloadAction<number>) {
            state.currenPages = action.payload;
        },
    },
});
export default usersReducer.reducer
export const {
    setTotalIsFetching,
    setTotalCount,
    toggleFollow,
    setUsers,
    activePage,
    setFollowingFetching,
    setPageNumberActive,
} = usersReducer.actions;


export const getUsersThunkCreator = (currenPages:number, usersPages:number) => async (dispatch:Function) => {
    dispatch(setTotalIsFetching(true));
    const getUsersResponce:UsersType = await usersAPI.getUsers(currenPages, usersPages);
    if(getUsersResponce.items) {
        dispatch(setUsers(getUsersResponce));
        dispatch(setTotalCount(getUsersResponce.totalCount));
        dispatch(setTotalIsFetching(false));
    }
};
export const followUserThunkCreator = (userId:number, followAction:string) => async (dispatch:Function) => {
    try {
        dispatch(setFollowingFetching({ isFetching: true, userId }));

        let response:ResponceType;

        if (followAction === 'follow') {
            response = await usersAPI.followUser(userId);
        } else if (followAction === 'unFollow') {
            response = await usersAPI.unFollowUser(userId);
        } else {
            console.log('Неизвестный action: ' + followAction);
            dispatch(setFollowingFetching({ isFetching: false, userId }));
            return;
        }

        if (response.resultCode === 0) {
            dispatch(toggleFollow(userId)); 
        }

        dispatch(setFollowingFetching({ isFetching: false, userId }));

    } catch (error) {
        console.error("Error following/unfollowing user:", error);
        dispatch(setFollowingFetching({ isFetching: false, userId }));
    }
};
