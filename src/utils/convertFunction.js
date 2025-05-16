const convertFunction = (contacts, imageArr) => {
    if (contacts) {
        const resultFunc = (Obj) => {
            const NewArr = []
            for (let i = 0; i < Object.keys(Obj).length; i++) {
                const imageItem = imageArr.find(el => el.name === Object.keys(Obj)[i])
                const newItem = {id: i, name: Object.keys(Obj)[i], link: Object.values(Obj)[i], icon: imageItem?.link || null}
                NewArr.push(newItem)
            }
            return NewArr
        }
        const result = resultFunc(contacts)
        return result
    }
}

export default convertFunction