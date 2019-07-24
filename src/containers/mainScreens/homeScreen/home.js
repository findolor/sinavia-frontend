import React from 'react'
import {
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import Carousel from 'react-native-snap-carousel'
import {
    sliderWidth,
    itemWidth
} from '../../../components/mainScreen/carousel/styles/SliderEntry.style'
import SliderEntry from '../../../components/mainScreen/carousel/components/SliderEntry'
import carouselStyle from '../../../components/mainScreen/carousel/styles/index.style'
import { LGS, YKS } from '../../../components/mainScreen/carousel/static/exams'
import {
    lgsTurkce,
    lgsMat,
    lgsTarih,
    lgsFen,
    lgsIng,
    lgsDin,
    yksTurkce,
    yksCog,
    yksTarih,
    yksMat,
    yksFizik,
    yksKimya,
    yksBiyo
} from '../../../components/mainScreen/carousel/static/subjects'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../components/authScreen/authButton'
import homeDolu from '../../../assets/mainScreens/home_dolu.png'
import { navigationPush, navigationReset, sceneKeys } from '../../../services/navigationService'

const IS_ANDROID = Platform.OS === 'android'
const SLIDER_1_FIRST_ITEM = 0
const exams = [
    'YKS',
    'LGS',
    'KPSS',
    'ALES',
    'DGS',
    'Dil Sınavları',
    'TUS',
    'DUS',
    'EUS',
    'Ehliyet Sınavları'
]

const examList = {
    YKS: YKS,
    LGS: LGS
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: 'YKS',
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            isModalVisible: false
        }
    }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        )
    }

    pickerSelect(idx, value) {
        this.setState({
            exam: value
        })
    }

    onPressCard(title) {
        this.setState({ isModalVisible: true, subjectName: title })
    }

    cards(sinav, index) {
        var choosenSubject
        var cardList = []
        var cardColor
        if (sinav === 'LGS') {
            switch (index) {
                case 0:
                    choosenSubject = lgsTurkce
                    break
                case 1:
                    choosenSubject = lgsMat
                    break
                case 2:
                    choosenSubject = lgsTarih
                    break
                case 3:
                    choosenSubject = lgsFen
                    break
                case 4:
                    choosenSubject = lgsIng
                    break
                case 5:
                    choosenSubject = lgsDin
                    break
                default:
                    choosenSubject = lgsTurkce
                    break
            }
        } else if (sinav === 'YKS') {
            switch (index) {
                case 0:
                    choosenSubject = yksTurkce
                    break
                case 1:
                    choosenSubject = yksCog
                    break
                case 2:
                    choosenSubject = yksTarih
                    break
                case 3:
                    choosenSubject = yksMat
                    break
                case 4:
                    choosenSubject = yksFizik
                    break
                case 5:
                    choosenSubject = yksKimya
                    break
                default:
                    choosenSubject = yksBiyo
                    break
            }
        }

        for (let i = 0; i < choosenSubject.length; i++) {
            cardList.push(
                <TouchableOpacity onPress={this.onPressCard.bind(this)}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{choosenSubject[i]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return cardList
    }

    render() {
        const card = this.cards(this.state.exam, this.state.slider1ActiveSlide)
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#000000DE',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ isModalVisible: false })
                            }}
                        >
                            <Image
                                source={homeDolu}
                                style={{
                                    resize: 'contain',
                                    height: hp(5),
                                    width: hp(5),
                                    marginTop: hp(5),
                                    marginLeft: wp(77)
                                }}
                            />
                        </TouchableOpacity>
                        <View style={styles.modalView}>
                            <Text style={styles.modalSubjectText}>
                                Paragrafta Anlam
                            </Text>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine} />
                            </View>
                            <View style={styles.gameModesContainer}>
                                <View style={styles.gameModeContainer}>
                                    <View
                                        style={styles.gameModeLogoContainer}
                                    />
                                    <View
                                        style={styles.gameModeContextContainer}
                                    >
                                        <Text
                                            style={styles.gameModeContextText}
                                        >
                                            Rastgele bir kullanıcı ile yarış
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.gameModeContainer}>
                                    <View
                                        style={styles.gameModeLogoContainer}
                                    />
                                    <View
                                        style={styles.gameModeContextContainer}
                                    >
                                        <Text
                                            style={styles.gameModeContextText}
                                        >
                                            Arkadaşın ile yarış
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.gameModeContainer}>
                                    <View
                                        style={styles.gameModeLogoContainer}
                                    />
                                    <View
                                        style={styles.gameModeContextContainer}
                                    >
                                        <Text
                                            style={styles.gameModeContextText}
                                        >
                                            Arkadaş grubun ile yarış
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <AuthButton
                            marginTop={hp(2)}
                            height={hp(7)}
                            width={wp(87.5)}
                            color="#00D9EF"
                            underlayColor="#1a5d63"
                            buttonText="Başla"
                        />
                    </View>
                </Modal>
                <View style={{ height: hp(60), marginTop: hp(0) }}>
                    <View style={styles.pickerContainer}>
                        <DropDown
                            style={styles.picker}
                            textStyle={styles.pickerText}
                            dropdownTextStyle={styles.pickerDropdownText}
                            dropdownStyle={styles.pickerDropdown}
                            options={exams}
                            defaultValue={this.state.exam}
                            onSelect={(idx, value) =>
                                this.pickerSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            zIndex={-1}
                            ref={c => (this._slider1Ref = c)}
                            data={examList[this.state.exam]}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                            firstItem={SLIDER_1_FIRST_ITEM}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.65}
                            // inactiveSlideShift={20}
                            containerCustomStyle={carouselStyle.slider}
                            contentContainerCustomStyle={
                                carouselStyle.sliderContentContainer
                            }
                            loop={false}
                            onSnapToItem={index =>
                                this.setState({ slider1ActiveSlide: index })
                            }
                        />
                    </View>
                    <ScrollView
                        style={styles.cardsScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {card}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    bottomBar: {
        height: hp(9),
        width: wp(100),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#00D9EF',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: hp(91),
        flexDirection: 'row',
        position: 'absolute'
    },
    scrollViewContainer: {
        backgroundColor: 'green',
        alignItems: 'center'
    },
    cardsScrollView: {
        height: hp(58),
        width: wp(87),
        marginTop: hp(33),
        marginLeft: wp(6.5),
        marginRight: wp(6.5),
        position: 'absolute',
        backgroundColor: '#fcfcfc'
    },
    card: {
        height: hp(9),
        width: wp(87),
        borderWidth: wp(0.6),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginBottom: hp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#F7941E',
        fontSize: hp(3.3)
    },
    carouselContainer: {
        height: hp(25),
        marginTop: hp(0),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfc'
    },
    pickerContainer: {
        height: hp(8.5),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    picker: {
        height: hp(6),
        width: wp(30),
        margin: 8,
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 10
    },
    pickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdown: {
        height: hp(50.5),
        width: wp(30),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 10,
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    },
    modalView: {
        backgroundColor: '#ffffff',
        height: hp(44),
        width: wp(87.5),
        marginTop: hp(15),
        borderColor: '#27AAE1',
        borderWidth: 3,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSubjectText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#F7941E',
        fontSize: hp(3.3)
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fcfcfc',
        height: hp(3),
        width: wp(75)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.2),
        height: hp(0.1),
        borderColor: '#D9D9D9'
    },
    gameModesContainer: {
        height: hp(30),
        width: wp(75),
        backgroundColor: 'red'
    },
    gameModeContainer: {
        height: hp(10),
        width: wp(75),
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    gameModeLogoContainer: {
        height: hp(10),
        width: wp(33),
        backgroundColor: 'white'
    },
    gameModeContextContainer: {
        height: hp(10),
        width: wp(42),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    gameModeContextText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        color: '#A8A8A8'
    }
})
