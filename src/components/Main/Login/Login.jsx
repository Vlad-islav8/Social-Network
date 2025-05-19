import styles from './Login.module.css'
import {Field,} from 'redux-form';
import {email} from "redux-form-validators";
import {BazeInput} from "../../FormComponents/inputs/Inputs";
import {password, requiredInput} from "../../../utils/validators/validators";
import {useState} from 'react';
import loginSmile from '../../../images/loginSmile.png'
import showPass from '../../../images/showPass.svg'
import unShowPass from '../../../images/unShowPass.svg'
import handle from '../../../utils/hadnle'

const LoginReduxForm = (props) => {
    const [checkBox, setCheckBox] = useState(false)

    const handleCheckBox = () => {
        handle(checkBox, setCheckBox)
    }
    const submit = ({email, password, capcha}) => {
        props.loginUserThuncCreator(email, password, checkBox, capcha)
    }
    const [typeState, setTypeState] = useState('password')
    const isHidden = (typeState === 'password')

    const handlePasswort = () => {
        isHidden ? setTypeState('text') : setTypeState('password')
    }
    const handleBotSistem = () => {
        props.getCapcha()
    }
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginFormContainer}>
                <div className={styles.loginHeader}>
                    <h1 >Войдите в аккаунт</h1>
                </div>
                <form className={styles.loginForm} onSubmit={props.handleSubmit(submit)}>
                    <div className={styles.loginName}>
                        <label className={styles.label}>Почта</label>
                        <Field name='email'
                               type="text"
                               placeholder="Введите почту"
                               errorMessage={props.errorMessage}
                               component={BazeInput} validate={[requiredInput, email()]}/>
                    </div>
                    <div className={styles.loginPassword}>
                        <label className={styles.label}>Пароль</label>
                        <Field name='password' type={typeState} placeholder="Введите пароль"
                               errorMessage={props.errorMessage} component={BazeInput}
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
                                    <Field name='capcha' type='text' placeholder="Введите символы с картинки"
                                           errorMessage={props.errorMessage} component={BazeInput}
                                           validate={[requiredInput]}/>
                                </div>
                        )}
                    </div>
                    <div className={styles.loginOut}>
                        <div className={styles.loginRememberMe}>
                            <label className={styles.label} htmlFor="remember">Запомнить меня</label>
                            <button onClick={handleCheckBox} type='button'>
                                <div className={`${styles.checkBox} ${(checkBox && styles.checkBoxActive)}`}>
                                    <span className={`${styles.checkBoxKvadratik} ${(checkBox && styles.checkBoxKvadratikActive)}`} ></span>
                                </div>
                            </button>
                        </div>
                        <div className={styles.outBtn}>
                            <button type="submit">Войти</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={styles.loginSmileContainer}>
                <img src={loginSmile} alt=""/>
            </div>
        </div>
    )
}
export default  LoginReduxForm
