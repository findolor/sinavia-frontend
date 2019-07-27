import React from 'react'
import {
    View,
    StatusBar,
    Text,
    Keyboard,
    Animated,
    Platform
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './style'

const IMAGE_HEIGHT = hp(45)
const IMAGE_HEIGHT_SMALL = hp(35)
const ANIMATION_DURATION = 100

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.keyboardHeight = new Animated.Value(0)
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT)
    }

    componentDidMount() {
        let keyboardShowEvent =
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        let keyboardHideEvent =
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

        this.keyboardShowSub = Keyboard.addListener(
            keyboardShowEvent,
            this.keyboardShow
        )
        this.keyboardHideSub = Keyboard.addListener(
            keyboardHideEvent,
            this.keyboardHide
        )
    }

    componentWillUnmount() {
        this.keyboardShowSub.remove()
        this.keyboardHideSub.remove()
    }

    keyboardShow = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: ANIMATION_DURATION,
                toValue: event.endCoordinates.height - hp(15)
            }),
            Animated.timing(this.imageHeight, {
                duration: ANIMATION_DURATION,
                toValue: IMAGE_HEIGHT_SMALL
            })
        ]).start()
    }

    keyboardHide = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: ANIMATION_DURATION,
                toValue: 0
            }),
            Animated.timing(this.imageHeight, {
                duration: ANIMATION_DURATION,
                toValue: IMAGE_HEIGHT
            })
        ]).start()
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    { paddingBottom: this.keyboardHeight }
                ]}
            >
                <StatusBar hidden />
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={sinaviaLogo}
                        style={[
                            {
                                height: hp(45),
                                resizeMode: 'contain',
                                marginTop: hp(7)
                            },
                            { height: this.imageHeight }
                        ]}
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
                        height={hp(7)}
                        width={wp(85)}
                        marginBottom={hp(6)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                    />
                </View>
            </Animated.View>
        )
    }
}
