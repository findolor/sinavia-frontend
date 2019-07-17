import React from 'react'
import { StyleSheet, Image, StatusBar, View, Text } from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen/authButton'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './openingStyle'

export default class Opening extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.imageContainer}>
                    <Image
                        source={sinaviaLogo}
                        style={{
                            height: hp(40),
                            resizeMode: 'contain',
                            marginTop: hp(3)
                        }}
                    />
                    <Text style={styles.sinaviaText}>Sınavia</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                        onPress={() => {
                            navigationPush(sceneKeys.login)
                        }}
                    />
                    <AuthButton
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Kayıt Ol"
                        onPress={() => {
                            navigationPush(sceneKeys.register)
                        }}
                    />
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorOr}>{'veya'}</Text>
                    <View style={styles.separatorLine} />
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        color="#4267B2"
                        underlayColor="#170c5a"
                        buttonText="Facebook ile Bağlan"
                    />
                    <AuthButton
                        color="#0F9D58"
                        underlayColor="#144012"
                        buttonText="Google ile Bağlan"
                    />
                </View>
            </View>
        )
    }
}
