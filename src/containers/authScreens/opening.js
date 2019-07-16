import React from 'react';
import {StyleSheet, Image, View, Text } from 'react-native';
import { sceneKeys, navigationPush } from '../../services/navigationService'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AuthButton} from '../../components/authScreen/authButton'

export default class Opening extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source = {require('../../assets/sinavia_logo_cut.png')}
                        style = {{
                            height: hp(40),
                            resizeMode: 'contain',
                            marginTop: hp(3)
                        }}/>
                    <Text style={styles.sinaviaText}>Sınavia</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton color='#00D9EF' underlayColor='#1a5d63' buttonText='Giriş Yap' onPress={() => {
                        navigationPush(sceneKeys.login)
                    }}/>
                    <AuthButton color='#00D9EF' underlayColor='#1a5d63' buttonText='Kayıt Ol' onPress={() => {
                        navigationPush(sceneKeys.register)
                    }}/>
                </View>
                <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorOr}>{'veya'}</Text>
                    <View style={styles.separatorLine} />
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton color='#4267B2' underlayColor='#170c5a' buttonText='Facebook ile Bağlan'/>
                    <AuthButton color='#0F9D58' underlayColor='#144012' buttonText='Google ile Bağlan'/>
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
        backgroundColor: '#efefef',
    },
    imageContainer: {
        height: hp(55),
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        height: hp(18),
        width: wp(100),
        backgroundColor: '#efefef',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    sinaviaText: {
        fontFamily: 'Intelligent Design - Averta-ExtraBoldItalic',
        fontSize: hp(10),
        resizeMode: 'contain',
        color: '#00D9EF',
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(0),
        backgroundColor: '#efefef',
        height: hp(3),
        width: wp(85)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.1),
        height: hp(0.1),
        borderColor: '#9B9FA4'
    },
    separatorOr: {
        fontFamily: 'Intelligent Design - Averta-Semibold',
        color: '#9B9FA4',
        marginHorizontal: 8
    }
});
