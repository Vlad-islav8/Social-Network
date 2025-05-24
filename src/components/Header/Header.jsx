import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {LoginButton} from "./LoginButton/LoginButton";
import Preloader from "../Preloader/Preloader";
function Header(props) {
    return (
        <header className={styles.header}>
            <Link to='/'><h1>My social network</h1></Link>
            {
                (props.profile.profile)
                    ?
                    <LoginButton profile={props.profile} isAuth={props.isAuth} loginOut={props.loginOut}/>
                    :
                    <Preloader />
            }
        </header>
    )
}

export default Header;