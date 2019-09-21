import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import {
    SCENE_KEYS,
    navigationPush,
    navigationPop,
    navigationReset
} from '../../../services/navigationService'
import { deviceStorage } from '../../../services/deviceStorage'
import { connect } from 'react-redux'
// Picture imports
import returnLogo from '../../../assets/return.png'
import EDIT from '../../../assets/edit.png'

class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    changePasswordOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.changePassword)
    }

    logoutButtonOnPress = async () => {
        await deviceStorage.clearDeviceStorage()
        navigationReset('auth')
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
                        source={{
                            uri: this.props.clientInformation.coverPicture
                        }}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <View style={styles.editImgView}>
                            <TouchableOpacity>
                                <Image source={EDIT} style={styles.editImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profilePicView}>
                            <ImageBackground
                                source={{
                                    uri: this.props.clientInformation
                                        .profilePicture
                                }}
                                style={styles.profilePic}
                                imageStyle={{ borderRadius: 100 }}
                            >
                                <View style={styles.editProfilePicView}>
                                    <TouchableOpacity>
                                        <Image
                                            source={EDIT}
                                            style={styles.editImg}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.textInputsContainer}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Ad</Text>
                            <Text style={styles.textInputTitle}>Soyad</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                placeholder={
                                    this.props.clientInformation.name +
                                    ' ' +
                                    this.props.clientInformation.lastname
                                }
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                /* onChangeText={email =>
                                    this.emailOnChange(email)
                                } */
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Şehir</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                placeholder={this.props.clientInformation.city}
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                /* onChangeText={email =>
                                    this.emailOnChange(email)
                                } */
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Doğum</Text>
                            <Text style={styles.textInputTitle}>Tarihi</Text>
                        </View>
                        <View style={styles.textInputView}>
                            {
                                // TODO turn this into the same thing in register screen
                            }
                            <TextInput
                                placeholder={
                                    this.props.clientInformation.birthDate
                                }
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                /* onChangeText={email =>
                                    this.emailOnChange(email)
                                } */
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.changePasswordOnPress}>
                        <View style={styles.changePasswordButton}>
                            <Text style={styles.changePasswordText}>
                                Şifre değiştir
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logoutButtonOnPress}>
                        <View style={styles.logoutButton}>
                            <Text style={styles.logoutText}>Çıkış yap</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Settings)
