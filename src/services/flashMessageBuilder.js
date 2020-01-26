import { showMessage } from 'react-native-flash-message'

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
            backgroundColor: 'white',
            duration: 5000
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
            backgroundColor: 'white',
            duration: 5000
        }),
    generalErrorWithProps: (message, description, props = {}) =>
        showMessage({
            message: message,
            description: description,
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            backgroundColor: 'white',
            duration: 5000,
            ...props
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
            backgroundColor: 'white',
            duration: 5000
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
            backgroundColor: 'white',
            duration: 5000
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
            backgroundColor: 'white',
            duration: 5000
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
            ...props,
            duration: 5000
        })
}
