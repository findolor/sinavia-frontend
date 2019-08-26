import React from 'react'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import {
    navigationPop,
    navigationPush,
    SCENE_KEYS
} from '../../../services/navigationService'
import { connect } from 'react-redux'

import { userServices } from '../../../sagas/user/'

import returnLogo from '../../../assets/return.png'

class ProfileSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            returnedSearchList: []
        }
    }

    async componentDidMount() {
        let userList = await userServices.searchUsers(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.searchedKeyword
        )

        this.setState({ returnedSearchList: userList })
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    userOnPress = searchListIndex => {
        navigationPush(SCENE_KEYS.mainScreens.opponentsProfile, {
            opponentInformation: this.state.returnedSearchList[searchListIndex],
            isWithSearchBar: true
        })
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
                    <FlatList
                        data={this.state.returnedSearchList}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => this.userOnPress(index)}
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
                                        <View style={styles.namesContainer}>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameText}>
                                                    {item.name +
                                                        ' ' +
                                                        item.lastname}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.usernameContainer}
                                            >
                                                <Text
                                                    style={styles.usernameText}
                                                >
                                                    @{item.username}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
                {Object.keys(this.state.returnedSearchList).length === 0 && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <Text>Sonuç yok</Text>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(ProfileSearch)
