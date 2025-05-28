import {combineReducers, configureStore} from "@reduxjs/toolkit";

import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    userPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})
const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;

