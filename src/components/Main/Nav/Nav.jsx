import React, {useState} from 'react';
import styles from './Nav.module.css'
import {NavLink} from "react-router-dom";

function Nav(props) {
    const [activePage, setActivePage] = useState(null)

    const handleActivePage = (page) => {
        setActivePage(page)
    }

    return (
        <nav className={`${styles.nav} ${(props.navPosition === 'top' && styles.navTop)}`}>
            <ul className={`${styles.linkList} ${(props.navPosition === 'top' && styles.ulTop)}`}>
                <NavLink
                    to='/profile'
                    className={`${styles.item} ${(activePage === 'profile' && styles.active)}`}
                    onClick={() => {handleActivePage('profile')}}
                >Profile</NavLink>

                <NavLink
                    to='/dialogs'
                    className={`${styles.item} ${(activePage === 'dialogs' && styles.active)}`}
                    onClick={() => {handleActivePage('dialogs')}}
                >dialogs</NavLink>

                <NavLink
                    to='/users'
                    className={`${styles.item} ${(activePage === 'users' && styles.active)}`}
                    onClick={() => {handleActivePage('users')}}
                >users</NavLink>

                <NavLink
                    to='/music'
                    className={`${styles.item} 
                    ${(activePage === 'music' && styles.active)}`}
                    onClick={() => {handleActivePage('music')}}
                >music</NavLink>

                <NavLink
                    to='/settings'
                    className={`${styles.item} 
                    ${(activePage === 'settings' && styles.active)}`}
                    onClick={() => {handleActivePage('settings')}}
                >settings</NavLink>
                <div
                    className={`${(props.navPosition === 'top' && styles.activePanelBtnTop)} ${(props.navPosition === 'top') ? styles.item : styles.activePanelBtn}`}>
                    <button className={`${styles.panerArrow}`} onClick={props.handleNavPsoition}>
                        {(props.navPosition === 'left') ? 'На шапку' : 'На боковую'}
                    </button>
                </div>
            </ul>

        </nav>
    )
}


export default Nav;