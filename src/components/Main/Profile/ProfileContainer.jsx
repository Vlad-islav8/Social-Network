import { connect } from 'react-redux';
import React, { useCallback, useEffect } from 'react'
import Profile from './Profile';
import {
	getStatusThunkCreator,
	getUserProfileThunkCreator,
	onAddPost,
	updateStatusThuncCreator,
} from "../../../redux/profileReducer";
import {withAuthRedirect} from "../../../Hok/withAuthRedirect";
import {withRouter} from "../../../Hok/withRouter";
import {compose} from "redux";
import {isMe} from "../../../Hok/isMe";
import { getPosts, getProfile, getProfileStatus } from '../../../redux/selectors/profileSelector';
import { getMeId } from '../../../redux/selectors/isAuthSelector';

const ProfileContainer = (props) => {
	useEffect(() => {
		let userId = props.params.userId || props.meId
		if (userId){
			props.getUserProfileThunkCreator(userId)
			props.getStatusThunkCreator(userId)
		} else {
			userId = props.meId;
		}
	}, [props.params.userId, props.meId])

	
	const updateStatus = useCallback((newStaus) => {
		props.updateStatusThuncCreator(newStaus)
	}, [props.profileStatus])
	return (
		<Profile
			isMe={props.isMe}
			{...props.profile}
			onAddPost={props.onAddPost}
			setUrlCurrent={props.setUrlCurrent}
			profileStatus={props.profileStatus}
			updateStatus={updateStatus}
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: getProfile(state),
		posts: getPosts(state),
		profileStatus: getProfileStatus(state),
		meId: getMeId(state)
	}
}

const mapDispatchToProps = {
	onAddPost,
	getUserProfileThunkCreator,
	getStatusThunkCreator,
	updateStatusThuncCreator,
}

export default compose(
	withRouter,
	withAuthRedirect,
	isMe,
	connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)

