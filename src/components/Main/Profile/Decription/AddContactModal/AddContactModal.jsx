import styles from "./AddContactModal.module.css";
import {Field} from "redux-form";
import {AddLinkInput} from "../../../../FormComponents/inputs/Inputs";
import {url} from "redux-form-validators";
import plus from "../../../../../images/plus.svg";
import {useState} from "react";
import removeIcon from '../../../../../images/removeIcon.svg'
import convertFunction from "../../../../../utils/convertFunction";
const AddContactModal = (props) => {
    const imageArr = props.imageArr
    const [activeContact, setactiveContact] = useState(null)
    const contacts = props.profile.profile.contacts
    const array = convertFunction(contacts, imageArr)
    const isClickToForm = () => {
        props.handleAddContactMode()
    }
    const clickForm = (event) => {
        event.stopPropagation();
    }
    const onSubmit = ({link}) => {
        const contactArr = array.filter(el => el.name === activeContact)
        const contactObj = {...contactArr[0], link: link}
        props.submitData(props.profile,
            contactObj
        )
    }
    debugger
    return (
        <div className={`${styles.addContactModal} ${(props.addContactMode) ? styles.addContactModalActive : ''}`}
             onClick={isClickToForm}>
            <form action="" className={styles.addContactForm} onClick={clickForm}
                  onSubmit={props.handleSubmit(onSubmit)}>
                <button className={styles.remove} onClick={props.handleAddContactMode}>
                    <img className={styles.removeImage} src={removeIcon} alt=""/>
                </button>
                <div>
                    <label className={styles.label} htmlFor="">
                        <p>Выберите ссылку</p>
                    </label>
                    <ul className={styles.deckContacts}>
                        {imageArr.map(
                            (el, index) => {
                                return (
                                    <button type={"button"} href={el.link}
                                            className={`${styles.linkItemAdd} ${styles.linkItemActive}`}
                                            onClick={
                                                () => {
                                                    setactiveContact(el.name)
                                                }
                                            }>
                                        <img src={el.link}
                                             className={`${styles.imgItemAdd} ${(el.name === activeContact) ? styles.imgItemAddActive : ''}`}/>
                                    </button>
                                )
                            }
                        )}
                    </ul>
                </div>
                <label htmlFor="" className={styles.label}>
                    <p>Введите url</p>
                </label>
                <Field
                    errorMessage='123'
                    name='link'
                    type='text'
                    id='link'
                    component={AddLinkInput}
                    validate={[url({protocols: ['http', 'https']})]}
                />
                <div className={styles.submitContainer}>
                    <button type={`submit`}>
                        <img src={plus} alt="Добавить ссылку"/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddContactModal