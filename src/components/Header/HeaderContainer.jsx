import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserThunkCreator, loginOutUserThuncCreator,} from "../../redux/authReducer";


class HeaderContainer extends React.Component {
    componentDidMount = () => {
        this.props.getAuthUserThunkCreator()
    }
    render = () => {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userData: state.auth.userData,
})

const mapStateToDispatch = {
    getAuthUserThunkCreator: getAuthUserThunkCreator,
    loginOut: loginOutUserThuncCreator
}
export default connect(mapStateToProps, mapStateToDispatch)(HeaderContainer)