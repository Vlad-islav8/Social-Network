import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/Main/Nav/Nav';
import Music from './components/Main/Music/Music'
import Settings from './components/Main/Settings/Settings'
import DialogsContainer from './components/Main/Dialogs/DialogsContainer';
import ProfileContainer from './components/Main/Profile/ProfileContainer';
import UsersContainer from './components/Main/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Main/Login/LoginContainer";
import { useEffect } from 'react';
import { compose } from 'redux';
import { withRouter } from './Hok/withRouter';
import { connect } from 'react-redux';
import { appInitializeThunkCreator } from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { getInitialize } from './redux/selectors/appSelector';
import { getIsAuth } from './redux/selectors/isAuthSelector';

function App(props) {
    useEffect(() => {
        props.appInitializeThunkCreator()
    }, [props.appInitializeThunkCreator])

    if (!props.initialize || props.isAuth === undefined) {
        return <Preloader />
    }
    return (
        <BrowserRouter>
            <div className='wrapper'>
                <HeaderContainer />
                <div className='mainContainer'>
                    <Nav />
                    <div className='routes'>
                        <Routes>
                            <Route path="/profile/:userId?" element={<ProfileContainer />} />
                            <Route path="/" element={<ProfileContainer />} />
                            <Route path="/dialogs" element={<DialogsContainer />} />
                            <Route path="/users" element={<UsersContainer />} />
                            <Route path="/music" element={<Music />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/login" element={<LoginContainer />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
let mapStateToProps = (state) => ({
    initialize: getInitialize(state),
    isAuth: getIsAuth(state)
});

export default compose(
    withRouter,
    connect(mapStateToProps, { appInitializeThunkCreator })
)(App);

