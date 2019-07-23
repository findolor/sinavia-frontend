import { Actions } from 'react-native-router-flux'
import { SCENE_KEYS } from '../config'

export const navigationReplace = sceneKey => {
    Actions.replace(sceneKey)
}

export const navigationReset = sceneKey => {
    Actions.reset(sceneKey)
}

export const navigationPush = sceneKey => {
    Actions.push(sceneKey)
}

export const navigationPop = sceneKey => {
    Actions.pop(sceneKey)
}

export { SCENE_KEYS }
