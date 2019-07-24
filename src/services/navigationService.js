import { Actions } from 'react-native-router-flux'
import { SCENE_KEYS } from '../config'

export const navigationReplace = (sceneKey, params) => {
    Actions.replace(sceneKey, params)
}

export const navigationReset = (sceneKey, params) => {
    Actions.reset(sceneKey, params)
}

export const navigationPush = (sceneKey, params) => {
    Actions.push(sceneKey, params)
}

export const navigationPop = (sceneKey, params) => {
    Actions.pop(sceneKey, params)
}

export { SCENE_KEYS }
