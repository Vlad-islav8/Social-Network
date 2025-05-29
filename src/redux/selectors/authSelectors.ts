import {RootState} from "../reduxStore";
import {createSelector} from "reselect";

export const getAuth = (state:RootState) => {
    return state.auth
}

export const getIsAuth = createSelector([getAuth],
    auth => auth.isAuth
)
export const getLogin = createSelector([getAuth],
    auth => auth.login
)
export const getUserId = createSelector([getAuth],
    auth => auth.id
)
