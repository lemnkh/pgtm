import React from 'react';
import PublicService from '../components/PublicService';
import {Link} from 'react-router-dom';

class HomeFeed extends React.Component {
    state ={
        articles: [{}]
    }

    service = new PublicService();

    componentDidMount = () => {
        this.service.allArticles()
            .then(data => {
                console.log('data=', data)
                this.setState({articles: data.allArticlesMod})
            })
            .catch(err => console.log(err))
    }

    render() {
        //console.log("testingg", this.state.articles.allArticlesMod)
        return(
            <div className="feed">
                {this.state.articles.slice(1,4).map(state => {
                    console.log(state);

                    return(
                            
                        <div className="feed-element" key={state._id}>
                            <Link to={"/article/" + state._id}>
                                <div className="feed-left">
                                    
                                    <img src={state.picFeatured} alt={state.title} className="feed-pic-bw" />
                                    
                                </div>
                            </Link>

                            <div className="feed-right"><span className="feed-cat">{state.cat} ►</span>
                                <br/>
                                <Link to={"/article/" + state._id}><span className="feed-title">{state.title}</span></Link>
                            </div>
                        </div>
                            
                        )
                    })

                }
            </div>
        );
    }
}

export default HomeFeed;