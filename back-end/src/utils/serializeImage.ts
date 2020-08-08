const serializePointImage = (pointImage: String) => {
    return `http://192.168.100.6:3333/images/uploads/${pointImage}`
};

const serializeItemImage = (itemImage: String) => {
    return `http://192.168.100.6:3333/images/${itemImage}`
}

export { serializeItemImage, serializePointImage };