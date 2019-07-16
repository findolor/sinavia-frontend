import React from 'react';
import {StyleSheet, TouchableHighlight, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AuthButton = ({ color, onPressedColor, underlayColor, buttonText, onPress, marginTop, marginBottom }) => {
    return (
        <TouchableHighlight style={[styles.button, {backgroundColor: color}, {marginTop: marginTop}, {marginBottom: marginBottom}]}
                            underlayColor={underlayColor}
                            onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: hp(18),
        width: wp(100),
        backgroundColor: '#efefef',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        width: wp(85),
        height: hp(7),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(2.5)
    },
});

export { AuthButton };
