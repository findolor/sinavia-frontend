import { StyleSheet, Text, TextInput, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import React from 'react'

export default AuthTextInput = ({
    placeholder,
    placeholderTextColor,
    onChangeText,
    value,
    maxLength,
    borderColor
}) => {
    return (
        <View style={[styles.textInputContainer, { borderColor: borderColor }]}>
            <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
                maxLength={maxLength}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: wp(0.3),
        borderRadius: 10,
        borderColor: '#989696',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textInput: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        height: hp(7),
        width: wp(85),
        borderRadius: 10,
        paddingHorizontal: wp(4),
        color: '#2E313C'
    }
})
