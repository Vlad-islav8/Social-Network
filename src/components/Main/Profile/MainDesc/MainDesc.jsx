import styles from './MainDesc.module.css'

import {reduxForm} from "redux-form";
import MainInfo from "./MainInfo/MainInfo";
import Decription from "../Decription/Decription";

const MainDesc = (props) => {
    return (
        <div className={styles.mainDesc}>
            <MainInfo
                {...props}
            />
            <Decription
                {...props}
            />
        </div>
    )
}

export default reduxForm({
    form: 'addLink'
})(MainDesc)

