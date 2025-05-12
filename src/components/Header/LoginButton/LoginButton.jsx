import { Link, NavLink } from "react-router-dom";
import styles from './LoginButton.module.css'
import React, { useState } from "react";

const Pomogite = (props) => {
    return (
        <div className={`${styles.Pomogite} ${(props.activeLoginBlock) ? styles.active : null}`}>
            {
                (props.isLogin)
                    ?
                    <button onClick={props.combineCallBacks} >Выйти</button>
                    :
                    undefined
            }
        </div>
    )
}

export const LoginButton = (props) => {
    const [activeLoginBlock, setActiveLoginBlock] = useState(false)
    const isLogin = props.isAuth && props.userData
    const handleActive = () => {
        (activeLoginBlock) ? setActiveLoginBlock(false) : setActiveLoginBlock(true)
    }

    const handleReset = () => {
        setActiveLoginBlock(false)
    }

    const combineCallBacks = () => {
        props.loginOut()
        handleReset()
    }
    return (
        <div className={styles.LoginButtonBlock}>
            <div className={styles.loginBtn} >
                {
                    (isLogin)
                        ?
                        <button onClick={handleActive} className={styles.profileData}>
                            <p>{props.userData.fullName}</p>
                            {
                                (props.userData.photos.small) ?
                                    <img src={props.userData.photos.small} alt="" /> :
                                    null
                            }
                        </button>
                        :
                        <div className={styles.LoginOut}>
                            <NavLink to='/login'>Войти в аккаут</NavLink>
                        </div>

                }
            </div>
            <Pomogite isLogin={isLogin} activeLoginBlock={activeLoginBlock} combineCallBacks={combineCallBacks}/>
        </div>
    )
}