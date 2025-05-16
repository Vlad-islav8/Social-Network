import styles from './EditProfile.module.css'
import removeIcon from '../../../../../../images/removeIcon.svg'
import plus from '../../../../../../images/plus.svg'
import {requiredInput} from '../../../../../../utils/validators/validators'
import {EditProfileInput} from '../../../../../FormComponents/inputs/Inputs'
import {Field, reduxForm,} from 'redux-form'
import {useRef, useState} from 'react'

const InputItem = (props) => {
    const inputRef = useRef(null)

    const handleChange = () => {
        let value;
        if (props.type === 'checkbox') {
            value = inputRef.current.checked; // для чекбокса берем checked вместо value
        } else {
            value = inputRef.current.value;
        }
        props.hableInputsChange(props.name, value);
        debugger
    }
    return (
        <div className={styles.inputItem}>
            <label htmlFor="" className={styles.label}>
                <p>{props.label}</p>
            </label>
            <input
                ref={inputRef}
                onChange={handleChange}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                id={props.id}
                value={props.type === 'checkbox' ? undefined : props.value}
                checked={props.type === 'checkbox' ? props.value : undefined}
                accept={props.accept}
            />
        </div>
    )
}

const EditProfile = (props) => {
    const [fullName, setFullName] = useState(props.profile.fullName)
    const [aboutMe, setAboutMe] = useState(props.profile.aboutMe)
    const [lookingForAJob, setLookingForAJob] = useState(props.profile.lookingForAJob)
    const [JobDescription, setJobDescription] = useState(props.profile.lookingForAJobDescription)
    const removeEditMode = () => {
        props.handleEditMode()
        if (props.activePanel) {
            props.handleActivePanel()
        }
    }

    const OnSubmitData = () => {
        const data = {
            ...props.profile,
            fullname: fullName,
            lookingForAJob,
            lookingForAJobDescription: JobDescription,
            aboutMe: aboutMe,
        }
        props.submitData(data )
    }

    const hableInputsChange = (input, newValue) => {
        switch (input) {
            case "fullName":
                setFullName(newValue)
                break
            case 'AboutMe':
                setAboutMe(newValue)
                break
            case 'lookingForAJobDescription':
                setJobDescription(newValue)
                break
            case 'lookingForAJob':
                setLookingForAJob(newValue)
                break
        }
    }
    return (
        <div className={`${styles.EditProfile} ${(props.editMode && styles.editModeActive)}`}>
            <div className={`${styles.FormContainer}`}>
                <button onClick={removeEditMode} className={styles.removeBtn}>
                    <img src={removeIcon} alt="Закрыть"/>
                </button>
                <header className={styles.header}>
                    <p className={styles.headerText}>Заполинте данные профиля</p>
                </header>
                <form action="" className={styles.EditProfileForm} onSubmit={props.handleSubmit(OnSubmitData)}>
                    <div className={styles.formDataContainer}>
                        <InputItem
                            label='Ваше имя'
                            type={'text'}
                            name='fullName'
                            id='fullName'
                            value={fullName}
                            hableInputsChange={hableInputsChange}
                        />
                        <InputItem
                            label='Расскажите о себе'
                            type={'textarea'}
                            id='AboutMe'
                            name='AboutMe'
                            value={aboutMe}
                            hableInputsChange={hableInputsChange}

                        />
                        <div className={styles.checkboxInput}>
                            <InputItem
                                label='в поиске работы'
                                type={'checkbox'}
                                id='lookingForAJob'
                                name='lookingForAJob'
                                value={lookingForAJob}
                                hableInputsChange={hableInputsChange}
                            />
                        </div>

                        {(lookingForAJob &&
                            <InputItem
                                label='Описание к поиску работы'
                                type={'text'}
                                id='lookingForAJobDescription'
                                name='lookingForAJobDescription'
                                value={JobDescription}
                                hableInputsChange={hableInputsChange}
                            />
                        )}

                        <div className={styles.submit}>
                            <button type={"submit"} >
                                <img src={plus} alt="отправить"/>
                            </button>
                        </div>
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