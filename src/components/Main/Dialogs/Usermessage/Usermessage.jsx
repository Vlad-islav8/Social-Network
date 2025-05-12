import React, { useRef } from "react";
import styles from './Usermessage.module.css';
import Messages from "./Messages/Messages";
import {Field, reduxForm} from "redux-form";
import handleSubmit from "redux-form/lib/handleSubmit";
import {AddPostTextArea, BazeTextArea} from "../../../FormComponents/inputs/Inputs";
function Usermessage(props) {
    const activeUserId = props.activeUser
    const activeUser = props.users.find(user => user.id === activeUserId);

    return (
        <>
            {activeUser ? (
                <div className={styles.userMessage}>
                    <div className={styles.userInfo}>
                        <img src={activeUser.ava} alt={`Ава ${activeUser.name}`} />
                        <h2>{activeUser.name}</h2>
                    </div>
                    <div className={styles.message}>
                        <Messages activeUser={activeUser} />
                    </div>
                    <ReduxAddMessage addMessage={props.addMessage} id={activeUserId}/>
                </div>
            ) : (
                <p>Данные не получены</p>
            )}
        </>
    );
}

const AddMessage = (props) => {
    const submit = (values) => {
        props.addMessage(values.addMessage, props.id)
    }
    return (
        <form className={styles.addMessage} onSubmit={props.handleSubmit(submit)}>
            <Field component={AddPostTextArea} name='addMessage' type="text" placeholder="Напишите чонить" />
            <button>Отправить</button>
        </form>
    )
}

const ReduxAddMessage = reduxForm({
    form: 'addMessage'
})(AddMessage)
export default Usermessage;

