import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { RouterComp } from './config/routes'
import createStore from './redux'
import { StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'

const { store } = createStore()

console.disableYellowBox = true

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <StatusBar hidden={true} />
                <RouterComp />
                <FlashMessage position="top" />
            </Provider>
        )
    }
}
