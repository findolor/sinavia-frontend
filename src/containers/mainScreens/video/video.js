import React from 'react'
import { View } from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import { navigationPop } from '../../../services/navigationService'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
                <VideoPlayer
                    source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
                    toggleResizeModeOnFullscreen={true}
                />
        )
    }
}

export default Video
