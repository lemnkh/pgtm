import React from 'react';
import Layout from '../(f)components/Layout';
import PublicService from '../components/PublicService';
import { Link } from 'react-router-dom';
import '../publishedarticle.css';

class PublishedPlaylist extends React.Component {
    state = {
        playlist: {}
    };

  service = new PublicService();

  componentDidMount = () => {
    this.service.getPlaylist(this.props.match.params.id)
            .then(data => {
                this.setState(data)
                console.log(this.state)
            })
            .catch(error => console.log(error))
  };

  render() {  
      const content = this.state.playlist.articleContent;
      const img = {
          width: "11px",
      }
      
    return (
        <Layout history={this.props.history}>
        {/* <div className="separator"></div>    */}
            <div className="article-top">
                <h1>{this.state.playlist.title}</h1>
                <span className="article-cat">{this.state.playlist.cat}</span>
                <span>{this.state.created}<br/></span>
            </div>
            
            <div className="article-lead">{this.state.playlist.lead}</div>

            <div className="article-featured-caption">
                <img src={this.state.playlist.picFeatured} alt={this.state.playlist.picCaption} className="article-featured-pic" />
                <div><i>{this.state.playlist.picCaption}</i> <span>(© {this.state.playlist.picCredit})</span></div>
            </div>

            <div className="article-body" dangerouslySetInnerHTML={{__html: content}}></div>
            
            <div className="article-author">
                <div>
                <b>– {this.state.playlist.author}</b>
                <br/>
                
                <Link to={"http://instagram.com/" + this.state.playlist.authorIG}><img src="/instagram-240.png" alt="instagram" style={img} /> </Link><Link to={"http://twitter.com/" + this.state.playlist.authorTwitter}><img src="/twitter-240.png" alt="twitter" style={img} /></Link>
                </div>
            </div>

            <div className="center">
                <span className="article-tags"><b>Filed under:</b> # {this.state.playlist.tags}<br/></span>
            </div>
            

            

        </Layout>
    );
  }
}
  
export default PublishedPlaylist;