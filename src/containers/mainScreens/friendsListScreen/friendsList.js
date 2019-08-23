import React from 'react'
import {
    Image,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import { connect } from 'react-redux'
import { userServices } from '../../../sagas/user/'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'

class FriendsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendsList: [],
            value: ''
        }
    }

    async componentDidMount() {
        console.log(this.props.friendIds)
        if (Object.keys(this.props.friendIds).length === 0) return
        const friends = await userServices.getUsers(
            this.props.clientToken,
            this.props.friendIds
        )
        console.log(friends)
        this.setState({ friendsList: friends })
    }

    returnButtonOnPress = () => {
        navigationPop()
    }

    searchFilterFunction = text => {
        this.setState({
            value: text
        })

        const newData = friendsListData.filter(item => {
            const itemData = `${item.name.toUpperCase() +
                ' ' +
                item.lastname.toUpperCase()} ${item.username.toUpperCase()}`
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data: newData
        })
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
                                placeholder="Arkadaşını ara..."
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
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity>
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
    friendIds: state.friends.friendIds
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsList)
