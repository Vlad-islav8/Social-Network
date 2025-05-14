import { connect } from 'react-redux';
import React, { useCallback, useEffect } from 'react'
import Profile from './Profile';
import {
	addAvatarThuckCreator,
	getStatusThunkCreator,
	getUserProfileThunkCreator,
	onAddPost,
	putProfileDataThuncCreator,
	updateStatusThuncCreator,
} from "../../../redux/profileReducer";
import { withAuthRedirect } from "../../../Hok/withAuthRedirect";
import { withRouter } from "../../../Hok/withRouter";
import { compose } from "redux";
import { isMe } from "../../../Hok/isMe";
import { getPosts, getProfile, getProfileStatus, getUpdateAvaIsFetching } from '../../../redux/selectors/profileSelector';
import { getMeId } from '../../../redux/selectors/isAuthSelector';

const ProfileContainer = (props) => {
	let userId = props.params.userId || props.meId
	useEffect(() => {
		if (userId) {
			props.getUserProfileThunkCreator(userId)
			props.getStatusThunkCreator(userId)
		} else {
			userId = props.meId;
		}
	}, [props.params.userId, props.meId])


	const updateStatus = useCallback((newStaus) => {
		props.updateStatusThuncCreator(newStaus)
	}, [props.profileStatus])

	const updateAvatar = async (avatar) => {
		await props.addAvatarThuckCreator(avatar)
		props.getUserProfileThunkCreator(userId)
	}
	const handlePutUserData = async (data) => {
		await props.putProfileDataThuncCreator(data)
		props.getUserProfileThunkCreator(userId)
	}

	return (
		<Profile
			isMe={props.isMe}
			{...props.profile}
			onAddPost={props.onAddPost}
			setUrlCurrent={props.setUrlCurrent}
			profileStatus={props.profileStatus}
			updateStatus={updateStatus}
			updateAvatar={updateAvatar}
			updateAvaIsFetching={props.updateAvaIsFetching}

			handlePutUserData={handlePutUserData}
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: getProfile(state),
		posts: getPosts(state),
		profileStatus: getProfileStatus(state),
		meId: getMeId(state),
		updateAvaIsFetching: getUpdateAvaIsFetching(state)
	}
}

const mapDispatchToProps = {
	onAddPost,
	getUserProfileThunkCreator,
	getStatusThunkCreator,
	updateStatusThuncCreator,
	addAvatarThuckCreator,
	putProfileDataThuncCreator,
	
}

export default compose(
	withRouter,
	withAuthRedirect,
	isMe,
	connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)

