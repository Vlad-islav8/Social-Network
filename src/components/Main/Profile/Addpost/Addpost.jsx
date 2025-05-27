import styles from './Addpost.module.css'
import { Field, Form, Formik} from "formik";
import { maxLenghtCreator, ivReques } from "../../../../utils/validators/validators";
import { AddPostTextArea } from "../../../FormComponents/inputs/Inputs";
import { useState } from 'react';

const maxLenght = maxLenghtCreator(500)

const Addpost = (props) => {
    const submit = (post) => {
        props.onAddPost(post.addpost)
    }
    const [isFocus, setIsFocus] = useState(false)

    const handleFocus = () => {
        (isFocus) ? setIsFocus(false) : setIsFocus(true)
    }

    return (

        <div className={styles.addPostContainer}>
            <Formik initialValues={''} onSubmit={props.handleSubmit(submit)} onFocus={handleFocus} onBlur={handleFocus}>
                <Form className={`${styles.addpost} ${(isFocus) ? styles.focus : ''}`}>
                        <Field
                            as={AddPostTextArea}
                            name="addpost"
                            validate={[maxLenght, ivReques]}
                            placeholder='Создайте новый пост..'
                            className={styles.notActive}
                        />
                        <button className={styles.addPostBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" /></svg>
                        </button>
                </Form>
            </Formik>

        </div>

    )
}

export default Addpost