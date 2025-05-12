import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {
    let mapStateToProps = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth === false) {
                return <Navigate to={'/login'}/>
            }
            return <Component {...this.props} />
        }
    }
    let ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectRedirectComponent
}

