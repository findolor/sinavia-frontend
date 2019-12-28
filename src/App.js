import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { RouterComp } from './config/routes'
import createStore from './redux'
import { StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { AppearanceProvider } from 'react-native-appearance'
import { Client } from 'bugsnag-react-native'
import { BUGSNAG_API_KEY } from './config'

const { store } = createStore()

console.disableYellowBox = true

// Global variable for bugsnag
global.bugsnag = new Client(BUGSNAG_API_KEY)

export default class App extends Component {
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
