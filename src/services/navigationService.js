import { Actions } from 'react-native-router-flux'

export const navigationReplace = sceneKey => {
    Actions.replace(sceneKey)
}

export const navigationReset = sceneKey => {
    Actions.reset(sceneKey)
}

export const navigationPush = () => {
    Actions.push()
}

export const navigationPop = () => {
    Actions.pop()
}
