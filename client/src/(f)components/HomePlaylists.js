import React from 'react';
import PublicService from '../components/PublicService';
import {Link} from 'react-router-dom';

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
                            
                            <Link to={"/article/" + state._id}><img src={state.picPlaylist} alt={state.title} className="playlist-pic" /><br/>
                            <span className="playlist-title">{state.title}</span></Link><br/>

                            <a href={state.playlistSpotify} rel="noopener" target="_blank"><img src="/spotify.png" alt="spotify" className="spotify" /></a><br />
                            <a href={state.playlistDeezer} rel="noopener" target="_blank"><img src="/deezer.png" alt="deezer" className="deezer" /></a><br/>
                            <a href={state.playlistYoutube} rel="noopener" target="_blank"><img src="/youtube.png" alt="youtube" className="youtube" /></a>
                            
                        

                            
                                
                            
                        </div>
                            
                        )
                    })

                }
            </div>
        );
    }
}

export default HomePlaylists;