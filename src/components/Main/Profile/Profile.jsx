import styles from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../../Preloader/Preloader";
import {AddPostForm} from './Addpost/Addpost';
import MainDescContainer from "./MainDesc/MainDescContainer";

function Profile(props) {
    if (props.profile) {
        return (
            <main className={styles.main}>
                {(props.putFetching) ? <Preloader/> : <MainDescContainer />}
                <div className={styles.posts}>
                    {(props.isMe)
                        ?
                        <AddPostForm
                            isMe={props.isMe}
                            onAddPost={props.onAddPost}
                        />
                        :
                        <div className={styles.usersPosts}>Посты пользователя: </div>
                    }
                    <MyPosts
                        profile={props.profile}
                        posts={props.posts}
                    />
                </div>

            </main>
        )
    } else {
        return <Preloader/>
    }
}


export default Profile;