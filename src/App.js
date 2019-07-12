import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Router from 'src/config/routes'
import createStore from 'src/redux'

const { store } = createStore()

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}
