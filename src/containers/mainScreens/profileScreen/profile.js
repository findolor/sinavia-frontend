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
    navigationPush
} from '../../../services/navigationService'
import styles from './style'
import NotchView from '../../../components/notchView'
import nebula from '../../../assets/cover.jpg'
import statisticsLogo from '../../../assets/pie_chart.png'
import friendsLogo from '../../../assets/friends.png'
import trophyLogo from '../../../assets/trophy.png'
import favoriteLogo from '../../../assets/favorite.png'
import returnLogo from '../../../assets/return.png'
import settingsLogo from '../../../assets/settings.png'
import searchlogo from '../../../assets/search.png'
import PROFILE_PIC from '../../../assets/profile2.jpg'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    favoriteLogoOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.favorites)
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <View style={styles.searchBar}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.searchBarText}
                                placeholder="Kullanıcı ara..."
                                placeholderTextColor={'#7B7B7B'}
                            />
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={searchlogo}
                                style={styles.searchBarLogo}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={settingsLogo}
                            style={styles.settingsLogo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        source={nebula}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <View style={styles.profilePicView}>
                            <Image
                                source={PROFILE_PIC}
                                style={styles.profilePic}
                            />
                        </View>
                        <View style={styles.nameView}>
                            <Text style={styles.nameSurnameText}>
                                Hakan Yılmaz
                            </Text>
                            <Text style={styles.usernameText}>
                                @haqotherage
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.boxesContainer}>
                    <View style={styles.first2Box}>
                        <TouchableOpacity>
                            <View style={styles.statisticsBox}>
                                <Text style={styles.boxText}>
                                    İstatistikler
                                </Text>
                                <Image
                                    source={statisticsLogo}
                                    style={styles.boxLogo}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.friendsBox}>
                                <Text style={styles.boxText}>Arkadaşlar</Text>
                                <Image
                                    source={friendsLogo}
                                    style={styles.boxLogo}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.second2Box}>
                        <TouchableOpacity>
                            <View style={styles.badgesBox}>
                                <Text style={styles.boxText}>Kazanımlar</Text>
                                <Image
                                    source={trophyLogo}
                                    style={styles.boxLogo}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.favoriteLogoOnPress}>
                            <View style={styles.favoritesBox}>
                                <Text style={styles.boxText}>
                                    Favori Sorular
                                </Text>
                                <Image
                                    source={favoriteLogo}
                                    style={styles.boxLogo}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
