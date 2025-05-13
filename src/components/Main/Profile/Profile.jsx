import styles from './Profile.module.css'
import MainDesc from './MainDesc/MainDesc';
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../../Preloader/Preloader";
import { AddPostForm } from './Addpost/Addpost';
function Profile(props) {
    if (props.profile) {
        return (
            <main className={styles.main}>
                <MainDesc
                    profile={props.profile}
                    urlCurrnet={props.urlCurrnet}
                    profileStatus={props.profileStatus}
                    updateStatus={props.updateStatus}
                    isMe={props.isMe}
                    apdateAvatar={props.apdateAvatar}
                    updateAvaIsFetching={props.updateAvaIsFetching}
                    handleActivePanel={props.handleActivePanel}
                    activePanel={props.activePanel}
                    handlePutUserData={props.handlePutUserData}
                />
                {
                    (props.isMe)
                        ? <AddPostForm
                            isMe={props.isMe}
                            onAddPost={props.onAddPost}
                        />
                        : <div>Посты пользователя: </div>
                }

                <MyPosts
                    profile={props.profile}
                    posts={props.posts}
                />
            </main>
        )
    } else {
        return <Preloader />
    }
}


export default Profile;