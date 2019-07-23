import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default (NotchView = () => {
    return <View style={styles.notchContainer} />
})

const styles = StyleSheet.create({
    notchContainer: {
        height: hp(4),
        width: wp(100)
    }
})
