import { createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

let initialState = {
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
        setTotalIsFetching(state, action) {
            state.isFetching = action.payload;
        },
        setTotalCount(state, action) {
            state.totalUsersCount = action.payload;
        },
        toggleFollow(state, action) {
            const userId = action.payload;
            state.users = state.users.map((user) =>
                user.id === userId ? { ...user, followed: !user.followed } : user
            );
        },
        setUsers(state, action) {
            state.users = action.payload;
        },
        activePage(state, action) {
            state.currenPages = Number(action.payload);
        },
        setFollowingFetching(state, action) {
            const { isFetching, userId } = action.payload;
            if (isFetching) {
                state.followingFetching.push(userId);
            } else {
                state.followingFetching = state.followingFetching.filter(id => id !== userId);
            }
        },
        setPageNumberActive(state, action) {
            state.currenPages = action.payload;
        },
    },
});
export default usersReducer.reducer
export const {
    setTotalIsFetching,
    setTotalCount,
    toggleFollow, // Заменили follow и unFollow на toggleFollow
    setUsers,
    activePage,
    setFollowingFetching,
    setPageNumberActive,
} = usersReducer.actions;


export const getUsersThunkCreator = (currenPages, usersPages) => async (dispatch) => {
    dispatch(setTotalIsFetching(true));
    const getUsersResponce = await usersAPI.getUsers(currenPages, usersPages);
    dispatch(setUsers(getUsersResponce.items));
    dispatch(setTotalCount(getUsersResponce.totalCount));
    dispatch(setTotalIsFetching(false));
};
export const followUserThunkCreator = (userId, followAction) => async (dispatch) => {
    try {
        dispatch(setFollowingFetching({ isFetching: true, userId }));
        let response;
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
