import React from 'react';
import {StyleSheet, Image, View, Text, TextInput, Switch, TouchableOpacity} from 'react-native';
import { sceneKeys, navigationPush } from '../services/navigationService';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
                            height: hp(15),
                            resizeMode: 'contain',
                        }}/>
                </View>
                <View style={styles.allTextInputsContainer}>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="Kullanıcı Adı"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="Ad Soyad"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="Doğum Tarihi"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="Şehir"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="E-Posta"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="Şifre"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput}
                                       placeholder="Şifre Tekrar"
                                       placeholderTextColor={'#8A8888'}/>
                        </View>
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
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.button}
                            backgroundColor={"#00D9EF"}>
                            <Text style={styles.buttonText}>Kayıt Ol</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.gotoLoginContainer}>
                        <Text style={styles.gotoLoginText1}>Zaten bir hesabın var mı?</Text>
                        <TouchableOpacity onPress={() => {}}>
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
    gotoLoginContainer: {
        height: hp(5.7),
        width: wp(85),
        borderColor: '#989696',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        marginLeft: wp(4)
    },
    toggleText: {
        marginTop: wp(2.2),
        fontSize: hp(1.7),
        color: '#7A7878'
    },
    button: {
        width: wp(85),
        height: hp(7),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(1),
    },
    buttonText: {
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(2.5)
    },
    gotoLoginText1: {
        color: '#7A7878',
        fontSize: hp(2),
        marginRight: wp(1),
    },
    gotoLoginText2: {
        color: '#00D9EF',
        fontSize: hp(2),
        marginRight: wp(1),
    }
});
