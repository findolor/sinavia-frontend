import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'
import returnLogo from '../../../assets/return.png'
import nebula from '../../../assets/cover.jpg'
import PROFILE_PIC from '../../../assets/profile2.jpg'

class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.saveButton}>
                            <Text style={styles.saveText}>Kaydet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        source={nebula}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                            <Image
                                source={PROFILE_PIC}
                                style={styles.profilePic}
                            />
                    </ImageBackground>
                </View>
                <View style={styles.textInputsContainer}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Ad</Text>
                            <Text style={styles.textInputTitle}>Soyad</Text>
                        </View>
                        <View style={styles.textInputView}>

                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Şehir</Text>
                        </View>
                        <View style={styles.textInputView}>

                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Doğum</Text>
                            <Text style={styles.textInputTitle}>Tarihi</Text>
                        </View>
                        <View style={styles.textInputView}>

                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.changePasswordButton}>
                        <Text style={styles.changePasswordText}>Şifre değiştir</Text>
                    </View>
                    <View style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Çıkış yap</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Settings
