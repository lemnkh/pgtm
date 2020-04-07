import React from 'react';
import ArticlesService from '../components/ArticlesService';
import AuthService from '../components/AuthService';
import OneArticle from './OneArticle';
import OnePlaylist from './OnePlaylist';
import {Link} from 'react-router-dom';
import '../Back.css';

class ListOfArticles extends React.Component {
    state = {
        name: "",
        profilePic: "",
        articles: [],
        playlists: []
    };

    service = new ArticlesService();
    auth = new AuthService();

    componentDidMount = () => {
        // if not logged in, redirect
        if (!this.props.status) {
            this.props.history.push('/pgtm/admin/login');
            return;
        }

        this.service.allArticlesUser()
            .then((name, profilePic, articles) => this.setState(name, profilePic, articles))
            .catch(error => console.log(error))
        
        this.service.allPlaylistsUser()
            .then((playlists) => this.setState(playlists))
            .catch(error => console.log(error))
    };

    logout = () => {
        this.auth.logout()
          .then(response => {
            this.props.updateUser(false);
            console.log("logout", response)
            this.props.history.push('/pgtm/admin/articles');
          })
          .catch(error => console.log(error))
        ;
    };
    
    render() {
        console.log("props:", this.props.user);
        console.log("state:", this.state);
        return (

              <div className="list-of-articles">
                    <h1>{this.state.name}</h1>
                    <div className="nav-bar">
                        <div className="nav-left">
                            <button className="button">
                                <Link to="/pgtm/admin/articles/new">New<br/>
                                article</Link>
                            </button>
                        </div>
                        <div className="nav-middle">
                            <h3>{this.state.articles.length} articles</h3>
                            <span className="links-nav"><Link to="/pgtm/admin/profile">Edit profile</Link> - <span onClick={this.logout}><Link to="/">Log out</Link></span></span>
                        </div>

                        <div className="nav-right">
                        <button className="button">
                                <Link to="/pgtm/admin/playlists/new">New<br/>
                                playlist</Link>
                            </button>
                        </div>
                    </div>

                    <div className="all-articles">
                    <ul>
                        <li className="articles-top"></li>

                        {this.state.articles.map(state => {
                            console.log(state);

                            return(
                                
                                <OneArticle key={state._id} id={state._id} title={state.title} author={state.author} createdAt={state.created_at} updatedAt={state.updated_at}  />
                                
                            )
                            })
                        }

                        {this.state.playlists.map(state => {
                            console.log(state);

                            return(
                                
                                <OnePlaylist key={state._id} id={state._id} title={state.title} author={state.author} createdAt={state.created_at} updatedAt={state.updated_at}  />
                                
                            )
                            })
                        }

                    <li className="articles-bottom"></li>
                    </ul>
                    </div>
                </div>
        )
        }
        

};

export default ListOfArticles;