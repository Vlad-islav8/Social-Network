import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import styles from './LoginButton.module.css';
import { profileType } from "../../../redux/profileReducer";
import { VoidFunction } from "../../Types";
import handle from "../../../utils/customHooks";


interface LoginButtonProps {
    profile: profileType;
    isAuth: boolean;
    hanldeLogOut: VoidFunction;
}

interface LoginPopupProps {
    isLoggedIn: boolean;
    isActive: boolean;
    handleLogoutLocal: VoidFunction;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isLoggedIn, isActive, handleLogoutLocal }) => {
    return (
        <div className={`${styles.popup} ${isActive ? styles.active : ''}`}>
            {isLoggedIn && (
                <button onClick={handleLogoutLocal} disabled={!isActive}>
                    Выйти
                </button>
            )}
        </div>
    );
};

export const LoginButton: React.FC<LoginButtonProps> = ({ profile, isAuth, hanldeLogOut }) => {
    const [isPopupActive, setIsPopupActive] = useState(false);

    const isLoggedIn = isAuth && !!profile;

    const togglePopup = () => {
        handle(isPopupActive, setIsPopupActive);
    };

    const closePopup = () => {
        setIsPopupActive(false);
    };

    const handleLogoutLocal = () => {
        hanldeLogOut();
        closePopup();
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.mainButton}>
                {isLoggedIn ? (
                    <div className={styles.profileInfo}>
                        {profile.photos.small && (
                            <Link to='/profile'>
                                <img
                                    src={profile.photos.small}
                                    className={styles.avatar}
                                    alt="Аватар"
                                />
                            </Link>
                        )}
                        <button onClick={togglePopup}>
                            <p>{profile.fullName}</p>
                        </button>
                    </div>
                ) : (
                    <div className={styles.loginLink}>
                        <NavLink to='/login'>Войти в аккаунт</NavLink>
                    </div>
                )}
            </div>

            <LoginPopup
                isLoggedIn={isLoggedIn}
                isActive={isPopupActive}
                handleLogoutLocal={handleLogoutLocal}
            />
        </div>
    );
};