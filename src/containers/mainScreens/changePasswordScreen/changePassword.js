import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import { navigationPop } from '../../../services/navigationService'
import returnLogo from '../../../assets/return.png'

class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Existing password (onChange)
            existingPassword: '',
            // New passwords
            newPasswordFirst: '',
            newPasswordSecond: ''
        }
    }

    componentDidMount() {}

    backButtonOnPress = () => {
        navigationPop()
    }

    existingPasswordOnChange = text => {
        this.setState({ existingPassword: text })
    }

    newPasswordFirstOnChange = text => {
        this.setState({ newPasswordFirst: text })
    }

    newPasswordSecondOnChange = text => {
        this.setState({ newPasswordSecond: text })
    }

    checkPasswordMatch = () => {
        if (
            this.state.existingPassword ===
            this.props.clientCredentials.password
        )
            return true
        else return false
    }

    checkNewPasswordsMatch = () => {
        if (
            this.state.newPasswordFirst === this.state.newPasswordSecond &&
            this.state.newPasswordFirst !== ''
        )
            return true
        else return false
    }

    saveButtonOnPress = () => {
        if (this.checkPasswordMatch()) {
            if (this.checkNewPasswordsMatch()) {
                const clientInformation = this.props.clientInformation

                clientInformation.password = this.state.newPasswordFirst

                this.props.updateUser(
                    this.props.clientToken,
                    this.props.clientDBId,
                    clientInformation,
                    true
                )
            } else {
                Alert.alert('Lütfen yeni şifreyi doğru giriniz!')
            }
        } else {
            Alert.alert('Lütfen mevcut şifreyi doğru giriniz!')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.saveButtonOnPress}>
                        <View style={styles.saveButton}>
                            <Text style={styles.saveText}>Kaydet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.textInputsContainer}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Mevcut</Text>
                            <Text style={styles.textInputTitle}>şifre</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                autoCapitalize={'none'}
                                onChangeText={this.existingPasswordOnChange}
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Yeni</Text>
                            <Text style={styles.textInputTitle}>şifre</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                autoCapitalize={'none'}
                                onChangeText={this.newPasswordFirstOnChange}
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Yeni</Text>
                            <Text style={styles.textInputTitle}>şifre</Text>
                            <Text style={styles.textInputTitle}>(tekrar)</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                autoCapitalize={'none'}
                                onChangeText={this.newPasswordSecondOnChange}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.spaceView} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation,
    clientCredentials: state.client.clientCredentials
})

const mapDispatchToProps = dispatch => ({
    updateUser: (clientToken, clientId, clientInformation, isPasswordChange) =>
        dispatch(
            clientActions.updateUser(
                clientToken,
                clientId,
                clientInformation,
                isPasswordChange
            )
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword)
