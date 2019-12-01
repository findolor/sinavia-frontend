import { showMessage } from 'react-native-flash-message'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export const flashMessages = {
    generalMessage: message =>
        showMessage({
            message: message,
            description: '',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            backgroundColor: 'white'
        }),
    generalError: (message, description) =>
        showMessage({
            message: message,
            description: description,
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            backgroundColor: 'white'
        }),
    networkError: () =>
        showMessage({
            message: 'Bağlantı hatası',
            description: 'Sunucu bağlantı hatası',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            backgroundColor: 'white'
        }),
    emailError: message =>
        showMessage({
            message: 'E-posta hatası',
            description: message,
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            backgroundColor: 'white'
        }),
    passwordError: () =>
        showMessage({
            message: 'Şifre hatası',
            description: 'Lütfen şifreni kontrol et',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            backgroundColor: 'white'
        }),
    authInfosOrSettingsError: (message, description, props = {}) =>
        showMessage({
            message: message,
            description: description,
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        })
}
