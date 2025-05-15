import styles from './EditProfile.module.css'
import removeIcon from '../../../../../images/removeIcon.svg'
import { requiredInput } from '../../../../../utils/validators/validators'
import { EditProfileInput } from '../../../../FormComponents/inputs/Inputs'
import { Field, reduxForm, } from 'redux-form'
import { useRef, useState } from 'react'

const InputItem = (props) => {
    if (props.name === 'lookingForAJobDescription') {
        if (!props.lookingJob) {
            return null
        }
    }
    if (props.type === 'file') {
        return (
            <div className={styles.inputItem}>
                <label htmlFor="">{props.label}</label>
                <input
                    ref={props.addPhotoRef}
                    value={props.file}
                    type="file"
                />
            </div>
        )
    }
    return (
        <div className={styles.inputItem}>
            <label htmlFor="">{props.label}</label>
            <Field
                placeholder={props.placeholder}
                name={props.name}
                type={props.type}
                id={props.id}
                component={props.component}
                validate={props.validators}
                handleLookingJob={props.handleLookingJob}
                value={props.value}
                accept={props.accept}
            />
        </div>
    )
}

const EditProfile = (props) => {
    const [lookingJob, setLookingJob] = useState(false)
    const addPhotoRef = useRef(null)

    const handleLookingJob = () => {
        (lookingJob) ? setLookingJob(false) : setLookingJob(true)
    }

    const removeEditMode = () => {
        props.handleEditMode()
        if (props.activePanel) {
            props.handleActivePanel()
        }
    }

    const submitData = ({ fullname, lookingForAJob, lookingForAJobDescription,  AboutMe}) => {
        if(addPhotoRef.current.files[0]) {
            props.handleUpdateAvatar(addPhotoRef.current.files[0])
        }
        const profile = props.profile
        const contacts = profile.contacts
        const userData = {
            aboutMe: AboutMe,
            userId: profile.userId,
            lookingForAJob: lookingForAJob || profile.lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription || profile.lookingForAJobDescription,
            fullName: fullname || profile.fullName,
            contacts: {
                github: contacts.github,
                vk: contacts.vk,
                facebook: contacts.facebook,
                instagram: contacts.instagram,
                twitter: contacts.twitter,
                website: contacts.website,
                youtube: contacts.youtube,
                mainLink: contacts.mainLink,
            } || contacts
        }
        props.handlePutUserData(userData)
    }
    return (
        <div className={`${styles.EditProfile} ${(props.editMode && styles.editModeActive)}`}>
            <div className={`${styles.FormContainer}`}>
                <header className={styles.header}>
                    <span>Заполинте данные профиля</span>
                    <button onClick={removeEditMode}>
                        <img src={removeIcon} alt="Закрыть" />
                    </button>
                </header>

                <form action="" className={styles.EditProfileForm} onSubmit={props.handleSubmit(submitData)}>
                    <div className={styles.formDataContainer}>

                        <InputItem
                            label='Аватар'
                            type={'file'}
                            placeholder='Аватар'
                            id='avatar'
                            name='avatar'
                            component={EditProfileInput}
                            validate={[requiredInput]}
                            accept='.jpg, .png, .jpeg'
                            addPhotoRef={addPhotoRef}
                        />
                        <InputItem
                            label='Расскажите о себе'
                            type={'textarea'}
                            id='AboutMe'
                            name='AboutMe'
                            component={EditProfileInput}
                            validate={[requiredInput]}
                        />
                        <InputItem
                            label='Имя'
                            type={'input'}
                            placeholder='Ваше имя'
                            id='fullname'
                            name='fullname'
                            component={EditProfileInput}
                            validate={[requiredInput]}
                        />
                        <InputItem
                            label='в поиске работы'
                            type={'checkbox'}
                            id='lookingForAJob'
                            name='lookingForAJob'
                            component={EditProfileInput}
                            validate={[]}
                            handleLookingJob={handleLookingJob}
                        />
                        <InputItem
                            label='Описание к поиску работы'
                            type={'textarea'}
                            id='lookingForAJobDescription'
                            name='lookingForAJobDescription'
                            component={EditProfileInput}
                            validate={[]}
                            lookingJob={lookingJob}
                        />

                    </div>
                    <div className={styles.submit}>
                        <button >Готово</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const EditProfileReduxForm = reduxForm({
    form: 'editprofile'
})(EditProfile)

export default EditProfileReduxForm