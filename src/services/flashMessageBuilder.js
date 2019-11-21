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
        })
}
