import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {LoginButton} from "./LoginButton/LoginButton";
import Preloader from "../Preloader/Preloader";
import Nav from "../Main/Nav/Nav";
import React from "react";
function Header(props) {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Link to='/'><h1>My social network</h1></Link>
                {
                    (
                        props.navPosition === 'top' &&
                        <Nav
                            navPosition={props.navPosition}
                            handleNavPsoition={props.handleNavPsoition}
                        />
                    )
                }

            </div>

            {
                (props.profile.profile)
                    ?
                    <LoginButton profile={props.profile} isAuth={props.isAuth} loginOut={props.loginOut}/>
                    :
                    <span>Войдите в аккаунт</span>
            }
        </header>
    )
}

export default Header;