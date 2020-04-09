import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

class Playlist extends React.Component {

    componentDidMount = () => {
        var urlSpotify = this.props.spotify;
        var uriFromUrl = urlSpotify;
        console.log("uri", this.props);
    }

    render() { 
        return (
            
            <center>
                <div style={{paddingLeft: "40px", paddingRight: "40px"}}>
                    <SpotifyPlayer
                    uri={"spotify:playlist:6IVMRE95iquC3llZ1QLCyB"}
                    size={{width: "100%",
                    height: 433}}
                    view="list"
                    theme="black"
                    />
                </div>
            </center>
        
        );
    }
}
  
export default Playlist;