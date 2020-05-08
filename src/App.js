import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { RouterComp } from './config/routes'
import createStore from './redux'
import { StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { AppearanceProvider } from 'react-native-appearance'
import { Client } from 'bugsnag-react-native'
import { BUGSNAG_API_KEY } from './config'
import RNIap from 'react-native-iap'

const { store } = createStore()

console.disableYellowBox = true

// Global variable for bugsnag
global.bugsnag = new Client(BUGSNAG_API_KEY)

export default class App extends Component {
    async componentDidMount() {
        await this.inAppInitConnection()
    }

    inAppInitConnection = async () => {
        try {
            const result = await RNIap.initConnection()
            //await RNIap.consumeAllItemsAndroid()
            console.log('result', result)
        } catch (err) {
            console.warn(err.code, err.message)
        }
    }

    render() {
        return (
            <Provider store={store}>
                <StatusBar hidden={true} />
                <AppearanceProvider>
                    <RouterComp />
                </AppearanceProvider>
                <FlashMessage position="top" />
            </Provider>
        )
    }
}
