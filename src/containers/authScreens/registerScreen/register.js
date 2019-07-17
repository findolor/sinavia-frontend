import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    Switch
} from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen/authButton'
import { AuthTextInput } from '../../../components/authScreen/authTextInput'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './registerStyle'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValue: false
        }
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.imageContainer}>
                    <Image
                        source={sinaviaLogo}
                        style={{
                            height: hp(15),
                            resizeMode: 'contain',
                            marginTop: hp(2.5)
                        }}
                    />
                </View>
                <View style={styles.allTextInputsContainer}>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Kullanıcı Adı "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Ad Soyad "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Doğum Tarihi "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Şehir "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="E-Posta "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Şifre "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Şifre (Tekrar)"
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                </View>
                <View style={styles.toggleContainer}>
                    <Switch
                        style={{ marginLeft: wp(7.5) }}
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue}
                        onTintColor="#00D9EF"
                        thumbTintColor="#00D9EF"
                        tintColor="#efefef"
                    />
                    <View style={styles.licenseTextContainer}>
                        <Text style={styles.toggleText}>
                            Kullanıcı sözleşmesini okudum ve kabul ediyorum.
                        </Text>
                    </View>
                </View>
                <AuthButton
                    color="#00D9EF"
                    underlayColor="#1a5d63"
                    buttonText="Kayıt Ol"
                    onPress={() => {}}
                />
                <View style={styles.gotoLoginContainer}>
                    <Text style={styles.gotoLoginText1}>
                        Zaten bir hesabın var mı?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigationPush(sceneKeys.login)
                        }}
                    >
                        <Text style={styles.gotoLoginText2}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
