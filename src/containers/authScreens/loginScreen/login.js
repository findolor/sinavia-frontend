import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen/authButton'
import { AuthTextInput } from '../../../components/authScreen/authTextInput'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './loginStyle'

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
                            marginTop: hp(10)
                        }}
                    />
                </View>
                <View style={styles.textInputsContainer}>
                    <AuthTextInput
                        placeholder="Kullanıcı Adı veya E-Posta"
                        placeholderTextColor="#8A8888"
                    />
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Şifre"
                            placeholderTextColor={'#8A8888'}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                navigationPush(sceneKeys.resetPassword)
                            }}
                        >
                            <Text style={styles.forgetPasswordText}>
                                Şifremi Unuttum
                            </Text>
                        </TouchableOpacity>
                    </View>
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
