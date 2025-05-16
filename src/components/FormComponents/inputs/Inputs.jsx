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
export const BazeInput = ({input, meta, placeholder, type, errorMessage}) => {
    const error = meta.touched && meta.error
    return (
        <div className={`${styles.BazeInput}`}>
            <input placeholder={placeholder} type={type} {...input}  className={`${(error) ? styles.Error : undefined}`}/>
            { onErrorMessage(error, meta, errorMessage) }
        </div>
    )
}

export const BazeTextArea = ({input, meta, placeholder, type}) => {
    const error = meta.touched && meta.error
    return (
        <div className={`${styles.BazeInput}`}>
            <textarea placeholder={placeholder} type={type} {...input} className={`${(meta.touched && meta.error) ? styles.Error : undefined}`}/>
            { onErrorMessage(error, meta) }
        </div>
    )
}

export const AddPostTextArea = ({input, meta, placeholder, type, }) => {
    return (
        <textarea placeholder={placeholder} type={type} {...input} className={styles.addPostTextArea}/>
    )
}

export const EditProfileInput = ({input, meta, placeholder, type, handleLookingJob, accept, value}) => {
    return (
        <input 
            placeholder={placeholder} 
            type={type} 
            {...input} 
            className={styles.EditProfileInput}
            onClick={handleLookingJob}
            accept={accept}
            value={input.value}
            />
    )
}

export const AddLinkInput = ({input, meta, placeholder, type,}) => {
    const errorMessage = meta.touched && meta.error
    return (
        <>
            <input
                placeholder={placeholder}
                type={type}
                {...input}
            />
            {(errorMessage &&  <span className={styles.ErrorMessage}>{errorMessage}</span>)}

        </>

    )
}