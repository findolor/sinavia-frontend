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
import * as courses from '../../../components/mainScreen/carousel/static/courses'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../components/authScreen/authButton'
import profilePic from '../../../assets/profile2.jpg'
import closeButton from '../../../assets/x.png'
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

const SELECTED_MODE_COLOR = '#00D9EF'
const EMPTY_MODE_COLOR = '#fcfcfc'

const RANKED_SELECTED_IMAGE = require('../../../assets/mainScreens/tek_beyaz.png')
const RANKED_EMPTY_IMAGE = require('../../../assets/mainScreens/tek.png')
const FRIENDS_SELECTED_IMAGE = require('../../../assets/mainScreens/arkadas.png')
const FRIENDS_EMPTY_IMAGE = require('../../../assets/mainScreens/arkadas_siyah.png')
const GROUP_SELECTED_IMAGE = require('../../../assets/mainScreens/group.png')
const GROUP_EMPTY_IMAGE = require('../../../assets/mainScreens/group_siyah.png')

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: 'YKS',
            subject: '',
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            isModalVisible: false,
            // Mode button variables
            rankedModeButtonBackground: EMPTY_MODE_COLOR,
            friendsModeButtonBackground: EMPTY_MODE_COLOR,
            groupModeButtonBackground: EMPTY_MODE_COLOR,
            // Mode images
            rankedImage: RANKED_EMPTY_IMAGE,
            friendsImage: FRIENDS_EMPTY_IMAGE,
            groupImage: GROUP_EMPTY_IMAGE,
            // Selected game mode
            selectedGameMode: ''
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
                    choosenSubject = courses.lgsTurkce
                    break
                case 1:
                    choosenSubject = courses.lgsMat
                    break
                case 2:
                    choosenSubject = courses.lgsTarih
                    break
                case 3:
                    choosenSubject = courses.lgsFen
                    break
                case 4:
                    choosenSubject = courses.lgsIng
                    break
                case 5:
                    choosenSubject = courses.lgsDin
                    break
                default:
                    choosenSubject = courses.lgsTurkce
                    break
            }
        } else if (sinav === 'YKS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.yksTurkce
                    break
                case 1:
                    choosenSubject = courses.yksCog
                    break
                case 2:
                    choosenSubject = courses.yksTarih
                    break
                case 3:
                    choosenSubject = courses.yksMat
                    break
                case 4:
                    choosenSubject = courses.yksFizik
                    break
                case 5:
                    choosenSubject = courses.yksKimya
                    break
                default:
                    choosenSubject = courses.yksBiyo
                    break
            }
        }

        for (let i = 0; i < choosenSubject.length; i++) {
            cardList.push(
                <TouchableOpacity
                    onPress={() => {
                        this.onPressCard(choosenSubject[i])
                    }}
                    key={i}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{choosenSubject[i]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return cardList
    }

    updateModeButtonUI = gameMode => {
        switch (gameMode) {
            case 'ranked':
                this.state.rankedImage === RANKED_EMPTY_IMAGE
                    ? this.setState({
                          rankedImage: RANKED_SELECTED_IMAGE,
                          rankedModeButtonBackground: SELECTED_MODE_COLOR
                      })
                    : this.setState({
                          rankedImage: RANKED_EMPTY_IMAGE,
                          rankedModeButtonBackground: EMPTY_MODE_COLOR
                      })
                this.setState({
                    friendsImage: FRIENDS_EMPTY_IMAGE,
                    friendsModeButtonBackground: EMPTY_MODE_COLOR,
                    groupImage: GROUP_EMPTY_IMAGE,
                    groupModeButtonBackground: EMPTY_MODE_COLOR,
                    selectedGameMode: gameMode
                })
                return
            case 'friend':
                this.state.friendsImage === FRIENDS_EMPTY_IMAGE
                    ? this.setState({
                          friendsImage: FRIENDS_SELECTED_IMAGE,
                          friendsModeButtonBackground: SELECTED_MODE_COLOR
                      })
                    : this.setState({
                          friendsImage: FRIENDS_EMPTY_IMAGE,
                          friendsModeButtonBackground: EMPTY_MODE_COLOR
                      })
                this.setState({
                    rankedImage: RANKED_EMPTY_IMAGE,
                    rankedModeButtonBackground: EMPTY_MODE_COLOR,
                    groupImage: GROUP_EMPTY_IMAGE,
                    groupModeButtonBackground: EMPTY_MODE_COLOR,
                    selectedGameMode: gameMode
                })
                return
            case 'group':
                this.state.groupImage === GROUP_EMPTY_IMAGE
                    ? this.setState({
                          groupImage: GROUP_SELECTED_IMAGE,
                          groupModeButtonBackground: SELECTED_MODE_COLOR
                      })
                    : this.setState({
                          groupImage: GROUP_EMPTY_IMAGE,
                          groupModeButtonBackground: EMPTY_MODE_COLOR
                      })
                this.setState({
                    friendsImage: FRIENDS_EMPTY_IMAGE,
                    friendsModeButtonBackground: EMPTY_MODE_COLOR,
                    rankedImage: RANKED_EMPTY_IMAGE,
                    rankedModeButtonBackground: EMPTY_MODE_COLOR,
                    selectedGameMode: gameMode
                })
        }
    }

    modeButtonOnPress = selectedMode => {
        this.updateModeButtonUI(selectedMode)
    }

    playButtonOnPress = () => {
        navigationReset('game')
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
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ isModalVisible: false })
                            }}
                        >
                            <Image source={closeButton} style={styles.xLogo} />
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
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.modeButtonOnPress('ranked')
                                        }
                                    >
                                        <View
                                            style={[
                                                styles.gameModeLogoContainer,
                                                {
                                                    backgroundColor: this.state
                                                        .rankedModeButtonBackground
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={this.state.rankedImage}
                                                style={styles.rankedModeImage}
                                            />
                                        </View>
                                    </TouchableOpacity>
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
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.modeButtonOnPress('friend')
                                        }
                                    >
                                        <View
                                            style={[
                                                styles.gameModeLogoContainer,
                                                {
                                                    backgroundColor: this.state
                                                        .friendsModeButtonBackground
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={this.state.friendsImage}
                                                style={styles.friendsModeImage}
                                            />
                                        </View>
                                    </TouchableOpacity>
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
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.modeButtonOnPress('group')
                                        }
                                    >
                                        <View
                                            style={[
                                                styles.gameModeLogoContainer,
                                                {
                                                    backgroundColor: this.state
                                                        .groupModeButtonBackground
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={this.state.groupImage}
                                                style={styles.groupModeImage}
                                            />
                                        </View>
                                    </TouchableOpacity>
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
                            onPress={this.playButtonOnPress}
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
