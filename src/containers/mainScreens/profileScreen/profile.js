import React from 'react'
import {
    Image,
    ImageBackground,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import {
    SCENE_KEYS,
    navigationPop,
    navigationPush
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import premiumStyles from '../purchaseScreen/style'
import NotchView from '../../../components/notchView'
import statisticsLogo from '../../../assets/pie_chart.png'
import goals from '../../../assets/goals.png'
import favoriteLogo from '../../../assets/favorite.png'
import returnLogo from '../../../assets/return.png'
import settingsLogo from '../../../assets/settings.png'
import searchlogo from '../../../assets/search.png'
import favori_dolu from '../../../assets/favori.png'
import { flashMessages } from '../../../services/flashMessageBuilder'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient'
import { appActions } from '../../../redux/app/actions'
import { interstitialAd } from '../../../services/admobService'

const FEAUTRE_PRESS_COUNT_FOR_AD = 4

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Search text variable
            searchText: '',
            isModalVisible: false
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    goalsOnPress = () => {
        this.props.increaseFeaturePressCount()
        if (
            this.props.featurePressCount % FEAUTRE_PRESS_COUNT_FOR_AD === 0 &&
            !this.props.clientInformation.isPremium
        )
            interstitialAd()
        navigationPush(SCENE_KEYS.mainScreens.goals)
    }

    settingsOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.settings)
    }

    profileSearchOnPress = () => {
        if (this.state.searchText === '') return
        if (this.state.searchText.length < 3) {
            flashMessages.generalErrorWithProps(
                'Hata!',
                'Lütfen en az 3 karakter giriniz.',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            return
        }
        navigationPush(SCENE_KEYS.mainScreens.profileSearch, {
            searchedKeyword: this.state.searchText
        })
    }

    favoriteLogoOnPress = () => {
        if (this.props.clientInformation.isPremium) {
            navigationPush(SCENE_KEYS.mainScreens.favorites)
        } else {
            this.setState({
                isModalVisible: true
            })
        }
    }

    friendsLogoOnPress = () => {
        this.props.increaseFeaturePressCount()
        if (
            this.props.featurePressCount % FEAUTRE_PRESS_COUNT_FOR_AD === 0 &&
            !this.props.clientInformation.isPremium
        )
            interstitialAd()
        navigationPush(SCENE_KEYS.mainScreens.friendsList, {
            friendsList: [],
            isOpponentFriends: false,
            listSource: 'profile'
        })
    }

    statisticsLogoOnPress = () => {
        this.props.increaseFeaturePressCount()
        if (
            this.props.featurePressCount % FEAUTRE_PRESS_COUNT_FOR_AD === 0 &&
            !this.props.clientInformation.isPremium
        )
            interstitialAd()
        navigationPush(SCENE_KEYS.mainScreens.statistics)
    }

    closeModalButtonOnPress = () => {
        this.setState({
            isModalVisible: false
        })
    }

    premiumForFavoritesPage() {
        return (
            <View style={premiumStyles.premiumModal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{ height: hp(120), width: wp(100) }}
                />
                <View
                    style={[premiumStyles.premiumModalView, { height: hp(33) }]}
                >
                    <LinearGradient
                        colors={['white', '#FFE6BB', '#FFA800']}
                        style={[
                            premiumStyles.linearGradientPremiumModalView,
                            { height: hp(33) }
                        ]}
                    >
                        <View style={premiumStyles.premiumModalHeaderView}>
                            <Text
                                allowFontScaling={false}
                                style={premiumStyles.premiumModalHeaderText}
                            >
                                ELİT ÖĞRENCİ PAKETİ
                            </Text>
                        </View>
                        <View style={premiumStyles.premiumModalSwiperContainer}>
                            <View style={premiumStyles.premiumModalSwiperView}>
                                <View
                                    style={
                                        premiumStyles.premiumModalSwiperImgView
                                    }
                                >
                                    <Image
                                        source={favori_dolu}
                                        style={premiumStyles.premiumModalImg}
                                    />
                                </View>
                                <View
                                    style={[
                                        premiumStyles.premiumModalSwiperHeaderView,
                                        { height: hp(5.5) }
                                    ]}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={
                                            premiumStyles.premiumModalHeaderText
                                        }
                                    >
                                        Soru Favorileme!
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        premiumStyles.premiumModalSwiperInfoView,
                                        {
                                            justifyContent: 'flex-start',
                                            height: hp(9.5)
                                        }
                                    ]}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            premiumStyles.premiumModalInfoText,
                                            { marginTop: hp(1.5) }
                                        ]}
                                    >
                                        Soru Favorileme şimdi Elit Öğrenci
                                        Paketi'nde
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.premiumForFavoritesPage()}
                </Modal>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <View style={styles.searchBar}>
                        <View style={styles.textInputView}>
                            <TextInput
                                allowFontScaling={false}
                                style={styles.searchBarText}
                                placeholder="Kullanıcı adı ile ara..."
                                placeholderTextColor={'#7B7B7B'}
                                onChangeText={text =>
                                    this.setState({ searchText: text })
                                }
                                autoCapitalize={'none'}
                                returnKeyType="search"
                                onSubmitEditing={this.profileSearchOnPress}
                            />
                        </View>
                        <TouchableOpacity onPress={this.profileSearchOnPress}>
                            <Image
                                source={searchlogo}
                                style={styles.searchBarLogo}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.settingsOnPress}>
                        <Image
                            source={settingsLogo}
                            style={styles.settingsLogo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        source={{
                            uri: this.props.clientInformation.coverPicture
                        }}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: hp(3) }}
                    >
                        <View style={styles.profileContainerShadowView}>
                            <View style={styles.profilePicView}>
                                <Image
                                    source={{
                                        uri: this.props.clientInformation
                                            .profilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                            </View>
                            <View style={styles.profileInfoView}>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.nameSurnameText,
                                        {
                                            fontSize:
                                                this.props.clientInformation
                                                    .name.length +
                                                    this.props.clientInformation
                                                        .lastname.length >
                                                18
                                                    ? hp(2.25)
                                                    : hp(3.5)
                                        }
                                    ]}
                                >
                                    {this.props.clientInformation.name}{' '}
                                    {this.props.clientInformation.lastname}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.usernameText}
                                >
                                    @{this.props.clientInformation.username}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.sinaviaScoreText}
                                >
                                    Sınavia Puanı:{' '}
                                    {this.props.clientInformation.totalPoints}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.boxesContainer}>
                    <View style={styles.first2Box}>
                        <TouchableOpacity onPress={this.statisticsLogoOnPress}>
                            <View style={styles.statisticsBox}>
                                <View style={styles.boxTextContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.boxText}
                                    >
                                        İstatistikler
                                    </Text>
                                </View>
                                <View style={styles.boxLogoContainer}>
                                    <Image
                                        source={statisticsLogo}
                                        style={styles.boxLogo}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.friendsLogoOnPress}>
                            <View style={styles.friendsBox}>
                                <View style={styles.boxTextContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.boxText}
                                    >
                                        Arkadaşlar
                                    </Text>
                                </View>
                                <View style={styles.boxLogoContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.friendsCounterBoxText}
                                    >
                                        {this.props.friendIds.length}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.second2Box}>
                        <TouchableOpacity onPress={this.goalsOnPress}>
                            <View style={styles.badgesBox}>
                                <View style={styles.boxTextContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.boxText}
                                    >
                                        Haftalık Hedefler
                                    </Text>
                                </View>
                                <View style={styles.boxLogoContainer}>
                                    <Image
                                        source={goals}
                                        style={styles.boxLogo}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.favoriteLogoOnPress}>
                            <View style={styles.favoritesBox}>
                                <View style={styles.boxTextContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.boxText}
                                    >
                                        Favori Sorular
                                    </Text>
                                </View>
                                <View style={styles.boxLogoContainer}>
                                    <Image
                                        source={favoriteLogo}
                                        style={styles.boxLogo}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientInformation: state.client.clientInformation,
    friendIds: state.friends.friendIds,
    featurePressCount: state.app.featurePressCount
})

const mapDispatchToProps = dispatch => ({
    increaseFeaturePressCount: () =>
        dispatch(appActions.increaseFeaturePressCount())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
