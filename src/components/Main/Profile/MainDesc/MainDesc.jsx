import { useRef, useState } from 'react';
import styles from './MainDesc.module.css'
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import { Avatar } from './Avatar/Avatar';
import EditProfileReduxForm from './EditProfile/EditProfile';

const MainDesc = (props) => {
    const isMe = props.isMe

    const [editMode, setEditMode] = useState(false)

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
    const handleUpdateAvatar = (avatar) => {
        props.apdateAvatar(avatar)
    }
    const handleEditMode = () => {
        (editMode) ? setEditMode(false) : setEditMode(true)
        if (!props.activePanel) {
            // props.handleActivePanel()
        }
    }
    return (
        <div className={styles.mainDesc}>
            <div className={styles.mainInfo}>
                <Avatar
                    updateAvaIsFetching={props.updateAvaIsFetching}
                    smallPhoto={props.profile.photos.small}
                />
                {(isMe &&
                    <div className={styles.editProfile}>
                        <button onClick={handleEditMode}>Редактировать профиль</button>

                        <EditProfileReduxForm
                            handleEditMode={handleEditMode}
                            handleActivePanel={props.handleActivePanel}
                            activePanel={props.activePanel}
                            editMode={editMode}
                            handlePutUserData={props.handlePutUserData}
                            profile={props.profile}
                            handleUpdateAvatar={handleUpdateAvatar}
                        />
                    </div>
                )}

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