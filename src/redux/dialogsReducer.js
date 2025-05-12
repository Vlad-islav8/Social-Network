const SET_USER_ACTIVE = 'dialog/SET-USER-ACTIVE'
const ADD_MESSAGE = 'dialog/ADD-MESSAGE'

let initialState = {
    users: [
        {
            id: 0,
            name: 'Дотер2004',
            ava: 'https://avatars.mds.yandex.net/i?id=b19a4945ca2a97815863e139714e8c5c_l-5235146-images-thumbs&n=13',
            messages: [
            ]
        },
        {
            id: 1,
            name: 'Адольф Дмитрий',
            ava: 'https://steamuserimages-a.akamaihd.net/ugc/2277200314615743772/2F6C6B2EE802E3B232679EDA7A61175646B34864/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
            messages: [
            ]
        },
        {
            id: 2,
            name: 'Семен',
            ava: 'https://avatars.mds.yandex.net/i?id=385341e8500f5cd8d0610bbcb25db5dcb26a5937-10375548-images-thumbs&ref=rim&n=33&w=200&h=200',
            messages: [
            ]
        },
        {
            id: 3,
            name: 'МамуЕбал',
            ava: 'https://avatars.mds.yandex.net/i?id=6a2bc21626ce8adc6d3fab1c35bcf39276e51d9c-12569441-images-thumbs&n=13',
            messages: [
            ]
        },
        {
            id: 4,
            name: 'Николас Кейдж',
            ava: 'https://avatars.mds.yandex.net/i?id=f01a8f4c8bd9af0fe04a1345ed458695_l-10766029-images-thumbs&n=13',
            messages: [
            ]
        },
        {
            id: 5,
            name: 'Анжеика',
            ava: 'https://avatars.mds.yandex.net/i?id=fb459c81c43586e46f571d724bae9689_l-5238850-images-thumbs&ref=rim&n=13&w=1280&h=720',
            messages: [
            ]
        },
        {
            id: 6,
            name: 'Владик',
            ava: 'https://avatars.mds.yandex.net/i?id=0d5f08c9975cc728f383746b28325a11_l-4828628-images-thumbs&n=13',
            messages: [
            ]
        },
    ],
    activeUser: null,
}
export const dialogsReducer = (state = initialState, action) => {
    let stateCopy = {...state}
    switch (action.type) {
        case SET_USER_ACTIVE:
            return {...state, activeUser: action.id}
        case ADD_MESSAGE: {
            debugger

            const newMessage = { message: action.message };
            return {
                ...state, // Создаем копию всего состояния
                users: state.users.map(user => { // Заменяем users новым массивом
                    if (user.id === action.id) {
                        return {
                            ...user, // Создаем копию пользователя
                            messages: user.messages.concat(newMessage) // Создаем новый массив сообщений
                        };
                    } else {
                        return user; // Возвращаем оригинального пользователя, если id не совпадает
                    }
                })
            };
        }
        default:
            return stateCopy
    }
}
export const setUserActive = (id) => ({type: SET_USER_ACTIVE, id})
export const addMessage = (message, id) => ({type: ADD_MESSAGE, message, id })
