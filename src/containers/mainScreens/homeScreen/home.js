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
import { connect } from 'react-redux'
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

import CLOSE_BUTTON from '../../../assets/closeButton.png'
import NOTIFICATION_LOGO from '../../../assets/mainScreens/notification.png'

import {
    navigationPush,
    navigationReset,
    SCENE_KEYS
} from '../../../services/navigationService'
import NotchView from '../../../components/notchView'
const carouselFirstItem = 0
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

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: 'YKS',
            subject: '',
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
            selectedGameMode: '',
            // Carousel slide item
            carouselActiveSlide: carouselFirstItem
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

    // TODO Write this piece of code better
    updateModeButtonUI = gameMode => {
        switch (gameMode) {
            case 'ranked':
                if (this.state.selectedGameMode === gameMode) return
                this.setState({
                    rankedImage: RANKED_SELECTED_IMAGE,
                    rankedModeButtonBackground: SELECTED_MODE_COLOR
                })
                if (this.state.selectedGameMode === 'friend') {
                    this.setState({
                        friendsImage: FRIENDS_EMPTY_IMAGE,
                        friendsModeButtonBackground: EMPTY_MODE_COLOR
                    })
                } else if (this.state.selectedGameMode !== '') {
                    this.setState({
                        groupImage: GROUP_EMPTY_IMAGE,
                        groupModeButtonBackground: EMPTY_MODE_COLOR
                    })
                }
                this.setState({ selectedGameMode: gameMode })
                return
            case 'friend':
                if (this.state.selectedGameMode === gameMode) return
                this.setState({
                    friendsImage: FRIENDS_SELECTED_IMAGE,
                    friendsModeButtonBackground: SELECTED_MODE_COLOR
                })
                if (this.state.selectedGameMode === 'ranked') {
                    this.setState({
                        rankedImage: RANKED_EMPTY_IMAGE,
                        rankedModeButtonBackground: EMPTY_MODE_COLOR
                    })
                } else if (this.state.selectedGameMode !== '') {
                    this.setState({
                        groupImage: GROUP_EMPTY_IMAGE,
                        groupModeButtonBackground: EMPTY_MODE_COLOR
                    })
                }
                this.setState({ selectedGameMode: gameMode })
                return
            case 'group':
                if (this.state.selectedGameMode === gameMode) return
                this.setState({
                    groupImage: GROUP_SELECTED_IMAGE,
                    groupModeButtonBackground: SELECTED_MODE_COLOR
                })
                if (this.state.selectedGameMode === 'ranked') {
                    this.setState({
                        rankedImage: RANKED_EMPTY_IMAGE,
                        rankedModeButtonBackground: EMPTY_MODE_COLOR
                    })
                } else if (this.state.selectedGameMode !== '') {
                    this.setState({
                        friendsImage: FRIENDS_EMPTY_IMAGE,
                        friendsModeButtonBackground: EMPTY_MODE_COLOR
                    })
                }
                this.setState({ selectedGameMode: gameMode })
                return
        }
    }

    modeButtonOnPress = selectedMode => {
        this.updateModeButtonUI(selectedMode)
    }

    playButtonOnPress = () => {
        navigationReset('game')
    }

    profilePicOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.profile)
    }

    notificationPicOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.notifications)
    }

    render() {
        const card = this.cards(this.state.exam, this.state.carouselActiveSlide)
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
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
                            <Image source={CLOSE_BUTTON} style={styles.xLogo} />
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
                            <TouchableOpacity onPress={this.profilePicOnPress}>
                                <Image
                                    source={{
                                        uri: this.props.profilePicture
                                    }}
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
                            <TouchableOpacity
                                onPress={this.notificationPicOnPress}
                            >
                                <Image
                                    source={NOTIFICATION_LOGO}
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
                            firstItem={carouselFirstItem}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.65}
                            // inactiveSlideShift={20}
                            containerCustomStyle={carouselStyle.slider}
                            contentContainerCustomStyle={
                                carouselStyle.sliderContentContainer
                            }
                            loop={false}
                            onSnapToItem={index =>
                                this.setState({ carouselActiveSlide: index })
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

const mapStateToProps = state => ({
    profilePicture: state.user.profilePicture
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Home)
