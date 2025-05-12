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
    loginUser(email, password, rememberMe) {
        return (
            inctance
                .post('auth/login', {email, password, rememberMe})
                .then(response => response)
        )
    },
    logoutUser() {
        return (
            inctance
                .delete('auth/login',)
                .then(response => response.data)
        )
    }
}
export const profileAPI = {
    getUserProfile(userId) {
        return (
            inctance
                .get(`profile/${userId}`)
                .then(response => response.data)
        )
    },
    getProfileStatus(userId) {
        console.trace()
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
    }
}
