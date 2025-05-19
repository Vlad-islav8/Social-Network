import LoginReduxForm from "./Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {isMe} from "../../../Hok/isMe";
import {getCapchaUrlThunkCreator, loginUserThuncCreator} from "../../../redux/authReducer";
import Preloader from "../../Preloader/Preloader";
import {reduxForm} from "redux-form";
import {useNavigate} from "react-router-dom";
import {getCapchaUrl, getErrorMessage, getIsAuth, getIsLoading} from "../../../redux/selectors/isAuthSelector";

const LoginContainer = (props) => {
    const redirect = useNavigate()
    if (props.isLoading) {
        return <Preloader/>
    } else if (props.isAuth) {
        redirect('/')
    }
    const getCapcha = () => {
        props.getCapchaUrlThunkCreator()
    }
    return (
        <LoginReduxForm {...props} getCapcha={getCapcha}/>
    )
}
const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        isLoading: getIsLoading(state),
        errorMessage: getErrorMessage(state),
        capchaUrl: getCapchaUrl(state)
    }
}

const mapDispatchToProps = {
        loginUserThuncCreator,
        getCapchaUrlThunkCreator
}
export default compose(
    isMe,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'login'
    })
)(LoginContainer)