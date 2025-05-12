import React, { useState } from 'react';
import styles from './Nav.module.css'
import {NavLink} from "react-router-dom";

function Nav() {
  const activeClass = ({ isActive }) => (isActive ? styles.active : styles.item)
  const [activePanel, setActivePanel] = useState(false)

  const handleActivePanel = () => {
    (activePanel) ? setActivePanel(false) : setActivePanel(true)
  }
  return (
    <nav className={`${styles.nav} ${(activePanel) ? styles.unVisibule : ''}`}>
      <ul>
        <NavLink to='/profile' className={activeClass}>Profile</NavLink>
        <NavLink to='/dialogs' className={activeClass}>Messages</NavLink>
        <NavLink to='/users'  className={activeClass}>Users</NavLink>
        <NavLink to='/music' className={activeClass}>Music</NavLink>
        <NavLink to='/settings' className={activeClass} activeClassName={styles.active}>Settings</NavLink>
      </ul>
      <span className={`${styles.activePanelBtn} ${(activePanel) ? styles.activeBtn : ''}`} onClick={handleActivePanel}>&lt;</span>
    </nav>
  )
}


export default Nav;