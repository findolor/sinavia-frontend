import SInfo from 'react-native-sensitive-info'

const saveSensitiveItem = async (key, value) => {
    try {
        const data = await SInfo.setItem(key, value, {})
        return data
    } catch (error) {
        // TODO console.log
        console.log(error)
    }
}

const getSensitiveItem = async key => {
    try {
        const data = await SInfo.getItem(key)
        return data
    } catch (error) {
        // TODO console.log
        console.log(error)
    }
}

const deleteSensitiveItem = async key => {
    try {
        await SInfo.deleteItem(key)
    } catch (error) {
        // TODO console.log
        console.log(error)
    }
}

export const sensitiveStorage = {
    saveSensitiveItem: saveSensitiveItem,
    getSensitiveItem: getSensitiveItem,
    deleteSensitiveItem: deleteSensitiveItem
}
