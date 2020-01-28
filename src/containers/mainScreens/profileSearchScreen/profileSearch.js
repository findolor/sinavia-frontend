import React from 'react'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { navigationPop } from '../../../services/navigationService'
import { connect } from 'react-redux'
import { userServices } from '../../../sagas/user/'
import { opponentActions } from '../../../redux/opponents/actions'
import returnLogo from '../../../assets/return.png'
import NO_RESULTS_USER from '../../../assets/noResultsUser.png'
import { BannerAdvertisement } from '../../../services/admobService'

class ProfileSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            returnedSearchList: []
        }
    }

    componentDidMount() {
        userServices
            .searchUsers(
                this.props.clientToken,
                this.props.clientDBId,
                this.props.searchedKeyword
            )
            .then(userList => this.setState({ returnedSearchList: userList }))
            .catch(err => console.log(err))
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            userServices
                .searchUsers(
                    this.props.clientToken,
                    this.props.clientDBId,
                    this.props.searchedKeyword
                )
                .then(userList =>
                    this.setState({ returnedSearchList: userList })
                )
                .catch(err => console.log(err))
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    userOnPress = searchListIndex => {
        this.props.getOpponentFullInformation(
            this.state.returnedSearchList[searchListIndex],
            this.props.clientDBId,
            this.props.clientToken,
            true
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <View style={styles.returnLogoContainer}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.searchText}>
                            "{this.props.searchedKeyword}"
                        </Text>
                        <Text style={styles.searchInfoText}>
                            ile alakalı sonuçlar
                        </Text>
                    </View>
                </View>
                {Object.keys(this.state.returnedSearchList).length !== 0 && (
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={this.state.returnedSearchList}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.userOnPress(index)
                                            }
                                        >
                                            <View style={styles.userRow}>
                                                <View
                                                    style={
                                                        styles.userPicContainerInRow
                                                    }
                                                >
                                                    <Image
                                                        source={{
                                                            uri:
                                                                item.profilePicture
                                                        }}
                                                        style={styles.userPic}
                                                    />
                                                </View>
                                                <View
                                                    style={
                                                        styles.namesContainer
                                                    }
                                                >
                                                    <Text
                                                        style={styles.nameText}
                                                    >
                                                        {item.name +
                                                            ' ' +
                                                            item.lastname}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.usernameText
                                                        }
                                                    >
                                                        @{item.username}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        {!this.props.clientInformation
                                            .isPremium &&
                                            index % 3 === 2 &&
                                            index !== 0 && (
                                                <BannerAdvertisement />
                                            )}
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {Object.keys(this.state.returnedSearchList).length === 0 && (
                    <View style={styles.noResultsView}>
                        <Image
                            source={NO_RESULTS_USER}
                            style={styles.noResultImg}
                        />
                        <Text style={styles.noResultsText}>
                            Bu isimle bir kullanıcı bulamadık
                        </Text>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    getOpponentFullInformation: (
        opponentInformation,
        clientId,
        clientToken,
        isWithSearchBar
    ) =>
        dispatch(
            opponentActions.getOpponentFullInformation(
                opponentInformation,
                clientId,
                clientToken,
                isWithSearchBar
            )
        )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSearch)
