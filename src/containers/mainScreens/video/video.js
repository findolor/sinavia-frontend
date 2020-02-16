import React from 'react'
import { View, WebView } from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation'
import { navigationPop } from '../../../services/navigationService'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //thumbnailUrl: ''
            videoUrl: null
            //video: ''
        }
    }

    componentDidMount() {
        fetch(this.props.videoUri)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    //thumbnailUrl: res.video.thumbs['640']
                    videoUrl:
                        res.request.files.hls.cdns[
                            res.request.files.hls.default_cdn
                        ].url
                    //video: res.video,
                })
            })
        // this locks the view to Landscape Mode
        Orientation.lockToLandscape()
    }

    backButtonOnPress = () => {
        Orientation.lockToPortrait()
        navigationPop()
    }

    render() {
        return (
            <VideoPlayer
                source={{ uri: this.state.videoUrl }}
                toggleResizeModeOnFullscreen={true}
                fullscreen={true}
                seekColor={'#00D9EF'}
                onBack={this.backButtonOnPress}
                onEnd={this.backButtonOnPress}
            />
        )
    }
}

export default Video
