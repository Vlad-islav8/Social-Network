import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/Main/Nav/Nav';
import ProfileContainer from './components/Main/Profile/ProfileContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import { compose } from 'redux';
import { withRouter } from './Hok/withRouter';
import { connect } from 'react-redux';
import { appInitializeThunkCreator } from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
import { getInitialize } from './redux/selectors/appSelector';
import { getIsAuth } from './redux/selectors/isAuthSelector';
import {CursorShadow} from "./components/CursorShadow/CursorShadow";
const Music = lazy(() => import('./components/Main/Music/Music'))
const Settings = lazy(() => import('./components/Main/Settings/Settings'))
const DialogsContainer = lazy(() => import('./components/Main/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('./components/Main/Users/UsersContainer'))
const LoginContainer = lazy(() => import('./components/Main/Login/LoginContainer'))

const PageNotFound = lazy(() => import('./components/PageNotFound/PageNotFound'))
function App(props) {

    const [mouseY, setMouseY] = useState(null)
    const [mouseX, setMouseX] = useState(null)
    useEffect(() => {
        props.appInitializeThunkCreator()
    }, [props.appInitializeThunkCreator])

    if (!props.initialize || props.isAuth === undefined) {
        return <Preloader />
    }
    const hadnleMouseMove = (event) => {
        setMouseY(event.clientY)
        setMouseX(event.clientX)
    }

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className='wrapper' onMouseMove={hadnleMouseMove}>
                <div className='appContainer'>
                    <HeaderContainer />
                    <div className='mainContainer'>
                        <Nav/>
                        <div className='routes'>
                            <Routes>
                                <Route path="/profile/:userId?" element={
                                    <ProfileContainer/>
                                } />
                                <Route path="/" element={<ProfileContainer />} />
                                <Route path="/dialogs" element={
                                    <Suspense fallback={<Preloader />}>
                                        <DialogsContainer />
                                    </Suspense>
                                } />
                                <Route path="/users" element={
                                    <Suspense fallback={<Preloader />}>
                                        <UsersContainer />
                                    </Suspense>
                                } />
                                <Route path="/music" element={
                                    <Suspense fallback={<Preloader />}>
                                        <Music />
                                    </Suspense>
                                } />
                                <Route path="/settings" element={
                                    <Suspense fallback={<Preloader />}>
                                        <Settings />
                                    </Suspense>
                                } />
                                <Route path="/login" element={
                                    <Suspense fallback={<Preloader />}>
                                        <LoginContainer />
                                    </Suspense>
                                } />
                                <Route path="*" element={
                                    <Suspense fallback={<Preloader />}>
                                        <PageNotFound />
                                    </Suspense>
                                } />
                            </Routes>
                        </div>
                    </div>
                </div>
                <CursorShadow mouseY={mouseY} mouseX={mouseX} />
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

