import LoginReduxForm from "./Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {isMe} from "../../../Hok/isMe";
import {loginUserThuncCreator} from "../../../redux/authReducer";
import Preloader from "../../Preloader/Preloader";
import {reduxForm} from "redux-form";
import {useNavigate} from "react-router-dom";

const LoginContainer = (props) => {
    const redirect = useNavigate()
    if (props.isLoading) {
        return <Preloader/>
    } else if (props.isAuth) {
        redirect('/')
    }
    return (
        <LoginReduxForm {...props}/>
    )
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isLoading: state.auth.isLoading,
        errorMessage: state.auth.errorMessage,
    }
}

const mapDispatchToProps = {
        loginUserThuncCreator: loginUserThuncCreator,
}
export default compose(
    isMe,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'login'
    })
)(LoginContainer)