import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import Profile from './Profile';
import {getStatusThunkCreator, getUserProfileThunkCreator, onAddPost} from "../../../redux/profileReducer";
import { withAuthRedirect } from "../../../Hok/withAuthRedirect";
import { withRouter } from "../../../Hok/withRouter";
import { compose } from "redux";
import { isMe } from "../../../Hok/isMe";
import {getIsFollowered, getPosts, getProfile, getPutFetching} from '../../../redux/selectors/profileSelector';
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

	return (
		<Profile
			isMe={props.isMe}
			{...props.profile}
			onAddPost={props.onAddPost}
			setUrlCurrent={props.setUrlCurrent}
			profileStatus={props.profileStatus}
			updateAvaIsFetching={props.updateAvaIsFetching}
			putFetching={props.putFetching}
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: getProfile(state),
		posts: getPosts(state),
		meId: getMeId(state),
		putFetching: getPutFetching(state),
	}
}

const mapDispatchToProps = {
	onAddPost,
	getUserProfileThunkCreator,
	getStatusThunkCreator
}

export default compose(
	withRouter,
	withAuthRedirect,
	isMe,
	connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)

