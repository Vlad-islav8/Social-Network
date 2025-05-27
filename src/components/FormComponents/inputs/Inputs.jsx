import styles from './Inputs.module.css'

const onErrorMessage = (error, meta, errorMessage) => {
    if(error) {
        return (
            <span className={styles.ErrorMessage}>{meta.error}</span>
        )
    } else if(errorMessage) {
        return (
            <span className={styles.ErrorMessage}>{errorMessage}</span>
        )
    }
}
export const BazeInput = ({ field, form, ...props }) => {
    return (
        <div className={`${styles.BazeInput}`}>
            <input
                {...field}
                {...props}
            />
        </div>
    )
}


export const BazeTextArea = ({ field, form, ...props }) => {
    return (
        <div className={`${styles.BazeInput}`}>
            <textarea {...field} {...props}/>
        </div>


    )
}

export const AddPostTextArea = ({ field, form, ...props }) => {
    debugger
    return (
        <textarea
            {...field}
            {...props}
            className={styles.addPostTextArea}
        />
    )
}

export const EditProfileInput = ({ field, form, ...props }) => {
    return (
        <input
            {...field}
            {...props}
        />
    )
}

export const AddLinkInput = ({ field, form, ...props }) => {
    return (
        <>
            <input
                {...field}
                {...props}
            />
        </>

    )
}