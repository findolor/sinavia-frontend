import SInfo from 'react-native-sensitive-info'

export const sensitiveStorage = {
    saveSensitiveItem: saveSensitiveItem,
    getSensitiveItem: getSensitiveItem,
    deleteSensitiveItem: deleteSensitiveItem
}

const saveSensitiveItem = async (key, value) => {
    try {
        await SInfo.setItem(key, value, {})
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
