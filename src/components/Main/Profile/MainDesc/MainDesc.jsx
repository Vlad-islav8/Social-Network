import { useRef, useState } from 'react';
import styles from './MainDesc.module.css'
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import { Avatar } from './Avatar/Avatar';
import EditProfileReduxForm from './EditProfile/EditProfile';
import editProfile from '../../../../images/editProfile.svg'
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
        props.updateAvatar(avatar)
    }

    const handleEditMode = () => {
        (editMode) ? setEditMode(false) : setEditMode(true)
    }
    return (
        <div className={styles.mainDesc}>
            <div className={styles.mainInfo}>
                <div className={styles.headerProfile}>
                    <img
                        src={
                            (props.profile.photos.large) ? props.profile.photos.large : "https://pic.rutubelist.ru/userappearance/f9/50/f95049ea40056572c77e816b2944a214.jpeg"
                        }

                        alt="шапка профиля"
                        className={styles.headerImage}
                    />
                    <div className={styles.mainInfoWrapper}>
                        <Avatar
                            updateAvaIsFetching={props.updateAvaIsFetching}
                            smallPhoto={props.profile.photos.small}
                            handleUpdateAvatar={handleUpdateAvatar}
                        />
                        <div className={styles.named}>
                            <h1>{props.profile.fullName}</h1>
                            <ProfileStatus
                                profileStatus={props.profileStatus}
                                updateStatus={props.updateStatus}
                                isMe={isMe}
                            />
                        </div>
                    </div>

                    {(isMe &&
                        <div className={styles.editBtnWrapper}>
                            <div className={styles.editProfile}>
                                <button onClick={handleEditMode} title='редактировать профиль'>
                                    <img className={styles.editImage}
                                        src={editProfile}
                                        alt="Редактировать профиль" />
                                </button>

                                <EditProfileReduxForm
                                    handleActivePanel={props.handleActivePanel}
                                    editMode={editMode}
                                    handlePutUserData={props.handlePutUserData}
                                    profile={props.profile}
                                    handleEditMode={handleEditMode}
                                    handleUpdateAvatar={handleUpdateAvatar}
                                />
                            </div>
                        </div>

                    )}
                </div>



            </div>

            <div className={styles.decription}>
                <div className={styles.mainDescription}>
                    <ul className={styles.workStatus}>
                        {(
                            props.profile.aboutMe &&
                            <li>
                                о себе: <span>{props.profile.aboutMe}</span>
                            </li>
                        )}

                        <li>
                            Статус занятости:
                            {(props.profile.lookingForAJob) ? <span> В поиске работы </span> : <span> Работаю</span>}
                        </li>
                        <li>
                            Описание к работе: <span>{props.profile.lookingForAJobDescription}</span>
                        </li>
                    </ul>
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