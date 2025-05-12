import React from 'react';
import styles from './Dialogs.module.css'
import Dialogusers from "./DialogUsers/Dialoguswes";
import Usermessage from './Usermessage/Usermessage';
function Dialogs(props) {
    return (
        <div className={styles.dialogContent}>
            <div className={styles.dialogUsers}>
                <h1>Messages</h1>
                <Dialogusers users={props.users} setUserActive={props.setUserActive}/>
            </div>
            <div className={styles.dialogMessage}>
                <Usermessage
                    addMessage={props.addMessage}
                    activeUser={props.activeUser}
                    users={props.users}
                />
            </div>
        </div>
    )
}

export default Dialogs;