import { AsyncStorage } from 'react-native'

const saveItemToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        // TODO Change console.log to something else
        console.log('AsyncStorage Error: ' + error.message)
    }
}

const getItemFromStorage = async key => {
    try {
        const item = await AsyncStorage.getItem(key)
        return JSON.parse(item)
    } catch (error) {
        // TODO Change console.log to something else
        console.log('AsyncStorage Error: ' + error.stack)
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

const getAllKeysStorage = async () => {
    try {
        return await AsyncStorage.getAllKeys()
    } catch (error) {
        // TODO Change console.log to something else
        console.log('AsyncStorage Error: ' + error.message)
    }
}

export const deviceStorage = {
    saveItemToStorage: saveItemToStorage,
    getItemFromStorage: getItemFromStorage,
    clearDeviceStorage: clearDeviceStorage,
    getAllKeysStorage: getAllKeysStorage
}
