import {StyleSheet, TextInput, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from "react";

const AuthTextInput = ({ placeholder, onChangeText, value }) => {
    return (
        <View style={styles.textInputBorderContainer}>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput}
                           placeholder={placeholder}
                           placeholderTextColor={'#8A8888'}
                           onChangeText={onChangeText}
                           value={value}
                />
            </View>
        </View>
    );
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
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#989696',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textInput: {
        marginLeft: wp(4),
        fontSize: hp(2)
    },
});

export { AuthTextInput };