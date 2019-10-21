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
    value
}) => {
    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputBorderContainer: {
        height: hp(9),
        width: wp(100),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: wp(0.3),
        borderRadius: 10,
        borderColor: '#989696',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textInput: {
        fontFamily: 'Averta-Regular',
        marginLeft: wp(4),
        fontSize: hp(2),
        color: '#000'
    }
})
