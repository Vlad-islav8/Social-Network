import React, { useState } from 'react';
import styles from './Nav.module.css'
import { NavLink } from "react-router-dom";

function Nav(props) {
  const activeClass = ({ isActive }) => (isActive ? styles.active : '')

  const [activePanel, setActivePanel] = useState(false)

  const handleActivePanel = () => {
    (activePanel) ? setActivePanel(false) : setActivePanel(true)
  }

  return (
    <nav className={`${styles.nav} ${(activePanel) ? styles.unVisibule : ''}`}>
      <ul>
        <NavLink to='/profile' className={`${styles.item} ${activeClass}`}>Profile</NavLink>
        <NavLink to='/dialogs' className={`${styles.item} ${activeClass}`}>Messages</NavLink>
        <NavLink to='/users' className={`${styles.item} ${activeClass}`}>Users</NavLink>
        <NavLink to='/music' className={`${styles.item} ${activeClass}`}>Music</NavLink>
        <NavLink to='/settings' className={`${styles.item} ${activeClass}`} activeClassName={styles.active}>Settings</NavLink>
      </ul>
      <div onClick={handleActivePanel} className={`${styles.activePanelBtn} ${(activePanel) ? styles.activeBtn : ''}`}>
        <span className={styles.panerArrow} >&lt;</span>
      </div>
    </nav>
  )
}


export default Nav;