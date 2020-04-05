import React from 'react';
import PublicService from '../components/PublicService';
// import {Link} from 'react-router-dom';

class HomePlaylists extends React.Component {
    state ={
        playlists: [{}]
    }

    service = new PublicService();

    componentDidMount = () => {
        this.service.allPlaylists()
            .then(data => {
                console.log('data=', data)
                this.setState({playlists: data.allPlaylistsMod})
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div className="playlist">
                {this.state.playlists.slice(0,3).map(state => {
                    console.log(state);

                    return(
                            
                        <div className="playlist-element" key={state._id}>
                            
                            <img src={state.picPlaylist} alt={state.title} className="playlist-pic" /><br/>
                            <span className="playlist-title">{state.title}</span><br/>

                            <img src="/spotify.png" alt="spotify" className="spotify" /><br />
                            <img src="/deezer.png" alt="deezer" className="deezer" /><br/>
                            <img src="/youtube.png" alt="youtube" className="youtube" />
                            
                        

                            
                                
                            
                        </div>
                            
                        )
                    })

                }
            </div>
        );
    }
}

export default HomePlaylists;