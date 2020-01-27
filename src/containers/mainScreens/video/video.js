import React from 'react'
import { View } from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation'
import { navigationPop } from '../../../services/navigationService'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        // this locks the view to Landscape Mode
        Orientation.lockToLandscape();
    }

    backButtonOnPress = () => {
        Orientation.lockToPortrait();
        navigationPop()
    }

    render() {
        return (
                <VideoPlayer
                    source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
                    toggleResizeModeOnFullscreen={true}
                    fullscreen={true}
                    resizeMode={'cover'}
                    onBack={this.backButtonOnPress}
                    onEnd={this.backButtonOnPress}
                />
        )
    }
}

export default Video
