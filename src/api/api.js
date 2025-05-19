import axios from "axios";

const inctance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "01aa8a6a-af03-4f99-8270-a02333a8ffde"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {
    getUsers(currenPages = 1, usersPages = 100) {
        return (
            inctance
                .get(`users?page=${currenPages}&count=${usersPages}`)
                .then(response => response.data)
        )
    },
    followUser(userId) {
        return (
            inctance
                .post(`follow/${userId}`, {}, )
                .then(response => response.data)
        )
    },
    unFollowUser(userId) {
        return (
            inctance
                .delete(`follow/${userId}`)
                .then(response => response.data)
        )
    }
}
export const authAPI = {
    getAuthUser() {
        return (
            inctance
                .get('auth/me')
                .then(response => response.data)
        )
    },
    loginUser(email, password, rememberMe, captcha) {
        return (
            inctance
                .post('auth/login', {email, password, rememberMe, captcha: false})
                .then(response => response)
        )
    },
    logoutUser() {
        return (
            inctance
                .delete('auth/login',)
                .then(response => response.data)
        )
    },
    capcha() {
        return (
            inctance
                .get('/security/get-captcha-url')
                .then(response => response.data)
        )
    }
}
export const profileAPI = {
    getUserProfile(userId) {
        if(!userId) {
            return
        }
        return (
            inctance
                .get(`profile/${userId}`)
                .then(response => response.data)
        )
    },
    putProfileData(data) {
        const valideteDAta = {
            AboutMe: data.aboutMe,
            userId: data.userId,
            lookingForAJob:  data.lookingForAJob,
            lookingForAJobDescription:  data.lookingForAJobDescription,
            fullName:  data.fullName,
            contacts: {
                github: data.contacts.github,
                vk: data.contacts.vk,
                facebook: data.contacts.facebook,
                instagram: data.contacts.instagram,
                twitter: data.contacts.twitter,
                website: data.contacts.website,
                youtube: data.contacts.youtube,
                mainLink: data.contacts.mainLink,
            },
        }
      return (
        inctance
            .put('profile', valideteDAta)
            .then(responce => responce.data)
      )
    },
    getProfileStatus(userId) {
        return (
            inctance
                .get(`profile/status/${userId}`)
                .then(responce => responce.data)
        )
    },
    updateProfileStatus(newStatus) {
        return (
            inctance
                .put('profile/status', {status: newStatus})
                .then(response => response.data)
        )
    },
    addAvatar(avatar) {
        const formData = new FormData()
        formData.append('Image', avatar)
        return (
            inctance
                .put('profile/photo', formData)
                .then(response => response.data)
        )
    },
    getFollowUser(userId) {
        return (
            inctance
                .get(`follow/${userId}`)
                .then(responce => responce.data)
        )
    }
}
