import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {LoginButton} from "./LoginButton/LoginButton";
function Header(props) {
    return (
        <header className={styles.header}>
            <Link to='/'><h1>My social network</h1></Link>
            <div>
                <LoginButton userData={props.userData} isAuth={props.isAuth} loginOut={props.loginOut}/>
            </div>
        </header>
    )
}

export default Header;