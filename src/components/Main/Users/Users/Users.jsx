import React from "react";
import styles from './Users.module.css';
import { Link } from "react-router-dom";
import PageNavigate from "../PageNavigate/PageNavigate";

function Users(props) {
    const onHandleFollow = (userId, action) => {
        props.folowUserThuncCreator(userId, action)
    }
    return (
        <div className={styles.usersBlock}>
            <PageNavigate
                onPageChanged={props.onPageChanged}
                currenPages={props.currenPages}
                totalUsersCount={props.totalUsersCount}
                usersPages={props.usersPages}
                setPageNumberActive={props.setPageNumberActive}
                activePage={props.activePage}
            />
            {
                props.users.map((el) => {
                    return (
                        <div className={styles.userCard} key={el.id}>
                            <div className={styles.ava}>
                                <Link to={`/profile/${el.id}`}>
                                    <img
                                        src={(el.photos.small === null)
                                            ? "https://justvision.org/sites/default/files/2019-11/ofer-shinar.png"
                                            : el.photos.small} alt="Аватар"
                                    />
                                </Link>

                            </div>
                            <div className={styles.moreInfoBlock}>
                                <div className={styles.userInfo}>
                                    <div className={styles.mainInfo}>
                                        <h1>{el.name}</h1>
                                        <h2>
                                            {(el.status) && <span>{el.status}</span>}
                                        </h2>
                                    </div>
                                </div>
                                {
                                    (el.followed)
                                        ?
                                        <button
                                            className={styles.folowBtn}
                                            disabled={props.folowingFetching.some(id => id === el.id)}
                                            onClick={() => {
                                                onHandleFollow(el.id, 'unFollow')
                                            }}>Отписаться</button>
                                        :
                                        <button
                                            className={styles.folowBtn}
                                            disabled={props.folowingFetching.some(id => id === el.id)}
                                            onClick={() => {
                                                onHandleFollow(el.id, 'follow')
                                            }}
                                        >Подписаться</button>
                                }
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Users;