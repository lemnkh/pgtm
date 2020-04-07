import React from 'react';
import Layout from '../(f)components/Layout';
import PublicService from '../components/PublicService';
import { Link } from 'react-router-dom';
import '../allarticles.css';

class Articles extends React.Component {
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
        return (
            
            <Layout history={this.props.history}>
                {this.state.articles.map(state => {
                    console.log(state);

                    return(
                        <div>
                            <div key={state._id} className="all-element">   
                                <div style={{textAlign: "left", position: "relative"}}>
                                    <Link to={"/" + state._id}>
                                        <img src={state.picFeatured} alt={state.title} className="latest-pic" />
                                    </Link>
                                </div>

                                <div className="all-title">
                                    <Link to={"/" + state._id}>
                                        <span>{state.title}</span>
                                    </Link>
                                </div>
                                    
                            </div>        
                            <div className="all-element-bottom">    
                                <span className="all-cat">{state.cat} ►</span>
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
  
export default Articles;