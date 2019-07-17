import React from 'react'
import { StyleSheet, Image, View, StatusBar, Text } from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen/authButton'
import { AuthTextInput } from '../../../components/authScreen/authTextInput'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './resetPasswordStyle'

export default class Opening extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.imageContainer}>
                    <Image
                        source={sinaviaLogo}
                        style={{
                            height: hp(45),
                            resizeMode: 'contain',
                            marginTop: hp(7)
                        }}
                    />
                </View>
                <View style={styles.textInputsContainer}>
                    <AuthTextInput
                        placeholder="Kullanıcı Adı veya E-posta   "
                        placeholderTextColor="#8A8888"
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        Uygulamada kullanmakta olduğun e-posta'nı gir, biz de
                        sana şifreni yenilemen için bir link gönderelim.
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        marginBottom={hp(6)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                    />
                </View>
            </View>
        )
    }
}
