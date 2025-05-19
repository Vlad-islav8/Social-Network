import { connect } from "react-redux";
import { followUserThunkCreator, getUsersThunkCreator, setPageNumberActive } from "../../../redux/usersReducer";
import { activePage } from "../../../redux/usersReducer";
import { withAuthRedirect } from "../../../Hok/withAuthRedirect";
import { compose } from "redux";
import { getCurrenPages, getFolowingFetching, getIsFetching, getTotalUsersCount, getUsers, getUsersPages, } from "../../../redux/selectors/usersSelectors";
import { getIsAuth } from "../../../redux/selectors/isAuthSelector";
import { useEffect } from "react";
import Users from "./Users/Users";
import Preloader from "../../Preloader/Preloader";

const UserContainer = (props) => {
    useEffect(() => {
        props.getUsersThunkCreator(props.currenPages, props.usersPages)
    }, [props.currenPages, props.usersPages])

    const onPageChanged = (el) => {
        props.activePage(el)
        props.getUsersThunkCreator(el, props.usersPages)
    }
    if(!props.isFetching) {
        return (
            <Users
                totalUsersCount={props.totalUsersCount}
                usersPages={props.usersPages}
                currenPages={props.currenPages}
                activePage={props.activePage}
                users={props.users}
                folowingFetching={props.folowingFetching}
                setFolowingFetching={props.setFolowingFetching}
                onPageChanged={onPageChanged}
                folowUserThuncCreator={props.followUserThunkCreator}
                setPageNumberActive={props.setPageNumberActive}
            />
        )
    } else {
        return <Preloader/>
    }
    
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        usersPages: getUsersPages(state),
        currenPages: getCurrenPages(state),
        isFetching: getIsFetching(state),
        folowingFetching: getFolowingFetching(state),
        isAuth: getIsAuth(state),
    }
}

let mapDispatchToProps = {
    activePage,
    getUsersThunkCreator,
    followUserThunkCreator,
    setPageNumberActive
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(UserContainer)

