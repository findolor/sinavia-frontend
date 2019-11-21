import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default AuthButton = ({
    height,
    width,
    color,
    buttonText,
    onPress,
    marginTop,
    marginLeft,
    marginBottom,
    borderRadius,
    fontSize,
    position,
    disabled
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: color },
                { marginTop: marginTop },
                { marginBottom: marginBottom },
                { height: height },
                { width: width },
                { borderRadius: borderRadius },
                { position: position },
                { marginLeft: marginLeft }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.buttonText, { fontSize: fontSize }]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: hp(18),
        width: wp(100),
        backgroundColor: '#efefef',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        width: wp(85),
        height: hp(7),
        borderRadius: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(2.5)
    }
})
