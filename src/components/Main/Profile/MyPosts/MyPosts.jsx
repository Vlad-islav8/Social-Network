import React, { useMemo } from 'react';
import styles from './MyPosts.module.css'
import MyPost from "./MyPost/MyPost";

function MyPosts(props) {
    
    useMemo(() => {

    })
    return (
        <div className={styles.posts}>
            {props.posts.map((el) => {
                return (
                    <MyPost post={el} profile={props.profile}/>
                )
            })}
        </div>
    )
}

export default MyPosts;