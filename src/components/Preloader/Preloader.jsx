import React from 'react'
import styles from './Preloader.module.css'
const Preloader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
                <div className={styles.square}></div>
                <div className={styles.path}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className={styles.textLoad}>Loading</p>
            </div>
        </div>
    )
}

export default Preloader