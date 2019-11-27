import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput
} from 'react-native'
import Swiper from 'react-native-swiper'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import { navigationReset } from '../../services/navigationService'

import styles from './style'

import firstPageTutorialImg from '../../assets/tutorialScreen/firstPageTutorialImg.png'
import secondPageTutorialImg from '../../assets/tutorialScreen/secondPageTutorialScreen.png'
import thirdPageTutorialImg from '../../assets/tutorialScreen/thirdPageTutorialScreen.png'
import fourthPageTutorialImg from '../../assets/tutorialScreen/fourthPageTutorialScreen.png'

import SINAVIA_LOGO from '../../assets/sinavia_logo_cut.png'

class Tutorial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
    }

    goToOpeningScreen = () => {
        navigationReset('auth')
    }

    goToLastIndex = () => {
        this.setState({
            currentPage: 3
        })
        this.refs.swiper.scrollBy(3)
    }

    updatePagination = index => {
        this.setState({
            currentPage: index
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref="swiper"
                    index={this.state.currentPage}
                    onIndexChanged={index => this.updatePagination(index)}
                    autoplay={false}
                    loop={false}
                    loadMinimal={false}
                    showsPagination={true}
                    scrollEnabled={true}
                    paginationStyle={{ bottom: hp(2) }}
                    activeDot={
                        <View
                            style={{
                                height: hp(1.5),
                                width: hp(1.5),
                                backgroundColor: '#FF9900',
                                borderRadius: hp(100),
                                marginBottom: hp(2),
                                marginLeft: wp(1),
                                marginRight: wp(1)
                            }}
                        />
                    }
                    dot={
                        <View
                            style={{
                                height: hp(1.5),
                                width: hp(1.5),
                                backgroundColor: '#D2D2D2',
                                borderRadius: hp(100),
                                marginBottom: hp(2),
                                marginLeft: wp(1),
                                marginRight: wp(1)
                            }}
                        />
                    }
                >
                    <View style={styles.onePageTutorialView}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity
                                style={styles.skipButton}
                                onPress={this.goToLastIndex}
                            >
                                <Text style={styles.skipButtonText}>Atla</Text>
                            </TouchableOpacity>
                            <Image
                                source={firstPageTutorialImg}
                                style={[styles.iconImg, { width: hp(25) }]}
                            />
                        </View>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                Sınavia'ya hoş geldin!
                            </Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}>
                                Başarı basamaklarını beraber çıkmaya ne dersin?
                                Sınavia ile sen de kazanacaksın!
                            </Text>
                        </View>
                    </View>
                    <View style={styles.onePageTutorialView}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={secondPageTutorialImg}
                                style={[styles.iconImg, { width: hp(25) }]}
                            />
                        </View>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                Eğlenerek soru çöz
                            </Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}>
                                İster dereceli, istersen arkadaşın veya arkadaş
                                grubunla soru çözerek yarış!
                            </Text>
                        </View>
                    </View>
                    <View style={styles.onePageTutorialView}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={thirdPageTutorialImg}
                                style={[
                                    styles.iconImg,
                                    { resizeMode: 'contain' }
                                ]}
                            />
                        </View>
                        <View style={styles.headerTextContainer}>
                            <Text
                                style={[
                                    styles.headerText,
                                    { fontSize: hp(4.2) }
                                ]}
                            >
                                Kaçırdığın soru kalmasın
                            </Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}>
                                Tüm derslerinin istatistiklerini takip et,
                                dilediğin soruyu favorile veya paylaş!
                            </Text>
                        </View>
                    </View>
                    <View style={styles.onePageTutorialView}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={fourthPageTutorialImg}
                                style={[
                                    styles.iconImg,
                                    {
                                        resizeMode: 'contain',
                                        height: hp(20),
                                        marginBottom: hp(4.8)
                                    }
                                ]}
                            />
                        </View>
                        <View
                            style={[styles.headerTextContainer, { flex: 11 }]}
                        >
                            <Text
                                style={[
                                    styles.headerText,
                                    { fontSize: hp(3.2), marginBottom: hp(0) }
                                ]}
                            >
                                Türkiye geneli sıralamalara katıl
                            </Text>
                        </View>
                        <View style={[styles.infoTextContainer, { flex: 39 }]}>
                            <Text
                                style={[
                                    styles.infoText,
                                    { marginTop: hp(4.2) }
                                ]}
                            >
                                Ülke geneli sıralamalar ve canlı deneme
                                sınavları seni bekliyor. Kendini göster, bu
                                heyecana sen de ortak ol!
                            </Text>
                            <TouchableOpacity
                                style={styles.startButton}
                                onPress={() => this.goToOpeningScreen()}
                            >
                                <Text style={styles.skipButtonText}>BAŞLA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Swiper>
            </View>
        )
    }
}

export default Tutorial
