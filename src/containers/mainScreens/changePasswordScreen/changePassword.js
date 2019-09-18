import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { navigationPop } from '../../../services/navigationService'
import returnLogo from '../../../assets/return.png'

class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity>
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
                        <View style={styles.textInputView} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Yeni</Text>
                            <Text style={styles.textInputTitle}>şifre</Text>
                        </View>
                        <View style={styles.textInputView} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Yeni</Text>
                            <Text style={styles.textInputTitle}>şifre</Text>
                            <Text style={styles.textInputTitle}>tekrar</Text>
                        </View>
                        <View style={styles.textInputView} />
                    </View>
                </View>
                <View style={styles.spaceView}/>
            </View>
        )
    }
}

export default ChangePassword
