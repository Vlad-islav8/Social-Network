import {RootState} from "../reduxStore";

export const getInitialize = (state:RootState) => {
    return state.app.initialize
}
