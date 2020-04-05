import React from 'react';
import Layout from '../(f)components/Layout';
import PublicService from '../components/PublicService';
import { Link } from 'react-router-dom';

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
            
            <Layout>
                {this.state.articles.map(state => {
                    console.log(state);

                    return(
                        <div key={state._id} style={{background: "#000"}}>   
                            <div style={{textAlign: "left", position: "relative"}}>
                                <Link to={"/" + state._id}>
                                    <img src={state.picFeatured} alt={state.title} className="latest-pic" />
                                    <div className="all-cat"><span>{state.cat} ►</span></div>
                                    
                                </Link>
                            </div>
                                
                                <div className="all-title"><span>{state.title}</span></div>
                            
                            
                            <div className="all-overview">{state.overview}</div>

                        </div>
                            
                        );
                    })

                }
            </Layout>
        
        );
    }
    }
  
export default Articles;