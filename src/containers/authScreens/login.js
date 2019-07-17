import React from 'react';
import { StyleSheet, Image, View, StatusBar, Text, TextInput, TouchableOpacity } from 'react-native'
import { sceneKeys, navigationPush } from '../../services/navigationService'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AuthButton} from '../../components/authScreen/authButton'
import {AuthTextInput} from '../../components/authScreen/authTextInput'

export default class Opening extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.imageContainer}>
                    <Image
                        source = {require('../../assets/sinavia_logo_cut.png')}
                        style = {{
                            height: hp(40),
                            resizeMode: 'contain',
                            marginTop: hp(10)
                        }}/>
                </View>
                <View style={styles.textInputsContainer}>
                    <AuthTextInput placeholder='Kullanıcı Adı veya E-Posta'/>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput}
                                   placeholder='Şifre'
                                   placeholderTextColor={'#8A8888'}
                        />
                        <TouchableOpacity onPress={() => {
                            navigationPush(sceneKeys.resetPassword)
                        }}>
                            <Text style={styles.forgetPasswordText}>Şifremi Unuttum</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton marginBottom={hp(6)} color='#00D9EF' underlayColor='#1a5d63' buttonText='Giriş Yap'/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
    },
    imageContainer: {
        height: hp(55),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        height: hp(20),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        height: hp(22),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#989696',
        backgroundColor: '#fcfcfc',
        flexDirection: 'row'
    },
    textInput: {
        marginLeft: wp(4),
        fontSize: hp(2)
    },
    forgetPasswordText: {
        fontFamily: 'Averta-Bold',
        color: '#00D9EF',
        fontSize: hp(2),
        marginTop: hp(1.85),
        marginLeft: wp(40),
    }
});
