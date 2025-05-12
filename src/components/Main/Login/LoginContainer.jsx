import Login from "./Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {isMe} from "../../../Hok/isMe";
import {loginUserThuncCreator} from "../../../redux/authReducer";
import Preloader from "../../Preloader/Preloader";

const LoginContainer = (props) => {
    if (props.isLoading) {
        return <Preloader/>
    } else if (props.isAuth) {
        return <div>Вы вошли в аккаунт</div>
    }
    return (
        <Login {...props}/>
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
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer)