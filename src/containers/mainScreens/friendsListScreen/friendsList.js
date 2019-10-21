import React from 'react'
import {
    Image,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native'
import {
    SCENE_KEYS,
    navigationPop,
    navigationPush
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { userServices } from '../../../sagas/user/'
import { opponentActions } from '../../../redux/opponents/actions'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'

class FriendsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Flatlist data
            friendsList: this.props.friendsList,
            // Original friendsList
            value: ''
        }
    }

    async componentDidMount() {
        if (Object.keys(this.props.friendIds).length === 0) return
        let friends
        if (!this.props.isOpponentFriends) {
            friends = await userServices.getUsers(
                this.props.clientToken,
                this.props.friendIds
            )
        } else {
            friends = await userServices.getUsers(
                this.props.clientToken,
                this.props.opponentFriendIds
            )
        }
        this.setState({ friendsList: friends, originalList: friends })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (Object.keys(this.props.friendIds).length === 0) {
                this.setState({ friendsList: [] })
                return
            }
            const friends = await userServices.getUsers(
                this.props.clientToken,
                this.props.friendIds
            )

            this.setState({ friendsList: friends, originalList: friends })
        }
    }

    returnButtonOnPress = () => {
        navigationPop()
    }

    searchFilterFunction = text => {
        this.setState({
            value: text
        })
        if (text === '') {
            this.setState({ friendsList: this.state.originalList })
            return
        }

        const newData = this.state.friendsList.filter(item => {
            const itemData = `${item.name.toUpperCase() +
                ' ' +
                item.lastname.toUpperCase()} ${item.username.toUpperCase()}`
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        this.setState({
            friendsList: newData
        })
    }

    friendOnPress = searchListIndex => {
        this.props.getOpponentFullInformation(
            this.state.friendsList[searchListIndex],
            this.props.clientDBId,
            this.props.clientToken,
            false,
            this.props.isOpponentFriends
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.returnButtonOnPress}>
                        <View style={styles.returnLogoContainer}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.searchBar}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.searchBarText}
                                placeholder={
                                    this.props.isFromOpponentScreen === true
                                        ? 'Arkadaşını ara...'
                                        : 'Arkadaş ara...'
                                }
                                placeholderTextColor={'#7B7B7B'}
                                autoCapitalize={'none'}
                                onChangeText={text =>
                                    this.searchFilterFunction(text)
                                }
                                value={this.state.value}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.spaceView} />
                <View style={styles.flatListView}>
                    <FlatList
                        data={this.state.friendsList}
                        vertical={true}
                        extraData={this.state.friendsList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => this.friendOnPress(index)}
                                >
                                    <View style={styles.userRow}>
                                        <View
                                            style={styles.userPicContainerInRow}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.profilePicture
                                                }}
                                                style={styles.userPic}
                                            />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.name +
                                                    ' ' +
                                                    item.lastname}
                                            </Text>
                                            <Text style={styles.userNameText}>
                                                @{item.username}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    friendIds: state.friends.friendIds
})

const mapDispatchToProps = dispatch => ({
    getOpponentFullInformation: (
        opponentInformation,
        clientId,
        clientToken,
        isWithSearchBar,
        isFromOpponentScreen
    ) =>
        dispatch(
            opponentActions.getOpponentFullInformation(
                opponentInformation,
                clientId,
                clientToken,
                isWithSearchBar,
                isFromOpponentScreen
            )
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsList)
