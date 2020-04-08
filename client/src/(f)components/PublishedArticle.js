import React from 'react';
import Layout from '../(f)components/Layout';
import PublicService from '../components/PublicService';
import { Link } from 'react-router-dom';
import '../publishedarticle.css';

class PublishedArticle extends React.Component {
    state = {
        article: {}
    };

  service = new PublicService();

  componentDidMount = () => {
    this.service.getArticle(this.props.match.params.id)
            .then(data => {
                this.setState(data)
                console.log(this.state)
            })
            .catch(error => console.log(error))
  };

  render() {  
      const content = this.state.article.articleContent;
      const img = {
          width: "11px",
      }
      
    return (
        <Layout history={this.props.history}>
        {/* <div className="separator"></div>    */}
            <div className="article-top">
                <h1>{this.state.article.title}</h1>
                <span className="article-cat">{this.state.article.cat}</span>
                <span>{this.state.created}<br/></span>
            </div>
            
            <div className="article-lead">{this.state.article.chapo}</div>

            <div className="article-featured-caption">
                <img src={this.state.article.picFeatured} alt={this.state.article.picCaption} className="article-featured-pic" />
                <div><i>{this.state.article.picCaption}</i> <span>(© {this.state.article.picCredit})</span></div>
            </div>

            <div className="article-body" dangerouslySetInnerHTML={{__html: content}}></div>
            
            <div className="article-author">
                <div>
                <b>– {this.state.article.author}</b>
                <br/>
                
                <Link to={"http://instagram.com/" + this.state.article.authorIG}><img src="/instagram-240.png" alt="instagram" style={img} /> </Link><Link to={"http://twitter.com/" + this.state.article.authorTwitter}><img src="/twitter-240.png" alt="twitter" style={img} /></Link>
                </div>
            </div>

            <div className="center">
                <span className="article-tags"><b>Filed under:</b> # {this.state.article.tags}<br/></span>
            </div>
            

            

        </Layout>
    );
  }
}
  
export default PublishedArticle;