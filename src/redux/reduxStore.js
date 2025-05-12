import { dialogsReducer } from "./dialogsReducer";
import  usersReducer  from "./usersReducer";
import  authReducer  from "./authReducer";
import { reducer as ReduxForm } from 'redux-form'
import  appReducer  from "./appReducer";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer";


let store = configureStore({
    reducer: {
        profile: profileReducer,
        dialogs: dialogsReducer,
        userPage: usersReducer,
        auth: authReducer,
        form: ReduxForm,
        app: appReducer,
    }
})

window.store = store
export default store