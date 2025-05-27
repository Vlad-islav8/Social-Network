import { configureStore } from "@reduxjs/toolkit";

import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        dialogs: dialogsReducer,
        userPage: usersReducer,
        auth: authReducer,
        app: appReducer,
    },
});


export default store;

