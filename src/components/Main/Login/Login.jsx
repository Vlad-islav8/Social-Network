import styles from './Login.module.css'
import { BazeInput } from "../../FormComponents/inputs/Inputs";
import { password, requiredInput } from "../../../utils/validators/validators";
import { useState } from 'react';
import loginSmile from '../../../images/loginSmile.png'
import showPass from '../../../images/showPass.svg'
import unShowPass from '../../../images/unShowPass.svg'
import { Field, Form, ErrorMessage } from 'formik';

const LoginForm = (props) => {
    const [typeState, setTypeState] = useState('password');
    const [rememberMe, setRememberMe] = useState(false);

    const handlePasswordVisibility = () => {
        setTypeState(prev => prev === 'password' ? 'text' : 'password');
    };

    const handleRememberMe = () => {
        setRememberMe(prev => !prev);
        props.setFieldValue('rememberMe', !rememberMe);
    };

    const handleCapchaRefresh = () => {
        props.getCapcha();
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginHeader}>
                    <h1>Войдите в аккаунт</h1>
                </div>

                <Form>
                    <div className={styles.loginName}>
                        <label className={styles.label}>Почта</label>
                        <Field
                            name='email'
                            type="text"
                            placeholder="Введите почту"
                            as={BazeInput}
                            validate={requiredInput}
                        />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div className={styles.loginPassword}>
                        <label className={styles.label}>Пароль</label>
                        <Field
                            name='password'
                            type={typeState}
                            placeholder="Введите пароль"
                            as={BazeInput}
                            validate={value => {
                                const requiredError = requiredInput(value);
                                if (requiredError) return requiredError;
                                return password(value);
                            }}
                        />
                        <button
                            type='button'
                            onClick={handlePasswordVisibility}
                        >
                            <img
                                src={typeState === 'password' ? showPass : unShowPass}
                                alt={typeState === 'password' ? "Показать" : "Скрыть"}
                                className={styles.showPass}
                            />
                        </button>
                        <ErrorMessage name="password" component="div" />
                    </div>

                    {props.capchaUrl && (
                        <div className={styles.capcha}>
                            <label>Для входа подтвердите что вы не робот</label>
                            <button
                                onClick={handleCapchaRefresh}
                                type='button'
                            >
                                Сгенерировать картину
                            </button>
                            <div>
                                <img src={props.capchaUrl.url} alt="капча"/>
                                <Field
                                    name='captcha'
                                    type='text'
                                    placeholder="Введите символы с картинки"
                                    as={BazeInput}
                                    validate={requiredInput}
                                />
                                <ErrorMessage name="captcha" component="div" />
                            </div>
                        </div>
                    )}

                    <div className={styles.loginOut}>
                        <div className={styles.loginRememberMe}>
                            <label className={styles.label} htmlFor="remember">
                                Запомнить меня
                            </label>
                            <button
                                type='button'
                                onClick={handleRememberMe}
                            >
                                <div className={`${styles.checkBox} ${rememberMe && styles.checkBoxActive}`}>
                                    <span className={`${styles.checkBoxKvadratik} ${rememberMe && styles.checkBoxKvadratikActive}`}></span>
                                </div>
                            </button>
                        </div>

                        <div className={styles.outBtn}>
                            <button
                                type="submit"
                                disabled={props.isSubmitting}
                            >
                                {props.isSubmitting ? 'Вход...' : 'Войти'}
                            </button>
                        </div>
                    </div>

                    {props.errorMessage && (
                        <div className={styles.errorMessage}>
                            {props.errorMessage}
                        </div>
                    )}
                </Form>
            </div>

            <div className={styles.loginSmileContainer}>
                <img src={loginSmile} alt=""/>
            </div>
        </div>
    );
};

export default LoginForm;