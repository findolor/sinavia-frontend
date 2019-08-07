import React from 'react'
import {
    Clipboard,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
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

import PROFILE_PIC from '../../../assets/profile2.jpg'
import CLOSE_BUTTON from '../../../assets/closeButton.png'
import NOTIFICATION_LOGO from '../../../assets/mainScreens/notification.png'
import BACK_BUTTON from '../../../assets/backButton.png'

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
const questionsNumbersList = ['5', '10', '15', '20']
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
const COPY_IMAGE = require('../../../assets/mainScreens/copy.png')

const data = [
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    }
]

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: 'YKS',
            subject: '',
            isModalVisible: false,
            groupModeView: false,
            createRoomView: false,
            joinRoomView: false,
            isJoinedRoomView: false,
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
            carouselActiveSlide: carouselFirstItem,
            // Example Users Data for Group Mode
            data: data,
            //Questions Number for Creating Group
            questionsNumber: '5',
            groupCode: '',
            visibleView: ''
        }
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.groupCode)
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

    questionsPickerSelect(idx, value) {
        this.setState({
            questionsNumber: value
        })
    }

    randomCodeGenerator() {
        var result = ''
        var characters = 'ABCDEF0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    onPressCard(title) {
        this.setState({
            isModalVisible: true,
            subject: title,
            visibleView: 'GAME_MODES'
        })
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

    gameModesView() {
        return (
            <View style={styles.modal}>
                <View style={styles.onlyCloseButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ isModalVisible: false })
                        }}
                    >
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
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
                                onPress={() => this.modeButtonOnPress('ranked')}
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
                            <View style={styles.gameModeContextContainer}>
                                <Text style={styles.gameModeContextText}>
                                    Rastgele bir kullanıcı ile yarış
                                </Text>
                            </View>
                        </View>
                        <View style={styles.gameModeContainer}>
                            <TouchableOpacity
                                onPress={() => this.modeButtonOnPress('friend')}
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
                            <View style={styles.gameModeContextContainer}>
                                <Text style={styles.gameModeContextText}>
                                    Arkadaşın ile yarış
                                </Text>
                            </View>
                        </View>
                        <View style={styles.gameModeContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({
                                        visibleView: 'GROUP_MODES'
                                    })
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
                    buttonText="Başlat"
                    onPress={this.playButtonOnPress}
                />
            </View>
        )
    }

    groupModesView() {
        return (
            <View style={styles.modal}>
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ visibleView: 'GAME_MODES' })
                        }}
                    >
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ isModalVisible: false })
                        }}
                    >
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.createOrJoinRoomButtonsContainer}>
                        <AuthButton
                            height={hp(12)}
                            width={wp(60)}
                            color="#00D9EF"
                            buttonText="Oyun kur"
                            onPress={() =>
                                this.setState({
                                    visibleView: 'CREATE_ROOM',
                                    groupCode: this.randomCodeGenerator()
                                })
                            }
                        />
                        <AuthButton
                            height={hp(12)}
                            width={wp(60)}
                            color="#00D9EF"
                            buttonText="Oyuna katıl"
                            onPress={() =>
                                this.setState({ visibleView: 'JOIN_ROOM' })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    joinRoomView() {
        return (
            <View style={styles.modal}>
                <View style={styles.backAndCloseButtonsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ visibleView: 'GROUP_MODES' })
                    }}
                >
                    <Image source={BACK_BUTTON} style={styles.backLogo} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ isModalVisible: false })
                    }}
                >
                    <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.joinGameCodeContainer}>
                        <View style={styles.gameCodeBox}>
                            <TextInput
                                style={styles.joinGameCodeTextInput}
                                placeholder="Oda Kodu"
                                placeholderTextColor="#A8A8A8"
                                autoCapitalize="characters"
                            />
                        </View>
                    </View>
                    <View style={styles.joinGameInfoContainer}>
                        <Text style={styles.joinGameInfoText}>
                            Aldığın oda kodunu
                        </Text>
                        <Text style={styles.joinGameInfoText}>
                            yukarıdaki alana girerek
                        </Text>
                        <Text style={styles.joinGameInfoText}>
                            oyuna dahil ol
                        </Text>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Onayla"
                    onPress={() => {
                        this.setState({ visibleView: 'IS_JOINED_ROOM'})
                    }}
                />
            </View>
        )
    }

    createRoomView() {
        return (
            <View style={styles.modal}>
                <View style={styles.onlyCloseButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ visibleView: 'QUIT_GROUP_GAME' })
                        }}
                    >
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.gameCodeContainer}>
                        <View style={styles.gameCodeBox}>
                            <View style={styles.gameCodeBoxLeftView} />
                            <View style={styles.gameCodeBoxTextView}>
                                <Text
                                    style={styles.gameCodeText}
                                    selectable={true}
                                >
                                    {this.state.groupCode}
                                </Text>
                            </View>
                            <View style={styles.gameCodeBoxRightView}>
                                <TouchableOpacity
                                    onPress={this.writeToClipboard}
                                >
                                    <Image
                                        source={COPY_IMAGE}
                                        style={styles.copyImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.gameCodeInfoTextContainer}>
                        <Text style={styles.gameCodeInfoText}>
                            Grup olarak oynamak için{' '}
                        </Text>
                        <Text style={styles.gameCodeInfoText}>
                            yukarıdaki kodu arkadaşlarınla paylaş
                        </Text>
                    </View>
                    <View style={styles.questionsNumberContainer}>
                        <Text style={styles.questionsNumberText}>
                            Soru Sayısı:{' '}
                        </Text>
                        <DropDown
                            style={styles.questionNumberPicker}
                            textStyle={styles.questionPickerText}
                            dropdownTextStyle={
                                styles.questionPickerDropdownText
                            }
                            dropdownStyle={styles.questionPickerDropdown}
                            options={questionsNumbersList}
                            defaultValue={this.state.questionsNumber}
                            onSelect={(idx, value) =>
                                this.questionsPickerSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.usersListContainer}>
                        <FlatList
                            data={this.state.data}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.userRow}>
                                        <View
                                            style={
                                                styles.profilePicContainerinRow
                                            }
                                        >
                                            <Image
                                                source={item.userPic}
                                                style={styles.userPic}
                                            />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={styles.usersCounterContainer}>
                        <Text style={styles.usersCounterText}>3/20</Text>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Başla"
                />
            </View>
        )
    }

    isJoinedRoomView() {
        return (
            <View style={styles.modal}>
                <View style={styles.onlyCloseButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ visibleView: 'QUIT_GROUP_GAME' })
                        }}
                    >
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.isJoinedRoomSubjectContainer}>
                        <Text style={styles.modalSubjectText}>
                            Paragrafta Anlam
                        </Text>
                    </View>
                    <FlatList
                        data={this.state.data}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.userRow}>
                                    <View
                                        style={styles.profilePicContainerinRow}
                                    >
                                        <Image
                                            source={item.userPic}
                                            style={styles.userPic}
                                        />
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameText}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={styles.usersCounterContainer}>
                        <Text style={styles.usersCounterText}>3/20</Text>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Hazır"
                />
            </View>
        )
    }

    quitGroupGameView() {
        return (
            <View style={styles.modal}>
                <View style={styles.quitView}>
                    <Text style={styles.areYouSureText}>
                        Odadan çıkış yapmak istediğine
                    </Text>
                    <Text style={styles.areYouSureText}>emin misin?</Text>
                </View>
                <View style={styles.yesOrNoButtonsContainer}>
                    <AuthButton
                        height={hp(7)}
                        width={wp(42)}
                        color="#00D9EF"
                        buttonText="Evet"
                        onPress={() => {
                            this.setState({ isModalVisible: false })
                        }}
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(42)}
                        color="#00D9EF"
                        buttonText="Hayır"
                    />
                </View>
            </View>
        )
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

    render() {
        const card = this.cards(this.state.exam, this.state.carouselActiveSlide)
        const visibleView = this.state.visibleView
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {visibleView === 'GAME_MODES' && this.gameModesView()}
                    {visibleView === 'GROUP_MODES' && this.groupModesView()}
                    {visibleView === 'CREATE_ROOM' && this.createRoomView()}
                    {visibleView === 'JOIN_ROOM' && this.joinRoomView()}
                    {visibleView === 'IS_JOINED_ROOM' &&
                        this.isJoinedRoomView()}
                    {visibleView === 'QUIT_GROUP_GAME' &&
                        this.quitGroupGameView()}
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
                            <TouchableOpacity>
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
