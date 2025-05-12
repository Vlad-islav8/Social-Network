import { connect } from 'react-redux';
import {withAuthRedirect} from "../../../Hok/withAuthRedirect";
import {compose} from "redux";
import Dialogs from "./Dialogs";
import {isMe} from "../../../Hok/isMe";
import {addMessage, setUserActive} from "../../../redux/dialogsReducer";
import { getActiveUser, getDialogUsers } from '../../../redux/selectors/dialogsSelector';

const DialogsContainer = (props) => {
    return <Dialogs {...props}/>
}

let mapStateToProps = (state) => {
    return {
        users: getDialogUsers(state),
        activeUser: getActiveUser(state)
    }
}
let mapDispatchToProps =  {
    setUserActive,
    addMessage,
}
export default compose(
    withAuthRedirect,
    isMe,
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(DialogsContainer)

