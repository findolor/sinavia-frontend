import { AsyncStorage } from 'react-native'

export const deviceStorage = {
    saveItemToStorage: saveItemToStorage,
    getItemFromStorage: getItemFromStorage
}

const saveItemToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        // TODO Change console.log to something else
        console.log('AsyncStorage Error: ' + error.message)
    }
}

const getItemFromStorage = async key => {
    try {
        const item = await AsyncStorage.getItem(key)
        return item
    } catch (error) {
        // TODO Change console.log to something else
        console.log('AsyncStorage Error: ' + error.message)
    }
}

const clearDeviceStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        // TODO Change console.log to something else
        console.log('AsyncStorage Error: ' + error.message)
    }
}
