import React from 'react'
import { Image, StatusBar, View, Text } from 'react-native'
import { navigationPush } from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './style'

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
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                        onPress={() => {
                            navigationPush(SCENE_KEYS.login)
                        }}
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Kayıt Ol"
                        onPress={() => {
                            navigationPush(SCENE_KEYS.register)
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
                        height={hp(7)}
                        width={wp(85)}
                        color="#4267B2"
                        underlayColor="#170c5a"
                        buttonText="Facebook ile Bağlan"
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#0F9D58"
                        underlayColor="#144012"
                        buttonText="Google ile Bağlan"
                    />
                </View>
            </View>
        )
    }
}
