import styles from './Login.module.css'
import {Field, Form, Formik} from 'formik';
import {BazeInput} from "../../FormComponents/inputs/Inputs";
import {password, requiredInput} from "../../../utils/validators/validators";
import {useState} from 'react';
import loginSmile from '../../../images/loginSmile.png'
import showPass from '../../../images/showPass.svg'
import unShowPass from '../../../images/unShowPass.svg'
import handle from '../../../utils/hadnle'

const Login = (props) => {
    const [checkBox, setCheckBox] = useState(false)
    const handleCheckBox = () => {
        handle(checkBox, setCheckBox)
    }
    const [typeState, setTypeState] = useState('password')
    const isHidden = (typeState === 'password')

    const handlePasswort = () => {
        isHidden ? setTypeState('text') : setTypeState('password')
    }
    const handleBotSistem = () => {
        props.getCapcha()
    }
    const submit = (values) => {
        const currentValues = {
            email: values.email,
            password: values.password,
            checkBox: checkBox,
            captcha: values.captcha
        }
        props.handleSubmit(currentValues)
    }
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginHeader}>
                    <h1>Войдите в аккаунт</h1>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        rememberMe: false,
                        captcha: '',
                    }}
                    onSubmit={submit}>

                    <Form className={styles.loginForm}>
                        <div className={styles.loginName}>
                            <label className={styles.label}>Почта</label>
                            <Field name='email'
                                   type="text"
                                   placeholder="Введите почту"
                                   as={BazeInput}
                                   validate={[requiredInput]}/>
                        </div>
                        <div className={styles.loginPassword}>
                            <label className={styles.label}>Пароль</label>
                            <Field name='password'
                                   type={typeState}
                                   placeholder="Введите пароль"
                                   as={BazeInput}
                                   validate={[requiredInput, password]}/>
                            <button type='button' onClick={handlePasswort}>
                                {(isHidden)
                                    ?
                                    <img src={showPass} alt="Показать" className={styles.showPass}/>
                                    :
                                    <img src={unShowPass} alt="скрыть" className={styles.showPass}/>

                                }
                            </button>
                        </div>
                        <div className={styles.capcha}>
                            <label htmlFor="">Для входа подтвердите что вы не робот</label>
                            <button onClick={handleBotSistem} type='button'>Сгенерировать картину</button>

                            {(props.capchaUrl &&
                                <div>
                                    <img src={props.capchaUrl.url} alt="капча"/>
                                    <Field
                                        name='captcha'
                                        type='text'
                                        placeholder="Введите символы с картинки"
                                        as={BazeInput}
                                        validate={[requiredInput]}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.loginOut}>
                            <div className={styles.loginRememberMe}>
                                <label className={styles.label} htmlFor="remember">Запомнить меня</label>
                                <button onClick={handleCheckBox} type='button'>
                                    <div className={`${styles.checkBox} ${(checkBox && styles.checkBoxActive)}`}>
                                        <span className={`${styles.checkBoxKvadratik} ${(checkBox && styles.checkBoxKvadratikActive)}`}></span>
                                    </div>
                                </button>
                            </div>
                            <div className={styles.outBtn}>
                                <button type="submit">Войти</button>
                            </div>
                        </div>
                    </Form>
                </Formik>

            </div>
            <div className={styles.loginSmileContainer}>
                <img src={loginSmile} alt=""/>
            </div>
        </div>
    )
}
export default Login
