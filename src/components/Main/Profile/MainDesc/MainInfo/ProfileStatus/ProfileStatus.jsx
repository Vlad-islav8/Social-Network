import React, { useEffect, useState } from 'react'
import styles from './ProfileStatus.module.css'

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.profileStatus)

    const handleEditMode = () => {
        if (props.isMe) {
            (editMode)
                ? setEditMode(false)
                : setEditMode(true)
        }
    }

    const onUpdateStatus = (event) => {
        if (event.key === 'Enter') {
            props.updateStatus(status)
            setEditMode(false)
        }
    }

    const onInputChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className={styles.ProfileStatus} onDoubleClick={handleEditMode}>
            {
                (editMode)
                    ? <div className={styles.inputBlock}>
                        <input autoFocus={true}
                            type="text"
                            value={status}
                            onChange={onInputChange}
                            onKeyPress={onUpdateStatus}
                            onBlur={handleEditMode}
                        />
                    </div>
                    : <div className={styles.statusBlock}>
                        {
                            (props.authid === props.profileId) ?
                                <p className={styles.status}>{
                                    (props.profileStatus) ?
                                        props.profileStatus :
                                        <span title='Нажмите дважды для установи нового статуса' className={styles.editStatus}>Установить статус...</span>
                                }</p>
                                : <p>{props.profileStatus || <span className={styles.statusRemove}>статус отсутствует</span>}</p>
                        }
                    </div>
            }
        </div>
    )
}

export default ProfileStatus