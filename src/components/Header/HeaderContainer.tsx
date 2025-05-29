import React, {useEffect} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUserThunkCreator, loginOutUserThuncCreator,} from "../../redux/authReducer";
import { profileType} from "../../redux/profileReducer";
import {getMainProfile,} from "../../redux/selectors/profileSelector";
import {VoidFunction} from "../Types";
import {getIsAuth, getLogin, getUserId} from "../../redux/selectors/authSelectors";

interface HeaderContainerPropsType {
    navPosition: string
    handleNavPsoition:VoidFunction
}

const HeaderContainer:React.FC<HeaderContainerPropsType> = ({navPosition, handleNavPsoition}) => {
    const dispatch = useDispatch()
    const isAuth:boolean = useSelector(getIsAuth)
    const login:string = useSelector(getLogin)
    const userId:number = useSelector(getUserId)
    const profile:profileType = useSelector(getMainProfile)

    useEffect(() => {
        dispatch(getAuthUserThunkCreator())
    },[getAuthUserThunkCreator])

    const hanldeLogOut = () => {
        dispatch(loginOutUserThuncCreator())
    }
    return (
        <Header
            navPosition={navPosition}
            handleNavPsoition={handleNavPsoition}
            isAuth={isAuth}
            login={login}
            userId={userId}
            profile={profile}
            hanldeLogOut={hanldeLogOut}
        />
    )
}

export default HeaderContainer