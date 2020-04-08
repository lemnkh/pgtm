import React from 'react';
import Layout from '../(f)components/Layout';
import PublicService from '../components/PublicService';
import { Link } from 'react-router-dom';
import '../allarticles.css';

class Playlists extends React.Component {
    state ={
        playlists: [{}]
    }

    service = new PublicService();

    componentDidMount = () => {
        this.service.allPlaylists()
            .then(data => {
                this.setState({playlists: data.allPlaylistsMod})
            })
            .catch(err => console.log(err))
    }

    render() {  
        return (
            
            <Layout history={this.props.history}>
                {this.state.playlists.map(state => {
                    console.log(state);

                    return(
                        <div>
                            <div key={state._id} className="all-element">   
                                <div style={{textAlign: "left", position: "relative"}}>
                                    <Link to={"/playlist/" + state._id}>
                                        <img src={state.picFeatured} alt={state.title} className="latest-pic" />
                                    </Link>
                                </div>

                                <div className="all-title">
                                    <Link to={"/playlist/" + state._id}>
                                        <span>{state.title}</span>
                                    </Link>
                                </div>
                                    
                            </div>        
                            <div className="all-element-bottom">    
                                
                                <span className="all-overview"> {state.overview}</span>
                            </div>
                        </div>
                            
                        );
                    })

                }
            </Layout>
        
        );
    }
    }
  
export default Playlists;