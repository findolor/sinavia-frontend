import React from 'react'
import {
    View,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Image,
    Alert
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import styles from './style'
import { userServices } from '../../../sagas/user'
import { flashMessages } from '../../../services/flashMessageBuilder'
import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import { navigationReset } from '../../../services/navigationService'
import { connect } from 'react-redux'
import { appActions } from '../../../redux/app/actions'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    emailOnChange = email => {
        this.setState({ email: email })
    }

    sendLinkOnPress = () => {
        this.props.lockUnlockButton()
        userServices
            .resetPassword(this.state.email)
            .then(data => {
                this.props.lockUnlockButton()

                flashMessages.generalMessage(
                    'Yeni şifren e-postana gönderildi!'
                )
                navigationReset('auth')
            })
            .catch(error => {
                console.log(error)
                this.props.lockUnlockButton()
                if (error.message === 'Network Error') return
            })
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <KeyboardAvoidingView
                    style={[styles.container]}
                    behavior={'position'}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={SINAVIA_LOGO}
                            style={[
                                {
                                    height: hp(45),
                                    resizeMode: 'contain',
                                    marginTop: hp(7),
                                    marginLeft: wp(9)
                                }
                            ]}
                        />
                    </View>
                    <View style={styles.textInputsContainer}>
                        <AuthTextInput
                            placeholder="E-posta"
                            placeholderTextColor="#8A8888"
                            onChangeText={email => this.emailOnChange(email)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>
                            Uygulamada kullanmakta olduğun e-posta'nı gir, biz
                            de sana şifreni yenilemen için bir link gönderelim.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            marginBottom={hp(6)}
                            color="#00D9EF"
                            buttonText="Gönder"
                            borderRadius={hp(1.5)}
                            fontSize={hp(3)}
                            onPress={this.sendLinkOnPress}
                            disabled={this.props.buttonLock}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => ({
    buttonLock: state.app.buttonLock
})

const mapDispatchToProps = dispatch => ({
    lockUnlockButton: () => dispatch(appActions.lockUnlockButton())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
