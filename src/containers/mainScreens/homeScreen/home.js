import React from 'react'
import {
    Image,
    Modal,
    ScrollView,
    StatusBar,
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
import styles from './style'
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
} from '../../../components/mainScreen/carousel/static/courses'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../components/authScreen/authButton'
import profilePic from '../../../assets/profile2.jpg'
import x from '../../../assets/x.png'
import notificationLogo from '../../../assets/mainScreens/notification.png'
import {
    navigationPush,
    navigationReset,
    sceneKeys
} from '../../../services/navigationService'


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
            subject: '',
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            isModalVisible: false,
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
        this.setState({ isModalVisible: true, subject: title })
    }

    cards(sinav, index) {
        var choosenSubject
        var cardList = []
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
                <TouchableOpacity onPress={() => {
                    this.onPressCard(choosenSubject[i])
                }}>
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
                                source={x}
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
                                {this.state.subject}
                            </Text>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine} />
                            </View>
                            <View style={styles.gameModesContainer}>
                                <View style={styles.gameModeContainer}>
                                    <View style={styles.gameModeLogoContainer} />
                                    <View style={styles.gameModeContextContainer}>
                                        <Text style={styles.gameModeContextText}>
                                            Rastgele bir kullanıcı ile yarış
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.gameModeContainer}>
                                    <View style={styles.gameModeLogoContainer} />
                                    <View style={styles.gameModeContextContainer}>
                                        <Text style={styles.gameModeContextText}>
                                            Arkadaşın ile yarış
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.gameModeContainer}>
                                    <View style={styles.gameModeLogoContainer} />
                                    <View style={styles.gameModeContextContainer}>
                                        <Text style={styles.gameModeContextText}>
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
                    <View style={styles.header}>
                        <View style={styles.profilePicContainer}>
                            <TouchableOpacity>
                                <Image
                                    source={profilePic}
                                    style={styles.profilePic}
                                />
                            </TouchableOpacity>
                        </View>
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
                        <View style={styles.notificationLogoContainer}>
                            <TouchableOpacity>
                                <Image
                                    source={notificationLogo}
                                    style={styles.notificationLogo}
                                />
                            </TouchableOpacity>
                        </View>
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
