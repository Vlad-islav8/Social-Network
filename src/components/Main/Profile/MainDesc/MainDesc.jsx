import { useRef } from 'react';
import styles from './MainDesc.module.css'
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const MainDesc = (props) => {
    const addFhotoInutRef = useRef(null)
    const isMe = props.isMe
    const converFunction = (contacts) => {
        if (contacts) {
            const resultFunc = (Obj) => {
                const NewArr = []
                for (let i = 0; i < Object.keys(Obj).length; i++) {
                    const newItem = { id: i, name: Object.keys(Obj)[i], link: Object.values[i] }
                    NewArr.push(newItem)
                }
                return NewArr
            }
            const result = resultFunc(contacts)
            return result
        }
    }

    const contactsArr = converFunction(props.profile.contacts)
    const handleUpdateAvatar = () => {

        if (addFhotoInutRef) {
            props.apdateAvatar(addFhotoInutRef.current.files[0])
        }
    }

    return (
        <div className={styles.mainDesc}>
            <div className={styles.mainInfo}>
                {
                    (props.updateAvaIsFetching)
                        ?
                        <div className={styles.loaderContainer}>
                            <img
                                className={`${styles.avatar} ${styles.avatarLoading}`}
                                src={
                                    (!props.profile.photos.small) ?
                                        'https://justvision.org/sites/default/files/2019-11/ofer-shinar.png' :
                                        props.profile.photos.small
                                }
                                alt="avatar" />
                            <span className={styles.loader}></span>
                        </div>
                        :
                        <img
                            className={styles.avatar}
                            src={
                                (!props.profile.photos.small) ?
                                    'https://justvision.org/sites/default/files/2019-11/ofer-shinar.png' :
                                    props.profile.photos.small
                            }
                            alt="avatar" />
                }
                {
                    (isMe && <>
                        <input type='file' ref={addFhotoInutRef} />
                        <button onClick={handleUpdateAvatar}>Загрузить фото</button>
                    </>
                    )


                }

                <div className={styles.named}>
                    <h1>{props.profile.fullName}</h1>
                    <ProfileStatus
                        profileStatus={props.profileStatus}
                        updateStatus={props.updateStatus}
                        isMe={isMe}
                    />
                </div>
            </div>
            <div className={styles.decription}>
                <div className={styles.mainDescription}>
                    <div className={styles.workStatus}>
                        {(props.profile.aboutMe && <h2> о себе: {props.profile.aboutMe}</h2>)}
                        <p>Статус занятости:
                            {(props.profile.lookingForAJob) ? <span> В поиске работы </span> : <span> Работаю</span>}
                            <p>{props.profile.lookingForAJobDescription}</p>
                        </p>
                    </div>
                </div>
                <ul>
                    {
                        contactsArr.map((el) => {
                            if (el.link) {
                                return (
                                    <li>
                                        <a href={el.link}>
                                            {el.name}
                                        </a>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default MainDesc;