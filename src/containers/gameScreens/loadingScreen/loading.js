import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './style'

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameMode: {
                ranked: 'rankedRoom'
            }
        }
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.container}>
                <Text>Aaaa</Text>
            </View>
        )
    }
}

export default LoadingScreen
