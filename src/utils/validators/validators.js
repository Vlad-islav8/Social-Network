export const requiredInput = (value) => {
    if (value) return undefined
    return 'Обязательное поле'
}

export const maxLenghtCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Максимум ${maxLength} символов бро`
    return undefined
}

export const password = (value) => {
    if(value) {
        if (value.length < 4) return 'Минимум 4 символа'
        else if (value.length > 32) return 'Максимум 32 символа'
    }
    return undefined
}

export const ivReques = (value) => {
    if(value) return undefined
    return 'Пост не может быть пустым бро'
}