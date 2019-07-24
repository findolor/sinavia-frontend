import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default (NotchView = ({ color }) => {
    return <View style={[styles.notchContainer, { backgroundColor: color }]} />
})

const styles = StyleSheet.create({
    notchContainer: {
        height: hp(3.7),
        width: wp(100)
    }
})
