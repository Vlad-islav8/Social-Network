import {connect} from "react-redux";
import {compose} from "redux";
import {isMe} from "../../../Hok/isMe";
import {getCapchaUrlThunkCreator, loginUserThuncCreator} from "../../../redux/authReducer";
import Preloader from "../../Preloader/Preloader";
import {useNavigate} from "react-router-dom";
import {getCapchaUrl, getErrorMessage, getIsAuth, getIsLoading} from "../../../redux/selectors/isAuthSelector";
import LoginForm from "./Login";
import React, {memo, useCallback, useEffect} from "react"; // Переименуем компонент

const LoginContainer = (props) => {
    const navigate = useNavigate();
    const getCapcha = useCallback(() => {
        props.getCapchaUrlThunkCreator();
    }, [props.getCapchaUrlThunkCreator]);
    const handleSubmit = useCallback((values) => {
        debugger
        props.loginUserThuncCreator(
            values.email,
            values.password,
            values.rememberMe,
            values.captcha,
        );

    }, [props.loginUserThunkCreator])
    useEffect(() => {
        if (props.isAuth) {
            navigate('/');
        }
    }, [props.isAuth, navigate])
    if (props.isLoading) {
        return <Preloader />;
    }



    return (
            <LoginForm {...props} getCapcha={getCapcha} handleSubmit={handleSubmit}/>
    );
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    isLoading: getIsLoading(state),
    errorMessage: getErrorMessage(state),
    capchaUrl: getCapchaUrl(state)
});

const mapDispatchToProps = {
    loginUserThuncCreator,
    getCapchaUrlThunkCreator
};

export default compose(
    isMe,
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);