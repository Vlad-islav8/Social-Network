import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {LoginButton} from "./LoginButton/LoginButton";
function Header(props) {
    return (
        <header className={styles.header}>
            <Link to='/'><h1>My social network</h1></Link>

            <LoginButton userData={props.userData} isAuth={props.isAuth} loginOut={props.loginOut}/>
        </header>
    )
}

export default Header;