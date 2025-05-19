import MainDesc from "./MainDesc";
import {connect} from "react-redux";
import {compose} from "redux";
import gitHub from "../../../../images/gitHub.svg";
import vk from "../../../../images/vk.svg";
import facebook from "../../../../images/facebook.svg";
import instagram from "../../../../images/instagram.svg";
import twitter from "../../../../images/twitter.svg";
import website from "../../../../images/website.svg";
import youtube from "../../../../images/youtube.svg";
import mainLink from "../../../../images/mainLink.svg";
import {
    getIsFollowered,
    getProfile,
    getProfileStatus,
    getUpdateAvaIsFetching
} from "../../../../redux/selectors/profileSelector";
import {isMe} from "../../../../Hok/isMe";
import {useCallback} from "react";
import {
    addAvatarThuckCreator, followUserThunkCreator,
    getUserProfileThunkCreator, putProfileDataThuncCreator,
    updateStatusThuncCreator
} from "../../../../redux/profileReducer";
import {getMeId} from "../../../../redux/selectors/isAuthSelector";

const MainDescContainer = (props) => {
    const userId = props.meId
    const profile = props.profile.profile
    const contacts = profile.contacts
    const imageArr = [
        {name: 'facebook', link: facebook},
        {name: 'website', link: website},
        {name: 'vk', link: vk},
        {name: 'twitter', link: twitter},
        {name: 'instagram', link: instagram},
        {name: 'youtube', link: youtube},
        {name: 'github', link: gitHub},
        {name: 'mainLink', link: mainLink},
    ]
    const updateStatus = useCallback((newStaus) => {
        props.updateStatusThuncCreator(newStaus)
    }, [props.profileStatus])
    const updateAvatar = async (avatar) => {
        await props.addAvatarThuckCreator(avatar)
        props.getUserProfileThunkCreator(userId)
    }
    const handlePutUserData = async (data) => {
        const response = await props.putProfileDataThuncCreator(data)
        props.getUserProfileThunkCreator(userId)
    }
    const handleremoveLink =  (name) => {
        if(name === "" || !name) {
            return
        }
         submitData(profile, {...contacts, [name]: null})
    }
    const submitData = (obj, contactsObj) => {
        const userData = {
            aboutMe: obj.aboutMe || profile.aboutMe,
            userId: profile.userId,
            lookingForAJob: obj.lookingForAJob || profile.lookingForAJob,
            lookingForAJobDescription: obj.lookingForAJobDescription || profile.lookingForAJobDescription,
            fullName: obj.fullname || profile.fullName,
            contacts: (contactsObj) ?
                {
                    ...contactsObj,
                    [contactsObj.name]: contactsObj.link,

                }
                : contacts
        }
        handlePutUserData(userData)
    }
    const handleFollowered = (userId, followAction) => {
        props.followUserThunkCreator(userId, followAction)
    }
    return (
        <MainDesc
            imageArr={imageArr}
            {...props}
            updateStatus={updateStatus}
            updateAvatar={updateAvatar}
            handlePutUserData={handlePutUserData}
            submitData={submitData}
            handleremoveLink={handleremoveLink}
            isFollowered={props.isFollowered}
            handleFollowered={handleFollowered}
        />
    )
}
const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        profileStatus: getProfileStatus(state),
        meId: getMeId(state),
        updateAvaIsFetching: getUpdateAvaIsFetching(state),
        isFollowered: getIsFollowered(state)

    }
}
const mapDispatchToProps =  {
        updateStatusThuncCreator,
        addAvatarThuckCreator,
        getUserProfileThunkCreator,
        putProfileDataThuncCreator,
        followUserThunkCreator,
}

export default compose(
    isMe,
    connect(mapStateToProps, mapDispatchToProps),
)(MainDescContainer)