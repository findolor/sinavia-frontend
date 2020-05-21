import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
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
    disabled,
    image,
    imageStyle
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
                { marginLeft: marginLeft },
                { flexDirection: image !== undefined ? 'row' : 'column' },
                {
                    paddingHorizontal: image !== undefined ? wp(13) : wp(0)
                },
                {
                    justifyContent:
                        image !== undefined ? 'space-around' : 'center'
                }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text
                allowFontScaling={false}
                style={[styles.buttonText, { fontSize: fontSize }]}
            >
                {buttonText}
            </Text>

            {image && <Image source={image} style={imageStyle} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
