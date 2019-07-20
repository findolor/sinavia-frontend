import React from 'react'
import { Image, View, StatusBar, Text, Keyboard, Animated } from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './style'

const IMAGE_HEIGHT = hp(45)
const IMAGE_HEIGHT_SMALL = hp(35)
export default class Opening extends React.Component {
    constructor(props) {
        super(props)

        this.keyboardHeight = new Animated.Value(0)
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT)
    }

    componentDidMount() {
        this.keyboardWillShowSub = Keyboard.addListener(
            'keyboardWillShow',
            this.keyboardWillShow
        )
        this.keyboardWillHideSub = Keyboard.addListener(
            'keyboardWillHide',
            this.keyboardWillHide
        )
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height - hp(20)
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL
            })
        ]).start()
    }

    keyboardWillHide = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
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
