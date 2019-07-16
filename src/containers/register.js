import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Switch} from 'react-native';
import { sceneKeys, navigationPush } from '../services/navigationService';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AuthButton} from '../components/authScreen/authButton'
import {AuthTextInput} from '../components/authScreen/authTextInput'

export default class Register extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            switchValue: false
        }
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source = {require('../assets/sinavia_logo_cut.png')}
                        style = {{
                            height: hp(12),
                            resizeMode: 'contain',
                            marginTop: hp(2.5)
                        }}/>
                </View>
                <View style={styles.allTextInputsContainer}>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='Kullanıcı Adı'/>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='Ad Soyad'/>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='Doğum Tarihi'/>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='Şehir'/>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='E-Posta'/>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='Şifre'/>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput placeholder='Şifreeeee'/>
                    </View>
                </View>
                <View style={styles.toggleContainer}>
                    <Switch
                        style={{ marginLeft: wp(7.5)  }}
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue}
                        onTintColor="#00D9EF"
                        thumbTintColor="#00D9EF"
                        tintColor="#efefef"
                    />
                    <Text style={styles.toggleText}>Kullanıcı sözleşmesini okudum ve kabul ediyorum.</Text>
                </View>
                <AuthButton color='#00D9EF' underlayColor='#1a5d63' buttonText='Kayıt Ol' onPress={() => {}}/>
                <View style={styles.gotoLoginContainer}>
                    <Text style={styles.gotoLoginText1}>Zaten bir hesabın var mı?</Text>
                    <TouchableOpacity onPress={() => {
                        navigationPush(sceneKeys.login)
                    }}>
                        <Text style={styles.gotoLoginText2}>Giriş Yap</Text>
                    </TouchableOpacity>
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
        height: hp(15),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    allTextInputsContainer: {
        height: hp(63),
        width: wp(100),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textInputBorderContainer: {
        height: hp(9),
        width: wp(100),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggleContainer: {
        height: hp(5),
        width: wp(100),
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    gotoLoginContainer: {
        height: hp(5.7),
        width: wp(85),
        borderColor: '#989696',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    toggleText: {
        marginTop: wp(2.2),
        fontSize: hp(1.7),
        color: '#7A7878'
    },
    gotoLoginText1: {
        color: '#7A7878',
        fontSize: hp(2),
        marginTop: hp(1),
        marginRight: wp(1),
    },
    gotoLoginText2: {
        color: '#00D9EF',
        fontSize: hp(2),
        marginTop: hp(1),
        marginRight: wp(1),
    }
});
