import { Link, NavLink } from "react-router-dom";
import styles from './LoginButton.module.css'
import React, { useState } from "react";

const Pomogite = (props) => {
    const active = (props.activeLoginBlock)
    return (
        <div className={`${styles.Pomogite} ${(active) ? styles.active : null}`}>
            {(props.isLogin && <button onClick={props.combineCallBacks} disabled={(!active)}>Выйти</button>)}
        </div>
    )
}

export const LoginButton = (props) => {
    const [activeLoginBlock, setActiveLoginBlock] = useState(false)
    const isLogin = props.isAuth && props.profile
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
                        <div className={styles.profileData}>
                            {
                                (props.profile.profile.photos.small) ?
                                    <Link to='/profile'>
                                        <img src={props.profile.profile.photos.small} className={styles.headerAvatar} alt="Аватар" />
                                    </Link> :
                                    null
                            }
                            <button onClick={handleActive}>
                                <p>{props.profile.profile.fullName}</p>
                            </button>

                        </div>
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