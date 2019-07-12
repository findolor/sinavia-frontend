import { Actions } from 'react-native-router-flux'

export const navigationReplace = sceneKey => {
    Actions.replace(sceneKey)
}

export const navigationReset = sceneKey => {
    Actions.reset(sceneKey)
}
