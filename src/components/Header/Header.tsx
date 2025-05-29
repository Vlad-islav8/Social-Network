import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {LoginButton} from "./LoginButton/LoginButton";
import Nav from "../Main/Nav/Nav";
import React from "react";
import {VoidFunction} from "../Types";
import {profileType} from "../../redux/profileReducer";
interface HeaderPropsType {
    navPosition:string
    handleNavPsoition:VoidFunction
    isAuth:boolean
    login:string
    userId:number
    profile:profileType
    hanldeLogOut:VoidFunction
}

const Header:React.FC<HeaderPropsType> = (props) => {
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
                (props.profile)
                    ?
                    <LoginButton
                        profile={props.profile}
                        isAuth={props.isAuth}
                        hanldeLogOut={props.hanldeLogOut}
                    />
                    :
                    <span>Войдите в аккаунт</span>
            }
        </header>
    )
}

export default Header;