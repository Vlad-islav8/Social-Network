import styles from './Avatar.module.css'
export const Avatar = (props) => {
    return (
        <>
            {
                (props.updateAvaIsFetching)
                    ?
                    <div className={styles.loaderContainer}>
                        <img
                            className={`${styles.avatar} ${styles.avatarLoading}`}
                            src={
                                (!props.smallPhoto) ?
                                    'https://justvision.org/sites/default/files/2019-11/ofer-shinar.png' :
                                    props.smallPhoto
                            }
                            alt="avatar" />
                        <span className={styles.loader}></span>
                    </div>
                    :
                    <img
                        className={styles.avatar}
                        src={
                            (!props.smallPhoto) ?
                                'https://justvision.org/sites/default/files/2019-11/ofer-shinar.png' :
                                props.smallPhoto
                        }
                        alt="avatar" />
            }
        </>

    )
}