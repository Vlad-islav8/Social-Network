import React from "react";
import styles from './Dialogusers.module.css'
import Userithem from "./UserIthem/UserIthem";
function Dialogusers(props) {

    return (
        <div className={styles.usersList}>
            {
                props.users.map((el) => {
                    return (
                        <Userithem
                            id={el.id}
                            name={el.name}
                            ava={el.ava}
                            messages={el.messages}
                            setUserActive={props.setUserActive}
                            key={el.id}
                            {...props}
                        />
                    )
                })
            }
        </div>
    )
}

export default Dialogusers;