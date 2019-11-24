const courseImages = {
    turkce: require('../assets/mainScreens/courseImages/turkce.png'),
    biyoloji: require('../assets/mainScreens/courseImages/biyoloji.png'),
    cografya: require('../assets/mainScreens/courseImages/cografya.png'),
    din: require('../assets/mainScreens/courseImages/din.png'),
    edebiyat: require('../assets/mainScreens/courseImages/edebiyat.png'),
    fen_bilimleri: require('../assets/mainScreens/courseImages/fen_bilimleri.png'),
    fizik: require('../assets/mainScreens/courseImages/fizik.png'),
    ingilizce: require('../assets/mainScreens/courseImages/ingilizce.png'),
    kimya: require('../assets/mainScreens/courseImages/kimya.png'),
    matematik: require('../assets/mainScreens/courseImages/matematik.png'),
    tarih: require('../assets/mainScreens/courseImages/tarih.png')
}

const backgroundImages = {
    turkce: require('../assets/gameScreens/backgroundImages/turkce.jpg'),
    biyoloji: require('../assets/gameScreens/backgroundImages/biyoloji.jpg'),
    cografya: require('../assets/gameScreens/backgroundImages/cografya.jpg'),
    din: require('../assets/gameScreens/backgroundImages/din.jpg'),
    edebiyat: require('../assets/gameScreens/backgroundImages/edebiyat.jpg'),
    fen_bilimleri: require('../assets/gameScreens/backgroundImages/fen_bilimleri.jpg'),
    fizik: require('../assets/gameScreens/backgroundImages/fizik.jpg'),
    ingilizce: require('../assets/gameScreens/backgroundImages/ingilizce.jpg'),
    kimya: require('../assets/gameScreens/backgroundImages/kimya.jpg'),
    matematik: require('../assets/gameScreens/backgroundImages/matematik.jpg'),
    tarih: require('../assets/gameScreens/backgroundImages/tarih.jpg')
}

export const chooseImage = (courseId, isBackground) => {
    switch (courseId) {
        case null:
            return null
        case 1:
        case 7:
            return isBackground === true
                ? backgroundImages.turkce
                : courseImages.turkce
        case 2:
        case 11:
            return isBackground === true
                ? backgroundImages.matematik
                : courseImages.matematik
        case 3:
        case 10:
            return isBackground === true
                ? backgroundImages.tarih
                : courseImages.tarih
        case 4:
            return isBackground === true
                ? backgroundImages.fen_bilimleri
                : courseImages.fen_bilimleri
        case 5:
            return isBackground === true
                ? backgroundImages.ingilizce
                : courseImages.ingilizce
        case 6:
            return isBackground === true
                ? backgroundImages.din
                : courseImages.din
        case 8:
            return isBackground === true
                ? backgroundImages.edebiyat
                : courseImages.edebiyat
        case 9:
            return isBackground === true
                ? backgroundImages.cografya
                : courseImages.cografya
        case 12:
            return isBackground === true
                ? backgroundImages.fizik
                : courseImages.fizik
        case 13:
            return isBackground === true
                ? backgroundImages.kimya
                : courseImages.kimya
        case 14:
            return isBackground === true
                ? backgroundImages.biyoloji
                : courseImages.biyoloji
    }
}
