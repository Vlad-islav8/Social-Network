import React from 'react';
import styles from './MyPost.module.css'
import Preloader from "../../../../Preloader/Preloader";
import { Link } from 'react-router-dom';

function MyPost(props) {
    return (
        (!props.profile) ?
            <Preloader /> :
            <div className={styles.ithem}>
                <div className={styles.nameInfo}>
                    <Link to={`/profile/${props.profile.userId}`}>
                        <img src={(!props.profile.photos.small) ?
                            'https://avatars.mds.yandex.net/i?id=a95692d28a1ba4af61b2f17b0d9f7f7297fe617b-5875773-images-thumbs&n=13'
                            : props.profile.photos.small}
                            alt='' />
                        <h2>{props.profile.fullName}</h2>
                    </Link>

                </div>
                <div className={styles.post}>
                    <p>{props.post.text}</p>
                </div>
            </div>
    )
}

export default MyPost;