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
    nameError: (props = {}) =>
        showMessage({
            message: 'Ad hatası',
            description: 'Ad sadece harflerden oluşmalıdır',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }),
    lastnameError: (props = {}) =>
        showMessage({
            message: 'Soyad hatası',
            description: 'Soyad sadece harflerden oluşmalıdır',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }),
    usernameError: (props = {}) =>
        showMessage({
            message: 'Kullanıcı adı hatası',
            description: 'Kullanıcı adı sadece harf veya rakamlardan oluşabilir',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }),
    blankSpaceError: (props = {}) =>
        showMessage({
            message: 'Boş alan hatası',
            description: 'Bütün alanları doldurmalısın',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }),
    passwordCharacterLengthError: (props = {}) =>
        showMessage({
            message: 'Şifre hatası',
            description: 'Şifren en az 6, en fazla 16 karakterden oluşmalıdır',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }),
    spaceCharacterInPasswordError: (props = {}) =>
        showMessage({
            message: 'Şifre hatası',
            description: 'Şifren içerisinde boşluk bulunmamalıdır',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }),
    passwordsNotMatchError: (props = {}) =>
        showMessage({
            message: 'Şifre hatası',
            description: 'Şifreler birbiriyle uyuşmamaktadır',
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        })
}
