import React from 'react'
import { View, Text, Button } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { createUser, fetchUser, getToken } from '../redux/user/actions'

class User extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View style={{ flex: 5, justifyContent: 'flex-end' }}>
                    <Text>{JSON.stringify(this.props.temp)}</Text>
                    <Button
                        onPress={() => {
                            this.props.createUser({
                                username: 'boi',
                                name: 'arda',
                                lastname: 'naksss',
                                email: 'some@lol.com',
                                city: 'dammnnn world',
                                profilePicture: 'dsadasda',
                                coverPicture: 'dsdsdsds',
                                isDeleted: 0,
                                birthDate: '2019-07-10T12:25:48.700Z'
                            })
                        }}
                        title="create user"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text>get token gets token for testdev@gmail.com</Text>
                    <Button
                        onPress={() => {
                            this.props.getToken({
                                email: 'testdev@gmail.com',
                                password: 'pass'
                            })
                        }}
                        title="get token"
                    />
                    <Text>fetch user button gets testdev@gmail.com</Text>
                    <Button
                        onPress={() => {
                            this.props.getUser(this.props.userToken)
                        }}
                        title="fetch user"
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { temp, userToken } = state.user
    return {
        temp,
        userToken
    }
}

const mapDispatchToProps = dispatch => ({
    createUser: userInformation => dispatch(createUser(userInformation)),
    getUser: userToken => dispatch(fetchUser(userToken)),
    getToken: userInformation => dispatch(getToken(userInformation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)
