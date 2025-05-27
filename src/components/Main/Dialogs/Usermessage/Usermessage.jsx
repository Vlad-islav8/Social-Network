import styles from './Usermessage.module.css';
import Messages from "./Messages/Messages";
import {Field, Form, Formik} from "formik";
import {AddPostTextArea} from "../../../FormComponents/inputs/Inputs";
function Usermessage(props) {
    const activeUserId = props.activeUser
    const activeUser = props.users.find(user => user.id === activeUserId);
    const submit = (values) => {
        props.addMessage(values.addMessage, props.id)
    }
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
                    <Formik initialValues={''} onSubmit={props.handleSubmit(submit)}>
                        <Form className={styles.addMessage}>
                        <Field as={AddPostTextArea} name='addMessage' type="text" placeholder="Напишите чонить" />
                        <button>Отправить</button>
                        </Form>
                    </Formik>
                </div>
            ) : (
                <p>Данные не получены</p>
            )}
        </>
    );
}

export default Usermessage;

