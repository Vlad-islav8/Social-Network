import React from "react";
import styles from './Messages.module.css'
function Messages(props) {
    const messages = props.activeUser.messages.map((el) => {
        return (
            <div className={styles.userMessage}>
                <p>{el.message}</p>
            </div>
        )
    })
    return (
        <div className={styles.userDialog}>
            {messages}
        </div>
    )
}

export default Messages;