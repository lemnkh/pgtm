import React from 'react';
import ArticlesService from '../components/ArticlesService';
import OneArticle from './OneArticle';
import {Link} from 'react-router-dom';
import '../Back.css';

class ListOfArticles extends React.Component {
    state = {
        name: "",
        profilePic: "",
        articles: []
    };
// 1. load all articles
// 2. put them in state
// 3. map on articles

    service = new ArticlesService();

    componentDidMount = () => {
        this.service.allArticlesUser()
            .then((name, profilePic, articles) => this.setState(name, profilePic, articles))
            .catch(error => console.log(error))
    };
    
    render() {
        return (
        <div>
            <div className="nav-bar">
                <div className="nav-left">
                    <button>
                        <Link to="/pgtm/admin/articles/new">New<br/>
                        article</Link>
                    </button>
                </div>

                <div className="nav-middle">
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.articles.length} articles</h3>
                    <p className="links-nav"><Link to="/pgtm/admin/profile">Edit profile</Link> - <Link to="/pgtm/admin/logout">Log out</Link></p>
                </div>

                <div className="nav-right">
                    <div className="profile-pic-nav" style={{background: "url("+ this.state.profilePic + ")", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}> 
                    </div>
                </div>
            </div>

            <div className="all-articles">
            <ul>
                <li>
                <div className="title-top">Title</div>
                <div className="author-top">Author</div>
                <div className="date-top">Time of creation</div>
                <div className="date-top">Last update</div>
                <div className="action-top">E D</div>
                </li>

                {this.state.articles.map(state => {
                    console.log(state);
                    return(
                        
                        <OneArticle key={state._id} id={state._id} title={state.title} author={state.author} createdAt={state.createdAt} updatedAt={state.updatedAt}  />
                        
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
    };
}

export default ListOfArticles;