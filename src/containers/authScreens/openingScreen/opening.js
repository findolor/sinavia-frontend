import React from 'react'
import { Image, View, Text } from 'react-native'
import { navigationPush } from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen'
import styles from './style'
import NotchView from '../../../components/notchView'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'

export default class Opening extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.imageContainer}>
                    <Image
                        source={SINAVIA_LOGO}
                        style={{
                            height: hp(35),
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
                        borderRadius={10}
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.login)
                        }}
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Kayıt Ol"
                        borderRadius={10}
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.register)
                        }}
                    />
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <View style={styles.separatorOrView}>
                        <Text style={styles.separatorOrText}>{'veya'}</Text>
                    </View>
                    <View style={styles.separatorLine} />
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#4267B2"
                        borderRadius={10}
                        buttonText="Facebook ile Bağlan"
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#0F9D58"
                        borderRadius={10}
                        buttonText="Google ile Bağlan"
                    />
                </View>
                <View style={styles.spaceView} />
            </View>
        )
    }
}
