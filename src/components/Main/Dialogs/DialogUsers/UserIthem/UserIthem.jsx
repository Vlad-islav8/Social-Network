import React from "react";
import styles from './UserIthem.module.css'

function Userithem(props) {
    const handleSetActive = () => {
        props.setUserActive(props.id)
    }
    return (
        <div className={styles.itemWrapper}>
            <button onClick={handleSetActive} className={styles.ithem}>
                <img src={props.ava} alt="аватар" />
                <h2>{props.name}</h2>
            </button>
        </div>

    )
}

export default Userithem

