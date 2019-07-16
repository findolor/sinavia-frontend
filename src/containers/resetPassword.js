import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { sceneKeys, navigationPush } from '../services/navigationService'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AuthButton} from '../components/authScreen/authButton'
import {AuthTextInput} from '../components/authScreen/authTextInput'

export default class Opening extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source = {require('../assets/sinavia_logo_cut.png')}
                        style = {{
                            height: hp(45),
                            resizeMode: 'contain',
                            marginTop: hp(7)
                        }}/>
                </View>
                <View style={styles.textInputsContainer}>
                    <AuthTextInput placeholder='Kullanıcı Adı veya E-Posta'/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Uygulamada kullanmakta olduğun e-posta'nı gir, biz de sana şifreni yenilemen için bir link gönderelim.</Text>
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
        backgroundColor: 'white',
    },
    imageContainer: {
        height: hp(55),
        width: wp(100),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        height: hp(10),
        width: wp(100),
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonContainer: {
        height: hp(16),
        width: wp(100),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        height: hp(7),
        width: wp(100),
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textStyle: {
        color: '#8A8888',
        fontSize: hp(2),
        marginLeft: wp(8),
    }
});
