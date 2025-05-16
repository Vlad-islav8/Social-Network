import styles from "./Decription.module.css";
import plus from "../../../../images/plus.svg";
import {useState} from "react";
import AddContactModal from "./AddContactModal/AddContactModal";
import convertFunction from "../../../../utils/convertFunction";
import deleteImage from '../../../../images/delete.svg'
import deleteLink from '../../../../images/deleteLink.svg'
import handle from '../../../../utils/hadnle'
const Decription = (props) => {
    const profile = props.profile.profile
    const contacts = props.profile.profile.contacts
    const imageArr = props.imageArr
    const [addContactMode, setAddContactMode] = useState(false)
    const [removeMode, setRemoveMode] = useState(false)
    const [selectedLink, setSelectedLink] = useState(false)

    const handleAddContactMode = () => {
        handle(addContactMode, setAddContactMode)
    }
    const handleSelectedLink = (name) => {
        setSelectedLink(name)
    }
    const handleremoveMode = () => {
        handle(removeMode, setRemoveMode)
    }
    const localHandleRemoveLink = () => {
        props.handleremoveLink(selectedLink)
    }
    const contactsArr = convertFunction(contacts, imageArr)
    return (
        <div className={styles.decription}>
            <ul className={styles.mainDescription}>
                {(profile.aboutMe &&
                    <li className={styles.aboutMe} title='Зайдите в настройки профился для редактирования'>
                        о себе: <span>{profile.aboutMe}</span>
                    </li>
                )}
                <li className={styles.workStatus} title='Зайдите в настройки профился для редактирования'>
                    Статус занятости:
                    {(profile.lookingForAJob) ? <span> В поиске работы </span> : <span> Работаю</span>}
                </li>
                <li className={styles.jobDecription} title='Зайдите в настройки профился для редактирования'>
                    Описание к работе: <span>{profile.lookingForAJobDescription}</span>
                </li>
            </ul>
            <div className={styles.deckContactsWrapper}>
                <ul className={styles.deckContactsList}>

                    {contactsArr.map((el) => {
                        if (el.link) {
                            return (
                                <li className={styles.Item}>
                                    {
                                        (!removeMode) ?
                                            <a href={el.link} className={styles.linkItem} target="_blank">
                                                <img
                                                    src={el.icon}
                                                    alt={el.name}
                                                    title={el.name}
                                                    className={styles.imgItem}
                                                />
                                            </a>
                                            :
                                            <button
                                                className={`${styles.linkItem} ${styles.removeModeItem} ${(selectedLink === el.name && styles.selectedLink)}`}
                                                onClick={() => {
                                                    handleSelectedLink(el.name)
                                                }}>
                                                <img
                                                    src={el.icon}
                                                    alt={el.name}
                                                    title={el.name}
                                                    className={styles.imgItem}
                                                />
                                            </button>
                                    }

                                </li>

                            )
                        }
                    })}
                    {(props.isMe) &&
                        <div className={styles.editBar}>
                            {
                                (!contactsArr.find(el => el.link !== null))
                                    ?
                                    <li className={`${styles.Item} ${styles.addContactPlus} ${styles.editItem}`}>
                                        <button onClick={handleAddContactMode}>
                                            <img src={plus} alt={'Добавить ссылку'}
                                                 className={` ${styles.imgItem} ${styles.imgItemPlus}`}/>
                                        </button>
                                    </li>
                                    :
                                    <>
                                        {(removeMode &&
                                            <li className={`${styles.Item} ${styles.editItem}`}>
                                                <button className={styles.removeLink} onClick={localHandleRemoveLink}>
                                                    <img src={deleteLink} alt="Удалить ссылку"
                                                         className={styles.imgItem}/>
                                                </button>
                                            </li>
                                        )}
                                        <li className={`${styles.Item} ${styles.editItem}`}>
                                            <button className={styles.removeLink} onClick={handleremoveMode}>
                                                <img src={deleteImage} alt="Удалить ссылку" className={styles.imgItem}/>
                                            </button>
                                        </li>

                                        <li className={`${styles.Item} ${styles.addContactPlus} ${styles.editItem}`}>
                                            <button onClick={handleAddContactMode}>
                                                <img src={plus} alt={'Добавить ссылку'}
                                                     className={` ${styles.imgItem} ${styles.imgItemPlus}`}/>
                                            </button>
                                        </li>
                                    </>
                            }
                        </div>
                    }

                </ul>
                {(removeMode &&
                    <div className={styles.warningInfo}>
                        <div className={styles.arrow}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>Выбирите ссылку которую хотите удалить и нажмите еще раз, <i>ничего не выбирайте если нажали случайно</i></span>
                    </div>
                )}
                <AddContactModal {...props} handleAddContactMode={handleAddContactMode} addContactMode={addContactMode}
                                 submitData={props.submitData}/>
            </div>

        </div>
    )
}

export default Decription