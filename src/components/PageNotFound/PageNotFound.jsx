import styles from './PageNotFound.module.css'; // Импорт SCSS Modules
import okak from '../../images/okak.png'
import {Link} from "react-router-dom";
function PageNotFound() {
    return (
        <div className={styles.pageNotFoundWrapper}>
            <div className={styles.pageNotFound}>
                    <div className={styles.okakInfo}>
                        <div className={styles.info}>
                            <span className={styles.errorCode}>404</span>
                            <h1>Страница не найдена</h1>
                            <h2>проверьте правильнось адреса</h2>
                        </div>
                        <div className={styles.homeBtnContainer}>
                            <button className={styles.homeBtn}>
                                <Link to='/' >Окак на главную</Link>
                            </button>
                        </div>
                    </div>
                    <div className={styles.okakImageBlock}>
                        <img src={okak} alt=""/>
                    </div>
            </div>
        </div>
    );
}

export default PageNotFound;
