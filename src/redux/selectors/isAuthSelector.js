import {createSelector} from "reselect";

export const getAuth = (state) => {
    return state.auth
}
export const getIsAuth = createSelector([getAuth],
    (auth) => {
        return auth.isAuth
    }
)


export const getMeId = createSelector([getAuth],
    (auth) => {
        return auth.id
    }
)


export const getIsLoading = createSelector([getAuth],
    (auth) => {
        return auth.isLoading
    }
)
export const getErrorMessage = createSelector([getAuth],
    (auth) => {
        return auth.errorMessage
    }
)

export const getCapchaUrl = createSelector([getAuth],
    (auth) => {
        return auth.capchaUrl
    }
)