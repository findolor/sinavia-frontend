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

export const navigationPop = (isWantedRefresh, params) => {
    if (isWantedRefresh === undefined) isWantedRefresh = false
    if (isWantedRefresh) {
        switch (params.popScreen) {
            case SCENE_KEYS.mainScreens.friendsList:
                Actions.pop()
                setTimeout(() => {
                    Actions.refresh({ friendsList: params.friendsList })
                }, 700)
            //Actions.refresh({ friendsList: params.friendsList })
        }
    } else Actions.pop()
}

export const navigationRefresh = () => {
    Actions.refresh()
}

export { SCENE_KEYS }
