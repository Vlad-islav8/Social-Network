import { createSelector } from "reselect"

export const getDialogs = (state) => {
    return state.dialogs
}

export const getDialogUsers = createSelector([getDialogs], 
    dialogs => dialogs.users
)

export const getActiveUser = createSelector([getDialogs], 
    dialogs => dialogs.activeUser
)
