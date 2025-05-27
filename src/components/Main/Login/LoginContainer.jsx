import { Formik } from 'formik';
import { connect } from "react-redux";
import { compose } from "redux";
import { isMe } from "../../../Hok/isMe";
import { getCapchaUrlThunkCreator, loginUserThuncCreator } from "../../../redux/authReducer";
import Preloader from "../../Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import { getCapchaUrl, getErrorMessage, getIsAuth, getIsLoading } from "../../../redux/selectors/isAuthSelector";
import LoginForm from "./Login"; // Переименуем компонент

const LoginContainer = (props) => {
    const navigate = useNavigate();

    if (props.isLoading) {
        return <Preloader/>;
    } else if (props.isAuth) {
        navigate('/');
    }

    const getCapcha = () => {
        props.getCapchaUrlThunkCreator();
    };

    // Обработчик submit для Formik
    const handleSubmit = (values, { setSubmitting }) => {
        props.loginUserThuncCreator(
            values.email,
            values.password,
            values.rememberMe,
            values.captcha,
            setSubmitting
        );
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: '',
            }}
            onSubmit={handleSubmit}
        >
            {(formikProps) => (
                <LoginForm
                    {...formikProps}
                    {...props}
                    getCapcha={getCapcha}
                />
            )}
        </Formik>
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