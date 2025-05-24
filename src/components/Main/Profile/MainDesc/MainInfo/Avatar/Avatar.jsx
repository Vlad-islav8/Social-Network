import { useRef } from 'react'
import styles from './Avatar.module.css'
import defaultAvaImage from '../../../../../../images/defaultAvaImage.jpg'
export const Avatar = (props) => {
    const avaRef = useRef(null)
    const handleDoubleClickToAva = () => {
         avaRef.current.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Получаем выбранный файл
        if (file) {
          props.handleUpdateAvatar(file); // Передаем файл в handleUpdateAvatar
        }
      };
    return (
        <div className={styles.avatarWrapper}>
            {
                (props.updateAvaIsFetching)
                    ?
                    <div className={styles.loaderContainer}>
                        <img
                            className={`${styles.avatar} ${styles.avatarLoading}`}
                            src={
                                (!props.smallPhoto) ?
                                    defaultAvaImage :
                                    props.smallPhoto
                            }
                            alt="avatar" />
                        <span className={styles.loader}></span>
                    </div>
                    :
                    <>
                        <div className={styles.avatarContainer}>
                            <img
                                className={styles.avatar}
                                src={
                                    (!props.smallPhoto) ?
                                        defaultAvaImage :
                                        props.smallPhoto
                                }
                                alt="avatar"
                                onDoubleClick={handleDoubleClickToAva}
                                title='нажмите дважды для смены аватара'
                            />
                            <input 
                                type="file" 
                                ref={avaRef} 
                                onChange={handleFileChange}
                            />
                        </div>
                    </>
            }
        </div>

    )
}