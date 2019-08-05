import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './style'
import { navigationReset } from '../../services/navigationService'

const APP_LOGO = require('../../assets/sinavia_logo_cut.png')

export default class SplashScreen extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        setTimeout(() => {
            navigationReset('auth')
        }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={APP_LOGO} style={styles.appLogo} />
                <Text style={styles.sinaviaText}>Sınavia</Text>
            </View>
        )
    }
}
