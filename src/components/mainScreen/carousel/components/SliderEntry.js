import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import styles from '../styles/SliderEntry.style'

export default class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }

    render() {
        const {
            data: { illustration }
        } = this.props

        return (
            <View>
                <ImageBackground
                    source={illustration}
                    imageStyle={{ borderRadius: hp(5) }}
                    style={styles.image}
                />
            </View>
        )
    }
}
