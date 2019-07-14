import { Actions } from 'react-native-router-flux'
import { sceneKeys } from '../config/routes'

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

export { sceneKeys }
