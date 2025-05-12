import styles from './MainDesc.module.css'
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const MainDesc = (props) => {
    const contacts = props.profile.contacts

    const objectToArrBoj = (Obj) => {
        const NewArr = []
        for (let i = 0; i <  Object.keys(Obj).length; i++) {
            const newItem = { id: i, name: Object.keys(Obj)[i], link: Object.values[i] }
            NewArr.push(newItem)
        }
        return NewArr
    }
    
    const contactsArr = objectToArrBoj(contacts)

    return (
        <div className={styles.mainDesc}>
            <div className={styles.mainInfo}>
                <img
                    className={styles.avatar}
                    src={(!props.profile.photos.large) ?
                        'https://justvision.org/sites/default/files/2019-11/ofer-shinar.png' :
                        props.profile.photos.large}
                    alt="avatar" />
                <div className={styles.named}>
                    <h1>{props.profile.fullName}</h1>
                    <ProfileStatus
                        profileStatus={props.profileStatus}
                        updateStatus={props.updateStatus}
                        isMe={props.isMe}
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