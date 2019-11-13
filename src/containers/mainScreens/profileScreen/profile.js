import React from 'react'
import {
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import {
    SCENE_KEYS,
    navigationPop,
    navigationPush, navigationReset, navigationReplace
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import premiumStyles from '../purchaseScreen/style'
import NotchView from '../../../components/notchView'
import statisticsLogo from '../../../assets/pie_chart.png'
import friendsLogo from '../../../assets/friends.png'
import trophyLogo from '../../../assets/trophy.png'
import favoriteLogo from '../../../assets/favorite.png'
import returnLogo from '../../../assets/return.png'
import settingsLogo from '../../../assets/settings.png'
import searchlogo from '../../../assets/search.png'
import favori_dolu from '../../../assets/favori.png'

import COVER from '../../../assets/cover.jpg'
import PROFILE_PIC from '../../../assets/profile2.jpg'
import { heightPercentageToDP as hp, widthPercentageToDP as  wp } from 'react-native-responsive-screen'
import LinearGradient from "react-native-linear-gradient"
import PREMIUM_ADS from '../../../assets/premiumAds.png'
import CreateGroupRoomView from '../homeScreen/groupRoomScreens/createRoomScreen/createGroupRoom'
import JoinGroupRoomView from '../homeScreen/groupRoomScreens/joinRoomScreen/joinGroupRoom'

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

    settingsOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.settings)
    }

    profileSearchOnPress = () => {
        if (this.state.searchText === '') return
        navigationPush(SCENE_KEYS.mainScreens.profileSearch, {
            searchedKeyword: this.state.searchText
        })
    }

    favoriteLogoOnPress = () => {
        if (this.props.clientInformation.isPremium) {
            navigationPush(SCENE_KEYS.mainScreens.favorites)
        } else {
            this.setState({
                isModalVisible: true,
            })
        }
    }

    friendsLogoOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.friendsList, {
            friendsList: [],
            isOpponentFriends: false
        })
    }

    statisticsLogoOnPress = () => {
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
                <TouchableOpacity onPress={this.closeModalButtonOnPress} style={ {height: hp(120), width: wp(100)}}/>
                <View style={[premiumStyles.premiumModalView, { height: hp(33)}]}>
                    <LinearGradient colors={['white', '#FFE6BB', '#FFA800']} style={[premiumStyles.linearGradientPremiumModalView, { height: hp(33)}]}>
                        <View style={premiumStyles.premiumModalHeaderView}>
                            <Text style={premiumStyles.premiumModalHeaderText}>ELİT ÖĞRENCİ PAKETİ</Text>
                        </View>
                        <View style={premiumStyles.premiumModalSwiperContainer}>
                            <View style={premiumStyles.premiumModalSwiperView}>
                                <View style={premiumStyles.premiumModalSwiperImgView}>
                                    <Image source={favori_dolu} style={premiumStyles.premiumModalImg}/>
                                </View>
                                <View style={[premiumStyles.premiumModalSwiperHeaderView, { height: hp(5.5)}]}>
                                    <Text style={premiumStyles.premiumModalHeaderText}>Soru Favorileme!</Text>
                                </View>
                                <View style={[premiumStyles.premiumModalSwiperInfoView, {justifyContent: 'flex-start', height: hp(9.5)}]}>
                                    <Text style={[premiumStyles.premiumModalInfoText, {marginTop: hp(1.5)}]}>Soru Favorileme şimdi Elit Öğrenci Paketi'nde</Text>
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
                                style={styles.searchBarText}
                                placeholder="@kullanıcıadı ile ara..."
                                placeholderTextColor={'#7B7B7B'}
                                onChangeText={text =>
                                    this.setState({ searchText: text })
                                }
                                autoCapitalize={'none'}
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
                        imageStyle={{ borderRadius: 30 }}
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
                                <Text style={styles.nameSurnameText}>
                                    {this.props.clientInformation.name}{' '}
                                    {this.props.clientInformation.lastname}
                                </Text>
                                <Text style={styles.usernameText}>
                                    @{this.props.clientInformation.username}
                                </Text>
                                <Text style={styles.sinaviaScoreText}>
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
                                    <Text style={styles.boxText}>
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
                                    <Text style={styles.boxText}>
                                        Arkadaşlar
                                    </Text>
                                </View>
                                <View style={styles.boxLogoContainer}>
                                    <Image
                                        source={friendsLogo}
                                        style={styles.boxLogo}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.second2Box}>
                        <TouchableOpacity>
                            <View style={styles.badgesBox}>
                                <View style={styles.boxTextContainer}>
                                    <Text style={styles.boxText}>
                                        Kazanımlar
                                    </Text>
                                </View>
                                <View style={styles.boxLogoContainer}>
                                    <Image
                                        source={trophyLogo}
                                        style={styles.boxLogo}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.favoriteLogoOnPress}>
                            <View style={styles.favoritesBox}>
                                <View style={styles.boxTextContainer}>
                                    <Text style={styles.boxText}>
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
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Profile)