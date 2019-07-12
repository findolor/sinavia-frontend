import React from "react";
import {
    View,
    TextInput,
    Button
} from "react-native";
import {connect} from "react-redux"
import {saveText} from "../../redux/example/actions"

class mainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    onButtonClicked(text) {
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Yaz"
                />

                <Button title={'Kaydet'}
                        onPress={this.onButtonClicked()}/>
                <Button title={'Sonraki Sayfa'}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
};

export default connect(null, {saveText})(mainScreen);