import styles from './Login.module.css'
import { Field, reduxForm } from 'redux-form';
import {email } from "redux-form-validators";
import {BazeInput} from "../../FormComponents/inputs/Inputs";
import {password, requiredInput} from "../../../utils/validators/validators";
import { useState } from 'react';

const LoginForm = (props) => {
    const submit = ({email, password, rememberMe}) => {
        props.loginUserThuncCreator(email, password, rememberMe)
    }
    const [typeState, setTypeState] = useState('password')
    const isHidden = (typeState === 'password') 

    const handlePasswort = () => {
        isHidden ? setTypeState('text') : setTypeState('password')
    }
    return (
        <form className={styles.loginForm} onSubmit={props.handleSubmit(submit)}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginName}>
                    <label>Почта</label>
                    <Field name='email' type="text" placeholder="Введите почту" errorMessage={props.errorMessage} component={BazeInput} validate={[requiredInput, email()]}/>
                </div>
                <div className={styles.loginPassword}>
                    <label>Пароль</label>
                    <Field name='password' type={typeState} placeholder="Введите пароль" errorMessage={props.errorMessage} component={BazeInput} validate={[requiredInput, password]}/>
                    <button type='button' onClick={handlePasswort}>
                        {(isHidden) ? 'Показать пароль' : 'Скрыть пароль'}
                    </button>
                </div>
                <div className={styles.loginOut}>
                    <div className={styles.loginRememberMe}>
                        <Field name='rememberMe' type="checkbox" id="remember" component={BazeInput}/>
                        <label htmlFor="remember">Запомнить меня</label>
                    </div>
                    <div className={styles.outBtn}>
                        <button type="submit">Войти</button>
                    </div>
                </div>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    return (
        <div className={styles.loginBlock}>
            <h1 className={styles.loginHeader}>Войдите в аккаунт</h1>
            <LoginReduxForm loginUserThuncCreator={props.loginUserThuncCreator} errorMessage={props.errorMessage}/>
        </div>
    )
}

export default Login