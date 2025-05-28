import { createSelector } from "reselect"
import {RootState} from "../reduxStore";
import {DialogsStateType} from "../dialogsReducer";

export const getDialogs = (state:RootState) => {
    return state.dialogs
}

export const getDialogUsers = createSelector([getDialogs], 
    dialogs => dialogs.users
)

export const getActiveUser = createSelector([getDialogs], 
    dialogs => dialogs.activeUser
)
