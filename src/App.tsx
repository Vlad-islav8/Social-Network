import './App.css';
import {lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from './components/Main/Nav/Nav';
import ProfileContainer from './components/Main/Profile/ProfileContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import {useDispatch, useSelector} from 'react-redux';
import {appInitializeThunkCreator} from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
import {getInitialize} from './redux/selectors/appSelector';
import {getIsAuth} from './redux/selectors/isAuthSelector';
import {VoidFunction} from "./components/Types";

const Music = lazy(() => import('./components/Main/Music/Music'))
const Settings = lazy(() => import('./components/Main/Settings/Settings'))
const DialogsContainer = lazy(() => import('./components/Main/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('./components/Main/Users/UsersContainer'))
const LoginContainer = lazy(() => import('./components/Main/Login/LoginContainer'))
const PageNotFound = lazy(() => import('./components/PageNotFound/PageNotFound'))

function App() {
    const initialize: boolean = useSelector(getInitialize)
    const isAuth: boolean = useSelector(getIsAuth)
    const dispatch = useDispatch()
    const [navPosition, setNavPosition] = useState<string>('left')

    useEffect(() => {
        dispatch(appInitializeThunkCreator())
    }, [dispatch])

    const handleNavPsoition: VoidFunction = () => {
        (navPosition === 'left') ? setNavPosition('top') : setNavPosition('left')
    }
    if (!initialize || isAuth === undefined) {
        return <Preloader/>
    }
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className='app-wrapper'>
                <HeaderContainer
                    navPosition={navPosition}
                    handleNavPsoition={handleNavPsoition}
                />
                <div className='app-content'>
                    {
                        (
                            navPosition === 'left' &&
                            <Nav
                                navPosition={navPosition}
                                handleNavPsoition={handleNavPsoition}
                            />
                        )
                    }
                    <main className='app-main'>
                        <div className='app-routes'>
                            <Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                                    <Route path="/" element={<ProfileContainer/>}/>
                                    <Route path="/dialogs" element={<DialogsContainer/>}/>
                                    <Route path="/users" element={<UsersContainer/>}/>
                                    <Route path="/music" element={<Music/>}/>
                                    <Route path="/settings" element={<Settings/>}/>
                                    <Route path="/login" element={<LoginContainer/>}/>
                                    <Route path="*" element={<PageNotFound/>}/>
                                </Routes>
                            </Suspense>
                        </div>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App