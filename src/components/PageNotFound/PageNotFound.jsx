import React, { useEffect, useRef } from 'react';
import styles from './PageNotFound.module.css'; // Импорт SCSS Modules
import { Link } from 'react-router-dom';

function PageNotFound() {

    return (
        <div className={styles.body}>
            <p className={styles.p}>
                HTTP: <span>404</span>
            </p>
            <code className={styles.code}>
                <span>страница</span>.<em>не_найдена</em> = true;
            </code>
            <code className={styles.code}>
                <span>if</span> (<b>ты видишь это</b>) {'{'}<span>повтори запрос()</span>;{'}'}
            </code>

            <div className={styles.center}>
                <Link className={styles.a} href="/">
                    ДОМОЙ
                </Link>
            </div>

        </div>
    );
}

export default PageNotFound;
