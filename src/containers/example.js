import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { someAction } from '../redux/example/actions'

class Example extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.connectToApi()
        }, 2000)
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Hello</Text>
                <Text>{this.props.temp3}</Text>
                <Text>{this.props.temp4}</Text>
            </View>
        )
    }
}

Example.propTypes = {
    temp3: PropTypes.string,
    temp4: PropTypes.string,
    connectToApi: PropTypes.func
}

const mapStateToProps = state => {
    const { temp3, temp4 } = state.example
    return {
        temp3,
        temp4
    }
}

const mapDispatchToProps = dispatch => ({
    connectToApi: () => dispatch(someAction())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Example)
