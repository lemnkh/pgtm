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
                    <div className="nav-bar">
                        <div className="nav-left">
                            <button className="button">
                                <Link to="/pgtm/admin/articles/new">New<br/>
                                article</Link>
                            </button>
                        </div>

                        <div className="nav-middle">
                            <h1>{this.state.name}</h1>
                            <h3>{this.state.articles.length} articles</h3>
                            <p className="links-nav"><Link to="/pgtm/admin/profile">Edit profile</Link> - <span onClick={this.logout}><Link to="/">Log out</Link></span></p>
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
                        <li>
                        <div className="title-top">Title</div>
                        <div className="author-top">Author</div>
                        <div className="date-top">Time of creation</div>
                        <div className="date-top">Last update</div>
                        <div className="action-top">E D L</div>
                        </li>

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

                        {/* répète
                        <li>
                        <div className="title"><Link to="/article/edit/{{_id}}">{{title}}</Link></div>
                        <div className="author">{{author}}</div>
                        <div className="date">{{createdAt}}</div>
                        <div className="date">{{updatedAt}}</div>
                        <div className="action"><Link to="/article/edit/{{_id}}">E</Link> <Link to="/article/delete-article/{{_id}}">D</Link></div>
                        </li>
                    */}
                    </ul>
                    </div>
                </div>
        )
        }
        

};

export default ListOfArticles;