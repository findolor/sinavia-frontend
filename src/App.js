import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { RouterComp } from './config/routes'
import createStore from './redux'

const { store } = createStore()

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterComp />
            </Provider>
        )
    }
}
