import {connect} from "react-redux";
import { getMeId } from "../redux/selectors/isAuthSelector";
import { getProfileId } from "../redux/selectors/profileSelector";

export const isMe = (Component) => {
    const mapStateToProps = (state) => {
        return {
            authid: getMeId(state),
            profileId: getProfileId(state),
        }
    }
    const IsMeComponent = (props) => {
        if(props.authid === props.profileId) {
            return <Component {...props} isMe={true}/>
        } else {
            return <Component {...props} isMe={false}/>
        }
    }
    let connectIsMeComponent = connect(mapStateToProps)(IsMeComponent)

    return connectIsMeComponent
}