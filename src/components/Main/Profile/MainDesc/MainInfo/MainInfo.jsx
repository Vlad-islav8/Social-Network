import styles from "./MainInfo.module.css"
import {Avatar} from "./Avatar/Avatar";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import editProfile from "../../../../../images/editProfile.svg";
import EditProfileReduxForm from "./EditProfile/EditProfile";
import headerDefaultImage from '../../../../../images/headerDefaultImage.jpeg'
import {useState} from "react";
const MainInfo = (props) => {
    const profile = props.profile.profile
    const largePhoto = profile?.photos?.large
    const small = profile?.photos?.small
    const isMe = props.isMe
    const [editMode, setEditMode] = useState(false)
    const handleUpdateAvatar = (avatar) => {
        props.updateAvatar(avatar)
    }

    const handleEditMode = () => {
        (editMode) ? setEditMode(false) : setEditMode(true)
    }

    return (
        <div className={styles.mainInfo}>
            <div className={styles.headerProfile}>
                <img
                    src={(largePhoto) ? largePhoto : headerDefaultImage}
                    alt="шапка профиля"
                    className={styles.headerImage}
                />
                <div className={styles.mainInfoWrapper}>
                    <Avatar
                        updateAvaIsFetching={props.updateAvaIsFetching}
                        smallPhoto={small}
                        handleUpdateAvatar={handleUpdateAvatar}
                    />
                    <div className={styles.named}>
                        <h1>{profile?.fullName}</h1>
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
                                     alt="Редактировать профиль"/>
                            </button>

                            <EditProfileReduxForm
                                handleActivePanel={props.handleActivePanel}
                                editMode={editMode}
                                handlePutUserData={props.handlePutUserData}
                                profile={profile}
                                handleEditMode={handleEditMode}
                                handleUpdateAvatar={handleUpdateAvatar}
                                submitData={props.submitData}
                            />


                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}

export default MainInfo
