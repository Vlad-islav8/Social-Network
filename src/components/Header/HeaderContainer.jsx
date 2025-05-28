import React, {useEffect} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserThunkCreator, loginOutUserThuncCreator,} from "../../redux/authReducer";
import {getUserProfileThunkCreator} from "../../redux/profileReducer";
import {getProfile} from "../../redux/selectors/profileSelector";

const HeaderContainer = (props) => {
    useEffect(() => {
        props.getAuthUserThunkCreator()
    },[])


    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.id,
    profile: getProfile(state),
})

const mapStateToDispatch = {
    getAuthUserThunkCreator: getAuthUserThunkCreator,
    loginOut: loginOutUserThuncCreator,
    getUserProfileThunkCreator: getUserProfileThunkCreator
}
export default connect(mapStateToProps, mapStateToDispatch)(HeaderContainer)